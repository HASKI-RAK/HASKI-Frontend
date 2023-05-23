# build environment
FROM node:16.20.0-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY yarn.lock ./
RUN yarn install
COPY . ./
ARG NODE_ENV=production
ARG BACKEND=https://backend.haski.app
RUN yarn build-prod

# production environment
FROM nginx:stable-alpine
# Overrite the config file. Fixes for react router by directing all requests to index.html
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
COPY --from=build /app/public /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]