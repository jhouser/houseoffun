#!/bin/bash
set -ev
if [ "$TO_TEST" = "BACKEND" ]; then
    mysql -e 'create database travis_ci;'
    mv backend/api/.env.travis backend/api/.env
    python backend/manage.py migrate
fi
if [ "$TO_TEST" = "FRONTEND" ] && [ "$TESTS" = "e2e" ]; then
    npm start -- --silent &
fi