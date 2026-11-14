import './style.css'
import type { Product } from './types';
import { addToCart } from './cart';
import { formatPrice } from './format';

const app = document.querySelector<HTMLDivElement>('#app')!
app.addEventListener('click', (event) => {
	const target = event.target as HTMLElement;
	const button = target.closest<HTMLButtonElement>('button[data-id]');
	if (!button) {
		return;
	}
	addToCart(Number(button.dataset.id))
})

function productCardHtml(product: Product): string {
	return `
	<div class="productCard">
		<h2>${product.name}</h2>
		<img src="${product.imageUrl}" alt="${product.name}">
		<p>${product.description}</p>
		<h3>${formatPrice(product.priceCents)}</h3>
		<button data-id="${product.id}">ADD TO CART</button>
	</div>
	`
}

function productGridHtml(products: Product[]): string {
	return `
		<div class="productGrid">
			${products.map(productCardHtml).join('')}
		</div>
	`
}

function render(products: Product[]) {

	app.innerHTML = `
		<h1>till</h1>

		${productGridHtml(products)}
	`
}

async function load() {
	try {
		const res = await fetch('/api/products');
		if (!res.ok) {
			throw new Error(`GET /api/products failed with status ${res.status}`);
		}
		const products: Product[] = await res.json();
		render(products)
	} catch (err) {
    	console.error(err)	
		app.innerHTML = `<h1>till</h1><p>Couldn't load products. Try again later.</p>`;
	}
}

load();
