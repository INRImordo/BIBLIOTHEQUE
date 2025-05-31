from django.urls import path
from . import views

urlpatterns = [
    path('index/', views.index, name='index'),
    path('utilisateurs/', views.utilisateurs, name='utilisateurs'),
    path('connexion/', views.connexion, name='connexion'),
    path('accueil/', views.accueil, name='accueil'),
    path('catalogue/', views.catalogue, name='catalogue'),
    path('espace_lecteur/', views.espace_lecteur, name='espace_lecteur'),
    path('lecture/', views.lecture, name='lecture'),
]