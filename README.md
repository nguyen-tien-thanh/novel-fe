# Local

```bash
cp .env.template .env
```

```bash
yarn dev
```

<br /><br />

# Docker

## Build

### Development

```bash
docker compose build dev
```

### Production

```bash
ENV=prod docker compose build web
```

## Push

```bash
docker compose push
```

```bash
generate key webpush
web-push generate-vapid-keys
```
