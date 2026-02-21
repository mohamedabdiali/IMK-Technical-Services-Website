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
    'hvac-technician': {
        title: 'HVAC Technician',
        category: 'Skilled Manpower',
        location: 'Dubai, UAE',
        type: 'Full-time',
        salary: 'AED 2,500 - 3,000',
        description: 'Installation, maintenance, and repair of HVAC systems in commercial buildings. Must have MEP background.',
        requirements: ['4+ years experience in HVAC field', 'Knowledge of VRF and split unit systems', 'UAE experience preferred'],
        responsibilities: ['Install indoor and outdoor HVAC units', 'Ducting, insulation, and commissioning', 'Troubleshoot system faults', 'Perform preventive maintenance']
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
    const applyPositionInput = document.getElementById('appliedPosition');
    const positionSelect = document.getElementById('position');
    const selectedJobInfo = document.getElementById('selectedJobInfo');
    const selectedJobTitle = document.getElementById('selectedJobTitle');
    const selectedJobMeta = document.getElementById('selectedJobMeta');
    const jobTitleInput = document.getElementById('jobTitle');
    const jobCategoryInput = document.getElementById('jobCategory');
    const jobLocationInput = document.getElementById('jobLocation');
    const jobTypeInput = document.getElementById('jobType');
    const jobSalaryInput = document.getElementById('jobSalary');

    if (!jobCards.length) return;

    function openJobDetailsPage(jobId) {
        if (!jobId) return;
        window.location.href = `job-details.html?job=${encodeURIComponent(jobId)}`;
    }

    function ensureSelectOption(jobId, title) {
        if (!positionSelect || !jobId) return;
        const exists = Array.from(positionSelect.options).some((opt) => opt.value === jobId);
        if (!exists) {
            const option = document.createElement('option');
            option.value = jobId;
            option.textContent = title || jobId;
            positionSelect.appendChild(option);
        }
    }

    function populateSelectedJob(jobId) {
        if (!jobId) {
            if (selectedJobInfo) selectedJobInfo.hidden = true;
            return;
        }

        const data = jobDetails[jobId] || { title: jobId, category: '', location: '', type: '', salary: '' };
        if (selectedJobInfo) selectedJobInfo.hidden = false;
        if (selectedJobTitle) selectedJobTitle.textContent = data.title || jobId;

        if (selectedJobMeta) {
            selectedJobMeta.innerHTML = `
                ${data.category ? `<span><img src="icons/briefcase.svg" class="icon-svg icon-blue" alt="category"> ${data.category}</span>` : ''}
                ${data.location ? `<span><img src="icons/geo-alt.svg" class="icon-svg icon-blue" alt="location"> ${data.location}</span>` : ''}
                ${data.type ? `<span><img src="icons/clock.svg" class="icon-svg icon-blue" alt="type"> ${data.type}</span>` : ''}
                ${data.salary ? `<span><img src="icons/currency-exchange.svg" class="icon-svg icon-blue" alt="salary"> ${data.salary}</span>` : ''}
            `;
        }

        if (jobTitleInput) jobTitleInput.value = data.title || jobId;
        if (jobCategoryInput) jobCategoryInput.value = data.category || '';
        if (jobLocationInput) jobLocationInput.value = data.location || '';
        if (jobTypeInput) jobTypeInput.value = data.type || '';
        if (jobSalaryInput) jobSalaryInput.value = data.salary || '';
    }

    function scrollToApplication(positionTitle, jobId) {
        const formSection = document.getElementById('application-form-section');
        if (formSection) {
            formSection.scrollIntoView({ behavior: 'smooth' });
            if (applyPositionInput) {
                applyPositionInput.value = positionTitle;
            }
            if (positionSelect && jobId) {
                ensureSelectOption(jobId, positionTitle);
                positionSelect.value = jobId;
            }
            populateSelectedJob(jobId);
        }
    }

    jobCards.forEach(card => {
        const applyBtn = card.querySelector('.apply-job');
        if (applyBtn) {
            applyBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const jobId = applyBtn.dataset.job;
                const title = jobDetails[jobId]?.title || jobId;
                scrollToApplication(title, jobId);
            });
        }

        card.addEventListener('click', () => {
            const jobId = applyBtn?.dataset.job;
            openJobDetailsPage(jobId);
        });
    });

    const params = new URLSearchParams(window.location.search);
    const applyJob = params.get('apply');
    if (applyJob) {
        const title = jobDetails[applyJob]?.title || applyJob;
        if (positionSelect) {
            ensureSelectOption(applyJob, title);
            positionSelect.value = applyJob;
        }
        if (applyPositionInput) {
            applyPositionInput.value = title;
        }
        populateSelectedJob(applyJob);
        scrollToApplication(title, applyJob);
    }

    if (positionSelect) {
        positionSelect.addEventListener('change', () => {
            const selected = positionSelect.value;
            if (selected) {
                populateSelectedJob(selected);
            } else if (selectedJobInfo) {
                selectedJobInfo.hidden = true;
            }
        });
    }
}
