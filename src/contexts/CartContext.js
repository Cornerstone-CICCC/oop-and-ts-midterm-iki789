export class CartContext {
  constructor() {
    this.cart = []; // product cart array
    this.listeners = []; // array of functions
    this.removeProduct = this.removeProduct.bind(this);
    this.addProduct = this.addProduct.bind(this);
  }

  getCart() {
    return this.cart;
  }

  addProduct(item) {
    const found = this.cart.find((product) => product.id === item.id);
    if (found) {
      this.cart = this.cart.map((product) => {
        if (product.id === item.id) {
          const newQuantity = product.quantity + 1;
          return {
            ...product,
            quantity: newQuantity,
            total: newQuantity * item.price,
          };
        } else {
          return product;
        }
      });
    } else {
      this.cart.push({
        ...item,
        quantity: 1,
        total: item.price,
      }); // add product to cart array
    }
    this.notifyListeners();
  }

  updateQuantity(item) {
    const found = this.cart.find((product) => product.id === item.id);
    if (found) {
      if (found.quantity > 1) {
        this.cart = this.cart.map((product) =>
          product.id === item.id
            ? {
                ...product,
                quantity: product.quantity - 1,
                total: (product.quantity - 1) * product.price,
              }
            : product
        );
      } else {
        this.removeProduct(found);
      }
    }
    this.notifyListeners();
  }

  removeProduct(item) {
    this.cart = this.cart.filter((product) => product.id !== item.id);
    this.notifyListeners();
  }

  resetCart() {
    this.cart = [];
    this.notifyListeners();
  }

  subscribe(listener) {
    this.listeners.push(listener); // add function to the listeners array
  }

  notifyListeners() {
    // Iterate and trigger the functions stored inside the listeners array
    this.listeners.forEach((listener) => listener(this.cart));
  }
}
