const transitionStyle = '[transition:background-color_1s]';

export const themeStyles = {
    green: {
        primary: 'bg-[#011004] ' + transitionStyle,
        secondary: 'bg-teal-700 ' + transitionStyle,
        accent: 'bg-green-200 ' + transitionStyle,
        hoverNeon: 'hover:shadow-neon-green border-2 border-white',
        neon: 'shadow-neon-green border-2 border-white',
    },
    yellow: {
        primary: 'bg-[#271D04] ' + transitionStyle,
        secondary: 'bg-yellow-400 ' + transitionStyle,
        accent: 'bg-yellow-200 ' + transitionStyle,
        hoverNeon: 'hover:shadow-neon-yellow border-2 border-white',
        neon: 'shadow-neon-yellow border-2 border-white',
    },
    red: {
        primary: 'bg-[#260808] ' + transitionStyle,
        secondary: 'bg-red-400 ' + transitionStyle,
        accent: 'bg-red-200 ' + transitionStyle,
        hoverNeon: 'hover:shadow-neon-red border-2 border-white',
        neon: 'shadow-neon-red border-2 border-white',
    },
    blue: {
        primary: 'bg-[#02010B] ' + transitionStyle,
        secondary: 'bg-blue-400 ' + transitionStyle,
        accent: 'bg-blue-200 ' + transitionStyle,
        hoverNeon: 'hover:shadow-neon-blue border-2 border-white',
        neon: 'shadow-neon-blue border-2 border-white',
    },
    black: {
        primary: 'bg-black text-white ' + transitionStyle,
        secondary: 'bg-black text-white ' + transitionStyle,
        accent: 'bg-black text-white ' + transitionStyle,
        hoverNeon: 'border-2 border-white',
        neon: 'border-2 border-white'
    }
}