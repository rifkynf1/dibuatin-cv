// Pricing Calculator
const PricingManager = {
    /**
     * Calculate price based on selected model and package
     * @param {string} modelId - "CV-01" or "CV-02"
     * @param {string} packageId - "TEMPLATE" or "PAKET_LENGKAP"
     * @returns {number} - Price in IDR
     */
    calculatePrice(modelId, packageId) {
        // Paket Lengkap is always flat 500.000
        if (packageId === 'PAKET_LENGKAP') {
            return 500000;
        }

        // Template only: price depends on model
        const model = window.CV_DATA[modelId];
        if (model) {
            return model.priceTemplate;
        }

        return 0;
    },

    /**
     * Format price to Indonesian Rupiah
     * @param {number} price - Price in number
     * @returns {string} - Formatted price string
     */
    formatPrice(price) {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(price);
    },

    /**
     * Get price display text
     * @param {string} modelId 
     * @param {string} packageId 
     * @returns {string}
     */
    getPriceDisplay(modelId, packageId) {
        const price = this.calculatePrice(modelId, packageId);
        return this.formatPrice(price);
    }
};

window.PricingManager = PricingManager;
