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
            if (subFullName.fullname == fullname) {
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
            // we must give a error message
            console.log("Something went wrong!");
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

        let oldSub = this.FeeDeterminer(false, this.period);
        this.subList.push(oldSub);
        localStorage.setItem("subList", JSON.stringify(this.subList));
        location.reload();
    }



    AddNewSub() {
        this.CheckSubList();
        let newSub = this.FeeDeterminer(true, this.period);
        this.subList.push(newSub);
        localStorage.setItem("subList", JSON.stringify(this.subList));
        location.reload();
    }


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

        if (isNewSub) {
            let fee = normalFee * (100 - discountRate) / 100;
            return this.SubCreator(fee);
        } else {
            return this.SubCreator(normalFee);
        }
    }


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



}