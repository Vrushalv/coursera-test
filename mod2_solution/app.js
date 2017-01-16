(function() {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService){
    var buyCntrl = this;

    buyCntrl.items = ShoppingListCheckOffService.getToBuyList();
    buyCntrl.listLen = buyCntrl.items.length;

    buyCntrl.removeToBuyItem = function(indx) {
        ShoppingListCheckOffService.addAndRemove(indx);        
    }
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService){
    var boughtList = this;
    boughtList.items = ShoppingListCheckOffService.getBoughtList();
    boughtList.listLen = boughtList.items.length;
}

function ShoppingListCheckOffService(){
    var service = this;

    // List of items toBuy
    var toBuyList = [
                    {name : 'cookies', quantity : 10},
                    {name : 'chips', quantity : 20},
                    {name : 'ice tea', quantity : 30},
                    {name : 'chocolates', quantity : 40},
                    {name : 'apples', quantity : 50},
                    ];
    var boughtList = [];

    service.addAndRemove = function(indx){
        var item = toBuyList.splice(indx, 1)[0];
        boughtList.push(item);
    }

    service.getToBuyList = function() {
        return toBuyList;
    }

    service.getBoughtList = function() {
        return boughtList;
    }
}

})();