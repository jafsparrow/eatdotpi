import { component$, useContext } from "@builder.io/qwik";
import { Cart, CartContext } from "../layout";
import { JSONObject, routeAction$ } from "@builder.io/qwik-city";
import { PrismaClient } from "@prisma/client";

export const useCreateOrderAction = routeAction$(
  async (cart: JSONObject, { redirect, params }) => {
    const orgId = params.orgId;
    const prisma = new PrismaClient();
    const cartItems = (cart as unknown as Cart).cartItems;
    const cartTotal = cartItems.reduce((prev, item) => prev + item.amount, 0);
    const mappedCartItem = cartItems.map((item, index) => {
      return {
        name: item.name,
        amount: item.amount,
        count: item.count,
        modifiers: Object.values(item.modifiers).map(
          (item) => `${item.name}-${item.title}`,
        ),
      };
    });
    const createdOrder = await prisma.order.create({
      data: {
        customer: { name: "Jafar", phone: "093938033" },
        amount: cartTotal,
        status: "NEW",
        cartItems: mappedCartItem,
      },
    });

    if (createdOrder) {
      throw redirect(302, `/${orgId}/product/list`);
    }

    return { success: true };
    return createdOrder;
  },
);

export default component$(() => {
  const cart = useContext(CartContext);
  const action = useCreateOrderAction();
  if (!cart.cartItems.length) {
    return (
      <div class="flex h-56 w-full items-center justify-center text-xl font-bold">
        No Item in the cart{" "}
      </div>
    );
  }
  return (
    <div>
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

      <div class="mt-4">
        <button
          class="rounded-lg bg-gray-900 px-4 py-2 font-bold text-white disabled:bg-gray-600 disabled:text-gray-400"
          disabled={action.isRunning}
          onClick$={() =>
            action.submit({
              cartItems: cart.cartItems,
            })
          }
        >
          Place Order
        </button>
      </div>
    </div>
  );
});
