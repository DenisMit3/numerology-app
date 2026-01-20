import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles, Zap } from 'lucide-react';

// Typing effect component
const TypingText = ({ text, speed = 15, onComplete }) => {
    const [displayed, setDisplayed] = useState('');
    const completedRef = useRef(false);

    useEffect(() => {
        if (displayed.length < text.length) {
            const timer = setTimeout(() => {
                setDisplayed(text.slice(0, displayed.length + 1));
            }, speed + Math.random() * 8);
            return () => clearTimeout(timer);
        } else if (!completedRef.current) {
            completedRef.current = true;
            onComplete?.();
        }
    }, [displayed, text, speed, onComplete]);

    return (
        <>
            {displayed}
            {displayed.length < text.length && (
                <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                    className="inline-block w-0.5 h-4 bg-gradient-to-b from-purple-400 to-pink-400 ml-0.5 rounded-full"
                />
            )}
        </>
    );
};

// Date parser
const parseDate = (text) => {
    const cleaned = text.replace(/[^\d./-]/g, '');
    let day, month, year;

    const match1 = cleaned.match(/^(\d{1,2})[./-](\d{1,2})[./-](\d{4})$/);
    if (match1) [, day, month, year] = match1;

    const match2 = cleaned.match(/^(\d{4})[./-](\d{1,2})[./-](\d{1,2})$/);
    if (match2) [, year, month, day] = match2;

    const match3 = cleaned.match(/^(\d{2})(\d{2})(\d{4})$/);
    if (match3) [, day, month, year] = match3;

    if (day && month && year) {
        const d = parseInt(day), m = parseInt(month), y = parseInt(year);
        if (d >= 1 && d <= 31 && m >= 1 && m <= 12 && y >= 1900 && y <= new Date().getFullYear()) {
            return `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
        }
    }
    return null;
};

const ChatInterface = ({ onComplete }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [step, setStep] = useState('init');
    const [userData, setUserData] = useState({ name: '', birthDate: '' });
    const [isTyping, setIsTyping] = useState(false);
    const [dateError, setDateError] = useState('');
    const scrollRef = useRef(null);
    const initRef = useRef(false);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    useEffect(() => {
        if (initRef.current) return;
        initRef.current = true;

        const introMessages = [
            { text: "✨ Добро пожаловать в Архитектуру Судьбы", delay: 400 },
            { text: "Я — ваш персональный нумеролог на базе ИИ. Проведу глубокий анализ вашей Психоматрицы по системе Пифагора.", delay: 2500 },
            { text: "Как я могу к вам обращаться?", delay: 4800 }
        ];

        introMessages.forEach((msg, i) => {
            setTimeout(() => {
                setMessages(prev => [...prev, { id: `intro-${i}`, sender: 'ai', text: msg.text, typing: true }]);
                if (i === introMessages.length - 1) setTimeout(() => setStep('name'), 500);
            }, msg.delay);
        });
    }, []);

    const addAiMessage = useCallback((text, callback) => {
        setIsTyping(true);
        setTimeout(() => {
            setMessages(prev => [...prev, { id: `ai-${Date.now()}`, sender: 'ai', text, typing: true }]);
            setIsTyping(false);
            if (callback) setTimeout(callback, 100);
        }, 600);
    }, []);

    const handleSend = () => {
        if (!input.trim() || isTyping) return;
        const value = input.trim();

        if (step === 'name') {
            setMessages(prev => [...prev, { id: `user-${Date.now()}`, sender: 'user', text: value }]);
            setInput('');
            setStep('waiting');
            setUserData(prev => ({ ...prev, name: value }));

            addAiMessage(`Приятно познакомиться, ${value}! 🌟`, () => {
                addAiMessage("Теперь укажите дату рождения в формате ДД.ММ.ГГГГ — это ключ к вашей Психоматрице.", () => {
                    setStep('date');
                });
            });
        } else if (step === 'date') {
            const parsedDate = parseDate(value);
            if (!parsedDate) {
                setDateError('Формат: ДД.ММ.ГГГГ (например 15.03.1990)');
                setTimeout(() => setDateError(''), 3000);
                return;
            }

            setMessages(prev => [...prev, { id: `user-date`, sender: 'user', text: value }]);
            setInput('');
            setStep('calculating');
            setDateError('');

            const finalUserData = { ...userData, birthDate: parsedDate };
            addAiMessage("Запускаю квантовый анализ... 🔮", () => {
                setMessages(prev => [...prev, { id: `calc`, sender: 'ai', calculating: true }]);
                setTimeout(() => onComplete(finalUserData), 3000);
            });
        }
    };

    const showInput = step === 'name' || step === 'date';

    return (
        <div className="flex flex-col h-full w-full">

            {/* Header */}
            <div className="p-4 flex items-center gap-3 border-b border-white/5">
                <div className="relative">
                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 p-[2px]">
                        <div className="w-full h-full rounded-[14px] bg-[#0f0f2a] flex items-center justify-center">
                            <Sparkles size={18} className="text-purple-300" />
                        </div>
                    </div>
                    {isTyping && (
                        <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                            className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-[#0f0f2a]"
                        />
                    )}
                </div>
                <div className="flex-1">
                    <h2 className="text-white font-semibold text-[15px] font-display flex items-center gap-2">
                        Нумеролог AI
                        <span className="px-1.5 py-0.5 text-[9px] font-medium bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 rounded-full border border-purple-500/20">PRO</span>
                    </h2>
                    <p className="text-[11px] text-white/40">
                        {isTyping ? (
                            <span className="flex items-center gap-1">
                                <motion.span animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.5, repeat: Infinity }}>печатает</motion.span>
                                <span className="flex gap-0.5">
                                    {[0, 1, 2].map(i => (
                                        <motion.span key={i} animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }} className="w-1 h-1 bg-purple-400 rounded-full" />
                                    ))}
                                </span>
                            </span>
                        ) : 'онлайн'}
                    </p>
                </div>
                <Zap size={16} className="text-yellow-400" />
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
                <AnimatePresence>
                    {messages.map((msg) => (
                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 15, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            {msg.calculating ? (
                                <div className="neon-card p-5">
                                    <div className="flex items-center gap-4">
                                        <div className="relative">
                                            <motion.div
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                                                className="w-12 h-12 rounded-full border-2 border-transparent"
                                                style={{ borderTopColor: '#a78bfa', borderRightColor: '#ec4899' }}
                                            />
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <motion.span
                                                    animate={{ scale: [1, 1.2, 1] }}
                                                    transition={{ duration: 1, repeat: Infinity }}
                                                    className="text-lg"
                                                >✦</motion.span>
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-[12px] text-white/80 font-medium">Анализирую Психоматрицу...</p>
                                            <p className="text-[10px] text-white/40">Построение графа судьбы</p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <motion.div
                                    whileHover={{ scale: 1.01 }}
                                    className={`max-w-[85%] px-4 py-3 ${msg.sender === 'user'
                                            ? 'bg-gradient-to-br from-purple-600 to-pink-600 text-white rounded-2xl rounded-br-md shadow-lg shadow-purple-500/20'
                                            : 'glass-card text-white/90 rounded-2xl rounded-bl-md'
                                        }`}
                                >
                                    <p className="text-[13px] leading-relaxed">
                                        {msg.typing && msg.sender === 'ai' ? <TypingText text={msg.text} /> : msg.text}
                                    </p>
                                </motion.div>
                            )}
                        </motion.div>
                    ))}
                </AnimatePresence>
                <div ref={scrollRef} />
            </div>

            {/* Input */}
            {showInput && (
                <div className="p-4 border-t border-white/5">
                    {dateError && (
                        <motion.p
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-red-400 text-[11px] mb-2 text-center"
                        >{dateError}</motion.p>
                    )}
                    <div className="flex items-center gap-3">
                        <div className="flex-1 relative">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                placeholder={step === 'name' ? 'Ваше имя...' : 'ДД.ММ.ГГГГ'}
                                disabled={isTyping}
                                autoFocus
                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 text-white text-[14px] placeholder-white/30 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all disabled:opacity-50 pr-12"
                            />
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleSend}
                            disabled={isTyping || !input.trim()}
                            className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-2xl shadow-lg shadow-purple-500/30 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                        >
                            <Send size={18} />
                        </motion.button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatInterface;
