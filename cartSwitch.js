const cartDiv = document.querySelector('.cart');

const showCart = () => cartDiv.style.display = 'block';
const closeCart = () => cartDiv.style.display = 'none';

const cart = new Cart();