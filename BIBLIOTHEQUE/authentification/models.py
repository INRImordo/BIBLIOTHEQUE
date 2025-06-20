from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone

from BIBLIOTHEQUE import settings



class Utilisateur(AbstractUser):
    email = models.EmailField(unique=True)
    nom_complet = models.CharField(max_length=150, default="Inconnu")
    accepte_conditions = models.BooleanField(default=False)
    avatar = models.ImageField(upload_to='avatars/', null=True, blank=True)
    telephone = models.CharField(max_length=20, null=True, blank=True)
    adresse = models.TextField(null=True, blank=True)
    date_inscription = models.DateTimeField(auto_now_add=True,)

    USERNAME_FIELD = 'username'  
    REQUIRED_FIELDS = ['email', 'nom_complet']

    def __str__(self):
        return self.username

    groups = models.ManyToManyField(
        'auth.Group',
        related_name='utilisateur_set',
        blank=True,
        help_text='Les groupes auxquels cet utilisateur appartient.',
        verbose_name='groupes'
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='utilisateur_permissions',
        blank=True,
        help_text='Les permissions spécifiques à cet utilisateur.',
        verbose_name='permissions utilisateur'
    )




# 
# model de livre
class Livre(models.Model):
    BADGE_CHOICES = [
        ('Nouveau', 'Nouveau'),
        ('Populaire', 'Populaire'),
        ('', 'Aucun'),
    ]
    GENRE_CHOICES = [
        ('Roman', 'Roman'),
        ('Science-Fiction', 'Science-Fiction'),
        ('Fantasy', 'Fantasy'),
        ('Policier', 'Policier'),
        ('Biographie', 'Biographie'),
        ('Histoire', 'Histoire'),
        ('Science', 'Science'),
    ]

    isbn = models.CharField(max_length=20, unique=True)
    titre = models.CharField(max_length=200)
    auteur = models.CharField(max_length=100)
    annee = models.IntegerField()
    langue = models.CharField(max_length=50)
    couverture_url = models.URLField()
    badge = models.CharField(max_length=50, choices=BADGE_CHOICES, blank=True, null=True)  
    genre = models.CharField(max_length=100, choices=GENRE_CHOICES, blank=True, null=True)  
    note = models.FloatField(default=0)
    nb_avis = models.IntegerField(default=0)
    pdf = models.FileField(upload_to='livres/pdf/', blank=True, null=True)
    visible = models.BooleanField(default=True)


    def __str__(self):
        return f"{self.titre} - {self.auteur}"



class BibliothequeUtilisateur(models.Model):
    utilisateur = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='bibliotheque')
    livre = models.ForeignKey(Livre, on_delete=models.CASCADE)
    date_consultation = models.DateTimeField(auto_now_add=True)

    # Avis de l'utilisateur sur ce livre
    note = models.FloatField(null=True, blank=True)
    commentaire = models.TextField(null=True, blank=True)

    class Meta:
        unique_together = ('utilisateur', 'livre')

    def __str__(self):
        return f"{self.utilisateur.username} - {self.livre.titre}"
