import { component$, useContext, $ } from "@builder.io/qwik";
import { Link, routeAction$, useLocation } from "@builder.io/qwik-city";
import twil from "twilio";
import { BsWhatsapp } from "@qwikest/icons/bootstrap";

import { CartContext } from "../layout";
import CartItem from "~/components/cart/CartItem";
export const useCreateOrderAction = routeAction$(async (data, requestEvent) => {
  console.log(requestEvent);
  const twilioClient = twil(
    "AC9b2395f1f5c188d71c53dc488067b951",
    "e86d78b2051007b5b0c830d502093cc7",
  );
  const cartItem = data.cartItems as any[];

  const messageBody = `
  Hello Dawar Zadana
  
  There is a new Order from ${(data.customer as any)?.name} 
   ----------------------
   ${cartItem.map(
     (cartItem, index) => `${index + 1} . ${cartItem?.name} x ${cartItem.count}
   `,
   )}
   --------------------
   `;
  const encodedMessageValueToHost = encodeURI(messageBody);
  const twilioMessageToHost = `https://wa.me/+968${(data.customer as any).phone}?text=${encodedMessageValueToHost}`;
  console.log(twilioMessageToHost);
  try {
    await twilioClient.messages.create({
      body: messageBody,
      to: "whatsapp:+96879423170", // Text your number
      from: "whatsapp:+14155238886", // From a valid Twilio number
    });
  } catch (error) {
    console.log(error);
  }
  return { message: "twilioMessageToHost" };
});
export default component$(() => {
  const cart = useContext(CartContext);
  const location = useLocation();
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
              <a href={`${action.value}`}>
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
        {JSON.stringify(CartItem)}
        {JSON.stringify($)}
        <div class="text-center">
          <div>No Item in the cart</div>

          <Link href={`/${location.params["orgId"]}/product`}>
            <button class="mt-3 rounded-lg border bg-white px-3 py-2 text-base shadow-md hover:bg-gray-200">
              View Menu
            </button>
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div class="mx-auto max-w-md ">
      <div>{JSON.stringify(cart)}</div>
      <div class="font-bold">Cart </div>
      <div class="grid grid-cols-1 gap-2 py-2">
        {cart.cartItems.map((item, key) => (
          <CartItem key={key} cartItem={item} carItemIndex={key} />
        ))}
      </div>

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
              onInput$={$(
                (event: any, val: { value: string }) =>
                  (cart.customer.name = val.value),
              )}
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
              onInput$={$((_, val) => (cart.customer.phone = val.value))}
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
              <div class="w-full animate-pulse py-2 text-center text-blue-800">
                Adding item....
              </div>
            ) : (
              <button
                class="w-full rounded-lg bg-gray-900 px-4 py-2 font-bold text-white disabled:bg-gray-600 disabled:text-gray-400"
                disabled={
                  cart.customer["name"] == "" ||
                  cart.customer["phone"] == "" ||
                  action.isRunning
                }
                onClick$={async () => await action.submit({ ...cart })}
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
