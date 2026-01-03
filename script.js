/**
 * VOCL Website - Minimal JavaScript
 * Handles navigation, smooth scrolling, and mobile menu
 */

(function() {
    'use strict';

    // DOM Elements
    const nav = document.querySelector('.nav');
    const navToggle = document.querySelector('.nav-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelectorAll('a[href^="#"]');

    // Navigation scroll effect
    let lastScrollY = 0;
    let ticking = false;

    function updateNavigation() {
        const scrollY = window.scrollY;
        
        // Add shadow on scroll
        if (scrollY > 10) {
            nav.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.05)';
        } else {
            nav.style.boxShadow = 'none';
        }
        
        lastScrollY = scrollY;
        ticking = false;
    }

    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(updateNavigation);
            ticking = true;
        }
    }

    window.addEventListener('scroll', onScroll, { passive: true });

    // Mobile menu toggle
    if (navToggle && mobileMenu) {
        navToggle.addEventListener('click', function() {
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', !isExpanded);
            mobileMenu.classList.toggle('active');
            mobileMenu.setAttribute('aria-hidden', isExpanded);
            
            // Animate hamburger icon
            navToggle.classList.toggle('active');
        });

        // Close mobile menu when clicking a link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
                navToggle.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                mobileMenu.setAttribute('aria-hidden', 'true');
            });
        });
    }

    // Smooth scroll for anchor links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only process internal anchor links
            if (href.startsWith('#') && href.length > 1) {
                const target = document.querySelector(href);
                
                if (target) {
                    e.preventDefault();
                    
                    const navHeight = nav.offsetHeight;
                    const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });

                    // Update URL without jumping
                    history.pushState(null, null, href);
                }
            }
        });
    });

    // Handle initial hash in URL
    function scrollToHashOnLoad() {
        if (window.location.hash) {
            const target = document.querySelector(window.location.hash);
            if (target) {
                // Delay to ensure page is fully rendered
                setTimeout(() => {
                    const navHeight = nav.offsetHeight;
                    const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight - 20;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }, 100);
            }
        }
    }

    // Intersection Observer for fade-in animations
    function initScrollAnimations() {
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -50px 0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe sections for animation
        const sections = document.querySelectorAll('.step, .condition-card, .tech-card, .value, .contact-option');
        sections.forEach(section => {
            section.classList.add('fade-in');
            observer.observe(section);
        });
    }

    // Add CSS for fade-in animation
    function addAnimationStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .fade-in {
                opacity: 0;
                transform: translateY(20px);
                transition: opacity 0.6s ease, transform 0.6s ease;
            }
            
            .fade-in.visible {
                opacity: 1;
                transform: translateY(0);
            }
            
            /* Stagger animations for grid items */
            .step.fade-in:nth-child(1) { transition-delay: 0s; }
            .step.fade-in:nth-child(2) { transition-delay: 0.1s; }
            .step.fade-in:nth-child(3) { transition-delay: 0.2s; }
            
            .condition-card.fade-in:nth-child(1) { transition-delay: 0s; }
            .condition-card.fade-in:nth-child(2) { transition-delay: 0.1s; }
            .condition-card.fade-in:nth-child(3) { transition-delay: 0.2s; }
            
            .tech-card.fade-in:nth-child(1) { transition-delay: 0s; }
            .tech-card.fade-in:nth-child(2) { transition-delay: 0.1s; }
            .tech-card.fade-in:nth-child(3) { transition-delay: 0.2s; }
            .tech-card.fade-in:nth-child(4) { transition-delay: 0.3s; }
            .tech-card.fade-in:nth-child(5) { transition-delay: 0.4s; }
            .tech-card.fade-in:nth-child(6) { transition-delay: 0.5s; }
            
            .value.fade-in:nth-child(1) { transition-delay: 0s; }
            .value.fade-in:nth-child(2) { transition-delay: 0.1s; }
            .value.fade-in:nth-child(3) { transition-delay: 0.2s; }
            
            .contact-option.fade-in:nth-child(1) { transition-delay: 0s; }
            .contact-option.fade-in:nth-child(2) { transition-delay: 0.1s; }
            .contact-option.fade-in:nth-child(3) { transition-delay: 0.2s; }
            
            /* Hamburger animation */
            .nav-toggle.active span:nth-child(1) {
                transform: rotate(45deg) translate(5px, 5px);
            }
            
            .nav-toggle.active span:nth-child(2) {
                opacity: 0;
            }
            
            .nav-toggle.active span:nth-child(3) {
                transform: rotate(-45deg) translate(6px, -6px);
            }
            
            /* Respect reduced motion preference */
            @media (prefers-reduced-motion: reduce) {
                .fade-in {
                    opacity: 1;
                    transform: none;
                    transition: none;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Initialize
    document.addEventListener('DOMContentLoaded', function() {
        addAnimationStyles();
        initScrollAnimations();
        scrollToHashOnLoad();
    });

    // Expose minimal API for potential future use
    window.VOCL = {
        scrollTo: function(selector) {
            const target = document.querySelector(selector);
            if (target) {
                const navHeight = nav.offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight - 20;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    };

})();


