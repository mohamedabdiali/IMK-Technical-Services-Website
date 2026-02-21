(() => {
    if (!window.IMKJobs) {
        return;
    }

    const jobModalElement = document.getElementById('jobModal');
    const jobModal = jobModalElement ? new bootstrap.Modal(jobModalElement) : null;

    const elements = {
        statTotal: document.getElementById('statTotal'),
        statActive: document.getElementById('statActive'),
        statDraft: document.getElementById('statDraft'),
        statUpdated: document.getElementById('statUpdated'),
        tableBody: document.getElementById('jobsTableBody'),
        emptyState: document.getElementById('jobsEmptyState'),
        searchInput: document.getElementById('jobSearchInput'),
        statusFilter: document.getElementById('statusFilter'),
        addJobBtn: document.getElementById('addJobBtn'),
        exportBtn: document.getElementById('exportJobs'),
        importInput: document.getElementById('importJobs'),
        jobForm: document.getElementById('jobForm'),
        modalTitle: document.getElementById('jobModalTitle'),
        saveBtn: document.getElementById('saveJobBtn'),
        formError: document.getElementById('jobFormError'),
        titleInput: document.getElementById('jobTitleInput'),
        idInput: document.getElementById('jobIdInput'),
        categoryInput: document.getElementById('jobCategoryInput'),
        locationInput: document.getElementById('jobLocationInput'),
        typeInput: document.getElementById('jobTypeInput'),
        salaryInput: document.getElementById('jobSalaryInput'),
        badgeInput: document.getElementById('jobBadgeInput'),
        statusInput: document.getElementById('jobStatusInput'),
        postedInput: document.getElementById('jobPostedInput'),
        descriptionInput: document.getElementById('jobDescriptionInput'),
        highlight1Input: document.getElementById('jobHighlight1Input'),
        highlight2Input: document.getElementById('jobHighlight2Input'),
        requirementsInput: document.getElementById('jobRequirementsInput'),
        responsibilitiesInput: document.getElementById('jobResponsibilitiesInput')
    };

    let jobs = IMKJobs.loadJobs();
    let editingId = null;
    let autoSlug = true;

    const escapeHtml = (value) => {
        return String(value || '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    };

    const today = () => new Date().toISOString().split('T')[0];

    const parseLines = (value) => {
        return String(value || '')
            .split('\n')
            .map(item => item.trim())
            .filter(Boolean);
    };

    const renderStats = () => {
        const total = jobs.length;
        const active = jobs.filter(job => job.status === 'active').length;
        const draft = jobs.filter(job => job.status === 'draft').length;
        const updates = jobs.map(job => job.updatedAt || job.postedDate).filter(Boolean).sort();
        const lastUpdated = updates.length ? updates[updates.length - 1] : '-';

        if (elements.statTotal) elements.statTotal.textContent = total;
        if (elements.statActive) elements.statActive.textContent = active;
        if (elements.statDraft) elements.statDraft.textContent = draft;
        if (elements.statUpdated) elements.statUpdated.textContent = lastUpdated;
    };

    const renderTable = () => {
        if (!elements.tableBody) return;
        const term = (elements.searchInput?.value || '').toLowerCase().trim();
        const status = elements.statusFilter?.value || '';

        const filtered = jobs
            .filter(job => {
                const matchesTerm = !term ||
                    job.title.toLowerCase().includes(term) ||
                    job.id.toLowerCase().includes(term);
                const matchesStatus = !status || job.status === status;
                return matchesTerm && matchesStatus;
            })
            .sort((a, b) => a.title.localeCompare(b.title));

        elements.tableBody.innerHTML = filtered.map(job => {
            const category = IMKJobs.CATEGORY_LABELS[job.category] || job.category;
            const location = IMKJobs.LOCATION_LABELS[job.location] || job.location;
            const type = IMKJobs.TYPE_LABELS[job.type] || job.type;
            const updated = job.updatedAt || job.postedDate || '-';
            const previewUrl = `../job-details.html?job=${encodeURIComponent(job.id)}`;

            return `
                <tr data-id="${escapeHtml(job.id)}">
                    <td>
                        <strong>${escapeHtml(job.title)}</strong><br>
                        <span class="text-muted small">ID: ${escapeHtml(job.id)}</span>
                    </td>
                    <td>${escapeHtml(category)}</td>
                    <td>${escapeHtml(location)}</td>
                    <td>${escapeHtml(type)}</td>
                    <td><span class="badge-status ${escapeHtml(job.status)}">${escapeHtml(job.status)}</span></td>
                    <td>${escapeHtml(updated)}</td>
                    <td>
                        <div class="admin-actions">
                            <a class="btn btn-sm btn-outline-secondary" href="${previewUrl}" target="_blank" rel="noopener">View</a>
                            <button class="btn btn-sm btn-outline-primary" data-action="edit">Edit</button>
                            <button class="btn btn-sm btn-outline-warning" data-action="duplicate">Duplicate</button>
                            <button class="btn btn-sm btn-outline-danger" data-action="delete">Delete</button>
                        </div>
                    </td>
                </tr>
            `;
        }).join('');

        if (elements.emptyState) {
            elements.emptyState.hidden = filtered.length > 0;
        }
    };

    const renderAll = () => {
        renderStats();
        renderTable();
    };

    const showError = (message) => {
        if (!elements.formError) return;
        elements.formError.textContent = message;
        elements.formError.hidden = false;
    };

    const clearError = () => {
        if (!elements.formError) return;
        elements.formError.hidden = true;
        elements.formError.textContent = '';
    };

    const openModal = (job) => {
        if (!elements.jobForm || !jobModal) return;
        clearError();
        elements.jobForm.reset();

        if (job) {
            editingId = job.id;
            autoSlug = false;
            elements.modalTitle.textContent = `Edit Job: ${job.title}`;
            elements.titleInput.value = job.title || '';
            elements.idInput.value = job.id || '';
            elements.categoryInput.value = job.category || 'skilled';
            elements.locationInput.value = job.location || 'all-uae';
            elements.typeInput.value = job.type || 'full-time';
            elements.salaryInput.value = job.salary || '';
            elements.badgeInput.value = job.badge || '';
            elements.statusInput.value = job.status || 'active';
            elements.postedInput.value = job.postedDate || '';
            elements.descriptionInput.value = job.description || '';
            elements.highlight1Input.value = job.highlights?.[0] || '';
            elements.highlight2Input.value = job.highlights?.[1] || '';
            elements.requirementsInput.value = (job.requirements || []).join('\n');
            elements.responsibilitiesInput.value = (job.responsibilities || []).join('\n');
        } else {
            editingId = null;
            autoSlug = true;
            elements.modalTitle.textContent = 'Add Job';
            elements.statusInput.value = 'active';
            elements.postedInput.value = today();
        }

        jobModal.show();
    };

    const ensureUniqueId = (id) => {
        if (!id) return false;
        if (!editingId) {
            return !jobs.some(job => job.id === id);
        }
        return !jobs.some(job => job.id === id && job.id !== editingId);
    };

    const buildJobFromForm = () => {
        const title = elements.titleInput.value.trim();
        if (!title) {
            showError('Job title is required.');
            return null;
        }

        const slugInput = elements.idInput.value.trim();
        const slug = IMKJobs.slugify(slugInput || title);

        if (!slug) {
            showError('Job ID could not be generated.');
            return null;
        }

        if (slug === 'other') {
            showError('Job ID cannot be "other".');
            return null;
        }

        if (!ensureUniqueId(slug)) {
            showError('Job ID already exists. Please choose a unique ID.');
            return null;
        }

        const postedDate = elements.postedInput.value || (editingId ? jobs.find(job => job.id === editingId)?.postedDate : '') || today();

        return {
            id: slug,
            title,
            category: elements.categoryInput.value,
            location: elements.locationInput.value,
            type: elements.typeInput.value,
            salary: elements.salaryInput.value.trim(),
            badge: elements.badgeInput.value.trim(),
            description: elements.descriptionInput.value.trim(),
            highlights: [elements.highlight1Input.value.trim(), elements.highlight2Input.value.trim()].filter(Boolean),
            requirements: parseLines(elements.requirementsInput.value),
            responsibilities: parseLines(elements.responsibilitiesInput.value),
            status: elements.statusInput.value,
            postedDate,
            updatedAt: today()
        };
    };

    const saveJob = () => {
        clearError();
        const job = buildJobFromForm();
        if (!job) return;

        if (editingId) {
            const index = jobs.findIndex(item => item.id === editingId);
            if (index !== -1) {
                jobs[index] = job;
            } else {
                jobs.push(job);
            }
        } else {
            jobs.push(job);
        }

        jobs = IMKJobs.saveJobs(jobs);
        renderAll();
        jobModal.hide();
    };

    const deleteJob = (id) => {
        const job = jobs.find(item => item.id === id);
        if (!job) return;
        if (!confirm(`Delete "${job.title}"? This cannot be undone.`)) return;
        jobs = jobs.filter(item => item.id !== id);
        jobs = IMKJobs.saveJobs(jobs);
        renderAll();
    };

    const duplicateJob = (id) => {
        const job = jobs.find(item => item.id === id);
        if (!job) return;
        let suffix = 1;
        let newId = `${job.id}-copy`;
        while (jobs.some(item => item.id === newId)) {
            suffix += 1;
            newId = `${job.id}-copy-${suffix}`;
        }
        const copy = {
            ...job,
            id: newId,
            title: `${job.title} (Copy)`,
            status: 'draft',
            postedDate: today(),
            updatedAt: today()
        };
        jobs.push(copy);
        jobs = IMKJobs.saveJobs(jobs);
        renderAll();
    };

    const exportJobs = () => {
        const data = JSON.stringify(jobs, null, 2);
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'imk-jobs.json';
        document.body.appendChild(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(url);
    };

    const importJobs = (file) => {
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
            try {
                const parsed = JSON.parse(reader.result);
                const list = Array.isArray(parsed)
                    ? parsed
                    : Object.keys(parsed || {}).map((id) => ({ id, ...parsed[id] }));
                jobs = IMKJobs.saveJobs(list);
                renderAll();
            } catch (err) {
                alert('Invalid JSON file.');
            }
        };
        reader.readAsText(file);
    };

    elements.addJobBtn?.addEventListener('click', () => openModal(null));
    elements.saveBtn?.addEventListener('click', saveJob);
    elements.searchInput?.addEventListener('input', renderTable);
    elements.statusFilter?.addEventListener('change', renderTable);
    elements.exportBtn?.addEventListener('click', exportJobs);

    elements.importInput?.addEventListener('change', (event) => {
        const file = event.target.files?.[0];
        if (file) {
            importJobs(file);
            event.target.value = '';
        }
    });

    elements.titleInput?.addEventListener('input', () => {
        if (!autoSlug) return;
        elements.idInput.value = IMKJobs.slugify(elements.titleInput.value);
    });

    elements.idInput?.addEventListener('input', () => {
        autoSlug = !elements.idInput.value.trim();
    });

    elements.tableBody?.addEventListener('click', (event) => {
        const button = event.target.closest('button[data-action]');
        if (!button) return;
        const row = button.closest('tr');
        const id = row?.dataset?.id;
        if (!id) return;

        const action = button.dataset.action;
        if (action === 'edit') {
            const job = jobs.find(item => item.id === id);
            if (job) openModal(job);
        } else if (action === 'delete') {
            deleteJob(id);
        } else if (action === 'duplicate') {
            duplicateJob(id);
        }
    });

    renderAll();
})();
