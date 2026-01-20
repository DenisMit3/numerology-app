/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,jsx,ts,tsx}"
    ],
    theme: {
        extend: {
            fontFamily: {
                display: ['Space Grotesk', 'sans-serif'],
            },
            colors: {
                deepSpace: '#030014',
                cosmic: '#0a0a1f',
            },
            animation: {
                'float': 'float 8s ease-in-out infinite',
                'shimmer': 'shimmer 3s infinite',
                'glow': 'glow-pulse 2s ease-in-out infinite',
            },
            backdropBlur: {
                '3xl': '64px',
            },
        },
    },
    plugins: [],
    safelist: [
        'from-red-500', 'from-orange-500', 'from-yellow-500', 'from-green-500',
        'from-teal-500', 'from-cyan-500', 'from-blue-500', 'from-purple-500', 'from-pink-500',
        'bg-purple-500/10', 'bg-pink-500/10', 'bg-cyan-500/10', 'bg-amber-500/10', 'bg-emerald-500/10',
        'bg-yellow-500/10', 'bg-purple-500/20', 'bg-pink-500/20', 'bg-cyan-500/20',
        'border-purple-500/20', 'border-pink-500/20', 'border-cyan-500/20', 'border-amber-500/20', 'border-emerald-500/20',
        'text-purple-400', 'text-pink-400', 'text-cyan-400', 'text-amber-400', 'text-emerald-400', 'text-yellow-400',
        'text-purple-300', 'text-pink-300', 'text-cyan-300', 'text-amber-300', 'text-emerald-300',
    ]
}
