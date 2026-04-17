#!/bin/bash
echo "🚀 Iniciando despliegue del Backend de TraderPulse a Google Cloud Run..."

# 1. Habilitar APIs necesarias en tu proyecto de GCP
echo "Habilitando APIs críticas (Cloud Run, Secret Manager, Cloud Build)..."
gcloud services enable run.googleapis.com secretmanager.googleapis.com cloudbuild.googleapis.com --quiet

# 2. Configurar Secret Manager
echo "=========================================================="
echo "⚠️ INSTRUCCIÓN: Sustituye tu API KEY dentro de este script"
echo "Abre `scripts/deploy_backend.sh` e ingresa tu llave de Gemini antes de continuar."
echo "=========================================================="
API_KEY="REEMPLAZAR_CON_TU_LLAVE_AQUI"

echo "Creando registro del secreto 'traderpulse-gemini-key' en Google Secret Manager..."
gcloud secrets create traderpulse-gemini-key --replication-policy="automatic" 2>/dev/null || echo "El secreto de la llave ya existe. Se creará una nueva versión."

echo "Inyectando la llave al administrador de secretos..."
echo -n "$API_KEY" | gcloud secrets versions add traderpulse-gemini-key --data-file=-

# 3. Permisos a la cuenta de servicio por defecto para extraer el secreto
PROJECT_NUMBER=$(gcloud projects describe $(gcloud config get-value core/project) --format='value(projectNumber)')
gcloud projects add-iam-policy-binding $(gcloud config get-value core/project) \
    --member="serviceAccount:$PROJECT_NUMBER-compute@developer.gserviceaccount.com" \
    --role="roles/secretmanager.secretAccessor" \
    --quiet

# 4. Compilar y Desplegar el Backend nativamente
echo "Compilando el servidor FastAPI en los Cloud Build Servers y Desplegando en Cloud Run (us-central1)..."
echo "⏳ Esto podría tomar de 3 a 5 minutos dependendiendo de la red de Google..."
gcloud run deploy traderpulse-api \
  --source ../backend \
  --region us-central1 \
  --allow-unauthenticated \
  --update-secrets=GEMINI_API_KEY=traderpulse-gemini-key:latest \
  --memory 512Mi \
  --cpu 1 \
  --quiet

echo "=========================================================================="
echo "✅ ¡Backend Desplegado! Guarda la URL final de Cloud Run (`Service URL`)."
echo "Esa es la ruta que usarás para NEXT_PUBLIC_API_URL en el script del Frontend."
echo "=========================================================================="
