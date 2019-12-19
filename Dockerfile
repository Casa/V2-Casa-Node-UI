# specify the node base image with your desired version node:<version>
FROM node:10

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json ./
COPY yarn.lock ./

RUN CYPRESS_INSTALL_BINARY=0 yarn install

# Bundle app source
COPY . .

RUN yarn run build

ENV HOST 0.0.0.0

CMD [ "yarn", "start" ]
