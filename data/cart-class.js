class Cart {
  cartProduct;
  #localStorageKey;

  constructor(localStorageKey) {
    this.#localStorageKey = localStorageKey;
    this.#loadFromStorage();
  }

  #loadFromStorage() {
    this.cartProduct = JSON.parse(localStorage.getItem(this.#localStorageKey));

    if (!this.cartProduct) {
      this.cartProduct = [
        {
          id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 3,
          deliveryOptionsId: "1",
        },
        {
          id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
          quantity: 2,
          deliveryOptionsId: "2",
        },
      ];
    }
  }
  saveToLocalStorage() {
    localStorage.setItem(
      this.#localStorageKey,
      JSON.stringify(this.cartProduct)
    );
  }
  addToCart(productid, Selectorquantity) {
    let matchingItem;

    this.cartProduct.forEach((cartItem) => {
      if (cartItem.id === productid) {
        matchingItem = cartItem;
      }
    });

    if (matchingItem) {
      matchingItem.quantity += Selectorquantity;
    } else {
      this.cartProduct.push({
        id: productid,
        quantity: Selectorquantity,
        deliveryOptionsId: "1",
      });
    }

    this.saveToLocalStorage();
  }
  removeFromCart(cartproductId) {
    let newCart = [];
    this.cartProduct.forEach((cartProduct) => {
      if (cartproductId !== cartProduct.id) {
        newCart.push(cartProduct);
      }
    });
    this.cartProduct = newCart;
    this.saveToLocalStorage();
    this.UpdateCartQuantity();
  }
  UpdateCartQuantity() {
    let cartquantity = 0;
    this.cartProduct.forEach((cartProduct) => {
      cartquantity += cartProduct.quantity;
    });

    document.querySelector(".js-cart-quantity").innerHTML = cartquantity;
  }
  UpdateCartQuantitySave(productId, newQuantity) {
    this.cartProduct.forEach((cartProduct) => {
      if (cartProduct.id === productId) {
        cartProduct.quantity = newQuantity;
      }
    });
    this.saveToLocalStorage();
  }
  updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;

    this.cartProduct.forEach((cartItem) => {
      if (cartItem.id === productId) {
        matchingItem = cartItem;
      }
    });

    matchingItem.deliveryOptionsId = deliveryOptionId;
    this.saveToLocalStorage();
  }
}

const cart = new Cart("cart-oop");
const buisnessCart = new Cart("cart-buisness");

console.log(cart);
console.log(buisnessCart);

console.log(buisnessCart instanceof Cart);
