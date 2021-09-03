## Projet 6 - Construisez une API sécurisée pour une application d'avis gastronomiques
# PIIQUANTE #

Piiquante se dédie à la création de sauces épicées dont les recettes sont gardées secrètes. 
Pour tirer parti de son succès et générer davantage de buzz, l'entreprise souhaite créer une application web dans laquelle les utilisateurs peuvent ajouter leurs sauces préférées et liker ou disliker les sauces ajoutées par les autres.

### API Errors 
Les erreurs éventuelles doivent être renvoyées telles qu'elles sont produites, sans modification ni ajout. Si nécessaire, utilisez une nouvelle Error().

### API Routes
Toutes les routes sauce pour les sauces doivent disposer d’une autorisation (le token est envoyé par le front-end avec l'en-tête d’autorisation : « Bearer <token> »).
Avant que l'utilisateur puisse apporter des modifications à la route sauce, le code doit vérifier si l'userId actuel correspond à l'userId de la sauce. 
Si l'userId ne correspond pas, renvoyer « 403: unauthorized request. » Cela permet de s'assurer que seul le propriétaire de la sauce peut apporter des modifications à celle-ci.

### Data ModelsSauce
	● userId : String — l'identifiant MongoDB unique de l'utilisateur qui a créé la sauce
	● name : String — nom de la sauce
	● manufacturer : String — fabricant de la sauce
	● description : String — description de la sauce
	● mainPepper : String — le principal ingrédient épicé de la sauce
	● imageUrl : String — l'URL de l'image de la sauce téléchargée par l'utilisateur
	● heat : Number — nombre entre 1 et 10 décrivant la sauce
	● likes : Number — nombre d'utilisateurs qui aiment (= likent) la sauce
	● dislikes : Number — nombre d'utilisateurs qui n'aiment pas (= dislike) la sauce
	● usersLiked : [ "String <userId>" ] — tableau des identifiants des utilisateurs qui ont aimé (= liked) la sauce
	● usersDisliked : [ "String <userId>" ] — tableau des identifiants des utilisateurs qui n'ont pas aimé (= disliked) la sauce
Utilisateur
	● email : String — adresse e-mail de l'utilisateur [unique]
	● password : String — mot de passe de l'utilisateur haché
	
### Exigences de sécurité
	● Le mot de passe de l'utilisateur doit être haché.
	● L'authentification doit être renforcée sur toutes les routes sauce requises.
	● Les adresses électroniques dans la base de données sont uniques et un plugin Mongoose approprié est utilisé pour garantir leur unicité et signaler les erreurs.
	● La sécurité de la base de données MongoDB (à partir d'un service tel que MongoDB Atlas) ne doit pas empêcher l'application de se lancer sur la machine d'un utilisateur.
	● Un plugin Mongoose doit assurer la remontée des erreurs issues de la base de données.
	● Les versions les plus récentes des logiciels sont utilisées avec des correctifs de sécurité actualisés.
	● Le contenu du dossier images ne doit pas être téléchargé sur GitHub.

