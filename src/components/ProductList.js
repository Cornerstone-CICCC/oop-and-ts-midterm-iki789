import { Component } from "../common/Component.js";
import { ProductItem } from "./ProductItem.js";

export class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = { products: [], filteredProducts: [] };
  }

  mount(container) {
    fetch(`https://fakestoreapi.com/products`)
      .then((response) => response.json())
      .then((data) => {
        this.state.products = data;
        this.state.filteredProducts = data;
        container.appendChild(this.render());
      })
      .catch((err) => console.error(err));
  }

  filterProducts(query) {
    this.state.filteredProducts = this.state.products.filter((product) =>
      product.title.toLowerCase().includes(query.toLowerCase())
    );
    this.update();
  }

  update() {
    const container = document.querySelector(".product-list");
    if (container) {
      container.innerHTML = "";
      this.state.filteredProducts.forEach((product) => {
        const productItem = new ProductItem({
          product,
          cartContext: this.props.cartContext,
        }).render();
        container.appendChild(productItem);
      });
    }
  }

  render() {
    const productList = document.createElement("div");
    productList.className = "row";

    this.state.filteredProducts.forEach((product) => {
      const productItem = new ProductItem({
        product,
        cartContext: this.props.cartContext,
      });
      productList.appendChild(productItem.render());
    });

    return productList;
  }
}
