async function fetchProducts() {
    try {
        const response = await fetch('https://fakestoreapi.com/products/')
        const data = await response.json()
        return data
    } catch (error) {
        console.error(error + "Fetch has failed")
    }
}

const productList = await fetchProducts()

async function createCardTemplate() {
    try {
        const response = await fetch('./card.html');
        const template = await response.text();
        console.log('template created')
        return template;
    } catch (error) {
        console.error("Failed to fetch card template:", error);
        return null;
    }
}

async function createCard() {
    const cardTemplate = await createCardTemplate();
    if (!cardTemplate) {
        console.error("Card template not available");
        return;
    }

    productList.forEach(product => {
        const card = document.createElement('div');
        card.innerHTML = cardTemplate;

        card.querySelector('.card-img-top').src = product.image;
        card.querySelector('.card-title').textContent = product.title;
        card.querySelector('.card-price').textContent = "$" + product.price;
        
        const cardButton = card.querySelector('.card-button');
        cardButton.setAttribute('buttonid', product.id);

        cardButton.addEventListener('click', () => {
            console.log('hello3')
            const productForm = document.querySelector('.product-info');
            productForm.style.display = "block";
            productInfo(product.image, 
                product.title, 
                product.description, 
                "$" + product.price, 
                product.id);
            console.log(cardButton.getAttribute('buttonid'))

            const buyButton = document.querySelector('.buy-button')
            buyButton.setAttribute('buyButtonId', product.id)
        });

        document.getElementById("container-cards").appendChild(card.firstChild);

    });
    console.log('cards created')
}

createCard();


/* const buyButton2 = document.querySelector('.buy-button');
buyButton2.addEventListener('click', function(event) {
    event.preventDefault();
    
}); */

const buyButton = document.querySelector('.buy-button');
buyButton.addEventListener('click', function(event) {
    event.preventDefault();
    createCustomerList();
    createProductList();
    window.location.href = 'order-conf.html';
});


function productInfo(image, title, desc, price, productId) {
    const productInfo = document.querySelector('.product-info');
    productInfo.querySelector('.card-img-top').src = image;
    productInfo.querySelector('.info-title').textContent = title;
    productInfo.querySelector('.info-desc').textContent = desc;
    productInfo.querySelector('.info-price').textContent = price;

    const infoButton = productInfo.querySelector('.info-button');
    infoButton.setAttribute('buttonid', productId);
    infoButton.addEventListener('click', () => localStorage.setItem('productId',productId) );
    
}

function createCustomerList(){
    var nameOfCustomer = document.querySelector('.name').value;
    var emailOfCustomer = document.querySelector('.mail').value;
    var phoneOfCustomer = document.querySelector('.phone').value;
    var adressOfCustomer = document.querySelector('.adress').value;
    var zipcodeOfCustomer = document.querySelector('.zipcode').value;
    var cityOfCustomer = document.querySelector('.city').value;
    
    var customerData = {
        Name: nameOfCustomer,
        email: emailOfCustomer,
        phone: phoneOfCustomer,
        address: adressOfCustomer,
        zipcode: zipcodeOfCustomer,
        city: cityOfCustomer
    };

    localStorage.setItem('customerData', JSON.stringify(customerData));
}

function createProductList(){

    const productId = document.querySelector('.buy-button').getAttribute('buyButtonId')

    const product = productList.find(product => product.id === parseInt(productId))
    console.log(product.price)

    var productData = {
        titleOfProduct: product.title,
        descOfProduct: product.description,
        priceOfProduct: product.price.toString(),
        idOfProduct: product.id.toString()
    }; 

    localStorage.setItem('productData', JSON.stringify(productData));

}



