FROM node:boron

ADD . /app
COPY package.json /tmp/package.json
RUN cd /tmp && npm install --quiet
RUN mkdir -p /app && cp -a /tmp/node_modules /app

ENV NODE_ENV production
ENV PORT 3000
EXPdodocOSE 3000

WORKDIR "/app"

#Build React artificats
RUN npm run build

CMD ["npm", "start"]
