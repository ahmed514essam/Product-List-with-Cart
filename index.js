fetch('./data.json')
    .then(res => res.json())
    .then(data => {
        data.map((a) => {
            const contentProduct = document.querySelector(".contentProduct");

            const productHTML = `
                <div class="myCart">
                    <div class="imgcontent">
                        <img src="${a.image.desktop}" />
                    </div>
                   
                    <div class="amout">
                        <button>+</button>
                        <span>0</span>
                        <button>-</button>
                    </div>
                    <p>${a.category}</p>
                    <p>${a.name}</p>
                    <p class="redPrice" >$${parseFloat(a.price).toFixed(2)}</p>
                </div>
            `;

            contentProduct.innerHTML += productHTML;

            console.log(a);
        });
    })
    .catch(error => console.error('Error fetching data:', error));
    
    
