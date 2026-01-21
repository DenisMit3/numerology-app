// Telegram Bot Webhook Handler
// Handles bot commands and payment notifications

export default async function handler(req, res) {
    // Only allow POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const WEBAPP_URL = process.env.WEBAPP_URL || 'https://numerology-app.vercel.app';

    if (!BOT_TOKEN) {
        return res.status(500).json({ error: 'Bot token not configured' });
    }

    try {
        const update = req.body;

        // Handle /start command
        if (update.message?.text) {
            const text = update.message.text;
            const chatId = update.message.chat.id;
            const firstName = update.message.from.first_name || 'друг';

            if (text === '/start' || text.startsWith('/start')) {
                // Send welcome message with Mini App button
                await sendMessage(BOT_TOKEN, chatId, `
✨ Привет, ${firstName}!

🔮 Я — Нумеролог AI. Могу провести глубокий анализ вашей личности по древней системе Пифагора.

Вы узнаете:
• Число Жизненного Пути
• Психоматрицу
• Прогнозы на день/месяц/год
• Совместимость
• И многое другое!

👇 Нажмите кнопку ниже, чтобы начать анализ:
                `, {
                    reply_markup: {
                        inline_keyboard: [[
                            {
                                text: '🔮 Открыть Нумеролог AI',
                                web_app: { url: WEBAPP_URL }
                            }
                        ], [
                            {
                                text: '⭐ Поддержать автора (100 Stars)',
                                callback_data: 'donate'
                            }
                        ]]
                    }
                });
            } else if (text === '/horoscope') {
                await sendMessage(BOT_TOKEN, chatId, `
🌟 Чтобы получить персональный прогноз, мне нужна ваша дата рождения.

Откройте приложение и введите свои данные:
                `, {
                    reply_markup: {
                        inline_keyboard: [[
                            {
                                text: '📅 Получить прогноз',
                                web_app: { url: WEBAPP_URL }
                            }
                        ]]
                    }
                });
            }
        }

        // Handle callback queries (button clicks)
        if (update.callback_query) {
            const callbackData = update.callback_query.data;
            const chatId = update.callback_query.message.chat.id;

            if (callbackData === 'donate') {
                // Create Stars invoice
                const invoiceResponse = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/createInvoiceLink`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        title: '⭐ Поддержка Нумеролог AI',
                        description: 'Спасибо за поддержку! 100 Telegram Stars для автора приложения.',
                        payload: `donate_${chatId}_${Date.now()}`,
                        currency: 'XTR',
                        prices: [{ label: 'Поддержка', amount: 100 }]
                    })
                });

                const invoiceData = await invoiceResponse.json();

                if (invoiceData.ok) {
                    await sendMessage(BOT_TOKEN, chatId, `
💫 Спасибо за желание поддержать проект!

Нажмите на ссылку для оплаты:
${invoiceData.result}
                    `);
                }
            }

            // Answer callback to remove loading state
            await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/answerCallbackQuery`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    callback_query_id: update.callback_query.id
                })
            });
        }

        // Handle successful payment
        if (update.message?.successful_payment) {
            const chatId = update.message.chat.id;
            await sendMessage(BOT_TOKEN, chatId, `
🎉 Огромное спасибо за поддержку!

Ваши ${update.message.successful_payment.total_amount} ⭐ получены!

Это очень помогает развитию проекта. Пусть звёзды ведут вас к успеху! ✨
            `);
        }

        return res.status(200).json({ ok: true });
    } catch (error) {
        console.error('Webhook error:', error);
        return res.status(500).json({ error: error.message });
    }
}

// Helper function to send messages
async function sendMessage(token, chatId, text, extra = {}) {
    return fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            chat_id: chatId,
            text: text.trim(),
            parse_mode: 'HTML',
            ...extra
        })
    });
}
