FROM node:14 AS developement

WORKDIR /myApp

COPY package*.json ./

RUN npm install

COPY  . .

RUN npm run build  

EXPOSE 4200


##########################
## Production he said ####
##########################


FROM node:14 AS production


ARG NODE_ENV=production

ENV NODE_ENV=${NODE_ENV}

WORKDIR /the/workdir/path

COPY --from=developement  /myApp .

EXPOSE 8080

CMD [ "npm", "run", "dev" ]