const addSubButton = document.querySelector("#add-sub-button");
const dataRemove = document.querySelector(".remove-button");
let subList = [];


const AddSub = () => {
    let name = prompt("What is name of sub?");
    let lastname = prompt("What is lastname of sub?");
    let period = prompt(`How many months does sub want to?
    Packages: 1,3,6,12 Months
    `);
    let today = new Date();
    let date = today.toLocaleDateString("tr-TR");

    if (name != "" & name != null & lastname != "" & lastname != null & period != "" & period != null){
        const sub = new Subscriber(name.trim(), lastname.trim(), period.trim(), date);
        sub.AddSub();
    }

}

const PageLoaded = () => {
    const sub = new Subscriber();
    sub.PageLoaded();
}




addSubButton.addEventListener("click", AddSub);

document.addEventListener("DOMContentLoaded", PageLoaded);

