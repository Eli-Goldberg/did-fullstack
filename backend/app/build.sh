#!/bin/bash
docker buildx build --platform linux/amd64 -t did-backend .
docker tag did-backend slygon/did-backend:latest
docker push slygon/did-backend:latest
