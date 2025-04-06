// Responsive Navigation
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle functionality
    const mobileMenuToggle = document.createElement('button');
    mobileMenuToggle.className = 'mobile-menu-toggle';
    mobileMenuToggle.innerHTML = '☰';
    mobileMenuToggle.style.display = 'none';
    mobileMenuToggle.style.position = 'fixed';
    mobileMenuToggle.style.top = '20px';
    mobileMenuToggle.style.right = '20px';
    mobileMenuToggle.style.zIndex = '1000';
    mobileMenuToggle.style.background = 'linear-gradient(45deg, #3498db, #2980b9)';
    mobileMenuToggle.style.color = 'white';
    mobileMenuToggle.style.border = 'none';
    mobileMenuToggle.style.borderRadius = '50%';
    mobileMenuToggle.style.width = '50px';
    mobileMenuToggle.style.height = '50px';
    mobileMenuToggle.style.fontSize = '24px';
    mobileMenuToggle.style.cursor = 'pointer';
    mobileMenuToggle.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
    
    document.body.appendChild(mobileMenuToggle);
    
    const nav = document.querySelector('nav');
    const authLinks = document.querySelector('.auth-links');
    
    function toggleMobileMenu() {
        const isVisible = nav.style.display === 'block';
        nav.style.display = isVisible ? 'none' : 'block';
        authLinks.style.display = isVisible ? 'none' : 'block';
        if (!isVisible) {
            nav.style.position = 'fixed';
            nav.style.top = '80px';
            nav.style.right = '20px';
            nav.style.background = 'linear-gradient(135deg, #2d3436, #3b444b)';
            nav.style.padding = '20px';
            nav.style.borderRadius = '10px';
            nav.style.boxShadow = '0 5px 15px rgba(0,0,0,0.3)';
            nav.style.zIndex = '999';
            
            authLinks.style.position = 'fixed';
            authLinks.style.top = nav.offsetHeight + 100 + 'px';
            authLinks.style.right = '20px';
            authLinks.style.background = 'linear-gradient(135deg, #2d3436, #3b444b)';
            authLinks.style.padding = '20px';
            authLinks.style.borderRadius = '10px';
            authLinks.style.boxShadow = '0 5px 15px rgba(0,0,0,0.3)';
            authLinks.style.zIndex = '999';
            authLinks.style.flexDirection = 'column';
        }
    }
    
    mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    
    // Check screen size and adjust layout
    function checkScreenSize() {
        if (window.innerWidth <= 768) {
            mobileMenuToggle.style.display = 'block';
            nav.style.display = 'none';
            authLinks.style.display = 'none';
            
            // Adjust hero section layout
            const heroContent = document.querySelector('.hero-content');
            if (heroContent) {
                heroContent.style.flexDirection = 'column';
            }
            
            const heroText = document.querySelector('.hero-text');
            if (heroText) {
                heroText.style.maxWidth = '100%';
                heroText.style.paddingRight = '0';
                heroText.style.textAlign = 'center';
            }
            
            const heroImage = document.querySelector('.hero-image');
            if (heroImage) {
                heroImage.style.maxWidth = '100%';
                heroImage.style.marginTop = '20px';
            }
            
            // Center align header content
            const headerContent = document.querySelector('.header-content');
            if (headerContent) {
                headerContent.style.flexDirection = 'column';
                headerContent.style.textAlign = 'center';
            }
            
            // Adjust logo container
            const logoContainer = document.querySelector('.logo-container');
            if (logoContainer) {
                logoContainer.style.margin = '0 auto';
                logoContainer.style.paddingLeft = '0';
            }
            
        } else {
            mobileMenuToggle.style.display = 'none';
            nav.style.display = 'block';
            authLinks.style.display = 'flex';
            
            // Reset hero section layout
            const heroContent = document.querySelector('.hero-content');
            if (heroContent) {
                heroContent.style.flexDirection = 'row';
            }
            
            const heroText = document.querySelector('.hero-text');
            if (heroText) {
                heroText.style.maxWidth = '50%';
                heroText.style.paddingRight = '20px';
                heroText.style.textAlign = 'left';
            }
            
            const heroImage = document.querySelector('.hero-image');
            if (heroImage) {
                heroImage.style.maxWidth = '50%';
                heroImage.style.marginTop = '-50px';
            }
            
            // Reset header content
            const headerContent = document.querySelector('.header-content');
            if (headerContent) {
                headerContent.style.flexDirection = 'row';
                headerContent.style.textAlign = 'left';
            }
            
            // Reset logo container
            const logoContainer = document.querySelector('.logo-container');
            if (logoContainer) {
                logoContainer.style.marginRight = 'auto';
                logoContainer.style.paddingLeft = '0';
            }
            
            // Reset nav and auth links positions
            nav.style.position = '';
            nav.style.top = '';
            nav.style.right = '';
            nav.style.background = '';
            nav.style.padding = '';
            nav.style.borderRadius = '';
            nav.style.boxShadow = '';
            
            authLinks.style.position = '';
            authLinks.style.top = '';
            authLinks.style.right = '';
            authLinks.style.background = '';
            authLinks.style.padding = '';
            authLinks.style.borderRadius = '';
            authLinks.style.boxShadow = '';
            authLinks.style.flexDirection = '';
        }
    }
    
    // Initial check
    checkScreenSize();
    
    // Add resize event listener
    window.addEventListener('resize', checkScreenSize);
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (window.innerWidth <= 768 && nav.style.display === 'block') {
                toggleMobileMenu();
            }
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100, // Adjust for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Star rating functionality
    const stars = document.querySelectorAll('.star-rating .star');
    if (stars.length > 0) {
        stars.forEach(star => {
            star.addEventListener('click', function() {
                const value = parseInt(this.getAttribute('data-value'));
                
                // Highlight selected stars
                stars.forEach((s, index) => {
                    if (index < value) {
                        s.classList.add('active');
                        s.style.color = 'gold';
                    } else {
                        s.classList.remove('active');
                        s.style.color = '#ccc';
                    }
                });
                
                // You might want to store this value in a hidden input field
                // for form submission
            });
        });
    }
    
    // Form submission handling
    const reviewForm = document.querySelector('.review-form');
    if (reviewForm) {
        reviewForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('reviewer-name').value;
            const reviewText = document.getElementById('review-text').value;
            const rating = document.querySelectorAll('.star-rating .star.active').length;
            
            // Basic validation
            if (!name || !reviewText || rating === 0) {
                alert('Please fill in all fields and provide a rating.');
                return;
            }
            
            // Here you would typically send the data to a server
            // For this example, we'll just show a success message
            alert('Thank you for your review!');
            
            // Reset form
            this.reset();
            stars.forEach(star => {
                star.classList.remove('active');
                star.style.color = '#ccc';
            });
            
            // Close the dropdown
            document.getElementById('toggleReview').checked = false;
        });
    }
    
    // Adjust scroll-padding-top based on header height
    function adjustScrollPadding() {
        const header = document.querySelector('header');
        if (header) {
            const headerHeight = header.offsetHeight;
            document.documentElement.style.scrollPaddingTop = headerHeight + 'px';
        }
    }
    
    adjustScrollPadding();
    window.addEventListener('resize', adjustScrollPadding);
    
    // Initialize particles
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-bg';
    document.body.prepend(particleContainer);
    
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random properties
        const size = Math.random() * 5 + 2;
        const posX = Math.random() * 100;
        const delay = Math.random() * 15;
        const duration = 10 + Math.random() * 20;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}%`;
        particle.style.animationDelay = `${delay}s`;
        particle.style.animationDuration = `${duration}s`;
        
        particleContainer.appendChild(particle);
    }
});

// Initialize AOS animations with delay
setTimeout(() => {
    AOS.init({
        duration: 800,
        easing: 'ease-out-quad',
        once: true
    });
}, 500);