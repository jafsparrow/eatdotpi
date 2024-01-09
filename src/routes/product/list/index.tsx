import { component$, useSignal } from "@builder.io/qwik";
import { LuShoppingCart } from "@qwikest/icons/lucide";
import ProductDetailsModal from "~/components/modal/ProductDetailsModal";
import ProductCard from "~/components/product/ProductCard";
import HomeCarousal from "~/components/promotion/HomeCarousal";

export default component$(() => {
  const products = useSignal([1, 2, 3, 4, 5]);
  const showSheet = useSignal(false);
  return (
    <div>
      <div class="mx-auto max-w-lg p-2 text-center">
        <input
          type="text"
          class="w-full rounded-md border px-2 py-2"
          placeholder="Search product here"
        />
      </div>

      <ProductDetailsModal />
      <HomeCarousal />

      <div>
        <button onClick$={() => (showSheet.value = !showSheet.value)}>
          show
        </button>
      </div>
      <div class="divide-y">
        <div class="mb-6 ">
          <div>
            <h2 class=" mb-2 px-2 text-xl font-bold">Juice</h2>
          </div>

          <div class="grid gap-4 px-2  sm:grid-cols-2  lg:grid-cols-3 lg:gap-4 ">
            {products.value.map((val, index) => (
              <ProductCard key={index} />
            ))}
          </div>
        </div>
        <div class="mb-6 pt-3 ">
          <div>
            <h2 class=" mb-2 px-2 text-xl font-bold">Juice</h2>
          </div>

          <div class="grid gap-4 px-2  sm:grid-cols-2  lg:grid-cols-3 lg:gap-4 ">
            {products.value.map((val, index) => (
              <ProductCard key={index} />
            ))}
          </div>
        </div>
        <div class="mb-6 pt-3  ">
          <div>
            <h2 class=" mb-2 px-2 text-xl font-bold">Juice</h2>
          </div>

          <div class="grid gap-4 px-2  sm:grid-cols-2  lg:grid-cols-3 lg:gap-4 ">
            {products.value.map((val, index) => (
              <ProductCard key={index} />
            ))}
          </div>
        </div>
      </div>

      <div
        class={`fixed inset-x-0 bottom-1 mx-auto max-w-xl   origin-bottom divide-y rounded-t-lg border bg-gray-50 p-2 px-2 text-center duration-200 ${
          showSheet.value ? "scale-100" : "scale-0"
        }`}
      >
        <div onClick$={() => (showSheet.value = !showSheet.value)}>First</div>
        <div>First</div>
        <div>First</div>
        <div>First</div>
        <div>First</div>
        <div>First</div>
      </div>

      {!showSheet.value && (
        <button
          class="fixed inset-x-0 bottom-1 mx-auto w-24 rounded-full bg-green-900 px-4 py-2 text-white"
          onClick$={() => (showSheet.value = !showSheet.value)}
        >
          MENU
        </button>
      )}

      <div class="fixed right-1 top-2 h-8 w-8 bg-blue-800 text-white">
        <LuShoppingCart height="16" width="16" />
      </div>
    </div>
  );
});
