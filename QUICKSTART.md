# ⚡️ Швидкий старт з Vercel Postgres

## 📝 Що вам потрібно

1. **DATABASE_URL** від Vercel Postgres
2. 5 хвилин часу

## 🚀 Крок за кроком

### 1. Отримайте Vercel Postgres URL

```bash
# Перейдіть на https://vercel.com/dashboard
# Storage → Create Database → Postgres
# Скопіюйте POSTGRES_PRISMA_URL
```

### 2. Оновіть .env.local

Відкрийте `.env.local` та замініть `DATABASE_URL`:

```bash
# .env.local
DATABASE_URL="postgresql://..."  # ← Ваш POSTGRES_PRISMA_URL сюди

# Згенеруйте NEXTAUTH_SECRET:
# openssl rand -base64 32
NEXTAUTH_SECRET="your-generated-secret"

NEXTAUTH_URL="http://localhost:3000"
CRON_SECRET="your-cron-secret"
```

### 3. Запустіть setup скрипт

```bash
./setup.sh
```

Це автоматично:

- ✅ Згенерує Prisma Client
- ✅ Створить таблиці в БД
- ✅ Додасть demo дані

### 4. Запустіть проєкт

```bash
npm run dev
```

Відкрийте http://localhost:3000 🎉

**Demo credentials:**

- Email: `demo@example.com`
- Password: `password123`

---

## 🚢 Deploy на Vercel

```bash
# 1. Push на GitHub
git add .
git commit -m "Initial commit"
git push

# 2. Import на Vercel
# Перейдіть на vercel.com → New Project → Import вашого repo

# 3. Додайте Environment Variables:
DATABASE_URL (ваш POSTGRES_PRISMA_URL)
NEXTAUTH_SECRET (згенерований)
NEXTAUTH_URL (https://your-app.vercel.app)
CRON_SECRET (згенерований)

# 4. Deploy!
```

---

## ❓ Проблеми?

**Помилка: "Can't reach database server"**
→ Перевірте DATABASE_URL в .env.local

**Помилка: "Environment variable not found"**
→ Перезапустіть dev server після зміни .env.local

**Більше деталей:** Дивіться [DEPLOYMENT.md](./DEPLOYMENT.md)

---

**Готово!** Тепер можете розробляти свій Finance Tracker 💰
