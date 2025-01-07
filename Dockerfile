# Шаг 1: Сборка
FROM node:20.17.0-alpine AS builder
WORKDIR /usr/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Шаг 2: Запуск
FROM node:20.17.0-alpine
WORKDIR /usr/app
# Копируем файлы из сборочного контейнера
COPY --from=builder /usr/app .  

CMD ["npm", "run", "start"]