const addSubButton = document.querySelector("#add-sub-button");
const dataRemove = document.querySelector(".remove-button");
const searchInput = document.querySelector("#search-input");
const allSubsOnScreen = document.querySelector(".grid-div");
const deleteAllSubs = document.querySelector("#delete-all-subs-button");

let subList = [];


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


addSubButton.addEventListener("click", AddSub);

document.addEventListener("DOMContentLoaded", PageLoaded);

allSubsOnScreen.addEventListener("click", DeleteSub);

deleteAllSubs.addEventListener("click", DeleteAllSubs)
