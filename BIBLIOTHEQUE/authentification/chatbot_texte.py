import re

class ChatbotTexte:
    def __init__(self):
        self.reponses = {
            ("bonjour", "man", "salut", "hello", "mbola", "yo"): "Bonjour 👋 ! Comment puis-je vous aider ?",
            ("prix", "coûts", "tarifs", "ça coûte combien", "c’est combien", "le prix là"): "Nos prix commencent à partir de 10 000 FCFA.",
            ("livre", "catalogue", "produits", "ouvrages", "bouquins", "ouvrage"): "📚 Vous pouvez parcourir notre catalogue en ligne.",
            ("livraison", "expédition", "envoyer", "envoyez", "envoyé", "transfert"): "🚚 Nous livrons partout au Cameroun sous 72 heures maximum.",
            ("paiement", "payer", "moyens de paiement", "orange money", "mtn momo", "payer comment"): "Nous acceptons Orange Money, MTN MoMo, carte bancaire et paiement à la livraison.",
            ("remboursement", "retour", "échanger", "changer", "renvoyer"): "✅ Vous pouvez retourner un livre sous 7 jours après réception.",
            ("commande", "acheter", "achat", "je veux", "je prends", "je commande", "je veux commander"): "🛒 Pour commander, ajoutez simplement un livre au panier et suivez les étapes.",
            ("auteur", "auteurs", "écrivain", "écrivaine", "qui a écrit"): "✍️ Nous proposons des œuvres de plus de 200 auteurs africains et internationaux.",
            ("jeunesse", "enfants", "ados", "gosses", "petits frères"): "👦👧 Nous avons une section dédiée aux livres jeunesse.",
            ("promotion", "promo", "réduction", "soldes", "bon plan", "moins cher"): "🎉 Des promotions sont régulièrement disponibles dans notre espace promo.",
            ("disponible", "stock", "rupture", "encore disponible", "y en a encore"): "📦 La disponibilité est précisée dans la fiche de chaque livre.",
            ("adresse", "lieu", "localisation", "boutique", "où vous êtes", "vous êtes où"): "📍 Nous sommes basés à Yaoundé, Cameroun, mais notre bibliothèque est entièrement en ligne.",
            ("contact", "numéro", "téléphone", "whatsapp"): "📱 Vous pouvez nous contacter par WhatsApp au +237 6 XX XX XX XX.",
            ("heures", "ouverture", "fermeture", "horaire", "heures d'ouverture"): "🕒 Le site est accessible 24h/24. Notre support client est disponible de 08h à 18h.",
            ("formation", "cours", "lecture", "apprendre", "club de lecture"): "🎓 Nous proposons aussi des ateliers de lecture et des clubs virtuels chaque mois.",
            ("reçu", "facture", "preuve de paiement"): "📄 Un reçu vous sera envoyé par email après chaque commande.",
            ("besoin d'aide", "aide", "je comprends pas", "explication", "aidez-moi"): "🤖 Pas de souci, je suis là pour vous aider. Posez votre question.",
            ("ancien livre", "occasion", "deuxième main", "usé", "déjà utilisé"): "📘 Nous avons également une section de livres d’occasion à petits prix.",
            ("livres scolaires", "programme", "école", "manuels", "classe", "scolaire"): "🏫 Retrouvez des livres scolaires alignés au programme camerounais dans notre collection.",
            ("avis", "note", "notation", "commentaire", "critiques"): "⭐ Vous pouvez consulter les avis d'autres lecteurs dans les fiches de chaque livre.",
            ("livres religieux", "bible", "coran", "spirituel", "église", "mosquée"): "🙏 Nous avons une catégorie dédiée aux livres religieux et spirituels.",
            ("aide au choix", "je cherche", "me conseiller", "quel livre", "me recommander"): "📚 Dites-moi ce que vous aimez, je peux vous recommander un livre adapté.",
            ("livres camerounais", "auteurs locaux", "culture camerounaise", "littérature camerounaise"): "🇨🇲 Nous mettons en avant les œuvres d’auteurs camerounais. Découvrez-les dans notre section locale.",
            ("nouveautés", "nouveaux livres", "derniers arrivages", "derniers livres"): "🆕 Consultez notre section Nouveautés pour voir les derniers ajouts.",
            ("format", "numérique", "ebook", "papier", "livre physique"): "📖 La plupart de nos livres sont en format papier. Certains titres sont aussi disponibles en format numérique.",
            ("langue", "français", "anglais", "langue du livre"): "🈶 Nos livres sont disponibles en français et en anglais. La langue est indiquée sur chaque fiche.",
            ("livres universitaires", "études supérieures", "licence", "master", "mémoire"): "🎓 Nous avons des livres pour les étudiants du supérieur, dans plusieurs filières.",
            ("livres business", "entrepreneuriat", "argent", "finance", "gestion"): "💼 Vous cherchez des livres sur le business ou l'entrepreneuriat ? Nous avons ce qu’il vous faut.",
            ("livres pour femmes", "livres féminins", "autrices", "femmes puissantes"): "👩‍🎓 Découvrez notre sélection inspirante écrite par ou pour les femmes.",
            ("délais", "quand je reçois", "ou", "délai", "ça prend combien de temps"): "⏱️ En général, la livraison se fait entre 24h et 72h selon votre localité.",
            ("service client", "conseiller", "assistance", "support"): "💬 Notre équipe est disponible pour vous accompagner du lundi au samedi.",
            ("compte", "inscription", "se connecter", "profil"): "👤 Vous pouvez créer un compte ou vous connecter pour suivre vos commandes.",
            ("problème", "bug", "ça marche pas", "erreur"): "🚧 Si vous avez un souci technique, décrivez-le et nous vous aiderons rapidement.",
            ("livres étrangers", "traductions", "importé", "international"): "🌍 Oui, nous proposons aussi des livres traduits et importés.",
            ("livres jeunesse camerounaise", "contes camerounais", "histoires pour enfants du pays"): "👶 Nous avons des contes et livres pour enfants inspirés de la culture locale.",
            ("livres en langues locales", "douala", "fulfuldé", "ewondo", "bassa"): "🗣️ Nous avons quelques ouvrages en langues nationales. C’est rare mais précieux.",
            ("don", "offrir", "cadeau", "livre à offrir"): "🎁 Offrez un livre à un proche ! C’est un excellent cadeau, même à distance.",
            ("partenariat", "revendre", "affiliation", "collaboration"): "🤝 Vous êtes intéressé par un partenariat ou la revente ? Contactez notre service pro.",

        }



    def nettoyer(self, texte):
        texte = texte.lower()
        texte = re.sub(r"[^\w\s]", "", texte)
        return texte

    def repondre(self, message):
        message = self.nettoyer(message)
        for mots_cles, reponse in self.reponses.items():
            if any(mot in message for mot in mots_cles):
                return reponse
        return "🤖 Je n'ai pas compris. Essayez avec d'autres mots."

