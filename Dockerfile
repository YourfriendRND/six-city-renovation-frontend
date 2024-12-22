# Используем официальный образ Node.js как базовый
FROM node:20.10.0-alpine AS builder

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json (или yarn.lock), чтобы установить зависимости
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем все файлы приложения в контейнер
COPY . .

# Собираем приложение для продакшн
RUN npm run build

# Используем минимальный образ для продакшн
FROM node:20.10.0-alpine

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем только необходимые файлы из builder-образа
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Устанавливаем только production зависимости
RUN npm install --production

# Запускаем приложение
CMD ["npm", "start"]