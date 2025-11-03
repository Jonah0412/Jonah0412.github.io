// Apply dark theme only - no theme toggle functionality
(function() {
    // Always use dark theme
    document.documentElement.classList.remove('light-theme');
    document.body.classList.remove('light-theme');
    
    // Remove any light theme classes from all elements
    const elements = document.querySelectorAll('.light-theme');
    elements.forEach(el => el.classList.remove('light-theme'));
    
    // Save dark theme preference
    localStorage.setItem('theme', 'dark');
})();

document.addEventListener('DOMContentLoaded', function() {
    // Loading screen implementation
    const loadingScreen = document.getElementById('loading-screen');
    const progressBar = document.getElementById('progress-bar');
    
    if (loadingScreen && progressBar) {
        document.body.style.overflow = 'hidden'; // Prevent scrolling during loading
        
        let width = 0;
        const interval = setInterval(function() {
            if (width >= 100) {
                clearInterval(interval);
                
                setTimeout(function() {
                    loadingScreen.style.opacity = '0';
                    setTimeout(() => {
                        loadingScreen.style.display = 'none';
                        document.body.style.overflow = 'auto'; // Re-enable scrolling
                    }, 500);
                }, 500);
            } else {
                width += 1;
                progressBar.style.width = width + '%';
            }
        }, 20); // This will make loading take about 2 seconds (100 * 20ms)
        
        // Ensure loading completes even if assets take longer
        window.addEventListener('load', function() {
            if (width < 100) {
                // Fast-forward to 100%
                width = 100;
                progressBar.style.width = '100%';
                
                setTimeout(function() {
                    loadingScreen.style.opacity = '0';
                    setTimeout(() => {
                        loadingScreen.style.display = 'none';
                        document.body.style.overflow = 'auto';
                    }, 500);
                }, 500);
            }
        });
    }
    
    // Initialize site functionality
    initSiteFunctionality();
    initDuckLogo();
    initParallax();
    initFeaturedCarousel();
    initTestimonialCarousel();
    initDuckInteractions();
    initThemeToggle(); // Initialize theme toggle
    initBackToTop(); // Initialize back to top functionality
    
    // Initialize page-specific animations
    initAboutPageAnimations();
    
    // Initialize portfolio videos
    initPortfolioVideos();
    
    // Initialize the footer particles
    initFooterParticles();
    
    // Initialize gallery page functionality
    initGalleryPage();
    
    // Set up PDF links on all pages
    setupPortfolioPdfLinks();
    
    // Initialize contact page functionality
    initContactPage();
});

// Add back to top functionality
function initBackToTop() {
    // First, create and add the back to top button if it doesn't exist
    if (!document.getElementById('back-to-top-btn')) {
        const backToTopBtn = document.createElement('button');
        backToTopBtn.id = 'back-to-top-btn';
        backToTopBtn.classList.add('back-to-top-btn');
        backToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
        document.body.appendChild(backToTopBtn);
        
        // Add styles for the button
        const style = document.createElement('style');
        style.textContent = `
            .back-to-top-btn {
                position: fixed;
                bottom: 30px;
                right: 30px;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
                color: white;
                border: none;
                cursor: pointer;
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 999;
                opacity: 0;
                visibility: hidden;
                transform: translateY(20px);
                transition: opacity 0.3s, visibility 0.3s, transform 0.3s;
                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
            }
            
            .back-to-top-btn.visible {
                opacity: 1;
                visibility: visible;
                transform: translateY(0);
            }
            
            .back-to-top-btn:hover {
                transform: translateY(-5px);
                box-shadow: 0 6px 15px rgba(var(--primary-color-rgb), 0.4);
            }
            
            .back-to-top-btn i {
                font-size: 1.5rem;
            }
            
            @keyframes pulse {
                0% { box-shadow: 0 0 0 0 rgba(var(--primary-color-rgb), 0.7); }
                70% { box-shadow: 0 0 0 10px rgba(var(--primary-color-rgb), 0); }
                100% { box-shadow: 0 0 0 0 rgba(var(--primary-color-rgb), 0); }
            }
            
            .back-to-top-btn.pulse {
                animation: pulse 1.5s infinite;
            }
        `;
        document.head.appendChild(style);
    }
    
    const backToTopBtn = document.getElementById('back-to-top-btn');
    
    // Show button when scrolling down
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
            
            // Add pulse animation after button is visible for a moment
            setTimeout(() => {
                backToTopBtn.classList.add('pulse');
            }, 1000);
        } else {
            backToTopBtn.classList.remove('visible', 'pulse');
        }
    });
    
    // Scroll to top when clicked
    backToTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Create a smooth scrolling effect
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // Add loading effect when clicking back to top
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen && window.pageYOffset > window.innerHeight) {
            // Only show loading when we're far down the page
            loadingScreen.style.display = 'flex';
            loadingScreen.style.opacity = '1';
            
            const progressBar = document.getElementById('progress-bar');
            if (progressBar) {
                progressBar.style.width = '0';
                
                let width = 0;
                const interval = setInterval(function() {
                    if (width >= 100) {
                        clearInterval(interval);
                        setTimeout(function() {
                            loadingScreen.style.opacity = '0';
                            setTimeout(() => {
                                loadingScreen.style.display = 'none';
                            }, 500);
                        }, 300);
                    } else {
                        width += 2; // Faster loading when going back to top
                        progressBar.style.width = width + '%';
                    }
                }, 10);
            }
        }
    });
}

// Theme toggle functionality - disabled (always dark mode)
function initThemeToggle() {
    // Function disabled - site will remain in dark mode
    return;
}

function initHomePageAnimations() {
    if (!document.querySelector('.hero')) return;
    
    initHeroCanvas();
    
    initMagneticButton();
    
    initFeaturedItems();
    
    initParallaxEffects();
    
    checkMobileAndAdjust();
}

function checkMobileAndAdjust() {
    const isMobile = window.innerWidth < 768;
    
    if (isMobile) {
        const cube = document.querySelector('.cube');
        if (cube) {
            cube.style.animation = 'none';
        }
        
        adjustParticleCount();
    }
    
    window.addEventListener('resize', function() {
        if (window.innerWidth < 768 && !isMobile) {
            const cube = document.querySelector('.cube');
            if (cube) {
                cube.style.animation = 'none';
            }
            adjustParticleCount();
        } else if (window.innerWidth >= 768 && isMobile) {
            const cube = document.querySelector('.cube');
            if (cube) {
                cube.style.animation = 'rotateCube 20s infinite linear';
            }
        }
    });
}

function initHeroCanvas() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    
    const particlesArray = [];
    const maxParticles = 100;
    const colors = ['#7000ff', '#a100cb', '#e100ff', '#00eeff'];
    
    for (let i = 0; i < maxParticles; i++) {
        particlesArray.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 3 + 1,
            color: colors[Math.floor(Math.random() * colors.length)],
            velocity: {
                x: (Math.random() - 0.5) * 1,
                y: (Math.random() - 0.5) * 1
            },
            opacity: Math.random() * 0.5 + 0.2
        });
    }
    
    window.addEventListener('resize', function() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });
    
    function animate() {
        ctx.clearRect(0, 0, width, height);
        
        for (let i = 0; i < particlesArray.length; i++) {
            const p = particlesArray[i];
            
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.opacity;
            ctx.fill();
            
            p.x += p.velocity.x;
            p.y += p.velocity.y;
            
            if (p.x < 0 || p.x > width) p.velocity.x *= -1;
            if (p.y < 0 || p.y > height) p.velocity.y *= -1;
            
            connectParticles(p, i);
        }
        
        requestAnimationFrame(animate);
    }
    
    function connectParticles(p, index) {
        for (let j = index + 1; j < particlesArray.length; j++) {
            const p2 = particlesArray[j];
            const distance = Math.sqrt(
                Math.pow(p.x - p2.x, 2) + 
                Math.pow(p.y - p2.y, 2)
            );
            
            if (distance < 150) {
                ctx.beginPath();
                ctx.strokeStyle = p.color;
                ctx.globalAlpha = 0.1 * (1 - (distance / 150));
                ctx.lineWidth = 0.5;
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
            }
        }
    }
    
    animate();
}

function initMagneticButton() {
    const magneticBtn = document.querySelector('.magnetic-btn');
    if (!magneticBtn) return;
    
    const btnText = magneticBtn.querySelector('.btn-text');
    const particles = magneticBtn.querySelectorAll('.btn-particle');
    
    magneticBtn.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const distX = (x - centerX) * 0.1;
        const distY = (y - centerY) * 0.1;
        
        btnText.style.transform = `translate(${distX}px, ${distY}px)`;
        
        particles.forEach((particle, index) => {
            const factor = index * 0.4 + 1;
            particle.style.transform = `translate(${distX * factor}px, ${distY * factor}px)`;
            particle.style.opacity = '0.5';
        });
    });
    
    magneticBtn.addEventListener('mouseleave', function() {
        btnText.style.transform = 'translate(0, 0)';
        
        particles.forEach(particle => {
            particle.style.transform = 'translate(0, 0)';
            particle.style.opacity = '0';
        });
    });
    
    magneticBtn.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        this.appendChild(ripple);
        
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
}

function initFeaturedItems() {
    const items = document.querySelectorAll('.featured-item');
    if (!items.length) return;
    
    // Image animation enhancement
    items.forEach(item => {
        const imgElement = item.querySelector('.featured-img');
        const imgBackground = item.querySelector('.featured-background');
        
        if (imgElement && imgBackground) {
            // Set a slightly different animation duration for each image
            // This creates a more organic feel as they don't all move in sync
            const randomDuration = 7 + Math.random() * 4; // Between 7-11 seconds
            imgBackground.style.animationDuration = `${randomDuration}s`;
            
            // When mouse enters, pause the animation
            imgElement.addEventListener('mouseenter', () => {
                imgBackground.style.animationPlayState = 'paused';
            });
            
            // When mouse leaves, resume the animation
            imgElement.addEventListener('mouseleave', () => {
                imgBackground.style.animationPlayState = 'running';
            });
        }
    });
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                const color = entry.target.getAttribute('data-color');
                if (color) {
                    const img = entry.target.querySelector('.featured-img');
                    if (img) {
                        img.style.boxShadow = `0 10px 30px ${color}33`;
                    }
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    items.forEach(item => {
        observer.observe(item);
        
        // Add click handlers for project viewing
        const hoverContent = item.querySelector('.featured-hover-content');
        if (hoverContent) {
            // Find the anchor tag for the PDF link
            const pdfLink = hoverContent.querySelector('a');
            if (pdfLink) {
                pdfLink.addEventListener('click', (event) => {
                    // Get the PDF path from the href attribute
                    const pdfPath = pdfLink.getAttribute('href');
                    if (pdfPath && pdfPath.endsWith('.pdf')) {
                        // Prevent default link behavior
                        event.preventDefault();
                        // Use our modal to show the PDF
                        openPdf(pdfPath);
                    }
                });
            }
            
            // Also handle clicks on the entire hover content area
            hoverContent.addEventListener('click', (event) => {
                // Only trigger if the click wasn't on the link directly (already handled above)
                if (event.target !== pdfLink && event.target.tagName !== 'A') {
                    // Find the anchor tag with the PDF link
                    const pdfLink = hoverContent.querySelector('a');
                    if (pdfLink) {
                        const pdfPath = pdfLink.getAttribute('href');
                        if (pdfPath && pdfPath.endsWith('.pdf')) {
                            // Prevent default behavior
                            event.preventDefault();
                            // Show PDF in modal
                            openPdf(pdfPath);
                        }
                    }
                }
            });
        }
    });
}

function initParallaxEffects() {
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.text-animation-container');
    const dynamicText = document.querySelector('.dynamic-text');
    const btnWrapper = document.querySelector('.button-wrapper');
    const particles = document.querySelectorAll('.particle');
    
    if (!hero) return;
    
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const opacity = 1 - (scrollPosition * 0.002);
        
        if (heroContent) {
            heroContent.style.transform = `translateY(${scrollPosition * 0.1}px)`;
            heroContent.style.opacity = opacity > 0 ? opacity : 0;
        }
        
        if (dynamicText) {
            dynamicText.style.transform = `translateY(${scrollPosition * 0.05}px)`;
            dynamicText.style.opacity = opacity > 0 ? opacity : 0;
        }
        
        if (btnWrapper) {
            btnWrapper.style.transform = `translateY(${scrollPosition * 0.08}px)`;
            btnWrapper.style.opacity = opacity > 0 ? opacity : 0;
        }
    });
    
    if (window.innerWidth > 768) {
        document.addEventListener('mousemove', function(e) {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            particles.forEach((particle, index) => {
                const factor = index % 3 + 1;
                const x = (mouseX - 0.5) * factor * 20;
                const y = (mouseY - 0.5) * factor * 20;
                particle.style.transform = `translate(${x}px, ${y}px)`;
            });
        });
    }
}

function adjustParticleCount() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas || !canvas.getContext) return;
}

function initSiteFunctionality() {
    initDuckLogo();
    
    // Mobile navigation menu
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle && nav) {
        // Check if we've already added the nav close button
        if (!document.querySelector('.nav-close-btn')) {
            // Create close button for mobile navigation
            const closeBtn = document.createElement('div');
            closeBtn.className = 'nav-close-btn';
            closeBtn.innerHTML = '<i class="fas fa-times"></i>';
            nav.appendChild(closeBtn);
            
            // Add click listener to close button
            closeBtn.addEventListener('click', () => {
                nav.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        }
        
        // Toggle navigation menu on menu icon click
        menuToggle.addEventListener('click', () => {
            nav.classList.add('active');
            document.body.classList.add('menu-open');
        });
        
        // Close menu when clicking on nav links
        const navLinks = document.querySelectorAll('nav ul li a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                // Only close the menu on mobile view
                if (window.innerWidth <= 768) {
                    nav.classList.remove('active');
                    document.body.classList.remove('menu-open');
                }
            });
        });
        
        // Close menu when clicking outside of it
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 768 && 
                !e.target.closest('nav') && 
                !e.target.closest('.menu-toggle') && 
                nav.classList.contains('active')) {
                nav.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    }
    
    // Scroll header effect
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scroll-header');
            } else {
                header.classList.remove('scroll-header');
            }
        });
    }
    
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(btn => btn.classList.remove('active'));
                
                btn.classList.add('active');
                
                const filterValue = btn.getAttribute('data-filter');
                
                portfolioItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 100);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
    
    const galleryItems = document.querySelectorAll('.gallery-zoom');
    const modal = document.querySelector('.gallery-modal');
    const modalImg = document.getElementById('modal-image');
    const modalCaption = document.querySelector('.modal-caption');
    const closeModal = document.querySelector('.close-modal');
    
    if (galleryItems.length > 0) {
        galleryItems.forEach(item => {
            item.addEventListener('click', (e) => {
                const galleryItem = e.target.closest('.gallery-item');
                const imgElement = galleryItem.querySelector('.gallery-image');
                const captionElement = galleryItem.querySelector('.gallery-caption');
                
                const computedStyle = window.getComputedStyle(imgElement);
                modalImg.style.backgroundImage = computedStyle.backgroundImage;
                modalImg.style.height = '400px';
                modalImg.style.backgroundSize = 'cover';
                modalImg.style.backgroundPosition = 'center';
                
                modalCaption.textContent = captionElement.querySelector('h3').textContent;
                modal.style.display = 'block';
            });
        });
        
        if (closeModal) {
            closeModal.addEventListener('click', () => {
                modal.style.display = 'none';
            });
        }
        
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
    
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const subjectInput = document.getElementById('subject');
            const messageInput = document.getElementById('message');
            
            if (validateForm(nameInput, emailInput, subjectInput, messageInput)) {
                alert('Your message has been sent successfully!');
                contactForm.reset();
            }
        });
    }
    
    function validateForm(name, email, subject, message) {
        let isValid = true;
        
        [name, email, subject, message].forEach(field => {
            field.classList.remove('error');
        });
        
        if (name.value.trim() === '') {
            name.classList.add('error');
            isValid = false;
        }
        
        if (email.value.trim() === '') {
            email.classList.add('error');
            isValid = false;
        } else if (!isValidEmail(email.value)) {
            email.classList.add('error');
            isValid = false;
        }
        
        if (subject.value.trim() === '') {
            subject.classList.add('error');
            isValid = false;
        }
        
        if (message.value.trim() === '') {
            message.classList.add('error');
            isValid = false;
        }
        
        return isValid;
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}

function initDuckLogo() {
    // Logo is now a static SVG image - no animation needed
    const logoImg = document.getElementById('logo-img');
    if (logoImg) {
        // Optional: Add click interaction if desired
        logoImg.style.cursor = 'pointer';
        logoImg.addEventListener('click', () => {
            // Add any interaction you want here
        });
    }
    return;
    
    // Old canvas code below (disabled)
    const canvas = document.getElementById('logo-canvas');
    
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = 60;
    canvas.height = 60;
    
    let frame = 0;
    let frameCount = 0;
    let talkingState = 0;
    let blinkCounter = 0;
    let eyeOpen = true;
    let isAnimating = false;
    let clickAnimationFrame = 0;
    let showLogoText = false;
    let logoTextOpacity = 0;
    
    const createGradient = () => {
        const gradient = ctx.createLinearGradient(10, 10, 50, 50);
        gradient.addColorStop(0, '#7000ff');
        gradient.addColorStop(0.5, '#a100cb');
        gradient.addColorStop(1, '#e100ff');
        return gradient;
    };
    
    const beakColor = '#FF6D00';
    const eyeColor = '#212121';
    const chatBubbleColor = 'rgba(255, 255, 255, 0.8)';
    
    canvas.addEventListener('click', () => {
        if (!isAnimating) {
            isAnimating = true;
            clickAnimationFrame = 0;
            
            showLogoText = true;
            logoTextOpacity = 0;
            
            let logoPopup = document.getElementById('duck-logo-popup');
            if (!logoPopup) {
                logoPopup = document.createElement('div');
                logoPopup.id = 'duck-logo-popup';
                logoPopup.innerHTML = '<span>GD - GOSSIP DUCK</span>';
                document.querySelector('.logo-container').appendChild(logoPopup);
            }
            
            logoPopup.style.display = 'block';
            setTimeout(() => {
                logoPopup.classList.add('show');
            }, 50);
            
            setTimeout(() => {
                logoPopup.classList.remove('show');
                setTimeout(() => {
                    logoPopup.style.display = 'none';
                    showLogoText = false;
                }, 300);
            }, 1000);
        }
    });
    
    function drawDuck() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        frame++;
        frameCount++;
        blinkCounter++;
        
        if (isAnimating) {
            clickAnimationFrame++;
            
            if (clickAnimationFrame >= 60) {
                isAnimating = false;
                clickAnimationFrame = 0;
            }
        }
        
        if (blinkCounter > 90) {
            eyeOpen = !eyeOpen;
            if (!eyeOpen) {
                blinkCounter = 0;
            } else {
                blinkCounter = 80;
            }
        }
        
        if (frameCount >= 15) {
            talkingState = (talkingState + 1) % 3;
            frameCount = 0;
        }
        
        let offsetX = 0;
        let offsetY = 0;
        let rotation = 0;
        
        if (isAnimating) {
            if (clickAnimationFrame < 30) {
                offsetX = Math.sin(clickAnimationFrame * 0.2) * 3;
                offsetY = -Math.sin(clickAnimationFrame * 0.3) * 2;
                rotation = Math.sin(clickAnimationFrame * 0.2) * 0.1;
            } else {
                offsetX = Math.sin((60 - clickAnimationFrame) * 0.2) * 3;
                offsetY = -Math.sin((60 - clickAnimationFrame) * 0.3) * 2;
                rotation = Math.sin((60 - clickAnimationFrame) * 0.2) * 0.1;
            }
        }
        
        ctx.save();
        ctx.translate(30 + offsetX, 30 + offsetY);
        ctx.rotate(rotation);
        ctx.translate(-(30 + offsetX), -(30 + offsetY));
        
        const duckGradient = createGradient();
        
        ctx.beginPath();
        ctx.arc(30 + offsetX, 35 + offsetY, 22, 0, Math.PI * 2);
        ctx.fillStyle = duckGradient;
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(30 + offsetX, 25 + offsetY, 15, 0, Math.PI * 2);
        ctx.fillStyle = duckGradient;
        ctx.fill();
        
        if (eyeOpen) {
            ctx.beginPath();
            ctx.arc(35 + offsetX, 20 + offsetY, 3, 0, Math.PI * 2);
            ctx.fillStyle = eyeColor;
            ctx.fill();
            
            ctx.beginPath();
            ctx.arc(36 + offsetX, 19 + offsetY, 1, 0, Math.PI * 2);
            ctx.fillStyle = 'white';
            ctx.fill();
        } else {
            ctx.beginPath();
            ctx.moveTo(33 + offsetX, 20 + offsetY);
            ctx.lineTo(37 + offsetX, 20 + offsetY);
            ctx.lineWidth = 1;
            ctx.strokeStyle = eyeColor;
            ctx.stroke();
        }
        
        ctx.beginPath();
        ctx.moveTo(40 + offsetX, 25 + offsetY);
        
        if (talkingState === 0) {
            ctx.lineTo(50 + offsetX, 25 + offsetY);
            ctx.lineTo(45 + offsetX, 30 + offsetY);
        } else if (talkingState === 1) {
            ctx.lineTo(50 + offsetX, 23 + offsetY);
            ctx.lineTo(45 + offsetX, 27 + offsetY);
            ctx.lineTo(50 + offsetX, 28 + offsetY);
        } else {
            ctx.lineTo(50 + offsetX, 21 + offsetY);
            ctx.lineTo(45 + offsetX, 25 + offsetY);
            ctx.lineTo(50 + offsetX, 30 + offsetY);
        }
        
        ctx.closePath();
        ctx.fillStyle = beakColor;
        ctx.fill();
        
        ctx.restore();
        
        requestAnimationFrame(drawDuck);
    }
    
    drawDuck();
}

function initAboutPageAnimations() {
    if (!document.querySelector('.about-section')) return;
    
    initSkillBars();
    
    initScrollRevealAnimations();
    
    const tableRows = document.querySelectorAll('.info-table-row');
    tableRows.forEach((row, index) => {
        row.style.opacity = '0';
        row.style.transform = 'translateX(-20px)';
        
        setTimeout(() => {
            row.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            row.style.opacity = '1';
            row.style.transform = 'translateX(0)';
        }, 300 + (index * 150));
    });
}

function initSkillBars() {
    console.log("Initializing skill bars");
    const skillCards = document.querySelectorAll('.skill-card');
    
    skillCards.forEach(card => {
        const progressBar = card.querySelector('.skill-progress');
        const skillLevel = card.getAttribute('data-skill');
        
        if (!progressBar || !skillLevel) {
            console.error("Missing progress bar or skill level", card);
            return;
        }
        
        console.log(`Setting progress bar for skill: ${skillLevel}%`);
        
        progressBar.style.width = '0%';
        
        setTimeout(() => {
            progressBar.style.width = skillLevel + '%';
            console.log("Progress bar width set to:", progressBar.style.width);
        }, 500);
    });
}

function initScrollRevealAnimations() {
    const sections = [
        '.profile-section',
        '.education-section',
        '.work-experience-section',
        '.application-skills-section'
    ];
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
                
                if (entry.target.classList.contains('education-section')) {
                    animateEducationCards();
                }
                
                if (entry.target.classList.contains('work-experience-section')) {
                    animateTimelineItems();
                }
                
                if (entry.target.classList.contains('application-skills-section')) {
                    animateSkillCards();
                }
                
                sectionObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    sections.forEach(sectionSelector => {
        const section = document.querySelector(sectionSelector);
        if (section) {
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            
            sectionObserver.observe(section);
        }
    });
}

function animateEducationCards() {
    const cards = document.querySelectorAll('.education-card');
    
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(40px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 200 + (index * 150));
    });
}

function animateTimelineItems() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = item.classList.contains('odd') ? 
            'translateX(-40px)' : 'translateX(40px)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, 200 + (index * 200));
    });
}

function animateSkillCards() {
    const skillCards = document.querySelectorAll('.skill-card');
    
    skillCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.9) translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            card.style.opacity = '1';
            card.style.transform = 'scale(1) translateY(0)';
        }, 150 + (index * 100));
    });
}

function isOdd(el) {
    const all = document.querySelectorAll(el.tagName);
    return Array.from(all).indexOf(el) % 2 !== 0;
}

document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        .section-visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
});

function initParallax() {
    const parallaxLayers = document.querySelectorAll('.parallax-layer');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        parallaxLayers.forEach(layer => {
            const speed = layer.getAttribute('data-speed');
            const yPos = -(scrollY * speed);
            layer.style.transform = `translateY(${yPos}px)`;
        });
    });
    
    const hero = document.querySelector('.hero');
    
    hero.addEventListener('mousemove', e => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        parallaxLayers.forEach(layer => {
            const speed = layer.getAttribute('data-speed') * 20;
            const xPos = (mouseX - 0.5) * speed;
            const yPos = (mouseY - 0.5) * speed;
            
            layer.style.transform = `translate(${xPos}px, ${yPos}px)`;
        });
    });
    
    hero.addEventListener('mouseleave', () => {
        parallaxLayers.forEach(layer => {
            layer.style.transform = 'translate(0, 0)';
        });
    });
}

function initFeaturedCarousel() {
    const track = document.querySelector('.carousel-track');
    const items = document.querySelectorAll('.featured-item');
    const prevBtn = document.querySelector('.carousel-controls .prev-btn');
    const nextBtn = document.querySelector('.carousel-controls .next-btn');
    const dots = document.querySelectorAll('.carousel-dots .dot');
    
    if (!track || items.length === 0) return;
    
    // Set up the carousel for horizontal scrolling
    track.style.display = 'flex';
    track.style.overflowX = 'hidden';
    track.style.scrollBehavior = 'smooth';
    track.style.webkitOverflowScrolling = 'touch'; // For smoother scrolling on iOS
    
    // Calculate the width of a single item
    const itemWidth = items[0].offsetWidth + parseInt(getComputedStyle(items[0]).marginLeft) * 2;
    
    // Update dots for the initial state
    updateDots(0);
    
    // Handle previous button click
    prevBtn.addEventListener('click', () => {
        const scrollLeft = track.scrollLeft;
        const targetPosition = Math.max(0, scrollLeft - itemWidth);
        track.scrollLeft = targetPosition;
        
        // Update dots based on scroll position
        setTimeout(() => {
            const currentIndex = Math.round(track.scrollLeft / itemWidth);
            updateDots(currentIndex);
        }, 300);
    });
    
    // Handle next button click
    nextBtn.addEventListener('click', () => {
        const scrollLeft = track.scrollLeft;
        const maxScroll = track.scrollWidth - track.clientWidth;
        const targetPosition = Math.min(maxScroll, scrollLeft + itemWidth);
        track.scrollLeft = targetPosition;
        
        // Update dots based on scroll position
        setTimeout(() => {
            const currentIndex = Math.round(track.scrollLeft / itemWidth);
            updateDots(currentIndex);
        }, 300);
    });
    
    // Handle dot clicks
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            const targetPosition = index * itemWidth;
            track.scrollLeft = targetPosition;
            updateDots(index);
        });
    });
    
    // Listen for scroll events to update the dots
    track.addEventListener('scroll', () => {
        const currentIndex = Math.round(track.scrollLeft / itemWidth);
        updateDots(currentIndex);
    });
    
    // Update active dot
    function updateDots(activeIndex) {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === activeIndex);
        });
    }
    
    // Update on window resize
    window.addEventListener('resize', () => {
        const newItemWidth = items[0].offsetWidth + parseInt(getComputedStyle(items[0]).marginLeft) * 2;
        const currentIndex = Math.round(track.scrollLeft / itemWidth);
        track.scrollLeft = currentIndex * newItemWidth;
    });
}

function initTestimonialCarousel() {
    const track = document.querySelector('.testimonial-track');
    const cards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.testimonial-controls .prev-btn');
    const nextBtn = document.querySelector('.testimonial-controls .next-btn');
    const dots = document.querySelectorAll('.testimonial-dots .dot');
    
    if (!track || cards.length === 0) return;
    
    let currentIndex = 0;
    const cardWidth = cards[0].offsetWidth + parseInt(getComputedStyle(cards[0]).marginLeft) * 2;
    const visibleCards = Math.floor(track.offsetWidth / cardWidth);
    const maxIndex = Math.max(0, cards.length - visibleCards);
    
    updateTestimonials();
    
    prevBtn.addEventListener('click', () => {
        currentIndex = Math.max(0, currentIndex - 1);
        updateTestimonials();
    });
    
    nextBtn.addEventListener('click', () => {
        currentIndex = Math.min(maxIndex, currentIndex + 1);
        updateTestimonials();
    });
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = Math.min(maxIndex, index);
            updateTestimonials();
        });
    });
    
    let interval = setInterval(() => {
        currentIndex = (currentIndex >= maxIndex) ? 0 : currentIndex + 1;
        updateTestimonials();
    }, 7000);
    
    track.addEventListener('mouseenter', () => clearInterval(interval));
    track.addEventListener('mouseleave', () => {
        interval = setInterval(() => {
            currentIndex = (currentIndex >= maxIndex) ? 0 : currentIndex + 1;
            updateTestimonials();
        }, 7000);
    });
    
    function updateTestimonials() {
        const position = -currentIndex * cardWidth;
        track.style.transform = `translateX(${position}px)`;
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    window.addEventListener('resize', () => {
        const newCardWidth = cards[0].offsetWidth + parseInt(getComputedStyle(cards[0]).marginLeft) * 2;
        const newVisibleCards = Math.floor(track.offsetWidth / newCardWidth);
        const newMaxIndex = Math.max(0, cards.length - newVisibleCards);
        
        currentIndex = Math.min(currentIndex, newMaxIndex);
        updateTestimonials();
    });
}

function initDuckInteractions() {
    const duckAvatar = document.querySelector('.duck-avatar');
    const duckSpeech = document.querySelector('.duck-speech');
    
    if (!duckAvatar) return;
    
    const duckQuotes = [
        "Hello there! I'm THE GOSSIP DUCK, your creative digital companion!",
        "Quack! Looking for some creative inspiration?",
        "Let's make something amazing together!",
        "Great design is about making complex things simple.",
        "Innovation is the key to standing out in the digital world!",
        "Need help with your next project? I'm your duck!"
    ];
    
    let currentQuoteIndex = 0;
    
    duckAvatar.addEventListener('click', () => {
        currentQuoteIndex = (currentQuoteIndex + 1) % duckQuotes.length;
        
        duckSpeech.style.opacity = '0';
        duckSpeech.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            duckSpeech.querySelector('p').textContent = duckQuotes[currentQuoteIndex];
            duckSpeech.style.opacity = '1';
            duckSpeech.style.transform = 'translateY(0)';
        }, 300);
        
        duckAvatar.style.transform = 'scale(1.2) rotate(-10deg)';
        setTimeout(() => {
            duckAvatar.style.transform = '';
        }, 300);
    });
    
    setInterval(() => {
        if (Math.random() > 0.6) {
            currentQuoteIndex = (currentQuoteIndex + 1) % duckQuotes.length;
            
            duckSpeech.style.opacity = '0';
            duckSpeech.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                duckSpeech.querySelector('p').textContent = duckQuotes[currentQuoteIndex];
                duckSpeech.style.opacity = '1';
                duckSpeech.style.transform = 'translateY(0)';
            }, 300);
        }
    }, 10000);
}

document.addEventListener('DOMContentLoaded', function() {
    const elements = document.querySelectorAll('.featured-item, .testimonial-card, .about-preview-content');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, {
        threshold: 0.1
    });
    
    elements.forEach(element => {
        observer.observe(element);
    });
});

// First, create a helper function to access
function hideNavigationElements() {
    try {
        // Target all possible navigation elements
        const header = document.querySelector('header');
        const nav = document.querySelector('nav');
        const logoContainer = document.querySelector('.logo-container');
        const menuToggle = document.querySelector('.menu-toggle');
        
        // Hide header
        if (header) {
            header.style.visibility = 'hidden';
            header.style.opacity = '0';
            header.style.zIndex = '-10';
        }
        
        // Hide nav
        if (nav) {
            nav.style.visibility = 'hidden';
            nav.style.opacity = '0';
            nav.style.zIndex = '-10';
        }
        
        // Hide logo container
        if (logoContainer) {
            logoContainer.style.visibility = 'hidden';
            logoContainer.style.opacity = '0';
            logoContainer.style.zIndex = '-10';
        }
        
        // Hide menu toggle
        if (menuToggle) {
            menuToggle.style.visibility = 'hidden';
            menuToggle.style.opacity = '0';
            menuToggle.style.zIndex = '-10';
        }
    } catch(err) {
        console.error("Error hiding navigation elements:", err);
    }
}

function showNavigationElements() {
    try {
        // Target all possible navigation elements
        const header = document.querySelector('header');
        const nav = document.querySelector('nav');
        const logoContainer = document.querySelector('.logo-container');
        const menuToggle = document.querySelector('.menu-toggle');
        
        // Show header
        if (header) {
            header.style.visibility = 'visible';
            header.style.opacity = '1';
            header.style.zIndex = '1000';
        }
        
        // Show nav
        if (nav) {
            nav.style.visibility = 'visible';
            nav.style.opacity = '1';
            nav.style.zIndex = '1000';
        }
        
        // Show logo container
        if (logoContainer) {
            logoContainer.style.visibility = 'visible';
            logoContainer.style.opacity = '1';
            logoContainer.style.zIndex = '1001';
        }
        
        // Show menu toggle
        if (menuToggle) {
            menuToggle.style.visibility = 'visible';
            menuToggle.style.opacity = '1';
            menuToggle.style.zIndex = '1001';
        }
    } catch(err) {
        console.error("Error showing navigation elements:", err);
    }
}

function openPdf(pdfPath) {
    try {
        console.log("Opening PDF:", pdfPath);
        
        // Resolve PDF path properly
        let resolvedPath = pdfPath;
        
        // If path is not absolute (doesn't start with http or /)
        if (!pdfPath.startsWith('http') && !pdfPath.startsWith('/')) {
            // For relative paths starting with ../
            if (pdfPath.startsWith('../')) {
                // Get the origin only
                const origin = window.location.origin;
                // Remove the ../ and join with origin
                resolvedPath = origin + '/' + pdfPath.substring(3);
            } else {
                // For other relative paths, use the base URL
                const baseUrl = window.location.origin + window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/') + 1);
                resolvedPath = baseUrl + pdfPath;
            }
            console.log("Resolved path:", resolvedPath);
        }
        
        // Hide header elements
        hideHeaderElements();
        
        // Check if modal exists, if not create it
        let pdfModal = document.getElementById('pdf-modal');
        let pdfIframe = document.getElementById('pdf-iframe');
        let closeBtn;
        
        if (!pdfModal) {
            // Create the simple modal structure
            pdfModal = document.createElement('div');
            pdfModal.id = 'pdf-modal';
            pdfModal.className = 'pdf-modal';
            
            // Create iframe container
            const modalContent = document.createElement('div');
            modalContent.className = 'pdf-modal-content';
            
            // Create iframe
            pdfIframe = document.createElement('iframe');
            pdfIframe.id = 'pdf-iframe';
            pdfIframe.className = 'pdf-iframe';
            pdfIframe.title = "PDF Viewer";
            
            // Create close button
            closeBtn = document.createElement('button');
            closeBtn.className = 'close-pdf-modal';
            closeBtn.innerHTML = '×';
            
            // Assemble the modal
            modalContent.appendChild(pdfIframe);
            modalContent.appendChild(closeBtn);
            pdfModal.appendChild(modalContent);
            document.body.appendChild(pdfModal);
            
            // Add styles for the modal
            const style = document.createElement('style');
            style.textContent = `
                .pdf-modal {
                    display: none;
                    position: fixed;
                    z-index: 9999;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0, 0, 0, 0.9);
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }
                
                .pdf-modal.show {
                    opacity: 1;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                
                .pdf-modal-content {
                    background-color: #0a0a14;
                    width: 40%;
                    height: 60%;
                    border-radius: 8px;
                    position: relative;
                    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
                    margin-top: 20px;
                }
                
                .pdf-iframe {
                    width: 100%;
                    height: 100%;
                    border: none;
                    border-radius: 8px;
                }
                
                .close-pdf-modal {
                    position: absolute;
                    top: -30px;
                    right: -30px;
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    background: #000;
                    border: 2px solid white;
                    color: white;
                    font-size: 24px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    z-index: 10000;
                }
                
                @media (max-width: 768px) {
                    .pdf-modal-content {
                        width: 70%;
                        height: 60%;
                    }
                    
                    .close-pdf-modal {
                        top: -30px;
                        right: -10px;
                    }
                }
            `;
            document.head.appendChild(style);
        } else {
            // Get existing close button
            closeBtn = document.querySelector('.close-pdf-modal');
        }
        
        // Log the resolved path for debugging
        console.log("Final PDF path to load:", resolvedPath);
        
        // Show the modal first
        pdfModal.style.display = 'flex';
        setTimeout(() => {
            pdfModal.classList.add('show');
        }, 50);
        document.body.style.overflow = 'hidden';
        
        // Set the iframe source to the PDF file
        if (pdfIframe) {
            pdfIframe.src = resolvedPath;
            console.log("Iframe src set to:", pdfIframe.src);
        } else {
            console.error("PDF iframe element not found");
        }
        
        // Close modal when close button is clicked
        if (closeBtn) {
            closeBtn.onclick = function(e) {
                e.preventDefault();
                closePdfModal(pdfModal, pdfIframe);
            };
        }
        
        // Close modal when clicking outside the content
        pdfModal.onclick = function(event) {
            if (event.target === pdfModal) {
                closePdfModal(pdfModal, pdfIframe);
            }
        };
        
        // Setup ESC key to close modal
        const handleEscKey = function(e) {
            if (e.key === 'Escape') {
                closePdfModal(pdfModal, pdfIframe);
                document.removeEventListener('keydown', handleEscKey);
            }
        };
        
        document.addEventListener('keydown', handleEscKey);
    } catch(err) {
        console.error("Error opening PDF:", err);
        document.body.style.overflow = 'auto';
        showHeaderElements();
        alert("Error opening PDF: " + err.message);
    }
}

// Helper function to hide header elements
function hideHeaderElements() {
    const header = document.querySelector('header');
    if (header) {
        header.style.display = 'none';
        header.style.visibility = 'hidden';
        header.style.opacity = '0';
        header.style.zIndex = '-1000';
    }
    
    // Also hide the container div
    const container = document.querySelector('.container');
    if (container) {
        container.style.paddingTop = '0';
    }
}

// Helper function to show header elements
function showHeaderElements() {
    const header = document.querySelector('header');
    if (header) {
        header.style.display = '';
        header.style.visibility = 'visible';
        header.style.opacity = '1';
        header.style.zIndex = '1000';
    }
    
    // Restore container padding
    const container = document.querySelector('.container');
    if (container) {
        container.style.paddingTop = '';
    }
}

function closePdfModal(pdfModal, pdfIframe) {
    if (!pdfModal) return;
    
    pdfModal.classList.remove('show');
    
    setTimeout(() => {
        pdfModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        
        // Show header elements again
        showHeaderElements();
        
        // Clear iframe src
        if (pdfIframe) {
            pdfIframe.src = 'about:blank';
        }
    }, 300);
}

function initPortfolioVideos() {
    const portfolioVideos = document.querySelectorAll('.portfolio-video');
    
    portfolioVideos.forEach(video => {
        // Handle video loading errors
        video.addEventListener('error', function() {
            handleVideoError(this);
        });
        
        // Set source error handling
        const sources = video.querySelectorAll('source');
        sources.forEach(source => {
            source.addEventListener('error', function() {
                handleVideoError(video);
            });
        });
        
        // Make sure video is playing
        video.play().catch(error => {
            console.log('Auto-play was prevented:', error);
            handleVideoError(video);
        });
    });
    
    // Set up all potential PDF links in the portfolio page
    const allPdfLinks = document.querySelectorAll('a[href$=".pdf"]');
    allPdfLinks.forEach(link => {
        if (!link.hasAttribute('data-pdf-handler')) {
            link.setAttribute('data-pdf-handler', 'true');
            link.addEventListener('click', (event) => {
                event.preventDefault();
                let pdfPath = link.getAttribute('href');
                
                // Log original path
                console.log("PDF link clicked, original path:", pdfPath);
                
                // Try to get full resolved URL if available
                if (link.href) {
                    pdfPath = link.href;
                    console.log("Using absolute URL:", pdfPath);
                }
                
                if (pdfPath) {
                    openPdf(pdfPath);
                }
            });
        }
    });
    
    // Initialize portfolio filter
    initPortfolioFilter();
}

function handleVideoError(videoElement) {
    // Get the parent div that should have background-image as fallback
    const portfolioImage = videoElement.closest('.portfolio-image');
    const fallbackImg = videoElement.querySelector('img');
    
    if (fallbackImg) {
        // Use the fallback image src as background
        const imgSrc = fallbackImg.getAttribute('src');
        portfolioImage.style.backgroundImage = `url('${imgSrc}')`;
        portfolioImage.style.backgroundSize = 'cover';
        portfolioImage.style.backgroundPosition = 'center';
        
        // Hide the video element
        videoElement.style.display = 'none';
    }
}

function initPortfolioFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterBtns.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                btn.classList.add('active');
                
                // Get filter value
                const filterValue = btn.getAttribute('data-filter');
                
                // Filter items
                portfolioItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, 100);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(30px)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 500);
                    }
                    
                    // Restart videos when showing items
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        const video = item.querySelector('video');
                        if (video) {
                            video.currentTime = 0;
                            video.play().catch(err => console.log('Video play error:', err));
                        }
                    }
                });
            });
        });
    }
    
    // Add PDF modal functionality to portfolio items
    setupPortfolioPdfLinks();
}

// Function to set up PDF links in portfolio items
function setupPortfolioPdfLinks() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    portfolioItems.forEach(item => {
        // Check for PDF links in the portfolio item
        const pdfLinks = item.querySelectorAll('a[href$=".pdf"]');
        
        pdfLinks.forEach(link => {
            link.addEventListener('click', (event) => {
                event.preventDefault();
                let pdfPath = link.getAttribute('href');
                
                if (pdfPath) {
                    // Log original path to help with debugging
                    console.log("Original PDF path from link:", pdfPath);
                    
                    // Get absolute href if available - this helps resolve relative paths
                    if (link.href) {
                        pdfPath = link.href;
                        console.log("Using absolute path from link.href:", pdfPath);
                    }
                    
                    openPdf(pdfPath);
                }
            });
        });
        
        // Handle eye icons with data-pdf attributes
        const eyeIcons = item.querySelectorAll('i[data-pdf]');
        eyeIcons.forEach(icon => {
            icon.addEventListener('click', (event) => {
                event.preventDefault();
                const pdfPath = icon.getAttribute('data-pdf');
                
                if (pdfPath) {
                    console.log("Opening PDF from eye icon:", pdfPath);
                    openPdf(pdfPath);
                }
            });
        });
        
        // Look for "View PDF" buttons or links
        const viewButtons = item.querySelectorAll('.view-pdf-btn, .portfolio-view-btn, .btn-view');
        
        viewButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                event.preventDefault();
                
                // Check if the button already has an href attribute
                let pdfPath = button.getAttribute('href');
                
                // If not, try to find a PDF link within the same portfolio item
                if (!pdfPath || !pdfPath.endsWith('.pdf')) {
                    const pdfLink = item.querySelector('a[href$=".pdf"]');
                    if (pdfLink) {
                        pdfPath = pdfLink.getAttribute('href');
                        
                        // Try to get absolute URL if available
                        if (pdfLink.href) {
                            pdfPath = pdfLink.href;
                            console.log("Using absolute path from pdfLink.href:", pdfPath);
                        }
                    }
                }
                
                // If we found a PDF path, open it
                if (pdfPath && pdfPath.endsWith('.pdf')) {
                    openPdf(pdfPath);
                } else {
                    console.log("No PDF link found for this portfolio item");
                }
            });
        });
        
        // Also handle clicks on the entire portfolio image
        const portfolioImage = item.querySelector('.portfolio-image');
        if (portfolioImage) {
            portfolioImage.addEventListener('click', (event) => {
                // Only trigger if not clicking on a specific element with its own handler
                if (!event.target.closest('a') && !event.target.closest('button')) {
                    // Find a PDF link
                    const pdfLink = item.querySelector('a[href$=".pdf"]');
                    if (pdfLink) {
                        event.preventDefault();
                        
                        let pdfPath = pdfLink.getAttribute('href');
                        // Try to get absolute URL if available
                        if (pdfLink.href) {
                            pdfPath = pdfLink.href;
                            console.log("Using absolute path from portfolio image click:", pdfPath);
                        }
                        
                        openPdf(pdfPath);
                    }
                }
            });
        }
    });
}

// Function to create interactive particles in the footer
function initFooterParticles() {
    const footerParticles = document.getElementById('footer-particles');
    if (!footerParticles) return;
    
    // Remove any existing canvas (to prevent duplicates)
    const existingCanvas = footerParticles.querySelector('canvas');
    if (existingCanvas) {
        footerParticles.removeChild(existingCanvas);
    }
    
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    footerParticles.appendChild(canvas);
    
    // Set canvas size
    function resizeCanvas() {
        canvas.width = footerParticles.clientWidth;
        canvas.height = footerParticles.clientHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Particle properties
    const particles = [];
    
    // Adjust particle count based on screen size
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 
        Math.floor(canvas.width / 20) : // Fewer particles on mobile
        Math.floor(canvas.width / 10);  // More particles on desktop
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 2 + 0.5,
            speed: Math.random() * 0.5 + 0.2,
            direction: Math.random() * Math.PI * 2,
            color: `rgba(${Math.floor(Math.random() * 100 + 155)}, ${Math.floor(Math.random() * 100)}, ${Math.floor(Math.random() * 200 + 55)}, ${Math.random() * 0.5 + 0.3})`
        });
    }
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw and update particles
        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            
            // Draw particle
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
            
            // Move particle
            p.x += Math.cos(p.direction) * p.speed;
            p.y += Math.sin(p.direction) * p.speed;
            
            // Bounce off edges
            if (p.x < 0 || p.x > canvas.width) {
                p.direction = Math.PI - p.direction;
            }
            
            if (p.y < 0 || p.y > canvas.height) {
                p.direction = -p.direction;
            }
            
            // Add slight random movement
            p.direction += (Math.random() - 0.5) * 0.1;
            
            // Connect particles that are close to each other
            connectFooterParticles(p, i);
        }
        
        requestAnimationFrame(animate);
    }
    
    // Function to connect nearby particles with lines
    function connectFooterParticles(p, index) {
        // Only connect some particles to avoid too many lines
        if (Math.random() > 0.7) return;
        
        const connectionDistance = isMobile ? 50 : 80;
        
        for (let j = index + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < connectionDistance) {
                // The closer they are, the more opaque the line
                const opacity = 1 - (distance / connectionDistance);
                
                ctx.beginPath();
                ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.2})`;
                ctx.lineWidth = 0.5;
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
            }
        }
    }
    
    // Start animation
    animate();
}

// Initialize gallery page functionality
function initGalleryPage() {
    // Get all gallery items and modal elements
    const galleryItems = document.querySelectorAll('.gallery-item');
    const galleryModal = document.querySelector('.gallery-modal');
    const modalImage = document.getElementById('modal-image');
    const modalCaption = document.querySelector('.modal-caption');
    const modalCounter = document.querySelector('.modal-counter');
    const closeModal = document.querySelector('.close-modal');
    const prevBtn = document.querySelector('.modal-prev');
    const nextBtn = document.querySelector('.modal-next');
    
    // Skip if not on gallery page
    if (!galleryItems.length || !galleryModal) {
        return;
    }
    
    console.log('Gallery page initialized');
    
    // Hardcoded image paths that match the CSS background-image values
    const imagePaths = {
        'gallery-1': '../image/edit 1.jpg',
        'gallery-2': '../image/edited 2.jpg',
        'gallery-3': '../image/IMG_0728.JPG',
        'gallery-4': '../image/IMG_1721.JPG',
        'gallery-5': '../image/IMG_1850.jpeg',
        'gallery-6': '../image/Mong_Foo_Yuen_2300143_GD_Final%20Project_Concept_1.jpg',
        'gallery-7': '../image/ikf%201.png',
        'gallery-8': '../image/IMG_7709.jpg'
    };
    
    // Array to store image information
    const images = [];
    
    // Current active image index
    let currentIndex = 0;
    
    // Collect all gallery images and their info
    galleryItems.forEach((item, index) => {
        const galleryId = 'gallery-' + (index + 1);
        const caption = item.querySelector('.gallery-caption h3')?.textContent || 'Untitled';
        const desc = item.querySelector('.gallery-caption p')?.textContent || '';
        
        // Use the hardcoded image path
        const imageUrl = imagePaths[galleryId];
        
        if (!imageUrl) {
            console.error(`No image path found for gallery item #${index + 1}`);
            return;
        }
        
        console.log(`Gallery image #${index + 1}:`, imageUrl);
        
        // Store image info
        images.push({
            url: imageUrl,
            caption: caption,
            description: desc
        });
        
        // Add click event to open modal
        item.addEventListener('click', function(e) {
            e.preventDefault();
            openModal(index);
        });
        
        // Ensure zoom button also triggers the modal
        const zoomBtn = item.querySelector('.gallery-zoom');
        if (zoomBtn) {
            zoomBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation(); // Prevent double triggering
                openModal(index);
            });
        }
    });
    
    // Function to open modal with specific image
    function openModal(index) {
        if (index < 0 || index >= images.length) {
            console.error('Invalid gallery image index:', index);
            return;
        }
        
        console.log('Opening modal with image index:', index);
        currentIndex = index;
        updateModalContent();
        galleryModal.classList.add('show');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }
    
    // Function to close modal
    function closeModalFunc() {
        galleryModal.classList.remove('show');
        document.body.style.overflow = ''; // Re-enable scrolling
    }
    
    // Function to navigate to previous image
    function prevImage() {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
        updateModalContent();
    }
    
    // Function to navigate to next image
    function nextImage() {
        currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
        updateModalContent();
    }
    
    // Function to update modal content
    function updateModalContent() {
        const image = images[currentIndex];
        
        // Ensure we have a valid image object
        if (!image) {
            console.error('Invalid image at index:', currentIndex);
            return;
        }
        
        console.log('Updating modal content with:', image);
        
        // Update image source
        modalImage.src = image.url;
        modalImage.alt = image.caption;
        
        // Add error handler
        modalImage.onerror = function() {
            console.error('Failed to load image:', image.url);
            this.src = '../image/placeholder.jpg'; // Fallback to a generic image if available
        };
        
        // Update caption
        modalCaption.innerHTML = `<strong>${image.caption}</strong><br>${image.description}`;
        
        // Update counter
        modalCounter.textContent = `${currentIndex + 1} / ${images.length}`;
    }
    
    // Event listeners for modal controls
    if (closeModal) {
        closeModal.addEventListener('click', closeModalFunc);
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', function(e) {
            e.preventDefault();
            prevImage();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function(e) {
            e.preventDefault();
            nextImage();
        });
    }
    
    // Click outside the image to close the modal
    galleryModal.addEventListener('click', function(e) {
        if (e.target === galleryModal) {
            closeModalFunc();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (!galleryModal.classList.contains('show')) return;
        
        if (e.key === 'Escape') {
            closeModalFunc();
        } else if (e.key === 'ArrowLeft') {
            prevImage();
        } else if (e.key === 'ArrowRight') {
            nextImage();
        }
    });
    
    // Fix for mobile navigation - allow clicking on the image to navigate
    if (modalImage) {
        modalImage.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent closing the modal
            
            // Determine if click is on the left or right side of the image
            const x = e.clientX;
            const width = window.innerWidth;
            
            if (x < width / 2) {
                prevImage();
            } else {
                nextImage();
            }
        });
    }
}

// Initialize the portfolio canvas background
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the portfolio page
    const portfolioCanvas = document.getElementById('portfolio-canvas');
    if (!portfolioCanvas) return;
    
    const ctx = portfolioCanvas.getContext('2d');
    let width = portfolioCanvas.width = window.innerWidth;
    let height = portfolioCanvas.height = window.innerHeight;
    
    // Create gradient spots
    const spots = [];
    const spotCount = 5;
    
    // Create gradient spots with random positions and sizes
    for (let i = 0; i < spotCount; i++) {
        spots.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 200 + 100,
            vx: Math.random() * 0.2 - 0.1,
            vy: Math.random() * 0.2 - 0.1,
            hue: Math.random() * 60 + 240 // Purple to blue hues
        });
    }
    
    // Handle window resize
    window.addEventListener('resize', function() {
        width = portfolioCanvas.width = window.innerWidth;
        height = portfolioCanvas.height = window.innerHeight;
    });
    
    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    let mouseRadius = 200;
    
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Affect nearby spots
        spots.forEach(spot => {
            const dx = mouseX - spot.x;
            const dy = mouseY - spot.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist < mouseRadius) {
                const angle = Math.atan2(dy, dx);
                const force = (mouseRadius - dist) / mouseRadius;
                
                spot.vx -= Math.cos(angle) * force * 0.02;
                spot.vy -= Math.sin(angle) * force * 0.02;
            }
        });
    });
    
    // Animation loop
    function animate() {
        // Clear canvas with a very dark background
        ctx.fillStyle = 'rgba(10, 10, 20, 0.1)';
        ctx.fillRect(0, 0, width, height);
        
        // Update and draw spots
        spots.forEach(spot => {
            // Update position
            spot.x += spot.vx;
            spot.y += spot.vy;
            
            // Bounce off edges
            if (spot.x < -spot.radius) spot.x = width + spot.radius;
            if (spot.x > width + spot.radius) spot.x = -spot.radius;
            if (spot.y < -spot.radius) spot.y = height + spot.radius;
            if (spot.y > height + spot.radius) spot.y = -spot.radius;
            
            // Slow down over time
            spot.vx *= 0.99;
            spot.vy *= 0.99;
            
            // Add a tiny bit of random movement
            spot.vx += (Math.random() - 0.5) * 0.01;
            spot.vy += (Math.random() - 0.5) * 0.01;
            
            // Create gradient
            const gradient = ctx.createRadialGradient(
                spot.x, spot.y, 0,
                spot.x, spot.y, spot.radius
            );
            
            // Color based on hue
            gradient.addColorStop(0, `hsla(${spot.hue}, 100%, 60%, 0.1)`);
            gradient.addColorStop(1, 'transparent');
            
            // Draw spot
            ctx.beginPath();
            ctx.fillStyle = gradient;
            ctx.arc(spot.x, spot.y, spot.radius, 0, Math.PI * 2);
            ctx.fill();
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
});

// Portfolio page scroll animations
document.addEventListener('DOMContentLoaded', function() {
    if (!document.querySelector('.portfolio-page')) return;
    
    // Animate portfolio items on scroll
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(20px)';
                
                // Add a slight delay based on the index 
                const index = Array.from(portfolioItems).indexOf(entry.target);
                const delay = 100 + (index % 3) * 100; // Different delay for each column
                
                setTimeout(() => {
                    entry.target.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, delay);
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    portfolioItems.forEach(item => {
        // Initial state
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        observer.observe(item);
    });
    
    // Add parallax effect to hero section
    const hero = document.querySelector('.portfolio-hero');
    
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrollPos = window.scrollY;
            const heroHeight = hero.offsetHeight;
            const scrollProgress = Math.min(scrollPos / heroHeight, 1);
            
            // Parallax effect for the hero content
            const heroContent = hero.querySelector('.portfolio-hero-content');
            if (heroContent) {
                heroContent.style.transform = `translateY(${scrollProgress * 50}px)`;
                heroContent.style.opacity = 1 - scrollProgress * 1.5;
            }
        });
    }
});

// Initialize the glitch title effect
document.addEventListener('DOMContentLoaded', function() {
    const glitchTitle = document.querySelector('.glitch-title');
    if (!glitchTitle) return;
    
    // Set data-text attribute if not already set
    if (!glitchTitle.hasAttribute('data-text')) {
        glitchTitle.setAttribute('data-text', glitchTitle.textContent);
    }
    
    // Add random glitch effect occasionally
    function randomGlitch() {
        const rand = Math.random();
        
        if (rand < 0.1) { // 10% chance of glitching
            glitchTitle.classList.add('glitching');
            
            setTimeout(() => {
                glitchTitle.classList.remove('glitching');
            }, 200);
        }
        
        // Set next random glitch
        setTimeout(randomGlitch, 2000 + Math.random() * 5000);
    }
    
    // Start the random glitching
    setTimeout(randomGlitch, 3000);
});

// Initialize contact page functionality
function initContactPage() {
    const contactDuck = document.getElementById('contactDuck');
    if (!contactDuck) return; // Exit if not on contact page

    const duckCanvas = document.getElementById('duckCanvas');
    if (!duckCanvas) return;
    
    const ctx = duckCanvas.getContext('2d');
    let frame = 0;
    let frameCount = 0;
    let blinkCounter = 0;
    let eyeOpen = true;
    let talkingState = 0;
    let waveState = 0;
    let isWaving = false;
    let isSpinning = false;
    let spinAngle = 0;
    let isFlying = false;
    let flyState = 0;
    let isTalking = false;
    
    // Duck colors - Using more vibrant colors
    const createGradient = (color1, color2) => {
        const gradient = ctx.createLinearGradient(10, 10, duckCanvas.width - 10, duckCanvas.height - 10);
        gradient.addColorStop(0, color1);
        gradient.addColorStop(1, color2);
        return gradient;
    };
    
    const duckGradient = createGradient('#7000ff', '#e100ff');
    const beakColor = '#FF6D00';
    const eyeColor = '#212121';
    
    function drawDuck() {
        ctx.clearRect(0, 0, duckCanvas.width, duckCanvas.height);
        
        frame++;
        frameCount++;
        blinkCounter++;
        
        if (blinkCounter > 90) {
            eyeOpen = !eyeOpen;
            if (!eyeOpen) {
                blinkCounter = 0;
            } else {
                blinkCounter = 80;
            }
        }
        
        if (isTalking && frameCount >= 5) {
            talkingState = (talkingState + 1) % 3;
            frameCount = 0;
        }
        
        if (isWaving && frameCount >= 5) {
            waveState = (waveState + 1) % 4;
            frameCount = 0;
        }
        
        if (isSpinning) {
            spinAngle += 10;
            if (spinAngle >= 360) {
                isSpinning = false;
                spinAngle = 0;
            }
        }
        
        if (isFlying) {
            flyState = Math.sin(frame * 0.1) * 20;
        }
        
        // Base position - Centered and larger
        const centerX = duckCanvas.width / 2;
        const centerY = duckCanvas.height / 2 + 20;
        const scale = 1.5; // Increase size by 50%
        
        ctx.save();
        ctx.translate(centerX, centerY);
        
        // Apply flying animation
        if (isFlying) {
            ctx.translate(0, flyState);
        }
        
        // Apply spinning animation
        if (isSpinning) {
            ctx.rotate(spinAngle * Math.PI / 180);
        }
        
        // Draw duck body
        ctx.beginPath();
        ctx.arc(0, 0, 35 * scale, 0, Math.PI * 2);
        ctx.fillStyle = duckGradient;
        ctx.fill();
        
        // Draw duck head
        ctx.beginPath();
        ctx.arc(0, -40 * scale, 28 * scale, 0, Math.PI * 2);
        ctx.fillStyle = duckGradient;
        ctx.fill();
        
        // Draw eyes
        if (eyeOpen) {
            ctx.beginPath();
            ctx.arc(-10 * scale, -45 * scale, 5 * scale, 0, Math.PI * 2);
            ctx.fillStyle = eyeColor;
            ctx.fill();
            
            // Eye highlight
            ctx.beginPath();
            ctx.arc(-8 * scale, -47 * scale, 2 * scale, 0, Math.PI * 2);
            ctx.fillStyle = 'white';
            ctx.fill();
        } else {
            // Closed eye
            ctx.beginPath();
            ctx.moveTo(-15 * scale, -45 * scale);
            ctx.lineTo(-5 * scale, -45 * scale);
            ctx.lineWidth = 2 * scale;
            ctx.strokeStyle = eyeColor;
            ctx.stroke();
        }
        
        // Draw beak with talking animation
        ctx.beginPath();
        ctx.moveTo(5 * scale, -45 * scale);
        
        if (isTalking) {
            if (talkingState === 0) {
                ctx.lineTo(25 * scale, -45 * scale);
                ctx.lineTo(15 * scale, -40 * scale);
            } else if (talkingState === 1) {
                ctx.lineTo(25 * scale, -50 * scale);
                ctx.lineTo(15 * scale, -42 * scale);
            } else {
                ctx.lineTo(25 * scale, -40 * scale);
                ctx.lineTo(15 * scale, -35 * scale);
            }
        } else {
            ctx.lineTo(25 * scale, -45 * scale);
            ctx.lineTo(15 * scale, -40 * scale);
        }
        
        ctx.closePath();
        ctx.fillStyle = beakColor;
        ctx.fill();
        
        // Draw waving wing when waving
        if (isWaving) {
            ctx.beginPath();
            
            // Wing changes position based on wave state
            if (waveState === 0) {
                ctx.ellipse(30 * scale, -20 * scale, 12 * scale, 20 * scale, Math.PI / 4, 0, Math.PI * 2);
            } else if (waveState === 1) {
                ctx.ellipse(30 * scale, -25 * scale, 12 * scale, 20 * scale, Math.PI / 3, 0, Math.PI * 2);
            } else if (waveState === 2) {
                ctx.ellipse(28 * scale, -30 * scale, 12 * scale, 20 * scale, Math.PI / 2, 0, Math.PI * 2);
            } else {
                ctx.ellipse(25 * scale, -28 * scale, 12 * scale, 20 * scale, Math.PI / 3, 0, Math.PI * 2);
            }
            
            ctx.fillStyle = duckGradient;
            ctx.fill();
        }
        
        ctx.restore();
        
        requestAnimationFrame(drawDuck);
    }
    
    // Initialize speech bubble and duck interactions
    const duckSpeech = document.getElementById('duckSpeech');
    const duckActions = document.getElementById('duckActions');
    
    // Duck quotes
    const duckQuotes = [
        "Quack! Need help with your project? I'm here to assist!",
        "Hello there! I'm Gossip Duck, your creative design companion!",
        "Got a creative challenge? Let me help you solve it!",
        "Design is about making the complex simple and delightful!",
        "Let's create something extraordinary together!",
        "Great design is about communication, not just decoration.",
        "Ready to bring your vision to life? Just drop me a message!"
    ];
    
    // Show duck actions when hovering over duck
    contactDuck.addEventListener('mouseenter', () => {
        duckActions.classList.add('show');
        showSpeechBubble();
        
        // Show random duck quote
        duckSpeech.querySelector('p').textContent = duckQuotes[Math.floor(Math.random() * duckQuotes.length)];
    });
    
    contactDuck.addEventListener('mouseleave', () => {
        setTimeout(() => {
            if (!isHoveringActionButtons) {
                duckActions.classList.remove('show');
            }
        }, 500);
    });
    
    // Track if user is hovering over action buttons
    let isHoveringActionButtons = false;
    let speechBubbleTimeout;
    
    // Function to show speech bubble for 5 seconds
    function showSpeechBubble() {
        // Clear any existing timeout
        if (speechBubbleTimeout) {
            clearTimeout(speechBubbleTimeout);
        }
        
        // Show the speech bubble
        duckSpeech.classList.add('show');
        
        // Hide after 5 seconds
        speechBubbleTimeout = setTimeout(() => {
            duckSpeech.classList.remove('show');
        }, 5000);
    }
    
    duckActions.addEventListener('mouseenter', () => {
        isHoveringActionButtons = true;
    });
    
    duckActions.addEventListener('mouseleave', () => {
        isHoveringActionButtons = false;
        setTimeout(() => {
            if (!isHoveringActionButtons) {
                duckActions.classList.remove('show');
            }
        }, 500);
    });
    
    // Duck action buttons functionality
    const actionButtons = document.querySelectorAll('.duck-action-btn');
    
    actionButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const action = btn.getAttribute('data-action');
            
            // Reset all animations
            isWaving = false;
            isSpinning = false;
            isFlying = false;
            isTalking = false;
            
            // Apply the selected animation
            switch (action) {
                case 'wave':
                    isWaving = true;
                    duckSpeech.querySelector('p').textContent = "Hello there! Nice to meet you!";
                    break;
                case 'talk':
                    isTalking = true;
                    duckSpeech.querySelector('p').textContent = duckQuotes[Math.floor(Math.random() * duckQuotes.length)];
                    
                    // Stop talking after 3 seconds
                    setTimeout(() => {
                        isTalking = false;
                    }, 3000);
                    break;
                case 'spin':
                    isSpinning = true;
                    duckSpeech.querySelector('p').textContent = "Wheeeeee! I'm spinning!";
                    break;
                case 'fly':
                    isFlying = true;
                    duckSpeech.querySelector('p').textContent = "I can fly! Watch me soar!";
                    
                    // Stop flying after 3 seconds
                    setTimeout(() => {
                        isFlying = false;
                    }, 3000);
                    break;
            }
            
            // Show speech bubble for 5 seconds when action button is clicked
            showSpeechBubble();
        });
    });
    
    // Start the duck animation
    drawDuck();
    
    // Add form animation
    const formGroups = document.querySelectorAll('.form-group');
    
    formGroups.forEach((group, index) => {
        setTimeout(() => {
            group.style.opacity = 0;
            group.style.transform = 'translateY(20px)';
            group.style.transition = 'all 0.5s ease';
            
            setTimeout(() => {
                group.style.opacity = 1;
                group.style.transform = 'translateY(0)';
            }, 100);
        }, index * 100);
    });
    
    // Form submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Show duck talking animation
            isTalking = true;
            duckSpeech.querySelector('p').textContent = "Thanks for your message! I'll get back to you soon!";
            showSpeechBubble();
            
            // Reset form with animation
            setTimeout(() => {
                contactForm.reset();
                isTalking = false;
            }, 1000);
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // ... existing initialization code ...
    
    // Initialize contact page functionality
    initContactPage();
}); 