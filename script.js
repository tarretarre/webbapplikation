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
        card.querySelector('.card-price').textContent = product.price;

        document.getElementById("container-cards").appendChild(card.firstChild);
    });
}

createCard();
