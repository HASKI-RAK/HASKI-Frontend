# build environment
FROM node:22.10.0-alpine3.20 AS build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY yarn.lock ./
RUN yarn install
COPY . ./
ARG NODE_ENV=production
RUN yarn build-prod

# production environment
FROM nginx:stable-alpine
# Overrite the config file. Fixes for react router by directing all requests to index.html
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
RUN mkdir -p /usr/share/nginx/html/config
COPY --from=build /app/public /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]