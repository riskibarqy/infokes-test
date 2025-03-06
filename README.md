# Infokes Technical Test

This is a technical test project using **Vue 3** (Composition API) for the frontend and **ElysiaJS** for the backend. The project is structured as a **monorepo** using **Docker**.

## Prerequisites

Ensure you have the following installed:
- [Docker](https://www.docker.com/)
- [Bun](https://bun.sh/) (used for package management)
- [Make](https://www.gnu.org/software/make/)

## Project Structure
```
.
├── apps/
│   ├── backend/      # Backend using ElysiaJS
│   ├── frontend/     # Frontend using Vue 3
├── makefile          # Makefile for automation
├── package.json      # Root package.json for monorepo
├── bun.lock          # Bun lock file
├── docker-compose.yml # Docker Compose config
└── README.md         # Project documentation
```

## Setup & Running the Project

1. **Start the project (build & restart containers)**
   ```sh
   make docker-restart-build
   ```

2. **Run database migrations**
   ```sh
   make drizzle-migrate
   ```

3. **Access the frontend and backend**
   - Frontend: `http://localhost:5173`
   - Backend: `http://localhost:3000`


## Notes
- This project follows **monorepo architecture** with **Bun** as the package manager.
- The `makefile` provides an easy way to manage Docker and migrations.

## Author
This project is part of a **technical test for Infokes**.