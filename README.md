# Local

```bash
npm run dev
# or
yarn dev
```

# Docker

### Development

```bash
create file .env.development .env.local

#build env dev
docker compose build dev
docker compose push dev
```

### Production

```bash
create file .env.production .env.local


docker compose build web
docker compose push web
```
