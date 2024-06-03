#!/usr/bin/env bash


function find_pod() {
    echo `kubectl get pods -o=name | grep $1 | head -1`
}

function list_process_for_port() {
    echo `lsof -nP -i4TCP:$1 | grep LISTEN`
    kill -9 `lsof -nP -i4TCP:$1 | tail -1  | awk '{print $2}'`
}

function port_forward() {
    list_process_for_port $2
    kubectl port-forward service/$1 $2:$3 &
}

function cleanup() {
    printf "\n"
    echo "Cleaning up..."
    printf "\n"
    list_process_for_port 10000
    list_process_for_port 8088
    list_process_for_port 8080
    list_process_for_port 8090
}

trap cleanup INT

port_forward 'apollo-router' 10000 10000
port_forward 'user-service' 8088 8080
port_forward 'backpackerdeals-main' 8080 8080
port_forward 'keycloak-http' 8090 80

pid=$!

while ps -p $pid > /dev/null; do
  wait $pid
done
