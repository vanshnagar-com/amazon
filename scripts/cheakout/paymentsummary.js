import { products } from "../../data/products.js";
import { cartProduct, UpdateCartQuantity } from "../../data/cart.js";
import { deliveryOptions } from "../../data/deliveryoption.js";
import { formatcurrency } from "../utils/Money.js";
import { addOrder } from "../../data/orders.js";
import { saveToLocalStorage } from "../../data/cart.js";

export function renderPaymentSummary() {
  let sum = 0;
  let matchingItem;

  cartProduct.forEach((cartItem) => {
    products.forEach((products) => {
      if (cartItem.productId === products.id) {
        matchingItem = products;
        const quantity = cartItem.quantity;
        const price = matchingItem.priceCents;
        const calculation = price * quantity;
        sum += calculation;
      }
    });
  });

  let shippingHandlingCost = 0;

  cartProduct.forEach((cartItem) => {
    deliveryOptions.forEach((deliveryoption) => {
      if (cartItem.deliveryOptionsId === deliveryoption.id) {
        const selectedDeliveryOption = deliveryoption;
        shippingHandlingCost += selectedDeliveryOption.priceCents;
      }
    });
  });

  let totalBeforeTax = sum + shippingHandlingCost;

  let estimatedTax = (totalBeforeTax * 10) / 100;

  let orderTotal = totalBeforeTax + estimatedTax;

  let cartquantity = 0;
  cartProduct.forEach((cartProduct) => {
    cartquantity += cartProduct.quantity;
  });

  const paymentSummaryHTML = `
    <div class="payment-summary-title">Order Summary</div>

          <div class="payment-summary-row">
            <div>Items (${cartquantity}):</div>
            <div class="payment-summary-money">$${formatcurrency(sum)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatcurrency(
              shippingHandlingCost
            )}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatcurrency(
              totalBeforeTax
            )}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatcurrency(
              estimatedTax
            )}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatcurrency(
              orderTotal
            )}</div>
          </div>

          <button class="place-order-button button-primary js-place-order">
            Place your order
          </button>
  `;
  document.querySelector(`.js-payment-summary`).innerHTML = paymentSummaryHTML;

  document
    .querySelector(`.js-place-order`)
    .addEventListener("click", async () => {
      try {
        const response = await fetch("https://supersimplebackend.dev/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cart: cartProduct,
          }),
        });
        const order = await response.json();
        addOrder(order);
      } catch (error) {
        console.log("Unexpected error : Try again later");
      }

      cartProduct.length = 0;
      saveToLocalStorage();
      window.location.href = "orders.html";
    });
}
