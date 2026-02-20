// ===== PROJECTS PAGE FUNCTIONALITY =====

// Project Filter Functionality
function initProjectsFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const filter = this.getAttribute('data-filter');

            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // Filter projects
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');

                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Testimonial Slider
function initTestimonialSlider() {
    const testimonials = document.querySelectorAll('.testimonial');
    const dotsContainer = document.querySelector('.testimonial-dots');
    const prevBtn = document.querySelector('.testimonial-prev');
    const nextBtn = document.querySelector('.testimonial-next');

    if (!testimonials.length) return;

    let currentIndex = 0;

    // Create dots
    testimonials.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    function goToSlide(index) {
        testimonials[currentIndex].classList.remove('active');
        dots[currentIndex].classList.remove('active');

        currentIndex = index;

        testimonials[currentIndex].classList.add('active');
        dots[currentIndex].classList.add('active');
    }

    function nextSlide() {
        const next = (currentIndex + 1) % testimonials.length;
        goToSlide(next);
    }

    function prevSlide() {
        const prev = (currentIndex - 1 + testimonials.length) % testimonials.length;
        goToSlide(prev);
    }

    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);

    // Auto-advance every 5 seconds
    setInterval(nextSlide, 5000);
}

// Project Modal
document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('projectModal');
    const modalBody = document.getElementById('modalBody');
    const closeBtn = document.querySelector('.modal-close');
    const viewDetailsBtns = document.querySelectorAll('.view-details, .project-view');

    if (!modal) return;

    viewDetailsBtns.forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            const projectId = this.getAttribute('data-project');
            loadProjectDetails(projectId);
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', function () {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    modal.addEventListener('click', function (e) {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

function loadProjectDetails(projectId) {
    const modalBody = document.getElementById('modalBody');

    // Project data (in a real app, this would come from a database)
    const projects = {
        'damac-ibiza': {
            title: 'DAMAC IBIZA Project',
            location: 'Dubai Marina, Dubai',
            category: 'Residential',
            workers: '120+',
            duration: '18 Months',
            description: 'High-rise luxury residential tower with comprehensive MEP and finishing works.',
            details: [
                'Complete MEP installation and testing',
                'Interior finishing and fit-out works',
                'Facade installation support',
                'Quality control and HSE compliance'
            ]
        },
        // Add more projects as needed
    };

    const project = projects[projectId];

    if (project) {
        modalBody.innerHTML = `
            <h2>${project.title}</h2>
            <p class="project-location"><img src="icons/geo-alt.svg" class="icon-svg" alt="location"> ${project.location}</p>
            <div class="project-meta">
                <span class="badge">${project.category}</span>
                <span><img src="icons/person.svg" class="icon-svg" alt="workers"> ${project.workers} Workers</span>
                <span><img src="icons/calendar.svg" class="icon-svg" alt="calendar"> ${project.duration}</span>
            </div>
            <p>${project.description}</p>
            <h3>Project Highlights</h3>
            <ul>
                ${project.details.map(detail => `<li>${detail}</li>`).join('')}
            </ul>
        `;
    }
}
