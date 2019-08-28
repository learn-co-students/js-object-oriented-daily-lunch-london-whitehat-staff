// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighorhoodId = 0
let mealId = 0
let customerId = 0
let deliveryId = 0

const onlyUnique = (value, index, self) => self.indexOf(value) === index

class Neighborhood {
  constructor(name) {
    this.name = name
    this.id = ++neighorhoodId
    store.neighborhoods.push(this)
  }

  deliveries() {
    return store.deliveries.filter(delivery => delivery.neighborhoodId === this.id)
  }

  customers() {
    return this.deliveries().map(delivery => delivery.customer()).filter(onlyUnique)
  }

  meals() {
    return this.deliveries().map(delivery => delivery.meal()).filter(onlyUnique)
  }
}

class Customer {
  constructor(name, neighborhoodId) {
    this.name = name
    this.neighborhoodId = neighborhoodId
    this.id = ++customerId
    store.customers.push(this)
  }

  deliveries() {
    return store.deliveries.filter(delivery => delivery.customerId === this.id)
  }

  meals() {
    return this.deliveries().map(delivery => delivery.meal())
  }

  totalSpent() {
    return this.meals().reduce((acc, { price }) => acc + price, 0)
  }
}

class Meal {
  constructor(title, price) {
    this.title = title
    this.price = price
    this.id = ++mealId
    store.meals.push(this)
  }

  deliveries() {
    return store.deliveries.filter(delivery => delivery.mealId === this.id)
  }

  customers() {
    return this.deliveries().map(delivery => delivery.customer()).filter(onlyUnique)
  }

  static byPrice() {
    return [...store.meals].sort(({ price: priceOne }, { price: priceTwo }) => (
      priceOne < priceTwo ? 1 : priceOne === priceTwo
        ? 0
        : -1
    ))
  }
}

class Delivery {
  constructor(mealId, neighborhoodId, customerId) {
    this.mealId = mealId
    this.neighborhoodId = neighborhoodId
    this.customerId = customerId
    this.id = ++deliveryId
    store.deliveries.push(this)
  }

  meal() {
    return store.meals.find(meal => meal.id === this.mealId)
  }

  customer() {
    return store.customers.find(customer => customer.id === this.customerId)
  }

  neighborhood() {
    return store.neighborhoods.find(neighborhood => neighborhood.id === this.neighborhoodId)
  }
}