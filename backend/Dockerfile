FROM node

WORKDIR /app

COPY package*.json ./
RUN npm install 

COPY . .

RUN npx prisma generate --schema=./src/database/prisma/schema.prisma

EXPOSE 3333

CMD ["npm", "run", "dev"]
