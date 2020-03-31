#!/bin/bash

echo "Building app..."
ng build
echo "App built."

echo "Copying dist files to local deploy git repo..."
cp -a dist/todo-app/. ~/Development/deploy/maxthunder.github.io/.
echo "Files copied."

echo "Exiting..."
exit 0;
