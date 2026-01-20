// Serverless function for Telegram Stars invoice
// Deploy to Vercel - the token should be in environment variables

export default async function handler(req, res) {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

    if (!BOT_TOKEN) {
        return res.status(500).json({ error: 'Bot token not configured' });
    }

    try {
        // Create invoice link for 100 Telegram Stars
        const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/createInvoiceLink`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: '⭐ Поддержка Нумеролог AI',
                description: 'Спасибо за поддержку! 100 Telegram Stars для автора приложения.',
                payload: 'support_100_stars',
                currency: 'XTR', // XTR = Telegram Stars
                prices: [
                    { label: 'Поддержка автора', amount: 100 }
                ]
            })
        });

        const data = await response.json();

        if (data.ok) {
            return res.status(200).json({
                success: true,
                invoiceLink: data.result
            });
        } else {
            return res.status(400).json({
                error: data.description || 'Failed to create invoice'
            });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
