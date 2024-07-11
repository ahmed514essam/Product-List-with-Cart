fetch('./data.json')
    .then(res => res.json())
    .then(data => {
        const contentProduct = document.querySelector(".contentProduct");
        
        data.map((a) => {
            const productHTML = `
                <div class="myCart">
                    <div class="imgcontent">
                        <img src="${a.image.desktop}" />
                    </div>
                    <div class="amout">
                        <button class="addy">Add Cart</button>
                      
                    </div>
                    <div class="details">
                        <p class="catg">${a.category}</p>
                        <p class="namep">${a.name}</p>
                        <p class="redPrice">$${parseFloat(a.price).toFixed(2)}</p>
                    </div>
                </div>
            `;
            contentProduct.innerHTML += productHTML;
        });
        document.querySelectorAll('.myCart').forEach(cart => {
            let amount = 1; 
            const plusButton = cart.querySelector(".btnplas");
            const minusButton = cart.querySelector(".btnMins");
            const amountDisplay = cart.querySelector(".amo");

            plusButton.addEventListener("click", function() {
                amount += 1; 
                amountDisplay.innerHTML = amount; 
            });

            minusButton.addEventListener("click", function() {
                if (amount > 0) {
                    amount -= 1; 
                    amountDisplay.innerHTML = amount; 
                }
            });
        });
let addCart = document.querySelector(".addy")

addCart.addEventListener("click" , function() {

document.querySelector(".amout").innerHTML  = `


<button class="btnplas">+</button>
<span class="amo">1</span>
<button class="btnMins">-</button>

` ;


})


    })
    .catch(error => console.error('Error fetching data:', error));


