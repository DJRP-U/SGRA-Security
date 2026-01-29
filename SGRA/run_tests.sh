#!/bin/bash

# Script para ejecutar pruebas del backend y generar reporte HTML
# Uso: ./run_tests.sh

# Configuración de rutas
PROJECT_DIR="/media/diego/Windows_T1/Sandbox/Proyecto_SGRA/SGRA"
VENV_PYTHON="/media/diego/Windows_T1/Sandbox/Proyecto_SGRA/venv/bin/python3"
REPORT_FILE="backend_test_report.html"

# Colores para output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}Iniciando ejecución de pruebas del backend...${NC}"
echo "Directorio del proyecto: $PROJECT_DIR"
echo "Reporte: $REPORT_FILE"

# Navegar al directorio del proyecto
cd "$PROJECT_DIR" || exit 1

# Exportar PYTHONPATH para que pytest encuentre el módulo app
export PYTHONPATH=.

# Ejecutar pytest
# -v: verbose
# --html: genera reporte HTML (requiere pytest-html)
# --self-contained-html: css incrustado en el html para portabilidad
"$VENV_PYTHON" -m pytest app/tests/ \
    --html="$REPORT_FILE" \
    --self-contained-html \
    -v

EXIT_CODE=$?

if [ $EXIT_CODE -eq 0 ]; then
    echo -e "${GREEN}Todas las pruebas pasaron exitosamente.${NC}"
else
    echo -e "${RED}Algunas pruebas fallaron. Revisa el reporte para más detalles.${NC}"
fi

echo "Reporte generado en: $PROJECT_DIR/$REPORT_FILE"
exit $EXIT_CODE
