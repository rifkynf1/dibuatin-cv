// CV Model Data Catalog
const CV_DATA = {
    "CV-01": {
        id: "CV-01",
        name: "CV Simple",
        priceTemplate: 250000,
        description: "Clean and minimalist design, perfect for fresh graduates or entry-level professionals. Simple layout with focus on content.",
        features: [
            "Minimalist & clean design",
            "Responsive layout",
            "Dark & Light mode",
            "Easy to customize"
        ],
        image: "assets/img/cv-01-preview.png",
        style: "Simple & Affordable"
    },
    "CV-02": {
        id: "CV-02",
        name: "CV Premium",
        priceTemplate: 300000,
        description: "Modern and premium design with glassmorphism effects, perfect for designers, developers, or creative professionals.",
        features: [
            "Premium & modern design",
            "Glassmorphism effects",
            "Smooth animations",
            "Stunning visuals"
        ],
        image: "assets/img/cv-02-preview.png",
        style: "Premium & Creative"
    }
};

// Package types
const PACKAGES = {
    TEMPLATE: {
        id: "TEMPLATE",
        name: "Template Only",
        description: "Ready-to-use template files, self-hosting"
    },
    PAKET_LENGKAP: {
        id: "PAKET_LENGKAP",
        name: "Full Package",
        description: "Hosting + custom domain request + ready to go online",
        price: 500000
    }
};

// Export for use in other modules
window.CV_DATA = CV_DATA;
window.PACKAGES = PACKAGES;
