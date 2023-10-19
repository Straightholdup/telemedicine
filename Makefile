up-dev:
	docker compose \
		-f .deploy/docker-compose.yml \
		-f .deploy/docker-compose.dev.yml up

build-dev:
	docker compose \
		-f .deploy/docker-compose.yml \
		-f .deploy/docker-compose.dev.yml build
