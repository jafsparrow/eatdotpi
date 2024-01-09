import { component$ } from "@builder.io/qwik";
import ProductSelection from "../product/ProductSelection";

export default component$(() => {
  return (
    <div
      id="hs-basic-modal"
      class="hs-overlay hs-overlay-open:opacity-100 hs-overlay-open:duration-500 pointer-events-none fixed start-0 top-0 z-[80] hidden h-full w-full overflow-y-auto overflow-x-hidden opacity-0 transition-all"
    >
      <div class="hs-overlay-open:opacity-100 hs-overlay-open:duration-500 m-3 opacity-0 transition-all sm:mx-auto sm:w-full sm:max-w-lg">
        <div class="pointer-events-auto flex flex-col rounded-xl border bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:shadow-slate-700/[.7]">
          <ProductSelection />
          <div class="flex items-center justify-end gap-x-2 border-t px-4 py-3 dark:border-gray-700">
            <button
              type="button"
              class="inline-flex items-center gap-x-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-700 dark:bg-slate-900 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
              data-hs-overlay="#hs-basic-modal"
            >
              Close
            </button>
            <button
              type="button"
              class="inline-flex items-center gap-x-2 rounded-lg border border-transparent bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:pointer-events-none disabled:opacity-50 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});
