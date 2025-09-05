FROM node:22-slim


RUN apt-get update && apt-get install -y \
    libcairo2-dev libpango1.0-dev libjpeg-dev \
    libgif-dev build-essential librsvg2-dev \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY models/ ./models

COPY package*.json ./

RUN npm install

COPY . .

RUN npm rebuild canvas
RUN npm rebuild @tensorflow/tfjs-node --build-addon-from-source 
RUN npx prisma generate

EXPOSE 5000

CMD ["npm","run","dev"]
