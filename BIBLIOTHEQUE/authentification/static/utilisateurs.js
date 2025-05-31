document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const strengthBars = document.querySelectorAll('.strength-bar');
    const strengthText = document.querySelector('.strength-text');
    
    // Vérification de la force du mot de passe
    passwordInput.addEventListener('input', function() {
        const password = passwordInput.value;
        const strength = checkPasswordStrength(password);
        
        updateStrengthIndicator(strength);
    });
    
    // Validation du formulaire
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Vérification de la correspondance des mots de passe
        if (passwordInput.value !== confirmPasswordInput.value) {
            alert('Les mots de passe ne correspondent pas.');
            return;
        }
        
        // Vérification des conditions
        if (!document.getElementById('terms').checked) {
            alert('Veuillez accepter les conditions d\'utilisation.');
            return;
        }
        
        // Si tout est valide, on peut soumettre le formulaire
        alert('Inscription réussie! Bienvenue dans notre bibliothèque.');
        form.reset();
        
        // Réinitialiser l'indicateur de force
        resetStrengthIndicator();
    });
    
    // Fonction pour vérifier la force du mot de passe
    function checkPasswordStrength(password) {
        let strength = 0;
        
        // Longueur minimale
        if (password.length >= 8) strength++;
        
        // Contient des lettres minuscules et majuscules
        if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
        
        // Contient des chiffres
        if (password.match(/[0-9]/)) strength++;
        
        // Contient des caractères spéciaux
        if (password.match(/[^a-zA-Z0-9]/)) strength++;
        
        return strength;
    }
    
    // Mise à jour de l'indicateur visuel
    function updateStrengthIndicator(strength) {
        // Réinitialiser
        strengthBars.forEach(bar => {
            bar.style.backgroundColor = '#e0e0e0';
        });
        
        // Mettre à jour en fonction de la force
        for (let i = 0; i < strength; i++) {
            let color;
            
            if (strength === 1) {
                color = '#ff5252'; // Rouge
                strengthText.textContent = 'Faible';
            } else if (strength === 2) {
                color = '#ffab40'; // Orange
                strengthText.textContent = 'Moyen';
            } else if (strength === 3) {
                color = '#ffd740'; // Jaune
                strengthText.textContent = 'Fort';
            } else if (strength >= 4) {
                color = '#69f0ae'; // Vert
                strengthText.textContent = 'Très fort';
            }
            
            strengthBars[i].style.backgroundColor = color;
        }
    }
    
    // Réinitialiser l'indicateur
    function resetStrengthIndicator() {
        strengthBars.forEach(bar => {
            bar.style.backgroundColor = '#e0e0e0';
        });
        strengthText.textContent = '';
    }
});