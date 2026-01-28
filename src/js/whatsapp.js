// WhatsApp Link Builder
const WhatsAppManager = {
    // WhatsApp number in international format (without +)
    PHONE_NUMBER: '6285158912230',

    /**
     * Build WhatsApp message text
     * @param {string} modelId - "CV-01" or "CV-02"
     * @param {string} packageId - "TEMPLATE" or "PAKET_LENGKAP"
     * @param {string} priceFormatted - Formatted price string
     * @returns {string} - Message text
     */
    buildMessage(modelId, packageId, priceFormatted) {
        const packageName = packageId === 'PAKET_LENGKAP' ? 'Full Package' : 'Template Only';

        const message = `Hello, I want to order a CV Website.

Model: ${modelId}
Package: ${packageName}
Price: ${priceFormatted}

Please provide the next steps & payment methods.`;

        return message;
    },

    /**
     * Build full WhatsApp URL
     * @param {string} modelId 
     * @param {string} packageId 
     * @param {string} priceFormatted 
     * @returns {string} - WhatsApp URL
     */
    buildLink(modelId, packageId, priceFormatted) {
        const message = this.buildMessage(modelId, packageId, priceFormatted);
        const encodedMessage = encodeURIComponent(message);

        return `https://wa.me/${this.PHONE_NUMBER}?text=${encodedMessage}`;
    },

    /**
     * Open WhatsApp with pre-filled message
     * @param {string} modelId 
     * @param {string} packageId 
     * @param {string} priceFormatted 
     */
    openChat(modelId, packageId, priceFormatted) {
        const link = this.buildLink(modelId, packageId, priceFormatted);
        window.open(link, '_blank');
    }
};

window.WhatsAppManager = WhatsAppManager;
