let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodId = 0;
let customerId = 0;
let mealId = 0;
let deliveryId = 0;

class Neighborhood {
  constructor(name) {
    this.name = name;
    this.id = neighborhoodId++;

    store.neighborhoods.push(this);
  };
  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.neighborhoodId === this.id;
    });
  };
  customers() {
    return store.customers.filter(customer => {
      return customer.neighborhoodId === this.id;
    });
  };
  meals() {
      let unique = store.meals.filter((value, index, self) => self.indexOf(value) === index)

      return unique;
    
  // meals() {
  //   return store.meals.filter((value, index, self) => {
  //     return self.indexOf(value) === index;
  //   });
  }
};

//^^ does not give back duplicate data.

class Customer {
  constructor(name, neighborhoodId) {
    this.name = name;
    this.id = customerId++;
    this.neighborhoodId = neighborhoodId;

    store.customers.push(this);
  }
  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.customerId === this.id;
    }); 
  }
  meals() {
    return this.deliveries().map(delivery => {
      return store.meals.find(meal => meal.id === delivery.mealId)
      });
    };
  totalSpent() {
    let customerMeals = this.meals();

    let total = customerMeals.reduce((acc, val) => acc + val.price, 0);

    // let total = customerMeals.reduce(function(acc, val) {
    //   return acc + val.price;
    // }, 0);
    
    return total;
  };
};
class Meal {
  constructor(title, price) {
    this.title = title;
    this.price = price;
    this.id = ++mealId;
    store.meals.push(this);
  };
  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.mealId === this.id;
    });
  };
  customers() {
    return store.customers.filter(customer => {
      return customer.deliveries()
    });
  };
  static byPrice() {
    function compare(a, b) {
      let comparison = 0;

      if(a.price < b.price) {
        comparison = 1
      }else if(a.price > b.price) {
        comparison = -1
      };
      return comparison;
    };
    return store.meals.sort(compare);
  };
};

class Delivery {
  constructor(mealId, neighborhoodId, customerId) {
    this.id = deliveryId++;
    this.mealId = mealId;
    this.customerId = customerId;
    this.neighborhoodId = neighborhoodId;

    store.deliveries.push(this);
  };
  meal() {
    return store.meals.find(meal => {
      return this.mealId === meal.id;
    });
  };
  customer() {
    return store.customers.find(customer => {
      return this.customerId === customer.id;
    });
  };
  neighborhood() {
    return store.neighborhoods.find(neighborhood => {
      return this.neighborhoodId === neighborhood.id;
    });
  };
};

//consider the order of which the params are being input to target the correct array.
//this.neighborhoodId === neighborhood.id = match this.neighborhoodId (which is taken from the class it is within) and match it to the external element (which is taken from the param passed by class).