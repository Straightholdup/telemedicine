BUILD_PATH=.deploy
DOCKER_BASE=$(BUILD_PATH)/docker-compose.yml
DOCKER_PROD=$(BUILD_PATH)/docker-compose.prod.yml
DOCKER_DEV=$(BUILD_PATH)/docker-compose.dev.yml

dev-run:
	docker compose \
		-f .deploy/docker-compose.yml \
		-f .deploy/docker-compose.dev.yml up

dev-build:
	docker compose \
		-f .deploy/docker-compose.yml \
		-f .deploy/docker-compose.dev.yml build
