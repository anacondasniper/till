# till

A small self-hosted storefront for selling physical items, built with a Rust API, SQLite, and a TypeScript frontend.

## Status
Early planning: writing README.md

## Stack
- Frontend: TypeScript
- Backend: Rust (axum)
- Database: SQLite
- Payments: Stripe Checkout
- Hosting: shop.domain.com, behind Caddy

## Build plan
- [ ] Static product page with hardcoded data
- [ ] Rust API serving products from SQLite
- [ ] Cart (localStorage)
- [ ] Stripe Checkout + webhook
- [ ] Admin page to add/edit products and stock
- [ ] Deploy + backups

## Project structure

```
till/
├── README.md
├── .gitignore
├── .env.example        # template with fake values; real .env is ignored
├── till.toml           # shop config (name, currency, shipping)
├── backend/            # Rust (axum) API
│   ├── Cargo.toml
│   ├── migrations/     # SQL files that create the tables
│   └── src/
│       ├── main.rs
│       ├── routes/     # products, checkout, webhook, admin
│       └── db.rs
├── frontend/           # TypeScript storefront
│   ├── package.json
│   ├── tsconfig.json
│   ├── index.html
│   └── src/
│       ├── main.ts
│       ├── cart.ts
│       └── theme.css
└── deploy/
    └── Caddyfile       # reverse proxy config
```
