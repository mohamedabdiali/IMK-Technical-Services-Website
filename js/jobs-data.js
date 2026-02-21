(() => {
    const STORAGE_KEY = 'imk.jobs.v1';

    const CATEGORY_LABELS = {
        'skilled': 'Skilled Manpower',
        'non-skilled': 'Non-Skilled Manpower',
        'supervisory': 'Supervisory Staff',
        'office': 'Office Staff'
    };

    const LOCATION_LABELS = {
        'dubai': 'Dubai',
        'abu-dhabi': 'Abu Dhabi',
        'sharjah': 'Sharjah',
        'ajman': 'Ajman',
        'ras-al-khaimah': 'Ras Al Khaimah',
        'fujairah': 'Fujairah',
        'all-uae': 'All UAE'
    };

    const TYPE_LABELS = {
        'full-time': 'Full-time',
        'part-time': 'Part-time',
        'contract': 'Contract',
        'temporary': 'Temporary'
    };

    const DEFAULT_JOBS = [
        {
            id: 'electrician',
            title: 'Electrician',
            category: 'skilled',
            location: 'all-uae',
            type: 'full-time',
            salary: 'AED 2,000 - 3,000',
            badge: 'Urgent',
            description: 'Experienced electricians for commercial and residential projects across the UAE.',
            highlights: ['3+ Years Experience', 'Technical Diploma'],
            requirements: [
                'Minimum 2 years experience in construction sites',
                'Knowledge of DEWA regulations is a plus',
                'Ability to read electrical blueprints',
                'Physically fit and able to work in outdoor conditions'
            ],
            responsibilities: [
                'Install electrical wiring, fixtures, and control systems',
                'Troubleshoot electrical issues on site',
                'Ensure all work meets safety standards',
                'Collaborate with other MEP technicians'
            ],
            status: 'active',
            postedDate: '2026-02-01'
        },
        {
            id: 'plumber',
            title: 'Plumber',
            category: 'skilled',
            location: 'abu-dhabi',
            type: 'full-time',
            salary: 'AED 1,400 - 2,200',
            badge: '',
            description: 'Plumbers needed for installation of water and drainage systems in residential and commercial projects.',
            highlights: ['2+ Years Experience', 'PPR/PVC/HDPE'],
            requirements: [
                '2+ years of plumbing experience',
                'Familiarity with various piping materials (PPR, PVC, HDPE)',
                'Ability to work independently'
            ],
            responsibilities: [
                'Install pipes, valves, and fittings',
                'Connect water and drainage systems',
                'Test systems for leaks and pressure',
                'Maintain plumbing tools and equipment'
            ],
            status: 'active',
            postedDate: '2026-02-01'
        },
        {
            id: 'ac-technician',
            title: 'AC Technician',
            category: 'skilled',
            location: 'dubai',
            type: 'full-time',
            salary: 'AED 1,800 - 2,800',
            badge: '',
            description: 'AC technicians required for installation and servicing of HVAC systems in high-rise projects.',
            highlights: ['3+ Years Experience', 'VRF/Split Units'],
            requirements: [
                '3+ years experience in HVAC field',
                'Knowledge of VRF and split unit systems',
                'UAE experience preferred'
            ],
            responsibilities: [
                'Install indoor and outdoor AC units',
                'Copper pipe insulation and brazing',
                'Gas charging and leak detection',
                'Routine maintenance and repair'
            ],
            status: 'active',
            postedDate: '2026-02-01'
        },
        {
            id: 'hvac-technician',
            title: 'HVAC Technician',
            category: 'skilled',
            location: 'dubai',
            type: 'full-time',
            salary: 'AED 2,500 - 3,000',
            badge: '',
            description: 'Installation, maintenance, and repair of HVAC systems in commercial buildings. MEP background required.',
            highlights: ['4+ Years Experience', 'HVAC Certification'],
            requirements: [
                '4+ years experience in HVAC field',
                'Knowledge of VRF and split unit systems',
                'UAE experience preferred'
            ],
            responsibilities: [
                'Install indoor and outdoor HVAC units',
                'Ducting, insulation, and commissioning',
                'Troubleshoot system faults',
                'Perform preventive maintenance'
            ],
            status: 'active',
            postedDate: '2026-02-01'
        },
        {
            id: 'mason',
            title: 'Mason',
            category: 'skilled',
            location: 'dubai',
            type: 'full-time',
            salary: 'AED 2,000 - 2,500',
            badge: '',
            description: 'Tiles installation, blockwork, and wall repair for commercial projects.',
            highlights: ['3+ Years Experience', 'Tiles & Block Work'],
            requirements: [
                '3+ years of masonry experience',
                'Ability to read drawings and layouts',
                'Good finishing and alignment skills'
            ],
            responsibilities: [
                'Prepare surfaces and layout work areas',
                'Install tiles, blocks, and related materials',
                'Repair or rebuild damaged walls and structures',
                'Maintain safe and clean work areas'
            ],
            status: 'active',
            postedDate: '2026-02-01'
        },
        {
            id: 'steel-fixer',
            title: 'Steel Fixer',
            category: 'skilled',
            location: 'abu-dhabi',
            type: 'contract',
            salary: 'AED 1,200 - 2,000',
            badge: '',
            description: 'Steel fixers needed for reinforcement works on high-rise construction projects.',
            highlights: ['2+ Years Experience', 'Steel Fixing Experience'],
            requirements: [
                'Proven experience as a Steel Fixer',
                'Ability to read structural drawings',
                'Manual dexterity and physical strength'
            ],
            responsibilities: [
                'Read and interpret reinforcement drawings',
                'Cut and bend steel bars according to specifications',
                'Position and tie steel reinforcement with wire',
                'Ensure correct concrete cover and spacing'
            ],
            status: 'active',
            postedDate: '2026-02-01'
        },
        {
            id: 'mep-helper',
            title: 'MEP Helper',
            category: 'non-skilled',
            location: 'sharjah',
            type: 'full-time',
            salary: 'AED 1,200 - 1,800',
            badge: '',
            description: 'Assist MEP technicians with installation and maintenance works. Training provided.',
            highlights: ['Fresher Welcome', 'Medical Fitness'],
            requirements: [
                'Fresher or 1 year experience',
                'Willingness to learn and work hard',
                'Basic English communication'
            ],
            responsibilities: [
                'Organize and deliver tools/materials to technicians',
                'Assist in cleaning and prepping work areas',
                'Hold and support equipment during installation',
                'Learn basic technical skills on the job'
            ],
            status: 'active',
            postedDate: '2026-02-01'
        },
        {
            id: 'site-supervisor',
            title: 'Site Supervisor',
            category: 'supervisory',
            location: 'dubai',
            type: 'full-time',
            salary: 'AED 3,500 - 5,000',
            badge: 'New',
            description: 'Supervise construction teams to ensure safe, timely, and high-quality project delivery.',
            highlights: ['5+ Years Experience', 'Civil Engineering Degree'],
            requirements: [
                '5+ years of site supervision experience in UAE',
                'Diploma or Degree in Civil/Mechanical Engineering',
                'Strong leadership and communication skills',
                'Knowledge of safety regulations (HSE)'
            ],
            responsibilities: [
                'Daily planning and task allocation for workers',
                'Monitor work quality and progress',
                'Ensure compliance with safety standards',
                'Report project status to project managers'
            ],
            status: 'active',
            postedDate: '2026-02-01'
        },
        {
            id: 'general-labourer',
            title: 'General Labourer',
            category: 'non-skilled',
            location: 'all-uae',
            type: 'temporary',
            salary: 'AED 1,200 - 1,500',
            badge: '',
            description: 'General construction support tasks across various work sites in the UAE.',
            highlights: ['Physically Fit', 'Reliable & Punctual'],
            requirements: [
                'Physically fit for manual labour',
                'Reliable and punctual',
                'Ability to follow instructions'
            ],
            responsibilities: [
                'Load and unload construction materials',
                'Maintain site cleanliness and organization',
                'Shift materials manually or using basic equipment',
                'Assist various trades as needed'
            ],
            status: 'active',
            postedDate: '2026-02-01'
        },
        {
            id: 'carpenter',
            title: 'Carpenter',
            category: 'skilled',
            location: 'all-uae',
            type: 'full-time',
            salary: 'AED 2,500 - 4,500',
            badge: '',
            description: 'Carpenters required for formwork, finishing, and site installations.',
            highlights: ['Relevant Experience', 'UAE Experience Preferred'],
            requirements: [
                'Experience in relevant field',
                'UAE experience preferred',
                'Valid certificates'
            ],
            responsibilities: [
                'Perform daily tasks according to project requirements',
                'Maintain HSE standards',
                'Report to site supervisor'
            ],
            status: 'active',
            postedDate: '2026-02-01'
        },
        {
            id: 'painter',
            title: 'Painter',
            category: 'skilled',
            location: 'all-uae',
            type: 'full-time',
            salary: 'AED 2,500 - 4,500',
            badge: '',
            description: 'Painters needed for interior and exterior finishing works.',
            highlights: ['Relevant Experience', 'UAE Experience Preferred'],
            requirements: [
                'Experience in relevant field',
                'UAE experience preferred',
                'Valid certificates'
            ],
            responsibilities: [
                'Perform daily tasks according to project requirements',
                'Maintain HSE standards',
                'Report to site supervisor'
            ],
            status: 'active',
            postedDate: '2026-02-01'
        },
        {
            id: 'welder',
            title: 'Welder',
            category: 'skilled',
            location: 'all-uae',
            type: 'full-time',
            salary: 'AED 2,500 - 4,500',
            badge: '',
            description: 'Welders required for site fabrication and installation works.',
            highlights: ['Relevant Experience', 'Valid Certificates'],
            requirements: [
                'Experience in relevant field',
                'UAE experience preferred',
                'Valid certificates'
            ],
            responsibilities: [
                'Perform daily tasks according to project requirements',
                'Maintain HSE standards',
                'Report to site supervisor'
            ],
            status: 'active',
            postedDate: '2026-02-01'
        },
        {
            id: 'driver',
            title: 'Driver',
            category: 'non-skilled',
            location: 'all-uae',
            type: 'full-time',
            salary: 'AED 2,500 - 4,500',
            badge: '',
            description: 'Drivers required for staff and material transport.',
            highlights: ['Valid UAE License', 'Safe Driving Record'],
            requirements: [
                'Experience in relevant field',
                'UAE experience preferred',
                'Valid certificates'
            ],
            responsibilities: [
                'Perform daily tasks according to project requirements',
                'Maintain HSE standards',
                'Report to site supervisor'
            ],
            status: 'active',
            postedDate: '2026-02-01'
        },
        {
            id: 'forklift-operator',
            title: 'Forklift Operator',
            category: 'skilled',
            location: 'all-uae',
            type: 'full-time',
            salary: 'AED 2,500 - 4,500',
            badge: '',
            description: 'Certified forklift operators required for warehouse and site logistics.',
            highlights: ['Certified Operator', 'UAE Experience Preferred'],
            requirements: [
                'Experience in relevant field',
                'UAE experience preferred',
                'Valid certificates'
            ],
            responsibilities: [
                'Perform daily tasks according to project requirements',
                'Maintain HSE standards',
                'Report to site supervisor'
            ],
            status: 'active',
            postedDate: '2026-02-01'
        },
        {
            id: 'civil-engineer',
            title: 'Civil Engineer',
            category: 'supervisory',
            location: 'all-uae',
            type: 'full-time',
            salary: 'AED 4,000 - 6,000',
            badge: '',
            description: 'Civil engineers required for site supervision, planning, and quality control.',
            highlights: ['Engineering Degree', 'UAE Experience Preferred'],
            requirements: [
                'Experience in relevant field',
                'UAE experience preferred',
                'Valid certificates'
            ],
            responsibilities: [
                'Perform daily tasks according to project requirements',
                'Maintain HSE standards',
                'Report to site supervisor'
            ],
            status: 'active',
            postedDate: '2026-02-01'
        },
        {
            id: 'electrical-engineer',
            title: 'Electrical Engineer',
            category: 'supervisory',
            location: 'all-uae',
            type: 'full-time',
            salary: 'AED 4,000 - 6,000',
            badge: '',
            description: 'Electrical engineers required for MEP coordination and site supervision.',
            highlights: ['Engineering Degree', 'UAE Experience Preferred'],
            requirements: [
                'Experience in relevant field',
                'UAE experience preferred',
                'Valid certificates'
            ],
            responsibilities: [
                'Perform daily tasks according to project requirements',
                'Maintain HSE standards',
                'Report to site supervisor'
            ],
            status: 'active',
            postedDate: '2026-02-01'
        },
        {
            id: 'hr-coordinator',
            title: 'HR Coordinator',
            category: 'office',
            location: 'dubai',
            type: 'full-time',
            salary: 'AED 4,000 - 6,000',
            badge: '',
            description: 'HR coordinators required for recruitment support and staff onboarding.',
            highlights: ['HR Experience', 'Strong Communication'],
            requirements: [
                'Experience in relevant field',
                'UAE experience preferred',
                'Valid certificates'
            ],
            responsibilities: [
                'Perform daily tasks according to project requirements',
                'Maintain HSE standards',
                'Report to site supervisor'
            ],
            status: 'active',
            postedDate: '2026-02-01'
        },
        {
            id: 'document-controller',
            title: 'Document Controller',
            category: 'office',
            location: 'dubai',
            type: 'full-time',
            salary: 'AED 4,000 - 6,000',
            badge: '',
            description: 'Maintain project documentation and ensure proper record keeping.',
            highlights: ['Document Control', 'Detail Oriented'],
            requirements: [
                'Experience in relevant field',
                'UAE experience preferred',
                'Valid certificates'
            ],
            responsibilities: [
                'Perform daily tasks according to project requirements',
                'Maintain HSE standards',
                'Report to site supervisor'
            ],
            status: 'active',
            postedDate: '2026-02-01'
        },
        {
            id: 'safety-officer',
            title: 'Safety Officer',
            category: 'supervisory',
            location: 'all-uae',
            type: 'full-time',
            salary: 'AED 4,000 - 6,000',
            badge: '',
            description: 'Safety officers required to implement and monitor HSE compliance.',
            highlights: ['HSE Certified', 'Site Monitoring'],
            requirements: [
                'Experience in relevant field',
                'UAE experience preferred',
                'Valid certificates'
            ],
            responsibilities: [
                'Perform daily tasks according to project requirements',
                'Maintain HSE standards',
                'Report to site supervisor'
            ],
            status: 'active',
            postedDate: '2026-02-01'
        },
        {
            id: 'procurement-assistant',
            title: 'Procurement Assistant',
            category: 'office',
            location: 'dubai',
            type: 'full-time',
            salary: 'AED 4,000 - 6,000',
            badge: '',
            description: 'Support procurement activities, sourcing, and vendor coordination.',
            highlights: ['Procurement Support', 'Vendor Coordination'],
            requirements: [
                'Experience in relevant field',
                'UAE experience preferred',
                'Valid certificates'
            ],
            responsibilities: [
                'Perform daily tasks according to project requirements',
                'Maintain HSE standards',
                'Report to site supervisor'
            ],
            status: 'active',
            postedDate: '2026-02-01'
        },
        {
            id: 'storekeeper',
            title: 'Storekeeper',
            category: 'office',
            location: 'all-uae',
            type: 'full-time',
            salary: 'AED 3,500 - 5,500',
            badge: '',
            description: 'Manage inventory, materials, and store records.',
            highlights: ['Inventory Control', 'ERP/Excel'],
            requirements: [
                'Experience in relevant field',
                'UAE experience preferred',
                'Valid certificates'
            ],
            responsibilities: [
                'Perform daily tasks according to project requirements',
                'Maintain HSE standards',
                'Report to site supervisor'
            ],
            status: 'active',
            postedDate: '2026-02-01'
        },
        {
            id: 'scaffolder',
            title: 'Scaffolder',
            category: 'skilled',
            location: 'all-uae',
            type: 'full-time',
            salary: 'AED 3,500 - 5,500',
            badge: '',
            description: 'Scaffolders needed for safe erection and dismantling of scaffolding systems.',
            highlights: ['Certified Scaffolder', 'Safety Focused'],
            requirements: [
                'Experience in relevant field',
                'UAE experience preferred',
                'Valid certificates'
            ],
            responsibilities: [
                'Perform daily tasks according to project requirements',
                'Maintain HSE standards',
                'Report to site supervisor'
            ],
            status: 'active',
            postedDate: '2026-02-01'
        },
        {
            id: 'rigging-supervisor',
            title: 'Rigging Supervisor',
            category: 'supervisory',
            location: 'all-uae',
            type: 'full-time',
            salary: 'AED 4,000 - 6,000',
            badge: '',
            description: 'Supervise rigging operations and ensure lifting plans are executed safely.',
            highlights: ['Rigging Experience', 'Leadership Skills'],
            requirements: [
                'Experience in relevant field',
                'UAE experience preferred',
                'Valid certificates'
            ],
            responsibilities: [
                'Perform daily tasks according to project requirements',
                'Maintain HSE standards',
                'Report to site supervisor'
            ],
            status: 'active',
            postedDate: '2026-02-01'
        }
    ];

    const slugify = (value) => {
        return String(value || '')
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-');
    };

    const normalizeList = (value) => {
        if (Array.isArray(value)) {
            return value.map(item => String(item || '').trim()).filter(Boolean);
        }
        if (typeof value === 'string') {
            return value.split('\n').map(item => item.trim()).filter(Boolean);
        }
        return [];
    };

    const normalizeJob = (job) => {
        const title = job.title || 'Untitled Position';
        const id = job.id ? slugify(job.id) : slugify(title);
        return {
            id,
            title,
            category: job.category || 'skilled',
            location: job.location || 'all-uae',
            type: job.type || 'full-time',
            salary: job.salary || '',
            badge: job.badge || '',
            description: job.description || '',
            highlights: normalizeList(job.highlights),
            requirements: normalizeList(job.requirements),
            responsibilities: normalizeList(job.responsibilities),
            status: job.status || 'active',
            postedDate: job.postedDate || '',
            updatedAt: job.updatedAt || job.postedDate || ''
        };
    };

    const loadJobs = () => {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (raw) {
                const parsed = JSON.parse(raw);
                const list = Array.isArray(parsed)
                    ? parsed
                    : Object.keys(parsed || {}).map((id) => ({ id, ...parsed[id] }));
                return list.map(normalizeJob);
            }
        } catch (err) {
            console.warn('Unable to load jobs from storage', err);
        }
        return DEFAULT_JOBS.map(normalizeJob);
    };

    const saveJobs = (jobs) => {
        try {
            const normalized = Array.isArray(jobs) ? jobs.map(normalizeJob) : DEFAULT_JOBS.map(normalizeJob);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
            return normalized;
        } catch (err) {
            console.warn('Unable to save jobs to storage', err);
            return jobs;
        }
    };

    const resetJobs = () => {
        return saveJobs(DEFAULT_JOBS);
    };

    const getJobById = (id, jobs) => {
        const list = jobs || loadJobs();
        return list.find(job => job.id === id);
    };

    window.IMKJobs = {
        STORAGE_KEY,
        CATEGORY_LABELS,
        LOCATION_LABELS,
        TYPE_LABELS,
        DEFAULT_JOBS,
        loadJobs,
        saveJobs,
        resetJobs,
        getJobById,
        normalizeJob,
        slugify
    };
})();
