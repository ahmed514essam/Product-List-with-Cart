fetch("./data.json")
  .then((res) => res.json())
  .then((data) => {
    const contentProduct = document.querySelector(".contentProduct");

    data.forEach((a) => {
      const productHTML = `
        <div class="myCart">
          <div class="imgcontent">
            <img src="${a.image.desktop}" />
          </div>
          <div class="amout">
            <button class="addy" data-product='${JSON.stringify(a)}'>Add Cart</button>
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

    document.querySelectorAll(".addy").forEach((button) => {
      button.addEventListener("click", function () {
        const product = JSON.parse(this.dataset.product);
        const amoutDiv = this.parentElement;
        amoutDiv.innerHTML = `
          <button class="btnplas">+</button>
          <span class="amo">1</span>
          <button class="btnMins">-</button>
        `;

        let amount = 1;
        const plusButton = amoutDiv.querySelector(".btnplas");
        const minusButton = amoutDiv.querySelector(".btnMins");
        const amountDisplay = amoutDiv.querySelector(".amo");

        plusButton.addEventListener("click", function () {
          amount += 1;
          amountDisplay.innerHTML = amount;
          updateCart(product, amount);
        });

        minusButton.addEventListener("click", function () {
          if (amount > 0) {
            amount -= 1;
            amountDisplay.innerHTML = amount;
            updateCart(product, amount);
          }
        });

        updateCart(product, amount);
        console.log("Product added to cart:", product);
      });
    });
  })
  .catch((error) => console.error("Error fetching data:", error));

function updateCart(product, amount) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  
  const existingProductIndex = cart.findIndex(item => item.name === product.name);
  if (existingProductIndex !== -1) {
    cart[existingProductIndex].amount = amount;
  } else {
    cart.push({ ...product, amount });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

function displayCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const con = document.querySelector(".con");
  con.innerHTML = "";

  let totalPrice = 0;

  cart.forEach((item, index) => {
    const itemTotalPrice = (item.price * item.amount).toFixed(2);
    totalPrice += parseFloat(itemTotalPrice);

    const cartItemHTML = `
      <div class="one">
        <div class="names">
          <p class="cc">${item.category}</p>
          <p class="fffee">${item.name}</p>
        </div>
        <div class="num">
          <p>${item.amount}</p>
          <p class="rP">$${itemTotalPrice}</p>
        </div>
        <div class="divDele">
          <button class="btnDel" data-index="${index}">X</button>
        </div>
      </div>
    `;
    con.innerHTML += cartItemHTML;
  });

  document.querySelectorAll(".btnDel").forEach((button) => {
    button.addEventListener("click", function () {
      const index = this.dataset.index;
      removeFromCart(index);
    });
  });

  const Tot = document.querySelector(".Tot");
  if (Tot) {
    Tot.innerHTML = `Totall Price: $${totalPrice.toFixed(2)}`;
  } else {
    const totalElement = document.createElement("div");
    totalElement.className = "Tot";
    totalElement.innerHTML = `Totall Price: $${totalPrice.toFixed(2)}`;
    document.querySelector(".pppppf").appendChild(totalElement);
  }
}

function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

setTimeout(displayCart, 0);
