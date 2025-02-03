import { Component } from "../common/Component.js";
import { Header } from "./Header.js";
import { Footer } from "./Footer.js";
import { ProductList } from "./ProductList.js";
import { CartList } from "./CartList.js";

export class App extends Component {
  render() {
    const appContainer = document.createElement("div");
    appContainer.innerHTML = `
      <header>
        <div class="container">
          <div id="header"></div>
        </div>
      </header>
      <div class="wrapper">
        <main class="container">
          <div class="row">
            <div class="col-12">
              <h1 class="mb-4 mt-8 fw-bolder fs-3">Our Products</h1>
            </div>
            <div id="product-list">
            </div>
          </div>
        </main>
        <aside></aside>
      </div>
      <footer></footer>
    `;

    const header = new Header({
      siteName: "Random Shop",
    }).render();

    const footer = new Footer({
      companyName: "Random Shop",
    }).render();

    const productList = new ProductList({
      cartContext: this.props.cartContext,
    });

    const cart = new CartList({
      cartContext: this.props.cartContext,
    }).render();

    header.querySelector(".open-cart-btn").addEventListener("click", () => {
      appContainer.querySelector("aside").classList.toggle("active");
    });

    const cartCountSpan = header.querySelector(".cart-count");
    this.props.cartContext.subscribe((cart) => {
      let totalCount = 0;
      cart.forEach((item) => {
        totalCount += item.quantity;
      });
      cartCountSpan.textContent = totalCount;
    });

    productList.mount(appContainer.querySelector("#product-list"));
    appContainer.querySelector("#header").appendChild(header);
    appContainer.querySelector("aside").appendChild(cart);
    appContainer.querySelector("footer").appendChild(footer);

    return appContainer;
  }
}
