document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const rememberCheckbox = document.getElementById('remember');
    const submitButton = document.querySelector('.btn');

    // Vérifier s'il y a des identifiants enregistrés
    if (localStorage.getItem('rememberedEmail')) {
        emailInput.value = localStorage.getItem('rememberedEmail');
        rememberCheckbox.checked = true;
    }

    // Validation du formulaire
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Récupérer les valeurs
        const email = emailInput.value.trim();
        const password = passwordInput.value;
        const remember = rememberCheckbox.checked;
        
        // Validation simple
        if (!email || !password) {
            showError('Veuillez remplir tous les champs');
            return;
        }
        
        // Simuler une connexion (remplacer par une vraie requête AJAX)
        simulateLogin(email, password, remember);
    });

    // Fonction pour simuler la connexion
    function simulateLogin(email, password, remember) {
        // Afficher l'indicateur de chargement
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner loading"></i> Connexion en cours...';
        
        // Simuler un délai de requête
        setTimeout(function() {
            // Ici, vous devriez faire une vraie vérification avec votre backend
            // Pour cet exemple, nous supposons que la connexion réussit toujours
            
            // Si "Se souvenir de moi" est coché
            if (remember) {
                localStorage.setItem('rememberedEmail', email);
            } else {
                localStorage.removeItem('rememberedEmail');
            }
            
            // Redirection vers la page d'accueil (simulée)
            showSuccess('Connexion réussie! Redirection en cours...');
            
            // Réinitialiser le bouton
            submitButton.disabled = false;
            submitButton.innerHTML = '<i class="fas fa-sign-in-alt"></i> Se connecter';
            
            // Simuler une redirection
            setTimeout(function() {
                window.location.href = 'dashboard.html'; // Remplacez par votre page de destination
            }, 1500);
            
        }, 1500);
    }

    // Afficher un message d'erreur
    function showError(message) {
        // Supprimer les anciens messages d'erreur
        const oldError = document.querySelector('.error-message');
        if (oldError) oldError.remove();
        
        // Créer et afficher le nouveau message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.style.color = '#d32f2f';
        errorDiv.style.marginTop = '10px';
        errorDiv.style.textAlign = 'center';
        
        form.insertBefore(errorDiv, form.lastElementChild);
        
        // Supprimer le message après 5 secondes
        setTimeout(function() {
            errorDiv.remove();
        }, 5000);
    }

    // Afficher un message de succès
    function showSuccess(message) {
        // Supprimer les anciens messages
        const oldMessage = document.querySelector('.success-message');
        if (oldMessage) oldMessage.remove();
        
        // Créer et afficher le nouveau message
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.textContent = message;
        successDiv.style.color = '#2e7d32';
        successDiv.style.marginTop = '10px';
        successDiv.style.textAlign = 'center';
        successDiv.style.fontWeight = 'bold';
        
        form.insertBefore(successDiv, form.lastElementChild);
        
        // Supprimer le message après 5 secondes
        setTimeout(function() {
            successDiv.remove();
        }, 5000);
    }
});