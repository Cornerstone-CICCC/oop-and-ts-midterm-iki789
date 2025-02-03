import { Component } from "../common/Component.js";

export class CartItem extends Component {
  constructor(props) {
    super(props);

    this.handleAdd = this.handleAdd.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleAdd() {
    this.props.cartContext.addProduct(this.props.item);
  }

  handleRemove() {
    this.props.cartContext.updateQuantity(this.props.item);
  }

  handleDelete() {
    this.props.cartContext.removeProduct(this.props.item);
  }

  render() {
    const itemElement = document.createElement("li");
    itemElement.innerHTML = `
      <div class="d-flex border-bottom border-secondary-subtle rounded pb-2 mb-2 ">
        <div class="flex-shrink-0">
          <img src="${this.props.item.image}" alt="${
      this.props.item.title
    }" width="45px">
        </div>
        <div class="flex-grow-1 ms-3">
          <div>
            <div class="fs-6">${this.props.item.title}</div>
            <div class="fs-6 text-success mb-2">$${this.props.item.total.toFixed(
              2
            )}</div>
            <div class="item-btn d-flex justify-content-between" style="width: 92px"></div>
          </div>
        </div>
      </div>
    `;
    const btnContainer = itemElement.querySelector(".item-btn");
    btnContainer.innerHTML = `
        <button class="decrease-btn icon-btn">-</button>
        <span>${this.props.item.quantity}</span>
        <button class="increase-btn icon-btn">+</button>
      `;
    btnContainer
      .querySelector(".decrease-btn")
      .addEventListener("click", this.handleRemove);
    btnContainer
      .querySelector(".increase-btn")
      .addEventListener("click", this.handleAdd);

    return itemElement;
  }
}
