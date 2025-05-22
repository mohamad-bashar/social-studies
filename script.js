// Mobile Navigation
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

burger.addEventListener('click', () => {
    // Toggle Nav
    nav.classList.toggle('nav-active');
    
    // Animate Links
    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
    
    // Burger Animation
    burger.classList.toggle('toggle');
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Statistics Counter Animation
const stats = document.querySelectorAll('.stat-number');
let counted = false;

function animateStats() {
    if (counted) return;
    
    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCount = () => {
            current += step;
            if (current < target) {
                stat.textContent = Math.floor(current);
                requestAnimationFrame(updateCount);
            } else {
                stat.textContent = target;
            }
        };
        
        updateCount();
    });
    
    counted = true;
}

// Intersection Observer for Stats Animation
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStats();
        }
    });
}, { threshold: 0.5 });

document.querySelector('.statistics').querySelectorAll('.stat-item').forEach(item => {
    observer.observe(item);
});

// Form Submission
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Here you would typically send the data to a server
    console.log('Form submitted:', data);
    
    // Show success message
    alert('تم إرسال رسالتك بنجاح!');
    contactForm.reset();
});

// Scroll to Top Button
const scrollButton = document.createElement('button');
scrollButton.innerHTML = '↑';
scrollButton.className = 'scroll-top';
document.body.appendChild(scrollButton);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollButton.classList.add('show');
    } else {
        scrollButton.classList.remove('show');
    }
});

scrollButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Add CSS for scroll to top button
const style = document.createElement('style');
style.textContent = `
    .scroll-top {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: var(--primary-color);
        color: white;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: none;
        cursor: pointer;
        display: none;
        font-size: 20px;
        z-index: 1000;
        transition: all 0.3s ease;
    }
    
    .scroll-top.show {
        display: block;
    }
    
    .scroll-top:hover {
        background-color: var(--secondary-color);
        transform: translateY(-3px);
    }
    
    .nav-active {
        display: flex;
        flex-direction: column;
        position: absolute;
        right: 0;
        top: 70px;
        background-color: var(--white);
        width: 100%;
        padding: 2rem;
        box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    }
    
    @keyframes navLinkFade {
        from {
            opacity: 0;
            transform: translateX(50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    .toggle .line1 {
        transform: rotate(-45deg) translate(-5px, 6px);
    }
    
    .toggle .line2 {
        opacity: 0;
    }
    
    .toggle .line3 {
        transform: rotate(45deg) translate(-5px, -6px);
    }
`;
document.head.appendChild(style);

// Project Cards Hover Effect
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Quiz Functionality
function initializeQuiz() {
    const quizOptions = document.querySelectorAll('.option');
    const quizFeedback = document.querySelector('.quiz-feedback');
    let hasAnswered = false;

    quizOptions.forEach(option => {
        option.addEventListener('click', () => {
            if (hasAnswered) return; // Prevent multiple answers
            hasAnswered = true;

            const isCorrect = option.getAttribute('data-correct') === 'true';
            
            // Show correct answer
            quizOptions.forEach(opt => {
                opt.disabled = true;
                if (opt.getAttribute('data-correct') === 'true') {
                    opt.classList.add('correct');
                } else if (opt === option && !isCorrect) {
                    opt.classList.add('incorrect');
                }
            });
            
            // Show feedback
            quizFeedback.textContent = isCorrect ? 
                'إجابة صحيحة! مجمع محمد بن راشد هو أكبر محطة للطاقة الشمسية في موقع واحد.' : 
                'إجابة خاطئة. الإجابة الصحيحة هي: مجمع محمد بن راشد للطاقة الشمسية';
            quizFeedback.classList.add('show');
            quizFeedback.style.backgroundColor = isCorrect ? '#4CAF50' : '#f44336';
            quizFeedback.style.color = 'white';
        });
    });
}

// Initialize quiz when the page loads
document.addEventListener('DOMContentLoaded', initializeQuiz);

// Learn More Buttons
document.querySelectorAll('.learn-more').forEach(button => {
    button.addEventListener('click', function() {
        const card = this.closest('.card');
        const title = card.querySelector('h3').textContent;
        let content = '';
        
        switch(title) {
            case 'الطاقة الشمسية':
                content = 'الطاقة الشمسية هي مصدر نظيف ومتجدد للطاقة. تستخدم الإمارات تقنيات متطورة مثل الألواح الشمسية الكهروضوئية ومحطات الطاقة الشمسية المركزة.';
                break;
            case 'طاقة الرياح':
                content = 'طاقة الرياح هي مصدر متجدد للطاقة يستخدم حركة الرياح لتوليد الكهرباء. تعمل الإمارات على تطوير مشاريع طاقة الرياح في المناطق الساحلية.';
                break;
            case 'الطاقة النووية':
                content = 'الطاقة النووية السلمية هي مصدر موثوق للطاقة. محطة براكة هي أول محطة للطاقة النووية في المنطقة العربية.';
                break;
        }
        
        // Create and show modal
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close">&times;</span>
                <h3>${title}</h3>
                <p>${content}</p>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Close modal functionality
        const closeBtn = modal.querySelector('.close');
        closeBtn.onclick = function() {
            modal.remove();
        }
        
        window.onclick = function(event) {
            if (event.target === modal) {
                modal.remove();
            }
        }
    });
});

// Add CSS for modal
const modalStyle = document.createElement('style');
modalStyle.textContent = `
    .modal {
        display: block;
        position: fixed;
        z-index: 1000;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.5);
    }
    
    .modal-content {
        background-color: var(--white);
        margin: 15% auto;
        padding: 2rem;
        border-radius: 10px;
        width: 80%;
        max-width: 600px;
        position: relative;
    }
    
    .close {
        position: absolute;
        right: 1rem;
        top: 1rem;
        font-size: 1.5rem;
        cursor: pointer;
    }
    
    .close:hover {
        color: var(--primary-color);
    }
`;
document.head.appendChild(modalStyle);

// Resource Cards Animation
document.querySelectorAll('.resource-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
}); 