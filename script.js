// Mobile navigation toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
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

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.backgroundColor = '#FFFFFF';
        navbar.style.backdropFilter = 'none';
    }
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.work-card, .option-card, .stat-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});

// Counter animation for stats
const animateCounter = (element, target) => {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + '+';
    }, 20);
};

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-item h3');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.textContent);
                animateCounter(stat, target);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Donation amount selection
document.querySelectorAll('.amount-option').forEach(option => {
    option.addEventListener('click', () => {
        // Remove active class from all options
        document.querySelectorAll('.amount-option').forEach(opt => opt.classList.remove('active'));
        // Add active class to clicked option
        option.classList.add('active');
        
        // Update donation form input
        const donationInput = document.querySelector('input[placeholder="Donation Amount (₹)"]');
        if (donationInput) {
            donationInput.value = option.textContent.replace('₹', '');
        }
    });
});

// Form submissions
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Basic form validation
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = '#ff4444';
            } else {
                input.style.borderColor = '#E5E5E5';
            }
        });
        
        if (isValid) {
            // Show success message
            const button = form.querySelector('button[type="submit"]');
            const originalText = button.textContent;
            button.textContent = 'Thank You! Message Sent';
            button.style.backgroundColor = '#7CB342';
            
            setTimeout(() => {
                button.textContent = originalText;
                button.style.backgroundColor = '';
                form.reset();
            }, 3000);
        } else {
            // Show error message
            alert('Please fill in all required fields.');
        }
    });
});

// Add loading animation for donate button
document.querySelectorAll('.btn').forEach(btn => {
    if (btn.textContent.includes('Donate') || btn.textContent.includes('Proceed to Payment')) {
        btn.addEventListener('click', (e) => {
            if (btn.closest('form')) {
                return; // Let form handler manage this
            }
            
            e.preventDefault();
            const originalText = btn.textContent;
            btn.textContent = 'Processing...';
            btn.style.opacity = '0.7';
            
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.opacity = '1';
                // Here you would typically redirect to payment gateway
                alert('Redirecting to secure payment gateway...');
            }, 2000);
        });
    }
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroCard = document.querySelector('.hero-card');
    if (heroCard) {
        heroCard.style.transform = `translateY(${scrolled * 0.1}px)`;
    }
});

// Add active donation amount styling
const style = document.createElement('style');
style.textContent = `
    .amount-option.active {
        background: rgba(255,255,255,0.4) !important;
        transform: translateY(-3px);
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    }
`;
document.head.appendChild(style);

// Lazy loading for images
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '1';
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
        imageObserver.observe(img);
    });
});

// Add hover effects for cards
document.querySelectorAll('.work-card, .option-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-15px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Social media sharing functionality
function shareOnSocialMedia(platform) {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent('Support Premadhu Gau Seva Samiti in protecting and serving Gau Mata');
    
    let shareUrl = '';
    switch(platform) {
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
            break;
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
            break;
        case 'whatsapp':
            shareUrl = `https://wa.me/?text=${text} ${url}`;
            break;
    }
    
    if (shareUrl) {
        window.open(shareUrl, '_blank', 'width=600,height=400');
    }
}

// Add click handlers for social sharing
document.querySelectorAll('.social-links a').forEach((link, index) => {
    const platforms = ['facebook', 'twitter', 'instagram', 'youtube'];
    link.addEventListener('click', (e) => {
        e.preventDefault();
        if (index < 2) { // Only for Facebook and Twitter
            shareOnSocialMedia(platforms[index]);
        }
    });
});

console.log('Premadhu Gau Seva Samiti website loaded successfully! 🐄');
