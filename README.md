## Art Génératif (p5.js)
### Temps d'attente dans les différentes agences de l'OPT NC

Projet de stage étudiant autour de la visualisation des données recueillies par les différentes agences de l'OPT NC.

La visualisation est réalisée grâce à la librairie Javascript p5.js <br>
https://p5js.org/

Ce projet utilise l'API REST des temps d'attente en agence OPT.nc <br> 
https://github.com/adriens/opt-temps-attente-agences-api

# Setup du projet

- Pull l'image docker nginx
```
docker pull nginx:alpine
```

- Aller dans le fichier où se situe le répo. GitHub
```
docker build -t orbit .
docker run -d -p 80:80 orbit
```

# Pour accéder au site
```
127.0.0.1/orbit.html
127.0.0.1/orbit.min.html
```
