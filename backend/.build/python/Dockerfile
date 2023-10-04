# pull official base image
FROM python:3.9.6-alpine

# set work directory
WORKDIR /usr/src/app
RUN apk update && apk add build-base gcc jpeg-dev zlib-dev python3-dev musl-dev postgresql-dev
# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# install dependencies
RUN pip install --upgrade pip
COPY ../../requirements.txt .
RUN cat requirements.txt
RUN pip install -r requirements.txt

# copy project
COPY ../../entrypoint.sh .
RUN sed -i 's/\r$//g' /usr/src/app/entrypoint.sh
RUN chmod +x /usr/src/app/entrypoint.sh

COPY ../.. .
ENTRYPOINT ["/usr/src/app/entrypoint.sh"]
#FROM python:3.9.2
#
#WORKDIR /usr/src/app
#
#ENV PYTHONDONTWRITEBYTECODE 1
#ENV PYTHONUNBUFFERED 1
#
##RUN apt-get install wget ca-certificates \
##    && wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | apt-key add - \
##    && sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt/ `lsb_release -cs`-pgdg main" >> /etc/apt/sources.list.d/pgdg.list' \
##    && apt-get update
#RUN apt-get update && apt-get -y install postgres-server-dev-all \
#    && rm -rf /var/lib/apt/lists/*
#
#RUN pip install --upgrade pip
#COPY ./requirements.txt .
#RUN pip install -r requirements.txt
#
#COPY ./entrypoint.sh .
#RUN sed -i 's/\r$//g' /usr/src/app/entrypoint.sh
#RUN chmod +x /usr/src/app/entrypoint.sh
#
#COPY . .
#ENTRYPOINT ["/usr/src/app/entrypoint.sh"]
