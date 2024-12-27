import { formatcurrency } from "./utils/Money.js";
import {
  cartProduct,
  addToCart,
  UpdateCartQuantity,
  loadFromStorage,
} from "../data/cart.js";
import { products, LoadProducts } from "../data/products.js";

LoadProducts(renderProductsGrid);
UpdateCartQuantity();

function renderProductsGrid() {
  let productHtml = "";

  products.forEach((products) => {
    productHtml += `
                <div class="product-container">
          <div class="product-image-container js-product-image-container-${
            products.id
          }">
            <img class="product-image"
              src="${products.image}">
          </div>

          <div class="product-name js-product-name-${
            products.id
          } limit-text-to-2-lines">
          ${products.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="${products.getStarsUrl()}">
            <div class="product-rating-count link-primary">
            ${products.rating.count}
            </div>
          </div>

          <div class="product-price js-product-price-${products.id}">
          ${products.getPrice()} 
          </div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector-${products.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>
           
          ${products.extraInfoHTML()}

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-to-cart-${products.id}">
          <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart" data-id = "${
            products.id
          }">
            Add to Cart
          </button>
        </div>

      `;
  });

  document.querySelector(".js-products-grid").innerHTML = productHtml;

  function AddedToCartIndication(productid) {
    let addedTOCart = document.querySelector(`.js-added-to-cart-${productid}`);

    addedTOCart.classList.add("visible");

    if (timeoutIDs[productid]) {
      clearTimeout(timeoutIDs[productid]);
    }

    timeoutIDs[productid] = setTimeout(() => {
      addedTOCart.classList.remove("visible");
    }, 2000);
  }

  let timeoutIDs = {};

  document.querySelectorAll(".js-add-to-cart").forEach((button) => {
    button.addEventListener("click", () => {
      const productid = button.dataset.id;

      let selectorQuantity = document.querySelector(
        `.js-quantity-selector-${productid}`
      );
      const Selectorquantity = Number(selectorQuantity.value);

      addToCart(productid, Selectorquantity);
      UpdateCartQuantity();
      AddedToCartIndication(productid);
    });
  });
}
