FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

COPY . .

# Ensure the data directory exists at runtime
RUN mkdir -p data

EXPOSE 5000

CMD ["node", "src/app.js"]
