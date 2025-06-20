"""
URL configuration for BIBLIOTHEQUE project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

from authentification import views

urlpatterns = [
    path('admin/', admin.site.urls),
    # path('', include('authentification.urls')),

    
    path('', views.index, name='index'),
    path('inscription/', views.inscription_view, name='utilisateurs'),
    path('connexion/', views.connexion, name='connexion'),
    path('accueil/', views.accueil, name='accueil'),
    path('catalogue/', views.catalogue, name='catalogue'),
    path('espace_lecteur/', views.espace_lecteur, name='espace_lecteur'),
    path('lecture/', views.lecture, name='lecture'),
    path('lire/<int:livre_id>/', views.lire_livre, name='lire_livre'),



    path('api/chatbot/', views.chatbot_view, name='chatbot'),
    
    path('bibliotheque/', views.ma_bibliotheque, name='ma_bibliotheque'),
    path('bibliotheque/supprimer/<int:livre_id>/', views.supprimer_livre, name='supprimer_livre'),
    path('ajouter_bibliotheque/<int:livre_id>/', views.ajouter_a_bibliotheque, name='ajouter_a_bibliotheque'),


]
