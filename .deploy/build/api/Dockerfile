FROM python:3.11.6-alpine3.18 as base

ARG USER_UID
ARG USER_NAME

RUN adduser \
    --disabled-password \
    --gecos "" \
    --home "/nonexistent" \
    --shell "/sbin/nologin" \
    --no-create-home \
    --uid "${USER_UID}" \
    "${USER_NAME}"

RUN apk update  \
    && apk add build-base gcc jpeg-dev zlib-dev python3-dev musl-dev postgresql-dev libpq

ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

WORKDIR /app

COPY requirements.txt .

FROM base as dev

RUN pip install --upgrade pip && \
    pip install -r requirements.txt

ENTRYPOINT ["python", "manage.py", "runserver", "0.0.0.0:8000"]

FROM base as prod

RUN pip install --upgrade pip &&  \
    pip wheel --no-cache-dir --no-deps --wheel-dir /app/wheels -r requirements.txt && \
    pip install --no-cache /app/wheels/*

COPY ../../../backend/.build/python .

USER ${USER_NAME}:${USER_NAME}

ENTRYPOINT ["gunicorn", "telemedecine.wsgi:application", "--bind 0.0.0.0:8000"]
