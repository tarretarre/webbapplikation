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


/*
function createElementFromString(inputStr) {
    const div = document.createElement('div');
    div.innerHTML = inputStr;

    return div.firstChild;
}

function loadProducts() {
    productList.forEach(product => {
        const xhr = new XMLHttpRequest();
        xhr.onload = () => {
            const card = createElementFromString(xhr.response)

            card.querySelector('.card-img-top').src = product.image;
            card.querySelector('.card-title').textContent = product.title;
            card.querySelector('.card-price').textContent = product.price;

            document.getElementById('container-cards').appendChild(card)
        }

        xhr.open('GET', 'card.html')
        xhr.send()
    })
} */

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
        });

        document.getElementById("container-cards").appendChild(card.firstChild);
    });

    
    console.log('cards created')
}

createCard();

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
    const pictureOfProduct = productInfo.querySelector('.card-img-top').src = image;
    const titleOfProduct = productInfo.querySelector('.info-title').textContent = title;
    const descOfProduct = productInfo.querySelector('.info-desc').textContent = desc;
    const priceOfProduct = productInfo.querySelector('.info-price').textContent = price;
    const listKund = [pictureOfProduct, titleOfProduct, descOfProduct, priceOfProduct]
}

function createProductList(image, title, desc, price, productId){
    const listProduct = [image, title, desc, price, productId]
}