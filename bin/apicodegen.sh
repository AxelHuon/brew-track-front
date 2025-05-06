#!/bin/bash

URL="http://localhost:3001/swagger/json"


curl $URL > src/api/swagger-json.json

# generate code
rm -rf ./src/api/generated
mkdir ./src/api/generated
pnpm orval
