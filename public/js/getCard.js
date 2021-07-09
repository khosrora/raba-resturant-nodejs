

function updateCart() {
    // GET ITEMS
    let products = $.cookie(cookieName)
    products = JSON.parse(products)

    console.log(products);

    const table = document.querySelector("tbody");
    const displayCard = document.querySelector("#displayCard")
    console.log(displayCard);
    if (products.length > 0) {
        table.innerHTML =
            products.map((item) =>
                `
                <tr>
                <th scope="row">
                <a class="btn btn-danger text-white" onclick="removeFromCart('${item.id}')">حذف</a>
                </th>
                <td>${item.name}</td>
                <td>
                <span class="badge badge-secondary" style="cursor: pointer;" onclick="plus('${item.id}')">+</span>
                   ${item.number}
                <span class="badge badge-danger" style="cursor: pointer;" onclick="minus('${item.id}')">-</span>
                </td>
                <td id="price"> ${item.total} </td>
              </tr>
              
            `).join(" ")
    } else {
        displayCard.innerHTML = `
        <div class="container text-center">
        <h5> متاسفانه هنوز هیچ سفارشی ثبت نشده است</h5>

        <a href="/menu">لطفا از اینجا برای سفارش اقدام کنید </a>
         </div>
        `
    }


    // CALCULATE TOTALPRICE
    const totalPrice = products.reduce(function (tot, arr) {
        return tot + ++arr.total;
    }, 0);

    document.getElementById("totalPrice").innerHTML = `${totalPrice} تومان`;

    //SET COOKIE TOTAL PRICE 
    $.cookie("totalPrice", JSON.stringify(totalPrice), { expires: 2, path: "/" })
    let total = $.cookie("totalPrice")
    console.log(total);
}


function plus(id) {
    let count = 1;
    let products = $.cookie(cookieName)
    products = JSON.parse(products)
    const product = products.find(item => item.id == id)
    product.number += count
    product.total = product.number * product.unitPrice;
    $.cookie(cookieName, JSON.stringify(products), { expires: 2, path: "/" })
    updateCart()
}
function minus(id) {
    let count = 1;
    let products = $.cookie(cookieName)
    products = JSON.parse(products)
    const product = products.find(item => item.id == id)
    product.number -= count
    if (product.number == 0) {
        product.number = 1
    } else {
        product.total = product.number * product.unitPrice;
    }

    $.cookie(cookieName, JSON.stringify(products), { expires: 2, path: "/" })
    updateCart()
}




function removeFromCart(id) {
    let products = $.cookie(cookieName)
    products = JSON.parse(products)
    const itemToRemove = products.findIndex(x => x.id == id)
    products.splice(itemToRemove, 1)
    $.cookie(cookieName, JSON.stringify(products), { expires: 2, path: "/" })
    updateCart()
}

updateCart();