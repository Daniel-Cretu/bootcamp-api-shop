"use strict";

function getProductTemplate(product) {
    return `
        <div class="col mb-5">
            <div class="card h-100" id="product-${product.id}">
                <!-- Product image-->
                <img class="card-img-top" src="${product.image}" alt="..." />
                <!-- Product details-->
                <div class="card-body p-4">
                    <div class="text-center">
                        <!-- Product name-->
                        <h5 class="fw-bolder">${product.title}</h5>
                        <!-- Product reviews-->
                        <div class="d-flex justify-content-center small text-warning mb-2">
                            <div class="bi-star-fill"></div>
                            <div class="bi-star-fill"></div>
                            <div class="bi-star-fill"></div>
                            <div class="bi-star-fill"></div>
                            <div class="bi-star-fill"></div>
                        </div>
                        <!-- Product price-->
                        $${product.price}
                    </div>
                </div>
                <!-- Product actions-->
                <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                    <div class="text-center">
                        <button class="add-to-cart btn btn-outline-dark mt-auto" href="#" onClick=addToCart(${product.id})>Add to cart</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}
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

function addToCart(id) {
    console.log(id);
}

fetchProducts().then((products) => {
    const productsRow = document.querySelector("[data-products-row]");

    products.forEach((product) => {
        productsRow.innerHTML += getProductTemplate(product);

        const addToCartButton = productsRow.querySelector(
            `#product-${product.id} button.add-to-cart`
        );

        addToCartButton.addEventListener("click", addToCart);
    });
});

// Elemente in cos in local storage
// nr de elemente sus in cos
// o pagina pentru cos