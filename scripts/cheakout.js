import { renderOrderSummary } from "./cheakout/ordersummary.js";
import { renderPaymentSummary } from "./cheakout/paymentsummary.js";
import { LoadProductsFetch } from "../data/products.js";
import { LoadCartFetch } from "../data/cart.js";
//import "../data/backend-practice.js";
//import "../data/cart-class.js";

//async await
async function LoadPage() {
  try {
    // throw "error1";

    await Promise.all([LoadProductsFetch(), LoadCartFetch()]);
  } catch (error) {
    console.log("error here : please try again later");
  }

  renderOrderSummary();
  renderPaymentSummary();
  console.log("display on the page ");
}

LoadPage();

//Promisses
/*
Promise.all([
  LoadProductsFetch(),
  new Promise((resolve) => {
    LoadCart(() => {
      resolve();
    });
  }),
]).then((values) => {
  console.log(values);
  renderOrderSummary();
  renderPaymentSummary();
});
*/
/*
new Promise((resolve) => {
  LoadProducts(() => {
    resolve("value1");
  });
})
  .then((value) => {
    console.log(value );
    return new Promise((resolve) => {
      LoadCart(() => {
        resolve();
      });
    });
  })
  .then(() => {
    console.log("render summary");
    renderOrderSummary();
    renderPaymentSummary();
  });


LoadProducts(() => {
  LoadCart(() => {
    renderOrderSummary();
    renderPaymentSummary();
  });
});
*/
