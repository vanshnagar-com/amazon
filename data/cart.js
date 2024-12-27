export let cartProduct;
loadFromStorage();

export function loadFromStorage() {
  cartProduct = JSON.parse(localStorage.getItem("cart"));

  if (!cartProduct) {
    cartProduct = [
      {
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 3,
        deliveryOptionsId: "1",
      },
      {
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 2,
        deliveryOptionsId: "2",
      },
    ];
  }
}

export function saveToLocalStorage() {
  localStorage.setItem("cart", JSON.stringify(cartProduct));
}

export function addToCart(productid, Selectorquantity) {
  let matchingItem;

  cartProduct.forEach((cartItem) => {
    if (cartItem.productId === productid) {
      matchingItem = cartItem;
    }
  });

  if (matchingItem) {
    matchingItem.quantity += Selectorquantity;
  } else {
    cartProduct.push({
      productId: productid,
      quantity: Selectorquantity,
      deliveryOptionsId: "1",
    });
  }

  saveToLocalStorage();
}

export function removeFromCart(cartproductId) {
  let newCart = [];
  cartProduct.forEach((cartProduct) => {
    if (cartproductId !== cartProduct.productId) {
      newCart.push(cartProduct);
    }
  });
  cartProduct = newCart;
  saveToLocalStorage();
  UpdateCartQuantity();
}

export function UpdateCartQuantity() {
  let cartquantity = 0;
  cartProduct.forEach((cartProduct) => {
    cartquantity += cartProduct.quantity;
  });

  document.querySelector(".js-cart-quantity").innerHTML = cartquantity;
}

export function UpdateCartQuantitySave(productId, newQuantity) {
  cartProduct.forEach((cartProduct) => {
    if (cartProduct.productId === productId) {
      cartProduct.quantity = newQuantity;
    }
  });
  saveToLocalStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem;

  cartProduct.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      matchingItem = cartItem;
    }
  });

  matchingItem.deliveryOptionsId = deliveryOptionId;
  saveToLocalStorage();
}

export async function LoadCartFetch() {
  const response = await fetch("https://supersimplebackend.dev/cart");
  const text = await response.text();
  console.log(text);
  return text;
}
