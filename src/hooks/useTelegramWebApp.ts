/**
 * Hook for Telegram Web App integration
 * Provides access to Telegram WebApp features when running inside Telegram
 */

import { useEffect, useState, useCallback } from 'react';
import type { TelegramWebApp, TelegramUser } from '../types';

type HapticType = 'impact' | 'notification' | 'selection';

interface UseTelegramWebAppReturn {
    webApp: TelegramWebApp | null;
    user: TelegramUser | null;
    isReady: boolean;
    isTelegram: boolean;
    close: () => void;
    showMainButton: (text: string, onClick: () => void) => void;
    hideMainButton: () => void;
    hapticFeedback: (type?: HapticType) => void;
    openInvoice: (invoiceUrl: string, callback?: (status: string) => void) => void;
    sendData: (data: unknown) => void;
    firstName: string | null;
    lastName: string | null;
    username: string | null;
    languageCode: string;
    isPremium: boolean;
}

export const useTelegramWebApp = (): UseTelegramWebAppReturn => {
    const [webApp, setWebApp] = useState<TelegramWebApp | null>(null);
    const [user, setUser] = useState<TelegramUser | null>(null);
    const [isReady, setIsReady] = useState<boolean>(false);
    const [isTelegram, setIsTelegram] = useState<boolean>(false);

    useEffect(() => {
        // Check if running inside Telegram
        if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
            const tg = window.Telegram.WebApp;
            setWebApp(tg);
            setIsTelegram(true);

            // Get user data if available
            if (tg.initDataUnsafe?.user) {
                setUser(tg.initDataUnsafe.user);
            }

            // Tell Telegram the app is ready
            tg.ready();

            // Expand to full height
            tg.expand();

            // Set header color
            tg.setHeaderColor('#8b5cf6');
            tg.setBackgroundColor('#030014');

            setIsReady(true);
        } else {
            setIsReady(true);
            setIsTelegram(false);
        }
    }, []);

    // Close the Mini App
    const close = useCallback((): void => {
        if (webApp) {
            webApp.close();
        }
    }, [webApp]);

    // Show main button
    const showMainButton = useCallback((text: string, onClick: () => void): void => {
        if (webApp?.MainButton) {
            webApp.MainButton.setText(text);
            webApp.MainButton.onClick(onClick);
            webApp.MainButton.show();
        }
    }, [webApp]);

    // Hide main button
    const hideMainButton = useCallback((): void => {
        if (webApp?.MainButton) {
            webApp.MainButton.hide();
        }
    }, [webApp]);

    // Haptic feedback
    const hapticFeedback = useCallback((type: HapticType = 'impact'): void => {
        if (webApp?.HapticFeedback) {
            switch (type) {
                case 'impact':
                    webApp.HapticFeedback.impactOccurred('medium');
                    break;
                case 'notification':
                    webApp.HapticFeedback.notificationOccurred('success');
                    break;
                case 'selection':
                    webApp.HapticFeedback.selectionChanged();
                    break;
            }
        }
    }, [webApp]);

    // Open invoice
    const openInvoice = useCallback((invoiceUrl: string, callback?: (status: string) => void): void => {
        if (webApp?.openInvoice) {
            webApp.openInvoice(invoiceUrl, callback);
        } else {
            window.open(invoiceUrl, '_blank');
        }
    }, [webApp]);

    // Send data to bot
    const sendData = useCallback((data: unknown): void => {
        if (webApp?.sendData) {
            webApp.sendData(JSON.stringify(data));
        }
    }, [webApp]);

    return {
        webApp,
        user,
        isReady,
        isTelegram,
        close,
        showMainButton,
        hideMainButton,
        hapticFeedback,
        openInvoice,
        sendData,
        // Useful user properties
        firstName: user?.first_name || null,
        lastName: user?.last_name || null,
        username: user?.username || null,
        languageCode: user?.language_code || 'ru',
        isPremium: user?.is_premium || false
    };
};

export default useTelegramWebApp;
