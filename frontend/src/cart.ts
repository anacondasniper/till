type Cart = Record<number, number>;
const CART_KEY = "till-cart";

export function loadCart(): Cart {
	try {
		let raw = localStorage.getItem(CART_KEY)
		if (!raw) {
			return {};
		}
		return JSON.parse(raw);
	} catch (err) {
		console.error(err);
		return {};
	}
}

export function saveCart(cart: Cart) {
	localStorage.setItem(CART_KEY, JSON.stringify(cart))
}

export function addToCart(id: number) {
	const cart = loadCart();
	cart[id] = (cart[id] ?? 0) + 1;
	saveCart(cart);
}
