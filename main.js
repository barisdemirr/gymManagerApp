const addSubButton = document.querySelector("#add-sub-button");




const AddSub = () => {
    let name = prompt("What is name of sub?");
    let lastname = prompt("What is lastname of sub?");
    let period = prompt(`How many months does sub want to?
    Packages: 1,3,6,12 Months
    `);
    let today = new Date();
    let date = today.toLocaleDateString("tr-TR");

    const sub = new Subscriber(name, lastname, period, date);
    sub.AddSub();

}

const PageLoaded = () => {
    let subList = [];
    if (localStorage.getItem("subList") === null) {
        subList = [];
    } else {
        subList = JSON.parse(localStorage.getItem("subList"));
    }

        const mainGrid = document.querySelector(".grid-div");
        
        subList.forEach(sub => {
            const gridItem = document.createElement("div");
            gridItem.className = "grid-item";
            console.log(sub);

            const cardContent = `
                <div>
                    <h2 class="card-title">${sub.fullname}</h2>
                </div>
                <div>
                    <p class="p-tags">Subscription Length: ${sub.period} Months</p>
                    <p class="p-tags">Bill: ${sub.fee} TL</p>
                    <p class="p-tags">Starting Date: ${sub.date}</p>
                </div>
                <div class="remove-button-div">
                    <button class="remove-button">Remove</button>
                </div>
            `;

            gridItem.innerHTML = cardContent;
            mainGrid.appendChild(gridItem);

            
        })
}


addSubButton.addEventListener("click", AddSub);

document.addEventListener("DOMContentLoaded", PageLoaded);