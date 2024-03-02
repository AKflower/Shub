#!/bin/bash
function upNetwork() {
  set -ex

  rm -rf ./nodeboot/data/*
  rm -rf ./node1/data/*
  rm -rf ./node2/data/*

  echo "#!/bin/sh
  set -ex
  ipfs bootstrap rm all

  ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin '[\"http://172.20.209.39:5001\", \"http://172.20.209.39:8080\", \"http://localhost:3000\"]'
  ipfs config --json API.HTTPHeaders.Access-Control-Allow-Methods '[\"PUT\", \"POST\", \"GET\"]'
  ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin '[\"http://172.20.209.39:5001\", \"http://172.20.209.39:8080\", \"http://localhost:3000\"]'

  
  ipfs config --json Gateway.HTTPHeaders.Access-Control-Allow-Methods '[\"PUT\", \"POST\", \"GET\"]'
  " > reset.sh

  docker-compose up nodeboot

  sleep 5

  docker exec ipfs-node-boot ipfs id > nodeboot.json

  NODEBOOT_ID=$(jq -r ".ID" nodeboot.json)

  echo "#!/bin/sh
  set -ex
  ipfs bootstrap rm all
  ipfs bootstrap add /ip4/172.26.24.100/tcp/4001/p2p/${NODEBOOT_ID}

  ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin '[\"http://172.20.209.39:5001\", \"http://172.20.209.39:8080\", \"http://localhost:3000\"]'
  ipfs config --json API.HTTPHeaders.Access-Control-Allow-Methods '[\"PUT\", \"POST\", \"GET\"]'
  ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin '[\"http://172.20.209.39:5001\", \"http://172.20.209.39:8080\", \"http://localhost:3000\"]'

  ipfs config --json Gateway.HTTPHeaders.Access-Control-Allow-Methods '[\"PUT\", \"POST\", \"GET\"]'
  " > reset.sh

  docker-compose up node1
  docker-compose up node2
}

function downNetwork() {
  set -ex
  docker-compose down
  rm -rf ./nodeboot/data/*
  rm -rf ./node1/data/*
  rm -rf ./node2/data/*
  rm -rf nodeboot.json
  rm -rf reset.sh
}

# Lấy đối số đầu tiên
function_name=$1

case $function_name in
  "up")
    upNetwork
    ;;
  "down")
    downNetwork
    ;;
  *)
    echo "Function $function_name not found"
    echo "Usage: ./network.sh [function_name]"
    echo "Functions:"
    echo "  - up: start the ipfs network"
    echo "  - down: stop the ipfs network"
    exit 1
    ;;
esac
