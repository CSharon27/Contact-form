// DOM Elements
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const contactForm = document.getElementById('contact-form');
const resetBtn = document.getElementById('reset-btn');
const feedbackMsg = document.getElementById('form-feedback');
const inputs = document.querySelectorAll('input, select, textarea');

// Theme Toggle
const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
    body.classList.add(currentTheme);
    if (currentTheme === 'dark-mode') {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        localStorage.setItem('theme', 'light-mode');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
});

// Mobile Menu Toggle
menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    // Change icon based on state
    const icon = menuToggle.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            navLinks.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
});

// Real-time Validation
const patterns = {
    name: /^[a-zA-Z\s]{3,}$/,
    email: /^[^ ]+@[^ ]+\.[a-z]{2,3}$/,
    phone: /^\+?[\d\s-]{10,}$/
};

function validate(field, regex) {
    if (regex.test(field.value)) {
        field.parentElement.classList.remove('error');
        return true;
    } else {
        field.parentElement.classList.add('error');
        return false;
    }
}

inputs.forEach((input) => {
    input.addEventListener('keyup', (e) => {
        if (patterns[e.target.name]) {
            validate(e.target, patterns[e.target.name]);
        } else if (e.target.name === 'message') {
            if (e.target.value.trim().length > 10) {
                e.target.parentElement.classList.remove('error');
            }
        }
    });
});

// Form Submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;

    // Validate all fields
    if (!validate(contactForm.name, patterns.name)) isValid = false;
    if (!validate(contactForm.email, patterns.email)) isValid = false;
    if (contactForm.phone.value && !validate(contactForm.phone, patterns.phone)) isValid = false; // Phone is optional but should be valid if entered

    if (contactForm.subject.value === "") {
        contactForm.subject.parentElement.classList.add('error');
        isValid = false;
    } else {
        contactForm.subject.parentElement.classList.remove('error');
    }

    if (contactForm.message.value.trim().length <= 10) {
        contactForm.message.parentElement.classList.add('error');
        isValid = false;
    } else {
        contactForm.message.parentElement.classList.remove('error');
    }

    if (isValid) {
        // Simulate sending
        const submitBtn = contactForm.querySelector('.btn-submit');
        const originalText = submitBtn.innerHTML;

        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;

            // Show success message
            contactForm.reset();
            feedbackMsg.innerHTML = '<i class="fas fa-check-circle"></i> Message Sent Successfully! We will contact you soon.';
            feedbackMsg.className = 'feedback-msg success';

            // Hide feedback after 5 seconds
            setTimeout(() => {
                feedbackMsg.style.display = 'none';
            }, 5000);

        }, 2000);
    }
});

// Reset Button
resetBtn.addEventListener('click', () => {
    contactForm.reset();
    inputs.forEach(input => {
        input.parentElement.classList.remove('error');
    });
    feedbackMsg.style.display = 'none';
});
