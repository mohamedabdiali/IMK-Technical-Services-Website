# IMK Technical Services Website - AI Coding Instructions

## Project Overview
Static HTML/CSS/JavaScript website for IMK Technical Services LLC, a Dubai-based technical services and manpower supply company. No build process, backend, or database—direct file editing via filesystem or live server. **All HTML files contain absolute Windows paths in image/favicon links that MUST be converted to relative paths before production deployment.**

## Architecture & Key Components

### Page Structure
- **7 Public Pages**: `index.html`, `about.html`, `services.html`, `how-we-work.html`, `projects-partners.html`, `jobs-career.html`, `contact.html`
- **Admin Section**: `admin/admin.html` - Standalone job management dashboard (uses JavaScript storage/local data, not connected to public pages)
- **Shared Header/Footer**: Duplicated in each HTML file (not templated - must update all files when changing nav/footer)

### Styling System
**Location**: `css/`
- `style.css` - Main stylesheet with CSS custom properties (variables)
- `animations.css` - Smooth scroll, fade effects, transitions
- `hero.css` - Hero slider styling (separate file for hero carousel)
- `responsive.css` - Mobile-first breakpoints (992px tablet, 1200px desktop)

**CSS Variables** (defined in `style.css`):
- Colors: `--primary-blue: #1a3e6c`, `--primary-orange: #f36f21`
- Spacing: `--spacing-xs` to `--spacing-xxl` (0.5rem to 4rem)
- Transitions: `--transition-fast` (0.2s), `--transition-normal` (0.3s), `--transition-slow` (0.5s)

### JavaScript Patterns
**Location**: `js/`

| File | Purpose | Key Functions |
|------|---------|---|
| `main.js` | Core initialization & utilities | `initMobileMenu()`, `initBackToTop()`, `sanitizeInputs()`, `initLazyLoading()` |
| `init.js` | DOMContentLoaded handler & global inits | `initHeroSlider()`, `initStatsCounter()`, AOS setup, year auto-update |
| `carousel.js` | `HeroCarousel` class (hero slider) | Constructor initializes autoplay, filter buttons, keyboard nav, video handling |
| `contact.js` | Contact form handling | Form submission, validation, data display |

**Initialization Order** (HTML load):
1. CSS files load (`style.css`, `animations.css`, `hero.css`, `responsive.css`)
2. External libraries load (AOS, Bootstrap Icons, Google Fonts, Cloudflare CDN)
3. All JS files in `<head>` (defer loading or placed before `</body>`)
4. DOMContentLoaded triggers `init.js` → instantiates `HeroCarousel` + AOS init
5. `main.js` runs utility functions after DOM ready

**Important**: All JS calls in `init.js` check for function existence: `if (typeof functionName === 'function')`

## Critical Conventions

### Animation System
- **Framework**: AOS (Animate On Scroll) library - NOT custom code
- **Usage**: Add `data-aos="fade-up|fade-right|fade-left"` to HTML elements
- **Config** (in `init.js`): `duration: 800ms`, `offset: 100px`, disabled on mobile `(< 768px)`
- **Example**: `<div class="about-content" data-aos="fade-right">`

### Hero Carousel (Index Page)
- **HeroCarousel class** in `carousel.js` instantiated by `initHeroSlider()` in `init.js`
- Auto-rotates every 5 seconds (configurable `autoplayDelay = 5000`)
- Supports 6 total slides (mix of video + image slides) with `data-type="video|image"` attribute
- Filter buttons (`.type-btn[data-type]`) toggle `activeFilter` and recreate indicators
- Keyboard navigation: Arrow keys (prev/next), Space (pause/resume autoplay)
- Indicators (dots) auto-recreated per filter; click jumps to slide
- Video handling: pauses autoplay on video play, resumes on video end
- HTML structure required: `#heroSlider`, `.slide` children, `#sliderIndicators`, `#prevSlide`, `#nextSlide`

### Mobile Menu Pattern
- Toggle button (`#menuToggle`) and menu (`#navMenu`) required in header
- Clicking toggle or nav link applies/removes `active` class
- Menu closes on: nav link click, outside click (document listener), mobile breakpoint resize
- Applied classes: `menuToggle.classList.toggle('active')`, `navMenu.classList.toggle('active')`, `document.body.classList.toggle('menu-open')`
- CSS handles 300px fixed sidebar animation on mobile/tablet (see `responsive.css`)
- All nav links have `.nav-link` class for event binding in `initMobileMenu()`

### Input Security
- Function `sanitizeInputs()` in `main.js` - prevents inline script execution in forms
- CSP headers in `<meta>` tag restrict script sources to `'self'` and Cloudflare CDN only
- All user inputs should go through sanitization before DOM insertion
⚠️ When Updating Navigation/Footer (Critical!)
- **ALL 8 HTML files share IDENTICAL nav/footer markup** - updating one requires updating all
- Files to sync: `index.html`, `about.html`, `services.html`, `how-we-work.html`, `projects-partners.html`, `jobs-career.html`, `contact.html`, `admin/admin.html`
- Search for navbar HTML and footer HTML structure; apply identical changes to all files
- Check `<ul class="nav-menu">` children and footer layout consistency

### When Adding New Sections/Pages
1. Copy nav/footer from existing page (ensure identical markup)
2. Use CSS variables (e.g., `var(--primary-blue)`, `var(--spacing-lg)`)
3. Add `data-aos="fade-up|fade-right|fade-left"` to animated elements
4. Test responsiveness: 768px (tablet), 992px (desktop), 1200px (large desktop)
5. Use semantic HTML: `<section>`, `<article>`, `<header>`, `<main>`
6. Verify external resources comply with CSP policy (images, fonts, CDN scripts)
7. Replace any absolute Windows paths with relative paths (`Images/filename.png`)

### Hero Slider Customization
- Carousel logic in `carousel.js` constructor: `autoplayDelay = 5000`, `isTransitioning` flag
- HTML structure required: `id="heroSlider"`, `.slide` class per slide, `id="sliderIndicators"`, `id="prevSlide"`, `id="nextSlide"`
- Filtering requires `data-type="video|image"` on slide elements
- Modify `HeroCarousel` class methods: `showSlide()`, `nextSlide()`, `prevSlide()`, `setFilter()`, `createIndicators()`
- Carousel config in `carousel.js` constructor: `autoplayDelay`, `isTransitioning`
- Slide HTML must have: `#heroSlider`, slides with `.slide` class, `#sliderIndicators` container
- Type filtering requires `data-type` attribute on slides
All images use `loading & Debugging

### Local Development
1. **No build/bundler** - Edit HTML/CSS/JS directly; changes appear immediately
2. **Live testing**: 
   - VS Code Live Server extension: Right-click HTML file → "Open with Live Server"
   - OR Python: `python -m http.server 8000` in workspace root, visit `localhost:8000`
3. **Browser DevTools**: Test console for JS errors, use Device Emulation for 768px/992px breakpoints
4. **Check CSP violations**: Console shows blocked scripts/styles (verify against CSP meta tag)

### Testing Workflow
- **Responsive**: Chrome DevTools → Emulate 768px (tablet) and 992px (desktop)
### HTML - Add Animated Section
```html
<section class="section-name" data-aos="fade-up">
  <div class="container">
    <h2 class="section-title">Title</h2>
    <p>Content here</p>
  </div>
</section>
```

### HTML - Responsive Grid Layout
```html
<div class="grid-container" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: var(--spacing-lg);">
  <!-- Cards auto-layout -->
</div>
```

### JavaScript - Safe Function Initialization Pattern
```javascript
// Used throughout init.js to avoid errors if function undefined
if (typeof functionName === 'function') {
  functionName();
}
```

### CSS - Common Utility Classes (from style.css)
```css
.container { max-width: 1200px; margin: 0 auto; padding: 0 var(--spacing-lg); }
.section-title { font-family: var(--font-heading); color: var(--primary-blue); }
.btn { padding: var(--spacing-sm) var(--spacing-md); border-radius: var(--radius-md); transition: var(--transition-normal); }
```

### Forms - Input Security Pattern
```javascript
// In sanitizeInputs() - escape HTML characters before DOM insertion
input.value = input.value
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;");
```

## Key Files for Reference
- **Navigation/Header Template**: [index.html](../index.html) - copy to all 8 pages
- **CSS Custom Properties**: [css/style.css](../css/style.css) - all color/spacing variables
- **Hero Carousel Class**: [js/carousel.js](../js/carousel.js) - HeroCarousel constructor & init
- **Mobile Menu Handler**: [js/main.js](../js/main.js) - initMobileMenu() logic
- **Responsive Breakpoints**: [css/responsive.css](../css/responsive.css) - tablet (768px) & desktop (992px)
- **Global Init**: [js/init.js](../js/init.js) - DOMContentLoaded handler & AOS setup
</div>
```

```javascript
// Common init pattern in main.js or init.js
if (typeof functionName === 'function') {
  functionName();
}
```

## Key Files for Reference
- Navigation structure: [index.html](../index.html)
- CSS variables & color scheme: [css/style.css](../css/style.css)
- Carousel implementation: [js/carousel.js](../js/carousel.js)
- Mobile menu logic: [js/main.js](../js/main.js)
- Responsive breakpoints: [css/responsive.css](../css/responsive.css)
