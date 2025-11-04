class GymBase {

    priceList = [];


    constructor(name, lastname, period, date) {
        this.name = name;
        this.lastname = lastname;
        this.period = period;
        this.date = date;
    }


    AddSub() {
        let subList = this.CheckSubList();
        let fullname = `${this.name} ${this.lastname}`;
        let isNewSub = true;

        subList.forEach(function (subFullName) {
            // If sub already exists, isNewSub will be false
            if (subFullName.fullname.toLowerCase() == fullname.toLowerCase()) {
                isNewSub = false;
            };
        })

        
        if (isNewSub) {
            this.AddNewSub();
        } else {
            this.UpdateOldSub(fullname);
        }
    }



    UpdateOldSub(fullname) {
        let subList = this.CheckSubList();

        let arrayOfFullnames = [];
        subList.forEach(value => {
            arrayOfFullnames.push(value.fullname.toLowerCase());
        })

        let subIndex = arrayOfFullnames.indexOf(fullname.toLowerCase()); // If array don't have value, it will return -1.

        // Deleted the old user.
        subList.splice(subIndex, 1);

        let oldSub = this.SubCreator(this.FeeDeterminer(false, this.period));
        subList.push(oldSub);

        localStorage.setItem("subList", JSON.stringify(subList));

        //Refresh the page 
        location.reload();
    }



    AddNewSub() {
        let subList = this.CheckSubList();

        // SubCreator takes fee as parameter, we set the fee in FeeDeterminer and send it as parameter.
        let newSub = this.SubCreator(this.FeeDeterminer(true, this.period));

        subList.push(newSub);
        localStorage.setItem("subList", JSON.stringify(subList));

        //Refresh the page 
        location.reload();
    }


    // İf localStorage don't have subList, create new one as empty. Else, take subList.
    CheckSubList() {
        let subList = [];

        if (localStorage.getItem("subList") != null) {
            subList = JSON.parse(localStorage.getItem("subList"));
        }

        return subList;
    }


    // We get the priceList from localStorage
    CheckPriceList() {
        this.priceList = JSON.parse(localStorage.getItem("priceList"));
    }


    FeeDeterminer(isNewSub, period) {
        this.CheckPriceList();

        let discountRate = 15;
        let normalFee;

        // We determine the fee from priceList based on the subscription period.
        switch (period) {
            case "1":
                normalFee = this.priceList[0].package1;
                break;
            case "3":
                normalFee = this.priceList[1].package3;
                break;
            case "6":
                normalFee = this.priceList[2].package6;

                break;
            case "12":
                normalFee = this.priceList[3].package12;
                break;
        }

        // İf sub is new one, apply 15% discount.
        if (isNewSub) {
            let fee = normalFee * (100 - discountRate) / 100;
            return fee;
        } else {
            return normalFee;
        }
    }


    // Create a new subscriber
    SubCreator(fee) {
        let period = this.period;
        let fullname = `${this.name} ${this.lastname}`;
        let date = this.date
        let id = this.IDGenerator();


        let sub = {
            id: id,
            fullname: fullname,
            period: period,
            fee: fee,
            date: date
        }

        return sub;

    }


    PageLoaded() {
        let subList = this.CheckSubList();

        // List the subs to the frontend =>

        const mainGrid = document.querySelector(".grid-div");

        subList.forEach(sub => {
            const gridItem = document.createElement("div");
            gridItem.className = "grid-item";

            // if period is one month, don't write "one months"
            let monthText = "Months";
            if (sub.period == 1) {
                monthText = "Month";
            }

            // Create a new card
            const cardContent = `
                <div>
                    <h2 class="card-title">${sub.fullname}</h2>
                </div>
                <div>
                    <p class="p-tags">Subscription Length: ${sub.period} ${monthText}</p>
                    <p class="p-tags">Bill: ${sub.fee} TL</p>
                    <p class="p-tags">Starting Date: ${sub.date}</p>
                </div>
                <div class="delete-button-div">
                    <button class="delete-button" data-id="${sub.id}">Delete</button>
                </div>
            `;

            gridItem.innerHTML = cardContent;
            mainGrid.appendChild(gridItem);
        })

        // <=


        // If there isn't priceList in the localStorage, create new one with default prices. =>

        let priceList = localStorage.getItem("priceList");
        if (priceList == null) {

            let defaultPrices =
                [
                    { package1: 1500 },
                    { package3: 3500 },
                    { package6: 5500 },
                    { package12: 9000 }
                ]


            localStorage.setItem("priceList", JSON.stringify(defaultPrices));
        }

        // <=
    }



    // This function ensures that each subscriber has a unique ID.
    IDGenerator() {
        let subList = this.CheckSubList();
        let IDList = [];

        // Load all existing IDs
        subList.forEach(sub => IDList.push(sub.id));

        // return the smallest unique id
        for (let i = 0; i < IDList.length + 1; i++) {
            if (IDList.includes(i)) {
                continue;
            } else {
                return i;
            }
        }
    }

    DeleteSub(deleteButton) {

        let subList = this.CheckSubList();
        let deleteButtonID = deleteButton.dataset.id; // dataset.id uses for data-id which is html attribute

        //Delete from FrontEnd
        deleteButton.parentElement.parentElement.remove();

        //Delete from BackEnd (from LocalStorage)
        subList.forEach(sub => {
            if (sub.id == deleteButtonID) {
                this.DeleteFromStorage(deleteButtonID);
            }
        })
    }


    DeleteFromStorage(ID) {
        let subList = this.CheckSubList();

        subList.forEach((sub, index) => {
            if (ID == sub.id) {
                subList.splice(index, 1);
                localStorage.setItem("subList", JSON.stringify(subList));
            }
        });
    }


    DeleteAllSubs() {
        let emptySubList = [];

        localStorage.setItem("subList", JSON.stringify(emptySubList));

        // Refresh the page
        location.reload();
    }


    UpdatePrice(packageName, newPrice) {
        this.CheckPriceList();
        
        switch (packageName) {
            case "package1":
                this.priceList[0].package1 = newPrice;
                break;
            case "package3":
                this.priceList[1].package3 = newPrice;
                break;
            case "package6":
                this.priceList[2].package6 = newPrice;
                break;
            case "package12":
                this.priceList[3].package12 = newPrice;
                break;
        }
        localStorage.setItem("priceList", JSON.stringify(this.priceList));
    }


    FilterSub(filterValue) {
        let subList = document.querySelectorAll(".grid-item");
        let filterText = filterValue.toLowerCase().trim();


        subList.forEach(sub => {
            let subFullname = sub.children[0].children[0].innerHTML.toLowerCase();
            
            if (subFullname.includes(filterText)) {
                sub.style.display = "block";
            } else {
                sub.style.display = "none";
            }
        })
    }
}