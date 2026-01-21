import React, { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    calculatePsychomatrix, calculateLifePathNumber, getLifePathMeaning, getLifePathDetailed,
    getCellInfo, getCellDetailedMeaning, calculateLines, getLineMeaning, calculateDestinyGraph,
    calculateExpressionNumber, calculateSoulUrgeNumber, calculatePersonalityNumber, getNameNumberMeaning,
    calculatePersonalYear, calculatePersonalMonth, calculatePersonalDay, getPersonalCycleMeaning,
    getLuckyElements, calculateBirthdayNumber, getBirthdayNumberMeaning,
    calculateKarmicLessons, getKarmicLessonMeaning, calculateLifePinnacles, getPinnacleMeaning,
    calculateTransitionAges, getHealthAnalysis, getDevelopmentAdvice,
    calculateChallengeNumbers, getChallengeMeaning,
    calculateHiddenPassions, getHiddenPassionMeaning,
    getDailyAffirmation, getLoveAdvice, getFinancialProfile, getSoulMission,
    calculateFullCompatibility, getYearForecast, calculateLuckyDates,
    getDailyHoroscope, getMonthlyHoroscope,
    calculateBiorhythms, calculateKarmicDebt, getPlanetaryAssociation,
    calculatePowerNumber, calculateMaturityNumber, getTarotConnection,
    Psychomatrix, LifePathDetails
} from '../utils/numerology';
import { useTheme } from '../App';
import {
    RotateCcw, Sparkles, Grid3X3, TrendingUp, ChevronDown, HelpCircle,
    User, Calendar, Gem, Zap, AlertCircle, Mountain, Heart, Lightbulb, Star, Clock, Gift,
    Flame, DollarSign, Target, Quote, Users, Sun, Moon, CalendarDays, Activity, Orbit, Palette,
    LucideIcon
} from 'lucide-react';

// Types
interface UserData {
    name: string;
    birthDate: string;
    isBeginner?: boolean;
}

interface ResultDashboardProps {
    data: UserData;
    onReset: () => void;
}

// Context for beginner mode
const BeginnerContext = createContext<boolean>(false);
const useIsBeginner = (): boolean => useContext(BeginnerContext);

// ==================== PREMIUM COMPONENTS ====================

interface GlowNumberProps {
    number: number | string;
    size?: 'lg' | 'md' | 'sm';
    color?: string;
}

const GlowNumber: React.FC<GlowNumberProps> = ({ number, size = 'lg', color = 'purple' }) => (
    <div className="relative flex items-center justify-center">
        <div className={`absolute inset-0 bg-gradient-to-r from-${color}-500 to-pink-500 blur-2xl opacity-50 rounded-full scale-150`} />
        <span className={`relative z-10 font-display font-bold bg-gradient-to-br from-white via-${color}-200 to-pink-200 bg-clip-text text-transparent ${size === 'lg' ? 'text-6xl' : size === 'md' ? 'text-3xl' : 'text-xl'
            }`}>
            {number}
        </span>
    </div>
);

interface PremiumCardProps {
    children: ReactNode;
    className?: string;
    gradient?: boolean;
    index?: number;
}

const PremiumCard: React.FC<PremiumCardProps> = ({ children, className = '', gradient = false, index = 0 }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
            type: 'spring',
            stiffness: 300,
            damping: 30,
            delay: index * 0.05 // Stagger effect
        }}
        className={`relative overflow-hidden rounded-2xl sm:rounded-3xl p-3.5 sm:p-4 
      bg-gradient-to-br from-white/[0.08] to-white/[0.02]
      backdrop-blur-xl border border-white/10
      shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1)]
      ${gradient ? 'before:absolute before:inset-0 before:bg-gradient-to-r before:from-purple-500/10 before:via-transparent before:to-pink-500/10' : ''}
      ${className}`}
    >
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
        {children}
    </motion.div>
);

// Beginner help tooltip component
const BeginnerHint = ({ text }) => (
    <motion.div
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-2 p-3 rounded-xl bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20"
    >
        <div className="flex items-start gap-2">
            <span className="text-lg">💡</span>
            <p className="text-[11px] text-white/70 leading-relaxed">{text}</p>
        </div>
    </motion.div>
);

const Section = ({ icon: Icon, title, badge, children, defaultOpen = false, hint = null }) => {
    const [open, setOpen] = useState(defaultOpen);
    const isBeginner = useIsBeginner();
    const showHint = isBeginner && hint;

    return (
        <PremiumCard>
            <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between">
                <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl sm:rounded-2xl bg-gradient-to-br from-purple-500/30 to-pink-500/20 flex items-center justify-center border border-purple-500/20 flex-shrink-0">
                        <Icon size={14} className="text-purple-300 sm:w-4 sm:h-4" />
                    </div>
                    <span className="text-[13px] sm:text-[14px] font-semibold text-white truncate">{title}</span>
                    {badge && (
                        <span className="px-1.5 sm:px-2 py-0.5 text-[8px] sm:text-[9px] font-semibold bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 text-emerald-300 rounded-full border border-emerald-500/30 animate-pulse flex-shrink-0">
                            {badge}
                        </span>
                    )}
                    {showHint && (
                        <HelpCircle size={14} className="text-blue-400 flex-shrink-0" />
                    )}
                </div>
                <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }} className="flex-shrink-0 ml-2">
                    <ChevronDown size={18} className="text-white/40" />
                </motion.div>
            </button>
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                    >
                        {showHint && <BeginnerHint text={hint} />}
                        <div className="mt-3 sm:mt-4 space-y-2.5 sm:space-y-3">{children}</div>
                    </motion.div>
                )}
            </AnimatePresence>
        </PremiumCard>
    );
};

// Hints dictionary for beginners
const BEGINNER_HINTS = {
    lifePath: "Число Жизненного Пути — это ваша главная миссия в этой жизни. Оно рассчитывается из суммы всех цифр вашей даты рождения и показывает, какие таланты и возможности вам даны от рождения.",
    psychomatrix: "Психоматрица (Квадрат Пифагора) — это таблица 3x3, показывающая ваши врождённые качества. Каждая ячейка отвечает за определённую характеристику: энергию, логику, интуицию и т.д.",
    lines: "Линии Психоматрицы — это дополнительные качества, которые возникают при сложении чисел по рядам, колонкам и диагоналям. Они показывают семью, удачу, талант и другие аспекты.",
    destiny: "Граф Судьбы показывает, как ваша энергия будет меняться каждые 12 лет жизни. Это помогает понять свои лучшие периоды.",
    biorhythm: "Биоритмы — это природные циклы вашего тела и разума. Физический (23 дня), эмоциональный (28 дней) и интеллектуальный (33 дней) циклы сменяют друг друга.",
    pinnacles: "Вершины — это 4 больших этапа вашей жизни, каждый со своей темой и уроками. Они помогают понять, чего ожидать в разном возрасте.",
    challenges: "Числа Испытаний показывают преплятствия, которые вам нужно преодолеть на каждом этапе жизни для личностного роста.",
    karmic: "Кармические уроки — это качества, которых вам не хватает (отсутствующие числа в имени). Их развитие — ваша задача в этой жизни.",
    compatibility: "Совместимость рассчитывается по Числам Жизненного Пути двух людей. Это показывает, насколько гармоничны будут отношения.",
    planetary: "Каждое число связано с определённой планетой. Это влияет на ваш характер, благоприятные дни и даже камни-талисманы.",
    tarot: "Каждое Число Жизненного Пути соответствует карте Таро из Старших Арканов. Это ваш архетип и основная энергия.",
    horoscope: "Нумерологический прогноз рассчитывается на основе ваших Персональных чисел дня, месяца и года. Это цикличная система из 9 периодов."
};


// ==================== PSYCHOMATRIX ====================

const PsychomatrixGrid = ({ matrix, onCellClick }) => {
    const cellOrder = [1, 4, 7, 2, 5, 8, 3, 6, 9];
    const gradients = [
        'from-rose-500 to-orange-500',
        'from-amber-500 to-yellow-500',
        'from-lime-500 to-emerald-500',
        'from-teal-500 to-cyan-500',
        'from-sky-500 to-blue-500',
        'from-indigo-500 to-violet-500',
        'from-purple-500 to-fuchsia-500',
        'from-pink-500 to-rose-500',
        'from-red-500 to-pink-500'
    ];

    return (
        <div className="grid grid-cols-3 gap-2.5 p-4 rounded-2xl bg-black/40 border border-white/5">
            {cellOrder.map((num, i) => {
                const info = getCellInfo(num);
                const count = matrix[num] || 0;
                return (
                    <motion.button
                        key={num}
                        onClick={() => onCellClick(num)}
                        whileHover={{ scale: 1.08, rotate: 2 }}
                        whileTap={{ scale: 0.95 }}
                        className={`aspect-square rounded-2xl p-2 flex flex-col items-center justify-center relative overflow-hidden transition-all duration-300
              ${count > 0 ? `bg-gradient-to-br ${gradients[i]} shadow-lg` : 'bg-white/5'}
              border border-white/20 hover:border-white/40`}
                        style={{ boxShadow: count > 0 ? `0 8px 24px ${['#f43f5e', '#f59e0b', '#22c55e', '#14b8a6', '#0ea5e9', '#8b5cf6', '#a855f7', '#ec4899', '#ef4444'][i]}30` : 'none' }}
                    >
                        <span className="absolute top-1.5 left-2 text-[8px] uppercase font-medium text-white/60">{info.label}</span>
                        <div className={`text-2xl font-bold ${count > 0 ? 'text-white drop-shadow-lg' : 'text-white/20'}`}>
                            {count > 0 ? num.toString().repeat(Math.min(count, 3)) : '—'}
                        </div>
                        {count > 0 && (
                            <div className="absolute bottom-1.5 right-2 px-1.5 py-0.5 rounded-md bg-black/30 backdrop-blur-sm">
                                <span className="text-[9px] font-bold text-white">{count}</span>
                            </div>
                        )}
                    </motion.button>
                );
            })}
        </div>
    );
};

// ==================== LIFE PATH ====================

const LifePathSection = ({ lifePath, meaning, details }) => (
    <PremiumCard gradient className="relative">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-500/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-pink-500/20 rounded-full blur-3xl" />
        <div className="relative z-10">
            <div className="flex items-center gap-2 mb-5">
                <Star className="text-yellow-400" size={20} />
                <span className="text-[11px] uppercase tracking-widest text-white/50 font-medium">Число Жизненного Пути</span>
            </div>
            <div className="flex items-start gap-6">
                <GlowNumber number={lifePath} />
                <div className="flex-1 pt-2">
                    <p className="text-[14px] text-white/80 italic leading-relaxed font-light">"{meaning}"</p>
                </div>
            </div>
            {details && (
                <div className="mt-5 pt-5 border-t border-white/10 space-y-4">
                    <p className="text-[12px] text-purple-300 font-medium">{details.mission}</p>
                    <div className="flex flex-wrap gap-2">
                        {details.strengths.map((s, i) => (
                            <span key={i} className="px-3 py-1.5 text-[10px] font-medium rounded-xl bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-300 border border-emerald-500/30">{s}</span>
                        ))}
                    </div>
                    <div className="p-3 rounded-xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20">
                        <p className="text-[11px] text-amber-200">💡 {details.advice}</p>
                    </div>
                </div>
            )}
        </div>
    </PremiumCard>
);

// ==================== BIRTHDAY NUMBER ====================

const BirthdaySection = ({ birthDate }) => {
    const num = calculateBirthdayNumber(birthDate);
    const meaning = getBirthdayNumberMeaning(num);
    return (
        <Section icon={Gift} title="Число Дня Рождения" hint="Число дня рождения — это одна цифра вашего дня рождения (или сумма, если двузначная). Оно показывает ваши природные таланты и способности.">
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-br from-orange-500/10 to-amber-500/10 border border-orange-500/20">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-lg shadow-orange-500/30">
                    <span className="text-3xl font-bold text-white">{num}</span>
                </div>
                <div className="flex-1">
                    <p className="text-[14px] font-semibold text-white">{meaning.title}</p>
                    <p className="text-[11px] text-white/60 mt-1 leading-relaxed">{meaning.desc}</p>
                </div>
            </div>
        </Section>
    );
};

// ==================== PERSONAL CYCLES ====================

const PersonalCyclesSection = ({ birthDate }) => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const todayStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

    const cycles = [
        { label: `Год ${year}`, num: calculatePersonalYear(birthDate, year), ...getPersonalCycleMeaning(calculatePersonalYear(birthDate, year)) },
        { label: 'Месяц', num: calculatePersonalMonth(birthDate, year, month), ...getPersonalCycleMeaning(calculatePersonalMonth(birthDate, year, month)) },
        { label: 'Сегодня', num: calculatePersonalDay(birthDate, todayStr), ...getPersonalCycleMeaning(calculatePersonalDay(birthDate, todayStr)) }
    ];

    return (
        <Section icon={Zap} title="Энергия Сейчас" badge="LIVE" hint={BEGINNER_HINTS.horoscope}>
            {cycles.map((c, i) => (
                <motion.div
                    key={i}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-4 p-3 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all"
                >
                    <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-lg"
                        style={{ background: `linear-gradient(135deg, ${c.color}40, ${c.color}20)`, boxShadow: `0 4px 20px ${c.color}30` }}
                    >
                        {c.energy}
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center justify-between mb-0.5">
                            <span className="text-[10px] uppercase tracking-wide text-white/40 font-medium">{c.label}</span>
                            <span className="text-xl font-bold font-display" style={{ color: c.color }}>{c.num}</span>
                        </div>
                        <p className="text-[12px] text-white/70 font-medium">{c.title}</p>
                        <p className="text-[10px] text-white/40 mt-0.5">{c.advice}</p>
                    </div>
                </motion.div>
            ))}
        </Section>
    );
};

// ==================== NAME NUMEROLOGY ====================

const NameSection = ({ name }) => {
    const data = [
        { type: 'expression', label: 'Выражение', num: calculateExpressionNumber(name), gradient: 'from-purple-500 to-violet-500' },
        { type: 'soulUrge', label: 'Душа', num: calculateSoulUrgeNumber(name), gradient: 'from-pink-500 to-rose-500' },
        { type: 'personality', label: 'Личность', num: calculatePersonalityNumber(name), gradient: 'from-cyan-500 to-blue-500' }
    ];
    return (
        <Section icon={User} title="Нумерология Имени" hint="Каждая буква имени имеет числовое значение. Из имени рассчитываются Число Выражения (таланты), Число Души (желания) и Число Личности (внешний образ).">
            <div className="grid grid-cols-3 gap-2">
                {data.map(d => {
                    const m = getNameNumberMeaning(d.type, d.num);
                    return (
                        <motion.div
                            key={d.type}
                            whileHover={{ scale: 1.05, y: -2 }}
                            className={`p-3 rounded-2xl bg-gradient-to-br ${d.gradient} bg-opacity-20 border border-white/10 text-center relative overflow-hidden`}
                            style={{ background: `linear-gradient(135deg, ${d.gradient.includes('purple') ? '#8b5cf6' : d.gradient.includes('pink') ? '#ec4899' : '#06b6d4'}15, transparent)` }}
                        >
                            <span className="text-3xl font-bold text-white drop-shadow-lg">{d.num}</span>
                            <p className="text-[9px] uppercase tracking-wide text-white/50 mt-1 font-medium">{d.label}</p>
                            <p className="text-[10px] text-white/70 mt-0.5">{m.title}</p>
                        </motion.div>
                    );
                })}
            </div>
        </Section>
    );
};

// ==================== LIFE PINNACLES ====================

const PinnaclesSection = ({ birthDate }) => {
    const pinnacles = calculateLifePinnacles(birthDate);
    const colors = ['#f43f5e', '#14b8a6', '#f59e0b', '#8b5cf6'];

    return (
        <Section icon={Mountain} title="Пики Жизни" hint={BEGINNER_HINTS.pinnacles}>
            <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-rose-500 via-teal-500 via-amber-500 to-purple-500 rounded-full" />

                <div className="space-y-3">
                    {pinnacles.map((peak, i) => (
                        <motion.div
                            key={i}
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-start gap-4 pl-2"
                        >
                            <div
                                className="w-7 h-7 rounded-full flex items-center justify-center z-10 shadow-lg"
                                style={{ background: colors[i], boxShadow: `0 4px 15px ${colors[i]}50` }}
                            >
                                <span className="text-xs font-bold text-white">{i + 1}</span>
                            </div>
                            <div className="flex-1 p-3 rounded-xl bg-white/5 border border-white/5">
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-[11px] font-medium text-white">{peak.title}</span>
                                    <span className="text-[9px] text-white/40">{peak.ages} лет</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-xl font-bold" style={{ color: colors[i] }}>{peak.number}</span>
                                    <p className="text-[10px] text-white/50 flex-1">{getPinnacleMeaning(peak.number)}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </Section>
    );
};

// ==================== TRANSITION AGES ====================

const TransitionSection = ({ birthDate }) => {
    const ages = calculateTransitionAges(birthDate);
    const [year] = birthDate.split('-').map(Number);
    const currentAge = new Date().getFullYear() - year;

    return (
        <Section icon={Clock} title="Ключевые Возрасты" hint="Ключевые возрасты — это переломные моменты в жизни, когда происходят важные перемены. Они рассчитываются индивидуально по вашей дате рождения.">
            <div className="flex gap-2 overflow-x-auto pb-2">
                {ages.map((item, i) => {
                    const isCurrent = Math.abs(currentAge - item.age) <= 3;
                    const isPast = currentAge > item.age + 3;
                    return (
                        <motion.div
                            key={i}
                            whileHover={{ scale: 1.05 }}
                            className={`flex-shrink-0 w-20 p-3 rounded-2xl text-center border transition-all ${isCurrent
                                ? 'bg-gradient-to-br from-purple-500/30 to-pink-500/20 border-purple-500/50 shadow-lg shadow-purple-500/20'
                                : isPast
                                    ? 'bg-white/5 border-white/5 opacity-50'
                                    : 'bg-white/5 border-white/10'
                                }`}
                        >
                            <span className={`text-2xl font-bold ${isCurrent ? 'text-purple-300' : 'text-white/60'}`}>{item.age}</span>
                            <p className="text-[9px] text-white/50 mt-1 font-medium">{item.title}</p>
                            {isCurrent && <span className="inline-block mt-1 px-1.5 py-0.5 text-[8px] bg-purple-500/30 text-purple-200 rounded-full">Сейчас</span>}
                        </motion.div>
                    );
                })}
            </div>
        </Section>
    );
};

// ==================== LINES ====================

const LinesSection = ({ matrix }) => {
    const lines = calculateLines(matrix);
    const all = [
        ...Object.entries(lines.rows).map(([k, v]) => ({ key: k, value: v })),
        ...Object.entries(lines.columns).map(([k, v]) => ({ key: k, value: v })),
        ...Object.entries(lines.diagonals).map(([k, v]) => ({ key: k, value: v }))
    ];

    return (
        <Section icon={TrendingUp} title="Линии Судьбы" hint={BEGINNER_HINTS.lines}>
            <div className="space-y-2.5">
                {all.map(({ key, value }, i) => {
                    const m = getLineMeaning(key, value);
                    if (!m) return null;
                    const pct = Math.min(value / 8 * 100, 100);
                    return (
                        <motion.div
                            key={key}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="p-3 rounded-xl bg-white/5 border border-white/5"
                        >
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    <span className="text-lg">{m.icon}</span>
                                    <span className="text-[12px] font-medium text-white">{m.name}</span>
                                </div>
                                <span className="text-[11px] text-purple-300 font-medium">{m.title}</span>
                            </div>
                            <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${pct}%` }}
                                    transition={{ duration: 1, ease: 'easeOut', delay: i * 0.05 }}
                                    className="h-full rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500"
                                />
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </Section>
    );
};

// ==================== DESTINY GRAPH ====================

const DestinyGraphSection = ({ dateString }) => {
    const points = calculateDestinyGraph(dateString);
    if (!points.length) return null;

    return (
        <Section icon={TrendingUp} title="График Судьбы" hint={BEGINNER_HINTS.destiny}>
            <div className="h-36 rounded-2xl bg-black/40 p-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-purple-500/10 to-transparent" />
                <svg className="w-full h-full relative z-10" viewBox="0 0 280 100" preserveAspectRatio="none">
                    <defs>
                        <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#8b5cf6" />
                            <stop offset="50%" stopColor="#ec4899" />
                            <stop offset="100%" stopColor="#f97316" />
                        </linearGradient>
                        <filter id="glow">
                            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                            <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
                        </filter>
                    </defs>
                    {[0, 25, 50, 75, 100].map(y => <line key={y} x1="0" y1={y} x2="280" y2={y} stroke="rgba(255,255,255,0.05)" />)}
                    <motion.polyline
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2, ease: 'easeInOut' }}
                        fill="none"
                        stroke="url(#lineGrad)"
                        strokeWidth="3"
                        strokeLinecap="round"
                        filter="url(#glow)"
                        points={points.map((p, i) => `${10 + i * 43},${100 - (p.destiny / 9) * 90}`).join(' ')}
                    />
                    {points.map((p, i) => (
                        <motion.circle
                            key={i}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.3 + i * 0.15 }}
                            cx={10 + i * 43}
                            cy={100 - (p.destiny / 9) * 90}
                            r="6"
                            fill="#8b5cf6"
                            stroke="#fff"
                            strokeWidth="2"
                            filter="url(#glow)"
                        />
                    ))}
                </svg>
                <div className="absolute bottom-2 left-0 right-0 flex justify-between px-4 text-[9px] text-white/40 font-medium">
                    {points.map((p, i) => <span key={i}>{p.age}</span>)}
                </div>
            </div>
        </Section>
    );
};

// ==================== KARMIC LESSONS ====================

const KarmicSection = ({ matrix }) => {
    const lessons = calculateKarmicLessons(matrix);
    if (!lessons.length) return (
        <Section icon={AlertCircle} title="Кармические Уроки" hint={BEGINNER_HINTS.karmic}>
            <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-500/20 to-teal-500/10 border border-emerald-500/30">
                <p className="text-[12px] text-emerald-300 font-medium">✓ Все числа присутствуют — карма сбалансирована</p>
            </div>
        </Section>
    );

    return (
        <Section icon={AlertCircle} title="Кармические Уроки" hint={BEGINNER_HINTS.karmic}>
            {lessons.slice(0, 3).map((num, i) => {
                const m = getKarmicLessonMeaning(num);
                return (
                    <motion.div
                        key={num}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/15 to-orange-500/10 border border-amber-500/30"
                    >
                        <div className="flex items-center gap-3 mb-2">
                            <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-amber-500/30">{num}</span>
                            <span className="text-[13px] font-semibold text-white">{m.lesson}</span>
                        </div>
                        <p className="text-[11px] text-white/60 leading-relaxed">{m.how}</p>
                    </motion.div>
                );
            })}
        </Section>
    );
};

// ==================== HEALTH ====================

const HealthSection = ({ matrix }) => {
    const recs = getHealthAnalysis(matrix);
    if (!recs.length) return null;
    return (
        <Section icon={Heart} title="Здоровье и Энергия">
            {recs.map((r, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className={`p-4 rounded-2xl border ${r.status === 'Сильное'
                        ? 'bg-gradient-to-r from-emerald-500/15 to-teal-500/10 border-emerald-500/30'
                        : 'bg-gradient-to-r from-amber-500/15 to-orange-500/10 border-amber-500/30'}`}
                >
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-[13px] font-semibold text-white">{r.area}</span>
                        <span className={`px-2 py-1 rounded-lg text-[9px] font-bold ${r.status === 'Сильное' ? 'bg-emerald-500/30 text-emerald-300' : 'bg-amber-500/30 text-amber-300'}`}>{r.status}</span>
                    </div>
                    <p className="text-[11px] text-white/60 leading-relaxed">{r.advice}</p>
                </motion.div>
            ))}
        </Section>
    );
};

// ==================== DEVELOPMENT ====================

const DevelopmentSection = ({ matrix, lifePath }) => {
    const advice = getDevelopmentAdvice(matrix, lifePath);
    if (!advice.length) return null;

    const develop = advice.filter(a => a.type === 'develop');
    const use = advice.filter(a => a.type === 'use');

    return (
        <Section icon={Lightbulb} title="Рекомендации">
            <div className="space-y-4">
                {develop.length > 0 && (
                    <div>
                        <p className="text-[10px] uppercase tracking-wide text-amber-400 font-semibold mb-2">🔧 Развивать</p>
                        {develop.map((a, i) => (
                            <p key={i} className="text-[11px] text-white/70 pl-4 py-2 border-l-2 border-amber-500/50 mb-1">{a.text}</p>
                        ))}
                    </div>
                )}
                {use.length > 0 && (
                    <div>
                        <p className="text-[10px] uppercase tracking-wide text-emerald-400 font-semibold mb-2">✨ Использовать</p>
                        {use.map((a, i) => (
                            <p key={i} className="text-[11px] text-white/70 pl-4 py-2 border-l-2 border-emerald-500/50 mb-1">{a.text}</p>
                        ))}
                    </div>
                )}
            </div>
        </Section>
    );
};

// ==================== LUCKY ELEMENTS ====================

const LuckySection = ({ lifePath }) => {
    const lucky = getLuckyElements(lifePath);
    const cards = [
        { label: 'Числа', icon: '🔢', content: lucky.numbers.slice(0, 4), gradient: 'from-yellow-500 to-amber-500' },
        { label: 'Цвета', icon: '🎨', content: lucky.colors, gradient: 'from-pink-500 to-rose-500' },
        { label: 'Дни', icon: '📅', content: lucky.days, gradient: 'from-cyan-500 to-blue-500' },
        { label: 'Камни', icon: '💎', content: lucky.stones, gradient: 'from-purple-500 to-violet-500' }
    ];

    return (
        <Section icon={Gem} title="Счастливые Элементы">
            <div className="grid grid-cols-2 gap-3">
                {cards.map((card, i) => (
                    <motion.div
                        key={i}
                        whileHover={{ scale: 1.03, y: -2 }}
                        className={`p-4 rounded-2xl bg-gradient-to-br ${card.gradient} bg-opacity-10 border border-white/10 relative overflow-hidden`}
                        style={{ background: `linear-gradient(135deg, ${card.gradient.includes('yellow') ? '#eab308' : card.gradient.includes('pink') ? '#ec4899' : card.gradient.includes('cyan') ? '#06b6d4' : '#8b5cf6'}15, transparent)` }}
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-lg">{card.icon}</span>
                            <span className="text-[10px] uppercase tracking-wide text-white/50 font-semibold">{card.label}</span>
                        </div>
                        {Array.isArray(card.content) && typeof card.content[0] === 'number' ? (
                            <div className="flex gap-1.5">
                                {card.content.map(n => (
                                    <span key={n} className="px-2 py-1 rounded-lg bg-white/10 text-white text-xs font-bold">{n}</span>
                                ))}
                            </div>
                        ) : (
                            <p className="text-[11px] text-white/80 leading-relaxed">{card.content.join(', ')}</p>
                        )}
                    </motion.div>
                ))}
            </div>
        </Section>
    );
};

// ==================== DAILY AFFIRMATION ====================

const AffirmationSection = ({ birthDate }) => {
    const [affirmation, setAffirmation] = useState('');
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const todayStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const personalDay = calculatePersonalDay(birthDate, todayStr);

    useEffect(() => {
        setAffirmation(getDailyAffirmation(personalDay));
    }, [personalDay]);

    return (
        <PremiumCard gradient>
            <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                    <Quote size={20} className="text-white" />
                </div>
                <div className="flex-1">
                    <p className="text-[10px] uppercase tracking-widest text-white/40 mb-2">Аффирмация дня</p>
                    <p className="text-[14px] text-white font-medium italic leading-relaxed">"{affirmation}"</p>
                </div>
            </div>
        </PremiumCard>
    );
};

// ==================== CHALLENGE NUMBERS ====================

const ChallengesSection = ({ birthDate }) => {
    const challenges = calculateChallengeNumbers(birthDate);
    const colors = ['#ef4444', '#f97316', '#eab308', '#22c55e'];

    return (
        <Section icon={Target} title="Числа Испытания" hint={BEGINNER_HINTS.challenges}>
            <p className="text-[10px] text-white/40 mb-3">Уроки, которые предстоит пройти в разные периоды жизни</p>
            <div className="space-y-2">
                {challenges.map((ch, i) => {
                    const meaning = getChallengeMeaning(ch.number);
                    return (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="p-3 rounded-xl bg-white/5 border border-white/5"
                        >
                            <div className="flex items-center gap-3 mb-2">
                                <div
                                    className="w-8 h-8 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-lg"
                                    style={{ background: colors[i], boxShadow: `0 4px 15px ${colors[i]}40` }}
                                >
                                    {ch.number}
                                </div>
                                <div className="flex-1">
                                    <p className="text-[11px] font-medium text-white">{meaning.title}</p>
                                    <p className="text-[9px] text-white/40">{ch.period}</p>
                                </div>
                            </div>
                            <p className="text-[10px] text-white/60">{meaning.desc}</p>
                            <p className="text-[9px] text-amber-300 mt-1">💡 {meaning.advice}</p>
                        </motion.div>
                    );
                })}
            </div>
        </Section>
    );
};

// ==================== HIDDEN PASSIONS ====================

const HiddenPassionsSection = ({ name }) => {
    const passions = calculateHiddenPassions(name);

    if (passions.length === 0) return null;

    return (
        <Section icon={Flame} title="Скрытые Страсти">
            <p className="text-[10px] text-white/40 mb-3">Глубинные мотивации, проявляющиеся в вашем имени</p>
            <div className="space-y-2">
                {passions.map((p, i) => {
                    const meaning = getHiddenPassionMeaning(p.number);
                    return (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className="p-4 rounded-2xl bg-gradient-to-r from-orange-500/15 to-red-500/10 border border-orange-500/30"
                        >
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-lg shadow-orange-500/30">
                                    <span className="text-lg font-bold text-white">{p.number}</span>
                                </div>
                                <div>
                                    <p className="text-[12px] font-semibold text-white">{meaning.title}</p>
                                    <p className="text-[9px] text-white/40">Встречается {p.count} раз</p>
                                </div>
                            </div>
                            <p className="text-[11px] text-white/60">{meaning.desc}</p>
                        </motion.div>
                    );
                })}
            </div>
        </Section>
    );
};

// ==================== LOVE ADVICE ====================

const LoveSection = ({ lifePath }) => {
    const advice = getLoveAdvice(lifePath);

    return (
        <Section icon={Heart} title="Любовь и Отношения">
            <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-gradient-to-r from-pink-500/15 to-rose-500/10 border border-pink-500/30">
                    <p className="text-[10px] uppercase tracking-wide text-pink-300 mb-1">Ваш стиль</p>
                    <p className="text-[14px] font-semibold text-white">{advice.style}</p>
                </div>

                <div className="grid grid-cols-2 gap-2">
                    <div className="p-3 rounded-xl bg-white/5">
                        <p className="text-[9px] uppercase text-emerald-400 mb-1">❤️ Даёте</p>
                        <p className="text-[10px] text-white/70">{advice.gives}</p>
                    </div>
                    <div className="p-3 rounded-xl bg-white/5">
                        <p className="text-[9px] uppercase text-cyan-400 mb-1">💙 Нужно</p>
                        <p className="text-[10px] text-white/70">{advice.needs}</p>
                    </div>
                </div>

                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
                    <p className="text-[9px] uppercase text-amber-400 mb-1">⚠️ Вызовы</p>
                    <p className="text-[10px] text-white/70">{advice.challenges}</p>
                </div>

                <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20">
                    <p className="text-[9px] uppercase text-purple-400 mb-1">💡 Совет</p>
                    <p className="text-[11px] text-white/80 italic">{advice.tips}</p>
                </div>

                <div className="flex items-center gap-2">
                    <span className="text-[10px] text-white/40">Лучшая совместимость:</span>
                    <div className="flex gap-1.5">
                        {advice.bestMatch.map(n => (
                            <span key={n} className="px-2 py-1 rounded-lg bg-pink-500/20 text-pink-300 text-xs font-bold">{n}</span>
                        ))}
                    </div>
                </div>
            </div>
        </Section>
    );
};

// ==================== FINANCIAL PROFILE ====================

const FinanceSection = ({ lifePath, matrix }) => {
    const profile = getFinancialProfile(lifePath, matrix);

    return (
        <Section icon={DollarSign} title="Финансовый Профиль">
            <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-500/15 to-teal-500/10 border border-emerald-500/30 mb-3">
                <p className="text-[10px] uppercase tracking-wide text-emerald-300 mb-1">Архетип</p>
                <p className="text-[16px] font-semibold text-white">{profile.style}</p>
            </div>

            <div className="space-y-2">
                <div className="p-3 rounded-xl bg-white/5 flex items-start gap-3">
                    <span className="text-lg">💪</span>
                    <div>
                        <p className="text-[10px] uppercase text-white/40 mb-0.5">Сила</p>
                        <p className="text-[11px] text-white/80">{profile.strength}</p>
                    </div>
                </div>

                <div className="p-3 rounded-xl bg-white/5 flex items-start gap-3">
                    <span className="text-lg">⚡</span>
                    <div>
                        <p className="text-[10px] uppercase text-white/40 mb-0.5">Слабость</p>
                        <p className="text-[11px] text-white/80">{profile.weakness}</p>
                    </div>
                </div>

                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                    <p className="text-[11px] text-emerald-300">💡 {profile.advice}</p>
                </div>

                {profile.additions?.length > 0 && (
                    <div className="mt-2 space-y-1">
                        {profile.additions.map((a, i) => (
                            <p key={i} className="text-[10px] text-white/50 pl-3 border-l border-emerald-500/30">{a}</p>
                        ))}
                    </div>
                )}
            </div>
        </Section>
    );
};

// ==================== SOUL MISSION ====================

const SoulMissionSection = ({ lifePath, name }) => {
    const expressionNum = calculateExpressionNumber(name);
    const soulUrgeNum = calculateSoulUrgeNumber(name);
    const mission = getSoulMission(lifePath, expressionNum, soulUrgeNum);

    return (
        <PremiumCard gradient className="relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-purple-500/30 to-pink-500/20 rounded-full blur-3xl" />
            <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="text-yellow-400" size={18} />
                    <span className="text-[11px] uppercase tracking-widest text-white/50 font-medium">Миссия Души</span>
                </div>
                <p className="text-[14px] text-white/90 leading-relaxed">{mission}</p>
            </div>
        </PremiumCard>
    );
};

// ==================== COMPATIBILITY ====================

const CompatibilitySection = ({ birthDate, onCalculate }) => {
    const [partnerDate, setPartnerDate] = useState('');
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');

    const parseDate = (text) => {
        const cleaned = text.replace(/[^\d./-]/g, '');
        let day, month, year;
        const match1 = cleaned.match(/^(\d{1,2})[./-](\d{1,2})[./-](\d{4})$/);
        if (match1) [, day, month, year] = match1;
        const match2 = cleaned.match(/^(\d{2})(\d{2})(\d{4})$/);
        if (match2) [, day, month, year] = match2;
        if (day && month && year) {
            const d = parseInt(day), m = parseInt(month), y = parseInt(year);
            if (d >= 1 && d <= 31 && m >= 1 && m <= 12 && y >= 1900 && y <= new Date().getFullYear()) {
                return `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
            }
        }
        return null;
    };

    const handleCalculate = () => {
        const parsed = parseDate(partnerDate);
        if (!parsed) {
            setError('Введите дату в формате ДД.ММ.ГГГГ');
            return;
        }
        setError('');
        const compatibility = calculateFullCompatibility(birthDate, parsed);
        setResult(compatibility);
    };

    return (
        <Section icon={Users} title="Совместимость" hint={BEGINNER_HINTS.compatibility}>
            <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-2">
                    <input
                        type="text"
                        value={partnerDate}
                        onChange={(e) => setPartnerDate(e.target.value)}
                        placeholder="Дата партнёра (ДД.ММ.ГГГГ)"
                        className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-[13px] placeholder-white/30 focus:outline-none focus:border-purple-500/50"
                    />
                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={handleCalculate}
                        className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white text-[13px] font-semibold shadow-lg shadow-pink-500/20"
                    >
                        💕 Рассчитать
                    </motion.button>
                </div>

                {error && <p className="text-red-400 text-[11px]">{error}</p>}

                {result && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-3"
                    >
                        <div className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-pink-500/20 to-rose-500/10 border border-pink-500/30">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-pink-500/30 flex items-center justify-center">
                                    <span className="text-2xl font-bold text-white">{result.person1.lifePath}</span>
                                </div>
                                <Heart className="text-pink-400" size={20} />
                                <div className="w-12 h-12 rounded-xl bg-pink-500/30 flex items-center justify-center">
                                    <span className="text-2xl font-bold text-white">{result.person2.lifePath}</span>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-3xl font-bold text-pink-300">{result.score}%</p>
                                <p className="text-[10px] text-white/50">{result.analysis.level}</p>
                            </div>
                        </div>

                        <p className="text-[12px] text-white/70">{result.analysis.summary}</p>

                        <div className="grid grid-cols-1 gap-2">
                            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                                <p className="text-[9px] uppercase text-emerald-400 mb-1">💪 Сила союза</p>
                                <p className="text-[11px] text-white/80">{result.analysis.strength}</p>
                            </div>
                            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
                                <p className="text-[9px] uppercase text-amber-400 mb-1">⚡ Вызов</p>
                                <p className="text-[11px] text-white/80">{result.analysis.challenge}</p>
                            </div>
                            <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20">
                                <p className="text-[9px] uppercase text-purple-400 mb-1">💡 Совет</p>
                                <p className="text-[11px] text-white/80">{result.analysis.tip}</p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        </Section>
    );
};

// ==================== DAILY HOROSCOPE ====================

const DailyHoroscopeSection = ({ birthDate }) => {
    const horoscope = getDailyHoroscope(birthDate);

    return (
        <Section icon={Sun} title="Прогноз на Сегодня" badge="LIVE" defaultOpen={true} hint={BEGINNER_HINTS.horoscope}>
            <div className="space-y-3">
                <div className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-amber-500/20 to-orange-500/10 border border-amber-500/30">
                    <div>
                        <p className="text-[10px] uppercase text-white/40">{horoscope.date.split('-').reverse().join('.')}</p>
                        <p className="text-[16px] font-semibold text-white flex items-center gap-2">
                            <span className="text-xl">{horoscope.energy}</span>
                            {horoscope.theme}
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] text-white/40">Персональный день</p>
                        <p className="text-3xl font-bold" style={{ color: horoscope.color }}>{horoscope.personalDay}</p>
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="p-3 rounded-xl bg-white/5">
                        <p className="text-[9px] uppercase text-cyan-400 mb-1">🌅 Утро</p>
                        <p className="text-[11px] text-white/70">{horoscope.morning}</p>
                    </div>
                    <div className="p-3 rounded-xl bg-white/5">
                        <p className="text-[9px] uppercase text-yellow-400 mb-1">☀️ День</p>
                        <p className="text-[11px] text-white/70">{horoscope.afternoon}</p>
                    </div>
                    <div className="p-3 rounded-xl bg-white/5">
                        <p className="text-[9px] uppercase text-purple-400 mb-1">🌙 Вечер</p>
                        <p className="text-[11px] text-white/70">{horoscope.evening}</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                    <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                        <p className="text-[9px] uppercase text-emerald-400 mb-1">✨ Возможность</p>
                        <p className="text-[10px] text-white/70">{horoscope.opportunity}</p>
                    </div>
                    <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
                        <p className="text-[9px] uppercase text-amber-400 mb-1">⚠️ Вызов</p>
                        <p className="text-[10px] text-white/70">{horoscope.challenge}</p>
                    </div>
                </div>

                <div className="p-3 rounded-xl bg-white/5">
                    <p className="text-[9px] uppercase text-white/40 mb-2">⏰ Благоприятные часы</p>
                    <div className="flex gap-2">
                        {horoscope.luckyHours.map((h, i) => (
                            <span key={i} className="px-2 py-1 rounded-lg bg-purple-500/20 text-purple-300 text-[10px] font-medium">{h}</span>
                        ))}
                    </div>
                </div>
            </div>
        </Section>
    );
};

// ==================== MONTHLY HOROSCOPE ====================

const MonthlyHoroscopeSection = ({ birthDate }) => {
    const horoscope = getMonthlyHoroscope(birthDate);

    return (
        <Section icon={Moon} title={`Прогноз: ${horoscope.monthName}`}>
            <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-500/20 to-purple-500/10 border border-indigo-500/30">
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-[10px] uppercase text-white/40">Персональный месяц</p>
                        <span className="text-2xl font-bold" style={{ color: horoscope.color }}>{horoscope.personalMonth}</span>
                    </div>
                    <p className="text-[14px] font-semibold text-white flex items-center gap-2">
                        <span className="text-lg">{horoscope.energy}</span>
                        {horoscope.theme}
                    </p>
                </div>

                <p className="text-[12px] text-white/70 italic">{horoscope.summary}</p>

                <div className="p-3 rounded-xl bg-white/5">
                    <p className="text-[9px] uppercase text-white/40 mb-2">🎯 Фокус месяца</p>
                    <div className="flex flex-wrap gap-1.5">
                        {horoscope.focus.map((f, i) => (
                            <span key={i} className="px-2 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 text-[10px]">{f}</span>
                        ))}
                    </div>
                </div>

                <div className="p-3 rounded-xl bg-white/5">
                    <p className="text-[9px] uppercase text-white/40 mb-2">📅 Недельные ритмы</p>
                    <div className="space-y-1.5">
                        {horoscope.weeks.map((w, i) => (
                            <div key={i} className="flex items-center justify-between text-[10px]">
                                <span className="text-white/50">{w.period} число</span>
                                <span className="text-white/80 font-medium">{w.focus}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {horoscope.luckyDates.length > 0 && (
                    <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                        <p className="text-[9px] uppercase text-emerald-400 mb-2">🍀 Удачные дни</p>
                        <div className="flex flex-wrap gap-1.5">
                            {horoscope.luckyDates.map((d, i) => (
                                <span key={i} className="px-2 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">{d.day} {d.dayOfWeek}</span>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </Section>
    );
};

// ==================== YEAR FORECAST ====================

const YearForecastSection = ({ birthDate }) => {
    const year = new Date().getFullYear();
    const forecast = getYearForecast(birthDate, year);

    return (
        <Section icon={CalendarDays} title={`Прогноз на ${year} год`}>
            <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-gradient-to-r from-cyan-500/20 to-blue-500/10 border border-cyan-500/30">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-[10px] uppercase text-white/40">Персональный год</p>
                            <p className="text-[14px] font-semibold text-white flex items-center gap-2">
                                <span className="text-lg">{forecast.yearTheme.energy}</span>
                                {forecast.yearTheme.title}
                            </p>
                        </div>
                        <div className="w-14 h-14 rounded-2xl bg-cyan-500/30 flex items-center justify-center">
                            <span className="text-3xl font-bold text-white">{forecast.personalYear}</span>
                        </div>
                    </div>
                </div>

                <p className="text-[11px] text-white/60">{forecast.yearTheme.desc}</p>

                <div className="grid grid-cols-3 gap-2">
                    {forecast.months.map((m, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ scale: 1.05 }}
                            className="p-2 rounded-xl bg-white/5 text-center border border-white/5 hover:border-white/20 transition-all"
                        >
                            <p className="text-[9px] text-white/40">{m.name.slice(0, 3)}</p>
                            <p className="text-lg font-bold text-white">{m.personalMonth}</p>
                            <p className="text-[8px] text-white/50">{m.theme}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </Section>
    );
};

// ==================== LUCKY DATES ====================

const LuckyDatesSection = ({ birthDate }) => {
    const now = new Date();
    const dates = calculateLuckyDates(birthDate, now.getFullYear(), now.getMonth() + 1);
    const excellent = dates.filter(d => d.rating >= 85).slice(0, 5);
    const good = dates.filter(d => d.rating >= 70 && d.rating < 85).slice(0, 5);

    return (
        <Section icon={Calendar} title="Удачные Даты Месяца">
            <div className="space-y-3">
                {excellent.length > 0 && (
                    <div>
                        <p className="text-[10px] uppercase text-emerald-400 mb-2">⭐ Отличные дни</p>
                        <div className="flex flex-wrap gap-2">
                            {excellent.map((d, i) => (
                                <motion.div
                                    key={i}
                                    whileHover={{ scale: 1.1 }}
                                    className="w-12 h-14 rounded-xl bg-gradient-to-br from-emerald-500/30 to-teal-500/20 border border-emerald-500/30 flex flex-col items-center justify-center"
                                >
                                    <span className="text-lg font-bold text-white">{d.day}</span>
                                    <span className="text-[8px] text-white/50">{d.dayOfWeek}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                )}

                {good.length > 0 && (
                    <div>
                        <p className="text-[10px] uppercase text-cyan-400 mb-2">✓ Хорошие дни</p>
                        <div className="flex flex-wrap gap-2">
                            {good.map((d, i) => (
                                <div
                                    key={i}
                                    className="w-10 h-12 rounded-lg bg-white/5 border border-white/10 flex flex-col items-center justify-center"
                                >
                                    <span className="text-sm font-bold text-white">{d.day}</span>
                                    <span className="text-[7px] text-white/50">{d.dayOfWeek}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <p className="text-[9px] text-white/40 italic">* Рейтинг основан на совместимости Персонального и Универсального дня</p>
            </div>
        </Section>
    );
};

// ==================== BIORHYTHMS SECTION ====================

const BiorhythmSection = ({ birthDate }) => {
    const bio = calculateBiorhythms(birthDate);

    const getBarColor = (value) => {
        if (value > 50) return 'from-emerald-500 to-green-400';
        if (value > 0) return 'from-yellow-500 to-amber-400';
        if (value > -50) return 'from-orange-500 to-red-400';
        return 'from-red-600 to-red-500';
    };

    const cycles = [
        { name: 'Физический', value: bio.physical, icon: '💪', color: 'red' },
        { name: 'Эмоциональный', value: bio.emotional, icon: '💚', color: 'green' },
        { name: 'Интеллектуальный', value: bio.intellectual, icon: '🧠', color: 'blue' }
    ];

    return (
        <Section icon={Activity} title="Биоритмы на сегодня" badge="LIVE" hint={BEGINNER_HINTS.biorhythm}>
            <div className="space-y-4">
                {cycles.map((cycle, i) => (
                    <div key={i} className="space-y-1.5">
                        <div className="flex justify-between items-center">
                            <span className="text-[12px] text-white/70">{cycle.icon} {cycle.name}</span>
                            <span className={`text-[13px] font-bold ${cycle.value > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                                {cycle.value > 0 ? '+' : ''}{cycle.value}%
                            </span>
                        </div>
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${Math.abs(cycle.value)}%` }}
                                transition={{ duration: 1, delay: i * 0.1 }}
                                className={`h-full rounded-full bg-gradient-to-r ${getBarColor(cycle.value)}`}
                            />
                        </div>
                    </div>
                ))}

                <div className="pt-3 border-t border-white/10">
                    <p className="text-[11px] text-white/50 mb-2">📌 Рекомендации:</p>
                    {bio.advice.map((adv, i) => (
                        <p key={i} className="text-[12px] text-white/70">• {adv}</p>
                    ))}
                </div>
            </div>
        </Section>
    );
};

// ==================== KARMIC DEBT SECTION ====================

const KarmicDebtSection = ({ birthDate, name }) => {
    const debts = calculateKarmicDebt(birthDate, name);

    if (debts.length === 0) {
        return (
            <Section icon={AlertCircle} title="Кармические долги">
                <div className="text-center py-4">
                    <span className="text-3xl">✨</span>
                    <p className="text-[13px] text-white/70 mt-2">У вас нет кармических долгов!</p>
                    <p className="text-[11px] text-white/40 mt-1">Это редкий и благоприятный знак</p>
                </div>
            </Section>
        );
    }

    return (
        <Section icon={AlertCircle} title="Кармические долги">
            <div className="space-y-4">
                {debts.map((debt, i) => (
                    <div key={i} className="p-3 rounded-xl bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-white font-bold">
                                {debt.number}
                            </div>
                            <div>
                                <p className="text-[13px] font-semibold text-white">{debt.name}</p>
                                <p className="text-[10px] text-white/40">{debt.source}</p>
                            </div>
                        </div>
                        <div className="space-y-1.5 text-[11px]">
                            <p className="text-white/60"><span className="text-red-400">Карма:</span> {debt.karma}</p>
                            <p className="text-white/60"><span className="text-yellow-400">Урок:</span> {debt.lesson}</p>
                            <p className="text-white/60"><span className="text-emerald-400">Совет:</span> {debt.advice}</p>
                        </div>
                    </div>
                ))}
            </div>
        </Section>
    );
};

// ==================== PLANETARY SECTION ====================

const PlanetarySection = ({ lifePath }) => {
    const planet = getPlanetaryAssociation(lifePath);

    return (
        <Section icon={Orbit} title="Планетарное влияние" hint={BEGINNER_HINTS.planetary}>
            <div className="text-center py-2">
                <div className="text-5xl mb-3">{planet.symbol}</div>
                <h3 className="text-xl font-bold text-white">{planet.planet}</h3>
                <p className="text-[12px] text-white/50 mt-1">{planet.energy}</p>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-4">
                <InfoCard label="День силы" value={planet.day} />
                <InfoCard label="Цвета" value={planet.color} />
                <InfoCard label="Металл" value={planet.metal} />
                <InfoCard label="Камни" value={planet.gem} />
            </div>
        </Section>
    );
};

const InfoCard = ({ label, value }) => (
    <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
        <p className="text-[9px] text-white/40 uppercase tracking-wider">{label}</p>
        <p className="text-[12px] text-white/80 mt-0.5">{value}</p>
    </div>
);

// ==================== TAROT SECTION ====================

const TarotSection = ({ lifePath }) => {
    const tarot = getTarotConnection(lifePath);

    return (
        <Section icon={Star} title="Связь с Таро" hint={BEGINNER_HINTS.tarot}>
            <div className="flex items-center gap-4">
                <div className="w-16 h-24 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-800 flex items-center justify-center border border-purple-400/30 shadow-lg shadow-purple-500/20">
                    <span className="text-2xl font-bold text-white">{tarot.arcana}</span>
                </div>
                <div className="flex-1">
                    <h3 className="text-lg font-bold text-white">{tarot.card}</h3>
                    <p className="text-[12px] text-purple-300 mt-1">Аркан {tarot.arcana}</p>
                    <p className="text-[11px] text-white/60 mt-2">{tarot.meaning}</p>
                </div>
            </div>
            <p className="text-[10px] text-white/40 mt-3 italic">
                Эта карта отражает основную энергию вашего Жизненного Пути
            </p>
        </Section>
    );
};

// ==================== POWER NUMBER SECTION ====================

const PowerNumberSection = ({ lifePath, name }) => {
    const expression = calculateExpressionNumber(name);
    const power = calculatePowerNumber(lifePath, expression);
    const maturity = calculateMaturityNumber(lifePath, expression);

    return (
        <Section icon={Zap} title="Числа Силы и Зрелости">
            <div className="space-y-4">
                {/* Power Number */}
                <div className="flex items-center gap-4 p-3 rounded-xl bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center shadow-lg">
                        <span className="text-2xl font-bold text-white">{power.number}</span>
                    </div>
                    <div className="flex-1">
                        <p className="text-[10px] text-white/40 uppercase">Число Силы</p>
                        <p className="text-[13px] text-white/80 mt-1">{power.meaning}</p>
                    </div>
                </div>

                {/* Maturity Number */}
                <div className="flex items-center gap-4 p-3 rounded-xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center shadow-lg">
                        <span className="text-2xl font-bold text-white">{maturity.number}</span>
                    </div>
                    <div className="flex-1">
                        <p className="text-[10px] text-white/40 uppercase">Число Зрелости</p>
                        <p className="text-[11px] text-white/60">Активируется: {maturity.activationAge}</p>
                        <p className="text-[12px] text-white/80 mt-1">{maturity.meaning}</p>
                    </div>
                </div>
            </div>
        </Section>
    );
};

// ==================== CELL MODAL ====================

const CellModal = ({ num, count, onClose }) => {
    const m = getCellDetailedMeaning(num, count);
    if (!m) return null;

    const handleClose = (e) => {
        e.preventDefault();
        e.stopPropagation();
        onClose();
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[100] flex items-center justify-center p-4 sm:p-6"
            onClick={handleClose}
        >
            <motion.div
                initial={{ scale: 0.8, y: 40 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.8, y: 40 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className="w-full max-w-sm mx-4"
                onClick={e => e.stopPropagation()}
            >
                <div className="relative overflow-hidden rounded-3xl p-5 bg-gradient-to-br from-white/[0.12] to-white/[0.04] backdrop-blur-xl border border-white/20 shadow-2xl">
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
                    <div className="flex items-center gap-4 mb-5">
                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-xl shadow-purple-500/30 flex-shrink-0">
                            <span className="text-xl sm:text-2xl font-bold text-white">{count > 0 ? num.toString().repeat(Math.min(count, 2)) : '—'}</span>
                        </div>
                        <div className="min-w-0">
                            <h3 className="text-lg sm:text-xl font-bold text-white truncate">{m.label}</h3>
                            <p className="text-purple-300 text-sm font-medium">{m.title}</p>
                        </div>
                    </div>
                    <p className="text-[13px] sm:text-[14px] text-white/80 leading-relaxed mb-5">{m.text}</p>
                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={handleClose}
                        type="button"
                        className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold shadow-lg shadow-purple-500/30 active:scale-95 transition-transform"
                    >
                        Понятно
                    </motion.button>
                </div>
            </motion.div>
        </motion.div>
    );
};

// ==================== MAIN DASHBOARD ====================

const ResultDashboard = ({ data, onReset }) => {
    const [selectedCell, setSelectedCell] = useState(null);

    const lifePath = calculateLifePathNumber(data.birthDate);
    const matrix = calculatePsychomatrix(data.birthDate);
    const meaning = getLifePathMeaning(lifePath);
    const details = getLifePathDetailed(lifePath);
    const isBeginner = data.isBeginner ?? false;
    const { toggleTheme, isDark } = useTheme();

    const content = (
        <div className="w-full h-full overflow-y-auto overflow-x-hidden px-4 sm:px-5 pb-12 pt-4 space-y-4">

            {/* Beginner Welcome */}
            {isBeginner && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-2xl bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20"
                >
                    <div className="flex items-start gap-3">
                        <span className="text-2xl">📚</span>
                        <div>
                            <p className="text-[13px] font-semibold text-white">Режим обучения включён</p>
                            <p className="text-[11px] text-white/60 mt-1">
                                Ищите значок 💡 — там будут пояснения для новичков. Нажимайте на секции, чтобы раскрыть детали.
                            </p>
                        </div>
                    </div>
                </motion.div>
            )}

            {/* Header */}
            <header className="text-center py-4 sm:py-5 relative">
                {/* Theme Toggle */}
                <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={toggleTheme}
                    className="absolute top-4 right-4 p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                >
                    <Palette size={16} className="text-white/50" />
                </motion.button>

                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-3"
                >
                    <Sparkles className="text-purple-400" size={14} />
                    <span className="text-[10px] sm:text-[11px] uppercase tracking-widest text-white/50 font-medium">Анализ завершён</span>
                </motion.div>
                <motion.h1
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-2xl sm:text-3xl font-display font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent px-4"
                >
                    {data.name}
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-white/40 text-[12px] mt-1"
                >
                    {data.birthDate.split('-').reverse().join('.')}
                </motion.p>
            </header>

            <LifePathSection lifePath={lifePath} meaning={meaning} details={details} />
            <BirthdaySection birthDate={data.birthDate} />
            <PersonalCyclesSection birthDate={data.birthDate} />
            <NameSection name={data.name} />

            {/* Psychomatrix */}
            <PremiumCard>
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-purple-500/30 to-pink-500/20 flex items-center justify-center border border-purple-500/20">
                        <Grid3X3 size={16} className="text-purple-300" />
                    </div>
                    <span className="text-[14px] font-semibold text-white">Квадрат Пифагора</span>
                    <span className="ml-auto text-[10px] text-white/30">tap для деталей</span>
                </div>
                <PsychomatrixGrid matrix={matrix} onCellClick={setSelectedCell} />
            </PremiumCard>

            <LinesSection matrix={matrix} />
            <DestinyGraphSection dateString={data.birthDate} />

            {/* === ПРОГНОЗЫ === */}
            <BiorhythmSection birthDate={data.birthDate} />
            <DailyHoroscopeSection birthDate={data.birthDate} />
            <MonthlyHoroscopeSection birthDate={data.birthDate} />
            <YearForecastSection birthDate={data.birthDate} />
            <LuckyDatesSection birthDate={data.birthDate} />
            <CompatibilitySection birthDate={data.birthDate} />

            {/* === АНАЛИЗ ЛИЧНОСТИ === */}
            <PlanetarySection lifePath={lifePath} />
            <TarotSection lifePath={lifePath} />
            <PowerNumberSection lifePath={lifePath} name={data.name} />
            <PinnaclesSection birthDate={data.birthDate} />
            <TransitionSection birthDate={data.birthDate} />
            <KarmicSection matrix={matrix} />
            <KarmicDebtSection birthDate={data.birthDate} name={data.name} />
            <HealthSection matrix={matrix} />
            <DevelopmentSection matrix={matrix} lifePath={lifePath} />
            <ChallengesSection birthDate={data.birthDate} />
            <HiddenPassionsSection name={data.name} />
            <LoveSection lifePath={lifePath} />
            <FinanceSection lifePath={lifePath} matrix={matrix} />
            <LuckySection lifePath={lifePath} />
            <AffirmationSection birthDate={data.birthDate} />
            <SoulMissionSection lifePath={lifePath} name={data.name} />

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-6">
                {/* Share Button */}
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                        const text = `✨ Моё Число Жизненного Пути: ${lifePath}\n🔮 ${meaning}\n\nУзнай свою судьбу:`;
                        if (navigator.share) {
                            navigator.share({
                                title: 'Мой нумерологический анализ',
                                text: text,
                                url: window.location.href
                            });
                        } else {
                            navigator.clipboard.writeText(text + ' ' + window.location.href);
                            alert('Ссылка скопирована!');
                        }
                    }}
                    className="flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-blue-500/30 border border-white/10 text-white text-[13px] sm:text-[14px] font-semibold transition-all"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                    Поделиться
                </motion.button>

                {/* Reset Button */}
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onReset}
                    className="flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 hover:from-purple-500/30 hover:to-pink-500/30 border border-white/10 text-white text-[13px] sm:text-[14px] font-semibold transition-all shadow-lg shadow-purple-500/10"
                >
                    <RotateCcw size={16} />
                    Новый анализ
                </motion.button>
            </div>

            {/* Support Author Button */}
            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={async () => {
                    try {
                        const response = await fetch('/api/create-invoice', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' }
                        });
                        const data = await response.json();
                        if (data.success && data.invoiceLink) {
                            window.open(data.invoiceLink, '_blank');
                        } else {
                            window.open('https://t.me/Izoterikapro_bot?start=donate', '_blank');
                        }
                    } catch (error) {
                        window.open('https://t.me/Izoterikapro_bot?start=donate', '_blank');
                    }
                }}
                className="relative mt-4 flex items-center justify-center gap-3 w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500/20 via-yellow-500/20 to-amber-500/20 hover:from-amber-500/30 hover:via-yellow-500/30 hover:to-amber-500/30 border border-yellow-500/30 overflow-hidden group cursor-pointer"
            >
                {/* Animated stars background */}
                <div className="absolute inset-0 opacity-30">
                    {[...Array(6)].map((_, i) => (
                        <motion.span
                            key={i}
                            animate={{
                                y: [-20, 100],
                                x: [0, Math.sin(i) * 20],
                                opacity: [0, 1, 0],
                            }}
                            transition={{
                                duration: 2 + i * 0.3,
                                repeat: Infinity,
                                delay: i * 0.4,
                            }}
                            className="absolute text-yellow-400"
                            style={{ left: `${15 + i * 14}%`, top: '-10%' }}
                        >
                            ⭐
                        </motion.span>
                    ))}
                </div>

                {/* Telegram Star Icon */}
                <div className="relative flex items-center gap-2">
                    <svg className="w-5 h-5 text-yellow-400" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                    </svg>
                    <span className="text-[14px] font-semibold text-white">Поддержать автора</span>
                    <svg className="w-5 h-5 text-yellow-400" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                    </svg>
                </div>

                {/* Subtitle */}
                <motion.span
                    className="absolute bottom-1 text-[9px] text-yellow-400/70"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    100 ⭐ Telegram Stars
                </motion.span>
            </motion.button>

            {/* Footer */}
            <footer className="text-center pt-8 pb-4">
                <p className="text-white/20 text-[10px]">
                    Нумеролог AI • 2026
                </p>
                <p className="text-white/10 text-[9px] mt-1">
                    Анализ основан на классической нумерологии
                </p>
            </footer>

            <AnimatePresence>
                {selectedCell !== null && (
                    <CellModal num={selectedCell} count={matrix[selectedCell]} onClose={() => setSelectedCell(null)} />
                )}
            </AnimatePresence>
        </div >
    );

    // Wrap everything in BeginnerContext
    return (
        <BeginnerContext.Provider value={isBeginner}>
            {content}
        </BeginnerContext.Provider>
    );
};

export default ResultDashboard;
