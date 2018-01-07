#!/bin/bash
set -ev
mysql -e 'create database travis_ci;'
python manage.py migrate
if [[ "${TESTFOLDER}" == *"functional"* ]]; then
    sh -e /etc/init.d/xvfb start
    sleep 3 # give xvfb some time to start
    python manage.py collectstatic
fi