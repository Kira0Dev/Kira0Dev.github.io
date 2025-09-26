let currentLanguage = 'es';

const sectionNames = {
    es: {
        projects: "Proyectos",
        experience: "Experiencia",
        courses: "Cursos",
        activities: "Actividades"
    },
    en: {
        projects: "Projects",
        experience: "Experience",
        courses: "Courses",
        activities: "Activities"
    }
};

// --- Mostrar/Ocultar detalles de proyectos ---
function initProjectDetails() {
    const verMasButtons = document.querySelectorAll('.ver-mas');
    const verMenosButtons = document.querySelectorAll('.ver-menos');

    verMasButtons.forEach(button => {
        button.addEventListener('click', () => {
            const details = button.nextElementSibling;
            details.style.display = "block";
            button.style.display = "none";
        });
    });

    verMenosButtons.forEach(button => {
        button.addEventListener('click', () => {
            const details = button.parentElement;
            details.style.display = "none";
            details.previousElementSibling.style.display = "inline";
        });
    });
}

// --- Alternar tema claro/oscuro ---
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return; // Evita errores si no existe el botón

    const body = document.body;
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        themeToggle.textContent = 'Tema claro';
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        if (body.classList.contains('dark-mode')) {
            if (currentLanguage == 'es'){
                themeToggle.textContent = 'Tema claro';
            }
            else if(currentLanguage == 'en') {
                themeToggle.textContent = 'Light theme';
            }
            localStorage.setItem('theme', 'dark');
        } else {
            if (currentLanguage == 'es'){
                themeToggle.textContent = 'Tema oscuro';
            }
            else if(currentLanguage == 'en') {
                themeToggle.textContent = 'Dark theme';
            }
            localStorage.setItem('theme', 'light');
        }
    });
}

// --- Resaltar sección activa en el menú ---
function initActiveSectionHighlight() {
    const sections = document.querySelectorAll('div[id]');
    const navLinks = document.querySelectorAll('nav ul li a');

    const setActiveLink = () => {
        let currentSection = null;

        sections.forEach((section) => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                currentSection = section.id;
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove('active');
            if (currentSection && link.getAttribute('href').includes(currentSection)) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', setActiveLink);
    setActiveLink(); // Ejecutar al cargar
}

// --- Animaciones al hacer scroll ---
function initScrollAnimations() {
    const projectItems = document.querySelectorAll('.project-item');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    projectItems.forEach(item => observer.observe(item));
}

// --- Mostrar/Ocultar secciones enteras ---
function initToggleSections() {
    const toggleButtons = document.querySelectorAll('.toggle-section');

    toggleButtons.forEach(button => {
        const sectionType = button.dataset.type;
        const targetId = button.dataset.target;
        const target = document.getElementById(targetId);

        if (!target) return;

        // Texto inicial
        button.textContent = currentLanguage === 'es'
            ? `Ver ${sectionNames.es[sectionType]}`
            : `Show ${sectionNames.en[sectionType]}`;

        button.addEventListener('click', () => {
            if (target.style.display === "block") {
                target.style.display = "none";
                button.textContent = currentLanguage === 'es'
                    ? `Ver ${sectionNames.es[sectionType]}`
                    : `Show ${sectionNames.en[sectionType]}`;
            } else {
                target.style.display = "block";
                button.textContent = currentLanguage === 'es'
                    ? `Esconder ${sectionNames.es[sectionType]}`
                    : `Hide ${sectionNames.en[sectionType]}`;
            }
        });
    });
}

function updateToggleSectionButtons() {
    const toggleButtons = document.querySelectorAll('.toggle-section[data-type]');

    toggleButtons.forEach(button => {
        const sectionType = button.dataset.type;
        const targetId = button.dataset.target;
        const target = document.getElementById(targetId);

        if (!target) return;

        const sectionName = sectionNames[currentLanguage][sectionType];
        const isVisible = target.style.display === "block";

        if (isVisible) {
            button.textContent = currentLanguage === 'es'
                ? `Esconder ${sectionName}`
                : `Hide ${sectionName}`;
        } else {
            button.textContent = currentLanguage === 'es'
                ? `Ver ${sectionName}`
                : `Show ${sectionName}`;
        }
    });
}


// --- Cambio de idioma ---
function setLanguage(lang) {
    currentLanguage = lang;
    document.querySelectorAll("[data-translate]").forEach(element => {
        const key = element.getAttribute("data-translate");
        if (translations[lang] && translations[lang][key]) {
            element.innerHTML = translations[lang][key];
        }
    });
    updateToggleSectionButtons();
}

// --- Inicialización principal ---
document.addEventListener('DOMContentLoaded', () => {
    initProjectDetails();
    initThemeToggle();
    initActiveSectionHighlight();
    initScrollAnimations();
    initToggleSections();
});
