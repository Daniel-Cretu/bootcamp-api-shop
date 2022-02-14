"use strict";

const productTemplate = document.querySelector("[product-template]");

const productSection = document.querySelector(".products");


function addToCart(event) {
    console.log(event.currentTarget.id);
    const basket = JSON.parse(localStorage.getItem("basket")) ?? {};
    if(basket[event.currentTarget.id] == null){
        basket[event.currentTarget.id] = 1;
    } else {
        basket[event.currentTarget.id] = ++basket[event.currentTarget.id];
    }
    localStorage.setItem("basket", JSON.stringify(basket));
    updateCartNumber();
}

fetchProducts().then((products) => {
    const productsRow = document.querySelector("[data-products-row]");

    products.forEach((product) => {
        const newProduct = productTemplate.content.cloneNode(true).children[0];
        newProduct.id = "product-" + product.id;
        newProduct.querySelector(".product-title").textContent = product.title;
        newProduct.querySelector(".product-img").src = product.image;
        newProduct.querySelector(".product-price").textContent =
            "$" + product.price;

        productSection.append(newProduct);

        const addToCartButton = productsRow.querySelector(
            `#product-${product.id} button.add-to-cart`
        );
        addToCartButton.addEventListener("click", addToCart, false);
        addToCartButton.id = product.id;
    });
});