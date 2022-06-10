[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Test, Release](https://github.com/opt-nc/generative-art-temps-attente/actions/workflows/release-publish.yml/badge.svg)](https://github.com/opt-nc/generative-art-temps-attente/actions/workflows/test-release.yml)
[![Docker Image](https://img.shields.io/badge/docker-homepage-blue)](https://hub.docker.com/r/optnc/generative-art-temps-attente)
![Docker Pulls](https://img.shields.io/docker/pulls/optnc/generative-art-temps-attente)
![Docker Image Size (latest by date)](https://img.shields.io/docker/image-size/optnc/generative-art-temps-attente)
![Docker Stars](https://img.shields.io/docker/stars/optnc/generative-art-temps-attente)
![Docker Image Version (latest by date)](https://img.shields.io/docker/v/optnc/generative-art-temps-attente?arch=amd64&sort=date)

# Art Génératif (p5.js)

## :speech_balloon: Temps d'attente dans les différentes agences de l'OPT NC

Projet de stage étudiant autour de la visualisation des données recueillies par les différentes agences de l'OPT NC.

La visualisation est réalisée grâce à la librairie Javascript p5.js <br>
<https://p5js.org/>

Ce projet utilise l'API REST des temps d'attente en agence OPT.nc <br>
<https://github.com/adriens/opt-temps-attente-agences-api>

## :rocket: Lancer les visualisations

### :whale: Par Docker
```
docker run --name opt-temps-attente-agences-viz -d -p 80:80 optnc/generative-art-temps-attente
docker run --name opt-temps-attente-agences-api -d -p 8081:8081 optnc/opt-temps-attente-agences-api
docker ps
```

### :gear: Ou localement
```sh
git clone https://github.com/adriens/generative-art-temps-attente.git
cd generative-art-temps-attente
docker-compose up -d
docker ps
```

## :fireworks: Pour accéder aux visualisations

* <http://127.0.0.1/> (Projet par défaut : Orbit)
* <http://127.0.0.1/orbit.min.html> (Version allégée de métriques)
* <http://127.0.0.1/jumpers.html>
* <http://127.0.0.1/gravity.html>
