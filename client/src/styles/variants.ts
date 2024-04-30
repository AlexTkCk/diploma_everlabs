export const pageVariants = {
    initial :  {
        x: '100%',
        opacity: 0
    },
    animate :  {
        x: 0,
        opacity: 1,
        transition: {
            duration: 0.5,
            type: 'tween'
        }
    },
    exit :  {
        x: '-100%',
        opacity: 0,
        transition: {
            duration: 0.5,
        }
    },

}