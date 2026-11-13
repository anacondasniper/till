import './style.css'
import type { Product } from './types';

const app = document.querySelector<HTMLDivElement>('#app')!

const p1: Product = {
	id: 1,
	name: "product1",
	description: "The first test product for till",
	priceCents: 300,
	stockQuant: 5,
	imageUrl: "https://placehold.co/400x300?text=Product+1" 
}

const p2: Product = {
	id: 2,
	name: "product2",
	description: "The second test product for till",
	priceCents: 500,
	stockQuant: 1,
	imageUrl: "https://placehold.co/400x300?text=Product+2"
}

const list: Product[] = [p1, p2];

app.innerHTML = `
<h1>till</h1>

<div class="productGrid">
	${list.map(n => `
			<div class="productCard">
				<h2>${n.name}</h2>
				<img src="${n.imageUrl}" alt="${n.name}">
				<p>${n.description}</p>
				<h3>$${(n.priceCents / 100).toFixed(2)}</h3>
			</div>
		`).join('')
	}
</div>
`
