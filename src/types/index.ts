// Numerology type definitions

export interface UserData {
    name: string;
    birthDate: string; // Format: YYYY-MM-DD
    isBeginner?: boolean;
}

export interface Psychomatrix {
    [key: number]: number; // 1-9 cells with count
}

export interface LifePathResult {
    number: number;
    meaning: string;
    details: LifePathDetails;
}

export interface LifePathDetails {
    title: string;
    strengths: string[];
    weaknesses: string[];
    careers: string[];
    compatibility: number[];
    advice: string;
}

export interface NameNumberResult {
    expression: number;
    soulUrge: number;
    personality: number;
}

export interface PersonalCycle {
    year: number;
    month: number;
    day: number;
}

export interface Pinnacle {
    number: number;
    ages: string;
    meaning: string;
}

export interface Challenge {
    number: number;
    period: string;
    meaning: string;
}

export interface Biorhythms {
    physical: number;
    emotional: number;
    intellectual: number;
    overall: number;
    daysSinceBirth: number;
    phases: {
        physical: 'high' | 'low' | 'critical';
        emotional: 'high' | 'low' | 'critical';
        intellectual: 'high' | 'low' | 'critical';
    };
    advice: string;
}

export interface KarmicDebt {
    number: 13 | 14 | 16 | 19;
    source: string;
    name: string;
    karma: string;
    lesson: string;
    challenge: string;
    advice: string;
}

export interface PlanetaryAssociation {
    planet: string;
    symbol: string;
    energy: string;
    day: string;
    color: string;
    metal: string;
    gem: string;
}

export interface TarotConnection {
    card: string;
    meaning: string;
    arcana: string;
}

export interface PowerNumber {
    number: number;
    meaning: string;
}

export interface MaturityNumber {
    number: number;
    meaning: string;
    activationAge: string;
}

export interface Compatibility {
    person1: {
        lifePath: number;
    };
    person2: {
        lifePath: number;
    };
    score: number;
    analysis: {
        level: string;
        summary: string;
        strength: string;
        challenge: string;
    };
}

export interface DailyHoroscope {
    date: string;
    personalDay: number;
    energy: string;
    morning: string;
    afternoon: string;
    evening: string;
    challenge: string;
    lucky: {
        time: string;
        color: string;
        activity: string;
    };
}

export interface MonthlyHoroscope {
    monthName: string;
    personalMonth: number;
    theme: string;
    forecast: string;
    advice: string;
    bestDays: number[];
    challengeDays: number[];
}

export interface YearForecast {
    year: number;
    personalYear: number;
    theme: string;
    overview: string;
    quarters: string[];
    opportunities: string[];
    challenges: string[];
}

export interface LuckyDate {
    date: number;
    day: string;
    rating: number;
    reason: string;
}

export interface LuckyElements {
    numbers: number[];
    days: string[];
    colors: string[];
    stones: string[];
}

export interface HealthAnalysis {
    areas: {
        name: string;
        status: 'strong' | 'normal' | 'attention';
        advice: string;
    }[];
}

export interface SoulMission {
    mission: string;
    strengths: string[];
    challenges: string[];
    careers: string[];
    advice: string;
}

// Component Props
export interface ResultDashboardProps {
    data: UserData;
    onReset: () => void;
}

export interface ChatInterfaceProps {
    onComplete: (data: UserData) => void;
}

export interface SectionProps {
    icon: React.ComponentType<{ size?: number; className?: string }>;
    title: string;
    badge?: string;
    children: React.ReactNode;
    defaultOpen?: boolean;
    hint?: string;
    isBeginner?: boolean;
}

// Theme
export type Theme = 'dark' | 'light';

export interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
    isDark: boolean;
}

// Language
export type Language = 'ru' | 'en';

export interface TranslationKeys {
    [key: string]: string;
}

export interface Translations {
    ru: TranslationKeys;
    en: TranslationKeys;
}

// Telegram WebApp
export interface TelegramUser {
    id: number;
    first_name: string;
    last_name?: string;
    username?: string;
    language_code?: string;
    is_premium?: boolean;
}

export interface TelegramWebApp {
    ready: () => void;
    expand: () => void;
    close: () => void;
    setHeaderColor: (color: string) => void;
    setBackgroundColor: (color: string) => void;
    MainButton: {
        setText: (text: string) => void;
        show: () => void;
        hide: () => void;
        onClick: (callback: () => void) => void;
    };
    HapticFeedback: {
        impactOccurred: (style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft') => void;
        notificationOccurred: (type: 'error' | 'success' | 'warning') => void;
        selectionChanged: () => void;
    };
    openInvoice: (url: string, callback?: (status: string) => void) => void;
    sendData: (data: string) => void;
    initDataUnsafe?: {
        user?: TelegramUser;
    };
}

// Global Window extension
declare global {
    interface Window {
        Telegram?: {
            WebApp: TelegramWebApp;
        };
    }
}
