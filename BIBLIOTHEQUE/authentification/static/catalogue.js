document.addEventListener('DOMContentLoaded', function() {
    // Menu mobile
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    
    burger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });
    
    // Filtres avancés
    const filterToggle = document.querySelector('.filter-toggle');
    const advancedFilters = document.querySelector('.advanced-filters');
    
    filterToggle.addEventListener('click', function() {
        advancedFilters.classList.toggle('active');
        this.textContent = advancedFilters.classList.contains('active') ? 
            'Masquer les filtres' : 'Filtres avancés';
    });
    
    // Changement de vue (grille/liste)
    const viewOptions = document.querySelectorAll('.view-option');
    const booksGrid = document.querySelector('.books-grid');
    
    viewOptions.forEach(option => {
        option.addEventListener('click', function() {
            viewOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            if (this.dataset.view === 'list') {
                booksGrid.classList.add('list-view');
            } else {
                booksGrid.classList.remove('list-view');
            }
        });
    });
    
    // Modal des détails du livre
    const bookCards = document.querySelectorAll('.book-card');
    const bookModal = document.querySelector('.book-modal');
    const closeModal = document.querySelector('.close-modal');
    const modalTitle = document.querySelector('.modal-title');
    const modalAuthor = document.querySelector('.modal-author');
    const modalCover = document.querySelector('.modal-cover img');
    const modalIsbn = document.querySelector('.modal-isbn');
    const modalYear = document.querySelector('.modal-year');
    const modalLanguage = document.querySelector('.modal-language');
    const modalGenre = document.querySelector('.modal-genre');
    const modalPublisher = document.querySelector('.modal-publisher');
    const modalPages = document.querySelector('.modal-pages');
    const modalRating = document.querySelector('.modal-rating .stars');
    const ratingCount = document.querySelector('.rating-count');
    const descriptionText = document.querySelector('.description-text');
    
    // Données simulées pour les livres (en réalité, cela viendrait d'une API)
    const booksData = {
        "978-2070360024": {
            title: "L'Étranger",
            author: "Albert Camus",
            cover: "https://m.media-amazon.com/images/I/41R3K5APW5L._SY425_.jpg",
            year: "1942",
            language: "Français",
            genre: "Roman philosophique",
            publisher: "Gallimard",
            pages: "185",
            isbn: "978-2070360024",
            rating: 4.5,
            ratingCount: 128,
            description: "L'Étranger est un roman d'Albert Camus, paru en 1942. Il prend place dans la société algérienne française des années 1940. Le personnage de Meursault, employé de bureau indifférent à tout ce qui l'entoure, y est condamné à mort pour avoir tué un homme sur une plage, un crime qu'il a commis sans motif apparent, sous l'effet de la chaleur et du soleil."
        },
        "978-2070368228": {
            title: "1984",
            author: "George Orwell",
            cover: "https://m.media-amazon.com/images/I/51NBrkGdBUL._SY425_.jpg",
            year: "1949",
            language: "Anglais",
            genre: "Science-fiction, Dystopie",
            publisher: "Gallimard",
            pages: "368",
            isbn: "978-2070368228",
            rating: 5,
            ratingCount: 356,
            description: "1984 est un roman de George Orwell publié en 1949. Il décrit une société totalitaire où le gouvernement, dirigé par Big Brother, contrôle tous les aspects de la vie des citoyens, y compris leurs pensées. Le protagoniste, Winston Smith, travaille au ministère de la Vérité où il réécrit l'histoire pour la faire correspondre à la version officielle du Parti."
        },
        "978-2290032726": {
            title: "Le Petit Prince",
            author: "Antoine de Saint-Exupéry",
            cover: "https://m.media-amazon.com/images/I/51N7F-F5QEL._SY425_.jpg",
            year: "1943",
            language: "Français",
            genre: "Conte philosophique",
            publisher: "Gallimard",
            pages: "96",
            isbn: "978-2290032726",
            rating: 5,
            ratingCount: 421,
            description: "Le Petit Prince est une œuvre de langue française, la plus connue d'Antoine de Saint-Exupéry. Publié en 1943 à New York, c'est un conte poétique et philosophique sous l'apparence d'un conte pour enfants. Le narrateur est un aviateur qui, à la suite d'une panne de moteur, a dû se poser en catastrophe dans le désert du Sahara et tente de réparer son avion."
        }
    };
    
    bookCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Empêche l'ouverture du modal si on clique sur le bouton "Détails"
            if (e.target.classList.contains('details-btn')) {
                const isbn = this.dataset.isbn;
                const book = booksData[isbn];
                
                if (book) {
                    modalTitle.textContent = book.title;
                    modalAuthor.textContent = book.author;
                    modalCover.src = book.cover;
                    modalCover.alt = `${book.title} - ${book.author}`;
                    modalIsbn.textContent = book.isbn;
                    modalYear.textContent = book.year;
                    modalLanguage.textContent = book.language;
                    modalGenre.textContent = book.genre;
                    modalPublisher.textContent = book.publisher;
                    modalPages.textContent = book.pages;
                    descriptionText.textContent = book.description;
                    
                    // Mise à jour des étoiles de notation
                    const stars = modalRating.querySelectorAll('i');
                    const fullStars = Math.floor(book.rating);
                    const hasHalfStar = book.rating % 1 >= 0.5;
                    
                    stars.forEach((star, index) => {
                        if (index < fullStars) {
                            star.className = 'fas fa-star';
                        } else if (index === fullStars && hasHalfStar) {
                            star.className = 'fas fa-star-half-alt';
                        } else {
                            star.className = 'far fa-star';
                        }
                    });
                    
                    ratingCount.textContent = `(${book.ratingCount} avis)`;
                    
                    // Afficher le modal
                    bookModal.style.display = 'block';
                    document.body.style.overflow = 'hidden';
                }
            }
        });
    });
    
    // Fermer le modal
    closeModal.addEventListener('click', function() {
        bookModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    // Fermer le modal en cliquant à l'extérieur
    bookModal.addEventListener('click', function(e) {
        if (e.target === this) {
            bookModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Animation au défilement
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.book-card, .search-box');
        
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
    const animatedElements = document.querySelectorAll('.book-card, .search-box');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Trigger animation on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
});


document.addEventListener('DOMContentLoaded', function () {
    const advancedFilters = document.querySelector('.advanced-filters');

    // Vérifie s’il y a des paramètres de filtre actifs dans l'URL
    const urlParams = new URLSearchParams(window.location.search);
    const hasFilters = ['genre', 'langue', 'annee_min', 'annee_max', 'editeur', 'tri'].some(param => urlParams.get(param));

    if (hasFilters) {
        advancedFilters.style.display = 'block';
    }

    // Afficher les filtres manuellement (par le bouton sliders)
    const toggleBtn = document.querySelector('.filter-toggle');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            advancedFilters.style.display = (advancedFilters.style.display === 'block') ? 'none' : 'block';
        });
    }
});