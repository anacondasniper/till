use axum::http::StatusCode;
use axum::{Router, Json};
use axum::routing::get;
use axum::extract::State;
use tokio::net::TcpListener;
use serde::Serialize;
use sqlx::SqlitePool;

#[derive(Serialize, sqlx::FromRow)]
#[serde(rename_all = "camelCase")]
struct Product {
    id: i32,
    name: String,
    description: String,
    price_cents: i32,
    stock_quant: i32,
    image_url: String
}

async fn products(State(pool): State<SqlitePool>) -> Result<Json<Vec<Product>>, StatusCode> {
    let products = sqlx::query_as::<_, Product>("
        SELECT id, name, description, price_cents, stock_quant, image_url FROM products")
        .fetch_all(&pool).await
        .map_err(|e| {
            eprintln!("query failed: {e}");
            StatusCode::INTERNAL_SERVER_ERROR
        })?;
    Ok(Json(products))
}

#[tokio::main]
async fn main() {
    let pool = SqlitePool::connect("sqlite://till.db?mode=rwc").await.unwrap();
    sqlx::migrate!().run(&pool).await.unwrap();
    let router = Router::new().route(
        "/api/products", get(products)
    ).with_state(pool);
    let listener = TcpListener::bind("127.0.0.1:3000").await.unwrap();

    axum::serve(listener, router).await.unwrap();
}
