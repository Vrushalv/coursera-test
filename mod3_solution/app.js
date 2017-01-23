(function() {
    'use strict'
    angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .directive('foundItemDescription', FoundItemDescriptionDirective)
    .directive('foundItems', FoundItemsDirective);


function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItems.html',
//     scope : {
//       items : '<',
//       onRemove: '&'
//     },
//     controller: FoundItemsDirectiveController,
//     controllerAs: 'list',
//     bindToController: true
     }

  return ddo;
}

function FoundItemsDirectiveController() {
  var list = this;

  this.getMatchedMenuItems = function(searchTerm) {
        var response = $http({
            method : 'GET',
            url : 'https://davids-restaurant.herokuapp.com/menu_items.json'
        });

        return response.then(function(result) {            
            var foundItems = [];
            if(searchTerm == undefined || searchTerm.trim() == ""){
              return foundItems;
            }
            // process result and only keep items that match
            var data = result.data.menu_items;
            var item;
            for(var indx = 0; indx < data.length; indx++){
                item = data[indx];
                if(item.description.search(searchTerm) >= 0){
                    foundItems.push(item);
                }
            }
            // return processed items
            return foundItems;
        })
    }
}
 

function FoundItemDescriptionDirective() {
  var ddo = {
    template: '<h4>Name</h4> : {{ item.name }}  <h4>Short Name</h4> : {{ item.short_name }} <h4>Desc</h4> : {{ item.description }}'
  };

  return ddo;
}


NarrowItDownController.$inject = ['MenuSearchService']
function NarrowItDownController (MenuSearchService) {
    var list = this;
    
    list.getMatchedMenuItems = function(){
       var promise = MenuSearchService.getMatchedMenuItems(list.itemName);

        promise.then(function(resp) {
          if(resp.length == 0){
            list.errorMessage = 'Nothing found';
          } 
          list.items = resp;
        }).catch (function(error) {
            console.log("Something went wrong")
        }); 
    }

    list.removeItem = function(indx) {
      list.items.splice(indx, 1);
    }
    
}

MenuSearchService.$inject = ['$http']
function MenuSearchService($http) {
    var service = this;

    this.getMatchedMenuItems = function(searchTerm) {
        var response = $http({
            method : 'GET',
            url : 'https://davids-restaurant.herokuapp.com/menu_items.json'
        });

        return response.then(function(result) {            
            var foundItems = [];
            if(searchTerm == undefined || searchTerm.trim() == ""){
              return foundItems;
            }
            // process result and only keep items that match
            var data = result.data.menu_items;
            var item;
            for(var indx = 0; indx < data.length; indx++){
                item = data[indx];
                if(item.description.search(searchTerm) >= 0){
                    foundItems.push(item);
                }
            }
            // return processed items
            return foundItems;
        })
    }
}

}());