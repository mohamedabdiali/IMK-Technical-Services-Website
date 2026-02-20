// ===== HERO CAROUSEL FUNCTIONALITY =====
class HeroCarousel {
    constructor() {
        this.slider = document.getElementById('heroSlider');
        this.slides = this.slider ? this.slider.querySelectorAll('.slide') : [];
        this.indicators = document.getElementById('sliderIndicators');
        this.prevBtn = document.getElementById('prevSlide');
        this.nextBtn = document.getElementById('nextSlide');
        this.typeButtons = document.querySelectorAll('.type-btn');
        
        this.currentSlide = 0;
        this.totalSlides = this.slides.length;
        this.isTransitioning = false;
        this.autoplayInterval = null;
        this.autoplayDelay = 5000; // 5 seconds
        
        // Filter states
        this.activeFilter = 'all';
        this.filteredSlides = [...this.slides];
        
        this.init();
    }
    
    init() {
        if (this.slides.length === 0) return;
        
        // Create indicators
        this.createIndicators();
        
        // Set up event listeners
        this.setupEventListeners();
        
        // Initialize first slide
        this.showSlide(this.currentSlide);
        
        // Start autoplay
        this.startAutoplay();
        
        // Handle video events
        this.setupVideoHandling();
        
        // Initialize filter
        this.updateFilteredSlides();
    }
    
    createIndicators() {
        if (!this.indicators) return;
        
        this.indicators.innerHTML = '';
        
        this.filteredSlides.forEach((slide, index) => {
            const indicator = document.createElement('button');
            indicator.className = 'indicator';
            if (index === 0) indicator.classList.add('active');
            indicator.setAttribute('aria-label', `Go to slide ${index + 1}`);
            indicator.addEventListener('click', () => this.goToSlide(index));
            this.indicators.appendChild(indicator);
        });
    }
    
    setupEventListeners() {
        // Previous button
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.prevSlide());
        }
        
        // Next button
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.nextSlide());
        }
        
        // Type filter buttons
        this.typeButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const type = e.currentTarget.getAttribute('data-type');
                this.setFilter(type);
            });
        });
        
        // Pause autoplay on hover
        if (this.slider) {
            this.slider.addEventListener('mouseenter', () => this.pauseAutoplay());
            this.slider.addEventListener('mouseleave', () => this.startAutoplay());
        }
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prevSlide();
            if (e.key === 'ArrowRight') this.nextSlide();
            if (e.key === ' ') {
                e.preventDefault();
                this.toggleAutoplay();
            }
        });
        
        // Handle visibility change
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pauseAutoplay();
            } else {
                this.startAutoplay();
            }
        });
    }
    
    setupVideoHandling() {
        this.slides.forEach(slide => {
            const video = slide.querySelector('video');
            if (video) {
                // Pause video when not active
                video.addEventListener('play', () => {
                    if (!slide.classList.contains('active')) {
                        video.pause();
                    }
                });
                
                // Reset video when slide changes
                video.addEventListener('ended', () => {
                    video.currentTime = 0;
                });
            }
        });
    }
    
    showSlide(index) {
        if (this.isTransitioning || index < 0 || index >= this.filteredSlides.length) {
            return;
        }
        
        this.isTransitioning = true;
        
        // Hide current active slide
        this.filteredSlides.forEach(slide => {
            slide.classList.remove('active');
            slide.style.opacity = '0';
            slide.style.visibility = 'hidden';
            slide.style.zIndex = '1';
            
            // Pause and unload videos in inactive slides to save bandwidth
            const video = slide.querySelector('video');
            if (video) {
                video.pause();
                // If not active, we can set preload to none if it was already playing
                // but for now, just pausing is safer unless we want to remove src
            }
        });
        
        // Show new slide
        const newSlide = this.filteredSlides[index];
        newSlide.classList.add('active');
        newSlide.style.opacity = '1';
        newSlide.style.visibility = 'visible';
        newSlide.style.zIndex = '2';
        
        // Play video if it exists
        const video = newSlide.querySelector('video');
        if (video) {
            // Wait for slide transition before playing
            setTimeout(() => {
                video.play().catch(e => {
                    console.log('Video autoplay prevented:', e);
                    // Fallback to showing the poster image
                    video.load();
                });
            }, 500);
        }
        
        // Update current slide index
        this.currentSlide = index;
        
        // Update indicators
        this.updateIndicators();
        
        // Reset transition lock
        setTimeout(() => {
            this.isTransitioning = false;
        }, 800); // Match CSS transition duration
    }
    
    nextSlide() {
        let nextIndex = this.currentSlide + 1;
        if (nextIndex >= this.filteredSlides.length) {
            nextIndex = 0;
        }
        this.showSlide(nextIndex);
        this.resetAutoplay();
    }
    
    prevSlide() {
        let prevIndex = this.currentSlide - 1;
        if (prevIndex < 0) {
            prevIndex = this.filteredSlides.length - 1;
        }
        this.showSlide(prevIndex);
        this.resetAutoplay();
    }
    
    goToSlide(index) {
        if (index !== this.currentSlide) {
            this.showSlide(index);
            this.resetAutoplay();
        }
    }
    
    updateIndicators() {
        const indicators = this.indicators.querySelectorAll('.indicator');
        indicators.forEach((indicator, index) => {
            indicator.classList.remove('active');
            if (index === this.currentSlide) {
                indicator.classList.add('active');
            }
        });
    }
    
    setFilter(type) {
        this.activeFilter = type;
        
        // Update active button
        this.typeButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-type') === type) {
                btn.classList.add('active');
            }
        });
        
        // Update filtered slides
        this.updateFilteredSlides();
        
        // Reset to first slide of filtered set
        this.currentSlide = 0;
        this.showSlide(0);
        
        // Recreate indicators
        this.createIndicators();
    }
    
    updateFilteredSlides() {
        if (this.activeFilter === 'all') {
            this.filteredSlides = [...this.slides];
        } else {
            this.filteredSlides = [...this.slides].filter(slide => {
                return slide.getAttribute('data-type') === this.activeFilter;
            });
        }
        
        // Update total slides count
        this.totalSlides = this.filteredSlides.length;
        
        // Hide slides that don't match the filter
        this.slides.forEach(slide => {
            const slideType = slide.getAttribute('data-type');
            if (this.activeFilter === 'all' || slideType === this.activeFilter) {
                slide.style.display = 'block';
            } else {
                slide.style.display = 'none';
            }
        });
    }
    
    startAutoplay() {
        if (this.autoplayInterval) return;
        
        this.autoplayInterval = setInterval(() => {
            this.nextSlide();
        }, this.autoplayDelay);
    }
    
    pauseAutoplay() {
        if (this.autoplayInterval) {
            clearInterval(this.autoplayInterval);
            this.autoplayInterval = null;
        }
    }
    
    resetAutoplay() {
        this.pauseAutoplay();
        this.startAutoplay();
    }
    
    toggleAutoplay() {
        if (this.autoplayInterval) {
            this.pauseAutoplay();
        } else {
            this.startAutoplay();
        }
    }
    
    destroy() {
        this.pauseAutoplay();
        
        // Remove event listeners
        if (this.prevBtn) this.prevBtn.removeEventListener('click', this.prevSlide);
        if (this.nextBtn) this.nextBtn.removeEventListener('click', this.nextSlide);
        
        // Remove all custom event listeners
        document.removeEventListener('keydown', this.handleKeydown);
        document.removeEventListener('visibilitychange', this.handleVisibilityChange);
    }
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.heroCarousel = new HeroCarousel();
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = HeroCarousel;
}