import techstoreImg from '../assets/TechGameStore.png';
import libraryManagement from '../assets/libraryManagement.png';
import demoVideo from '../assets/video.mp4';
import TechGame from '../assets/Techgame.mp4';
export default [{
        id: 1,
        title: 'TechStoreGame',
        category: 'E-COMMERCE PLATFORM',
        description: 'A full-stack computer and gaming e-commerce platform designed for browsing products, managing carts, placing orders, and handling customer accounts.',
        technologies: ['Vue.js', 'Laravel', 'PHP', 'MySQL', 'REST API', 'Tailwind CSS', 'Sanctum'],
        features: [
            'Product browsing',
            'Categories',
            'Shopping cart',
            'Wishlist',
            'Authentication',
            'Customer accounts',
            'Orders',
            'Address management',
            'Admin order management dashbord',
            'Payment integration',
            'Responsive UI',
        ],
        video: TechGame,
        github: 'https://github.com/MutChhay/Tech-Game-shop',
        live: 'https://tech-game-shop.vercel.app/',
    },
    {
        id: 2,
        title: 'Traffic Sign Detection With Khmer Alerts',
        category: 'COMPUTER VISION / AI',
        description: 'A real-time traffic sign detection system using YOLO and computer vision to identify traffic signs and provide useful detection results.',
        technologies: ['YOLO', 'Python', 'OpenCV', 'Roboflow', 'Streamlit'],
        features: [
            'Traffic sign detection',
            'Real-time webcam detection',
            'Image detection',
            'Video detection',
            'Confidence scores',
            'Khmer traffic sign support',
            'Voice feedback',
        ],

        video: demoVideo,

        github: 'https://github.com',
        live: 'https://example.com',
    },
    {
        id: 3,
        title: 'Library Management system',
        category: 'SOFTWARE TESTING',
        description: 'A library management system designed to allow users to browse books, manage their reading lists, and handle library operations.',
        technologies: ['system', 'API', 'Database', 'Software Testing'],
        features: [
            'Book browsing',
            'Menu selection',
            'Admin management',
            'Checkout flow',
            'API integration',
            'Test coverage',
        ],
        image: libraryManagement,
        github: 'https://github.com/MutChhay/Aibrary_Application',
        live: 'https://example.com',
    },
]