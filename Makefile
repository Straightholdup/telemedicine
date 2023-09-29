.PHONY: build

up:
	docker-compose -f ./build/docker-compose.yml up

build:
	docker-compose -f ./build/docker-compose.yml build