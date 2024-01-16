import { component$, useContext } from "@builder.io/qwik";
import { Link, useLocation } from "@builder.io/qwik-city";
import { LuShoppingCart } from "@qwikest/icons/lucide";
import { CartContext } from "~/routes/[orgId]/layout";

export default component$(() => {
  const cartContext = useContext(CartContext);
  const useParams = useLocation();

  return (
    <>
      {cartContext.cartItems.length && (
        <Link href={`/${useParams.params["orgId"]}/cart`}>
          <div class="fixed bottom-2 right-1 flex h-12 w-12 items-center justify-center rounded-full bg-blue-800 text-xl text-white shadow-md hover:scale-110 hover:bg-blue-600 ">
            <div class=" relative flex h-full w-full items-center justify-center rounded-full text-xl shadow-sm">
              {/* <div class="absolute -right-0 -top-0  h-4 w-4 rounded-full border-2 border-white p-1">
        ddsfsdfd
      </div> */}
              <LuShoppingCart height="16" width="16" />
            </div>
          </div>
        </Link>
      )}
    </>
  );
});
