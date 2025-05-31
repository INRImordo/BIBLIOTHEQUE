document.addEventListener('DOMContentLoaded', function() {
    // Menu mobile
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    
    burger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });
    
    // Navigation dans l'espace lecteur
    const sidebarLinks = document.querySelectorAll('.sidebar-nav a');
    const contentSections = document.querySelectorAll('.content-section');
    
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Retirer la classe active de tous les liens et sections
            sidebarLinks.forEach(l => l.classList.remove('active'));
            contentSections.forEach(s => s.classList.remove('active'));
            
            // Ajouter la classe active au lien cliqué
            this.classList.add('active');
            
            // Afficher la section correspondante
            const targetId = this.getAttribute('href');
            document.querySelector(targetId).classList.add('active');
        });
    });
    
    // Bouton de déconnexion
    const logoutBtn = document.querySelector('.btn-logout');
    logoutBtn.addEventListener('click', function(e) {
        e.preventDefault();
        if (confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
            // Redirection vers la page d'accueil
            window.location.href = 'index.html';
        }
    });
    
    // Bouton de suppression de compte
    const deleteAccountBtn = document.querySelector('.btn-delete-account');
    if (deleteAccountBtn) {
        deleteAccountBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (confirm('Êtes-vous sûr de vouloir supprimer définitivement votre compte ? Cette action est irréversible.')) {
                alert('Votre compte a été supprimé. Vous allez être redirigé vers la page d\'accueil.');
                // Redirection vers la page d'accueil
                window.location.href = 'index.html';
            }
        });
    }
    
    // Boutons d'action dans l'historique
    const favoriteBtns = document.querySelectorAll('.btn-favorite');
    favoriteBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            this.classList.toggle('active');
            
            if (this.classList.contains('active')) {
                this.innerHTML = '<i class="fas fa-heart"></i> Favori';
            } else {
                this.innerHTML = '<i class="fas fa-heart"></i> Ajouter aux favoris';
            }
        });
    });
    
    const wishlistBtns = document.querySelectorAll('.btn-wishlist');
    wishlistBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            this.classList.toggle('active');
            
            if (this.classList.contains('active')) {
                this.innerHTML = '<i class="fas fa-bookmark"></i> Dans la liste';
            } else {
                this.innerHTML = '<i class="fas fa-bookmark"></i> Liste de souhaits';
            }
        });
    });
    
    // Boutons de suppression dans les favoris et la liste de souhaits
    const removeFavoriteBtns = document.querySelectorAll('.remove-favorite');
    removeFavoriteBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            if (confirm('Retirer ce livre de vos favoris ?')) {
                this.closest('.favorite-item').remove();
            }
        });
    });
    
    const removeWishlistBtns = document.querySelectorAll('.remove-wishlist');
    removeWishlistBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            if (confirm('Retirer ce livre de votre liste de souhaits ?')) {
                this.closest('.wishlist-item').remove();
            }
        });
    });
    
    // Bouton de déplacement vers les favoris
    const moveToFavoriteBtns = document.querySelectorAll('.btn-move-favorite');
    moveToFavoriteBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            if (confirm('Déplacer ce livre vers vos favoris ?')) {
                this.closest('.wishlist-item').remove();
                // Ici, vous pourriez ajouter le livre aux favoris via une API
                alert('Livre déplacé vers les favoris !');
            }
        });
    });
    
    // Animation au défilement
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.favorite-item, .wishlist-item, .history-item, .setting-card');
        
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
    const animatedElements = document.querySelectorAll('.favorite-item, .wishlist-item, .history-item, .setting-card');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Trigger animation on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
});