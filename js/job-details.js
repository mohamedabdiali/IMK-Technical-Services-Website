document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('jobDetailContent');
    if (!container || !window.IMKJobs) return;

    const params = new URLSearchParams(window.location.search);
    const jobId = params.get('job');

    const escapeHtml = (value) => {
        return String(value || '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    };

    if (!jobId) {
        container.innerHTML = `
            <div class="job-detail-empty">
                <h2>Job Not Found</h2>
                <p>Please return to the Jobs & Career page to view available positions.</p>
                <a class="btn btn-primary" href="jobs-career.html#job-categories">Back to Jobs</a>
            </div>
        `;
        return;
    }

    const jobs = IMKJobs.loadJobs();
    const data = IMKJobs.getJobById(jobId, jobs);

    if (!data || data.status !== 'active') {
        container.innerHTML = `
            <div class="job-detail-empty">
                <h2>Position Not Available</h2>
                <p>This position is no longer accepting applications.</p>
                <a class="btn btn-primary" href="jobs-career.html#job-categories">Back to Jobs</a>
            </div>
        `;
        return;
    }

    document.title = `${data.title} | IMK Technical Services LLC`;

    const applyLink = `jobs-career.html?apply=${encodeURIComponent(jobId)}#application-form-section`;

    const responsibilities = (data.responsibilities || []).map(item => `<li>${escapeHtml(item)}</li>`).join('');
    const requirements = (data.requirements || []).map(item => `<li>${escapeHtml(item)}</li>`).join('');

    const responsibilitiesHtml = responsibilities ? `
        <div class="job-detail-section">
            <h4>Key Responsibilities</h4>
            <ul>${responsibilities}</ul>
        </div>` : '';

    const requirementsHtml = requirements ? `
        <div class="job-detail-section">
            <h4>Requirements</h4>
            <ul>${requirements}</ul>
        </div>` : '';

    const categoryLabel = IMKJobs.CATEGORY_LABELS[data.category] || data.category || '';
    const locationLabel = IMKJobs.LOCATION_LABELS[data.location] || data.location || '';
    const typeLabel = IMKJobs.TYPE_LABELS[data.type] || data.type || '';

    container.innerHTML = `
        <div class="job-detail-actions">
            <a class="btn btn-outline" href="jobs-career.html#job-categories">Back to Jobs</a>
            <a class="btn btn-primary" href="${applyLink}">Apply Now</a>
        </div>

        <div class="modal-job-header">
            <h2 class="modal-job-title">${escapeHtml(data.title)}</h2>
            <div class="modal-job-meta">
                ${categoryLabel ? `<span><img src="icons/briefcase.svg" class="icon-svg icon-blue" alt="category"> ${escapeHtml(categoryLabel)}</span>` : ''}
                ${locationLabel ? `<span><img src="icons/geo-alt.svg" class="icon-svg icon-blue" alt="location"> ${escapeHtml(locationLabel)}</span>` : ''}
                ${typeLabel ? `<span><img src="icons/clock.svg" class="icon-svg icon-blue" alt="type"> ${escapeHtml(typeLabel)}</span>` : ''}
                ${data.salary ? `<span><img src="icons/currency-exchange.svg" class="icon-svg icon-blue" alt="salary"> ${escapeHtml(data.salary)}</span>` : ''}
            </div>
        </div>

        <div class="modal-job-body">
            <h4>Job Description</h4>
            <p>${escapeHtml(data.description)}</p>
            ${responsibilitiesHtml || requirementsHtml ? `
            <div class="job-detail-sections">
                ${responsibilitiesHtml}
                ${requirementsHtml}
            </div>` : ''}
        </div>
    `;

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
});
