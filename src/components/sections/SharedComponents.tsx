// Shared UI components for sections - TypeScript version
import React, { useState, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, LucideIcon } from 'lucide-react';

// Types
interface PremiumCardProps {
    children: ReactNode;
    index?: number;
}

interface BeginnerHintProps {
    text: string;
}

interface SectionProps {
    icon: LucideIcon;
    title: string;
    badge?: string;
    children: ReactNode;
    defaultOpen?: boolean;
    hint?: string | null;
    isBeginner?: boolean;
}

type NumberSize = 'lg' | 'md' | 'sm';

interface GlowNumberProps {
    number: number | string;
    size?: NumberSize;
    color?: string;
}

interface ProgressBarProps {
    value: number;
    color?: string;
    label?: string;
    showValue?: boolean;
}

interface StatCardProps {
    icon?: LucideIcon;
    label: string;
    value: string | number;
    sublabel?: string;
    gradient?: string;
}

// Premium Card wrapper
export const PremiumCard: React.FC<PremiumCardProps> = ({ children, index = 0 }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.05 }}
        className="glass-card p-4 sm:p-5"
    >
        {children}
    </motion.div>
);

// Beginner help tooltip component
export const BeginnerHint: React.FC<BeginnerHintProps> = ({ text }) => (
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

// Section component with collapsible content
export const Section: React.FC<SectionProps> = ({
    icon: Icon,
    title,
    badge,
    children,
    defaultOpen = false,
    hint = null,
    isBeginner = false
}) => {
    const [open, setOpen] = useState<boolean>(defaultOpen);
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

// Glowing number display
export const GlowNumber: React.FC<GlowNumberProps> = ({ number, size = 'lg', color = 'purple' }) => (
    <div className="relative flex items-center justify-center">
        <div className={`absolute inset-0 bg-gradient-to-r from-${color}-500 to-pink-500 blur-2xl opacity-50 rounded-full scale-150`} />
        <span className={`relative z-10 font-display font-bold bg-gradient-to-br from-white via-${color}-200 to-pink-200 bg-clip-text text-transparent ${size === 'lg' ? 'text-6xl' : size === 'md' ? 'text-3xl' : 'text-xl'}`}>
            {number}
        </span>
    </div>
);

// Progress bar for biorhythms and other metrics
export const ProgressBar: React.FC<ProgressBarProps> = ({ value, color = 'purple', label, showValue = true }) => {
    const percentage = Math.abs(value);
    const isNegative = value < 0;

    return (
        <div className="space-y-1">
            {label && (
                <div className="flex justify-between text-[10px]">
                    <span className="text-white/50">{label}</span>
                    {showValue && <span className={`font-medium ${isNegative ? 'text-red-400' : 'text-emerald-400'}`}>{value}%</span>}
                </div>
            )}
            <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className={`h-full rounded-full bg-gradient-to-r ${isNegative ? 'from-red-500 to-orange-500' : `from-${color}-500 to-pink-500`}`}
                />
            </div>
        </div>
    );
};

// Stat card for displaying metrics
export const StatCard: React.FC<StatCardProps> = ({ icon: Icon, label, value, sublabel, gradient = 'from-purple-500/20 to-pink-500/10' }) => (
    <div className={`p-3 rounded-xl bg-gradient-to-br ${gradient} border border-white/10`}>
        <div className="flex items-center gap-2 mb-1">
            {Icon && <Icon size={12} className="text-white/50" />}
            <span className="text-[10px] text-white/50 uppercase">{label}</span>
        </div>
        <p className="text-lg font-bold text-white">{value}</p>
        {sublabel && <p className="text-[10px] text-white/40 mt-0.5">{sublabel}</p>}
    </div>
);

// Export all components
const SharedComponents = { PremiumCard, BeginnerHint, Section, GlowNumber, ProgressBar, StatCard };
export default SharedComponents;
