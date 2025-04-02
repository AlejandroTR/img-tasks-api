FROM node:20

RUN apt-get update && apt-get install -y \
    libvips \
    libvips-dev \
    build-essential \
    gcc \
    make \
    pkg-config \
    libc6-dev \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:dev"]
