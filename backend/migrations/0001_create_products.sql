CREATE TABLE products
(
	id				INTEGER PRIMARY KEY,
	name			TEXT NOT NULL,
	description		TEXT NOT NULL,
	price_cents		INTEGER NOT NULL,
	stock_quant		INTEGER NOT NULL,
	image_url		TEXT NOT NULL
);
