# pull official base image
FROM node:14-slim

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
RUN yarn install

# add app
COPY . ./

# start app
EXPOSE 3000
ENTRYPOINT ["yarn"]
