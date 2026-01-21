#!/usr/bin/env node
/**
 * Script to set up Telegram Bot webhook
 * Run: node scripts/setup-webhook.js YOUR_VERCEL_DOMAIN
 * Example: node scripts/setup-webhook.js numerology-app.vercel.app
 */

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const DOMAIN = process.argv[2];

if (!DOMAIN) {
    console.log('Usage: node scripts/setup-webhook.js YOUR_VERCEL_DOMAIN');
    console.log('Example: node scripts/setup-webhook.js numerology-app.vercel.app');
    process.exit(1);
}

if (!BOT_TOKEN) {
    console.log('Error: TELEGRAM_BOT_TOKEN environment variable not set');
    console.log('Set it with: set TELEGRAM_BOT_TOKEN=your_token (Windows)');
    console.log('Or: export TELEGRAM_BOT_TOKEN=your_token (Linux/Mac)');
    process.exit(1);
}

const webhookUrl = `https://${DOMAIN}/api/telegram-webhook`;

async function setupWebhook() {
    console.log(`Setting up webhook for: ${webhookUrl}`);

    try {
        const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/setWebhook`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                url: webhookUrl,
                allowed_updates: ['message', 'callback_query', 'pre_checkout_query']
            })
        });

        const data = await response.json();

        if (data.ok) {
            console.log('✅ Webhook set successfully!');
            console.log(`URL: ${webhookUrl}`);
        } else {
            console.log('❌ Failed to set webhook:', data.description);
        }

        // Get webhook info
        const infoResponse = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/getWebhookInfo`);
        const info = await infoResponse.json();
        console.log('\nWebhook Info:', JSON.stringify(info.result, null, 2));

    } catch (error) {
        console.error('Error:', error.message);
    }
}

setupWebhook();
