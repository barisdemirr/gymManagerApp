class Subscriber extends GymBase {

    constructor(name, lastname, period, date){
        super(name, lastname, period, date)
    }

    AddSub() {
        super.AddSub();
    }

    PageLoaded(){
        super.PageLoaded();
    }

    DeleteSub(deleteButton){
        super.DeleteSub(deleteButton);
    }

    DeleteAllSubs(){
        super.DeleteAllSubs();
    }

    UpdatePrice(packageName, newPrice){
        super.UpdatePrice(packageName, newPrice);
    }

    FilterSub(filterValue){
        super.FilterSub(filterValue);
    }
}