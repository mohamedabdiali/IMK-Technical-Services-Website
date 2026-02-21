document.addEventListener('DOMContentLoaded', () => {
    if (!window.IMKJobs) {
        return;
    }

    const jobs = IMKJobs.loadJobs();
    renderJobs(jobs);
    initJobsFilter();
    initJobApplication(jobs);
});

const escapeHtml = (value) => {
    return String(value || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
};

const getCategoryLabel = (category) => IMKJobs.CATEGORY_LABELS[category] || category || '';
const getLocationLabel = (location) => IMKJobs.LOCATION_LABELS[location] || location || '';
const getTypeLabel = (type) => IMKJobs.TYPE_LABELS[type] || type || '';

function renderJobs(jobs) {
    const container = document.getElementById('jobsContainer');
    if (!container) return;

    const activeJobs = jobs.filter(job => job.status === 'active');

    if (!activeJobs.length) {
        container.innerHTML = `
            <div class="jobs-empty">
                <h3>No active openings</h3>
                <p>Please check back soon for new opportunities.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = activeJobs.map((job, index) => buildJobCard(job, index)).join('');

    if (window.AOS && typeof window.AOS.refresh === 'function') {
        window.AOS.refresh();
    }
}

function buildJobCard(job, index) {
    const badgeHtml = job.badge ? `<div class="job-badge">${escapeHtml(job.badge)}</div>` : '';
    const typeLabel = getTypeLabel(job.type);
    const locationLabel = getLocationLabel(job.location);
    const highlights = (job.highlights && job.highlights.length ? job.highlights : (job.requirements || [])).slice(0, 2);
    const highlightIcons = ['person.svg', 'journal-check.svg'];

    const highlightsHtml = highlights.map((item, idx) => `
        <span class="requirement">
            <img src="icons/${highlightIcons[idx] || highlightIcons[0]}" class="icon-svg icon-inline" alt="requirement">
            ${escapeHtml(item)}
        </span>
    `).join('');

    const delay = Math.min(index * 100, 300);

    return `
        <div class="job-card" data-category="${escapeHtml(job.category)}" data-location="${escapeHtml(job.location)}"
            data-type="${escapeHtml(job.type)}" data-job-id="${escapeHtml(job.id)}"
            data-aos="fade-up" data-aos-delay="${delay}">
            <div class="job-header">
                ${badgeHtml}
                <div class="job-meta">
                    <span class="job-type ${escapeHtml(job.type)}">${escapeHtml(typeLabel)}</span>
                    <span class="job-location">
                        <img src="icons/geo-alt.svg" class="icon-svg icon-inline" alt="location"> ${escapeHtml(locationLabel)}
                    </span>
                </div>
            </div>
            <div class="job-body">
                <h3 class="job-title">${escapeHtml(job.title)}</h3>
                <p class="job-description">${escapeHtml(job.description)}</p>
                <div class="job-requirements">
                    ${highlightsHtml}
                </div>
            </div>
            <div class="job-footer">
                <div class="job-salary">${escapeHtml(job.salary || 'Salary Negotiable')}</div>
                <button class="btn btn-primary btn-sm apply-job" data-job="${escapeHtml(job.id)}">
                    Apply Now
                </button>
            </div>
        </div>
    `;
}

function initJobsFilter() {
    const searchInput = document.getElementById('jobSearch');
    const locationFilter = document.getElementById('locationFilter');
    const typeFilter = document.getElementById('typeFilter');
    const categoryBtns = document.querySelectorAll('.category-btn');

    if (!searchInput || !locationFilter || !typeFilter) return;

    function filterJobs() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedLocation = locationFilter.value;
        const selectedType = typeFilter.value;
        const activeCategoryBtn = document.querySelector('.category-btn.active');
        const activeCategory = activeCategoryBtn ? activeCategoryBtn.dataset.category : 'all';
        const jobCards = document.querySelectorAll('.job-card');

        jobCards.forEach(card => {
            const title = card.querySelector('.job-title')?.textContent.toLowerCase() || '';
            const category = card.dataset.category || '';
            const location = card.dataset.location || '';
            const type = card.dataset.type || '';
            const description = card.querySelector('.job-description')?.textContent.toLowerCase() || '';

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

function initJobApplication(jobs) {
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

    const activeJobs = Array.isArray(jobs) ? jobs.filter(job => job.status === 'active') : [];

    if (positionSelect) {
        const otherOption = positionSelect.querySelector('option[value="other"]');
        positionSelect.innerHTML = '<option value="">Select Position</option>';
        activeJobs.forEach(job => {
            const option = document.createElement('option');
            option.value = job.id;
            option.textContent = job.title;
            positionSelect.appendChild(option);
        });
        if (otherOption) {
            positionSelect.appendChild(otherOption);
        } else {
            const option = document.createElement('option');
            option.value = 'other';
            option.textContent = 'Other';
            positionSelect.appendChild(option);
        }
    }

    function openJobDetailsPage(jobId) {
        if (!jobId) return;
        window.location.href = `job-details.html?job=${encodeURIComponent(jobId)}`;
    }

    function populateSelectedJob(jobId) {
        if (!jobId) {
            if (selectedJobInfo) selectedJobInfo.hidden = true;
            return;
        }

        const data = IMKJobs.getJobById(jobId, jobs) || { title: jobId };
        if (selectedJobInfo) selectedJobInfo.hidden = false;
        if (selectedJobTitle) selectedJobTitle.textContent = data.title || jobId;

        if (selectedJobMeta) {
            const categoryLabel = getCategoryLabel(data.category);
            const locationLabel = getLocationLabel(data.location);
            const typeLabel = getTypeLabel(data.type);
            const salaryLabel = data.salary || '';

            selectedJobMeta.innerHTML = `
                ${categoryLabel ? `<span><img src="icons/briefcase.svg" class="icon-svg icon-blue" alt="category"> ${escapeHtml(categoryLabel)}</span>` : ''}
                ${locationLabel ? `<span><img src="icons/geo-alt.svg" class="icon-svg icon-blue" alt="location"> ${escapeHtml(locationLabel)}</span>` : ''}
                ${typeLabel ? `<span><img src="icons/clock.svg" class="icon-svg icon-blue" alt="type"> ${escapeHtml(typeLabel)}</span>` : ''}
                ${salaryLabel ? `<span><img src="icons/currency-exchange.svg" class="icon-svg icon-blue" alt="salary"> ${escapeHtml(salaryLabel)}</span>` : ''}
            `;
        }

        if (jobTitleInput) jobTitleInput.value = data.title || jobId;
        if (jobCategoryInput) jobCategoryInput.value = getCategoryLabel(data.category);
        if (jobLocationInput) jobLocationInput.value = getLocationLabel(data.location);
        if (jobTypeInput) jobTypeInput.value = getTypeLabel(data.type);
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
                const exists = Array.from(positionSelect.options).some(opt => opt.value === jobId);
                if (!exists) {
                    const option = document.createElement('option');
                    option.value = jobId;
                    option.textContent = positionTitle || jobId;
                    positionSelect.appendChild(option);
                }
                positionSelect.value = jobId;
            }
            populateSelectedJob(jobId);
        }
    }

    jobCards.forEach(card => {
        const jobId = card.dataset.jobId;
        const applyBtn = card.querySelector('.apply-job');

        if (applyBtn) {
            applyBtn.addEventListener('click', (event) => {
                event.stopPropagation();
                const selectedId = applyBtn.dataset.job || jobId;
                const jobData = IMKJobs.getJobById(selectedId, jobs);
                const title = jobData?.title || selectedId;
                scrollToApplication(title, selectedId);
            });
        }

        card.addEventListener('click', (event) => {
            if (event.target.closest('.apply-job')) {
                return;
            }
            openJobDetailsPage(jobId);
        });
    });

    const params = new URLSearchParams(window.location.search);
    const applyJob = params.get('apply');
    if (applyJob) {
        const jobData = IMKJobs.getJobById(applyJob, jobs);
        const title = jobData?.title || applyJob;
        if (positionSelect) {
            const exists = Array.from(positionSelect.options).some(opt => opt.value === applyJob);
            if (!exists) {
                const option = document.createElement('option');
                option.value = applyJob;
                option.textContent = title;
                positionSelect.appendChild(option);
            }
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
            if (selected && selected !== 'other') {
                populateSelectedJob(selected);
            } else if (selectedJobInfo) {
                selectedJobInfo.hidden = true;
            }
        });
    }
}
