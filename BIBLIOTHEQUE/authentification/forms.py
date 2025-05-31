
from django import forms
from django.contrib.auth.forms import UserCreationForm
from .models import Utilisateur



class InscriptionForm(forms.ModelForm):
    mot_de_passe = forms.CharField(widget=forms.PasswordInput)
    confirmez_mot_de_passe = forms.CharField(widget=forms.PasswordInput)
    accepte_conditions = forms.BooleanField(required=True)

    class Meta:
        model = Utilisateur
        fields = ['nom_complet', 'email', 'mot_de_passe', 'confirmez_mot_de_passe', 'accepte_conditions']

    def clean(self):
        cleaned_data = super().clean()
        mot_de_passe = cleaned_data.get("mot_de_passe")
        confirmez = cleaned_data.get("confirmez_mot_de_passe")
        if mot_de_passe != confirmez:
            self.add_error('confirmez_mot_de_passe', "Les mots de passe ne correspondent pas.")




from django.contrib.auth import authenticate

class ConnexionForm(forms.Form):
    username_or_email = forms.CharField(label="Nom d’utilisateur ou Email")
    password = forms.CharField(widget=forms.PasswordInput)

    def clean(self):
        cleaned_data = super().clean()
        username_or_email = cleaned_data.get("username_or_email")
        password = cleaned_data.get("password")

        if username_or_email and password:
            user = authenticate(username=username_or_email, password=password)
            if user is None:
                raise forms.ValidationError("Identifiants invalides.")
            cleaned_data['user'] = user
        return cleaned_data