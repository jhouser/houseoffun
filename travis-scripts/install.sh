#!/bin/bash
set -ev
if [ "$TO_TEST" = "BACKEND" ]; then
    pip install -r backend/requirements.txt
    pip install codecov
fi
if [ "$TO_TEST" = "FRONTEND" ]; then
    cd frontend && npm install && npm install -g cypress codecov
fi