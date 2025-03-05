backend-run-dev:
	@bun --inspect run apps/backend/src/server.ts

docker-restart-build:
	@docker-compose down
	@docker-compose build --no-cache
	@docker-compose up -d

drizzle-migrate:
	@bunx drizzle-kit migrate

drizzle-drop:
	@bunx drizzle-kit drop
