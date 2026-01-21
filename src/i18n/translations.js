// Internationalization (i18n) system
// Supports Russian (default) and English

export const translations = {
    ru: {
        // Chat
        greeting_morning: "Доброе утро! ☀️",
        greeting_afternoon: "Добрый день! 🌤️",
        greeting_evening: "Добрый вечер! 🌙",
        greeting_night: "Доброй ночи! ✨",
        intro: "Я — Нумеролог AI. Проведу глубокий анализ вашей личности по древней системе Пифагора 🔮",
        ask_experience: "Скажите, вы уже знакомы с нумерологией?",
        beginner: "Я новичок",
        expert: "Знаю нумерологию",
        ask_name: "Как я могу к вам обращаться?",
        ask_date: "Теперь укажите дату рождения. Формат: ДД.ММ.ГГГГ",
        calculating: "Анализирую...",

        // Dashboard
        analysis_complete: "Анализ завершён",
        life_path: "Число Жизненного Пути",
        birthday_number: "Число Дня Рождения",
        current_energy: "Энергия Сейчас",
        name_numerology: "Нумерология Имени",
        life_peaks: "Пики Жизни",
        key_ages: "Ключевые Возрасты",
        destiny_lines: "Линии Судьбы",
        destiny_graph: "График Судьбы",
        karmic_lessons: "Кармические Уроки",
        challenges: "Числа Испытания",
        health_energy: "Здоровье и Энергия",
        recommendations: "Рекомендации",
        lucky_elements: "Счастливые Элементы",
        hidden_passions: "Скрытые Страсти",
        love_relations: "Любовь и Отношения",
        finance_profile: "Финансовый Профиль",
        compatibility: "Совместимость",
        today_forecast: "Прогноз на Сегодня",
        month_forecast: "Прогноз на Месяц",
        year_forecast: "Прогноз на Год",
        lucky_dates: "Удачные Даты",
        biorhythms: "Биоритмы",
        karmic_debts: "Кармические долги",
        planetary: "Планетарное влияние",
        tarot: "Связь с Таро",
        power_maturity: "Числа Силы и Зрелости",
        soul_mission: "Миссия Души",
        affirmation: "Аффирмация Дня",

        // Actions
        share: "Поделиться",
        new_analysis: "Новый анализ",
        support_author: "Поддержать автора",
        calculate: "Рассчитать",
        understand: "Понятно",

        // Beginner mode
        learning_mode: "Режим обучения включён",
        look_for_hints: "Ищите значок 💡 — там будут пояснения для новичков.",

        // Footer
        footer_title: "Нумеролог AI",
        footer_subtitle: "Анализ основан на классической нумерологии",

        // Cycles
        year: "Год",
        month: "Месяц",
        today: "Сегодня",

        // Biorhythms
        physical: "Физический",
        emotional: "Эмоциональный",
        intellectual: "Интеллектуальный",

        // Partner date
        partner_date: "Дата партнёра (ДД.ММ.ГГГГ)"
    },

    en: {
        // Chat
        greeting_morning: "Good morning! ☀️",
        greeting_afternoon: "Good afternoon! 🌤️",
        greeting_evening: "Good evening! 🌙",
        greeting_night: "Good night! ✨",
        intro: "I am Numerologist AI. I will conduct a deep personality analysis using the ancient Pythagorean system 🔮",
        ask_experience: "Tell me, are you familiar with numerology?",
        beginner: "I'm a beginner",
        expert: "I know numerology",
        ask_name: "What can I call you?",
        ask_date: "Now enter your birth date. Format: DD.MM.YYYY",
        calculating: "Analyzing...",

        // Dashboard
        analysis_complete: "Analysis Complete",
        life_path: "Life Path Number",
        birthday_number: "Birthday Number",
        current_energy: "Current Energy",
        name_numerology: "Name Numerology",
        life_peaks: "Life Peaks",
        key_ages: "Key Ages",
        destiny_lines: "Destiny Lines",
        destiny_graph: "Destiny Graph",
        karmic_lessons: "Karmic Lessons",
        challenges: "Challenge Numbers",
        health_energy: "Health & Energy",
        recommendations: "Recommendations",
        lucky_elements: "Lucky Elements",
        hidden_passions: "Hidden Passions",
        love_relations: "Love & Relationships",
        finance_profile: "Financial Profile",
        compatibility: "Compatibility",
        today_forecast: "Today's Forecast",
        month_forecast: "Monthly Forecast",
        year_forecast: "Yearly Forecast",
        lucky_dates: "Lucky Dates",
        biorhythms: "Biorhythms",
        karmic_debts: "Karmic Debts",
        planetary: "Planetary Influence",
        tarot: "Tarot Connection",
        power_maturity: "Power & Maturity Numbers",
        soul_mission: "Soul Mission",
        affirmation: "Daily Affirmation",

        // Actions
        share: "Share",
        new_analysis: "New Analysis",
        support_author: "Support Author",
        calculate: "Calculate",
        understand: "Got it",

        // Beginner mode
        learning_mode: "Learning Mode Enabled",
        look_for_hints: "Look for 💡 icon — there will be explanations for beginners.",

        // Footer
        footer_title: "Numerologist AI",
        footer_subtitle: "Analysis based on classical numerology",

        // Cycles
        year: "Year",
        month: "Month",
        today: "Today",

        // Biorhythms
        physical: "Physical",
        emotional: "Emotional",
        intellectual: "Intellectual",

        // Partner date
        partner_date: "Partner date (DD.MM.YYYY)"
    }
};

// Get language from browser or Telegram
export const detectLanguage = () => {
    // Check Telegram WebApp
    if (typeof window !== 'undefined' && window.Telegram?.WebApp?.initDataUnsafe?.user?.language_code) {
        const tgLang = window.Telegram.WebApp.initDataUnsafe.user.language_code;
        return tgLang === 'ru' || tgLang === 'uk' || tgLang === 'be' ? 'ru' : 'en';
    }

    // Check localStorage
    if (typeof localStorage !== 'undefined') {
        const saved = localStorage.getItem('numerology_lang');
        if (saved && translations[saved]) return saved;
    }

    // Check browser language
    if (typeof navigator !== 'undefined') {
        const browserLang = navigator.language?.split('-')[0];
        if (browserLang === 'ru' || browserLang === 'uk' || browserLang === 'be') return 'ru';
    }

    return 'ru'; // Default
};

// Save language preference
export const setLanguage = (lang) => {
    if (typeof localStorage !== 'undefined') {
        localStorage.setItem('numerology_lang', lang);
    }
};

// Translation hook helper
export const createT = (lang = 'ru') => {
    const t = (key) => translations[lang]?.[key] || translations.ru[key] || key;
    return t;
};

export default translations;
