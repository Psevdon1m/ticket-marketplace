FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# for dev only!
ENV NODE_TLS_REJECT_UNAUTHORIZED=0

CMD ["npm", "run", "dev"]