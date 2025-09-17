#!/bin/bash

killall java
killall nginx

LOG_FILE="$HOME/deploy.log"

echo "Starting deployment script" | tee -a $LOG_FILE

echo "Setting JAVA_VERSION to 21" | tee -a $LOG_FILE
export JAVA_VERSION=21

echo "Stopping any running nginx processes" | tee -a $LOG_FILE
killall nginx 2>> $LOG_FILE

echo "Starting Nginx" | tee -a $LOG_FILE
nginx -c $HOME/helios-root/nginx-root/conf/nginx.conf 2>> $LOG_FILE
echo "Nginx started" | tee -a $LOG_FILE

sleep 1

echo "Starting Java application" | tee -a $LOG_FILE
java -XX:MaxHeapSize=1G -XX:MaxMetaspaceSize=128m -DFCGI_PORT=24022 -jar $HOME/helios-root/frontend/fcgi-bin/server.jar >> $LOG_FILE 2>&1 &
echo "Java application started" | tee -a $LOG_FILE

echo "Deployment script completed" | tee -a $LOG_FILE
