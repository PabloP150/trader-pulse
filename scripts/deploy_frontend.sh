@#!/bin/bash
echo "🚀 Iniciando despliegue del Frontend de TraderPulse a Vercel..."

cd ../frontend

echo "======================================================================"
echo "⚠️ INSTRUCCIÓN PREVIA AL DESPLIEGUE:"
echo "1. Debes correr 'vercel env add NEXT_PUBLIC_API_URL' o añadirlo "
echo "   en las configuraciones web de tu proyecto Vercel."
echo "   (Debe ser la URL final que te arrojó Cloud Run, sin '/' al final)"
echo "======================================================================"

echo "Enviando código fuente (Next.js 16) a la red de servidores Vercel Edge..."
vercel --prod

echo "✅ Frontend desplegado. "
echo "======================================================================"
echo "⚠️ PASO FINAL OBLIGATORIO (CORS SYNC):"
echo "Obtén el dominio público que te acaba de arrojar Vercel (ej: https://trader-pulse.vercel.app)"
echo "y actualiza el entorno CORS de tu Backend en GCP corriendo esto en tu terminal:"
echo ""
echo 'gcloud run services update traderpulse-api --region us-central1 --update-env-vars FRONTEND_URL="URL-DE-VERCEL"'
echo "======================================================================"
