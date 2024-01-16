import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { LuMessageCircle, LuTwitter } from "@qwikest/icons/lucide";

export default component$(() => {
  return (
    <section class="bg-white dark:bg-gray-900">
      <div class="mx-auto max-w-screen-xl px-4 py-6 text-center sm:py-8 lg:py-16">
        <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
          <span class="bg-gradient-to-r from-amber-800 to-emerald-600 bg-clip-text text-transparent">
            Dawar Zadna
          </span>{" "}
          Restaurant
        </h1>
        <p class="mb-4 text-lg font-normal text-gray-500 dark:text-gray-400 sm:px-16 md:mb-6 lg:px-48 lg:text-xl">
          "Savor the harmony of Indian and Arabian flavors at our culinary
          crossroads. 🌶️🥘 #IndianArabianCuisine #FlavorFusion"
        </p>
        <div class=" flex items-center justify-center gap-2 p-2 text-xl">
          <div>
            <LuMessageCircle />
          </div>
          <div>
            <LuTwitter />
          </div>
        </div>
        <div class="flex   flex-row space-x-4 sm:justify-center sm:space-y-0">
          <Link
            href="product"
            class="inline-flex items-center justify-center rounded-lg bg-blue-700 px-3 py-1 text-center text-base font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900 sm:px-5 sm:py-3"
          >
            View Menu
            <svg
              class="ms-2 h-3.5 w-3.5 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </Link>
          {/* <a
            href="#"
            class="inline-flex items-center justify-center rounded-lg border border-gray-300 px-5 py-3 text-center text-base font-medium text-gray-900 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-800 sm:ms-4"
          >
            Learn more
          </a> */}
        </div>
      </div>
    </section>
  );
});
