import { $, component$, useContext } from "@builder.io/qwik";
import { CartContext } from "~/routes/[orgId]/layout";
import type { CartItem } from "~/types/cart_types";

type CartItemProp = {
  cartItem: CartItem;
  carItemIndex: number;
};
export default component$<CartItemProp>(({ cartItem, carItemIndex }) => {
  const cart = useContext(CartContext);

  const handIncrement = $(() => {
    const cartItemUnitPrice = cartItem.amount / cartItem.count;
    cartItem.amount = cartItem.amount + cartItemUnitPrice;
    cartItem.count = cartItem.count + 1;
  });

  const handDecrement = $(() => {
    if (cartItem.count == 1) {
      cart.cartItems.splice(carItemIndex, 1);
    }
    const cartItemUnitPrice = cartItem.amount / cartItem.count;
    cartItem.amount = cartItem.amount - cartItemUnitPrice;
    cartItem.count = cartItem.count - 1;
  });
  return (
    <div class="rounded-lg bg-white p-2">
      <div class="flex gap-2 md:gap-4">
        <div class="aspect-square w-20 overflow-hidden rounded-md">
          <img
            src={cartItem.image}
            alt=""
            width={80}
            height={80}
            class=" aspect-square rounded-md object-cover object-center"
          />
        </div>
        <div class="flex-1">
          <div class="flex justify-between">
            <div>{cartItem.name}</div>
            <div class="font-bold">{cartItem.amount.toFixed(3)} OMR</div>
          </div>

          {cartItem.modifiers && (
            <div class="flex gap-2 space-x-1 divide-x font-light">
              {Object.values(cartItem.modifiers).map((item, indexx) => (
                <span key={indexx} class="">
                  {item.title}
                </span>
              ))}
            </div>
          )}
          <div class="mt-2 flex items-center gap-3">
            <button
              class="flex h-8 w-8 flex-row items-center justify-center  rounded-full bg-gray-600 font-semibold text-white hover:bg-gray-900"
              onClick$={handDecrement}
            >
              -
            </button>
            <div class="font-bold">{cartItem.count}</div>
            <button
              class="flex h-8 w-8 flex-row items-center justify-center  rounded-full bg-gray-600 font-semibold text-white hover:bg-gray-900"
              onClick$={handIncrement}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});
