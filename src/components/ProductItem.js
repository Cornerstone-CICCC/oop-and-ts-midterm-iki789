import { Component } from "../common/Component.js";

export class ProductItem extends Component {
  constructor(props) {
    super(props);
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.handleUpdateQuantity = this.handleUpdateQuantity.bind(this);
    this.handleRemoveFromCart = this.handleRemoveFromCart.bind(this);
  }

  handleAddToCart() {
    this.props.cartContext.addProduct(this.props.product);
  }

  handleUpdateQuantity() {
    this.props.cartContext.updateQuantity(this.props.product);
  }

  handleRemoveFromCart() {
    this.props.cartContext.removeProduct(this.props.product);
  }

  render() {
    const product = document.createElement("div");
    product.className = "card col-12 col-md-4 p-4";
    product.innerHTML = `
      <div class="d-flex justify-content-between" style="height: 200px;">
        <img class="card-img-top object-fit-contain mt-4" style="height: 120px;" src=${
          this.props.product.image
        } />
          <div class="card-body">
            <div class="">
              <h2 class="fs-6">${this.props.product.title}</h2>
              <h3>$${parseFloat(this.props.product.price).toFixed(2)}</h3>
            </div>
          </div>
        </div>
        <div class="d-grid">
          <button class="add-cart-btn btn btn-outline-dark mt-2">
            Add to Cart
          </button>
        </div>
        `;
    product
      .querySelector(".add-cart-btn")
      .addEventListener("click", this.handleAddToCart);
    return product;
  }
}
