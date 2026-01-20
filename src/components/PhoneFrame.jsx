import React from 'react';

const PhoneFrame = ({ children }) => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });

    return (
        <div className="flex items-center justify-center min-h-screen p-4 sm:p-8 relative overflow-hidden">

            {/* Animated Background Orbs */}
            <div className="floating-orb w-[500px] h-[500px] bg-purple-600 -top-48 -left-48" style={{ animationDelay: '0s' }} />
            <div className="floating-orb w-[400px] h-[400px] bg-pink-500 top-1/2 -right-32" style={{ animationDelay: '2s' }} />
            <div className="floating-orb w-[300px] h-[300px] bg-cyan-500 bottom-0 left-1/4" style={{ animationDelay: '4s' }} />

            {/* Phone Container */}
            <div className="relative z-10">
                {/* Outer Glow */}
                <div className="absolute -inset-8 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-cyan-500/20 rounded-[70px] blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />

                {/* Phone Frame - Ultra Modern */}
                <div className="relative w-[380px] h-[820px] rounded-[55px] p-[3px] bg-gradient-to-b from-zinc-700 via-zinc-800 to-zinc-900 shadow-2xl">

                    {/* Inner Chrome */}
                    <div className="relative w-full h-full rounded-[52px] bg-gradient-to-b from-zinc-800 to-black overflow-hidden">

                        {/* Dynamic Island */}
                        <div className="absolute top-3 left-1/2 -translate-x-1/2 z-50">
                            <div className="flex items-center gap-2 px-5 py-2 bg-black rounded-full shadow-lg">
                                <div className="w-3 h-3 rounded-full bg-zinc-800 ring-1 ring-zinc-700" />
                                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            </div>
                        </div>

                        {/* Status Bar */}
                        <div className="absolute top-0 left-0 right-0 h-14 flex items-end justify-between px-8 pb-1 z-40">
                            <span className="text-white/90 text-[13px] font-semibold tracking-tight">{timeStr}</span>
                            <div className="flex items-center gap-1.5">
                                {/* Cellular */}
                                <div className="flex gap-[2px] items-end">
                                    {[4, 6, 8, 10].map((h, i) => (
                                        <div key={i} className="w-[3px] rounded-sm bg-white/90" style={{ height: `${h}px` }} />
                                    ))}
                                </div>
                                {/* WiFi */}
                                <svg className="w-4 h-3 text-white/90" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 18c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm-4.9-2.3l1.4 1.4C9.4 16.4 10.6 16 12 16s2.6.4 3.5 1.1l1.4-1.4C15.6 14.6 13.9 14 12 14s-3.6.6-4.9 1.7zM2.8 10.5l1.4 1.4C6.3 10.1 9 9 12 9s5.7 1.1 7.8 2.9l1.4-1.4C18.5 8.1 15.4 7 12 7s-6.5 1.1-9.2 3.5z" />
                                </svg>
                                {/* Battery */}
                                <div className="flex items-center gap-0.5">
                                    <div className="w-6 h-3 border border-white/60 rounded-[4px] p-[2px] flex items-center">
                                        <div className="h-full w-[80%] bg-emerald-400 rounded-[2px]" />
                                    </div>
                                    <div className="w-[2px] h-[5px] bg-white/60 rounded-r" />
                                </div>
                            </div>
                        </div>

                        {/* Screen Content */}
                        <div className="absolute inset-0 pt-14 pb-8 bg-gradient-to-b from-[#0a0a1a] via-[#0f0f2a] to-[#050510]">
                            {children}
                        </div>

                        {/* Home Indicator */}
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/40 rounded-full z-50" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PhoneFrame;
