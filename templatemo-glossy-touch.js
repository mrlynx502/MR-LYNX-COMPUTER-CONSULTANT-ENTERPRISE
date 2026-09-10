// Track current page state
let currentPage = 'home';

// Function to switch between pages when navigation links are clicked
function showPage(pageId) {
    // Hide all page containers
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });

    // Show the target page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
        currentPage = pageId;
    }

    // Update active class on navigation links
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('onclick') && link.getAttribute('onclickincludes') || (link.getAttribute('onclick') && link.getAttribute('onclick').includes(pageId))) {
            link.classList.add('active');
        }
    });

    // Smooth scroll back to top of the page
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Ensure the first page loads properly on window load
document.addEventListener('DOMContentLoaded', () => {
    showPage('home');
});

// Form submission handling
const contactForm = document.querySelector('form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Create success message
        const successMsg = document.createElement('div');
        successMsg.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(46, 204, 113, 0.9);
            color: white;
            padding: 20px 20px;
            border-radius: 10px;
            backdrop-filter: blur(20px);
            z-index: 10000;
            animation: fadeIn 0.3s ease;
            font-family: inherit;
            font-size: 16px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        `;
        successMsg.textContent = 'Message sent successfully! We\'ll get back to you soon.';
        
        document.body.appendChild(successMsg);
        
        // Remove message after 3 seconds
        setTimeout(() => {
            successMsg.remove();
        }, 3000);
        
        // Reset form
        this.reset();
    });
}

// Add fade in animation style dynamically
const fadeStyle = document.createElement('style');
fadeStyle.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
        to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
    }
    .page {
        display: none;
    }
    .page.active {
        display: block;
    }
`;
document.head.appendChild(fadeStyle);
