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
                pTagg.className = 'confi-p'
                if(key === 'Price') {
                    pTagg.textContent = '$'
                }
                pTagg.textContent = key.charAt(0).toUpperCase() + key.slice(1) + ': ' + pTagg.textContent + productData[key].charAt(0).toUpperCase() + productData[key].slice(1);
                bestProduct.appendChild(pTagg);
            } else {
                console.log("Något gick fel, saknar nyckel")
            }
        }
    } else {
        console.log(`Något gick fel, saknar Input`)
    }

    var datumBstElement = document.getElementById('datumBst')
    datumBstElement.innerHTML = '<h5>Order date: </h5>' + genereraDagensDatum();
    
});


function genereraDagensDatum() {
    var idag = new Date();
    var dagensDatum = idag.getDate();
    var dagensMånad = idag.getMonth() + 1;
    var dagensÅr = idag.getFullYear();
    var timme = idag.getHours();
    var minut = idag.getMinutes();
    var sekund = idag.getSeconds();
    var ampm = timme >= 12 ? 'pm' : 'am';

    if (timme > 12) {
        timme = timme - 12;
    } else if (timme === 0 ) {
        timme = 12;
    }

    minut = minut < 10 ? '0' + minut : minut;
    sekund = sekund < 10 ? '0' + sekund : sekund;

    var tidPunkt = '[' + timme + ':' + minut + ':' + sekund + ' ' + ampm + ']';

    var datumText = dagensÅr + '-' + dagensMånad + '-' + dagensDatum + ' ' + tidPunkt;

    return datumText;
}
