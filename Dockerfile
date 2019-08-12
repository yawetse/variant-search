FROM node:10
WORKDIR /usr/www/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
RUN npm install --skip_cli_reconfig=true

# Bundle app source
COPY . .
EXPOSE 8786

CMD [ "node", "index.js","-e development" ]
