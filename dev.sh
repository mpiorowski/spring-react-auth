#!/usr/bin/env bash
#docker stop $(docker ps -aq)
docker-compose -f docker-compose.dev.yml up --build -d
