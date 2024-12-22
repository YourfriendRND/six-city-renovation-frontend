 # Используем официальный образ Node.js как базовый
 FROM node:20 AS builder

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
 FROM node:20

 # Устанавливаем рабочую директорию
 WORKDIR /app

 # Копируем только необходимые файлы из builder-образа
 COPY --from=builder /app/.next /app/.next
 COPY --from=builder /app/public /app/public
 COPY --from=builder /app/package*.json /app/

 RUN npm install --production

 # Открываем порт, который использует Next.js
 EXPOSE 7000

 # Запускаем приложение
 CMD ["npm", "start"]