#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 Finance Tracker - Vercel Postgres Setup${NC}\n"

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo -e "${RED}❌ .env.local file not found!${NC}"
    echo -e "${YELLOW}Please create .env.local from .env.example and add your Vercel Postgres URL${NC}"
    exit 1
fi

# Check if DATABASE_URL is set
if ! grep -q "POSTGRES" .env.local; then
    echo -e "${YELLOW}⚠️  Warning: DATABASE_URL might not be configured with Vercel Postgres${NC}"
    echo -e "${YELLOW}Make sure you're using POSTGRES_PRISMA_URL from Vercel${NC}\n"
fi

echo -e "${GREEN}Step 1: Generating Prisma Client...${NC}"
npx prisma generate

echo -e "\n${GREEN}Step 2: Pushing schema to database...${NC}"
echo -e "${YELLOW}This will create all tables in your Vercel Postgres database${NC}"
npx prisma db push

if [ $? -eq 0 ]; then
    echo -e "\n${GREEN}✅ Database schema created successfully!${NC}"
    
    echo -e "\n${GREEN}Step 3: Seeding database with demo data...${NC}"
    npm run db:seed
    
    if [ $? -eq 0 ]; then
        echo -e "\n${GREEN}✅ Database seeded successfully!${NC}"
        echo -e "\n${GREEN}🎉 Setup complete!${NC}\n"
        echo -e "Demo credentials:"
        echo -e "  Email: ${YELLOW}demo@example.com${NC}"
        echo -e "  Password: ${YELLOW}password123${NC}\n"
        echo -e "Run ${GREEN}npm run dev${NC} to start the development server"
        echo -e "Visit ${GREEN}http://localhost:3000${NC}\n"
    else
        echo -e "\n${YELLOW}⚠️  Seeding failed, but you can continue${NC}"
        echo -e "Run ${GREEN}npm run db:seed${NC} manually later\n"
    fi
else
    echo -e "\n${RED}❌ Database push failed!${NC}"
    echo -e "${YELLOW}Please check your DATABASE_URL in .env.local${NC}"
    echo -e "${YELLOW}Make sure you're using POSTGRES_PRISMA_URL from Vercel Postgres${NC}"
    exit 1
fi
