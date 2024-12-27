import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

export const deliveryOptions = [
  {
    id: "1",
    deliveryDays: 7,
    priceCents: 0,
  },
  {
    id: "2",
    deliveryDays: 3,
    priceCents: 499,
  },
  {
    id: "3",
    deliveryDays: 1,
    priceCents: 999,
  },
];
export function CalculateDeliveryDate(deliveryOption) {
  let remainingDays = deliveryOption.deliveryDays;
  const today = dayjs();
  const testdeliverydate = today.add(deliveryOption.deliveryDays, "days");
  const deliveryDay = testdeliverydate.format("dddd");
  if (deliveryDay === "Saturday") {
    remainingDays += 2;
  } else if (deliveryDay === "Sunday") {
    remainingDays += 1;
  }

  const deliveryDate = today.add(remainingDays, "days");

  const dateString = deliveryDate.format("dddd, MMMM D");

  return dateString;
}
