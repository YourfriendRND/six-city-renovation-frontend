# Используем официальный образ Node.js как базовый
FROM node:20.10.0-alpine AS builder

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json (или yarn.lock), чтобы установить зависимости
COPY package*.json ./
COPY yarn.lock ./

# Устанавливаем зависимости
RUN  npm install -g yarn && yarn install


# Копируем все файлы приложения в контейнер
COPY . .

# Собираем приложение для продакшн
RUN yarn build

# Используем минимальный образ для продакшн
FROM node:20.10.0-alpine

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем только необходимые файлы из builder-образа
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/yarn.lock ./


# Устанавливаем только production зависимости
RUN  npm install -g yarn && yarn install --production

# Проверка PATH
    RUN echo $PATH
    # Проверка содержимого node_modules/.bin
    RUN ls -la node_modules/.bin
# Запускаем приложение
CMD ["./node_modules/.bin/next", "start"]