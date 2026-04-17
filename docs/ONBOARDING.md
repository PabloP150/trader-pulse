# Onboarding Guide

## Introduction
Bienvenidos a la red principal de TraderPulse. Este documento establece los protocolos operativos y de despliegue principal en la nube. Todo el desarrollo secundario se encuentra en `ARCHITECTURE.md` y los respectivos `README.md` modulares.

## Production Deployment Playbook (Vercel + Google Cloud Run)

Para el despliegue del SaaS público TraderPulse usamos arquitectura Serverless con manejo estricto de secretos. Sigue estos 5 pasos de infraestructura. Tienes automatizado este flujo dentro de `scripts/deploy_backend.sh` y `scripts/deploy_frontend.sh`.

### Step 1: Google Secret Manager Setup
Manejaremos la llave de Inteligencia Artificial (Gemini) externamente desde la bóveda nativa de Google:
1. Crea un secreto en GSM llamado `traderpulse-gemini-key`.
2. Otorga los roles de `"Secret Manager Secret Accessor"` a la Service Account. 
*Nota:* `yfinance` no requiere llaves.

### Step 2: Backend Deployment (Cloud Run)
Desplegaremos el clúster de Inteligencia de Datos al backbone de Google Cloud.
1. Compila la imagen y envíala mediante `gcloud run deploy traderpulse-api --source ../backend`.
2. Asigna memoria limitando a `512MiB` el contenedor.
3. Extrae la variable desde GSM mapeando `--update-secrets=GEMINI_API_KEY=traderpulse-gemini-key:latest`.
4. Permite visibilidad web activando `--allow-unauthenticated`.

### Step 3: Frontend Deployment (Vercel)
Alojaremos nuestro Frontend Server-Side Render (SSR).
1. Entra a tu carpeta Frontend y prepara tu CLI con el comando `vercel link` o configuraciones.
2. Inyecta al canal de producción empleando el comando nativo: `vercel --prod`.

### Step 4: CORS Final Sync
Para amarrar definitivamente el origen cruzado (CORS):
1. Copia tu dominio final en la consola de Vercel.
2. Reprograma las banderas de entorno en el Backend en la nube inyectando la ruta: `gcloud run services update traderpulse-api --update-env-vars FRONTEND_URL=https://[TU-DOMINIO]`.

### Step 5: Smoke Test Documentation
La verificación de vida estricta:
1. Comprueba la salud nativa del Backend en `[URL_DE_CLOUD_RUN]/api/v1/health`. 
2. Redirígete a Vercel, inyecta un Ticker y valida visualmente el flujo FastAPI -> Gemini 3 -> Browser.
