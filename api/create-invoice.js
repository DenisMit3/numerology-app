// Serverless function for Telegram Stars invoice
// Deploy to Vercel - the token should be in environment variables

// Simple in-memory rate limiting (resets on cold start)
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 3; // Max 3 requests per minute per IP

function isRateLimited(ip) {
    const now = Date.now();
    const userRequests = rateLimitMap.get(ip) || [];

    // Clean old requests
    const recentRequests = userRequests.filter(time => now - time < RATE_LIMIT_WINDOW);

    if (recentRequests.length >= MAX_REQUESTS) {
        return true;
    }

    recentRequests.push(now);
    rateLimitMap.set(ip, recentRequests);
    return false;
}

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

    // Rate limiting
    const ip = req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || 'unknown';
    if (isRateLimited(ip)) {
        return res.status(429).json({
            error: 'Too many requests. Please wait a minute.',
            retryAfter: 60
        });
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
                payload: `support_${Date.now()}_${ip.replace(/\./g, '_')}`,
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
            console.error('Telegram API error:', data.description);
            return res.status(400).json({
                error: data.description || 'Failed to create invoice'
            });
        }
    } catch (error) {
        console.error('Invoice creation error:', error);
        return res.status(500).json({ error: error.message });
    }
}
