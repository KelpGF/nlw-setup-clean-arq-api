#!/usr/bin/env bash
sudo service docker start

cd ./databases
docker compose up -d

# sh ./scripts/before-up.sh
