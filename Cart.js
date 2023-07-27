class Cart {
  constructor() {
    this.purchases = [];
  }

  getAll() {
    return this.purchases;
  }

  getCount() {
    return this.getAll().length;
  }

  getItem(id) {
    return this.getAll().find((item) => item.id === id);
  }

  getCountItem(id) {
    return this.getItem(id).count;
  }

  getCountItems() {
    return this.getAll().reduce((acc, item) => {
      const count = this.getCountItem(item.id);
      acc += count;
      return acc;
    }, 0);
  }

  getPriceItem(id) {
    return this.getItem(id).price;
  }

  getNameItem(id) {
    return this.getItem(id).name;
  }

  getPriceAll() {
    return this.getAll().reduce((acc, item) => {
      const price = item.price * item.count;
      acc += price;
      return acc;
    }, 0);
  }

  addItem(item) {
    const service = this.getItem(item.id);
    if (service) {
      service.count += 1;
      return service;
    }
    item.count = 1;
    return this.getAll().push(item);
  }

  removeItem(id) {
    const newPurchases = this.getAll().filter((item) => item.id !== id);
    return this.purchases = newPurchases;
  }

  clearPurchase() {
    return this.purchases = [];
  }

  incrementCount(id) {
    const service = this.getItem(id);
      service.count += 1;
      return service;
  }

  decrementCount(id) {
    const service = this.getItem(id);
    service.count -= 1;
    return service.count >= 1 ? service : this.removeItem(id);
  }
}