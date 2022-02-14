/*!
* Start Bootstrap - Shop Homepage v5.0.4 (https://startbootstrap.com/template/shop-homepage)
* Copyright 2013-2021 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-shop-homepage/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project

async function fetchProducts() {
    let products = localStorage.getItem("products");

    if (products === null) {
        const response = await fetch("https://fakestoreapi.com/products");
        const result = await response.json();

        const products = result.map((product) => {
            return {
                id: product.id,
                title: product.title,
                image: product.image,
                price: product.price,
                stars: Math.round(product.rating.rate),
            };
        });

        localStorage.setItem("products", JSON.stringify(products));
    } else {
        products = JSON.parse(products);
    }

    return products;
}

updateCartNumber()
function updateCartNumber() {
    let numberOfProducts = 0;
    const basket = JSON.parse(localStorage.getItem("basket")) ?? {};
    Object.keys(basket).forEach(key => {
        numberOfProducts += basket[key];
    });
    const cartItems = document.querySelector(".cart-items-nr");
    cartItems.textContent = numberOfProducts;
}