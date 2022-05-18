FROM node:16-alpine
WORKDIR /usr/local/app/frontend
ENV PATH /app/node_modules/.bin:$PATH
COPY /package.json ./
COPY /package-lock.json ./
RUN npm install
COPY . ./
CMD ["npm", "start"]