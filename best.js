document.addEventListener('DOMContentLoaded', function() {
    var customerData = JSON.parse(localStorage.getItem('customerData'));
    if (customerData) {
        var bstInfoSite = document.getElementById('beställare');
        for (var key in customerData) {
            if (customerData.hasOwnProperty(key)) {
                var p = document.createElement('p');
                p.textContent = key.charAt(0).toUpperCase() + key.slice(1) + ': ' + customerData[key].charAt(0).toUpperCase() + customerData[key].slice(1);
                bstInfoSite.appendChild(p);
            } else {
                console.log("Något gick fel, nyckel saknas")
            }
        }
    } else{
        console.log("Något gick fel, input saknas")
    }

    var productData = JSON.parse(localStorage.getItem('productData'));
    if(productData){
         var bestProduct = document.querySelector('#bstprodukter');
        for(var key in productData){
            if(productData.hasOwnProperty(key)){
                var pTagg = document.createElement('p');
                pTagg.textContent = key.charAt(0).toUpperCase() + key.slice(1) + ': ' + productData[key].charAt(0).toUpperCase() + productData[key].slice(1);
                bestProduct.appendChild(pTagg);
            } else {
                console.log("Något gick fel, saknar nyckel")
            }
        }
    } else {
        console.log(`Något gick fel, saknar Input`)
    }
});


