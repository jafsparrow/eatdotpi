import { component$ } from "@builder.io/qwik";
import { CartItem } from "~/types/cart_types";

type CartItemProp = {
  cartItem: CartItem;
};
export default component$<CartItemProp>(({ cartItem }) => {
  return (
    <div class="flex gap-2 border-b bg-white">
      <div class="font-semibold">{cartItem.name}</div>
      <div class="font-semibold">{cartItem.count}</div>
      <div class="font-semibold">{cartItem.amount}</div>
    </div>
  );
});
