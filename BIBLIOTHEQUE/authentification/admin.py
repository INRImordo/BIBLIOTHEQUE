from django.contrib import admin

from authentification.models import Livre, Utilisateur

# Register your models here.

admin.site.register(Livre)
admin.site.register(Utilisateur)