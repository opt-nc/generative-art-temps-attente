[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Test, Release](https://github.com/opt-nc/generative-art-temps-attente/actions/workflows/release-publish.yml/badge.svg)](https://github.com/opt-nc/generative-art-temps-attente/actions/workflows/test-release.yml)
[![Docker Image](https://img.shields.io/badge/docker-homepage-blue)](https://hub.docker.com/r/optnc/generative-art-temps-attente)
![Docker Pulls](https://img.shields.io/docker/pulls/optnc/generative-art-temps-attente)
![Docker Image Size (latest by date)](https://img.shields.io/docker/image-size/optnc/generative-art-temps-attente/latest)
![Docker Stars](https://img.shields.io/docker/stars/optnc/generative-art-temps-attente)
![Docker Image Version (latest by date)](https://img.shields.io/docker/v/optnc/generative-art-temps-attente/latest)

# Art Génératif (p5.js)

## :speech_balloon: Temps d'attente dans les différentes agences de l'OPT NC

Projet autour de la visualisation des données recueillies par les différentes agences de l'OPT NC.

👉 Tous les détails sur ce [post dédié](https://dev.to/optnc/from-waiting-time-metrics-to-generative-art-2d6d).

La visualisation est réalisée grâce à la librairie Javascript [`p5.js`](https://p5js.org/).

Ce projet utilise l'[API REST des temps d'attente en agence OPT.nc](https://github.com/opt-nc/opt-temps-attente-agences-api).

## :rocket: Lancer les visualisations

```shell
git clone https://github.com/opt-nc/opt-temps-attente-agences-api.git
opt-temps-attente-agences-api
docker-compose up -d
docker ps
```

## :fireworks: Pour accéder aux visualisations

- <http://127.0.0.1/> (Projet par défaut : Orbit)
- <http://127.0.0.1/orbit.min.html> (Version allégée de métriques)
- <http://127.0.0.1/jumpers.html>
- <http://127.0.0.1/gravity.html>

# 🔖 Ressources

- [Article dédié sur DEV.to](https://dev.to/optnc/from-waiting-time-metrics-to-generative-art-2d6d)
