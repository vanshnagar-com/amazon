export const orders = JSON.parse(localStorage.getItem("orders")) || [];

export function addOrder(order) {
  orders.unshift(order);
  saveToStorgae();
}

function saveToStorgae() {
  localStorage.setItem("orders", JSON.stringify(orders));
}
