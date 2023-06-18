displayCheck = () =>{

    let data = JSON.parse(localStorage.getItem('order'));
    let items = document.getElementById('checkoutOrder');
    let totalArea = document.getElementById('totalOut');

    let checkTotal = 0;

    for(let i = 0; i < data.length; i ++){

        let name = data[i].name;
        let bread = data[i].breadOptions;
        let crispyNormal = data[i].crispyNormal;
        let sauces = data[i].sauces;
        let fillings = data[i].fillings;
        let price = data[i].subPrice; 

        checkTotal += price;

        items.innerHTML += `
            <div class="orderLine">
                <p><strong>TitleName:</strong>${name}</p>
                <p><strong>Crispy/normal:</strong>${crispyNormal}</p>
                <p><strong>bread:</strong>${bread}</p>
                <p><strong>Sauces:</strong>${sauces.join(', ')}</p>
                <p><strong>Fillings:</strong>${fillings.join(', ')}</p>
                <p><strong>Price:</strong>R${price}.00</p>
            </div>`

        totalArea.innerHTML = "R" + checkTotal + ".00"
        
    }

}

resetReturn =() =>{
    localStorage.removeItem('order');
    window.location.href = '../index.html'
}