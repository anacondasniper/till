use axum::{Router, Json};
use axum::routing::get;
use tokio::net::TcpListener;
use serde::Serialize;
use sqlx::SqlitePool;

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
struct Product {
    id: i32,
    name: String,
    description: String,
    price_cents: i32,
    stock_quant: i32,
    image_url: String
}

async fn products() -> Json<Vec<Product>> {
    let products = vec![
        Product {
            id: 1, 
            name: "product1".to_string(),
            description: "The first test product for till".to_string(),
            price_cents: 300,
            stock_quant: 5,
            image_url: "https://placehold.co/400x300?text=Product+1".to_string()
        },
        Product {
            id: 2,
            name: "product2".to_string(),
            description: "The second test product for till".to_string(),
            price_cents: 500,
            stock_quant: 1,
            image_url: "https://placehold.co/400x300?text=Product+2".to_string()
        }
    ];
    Json(products)
}

#[tokio::main]
async fn main() {
    let pool = SqlitePool::connect("sqlite://till.db?mode=rwc").await.unwrap();
    sqlx::migrate!().run(&pool).await.unwrap();
    let router = Router::new().route(
        "/api/products", get(products)
    );
    let listener = TcpListener::bind("127.0.0.1:3000").await.unwrap();

    axum::serve(listener, router).await.unwrap();
}
