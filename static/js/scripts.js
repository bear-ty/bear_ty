const contentDirectory = 'contents/';
const sectionNames = ['profile', 'home', 'research', 'projects', 'awards'];

window.addEventListener('DOMContentLoaded', async () => {
    const toggle = document.querySelector('.nav-toggle');
    const navigation = document.querySelector('#navbarResponsive');
    const navLinks = [...document.querySelectorAll('.nav-link')];

    function closeNavigation() {
        toggle.setAttribute('aria-expanded', 'false');
        navigation.classList.remove('open');
    }

    toggle.addEventListener('click', () => {
        const isOpen = toggle.getAttribute('aria-expanded') === 'true';
        toggle.setAttribute('aria-expanded', String(!isOpen));
        navigation.classList.toggle('open', !isOpen);
    });
    navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeNavigation));
    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
            closeNavigation();
            toggle.focus();
        }
    });
    document.addEventListener('click', event => {
        if (!event.target.closest('#mainNav')) closeNavigation();
    });

    async function fetchText(path) {
        const response = await fetch(contentDirectory + path);
        if (!response.ok) throw new Error(`Could not load ${path}: ${response.status}`);
        return response.text();
    }

    marked.use({ mangle: false, headerIds: false });
    await Promise.all([
        fetchText('config.yml').then(text => {
            const config = jsyaml.load(text);
            Object.entries(config).forEach(([key, value]) => {
                const element = document.getElementById(key);
                if (element) element.innerHTML = value;
            });
        }).catch(error => console.error(error)),
        ...sectionNames.map(async name => {
            const container = document.getElementById(`${name}-md`);
            try {
                container.innerHTML = marked.parse(await fetchText(`${name}.md`));
            } catch (error) {
                console.error(error);
                const message = document.createElement('p');
                message.className = 'load-error';
                message.textContent = 'This section could not be loaded. Please refresh the page to try again.';
                container.replaceChildren(message);
            }
        })
    ]);

    const sections = [...document.querySelectorAll('.content-section')];
    function updateActiveSection() {
        const nearBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
        let active = sections.filter(section => section.getBoundingClientRect().top <= 160).pop();
        if (nearBottom) active = sections[sections.length - 1];
        navLinks.forEach(link => {
            const selected = Boolean(active && link.hash === `#${active.id}`);
            link.classList.toggle('active', selected);
            if (selected) link.setAttribute('aria-current', 'location');
            else link.removeAttribute('aria-current');
        });
    }
    let scheduled = false;
    window.addEventListener('scroll', () => {
        if (!scheduled) {
            scheduled = true;
            requestAnimationFrame(() => { updateActiveSection(); scheduled = false; });
        }
    }, { passive: true });
    window.addEventListener('resize', updateActiveSection);
    if (location.hash) document.getElementById(location.hash.slice(1))?.scrollIntoView();
    updateActiveSection();
});
