FROM node

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install react-scripts
#RUN npm install -g npm@7.15.1
#RUN npm ci --only=production

COPY . .
RUN npm run build
RUN npm install -g serve


EXPOSE 3000
CMD ["serve", "-s", "build", "-l", "3000"]