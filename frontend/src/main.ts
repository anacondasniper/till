import './style.css'
import type { Product } from './types';
import { addToCart } from './cart';

const app = document.querySelector<HTMLDivElement>('#app')!
app.addEventListener('click', (event) => {
	const target = event.target as HTMLElement;
	const button = target.closest<HTMLButtonElement>('button[data-id]');
	if (!button) {
		return;
	}
	addToCart(Number(button.dataset.id))
})

function render(products: Product[]) {

	app.innerHTML = `
		<h1>till</h1>

		<div class="productGrid">
			${products.map(n => `
				<div class="productCard">
					<h2>${n.name}</h2>
					<img src="${n.imageUrl}" alt="${n.name}">
					<p>${n.description}</p>
					<h3>$${(n.priceCents / 100).toFixed(2)}</h3>
					<button data-id="${n.id}">ADD TO CART</button>
				</div>
			`).join('')}
		</div>
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
    	console.log(err)	
		app.innerHTML = `<h1>till</h1><p>Couldn't load products. Try again later.</p>`;
	}
}

load();
