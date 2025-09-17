#!/bin/bash

killall java
# killall httpd

# LOG_FILE="$HOME/deploy.log"

# echo "Starting deployment script" | tee -a $LOG_FILE

# echo "Setting JAVA_VERSION to 21" | tee -a $LOG_FILE
export JAVA_VERSION=21

# echo "Stopping any running httpd processes" | tee -a $LOG_FILE
# killall httpd 2>> $LOG_FILE

# echo "Starting Apache httpd" | tee -a $LOG_FILE
# httpd -f $HOME/helios-root/httpd-root/conf/httpd.conf -k start 2>> $LOG_FILE
# echo "Apache httpd started" | tee -a $LOG_FILE

# sleep 1

# echo "Starting Java application" | tee -a $LOG_FILE
java -XX:MaxHeapSize=1G -XX:MaxMetaspaceSize=128m -DFCGI_PORT=24021 -jar $HOME/fcgi-bin/server.jar 
echo "Java application started" 

# echo "Deployment script completed" | tee -a $LOG_FILE