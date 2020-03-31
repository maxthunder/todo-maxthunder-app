#!/bin/bash

ng build && cp -a dist/. ~/Development/deploy/maxthunder.github.io/. && ls -l ~/Development/deploy/maxthunder.github.io/.

exit 0;
