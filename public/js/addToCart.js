
const cookieName = "cartItems"
//const { json } = require("modernizr")

function addToCart(id, name, price, number) {

    // console.log(id, name, price);
    let products = $.cookie(cookieName)

    let numberOfCard = document.getElementById("numberBasket")

    if (products === undefined) {
        products = []
    } else {
        products = JSON.parse(products)
        numberOfCard.innerHTML = products.length;
    }


    // console.log(products)

    // count
    const count = $("#count").val()
    const currentProduct = products.find(x => x.id == id)

    var number = 1;
    var total = number * price

    if (currentProduct !== undefined) {
        products.find(x => x.id == id).count = parseInt(currentProduct.count) + parseInt(count)
    } else {
        const product = {
            id,
            name,
            unitPrice: price,
            number,
            total
        }

        products.push(product)
        console.log(products);
    }

    $.cookie(cookieName, JSON.stringify(products), { expires: 2, path: "/" })
}


