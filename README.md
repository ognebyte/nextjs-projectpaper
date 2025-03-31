# 📝 ProjectPaper
ProjectPaper – это веб-приложение для управления проектами и задачами. Оно позволяет пользователям легко организовывать рабочий процесс, создавать проекты, настраивать доски и задачи, а также работать в команде.

- [Vercel](https://nextjs-projectpaper.vercel.app/)

## 🚀 Функции
- [x] Авторизация и регистрация (Firebase Authentication)
- [x] Создание и управление проектами
- [x] Настройка досок и задач
- [x] Выбор приоритетов и сроков
- [x] Приглашение участников и управление доступом


## 📦 Установка и запуск
Клонируйте репозиторий:
```
git clone https://github.com/ognebyte/nextjs-projectpaper.git
cd nextjs-projectpaper
```

Установите зависимости:
```
npm install
```

Создайте .env.local и укажите ключи Firebase:
```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
...
```

Запустите проект:
```
npm run dev
```

Откройте в браузере: <http://localhost:3000>
