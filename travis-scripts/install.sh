#!/bin/bash
set -ev
if [ "$BACKEND" = 1 ]; then
    pip install -r backend/requirements.txt
    pip install codecov
fi
if [ "$FRONTEND" = 1 ]; then
    npm -g i npm codecov && cd frontend && npm ci
fi