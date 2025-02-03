import { Component } from "../common/Component.js";
import { CartItem } from "./CartItem.js";

export class CartList extends Component {
  constructor(props) {
    super(props);
    this.state = { cart: [] };
    this.updateCart = this.updateCart.bind(this);
    this.props.cartContext.subscribe(this.updateCart);

    this.productListElement = null;
    this.totalElement = null;
  }

  calculateTotal() {
    return this.state.cart
      .reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0)
      .toFixed(2);
  }

  updateCart(cart) {
    this.state.cart = cart;

    this.productListElement.innerHTML = ``;

    this.state.cart.forEach((item) => {
      const cartItem = new CartItem({
        item,
        cartContext: this.props.cartContext,
      });
      this.productListElement.appendChild(cartItem.render());
    });

    if (this.totalElement) {
      this.totalElement.textContent = `${this.calculateTotal()}`;
    }

    if (this.cartTitleElement) {
      let totalCount = 0;
      this.state.cart.forEach((item) => {
        totalCount += item.quantity;
      });
      this.cartTitleElement.textContent = `Cart (${totalCount})`;
    }

    if (this.state.cart.length === 0) {
      this.emptyCartElement.style.display = "block";
      this.checkoutButton.style.display = "none";
      this.cartTotal.style.display = "none";
    } else {
      this.emptyCartElement.style.display = "none";
      this.checkoutButton.style.display = "block";
      this.cartTotal.style.display = "block";
    }
  }

  render() {
    const cartElement = document.createElement("div");
    cartElement.className = "cart-container";
    cartElement.innerHTML = `
      <h3 class="cart-title">Cart (0)</h3>
      <div class="empty-cart">
        <img src="assets/illustration-empty-cart.svg" alt="Your cart is empty">
      </div>
      <ul class="cart-list"></ul>
      <p class="cart-total fw-semibold" style="display:none;">Total: $<span class="total-amount">0.00</span></p>
      <button class="checkout btn btn-outline-dark" style="display:none;">Checkout</button>
    `;
    this.productListElement = cartElement.querySelector(".cart-list");
    this.totalElement = cartElement.querySelector(".total-amount");
    this.cartTitleElement = cartElement.querySelector(".cart-title");
    this.emptyCartElement = cartElement.querySelector(".empty-cart");
    this.checkoutButton = cartElement.querySelector(".checkout");
    this.cartTotal = cartElement.querySelector(".cart-total");

    cartElement.querySelector(".checkout").addEventListener("click", () => {
      this.props.cartContext.resetCart();
      alert("Order Successful.");
    });

    return cartElement;
  }
}
