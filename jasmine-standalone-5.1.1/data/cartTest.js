import { addToCart, cartProduct, loadFromStorage } from "../../data/cart.js";

describe("test Suite: add to cart", () => {
  it("adds an existing product to the cart ", () => {});
  it("adds an new product to the cart ", () => {
    spyOn(loadFromStorage, "setItem");

    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([]);
    });

    loadFromStorage();

    addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cartProduct.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  });
});
