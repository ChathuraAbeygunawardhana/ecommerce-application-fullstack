#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}Starting development environment...${NC}\n"

# Function to check if a port is in use
check_port() {
    lsof -i:$1 > /dev/null 2>&1
    return $?
}

# Function to check if Docker container is running
check_container() {
    docker ps --filter "name=$1" --filter "status=running" --format "{{.Names}}" | grep -q "$1"
    return $?
}

# 1. Check and start PostgreSQL container
echo -e "${YELLOW}Checking PostgreSQL container...${NC}"
if check_container "my-postgres"; then
    echo -e "${GREEN}✓ PostgreSQL is already running${NC}"
else
    echo -e "${YELLOW}Starting PostgreSQL container...${NC}"
    gnome-terminal --tab --title="PostgreSQL" -- bash -c "docker start my-postgres && echo 'PostgreSQL started' && docker logs -f my-postgres; exec bash"
    sleep 3
    echo -e "${GREEN}✓ PostgreSQL container started${NC}"
fi

# 2. Check and start Backend
echo -e "\n${YELLOW}Checking Backend server...${NC}"
if check_port 8000; then
    echo -e "${GREEN}✓ Backend is already running on port 8000${NC}"
else
    echo -e "${YELLOW}Starting Backend server...${NC}"
    gnome-terminal --tab --title="Backend" -- bash -c "cd backend && source .venv/bin/activate && uvicorn app.main:app --reload; exec bash"
    sleep 2
    echo -e "${GREEN}✓ Backend server started${NC}"
fi

# 3. Check and start Frontend
echo -e "\n${YELLOW}Checking Frontend server...${NC}"
if check_port 3000; then
    echo -e "${GREEN}✓ Frontend is already running on port 3000${NC}"
else
    echo -e "${YELLOW}Starting Frontend server...${NC}"
    gnome-terminal --tab --title="Frontend" -- bash -c "cd frontend && npm run dev; exec bash"
    sleep 2
    echo -e "${GREEN}✓ Frontend server started${NC}"
fi

echo -e "\n${GREEN}========================================${NC}"
echo -e "${GREEN}Development environment is ready!${NC}"
echo -e "${GREEN}========================================${NC}"
echo -e "PostgreSQL: ${GREEN}http://localhost:5432${NC}"
echo -e "Backend:    ${GREEN}http://localhost:8000${NC}"
echo -e "Frontend:   ${GREEN}http://localhost:3000${NC}"
echo -e "${GREEN}========================================${NC}\n"
