import type { Signal } from "@builder.io/qwik";
import {
  component$,
  $,
  useStore,
  useTask$,
  useContext,
} from "@builder.io/qwik";
import Modal from "./Modal";

import { LuMinus, LuPlus, LuTrash2 } from "@qwikest/icons/lucide";
import type { CartItem } from "~/types/cart_types";
import { CartContext, SelectedProductContext } from "~/routes/[orgId]/layout";

export type ShowProductModalProps = {
  showProductModal: Signal<boolean>;
};
export default component$<ShowProductModalProps>(({ showProductModal }) => {
  const cartContext = useContext(CartContext);
  const product = useContext(SelectedProductContext).product;
  const cartItem = useStore<CartItem>({
    name: "",
    amount: 0,
    count: 1,
    modifiers: {},
  });
  // const productStore = useStore({
  //   name: "Chatu",
  //   price: 10,
  //   code: 33,
  //   categoryId: "3",
  //   description: "BLend of chatu and shit juice mixed with snot syrup",
  //   modifiers: [
  //     {
  //       name: "Size",
  //       shouldBeSelected: true,
  //       items: [
  //         { title: "Small", price: 33, isDefault: true },
  //         { title: "Medium", price: 60, isDefault: false },
  //         { title: "Large", price: 80, isDefault: false },
  //       ],
  //     },
  //     {
  //       name: "Cheese",
  //       shouldBeSelected: false,
  //       items: [
  //         { title: "plane", price: 33, isDefault: false },
  //         { title: "Think", price: 60, isDefault: false },
  //         { title: "Supreame", price: 80, isDefault: false },
  //       ],
  //     },
  //   ],
  // });

  const handleAddToCart$ = $(() => {
    cartContext.cartItems.push({ ...cartItem });
    cartItem.name = "";
    cartItem.amount = 0;
    cartItem.modifiers = {};

    showProductModal.value = false;
  });
  useTask$(({ track }) => {
    const trackedProduct = track(() => product);
    cartItem.name = trackedProduct.name;
    cartItem.amount = trackedProduct.price;
    cartItem.count = 1;
    trackedProduct.modifiers.forEach((modifier, index) => {
      modifier.items.forEach((mod) => {
        if (mod.isDefault) {
          cartItem.modifiers[index.toString()] = {
            name: modifier.name,
            price: mod.price,
            title: mod.title,
          };
        }
      });
    });
  });

  useTask$(({ track }) => {
    const count = track(() => cartItem.count);
    const selectedModifier = track(() => Object.values(cartItem.modifiers));
    console.log("tracking method");
    const modifierRates = selectedModifier.reduce(
      (prev, item) => prev + item.price,
      0,
    );
    const totalCost = (product.price + modifierRates) * count;
    cartItem.amount = totalCost;
  });

  const handle$ = $(() => {
    console.log("hndle me");
    showProductModal.value = false;
  });
  if (!showProductModal.value) {
    return null;
  }
  return (
    <Modal
      actionLabel="show prod"
      title={product.name}
      onClose={handle$}
      onSubmit={handle$}
      isOpen={showProductModal.value}
    >
      <div q:slot="body">
        <div>{JSON.stringify(cartItem)}</div>
        {product.modifiers.map((item, index) => (
          <div key={index}>
            <section class="flex justify-between border-b">
              <div class="font-semibold">{item.name}</div>
              <div>
                {item.shouldBeSelected ? (
                  "required"
                ) : (
                  <div class="flex items-center gap-2">
                    {cartItem.modifiers[index.toString()] && (
                      <button
                        onClick$={() =>
                          delete cartItem.modifiers[index.toString()]
                        }
                      >
                        <LuTrash2 class="" />
                      </button>
                    )}
                    <div>optional</div>
                  </div>
                )}
              </div>
            </section>

            {item.items.map((mod, mindex) => (
              <div
                key={mindex}
                class="flex justify-between py-2"
                onClick$={() => {
                  const key = index.toString();
                  cartItem.modifiers[key] = {
                    name: item.name,
                    price: mod.price,
                    title: mod.title,
                  };
                }}
              >
                <div
                  class={`${
                    cartItem.modifiers[index.toString()] != undefined
                      ? cartItem.modifiers[index.toString()].title == mod.title
                        ? "text-green-600"
                        : "text-black"
                      : "text-black"
                  }`}
                >
                  {mod.title} - {mod.price}
                </div>
                <input
                  type="checkbox"
                  name={item.name}
                  class="pointer-events-none h-4 w-4 "
                  onClick$={() => false}
                  // disabled={
                  //   cartItem.modifiers[index.toString()] != undefined
                  //     ? cartItem.modifiers[index.toString()].title == mod.title
                  //       ? true
                  //       : false
                  //     : false
                  // }
                  checked={
                    cartItem.modifiers[index.toString()] != undefined
                      ? cartItem.modifiers[index.toString()].title == mod.title
                        ? true
                        : false
                      : false
                  }
                />
              </div>
            ))}
          </div>
        ))}
        <div class="mt-4 flex justify-between gap-2">
          <div class="flex gap-2">
            <div>
              <button
                class="rounded-full bg-gray-800 p-2 text-xl text-white hover:bg-gray-600"
                onClick$={() =>
                  cartItem.count != 1
                    ? (cartItem.count = cartItem.count - 1)
                    : null
                }
              >
                <LuMinus />
              </button>
            </div>

            <div class=" w-20 rounded-lg border ">
              <input
                type="number"
                class="w-full px-2 py-1 text-center"
                value={cartItem.count}
                onChange$={(event, ele) => {
                  cartItem.count = parseInt(ele.value);
                }}
              />
            </div>
            <button
              class="rounded-full bg-gray-800 p-2 text-xl text-white hover:bg-gray-600"
              onClick$={() => (cartItem.count = cartItem.count + 1)}
            >
              <LuPlus />
            </button>
          </div>
          <div>
            <button
              class="rounded-lg bg-green-900 px-4 py-1 font-bold text-white hover:bg-green-700"
              onClick$={handleAddToCart$}
            >
              ADD <span class="pr-3 font-thin"> {cartItem.amount} OMR</span>
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
});
