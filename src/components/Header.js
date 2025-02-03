import { Component } from "../common/Component.js";

export class Header extends Component {
  render() {
    const header = document.createElement("div");
    header.classList.add("row");
    header.innerHTML = `
      <div class="col-6">
        <h2>${this.props.siteName}</h2>
      </div>
      <div class="col-6 d-flex justify-content-end">
        <button class="open-cart-btn btn btn-outline-dark" style="min-width: 100px;">
          Cart (<span class="cart-count">0</span>)
        </button>
      </div>
    `;
    return header;
  }
}
