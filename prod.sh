#!/usr/bin/env bash
#docker stop $(docker ps -aq)
docker-compose -f ./docker/docker-compose.prod.yml up --build -d