document.addEventListener('DOMContentLoaded', function() {
    // Animation au défilement
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.feature-card, .testimonial-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Initialiser les éléments comme invisibles
    const animatedElements = document.querySelectorAll('.feature-card, .testimonial-card');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Écouter l'événement de défilement
    window.addEventListener('scroll', animateOnScroll);
    
    // Déclencher une première fois au chargement
    animateOnScroll();
    
    // Effet de survol amélioré pour les cartes
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.feature-icon');
            icon.style.transform = 'scale(1.1)';
            icon.style.backgroundColor = 'var(--primary-color)';
            icon.style.color = 'var(--white)';
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.feature-icon');
            icon.style.transform = 'scale(1)';
            icon.style.backgroundColor = 'var(--primary-light)';
            icon.style.color = 'var(--primary-dark)';
        });
    });
    
    // Smooth scrolling pour les ancres
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});  

document.getElementById('year').textContent = new Date().getFullYear();











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



