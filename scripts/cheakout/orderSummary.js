import { cartProduct, updateDeliveryOption } from "../../data/cart.js";
import { products } from "../../data/products.js";
import { formatcurrency } from "../utils/Money.js";
import {
  removeFromCart,
  UpdateCartQuantity,
  UpdateCartQuantitySave,
} from "../../data/cart.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { deliveryOptions } from "../../data/deliveryoption.js";
import { renderPaymentSummary } from "./paymentsummary.js";
import { CalculateDeliveryDate } from "../../data/deliveryoption.js";

export function renderOrderSummary() {
  let cartSummaryHTML = "";

  cartProduct.forEach((cartProduct) => {
    let productId = cartProduct.productId;

    let matchingItem;

    products.forEach((products) => {
      if (productId === products.id) {
        matchingItem = products;
      }
    });

    const deliveryoptionId = cartProduct.deliveryOptionsId;
    let deliveryOption;
    deliveryOptions.forEach((options) => {
      if (options.id === deliveryoptionId) {
        deliveryOption = options;
      }
    });

    const dateString = CalculateDeliveryDate(deliveryOption);

    cartSummaryHTML += `
        <div class="cart-item-container js-cart-item-container-${productId}">
                <div class="delivery-date">Delivery date: ${dateString}</div>

                <div class="cart-item-details-grid">
                  <img
                    class="product-image"
                    src="${matchingItem.image}"
                  />

                  <div class="cart-item-details">
                    <div class="product-name">
                      ${matchingItem.name}
                    </div>
                    <div class="product-price">${matchingItem.getPrice()}</div>
                    <div class="product-quantity">
                      <span> Quantity: <span class="quantity-label js-quantity-label-${productId} is-editing-quantity">${
      cartProduct.quantity
    }</span> </span>
                      <span class="update-quantity-link link-primary js-update-link is-editing-quantity"  data-id="${productId}">
                        Update
                      </span>
                      <input class="quantity-input js-quantity-input-${productId} is-editing-quantity" data-id="${productId}">
                      <span class="save-quantity-link  js-save-quantity-link is-editing-quantity" data-id="${productId}">save</span>
                      <span class="delete-quantity-link link-primary js-delete-link "  data-id="${productId}">
                        Delete
                      </span>
                    </div>
                  </div>

                  <div class="delivery-options">
                    <div class="delivery-options-title">
                      Choose a delivery option:
                    </div>
                    ${deliveryOptionsHTML(productId, cartProduct)}
                    </div>
                  </div>
                </div>
              </div>`;
  });

  function deliveryOptionsHTML(productId, cartProduct) {
    let html = "";

    deliveryOptions.forEach((deliveryOptions) => {
      const ischecked =
        deliveryOptions.id === cartProduct.deliveryOptionsId ? "checked" : "";
      const dateString = CalculateDeliveryDate(deliveryOptions);
      const priceString =
        deliveryOptions.priceCents === 0
          ? "FREE"
          : `${formatcurrency(deliveryOptions.priceCents)} - `;

      html += `<div class="delivery-option js-delivery-option " data-product-id = '${productId}'
        data-delivery-option-id = '${deliveryOptions.id}'>
            <input
              type="radio"
              ${ischecked}
              class="delivery-option-input"
              name="delivery-option-${productId}"
            />
            <div>
              <div class="delivery-option-date">${dateString}</div>
              <div class="delivery-option-price">${priceString}</div>
            </div>
          </div>`;
    });
    return html;
  }

  document.querySelector(".order-summary").innerHTML = cartSummaryHTML;

  document.querySelectorAll(".js-delete-link").forEach((deletelink) => {
    deletelink.addEventListener("click", () => {
      const cartProductId = deletelink.dataset.id;
      removeFromCart(cartProductId);

      renderOrderSummary();
      renderPaymentSummary();
    });
    UpdateCartQuantity();
  });

  document.querySelectorAll(".js-update-link").forEach((updateLink) => {
    updateLink.addEventListener("click", () => {
      const productId = updateLink.dataset.id;
      const productContainer = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      productContainer.classList.add("is-editing-quantity");
    });
  });

  document.querySelectorAll(".js-save-quantity-link").forEach((saveLink) => {
    saveLink.addEventListener("click", () => {
      const productId = saveLink.dataset.id;
      const productContainer = document.querySelector(
        `.js-cart-item-container-${productId}`
      );

      productContainer.classList.remove("is-editing-quantity");

      let input = document.querySelector(`.js-quantity-input-${productId}`);

      if (Number(input.value) >= 0 && Number(input.value) < 1000) {
        document.querySelector(`.js-quantity-label-${productId}`).innerHTML =
          Number(input.value);
        UpdateCartQuantitySave(productId, Number(input.value)); //cart ke andar quantity upadte karta hai
        UpdateCartQuantity(); //wo nai updated ccart to display karta hai
      } else {
        alert("Not a vaid quantity");
      }
      renderPaymentSummary();
    });
  });

  document.querySelectorAll(".quantity-input").forEach((inputbox) => {
    inputbox.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        const productId = inputbox.dataset.id;
        const productContainer = document.querySelector(
          `.js-cart-item-container-${productId}`
        );

        productContainer.classList.remove("is-editing-quantity");

        let input = document.querySelector(`.js-quantity-input-${productId}`);

        if (Number(input.value) >= 0 && Number(input.value) < 1000) {
          document.querySelector(`.js-quantity-label-${productId}`).innerHTML =
            Number(input.value);
          UpdateCartQuantitySave(productId, Number(input.value)); //cart ke andar quantity upadte karta hai
          UpdateCartQuantity(); //wo nai updated ccart to display karta hai
        } else {
          alert("Not a vaid quantity");
        }
      }
      renderPaymentSummary();
    });
  });

  document.querySelectorAll(".js-delivery-option").forEach((deliveryOption) => {
    deliveryOption.addEventListener("click", () => {
      const productId = deliveryOption.dataset.productId;
      const deliveryOptionId = deliveryOption.dataset.deliveryOptionId;
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
      renderPaymentSummary();
    });
  });
}
