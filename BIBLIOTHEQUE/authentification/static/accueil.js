// Menu mobile
document.addEventListener('DOMContentLoaded', function() {
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    
    burger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }
            }
        });
    });
    
    // Animation on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.book-card, .presentation-image');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animation
    const animatedElements = document.querySelectorAll('.book-card, .presentation-image');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Trigger animation on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
});











function ouvrirChatbot() {
    document.getElementById("chatbot").style.display = "block";
}

function fermerChatbot() {
    document.getElementById("chatbot").style.display = "none";
}

function getCSRFToken() {
    const cookie = document.cookie
        .split('; ')
        .find(row => row.startsWith('csrftoken='));
    return cookie ? cookie.split('=')[1] : '';
}

function ajouterMessage(role, texte) {
    const chatBody = document.getElementById('chat-body');
    const div = document.createElement('div');
    div.className = role === 'user' ? 'message user' : 'message bot';
    div.textContent = (role === 'user' ? '🧑‍💻 ' : '🤖 ') + texte;
    chatBody.appendChild(div);
    chatBody.scrollTop = chatBody.scrollHeight;
}

async function envoyerMessage() {
    const input = document.getElementById('chat-input');
    const message = input.value.trim();
    if (!message) return;

    // Affiche le message utilisateur
    ajouterMessage('user', message);
    input.value = '';

    // Appelle le serveur Django
    try {
        const response = await fetch('/api/chatbot/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCSRFToken()
            },
            body: JSON.stringify({ message: message })
        });

        const data = await response.json();

        if (data.reponse) {
            ajouterMessage('bot', data.reponse);
        } else if (data.response) { // au cas où tu utilises "response" au lieu de "reponse"
            ajouterMessage('bot', data.response);
        } else {
            ajouterMessage('bot', '❌ Erreur : pas de réponse du serveur.');
        }

    } catch (error) {
        console.error('Erreur de requête :', error);
        ajouterMessage('bot', '❌ Erreur de connexion au serveur.');
    }
}
