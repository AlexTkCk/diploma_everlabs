const transitionStyle = ' transition-colors duration-300 ease-in-out';

export const themeStyles = {
    green: {
        primary: 'bg-green-950 ' + transitionStyle,
        secondary: 'bg-teal-700 ' + transitionStyle,
        accent: 'bg-green-200 ' + transitionStyle,
        hoverNeon: 'hover:shadow-neon-green border-2 border-white',
        neon: 'shadow-neon-green border-2 border-white',
    },
    yellow: {
        primary: 'bg-yellow-950 ' + transitionStyle,
        secondary: 'bg-yellow-400 ' + transitionStyle,
        accent: 'bg-yellow-200 ' + transitionStyle,
        hoverNeon: 'hover:shadow-neon-yellow border-2 border-white',
        neon: 'shadow-neon-yellow border-2 border-white',
    },
    red: {
        primary: 'bg-red-950 ' + transitionStyle,
        secondary: 'bg-red-400 ' + transitionStyle,
        accent: 'bg-red-200 ' + transitionStyle,
        hoverNeon: 'hover:shadow-neon-red border-2 border-white',
        neon: 'shadow-neon-red border-2 border-white',
    },
    blue: {
        primary: 'bg-blue-950 ' + transitionStyle,
        secondary: 'bg-blue-400 ' + transitionStyle,
        accent: 'bg-blue-200 ' + transitionStyle,
        hoverNeon: 'hover:shadow-neon-blue border-2 border-white',
        neon: 'shadow-neon-blue border-2 border-white',
    },
    black: {
        primary: 'bg-black transition-colors duration-250',
        secondary: 'bg-black transition-colors duration-250',
        accent: 'bg-black transition-colors duration-250',
        hoverNeon: 'border-2 border-white',
        neon: 'border-2 border-white'
    }
}