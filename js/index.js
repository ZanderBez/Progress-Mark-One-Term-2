displaySubs = () =>{
    let monthSubs = document.getElementById('subsOut')

    for(let i = 0; i < subsData.length; i ++){
    
            let name = subsData[i].name;
            let bread = subsData[i].breadOptions;
            let crispyNormal = subsData[i].crispyNormal;
            let sauces = subsData[i].sauces;
            let fillings = subsData[i].fillings;
            let price = subsData[i].subPrice;

            monthSubs.innerHTML += `
            <div class="card2">
            <div class="card-body">
                <h5 class="card-title" style="border-bottom: 2px solid #ff5500">${name}</h5>
                <div class="col-image2"></div>
                <h5 class="card-title">Love Your Masterpiece!</h5>
                <p class="card-text"><strong>Crispy/Normal: </strong>${crispyNormal}</p>
                <p class="card-text"><strong>Bread: </strong>${bread}</p>
                <p class="card-text"><strong>Sauces: </strong>${sauces.join(", ")}</p>
                <p class="card-text"><strong>Fillings: </strong>${fillings.join(", ")}</p>
                <p class="card-text"><strong>Cost:</strong>R${price}.00</p>
            </div>
        </div>`;
    }
}


let subOrder = [];
let couponApplied = false;

makeSub = () =>{

    let subTotal = 0;

    let name = document.getElementById("name").value;

    let breadOption = document.getElementsByName("breadRadio");
    let breadValue; 
    for(let i = 0; i < breadOption.length; i++){
        if(breadOption[i].checked){
            breadValue = breadOption[i].value
            subTotal = subTotal + +breadOption[i].dataset.cost
        }
    }

    let formGroup = document.getElementsByName("radio");
    let formValue; 
    for(let i = 0; i < formGroup.length; i++){
        if(formGroup[i].checked){
            formValue = formGroup[i].value
            subTotal = subTotal + +formGroup[i].dataset.cost
        }
    }

    let saucesOptions = document.getElementsByName("sauces");
    let sauceArray = [];
    for(let i = 0; i < saucesOptions.length; i++){
        if(saucesOptions[i].checked){
            sauceArray.push(saucesOptions[i].value);
           subTotal = subTotal + +saucesOptions[i].dataset.cost
        }
    }
    let fillingsOptions = document.getElementsByName("fillings");
    let filArray = [];
    for(let i = 0; i < fillingsOptions.length; i++){
        if(fillingsOptions[i].checked){
            filArray.push(fillingsOptions[i].value);
           subTotal = subTotal + +fillingsOptions[i].dataset.cost
        }
    }

    subOrder.push({
        name: name,
        breadOptions: breadValue,
        crispyNormal: formValue,
        sauces: sauceArray,
        fillings: filArray,
        subPrice: subTotal
    });

    console.log(subOrder)
    document.getElementById("realTimeCost").innerHTML = "R0.00"
    document.getElementById("SubForm").reset();

}

realTimeCost = () => {
    
    let realTimePrice = 0


    let breadOption = document.getElementsByName("breadRadio");

    for(let i = 0; i < breadOption.length; i++){
        if(breadOption[i].checked){
            realTimePrice = realTimePrice + +breadOption[i].dataset.cost
        }
    }

    let formGroup = document.getElementsByName("radio");
    for(let i = 0; i < formGroup.length; i++){
        if(formGroup[i].checked){
            realTimePrice =realTimePrice + +formGroup[i].dataset.cost
        }
    }

    let saucesOptions = document.getElementsByName("sauces");
    for(let i = 0; i < saucesOptions.length; i++){
        if(saucesOptions[i].checked){
            realTimePrice =realTimePrice + +saucesOptions[i].dataset.cost
        }
    }

    let fillingsOptions = document.getElementsByName("fillings");
    for(let i = 0; i < fillingsOptions.length; i++){
        if(fillingsOptions[i].checked){
            realTimePrice =realTimePrice + +fillingsOptions[i].dataset.cost
        }
    }

    document.getElementById("realTimeCost").innerHTML = "R" + realTimePrice + ".00";
}

displayOrder = () => {

    let area = document.getElementById("orders");
    let cost = document.getElementById("orderTotal");

    let overallTotal = 0;

    area.innerHTML = "";

    for(let i =0; i < subOrder.length; i++){

        let name = subOrder[i].name;
        let bread = subOrder[i].breadOptions;
        let crispyNormal = subOrder[i].crispyNormal;
        let sauces = subOrder[i].sauces;
        let fillings = subOrder[i].fillings;
        let price = subOrder[i].subPrice;

        overallTotal += price;

        cost.innerHTML = "R" + overallTotal + ".00";

        area.innerHTML +=`
        <div class="card1">
            <div class="card-body">
                <h5 class="card-title" style="border-bottom: 2px solid #ff5500">${name}</h5>
                <div class="col-image3"></div>
                <h5 class="card-title">Love Your Masterpiece!</h5>
                <p class="card-text"><strong>Crispy/Normal: </strong>${crispyNormal}</p>
                <p class="card-text"><strong>Bread: </strong>${bread}</p>
                <p class="card-text"><strong>Sauces: </strong>${sauces.join(", ")}</p>
                <p class="card-text"><strong>Fillings: </strong>${fillings.join(", ")}</p>
                <p class="card-text"><strong>Cost:</strong>R${price}.00</p>
            </div>
        </div>`

    }
}

applyCoupon = () => {
    const couponCode = document.getElementById("promo").value;
    
    if (couponCode === "#1111" && !couponApplied) {
        let totalArea = document.getElementById("totalOut");
        let total = parseInt(totalArea.innerText.substring(1));
        
        let discount = Math.round(total * 0.2);
        total -= discount;
        
        totalArea.innerText = "R" + total + ".00";
        couponApplied = true;
        alert("Congratu-lations! Your coupon has just done a 20% mic drop on your total! Woohoo!");
    } else {
        alert("Oopsie-daisy! It seems like your coupon code took a wrong turn and ended up in the land of expiration.");
    }
}

checkout = () => {
    let data = JSON.stringify(subOrder)
    localStorage.setItem('order', data)
    window.location.href = 'checkOut.html'
}
