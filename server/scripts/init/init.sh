#!/bin/bash
# Script to copy and run files in the container to initialize the appwrite instance

# Load environment variables from .env file
set -o allexport
source ./.env.defaults
set -o allexport -

CONTAINER_NAME=appwrite
TARGET_DIR="/usr/src/code/app/temp-scripts"

# Create a script directory
docker exec $CONTAINER_NAME mkdir -p $TARGET_DIR

# Copy files to the container
docker cp ./scripts/init/create_user.php $CONTAINER_NAME:$TARGET_DIR/init.php

# Execute the script with environment variables
docker exec -it -e DEFAULT_ORG_ID=$DEFAULT_ORG_ID -e DEFAULT_ADMIN_EMAIL=$DEFAULT_ADMIN_EMAIL -e DEFAULT_ADMIN_PASSWORD=$DEFAULT_ADMIN_PASSWORD $CONTAINER_NAME php $TARGET_DIR/init.php

# Clean up
docker exec $CONTAINER_NAME rm -r $TARGET_DIR

echo "User creation script executed and cleaned up."