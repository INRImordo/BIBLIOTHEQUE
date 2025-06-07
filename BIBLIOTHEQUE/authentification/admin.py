from django.contrib import admin
from authentification.models import Livre, Utilisateur
from django.core.mail import send_mass_mail
from django.contrib.auth import get_user_model


admin.site.register(Utilisateur) 

@admin.register(Livre)
class LivreAdmin(admin.ModelAdmin):
    list_display = ('titre', 'auteur', 'visible')

    def save_model(self, request, obj, form, change):
        super().save_model(request, obj, form, change)
        if not change:
            self.envoyer_notifications(obj)

    def envoyer_notifications(self, livre):
        User = get_user_model()
        utilisateurs = User.objects.exclude(email__isnull=True).exclude(email__exact='')

        messages = []
        for utilisateur in utilisateurs:
            sujet = f"Nouveau livre : {livre.titre}"
            message = (
                f"Bonjour {utilisateur.username},\n\n"
                f"Un nouveau livre intitulé '{livre.titre}' par {livre.auteur} est maintenant disponible.\n"
                f"Vous pouvez le consulter sur notre site web.\n\n"
                "Cordialement,\nL'équipe."
            )
            messages.append((sujet, message, None, [utilisateur.email]))
            print("\n \teamil envoyer\n")

        if messages:
            send_mass_mail(messages, fail_silently=False)
