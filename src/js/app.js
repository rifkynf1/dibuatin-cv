// Main Application
const App = {
    // Application state
    state: {
        selectedModel: null,
        selectedPackage: null,
        computedPrice: 0,
        priceFormatted: ''
    },

    init() {
        // Initialize theme
        ThemeManager.init();

        // Render CV model cards
        this.renderModelCards();

        // Bind event listeners
        this.bindEvents();

        // Update UI
        this.updateSummary();
    },

    renderModelCards() {
        const container = document.getElementById('model-cards');
        if (!container) return;

        container.innerHTML = '';

        Object.values(CV_DATA).forEach(model => {
            const card = this.createModelCard(model);
            container.appendChild(card);
        });
    },

    createModelCard(model) {
        const div = document.createElement('div');
        div.className = `model-card group cursor-pointer rounded-2xl p-6 transition-all duration-300 
            bg-white/80 dark:bg-white/5 backdrop-blur-lg border border-gray-200 dark:border-white/10
            hover:scale-[1.02] hover:shadow-2xl hover:border-purple-500/50
            ${this.state.selectedModel === model.id ? 'ring-2 ring-purple-500 border-purple-500' : ''}`;
        div.dataset.modelId = model.id;

        div.innerHTML = `
            <div class="relative overflow-hidden rounded-xl mb-4">
                <img src="${model.image}" alt="${model.name}" 
                    class="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy">
                <div class="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold
                    bg-purple-500/90 text-white backdrop-blur-sm">
                    ${model.style}
                </div>
            </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">${model.id} - ${model.name}</h3>
            <p class="text-gray-600 dark:text-gray-400 text-sm mb-4">${model.description}</p>
            <ul class="space-y-2 mb-4">
                ${model.features.map(f => `
                    <li class="flex items-center text-sm text-gray-700 dark:text-gray-300">
                        <svg class="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        ${f}
                    </li>
                `).join('')}
            </ul>
            <div class="flex items-center justify-between">
                <span class="text-lg font-bold text-purple-600 dark:text-purple-400">
                    From ${PricingManager.formatPrice(model.priceTemplate)}
                </span>
                <span class="text-sm text-gray-500 dark:text-gray-400">Template</span>
            </div>
        `;

        return div;
    },

    bindEvents() {
        // Model card selection
        document.getElementById('model-cards')?.addEventListener('click', (e) => {
            const card = e.target.closest('.model-card');
            if (card) {
                this.selectModel(card.dataset.modelId);
            }
        });

        // Package selection
        document.querySelectorAll('input[name="package"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                this.selectPackage(e.target.value);
            });
        });

        // Theme toggle
        document.getElementById('theme-toggle')?.addEventListener('click', () => {
            ThemeManager.toggle();
        });

        // Order button
        document.getElementById('order-btn')?.addEventListener('click', () => {
            this.handleOrder();
        });

        // Mobile order button
        document.getElementById('mobile-order-btn')?.addEventListener('click', () => {
            this.handleOrder();
        });

        // Smooth scroll for navigation
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    },

    selectModel(modelId) {
        this.state.selectedModel = modelId;

        // Update card styles
        document.querySelectorAll('.model-card').forEach(card => {
            if (card.dataset.modelId === modelId) {
                card.classList.add('ring-2', 'ring-purple-500', 'border-purple-500');
            } else {
                card.classList.remove('ring-2', 'ring-purple-500', 'border-purple-500');
            }
        });

        this.updateSummary();
    },

    selectPackage(packageId) {
        this.state.selectedPackage = packageId;

        // Update radio indicator visuals
        document.querySelectorAll('.radio-indicator').forEach(indicator => {
            indicator.classList.remove('selected');
        });

        if (packageId === 'TEMPLATE') {
            document.getElementById('radio-template')?.classList.add('selected');
        } else if (packageId === 'PAKET_LENGKAP') {
            document.getElementById('radio-lengkap')?.classList.add('selected');
        }

        this.updateSummary();
    },

    updateSummary() {
        const { selectedModel, selectedPackage } = this.state;

        // Update model display
        const modelDisplay = document.getElementById('summary-model');
        if (modelDisplay) {
            modelDisplay.textContent = selectedModel || 'Not selected';
        }

        // Update package display
        const packageDisplay = document.getElementById('summary-package');
        if (packageDisplay) {
            if (selectedPackage) {
                packageDisplay.textContent = PACKAGES[selectedPackage]?.name || 'Not selected';
            } else {
                packageDisplay.textContent = 'Not selected';
            }
        }

        // Update price
        const priceDisplay = document.getElementById('summary-price');
        if (priceDisplay) {
            if (selectedModel && selectedPackage) {
                this.state.computedPrice = PricingManager.calculatePrice(selectedModel, selectedPackage);
                this.state.priceFormatted = PricingManager.formatPrice(this.state.computedPrice);
                priceDisplay.textContent = this.state.priceFormatted;
                priceDisplay.classList.add('price-updated');
                setTimeout(() => priceDisplay.classList.remove('price-updated'), 300);
            } else {
                priceDisplay.textContent = '-';
            }
        }

        // Update mobile price display
        const mobilePriceDisplay = document.getElementById('mobile-summary-price');
        if (mobilePriceDisplay) {
            mobilePriceDisplay.textContent = priceDisplay?.textContent || '-';
        }

        // Update order button state
        const orderBtns = document.querySelectorAll('#order-btn, #mobile-order-btn');
        orderBtns.forEach(btn => {
            if (selectedModel && selectedPackage) {
                btn.disabled = false;
                btn.classList.remove('opacity-50', 'cursor-not-allowed');
            } else {
                btn.disabled = true;
                btn.classList.add('opacity-50', 'cursor-not-allowed');
            }
        });
    },

    handleOrder() {
        const { selectedModel, selectedPackage, priceFormatted } = this.state;

        if (!selectedModel || !selectedPackage) {
            alert('Please select a CV model and package first.');
            return;
        }

        WhatsAppManager.openChat(selectedModel, selectedPackage, priceFormatted);
    }
};

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});

window.App = App;
