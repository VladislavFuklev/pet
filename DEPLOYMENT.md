# 🚀 Deployment Guide для Vercel Postgres

## Крок 1: Отримайте Vercel Postgres credentials

1. Перейдіть на [Vercel Dashboard](https://vercel.com/dashboard)
2. Виберіть або створіть новий проект
3. Перейдіть в **Storage** → **Create Database** → **Postgres**
4. Після створення, натисніть на вашу БД → вкладка **Settings** → **.env.local**
5. Скопіюйте всі змінні середовища

Ви отримаєте щось таке:

```bash
POSTGRES_URL="..."
POSTGRES_PRISMA_URL="..."
POSTGRES_URL_NO_SSL="..."
POSTGRES_URL_NON_POOLING="..."
POSTGRES_USER="..."
POSTGRES_HOST="..."
POSTGRES_PASSWORD="..."
POSTGRES_DATABASE="..."
```

## Крок 2: Оновіть .env.local

Замініть вміст `.env.local` на:

```bash
# Vercel Postgres (використовуйте POSTGRES_PRISMA_URL для Prisma)
DATABASE_URL="your-POSTGRES_PRISMA_URL-here"

# NextAuth - згенеруйте новий secret
# Запустіть: openssl rand -base64 32
NEXTAUTH_SECRET="your-generated-secret-here"
NEXTAUTH_URL="http://localhost:3000"

# Vercel Cron Secret
# Запустіть: openssl rand -base64 32
CRON_SECRET="your-cron-secret-here"
```

⚠️ **ВАЖЛИВО**: Використовуйте саме `POSTGRES_PRISMA_URL` (з `?pgbouncer=true`), а не звичайний `POSTGRES_URL`!

## Крок 3: Згенеруйте secrets

```bash
# Згенеруйте NEXTAUTH_SECRET
openssl rand -base64 32

# Згенеруйте CRON_SECRET
openssl rand -base64 32
```

Вставте згенеровані значення в `.env.local`

## Крок 4: Виконайте міграції бази даних

```bash
# Перевірте підключення
npx prisma db push

# АБО створіть міграцію
npx prisma migrate dev --name init

# Відкрийте Prisma Studio для перевірки
npx prisma studio
```

## Крок 5: Заповніть базу demo даними (опціонально)

```bash
npm run db:seed
```

Це створить:

- Demo користувача: `demo@example.com` / `password123`
- Всі категорії транзакцій
- Налаштування нотифікацій

## Крок 6: Запустіть локально

```bash
npm run dev
```

Відкрийте http://localhost:3000 та перевірте:

- [ ] Можете зареєструватися
- [ ] Можете увійти
- [ ] Dashboard відображається

## Крок 7: Deploy на Vercel

### Варіант А: Через Vercel CLI

```bash
# Встановіть Vercel CLI (якщо ще не встановлено)
npm i -g vercel

# Логін
vercel login

# Deploy
vercel

# Або відразу в production
vercel --prod
```

### Варіант Б: Через GitHub

1. Запушіть код на GitHub:

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin your-github-repo-url
git push -u origin main
```

2. На Vercel:
   - **New Project** → Import вашого GitHub repo
   - Vercel автоматично виявить Next.js
   - Натисніть **Deploy**

## Крок 8: Налаштуйте Environment Variables на Vercel

Після deploy, додайте змінні в Vercel Dashboard:

1. Перейдіть: **Project** → **Settings** → **Environment Variables**

2. Додайте наступні змінні для **Production**, **Preview**, та **Development**:

```
DATABASE_URL = your-POSTGRES_PRISMA_URL
NEXTAUTH_SECRET = your-generated-secret
NEXTAUTH_URL = https://your-app-name.vercel.app
CRON_SECRET = your-cron-secret
```

⚠️ **ВАЖЛИВО для NEXTAUTH_URL**:

- Production: `https://your-app-name.vercel.app`
- Preview: `https://your-app-name-git-branch.vercel.app`
- Development: `http://localhost:3000`

## Крок 9: Виконайте міграції на production БД

```bash
# Якщо ви використовуєте ту саму БД (Vercel Postgres)
# міграції вже виконані локально

# Якщо ви створили НОВУ БД для production:
# 1. Оновіть DATABASE_URL в .env з production БД
# 2. Запустіть:
npx prisma migrate deploy

# 3. Seed data (опціонально):
npm run db:seed
```

## Крок 10: Налаштуйте Vercel Cron (для recurring transactions)

1. Створіть `vercel.json` в корені проєкту (вже є в шаблоні)
2. Vercel автоматично виявить cron jobs при deploy
3. Перевірте в **Project Settings** → **Cron Jobs**

## Troubleshooting

### Помилка "Can't reach database server"

```bash
# Перевірте DATABASE_URL
echo $DATABASE_URL

# Перевірте підключення
npx prisma db push
```

### Помилка "Environment variable not found: DATABASE_URL"

```bash
# Prisma не бачить .env.local у деяких командах
# Використовуйте dotenv-cli:
npx dotenv -e .env.local -- prisma migrate dev
```

### Помилка "Invalid connection string"

Переконайтеся що використовуєте `POSTGRES_PRISMA_URL` (з `?pgbouncer=true&connect_timeout=15`)

### NextAuth помилки на production

1. Перевірте що `NEXTAUTH_URL` відповідає вашому домену
2. Перевірте що `NEXTAUTH_SECRET` встановлено
3. Перевірте що домен додано в NextAuth trusted origins

## Перевірка після deploy

✅ Checklist:

- [ ] Сайт відкривається на Vercel URL
- [ ] Можна зареєструватись новим користувачем
- [ ] Можна увійти в систему
- [ ] Dashboard відображається коректно
- [ ] Транзакції зберігаються в БД
- [ ] Environment variables встановлені
- [ ] Database міграції виконані
- [ ] Cron jobs налаштовані (якщо використовуєте recurring)

## Корисні команди

```bash
# Перегенерувати Prisma Client
npx prisma generate

# Відкрити Prisma Studio
npx prisma studio

# Перевірити schema
npx prisma validate

# Переглянути логи Vercel
vercel logs

# Переглянути production логи
vercel logs --prod
```

## Наступні кроки

Після успішного deploy:

1. Протестуйте всі основні функції
2. Додайте custom domain (опціонально)
3. Налаштуйте аналітику (Vercel Analytics)
4. Налаштуйте моніторинг помилок (Sentry)
5. Додайте реальні дані

---

🎉 **Ваш додаток готовий до використання!**

Якщо виникли проблеми, перевірте [Vercel Documentation](https://vercel.com/docs) або [Prisma Deployment Guide](https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-vercel).
