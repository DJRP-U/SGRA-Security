#!/bin/bash

# Ensure virtual environment is active or use python from venv
PYTHON_EXEC="./venv/bin/python"
if [ ! -f "$PYTHON_EXEC" ]; then
    echo "Virtual environment not found at ./venv"
    exit 1
fi

export PYTHONPATH=SGRA

echo "Running tests and generating report..."

# -v: Verbose
# --html=backend_integration_report.html: Generate HTML report
# --self-contained-html: CSS inside HTML
# --capture=sys: Capture stdout/stderr (default)
# -rP: Show stdout for passing tests in console summary (optional, remove if too noisy)

$PYTHON_EXEC -m pytest SGRA/app/tests/test_flujos_estados.py \
    --html=backend_integration_report.html \
    --self-contained-html \
    -v \
    -rP 

echo "Done. Report generated at backend_integration_report.html"
