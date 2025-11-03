class GymBase {

    subList = [];



    constructor(name, lastname, period, date) {
        this.name = name;
        this.lastname = lastname;
        this.period = period;
        this.date = date;
    }


    AddSub() {
        this.CheckSubList();
        let fullname = `${this.name} ${this.lastname}`;
        let isNewSub = true;

        this.subList.forEach(function (subFullName) {
            if (subFullName.fullname.toLowerCase() == fullname.toLowerCase()) {
                isNewSub = false;
            }

        })

        if (this.name != "" & this.name != null & this.lastname != "" & this.lastname != null & this.period != "" & this.period != null) {
            //We can add sub
            if (isNewSub) {
                this.AddNewSub();
            } else {
                this.UpdateOldSub(fullname);
            }
        } else {
            // we must give an error message
            alert("Something went wrong!");
        }

    }



    UpdateOldSub(fullname) {
        this.CheckSubList();

        let arrayOfFullnames = [];
        this.subList.forEach(value => {
            arrayOfFullnames.push(value.fullname);
        })

        let subIndex = arrayOfFullnames.indexOf(fullname); // If array don't have value, it will return -1.

        this.subList.splice(subIndex, 1); // Deleted the old user.

        let oldSub = this.SubCreator(this.FeeDeterminer(false, this.period));
        this.subList.push(oldSub);
        localStorage.setItem("subList", JSON.stringify(this.subList));

        //Refresh the page 
        location.reload();
    }



    AddNewSub() {
        this.CheckSubList();
        let newSub = this.SubCreator(this.FeeDeterminer(true, this.period));
        this.subList.push(newSub);
        localStorage.setItem("subList", JSON.stringify(this.subList));
        
        //Refresh the page 
        location.reload();
    }


    // İf localStorage don't have subList, create new one as empty. Else, get subList.
    CheckSubList() {
        if (localStorage.getItem("subList") === null) {
            this.subList = [];
        } else {
            this.subList = JSON.parse(localStorage.getItem("subList"));
        }
    }


    FeeDeterminer(isNewSub, period) {
        let discountRate = 15;
        let normalFee;

        switch (period) {
            case "1":
                normalFee = 1500;
                break;
            case "3":
                normalFee = 3500;
                break;
            case "6":
                normalFee = 5500;
                break;
            case "12":
                normalFee = 9000;
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


        let sub = {
            fullname: fullname,
            period: period,
            fee: fee,
            date: date
        }

        return sub;

    }


    PageLoaded() {
        this.CheckSubList();

        
        const mainGrid = document.querySelector(".grid-div");
        
        this.subList.forEach(sub => {
            const gridItem = document.createElement("div");
            gridItem.className = "grid-item";

            // if period is one month, don't write "one months"
            let monthText = "Months";
            if (sub.period == 1){
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
                <div class="remove-button-div">
                    <button class="remove-button">Remove</button>
                </div>
            `;

            gridItem.innerHTML = cardContent;
            mainGrid.appendChild(gridItem);


        })
    }

}