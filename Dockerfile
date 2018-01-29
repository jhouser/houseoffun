FROM python:3
ENV PYTHONUNBUFFERED 1
RUN mkdir /code
WORKDIR /code
ADD requirements.txt /code/
RUN pip install -r requirements.txt
ADD . /code/
RUN apt-get update -yq >/dev/null && apt-get upgrade -yq >/dev/null && \
    apt-get install -yq g++ libssl-dev apache2-utils curl git python make nano mysql-client >/dev/null
RUN curl -sL https://deb.nodesource.com/setup_8.x | apt-get install -y node nodejs npm >/dev/null