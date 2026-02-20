document.addEventListener('DOMContentLoaded', () => {
    // These will be called from the HTML if needed, 
    // but the script also initializes itself.
    initJobsFilter();
    initJobApplication();
});

// Job Data (for detailed view)
const jobDetails = {
    'electrician': {
        title: 'Electrician',
        category: 'Skilled Manpower',
        location: 'Dubai, UAE',
        type: 'Full-time',
        salary: 'AED 1,500 - 2,500',
        description: 'We are seeking experienced Electricians to join our construction projects in Dubai. You will be responsible for installing and maintaining electrical systems.',
        requirements: ['Minimum 2 years experience in construction sites', 'Knowledge of DEWA regulations is a plus', 'Ability to read electrical blueprints', 'Physically fit and able to work in outdoor conditions'],
        responsibilities: ['Install electrical wiring, fixtures, and control systems', 'Troubleshoot electrical issues on site', 'Ensure all work meets safety standards', 'Collaborate with other MEP technicians']
    },
    'plumber': {
        title: 'Plumber',
        category: 'Skilled Manpower',
        location: 'Abu Dhabi, UAE',
        type: 'Full-time',
        salary: 'AED 1,400 - 2,200',
        description: 'Experienced Plumbers needed for installation of water systems and drainage in residential and commercial buildings.',
        requirements: ['2+ years of plumbing experience', 'Familiarity with various piping materials (PPR, PVC, HDPE)', 'Ability to work independently'],
        responsibilities: ['Install pipes, valves, and fittings', 'Connect water and drainage systems', 'Test systems for leaks and pressure', 'Maintain plumbing tools and equipment']
    },
    'ac-technician': {
        title: 'AC Technician',
        category: 'Skilled Manpower',
        location: 'Dubai, UAE',
        type: 'Full-time',
        salary: 'AED 1,800 - 2,800',
        description: 'AC Technicians required for installation and servicing of HVAC systems in skyscraper projects.',
        requirements: ['3+ years experience in HVAC field', 'Knowledge of VRF and split unit systems', 'UAE experience preferred'],
        responsibilities: ['Install indoor and outdoor AC units', 'Copper pipe insulation and brazing', 'Gas charging and leak detection', 'Routine maintenance and repair']
    },
    'steel-fixer': {
        title: 'Steel Fixer',
        category: 'Skilled Manpower',
        location: 'Multiple Locations, UAE',
        type: 'Full-time',
        salary: 'AED 1,200 - 2,000',
        description: 'Steel Fixers needed for residential and commercial concrete foundation and structure work.',
        requirements: ['Proven experience as a Steel Fixer', 'Ability to read structural drawings', 'Manual dexterity and physical strength'],
        responsibilities: ['Read and interpret reinforcement drawings', 'Cut and bend steel bars according to specifications', 'Position and tie steel reinforcement with wire', 'Ensure correct concrete cover and spacing']
    },
    'mep-helper': {
        title: 'MEP Helper',
        category: 'Non-Skilled Manpower',
        location: 'Sharjah, UAE',
        type: 'Full-time',
        salary: 'AED 1,200 - 1,800',
        description: 'Assisting MEP technicians with installation and maintenance works on various job sites.',
        requirements: ['Fresher or 1 year experience', 'Willingness to learn and work hard', 'Basic English communication'],
        responsibilities: ['Organize and deliver tools/materials to technicians', 'Assist in cleaning and prepping work areas', 'Hold and support equipment during installation', 'Learn basic technical skills on the job']
    },
    'site-supervisor': {
        title: 'Site Supervisor',
        category: 'Supervisory',
        location: 'Dubai, UAE',
        type: 'Full-time',
        salary: 'AED 3,500 - 5,000',
        description: 'Supervising construction teams to ensure projects are completed safely, on time, and within budget.',
        requirements: ['5+ years of site supervision experience in UAE', 'Diploma or Degree in Civil/Mechanical Engineering', 'Strong leadership and communication skills', 'Knowledge of safety regulations (HSE)'],
        responsibilities: ['Daily planning and task allocation for workers', 'Monitor work quality and progress', 'Ensure compliance with safety standards', 'Report project status to project managers']
    },
    'general-labourer': {
        title: 'General Labourer',
        category: 'Non-Skilled Manpower',
        location: 'All UAE',
        type: 'Temporary',
        salary: 'AED 1,200 - 1,500',
        description: 'General construction support tasks across various work sites in the UAE.',
        requirements: ['Physically fit for manual labour', 'Reliable and punctual', 'Ability to follow instructions'],
        responsibilities: ['Load and unload construction materials', 'Maintain site cleanliness and organization', 'Shift materials manually or using basic equipment', 'Assist various trades as needed']
    }
};

// Add 15 new jobs placeholders
const newJobsIds = ['carpenter', 'painter', 'mason', 'welder', 'driver', 'forklift-operator', 'civil-engineer', 'electrical-engineer', 'hr-coordinator', 'document-controller', 'safety-officer', 'procurement-assistant', 'storekeeper', 'scaffolder', 'rigging-supervisor'];
newJobsIds.forEach(id => {
    if (!jobDetails[id]) {
        jobDetails[id] = {
            title: id.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
            category: 'Category Not Specified',
            location: 'Multiple Locations, UAE',
            type: 'Full-time',
            salary: 'AED 2,500 - 4,500',
            description: 'Please contact our recruitment team for full details about this position.',
            requirements: ['Experience in relevant field', 'UAE experience preferred', 'Valid certificates'],
            responsibilities: ['Perform daily tasks according to project requirements', 'Maintain HSE standards', 'Report to site supervisor']
        };
    }
});

function initJobsFilter() {
    const searchInput = document.getElementById('jobSearch');
    const locationFilter = document.getElementById('locationFilter');
    const typeFilter = document.getElementById('typeFilter');
    const categoryBtns = document.querySelectorAll('.category-btn');
    const jobCards = document.querySelectorAll('.job-card');

    if (!searchInput || !locationFilter || !typeFilter) return;

    function filterJobs() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedLocation = locationFilter.value;
        const selectedType = typeFilter.value;
        const activeCategoryBtn = document.querySelector('.category-btn.active');
        const activeCategory = activeCategoryBtn ? activeCategoryBtn.dataset.category : 'all';

        jobCards.forEach(card => {
            const title = card.querySelector('.job-title').textContent.toLowerCase();
            const category = card.dataset.category;
            const location = card.dataset.location;
            const type = card.dataset.type;
            const description = card.querySelector('.job-description')?.textContent.toLowerCase() || "";

            const matchesSearch = title.includes(searchTerm) || description.includes(searchTerm);
            const matchesCategory = activeCategory === 'all' || category === activeCategory;
            const matchesLocation = !selectedLocation || location === selectedLocation || location === 'all-uae';
            const matchesType = !selectedType || type === selectedType;

            if (matchesSearch && matchesCategory && matchesLocation && matchesType) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    searchInput.addEventListener('input', filterJobs);
    locationFilter.addEventListener('change', filterJobs);
    typeFilter.addEventListener('change', filterJobs);

    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterJobs();
        });
    });
}

function initJobApplication() {
    const jobCards = document.querySelectorAll('.job-card');
    const jobModal = document.getElementById('jobModal');
    const applyPositionInput = document.getElementById('appliedPosition');

    if (!jobModal) return;

    function openJobModal(jobId) {
        const data = jobDetails[jobId] || { title: jobId, description: "Details coming soon...", requirements: [], responsibilities: [], category: "", location: "", type: "", salary: "" };
        const modalContent = jobModal.querySelector('.job-modal-content');

        modalContent.innerHTML = `
            <span class="job-modal-close">&times;</span>
            <div class="modal-job-header">
                <h2 class="modal-job-title">${data.title}</h2>
                <div class="modal-job-meta">
                    ${data.category ? `<span><img src="icons/briefcase.svg" class="icon-svg icon-blue" alt="category"> ${data.category}</span>` : ''}
                    ${data.location ? `<span><img src="icons/geo-alt.svg" class="icon-svg icon-blue" alt="location"> ${data.location}</span>` : ''}
                    ${data.type ? `<span><img src="icons/clock.svg" class="icon-svg icon-blue" alt="type"> ${data.type}</span>` : ''}
                    ${data.salary ? `<span><img src="icons/currency-exchange.svg" class="icon-svg icon-blue" alt="salary"> ${data.salary}</span>` : ''}
                </div>
            </div>
            <div class="modal-job-body">
                <h4>Job Description</h4>
                <p>${data.description}</p>
                
                ${data.responsibilities.length ? `
                <h4>Key Responsibilities</h4>
                <ul>
                    ${data.responsibilities.map(res => `<li>${res}</li>`).join('')}
                </ul>` : ''}
                
                ${data.requirements.length ? `
                <h4>Requirements</h4>
                <ul>
                    ${data.requirements.map(req => `<li>${req}</li>`).join('')}
                </ul>` : ''}
            </div>
            <div class="modal-job-footer">
                <button class="btn btn-secondary close-modal-btn">Close</button>
                <button class="btn btn-primary modal-apply-btn" data-job="${jobId}">Apply Now</button>
            </div>
        `;

        // Re-attach events
        modalContent.querySelector('.job-modal-close').addEventListener('click', () => jobModal.classList.remove('active'));
        modalContent.querySelector('.close-modal-btn').addEventListener('click', () => jobModal.classList.remove('active'));
        modalContent.querySelector('.modal-apply-btn').addEventListener('click', (e) => {
            const title = jobDetails[e.target.dataset.job]?.title || e.target.dataset.job;
            jobModal.classList.remove('active');
            scrollToApplication(title);
        });

        jobModal.classList.add('active');
    }

    function scrollToApplication(positionTitle) {
        const formSection = document.getElementById('application-form-section');
        if (formSection) {
            formSection.scrollIntoView({ behavior: 'smooth' });
            if (applyPositionInput) {
                applyPositionInput.value = positionTitle;
            }
        }
    }

    jobCards.forEach(card => {
        card.addEventListener('click', (e) => {
            if (e.target.classList.contains('apply-job')) {
                const jobId = e.target.dataset.job;
                scrollToApplication(jobDetails[jobId]?.title || jobId);
                return;
            }

            const btn = card.querySelector('.apply-job');
            if (btn) openJobModal(btn.dataset.job);
        });
    });

    window.addEventListener('click', (e) => {
        if (e.target === jobModal) jobModal.classList.remove('active');
    });
}
