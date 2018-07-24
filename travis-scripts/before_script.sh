#!/bin/bash
set -ev
if [ "$BACKEND" = 1 ]; then
    mysql -e 'create database travis_ci;'
    mv backend/api/.env.travis backend/api/.env
    python backend/manage.py migrate
fi

if [ "$TESTS" = "e2e" ]; then
    cd frontend && python load_fixtures.sh
    python backend/manage.py runserver 0.0.0.0:8000 &
    cd frontend && npm start -- --silent &
fi