#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Stopping development environment...${NC}\n"

# Stop Frontend (port 3000)
echo -e "${YELLOW}Stopping Frontend...${NC}"
FRONTEND_PIDS=$(lsof -ti:3000 2>/dev/null)
if [ -n "$FRONTEND_PIDS" ]; then
    echo "$FRONTEND_PIDS" | xargs kill -9 2>/dev/null
    sleep 1
    # Verify it's stopped
    if lsof -ti:3000 > /dev/null 2>&1; then
        echo -e "${RED}✗ Frontend may still be running${NC}"
    else
        echo -e "${GREEN}✓ Frontend stopped${NC}"
    fi
else
    echo -e "${GREEN}✓ Frontend was not running${NC}"
fi

# Stop Backend (port 8000)
echo -e "\n${YELLOW}Stopping Backend...${NC}"
BACKEND_PIDS=$(lsof -ti:8000 2>/dev/null)
if [ -n "$BACKEND_PIDS" ]; then
    echo "$BACKEND_PIDS" | xargs kill -9 2>/dev/null
    sleep 1
    echo -e "${GREEN}✓ Backend stopped${NC}"
else
    echo -e "${GREEN}✓ Backend was not running${NC}"
fi

# Stop PostgreSQL container
echo -e "\n${YELLOW}Stopping PostgreSQL container...${NC}"
if docker ps --filter "name=my-postgres" --filter "status=running" --format "{{.Names}}" | grep -q "my-postgres"; then
    docker stop my-postgres > /dev/null 2>&1
    echo -e "${GREEN}✓ PostgreSQL container stopped${NC}"
else
    echo -e "${GREEN}✓ PostgreSQL container was not running${NC}"
fi

echo -e "\n${GREEN}Development environment stopped!${NC}\n"
