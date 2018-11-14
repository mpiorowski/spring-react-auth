#!/usr/bin/env bash
#docker stop $(docker ps -aq)
docker-compose -f docker-compose.prod.yml up --build -d