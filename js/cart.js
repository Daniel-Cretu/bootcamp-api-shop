function getCartAddRemButtonsTemplate(productId) {
    return `
        <div class="btn-group" role="group" aria-label="Basic example">
            <button type="button" class="btn btn-danger" onClick=removeOneProduct(${productId})>-</button>
            <button type="button" class="btn btn-success" onClick=addOneProduct(${productId})>+</button>
        </div>
    `;
}

function removeOneProduct(productId){
    const basket = JSON.parse(localStorage.getItem("basket")) ?? {};
    if(basket[productId] - 1 === 0){
        delete basket[productId];
    } else {
        basket[productId] = --basket[productId];
    }
    localStorage.setItem("basket", JSON.stringify(basket));
    updateCartNumber();
    window.location.reload();
}

function addOneProduct(productId){
    const basket = JSON.parse(localStorage.getItem("basket")) ?? {};
    basket[productId] = ++basket[productId];
    localStorage.setItem("basket", JSON.stringify(basket));
    updateCartNumber();
    window.location.reload();
}

function clearCart() {
    localStorage.setItem("basket", JSON.stringify({}));
    window.location.reload();
}

fetchProducts().then((products) => {
    const cartTableBody = document.querySelector('.cart-table-body');

    const basket = JSON.parse(localStorage.getItem("basket")) ?? {};

    let i = 1;
    for (const [key, value] of Object.entries(basket)) {

        let myProduct = {};
        products.forEach((product) => {
            if(product.id.toString() === key) {
                myProduct = {
                    title: product.title,
                    price: product.price
                }
            }
        })
        
        const tr = document.createElement('tr');

        tr.appendChild( document.createElement('td') )
        tr.cells[0].appendChild( document.createTextNode(i) )

        tr.appendChild( document.createElement('td') );
        tr.cells[1].appendChild( document.createTextNode(myProduct.title) )

        tr.appendChild( document.createElement('td') );
        tr.cells[2].appendChild( document.createTextNode(value) )

        tr.appendChild( document.createElement('td') );
        tr.cells[3].innerHTML = getCartAddRemButtonsTemplate(key)

        tr.appendChild( document.createElement('td') );
        tr.cells[4].appendChild( document.createTextNode(myProduct.price * value) )

        cartTableBody.appendChild(tr);
        i++;
    }
});


