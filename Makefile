dev-run:
	docker compose \
		-f .deploy/docker-compose.yml \
		-f .deploy/docker-compose.dev.yml up

dev-build:
	docker compose \
		-f .deploy/docker-compose.yml \
		-f .deploy/docker-compose.dev.yml build
