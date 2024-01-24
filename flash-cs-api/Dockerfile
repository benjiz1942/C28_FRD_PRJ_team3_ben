FROM node:18
WORKDIR /usr/src/app
COPY dist .
COPY package.json .
EXPOSE 8080
CMD yarn install &&\
    npx prisma migrate deploy &&\
    node prisma/seed.js &&\
    node src/main.js