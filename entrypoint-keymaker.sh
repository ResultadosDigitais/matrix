#!/bin/sh
npm run build-keymaker
serve -s build/ -l tcp://0.0.0.0:5000
