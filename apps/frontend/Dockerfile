FROM oven/bun AS builder

WORKDIR /app

COPY package.json ./

RUN bun install --frozen-lockfile

COPY . .

EXPOSE 5173

CMD ["bun", "run", "dev", "--", "--host"]