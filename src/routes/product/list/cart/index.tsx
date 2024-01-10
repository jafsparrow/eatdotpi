import { component$, useContext } from "@builder.io/qwik";
import { CartContext } from "../layout";

export default component$(() => {
  const cart = useContext(CartContext);

  if (!cart.cartItems.length) {
    return (
      <div class="flex h-56 w-full items-center justify-center text-xl font-bold">
        No Item in the cart{" "}
      </div>
    );
  }
  return (
    <div>
      hello from cart
      <div>{JSON.stringify(cart)}</div>
      <div class="font-bold">Cart </div>
      {cart.cartItems.map((item, index) => (
        <div key={index}>
          <div>{item.name}</div>
          {Object.values(item.modifiers).map((mod, mIndex) => (
            <div key={mIndex}>
              <span>{mod.name} ,</span>
              <span>{mod.title} ,</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
});
