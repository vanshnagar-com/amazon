import { orders } from "../data/orders.js";
import { formatcurrency } from "./utils/Money.js";
import { LoadProductsFetch, getProduct, products } from "../data/products.js";
import { UpdateCartQuantity } from "../data/cart.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { saveToLocalStorage } from "../data/cart.js";
import { addToCart } from "../data/cart.js";

async function loadPage() {
  await LoadProductsFetch();

  let orderGridHTML = "";
  console.log(orders);

  orders.forEach((order) => {
    console.log(order.products);
    let orderDetailsgridHTML = "";

    const orderDateString = dayjs(order.orderTime).format("MMMM D");

    order.products.forEach((product) => {
      let matchingItem = getProduct(product.productId);

      const productArrivingString = dayjs(product.estimatedDeliveryTime).format(
        "MMMM D"
      );

      orderDetailsgridHTML += ` 
        <div class="product-image-container">
            <img
            src="${matchingItem.image}"
            />
        </div>

        <div class="product-details">
            <div class="product-name">${matchingItem.name}</div>
            <div class="product-delivery-date">Arrivinig on : ${productArrivingString}</div>
            <div class="product-quantity">Quantity: ${product.quantity}</div>
            <button class="buy-again-button button-primary js-buy-again-button" data-product-id = ${product.productId}>

            <img class="buy-again-icon" src="images/icons/buy-again.png" />
            <span class="buy-again-message ">Buy it again</span>

            </button>
        </div>

        <div class="product-actions">
            <a href="tracking.html">
            <button class="track-package-button button-secondary js-track-package-button">
                Track package
            </button>
            </a>
        </div>`;
    });

    orderGridHTML += `<div class="order-container">
  <div class="order-header">
    <div class="order-header-left-section">
      <div class="order-date">
        <div class="order-header-label">Order Placed:</div>
        <div>${orderDateString}</div>
      </div>
      <div class="order-total">
        <div class="order-header-label">Total:</div>
        <div>$${formatcurrency(order.totalCostCents)}</div>
      </div>
    </div>

    <div class="order-header-right-section">
      <div class="order-header-label">Order ID:</div>
      <div>${order.id}</div>
    </div>
  </div>

  <div class="order-details-grid js-order-details-grid">
  ${orderDetailsgridHTML}
  </div>
</div>`;
  });

  document.querySelector(".js-orders-grid").innerHTML = orderGridHTML;

  UpdateCartQuantity();
  BuyItAgain();
}

loadPage();

function BuyItAgain() {
  document
    .querySelectorAll(".js-buy-again-button")
    .forEach((buyAgainButton) => {
      buyAgainButton.addEventListener("click", () => {
        const productId = buyAgainButton.dataset.productId;

        addToCart(productId, 1);

        buyAgainButton.innerHTML = `&#x2713 Added`;

        setTimeout(() => {
          buyAgainButton.innerHTML = `
          <img class="buy-again-icon" src="images/icons/buy-again.png" />
          <span class="buy-again-message ">Buy it again</span>`;
        }, 1000);

        UpdateCartQuantity();
        saveToLocalStorage();
      });
    });
}

function trackPackage() {
  document
    .querySelectorAll(".js-track-package-button")
    .forEach((trackButton) => {
      trackButton.addEventListener("click", () => {});
    });
}
