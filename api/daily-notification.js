// Vercel Cron Job for Daily Horoscope Notifications
// This runs every day at 8:00 AM UTC (10:00 Kyiv time)
// Add to vercel.json: { "crons": [{ "path": "/api/daily-notification", "schedule": "0 8 * * *" }] }

export const config = {
    maxDuration: 60, // 60 seconds timeout
};

export default async function handler(req, res) {
    // Verify this is a cron job call (Vercel adds this header)
    const authHeader = req.headers.authorization;
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        // For testing, allow without auth in development
        if (process.env.NODE_ENV === 'production' && !req.headers['x-vercel-cron']) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
    }

    const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

    if (!BOT_TOKEN) {
        return res.status(500).json({ error: 'Bot token not configured' });
    }

    try {
        // Get list of subscribers from database (for now, we'll use a simple approach)
        // In production, you'd use a real database like Vercel KV, Supabase, etc.
        const subscribers = await getSubscribers();

        if (!subscribers.length) {
            return res.status(200).json({
                message: 'No subscribers to notify',
                sent: 0
            });
        }

        let sent = 0;
        let failed = 0;

        for (const subscriber of subscribers) {
            try {
                const horoscope = generateDailyHoroscope(subscriber.birthDate);

                await sendTelegramMessage(BOT_TOKEN, subscriber.chatId, `
🌅 <b>Доброе утро!</b>

Ваш нумерологический прогноз на сегодня:

🔮 <b>Персональное число дня:</b> ${horoscope.personalDay}
${horoscope.meaning}

💡 <b>Совет:</b> ${horoscope.advice}

🍀 <b>Удачное время:</b> ${horoscope.luckyTime}

✨ Откройте приложение для полного анализа!
                `);

                sent++;
            } catch (error) {
                console.error(`Failed to send to ${subscriber.chatId}:`, error);
                failed++;
            }

            // Rate limiting: wait 50ms between messages
            await new Promise(r => setTimeout(r, 50));
        }

        return res.status(200).json({
            message: 'Daily notifications sent',
            sent,
            failed,
            total: subscribers.length
        });

    } catch (error) {
        console.error('Cron error:', error);
        return res.status(500).json({ error: error.message });
    }
}

// Mock function - replace with real database
async function getSubscribers() {
    // In production, fetch from Vercel KV, Supabase, or other DB
    // For now, return empty array (subscribers need to opt-in via bot)

    // Example structure:
    // return [
    //     { chatId: 123456789, birthDate: '1990-03-15', name: 'User' }
    // ];

    return [];
}

// Generate daily horoscope
function generateDailyHoroscope(birthDate) {
    const [year, month, day] = birthDate.split('-').map(Number);
    const today = new Date();
    const todaySum = today.getFullYear() + (today.getMonth() + 1) + today.getDate();
    const birthSum = month + day;

    let personalDay = (todaySum + birthSum) % 9 || 9;

    const meanings = {
        1: "День новых начинаний! Проявите инициативу.",
        2: "День партнёрства. Сотрудничайте с другими.",
        3: "День творчества. Выражайте себя!",
        4: "День труда. Организуйте и стройте.",
        5: "День перемен. Будьте гибкими.",
        6: "День семьи и заботы. Помогите близким.",
        7: "День размышлений. Изучайте и анализируйте.",
        8: "День достижений. Фокус на карьере.",
        9: "День завершения. Отпустите старое."
    };

    const advice = {
        1: "Начните то, что давно откладывали",
        2: "Попросите помощи, если нужно",
        3: "Найдите время для хобби",
        4: "Составьте план на неделю",
        5: "Попробуйте что-то новое",
        6: "Позвоните близкому человеку",
        7: "Побудьте наедине с собой",
        8: "Примите важное решение",
        9: "Завершите начатое дело"
    };

    const times = ["9:00-11:00", "11:00-13:00", "14:00-16:00", "16:00-18:00", "19:00-21:00"];
    const luckyTime = times[(personalDay - 1) % times.length];

    return {
        personalDay,
        meaning: meanings[personalDay],
        advice: advice[personalDay],
        luckyTime
    };
}

// Send message via Telegram
async function sendTelegramMessage(token, chatId, text) {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            chat_id: chatId,
            text: text.trim(),
            parse_mode: 'HTML'
        })
    });

    if (!response.ok) {
        throw new Error(`Telegram API error: ${response.status}`);
    }

    return response.json();
}
