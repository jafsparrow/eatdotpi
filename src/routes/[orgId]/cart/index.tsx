import { $, component$, useContext, useStore } from "@builder.io/qwik";
import { routeAction$ } from "@builder.io/qwik-city";
import { BsWhatsapp } from "@qwikest/icons/bootstrap";
import { CartContext } from "../layout";

export const useCreateOrderAction = routeAction$(() => {
  return "success";
});
export default component$(() => {
  const cart = useContext(CartContext);
  const action = useCreateOrderAction();

  if (action.status == 200) {
    return (
      <div class="flex h-56 items-center justify-center ">
        {/* stat is {action.status}
          <div>{JSON.stringify(action.value)}</div> */}

        <div class="text-md font-semibold text-gray-800 ">
          Your order has been placed successfully.{" "}
          <p>Click below to confirm delivery on watsap</p>
          <div class="mt-4 flex w-full justify-center">
            <button class=" flex h-12 w-12 items-center justify-center rounded-full bg-green-600 p-2  text-2xl text-white hover:bg-green-800">
              <a href="https://wa.me/+919539028029?text=Hi%20Dawar%20Zadana%0A%0AI%20have%20placed%20an%20order%20for%20homedlivery%0A--------------------------------------------------%0A%0A1.%20Chicken%20Biriyani%20X%203%20%3D%203.5OMR%0A2.%20Orange%20Juice%20X%202%20%3D%202.3%20OMR">
                <BsWhatsapp />
              </a>
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!cart.cartItems.length) {
    return (
      <div class="flex h-56 w-full items-center justify-center text-xl font-bold">
        No Item in the cart{" "}
      </div>
    );
  }
  return (
    <div class="mx-auto max-w-md ">
      {/* <div>{JSON.stringify(cart)}</div> */}
      <div class="font-bold">Cart </div>
      <div class="grid grid-cols-1 gap-2 py-2">
        {cart.cartItems.map((item, key) => (
          <div key={key} class="rounded-lg bg-white p-2">
            <div class="flex gap-2 md:gap-4">
              <div class="aspect-square w-20 overflow-hidden rounded-md">
                <img
                  src={item.image}
                  alt=""
                  width={80}
                  height={80}
                  class=" aspect-square rounded-md object-cover object-center"
                />
              </div>
              <div class="flex-1">
                <div class="flex justify-between">
                  <div>{item.name}</div>
                  <div class="font-bold">{item.amount} OMR</div>
                </div>
                {item.modifiers && (
                  <div class="flex gap-2 space-x-1 divide-x font-light">
                    {Object.values(item.modifiers).map((item, indexx) => (
                      <span key={indexx} class="">
                        {item.title}
                      </span>
                    ))}
                  </div>
                )}

                <div class="mt-2 flex items-center gap-3">
                  <button
                    class="flex h-8 w-8 flex-row items-center justify-center  rounded-full bg-gray-600 font-semibold text-white hover:bg-gray-900"
                    onClick$={() =>
                      item.count == 1
                        ? cart.cartItems.splice(key, 1)
                        : (item.count = item.count - 1)
                    }
                  >
                    -
                  </button>
                  <div class="font-bold">{item.count}</div>
                  <button
                    class="flex h-8 w-8 flex-row items-center justify-center  rounded-full bg-gray-600 font-semibold text-white hover:bg-gray-900"
                    onClick$={() => (item.count = item.count + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* {cart.cartItems.map((item, index) => (
          <div key={index}>
            <div>{item.name}</div>
            {Object.values(item.modifiers).map((mod, mIndex) => (
              <div key={mIndex}>
                <span>{mod.name} ,</span>
                <span>{mod.title} ,</span>
              </div>
            ))}
          </div>
        ))} */}
      <div class="mt-4 rounded-lg bg-white py-3">
        <div class="text-center text-lg font-semibold ">
          Let us reach you on..!
        </div>

        <div class="mt-2 p-2">
          <div class="flex">
            <span class="rounded-e-0 inline-flex w-12 items-center rounded-s-md border border-gray-300 bg-gray-200 px-3 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-600 dark:text-gray-400">
              <svg
                class="h-4 w-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
              </svg>
            </span>
            <input
              type="text"
              id="website-admin"
              class="block w-full min-w-0 flex-1 rounded-none rounded-e-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="What is you name"
              onInput$={$((event, val) => (cart.customer.name = val.value))}
              required
            />
          </div>

          <div class="mt-2 flex ">
            <span class="rounded-e-0 inline-flex w-12 items-center rounded-s-md border border-gray-300 bg-gray-200 px-3 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-600 dark:text-gray-400">
              +968
            </span>
            <input
              type="number"
              id="website-admin"
              class="block w-full min-w-0 flex-1 rounded-none rounded-e-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="Phone"
              onInput$={$((event, val) => (cart.customer.phone = val.value))}
              required
            />
          </div>
          <div>
            <label
              for="message"
              class="mb-2 mt-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Address
            </label>
            <textarea
              id="message"
              rows={4}
              class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="Write your thoughts here..."
              onInput$={$((event, val) => (cart.customer.address = val.value))}
            ></textarea>
          </div>

          <div class="mt-4">
            {action.isRunning ? (
              <div>Adding item....</div>
            ) : (
              <button
                class="w-full rounded-lg bg-gray-900 px-4 py-2 font-bold text-white disabled:bg-gray-600 disabled:text-gray-400"
                disabled={
                  cart.customer.name == "" ||
                  cart.customer.phone == "" ||
                  action.isRunning
                }
                onClick$={() => action.submit({ ...cart })}
              >
                Place Order
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});
