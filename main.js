// HTML OBJECTS
const addSubButton = document.querySelector("#add-sub-button");
const dataRemove = document.querySelector(".remove-button");
const searchInput = document.querySelector("#search-input");
const allSubsOnScreen = document.querySelector(".grid-div");
const deleteAllSubs = document.querySelector("#delete-all-subs-button");
const updatePricesButton = document.querySelector("#update-prices-button");



// FUNCTIONS

const AddSub = () => {
    let name = prompt("What is name of sub?");
    let lastname = prompt("What is lastname of sub?");
    let period = prompt(`How many months does sub want to?
    Packages: 1,3,6,12 Months
    `);
    let today = new Date();
    let date = today.toLocaleDateString("tr-TR");

    if (name != "" & name != null & lastname != "" & lastname != null & period != "" & period != null) {
        if (period==12 || period==6 || period==3 || period==1) {
            const sub = new Subscriber(name.trim(), lastname.trim(), period.trim(), date);
            sub.AddSub();
        }else{
            alert("Please choose a true package.");
        }
    }else{
        alert("Something went wrong!");
    }

}

const PageLoaded = () => {
    const sub = new Subscriber();
    sub.PageLoaded();
}


const DeleteSub = e => {
    if (e.target.className == "delete-button") {
        const sub = new Subscriber();
        sub.DeleteSub(e.target);
    }
}

function DeleteAllSubs() {
    let isConfirmed = confirm("Are you sure you want to delete all subscribers?");

    if (isConfirmed) {
        const sub = new Subscriber();
        sub.DeleteAllSubs();
    }
}

const UpdatePrice = ()=>{
    let packageName = prompt("Which package do you want to update?\n(package + Month)");

    if (packageName=="package1" || packageName=="package3" || packageName=="package6" || packageName=="package12"){
        let newPrice = prompt("Enter new price.\nThis process dont't affect old subscribers!");

        const sub = new Subscriber();
        sub.UpdatePrice(packageName, newPrice);
    }else{
        alert("Please enter a true package number.");
    }
}


const FilterSub = e =>{
    const sub = new Subscriber();
    sub.FilterSub(e.target.value);
}




// EVENTS

addSubButton.addEventListener("click", AddSub);

document.addEventListener("DOMContentLoaded", PageLoaded);

allSubsOnScreen.addEventListener("click", DeleteSub);

deleteAllSubs.addEventListener("click", DeleteAllSubs)

updatePricesButton.addEventListener("click", UpdatePrice);

searchInput.addEventListener("keyup", FilterSub);