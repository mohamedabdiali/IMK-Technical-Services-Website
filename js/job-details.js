document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('jobDetailContent');
    if (!container) return;

    const params = new URLSearchParams(window.location.search);
    const jobId = params.get('job');

    const toTitle = (text) => text
        .split('-')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');

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

    const data = jobDetails[jobId] || {
        title: toTitle(jobId),
        category: '',
        location: '',
        type: '',
        salary: '',
        description: 'Full details for this position will be shared by our recruitment team.',
        requirements: [],
        responsibilities: []
    };

    document.title = `${data.title} | IMK Technical Services LLC`;

    const applyLink = `jobs-career.html?apply=${encodeURIComponent(jobId)}#application-form-section`;

    const responsibilitiesHtml = data.responsibilities.length ? `
        <div class="job-detail-section">
            <h4>Key Responsibilities</h4>
            <ul>
                ${data.responsibilities.map(res => `<li>${res}</li>`).join('')}
            </ul>
        </div>` : '';

    const requirementsHtml = data.requirements.length ? `
        <div class="job-detail-section">
            <h4>Requirements</h4>
            <ul>
                ${data.requirements.map(req => `<li>${req}</li>`).join('')}
            </ul>
        </div>` : '';

    container.innerHTML = `
        <div class="job-detail-actions">
            <a class="btn btn-outline" href="jobs-career.html#job-categories">Back to Jobs</a>
            <a class="btn btn-primary" href="${applyLink}">Apply Now</a>
        </div>

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
            ${responsibilitiesHtml || requirementsHtml ? `
            <div class="job-detail-sections">
                ${responsibilitiesHtml}
                ${requirementsHtml}
            </div>` : ''}
        </div>
    `;
});
