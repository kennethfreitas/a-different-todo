FROM node:14-alpine
WORKDIR /app
COPY . .

RUN npm ci
RUN npm run build

RUN addgroup -g 1001 -S nodejs
RUN adduser -S userapp -u 1001

USER userapp

EXPOSE 5000
CMD npm start