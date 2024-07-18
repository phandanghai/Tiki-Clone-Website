module.exports = {
   content: ['./src/**/*.{js,jsx,ts,tsx}'],
   darkMode: 'class',
   theme: {
      fontFamily: {
         display: ['Open Sans', 'sans-serif'],
         body: ['Open Sans', 'sans-serif'],
         userBody: ['Inter, Helvetica, Arial, sans-serif'],
      },
      extend: {
         fontSize: {
            12: '12px',
            13: '13px',
            14: '14px',
            18: '18px',
            16: '16px',
            20: '20px',
         },
         backgroundColor: {
            'main-bg': '#2a3447',
            'main-dark-bg': '#20232A',
            'secondary-dark-bg': '#33373E',
            'light-gray': '#F7F7F7',
            'half-transparent': 'rgba(0, 0, 0, 0.5)',
            'dark-bg': '#222b3c',
            'bg-order': '#ff424e',
         },
         colors: {
            'soft-color': '#384256',
            'text-logo': '#003ea1',
            'text-span': '#808089',
            'text-title': '#27272a',
            'text-sale': '#ff424e',
            'text-action': '#0a68ff',
            'header-order': '#787878',
         },
         borderWidth: {
            1: '1px',
         },
         borderColor: {
            color: 'rgba(0, 0, 0, 0.1)',
            'border-color': '#c7c7c7',
            'border-action': '#0a68ff',
            'border-color-2': '#ebebf0',
         },
         width: {
            400: '400px',
            760: '760px',
            780: '780px',
            800: '800px',
            1000: '1000px',
            1200: '1200px',
            1400: '1400px',
         },
         height: {
            80: '80px',
         },
         minHeight: {
            590: '590px',
         },
      },
   },
   plugins: [],
};
