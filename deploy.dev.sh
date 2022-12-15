DELOY_CONNECT=hungnv@27.71.226.167

echo "DEPLOY..."
scp -o StrictHostKeyChecking=no -r ./dist ./package.json ./tsconfig.json ./.env ${DELOY_CONNECT}:~/api-login/