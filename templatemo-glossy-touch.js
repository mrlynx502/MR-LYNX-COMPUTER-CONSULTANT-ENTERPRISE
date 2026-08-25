 let currentPage = 'home';

    // Initialize Supabase client (Make sure to include the Supabase CDN script in your HTML <head>)
    const SUPABASE_URL = 'https://udprrcumvobktdahxudx.supabase.co';
    const SUPABASE_ANON_KEY = 'sb_publishable_DweXabbUVpPo1Q9p8ChjOQ_obR20Hvu';
    const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    function showPage(pageId) {
        // Hide all pages
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });
        
        // Show selected page
        document.getElementById(pageId).classList.add('active');
        
        // Update navigation
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('onclick') === `showPage('${pageId}')`) {
                link.classList.add('active');
            }
        });
        
        currentPage = pageId;
        
        // Move footer to the active page
        const footer = document.getElementById('footer');
        const activePage = document.getElementById('pageId');
        activePage.appendChild(footer);
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Initialize footer position
    window.addEventListener('DOMContentLoaded', () => {
        const footer = document.getElementById('footer');
        const homePage = document.getElementById('home,news,service,contact');
        homePage.appendChild(footer);
    });

    // Add interactive parallax effect to background shapes
    document.addEventListener('mousemove', (e) => {
        const shapes = document.querySelectorAll('.shape');
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.5;
            const xPos = (x - 0.5) * speed * 20;
            const yPos = (y - 0.5) * speed * 20;
            shape.style.transform = `translate(${xPos}px, ${yPos}px)`;
        });
    });

    // Add scroll-based animations
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.bg-shapes');
        const speed = scrolled * 0.5;
        parallax.style.transform = `translateY(${speed}px)`;
    });

    // Add click ripple effect to glass elements
    document.querySelectorAll('.glass').forEach(element => {
        element.addEventListener('click', function(e) {
            const ripple = document.createElement('div');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
                z-index: 1000;
            `;
            
            this.style.position = 'relative';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add ripple animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Form submission handling with Supabase integration
    document.querySelector('form').addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Collect form data from inputs
        const formData = {
            name: document.getElementById("name") ? document.getElementById("name").value : '',
            phone: document.getElementById("phone") ? document.getElementById("phone").value : '',
            email: document.getElementById("email") ? document.getElementById("email").value : '',
            subject: document.getElementById("subject") ? document.getElementById("subject").value : '',
            message: document.getElementById("message") ? document.getElementById("message").value : '',
            created_at: new Date()
        };

        // Insert data into Supabase table (ensure a table named 'contacts' exists)
        const { data, error } = await supabase
            .from('contacts')
            .insert([formData]);

        if (error) {
            console.error("Error saving to Supabase:", error);
            alert("Error saving message: " + error.message);
            return;
        }

        // Create success message
        const successMsg = document.createElement('div');
        successMsg.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(46, 204, 113, 0.9);
            color: white;
            padding: 20px 10px;
            border-radius: 10px;
            backdrop-filter: blur(20px);
            z-index: 10000;
            animation: fadeIn 0.3s ease;
        `;
        successMsg.textContent = 'Message sent and saved to database successfully!';
        
        document.body.appendChild(successMsg);
        
        // Remove message after 3 seconds
        setTimeout(() => {
            successMsg.remove();
        }, 3000);
        
        // Reset form
        this.reset();
    });

    // Add fade in animation
    const fadeStyle = document.createElement('style');
    fadeStyle.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
            to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }
    `;
    document.head.appendChild(fadeStyle);
