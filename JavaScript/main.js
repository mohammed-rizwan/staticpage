// ===== MAIN WEBSITE JAVASCRIPT =====

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Website loaded successfully');
    
    // Initialize all components
    initializeNavigation();
    initializeSmoothScrolling();
    initializeAnimations();
    initializeContactForm();
    initializeProductGrid();
    initializeMobileMenu();
    
    // Add loading animation
    document.body.classList.add('loaded');
});

// ===== NAVIGATION FUNCTIONALITY =====
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.primary-menu a');
    const currentPage = window.location.pathname.split('/').pop() || 'Home.html';
    
    navLinks.forEach(link => {
        // Remove active class from all links
        link.classList.remove('active');
        
        // Check if this link matches current page
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
        
        // Add smooth scroll for anchor links
        if (link.getAttribute('href').startsWith('#')) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        }
    });
}

// ===== SMOOTH SCROLLING =====
function initializeSmoothScrolling() {
    // Smooth scroll for all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Smooth scroll to top button
    const scrollToTopBtn = document.querySelector('.scroll-to-top');
    if (scrollToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        });
        
        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// ===== ANIMATIONS =====
function initializeAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.product-card, .section-title, .hero-content').forEach(el => {
        observer.observe(el);
    });
    
    // Parallax effect for hero section
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            heroSection.style.transform = `translateY(${rate}px)`;
        });
    }
}

// ===== CONTACT FORM FUNCTIONALITY =====
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;
    
    console.log('Initializing contact form...');
    
    contactForm.addEventListener('submit', handleFormSubmit);
    
    // Real-time validation
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearFieldError);
    });
}

async function handleFormSubmit(e) {
    e.preventDefault();
    console.log('Form submission started');
    
    const form = e.target;
    const submitButton = form.querySelector('button[type="submit"]');
    const successMessage = document.getElementById('success-message');
    const errorMessage = document.getElementById('error-message');
    
    // Validate form
    if (!validateForm(form)) {
        return;
    }
    
    // Hide any existing messages
    hideMessages();
    
    // Show loading state
    setLoadingState(submitButton, true);
    
    try {
        // Get form data
        const formData = new FormData(form);
        
        // Log form data for debugging
        console.log('Form data:', {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            subject: formData.get('subject'),
            message: formData.get('message'),
            access_key: formData.get('access_key')
        });
        
        console.log('Submitting to Web3Forms...');
        
        // Submit to Web3Forms
        const response = await fetch(form.action, {
            method: 'POST',
            body: formData
        });
        
        console.log('Response status:', response.status);
        
        const result = await response.json();
        console.log('Response data:', result);
        
        if (response.ok && result.success) {
            // Success
            console.log('Form submitted successfully');
            showMessage(successMessage, 'Your message has been sent successfully! We will get back to you soon.');
            form.reset();
            
            // Track successful submission
            trackEvent('contact_form_submitted', 'success');
        } else {
            // Error from Web3Forms
            console.log('Web3Forms error:', result);
            showMessage(errorMessage, result.message || 'There was an error sending your message. Please try again later.');
            
            // Track error
            trackEvent('contact_form_error', result.message || 'unknown_error');
        }
    } catch (error) {
        // Network or other error
        console.error('Form submission error:', error);
        showMessage(errorMessage, 'There was an error sending your message. Please check your internet connection and try again.');
        
        // Track error
        trackEvent('contact_form_error', 'network_error');
    } finally {
        // Re-enable submit button
        setLoadingState(submitButton, false);
    }
}

function validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    
    inputs.forEach(input => {
        if (!validateField.call(input)) {
            isValid = false;
        }
    });
    
    return isValid;
}

function validateField() {
    const field = this;
    const value = field.value.trim();
    const fieldName = field.name;
    let isValid = true;
    let errorMessage = '';
    
    // Remove existing error styling
    clearFieldError.call(field);
    
    // Required field validation
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = `${getFieldLabel(fieldName)} is required.`;
    }
    
    // Email validation
    if (fieldName === 'email' && value && !isValidEmail(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid email address.';
    }
    
    // Phone validation
    if (fieldName === 'phone' && value && !isValidPhone(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid phone number.';
    }
    
    // Show error if validation failed
    if (!isValid) {
        showFieldError(field, errorMessage);
    }
    
    return isValid;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
}

function getFieldLabel(fieldName) {
    const labels = {
        name: 'Name',
        email: 'Email',
        phone: 'Phone',
        subject: 'Subject',
        message: 'Message'
    };
    return labels[fieldName] || fieldName.charAt(0).toUpperCase() + fieldName.slice(1);
}

function showFieldError(field, message) {
    field.classList.add('error');
    
    // Create error message element
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    errorElement.style.color = '#e74c3c';
    errorElement.style.fontSize = '0.875rem';
    errorElement.style.marginTop = '0.25rem';
    
    // Insert error message after the field
    field.parentNode.insertBefore(errorElement, field.nextSibling);
}

function clearFieldError() {
    this.classList.remove('error');
    const errorElement = this.parentNode.querySelector('.field-error');
    if (errorElement) {
        errorElement.remove();
    }
}

function setLoadingState(button, isLoading) {
    if (isLoading) {
        button.disabled = true;
        button.innerHTML = '<span class="spinner"></span> Sending...';
        button.classList.add('loading');
    } else {
        button.disabled = false;
        button.textContent = 'Submit Form';
        button.classList.remove('loading');
    }
}

function showMessage(messageElement, text) {
    if (messageElement) {
        messageElement.textContent = text;
        messageElement.style.display = 'block';
        console.log('Showing message:', text);
        
        // Auto-hide after 8 seconds
        setTimeout(() => {
            hideMessages();
        }, 8000);
    }
}

function hideMessages() {
    const successMessage = document.getElementById('success-message');
    const errorMessage = document.getElementById('error-message');
    
    if (successMessage) successMessage.style.display = 'none';
    if (errorMessage) errorMessage.style.display = 'none';
}

// ===== PRODUCT GRID FUNCTIONALITY =====
function initializeProductGrid() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        // Add hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // Add click to expand functionality
        card.addEventListener('click', function() {
            if (this.classList.contains('expanded')) {
                this.classList.remove('expanded');
            } else {
                // Remove expanded class from all other cards
                productCards.forEach(c => c.classList.remove('expanded'));
                this.classList.add('expanded');
            }
        });
    });
}

// ===== MOBILE MENU FUNCTIONALITY =====
function initializeMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-nav-toggle');
    const primaryMenu = document.querySelector('.primary-menu');
    
    if (mobileToggle && primaryMenu) {
        mobileToggle.addEventListener('click', function() {
            primaryMenu.classList.toggle('mobile-open');
            this.classList.toggle('active');
            
            // Update toggle button text
            if (primaryMenu.classList.contains('mobile-open')) {
                this.innerHTML = '✕';
            } else {
                this.innerHTML = '☰';
            }
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileToggle.contains(e.target) && !primaryMenu.contains(e.target)) {
                primaryMenu.classList.remove('mobile-open');
                mobileToggle.classList.remove('active');
                mobileToggle.innerHTML = '☰';
            }
        });
        
        // Close mobile menu when clicking on a link
        const menuLinks = primaryMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', function() {
                primaryMenu.classList.remove('mobile-open');
                mobileToggle.classList.remove('active');
                mobileToggle.innerHTML = '☰';
            });
        });
    }
}

// ===== UTILITY FUNCTIONS =====
function trackEvent(eventName, eventValue) {
    // Google Analytics tracking (if available)
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, {
            event_category: 'user_interaction',
            event_label: eventValue
        });
    }
    
    // Console logging for development
    console.log(`Event tracked: ${eventName} - ${eventValue}`);
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ===== PERFORMANCE OPTIMIZATIONS =====
// Lazy load images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading if supported
if ('IntersectionObserver' in window) {
    initializeLazyLoading();
}

// ===== ACCESSIBILITY IMPROVEMENTS =====
function initializeAccessibility() {
    // Add skip to content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: #000;
        color: white;
        padding: 8px;
        text-decoration: none;
        z-index: 10000;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add focus indicators
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
}

// Initialize accessibility features
initializeAccessibility();

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    
    // Track error for analytics
    trackEvent('javascript_error', e.message);
});

// ===== PERFORMANCE MONITORING =====
window.addEventListener('load', function() {
    // Measure page load performance
    if ('performance' in window) {
        const perfData = performance.getEntriesByType('navigation')[0];
        const loadTime = perfData.loadEventEnd - perfData.loadEventStart;
        
        console.log(`Page load time: ${loadTime}ms`);
        
        // Track performance metrics
        if (loadTime > 3000) {
            trackEvent('slow_page_load', loadTime.toString());
        }
    }
});

console.log('Main JavaScript loaded successfully');
