import { component$ } from "@builder.io/qwik";

export default component$(() => {
  return (
    <div
      data-hs-carousel='{
"loadingClasses": "opacity-0",
"isAutoPlay": true
}'
      class="relative"
    >
      <div class="hs-carousel relative min-h-[350px] w-full overflow-hidden rounded-lg bg-white">
        <div class="hs-carousel-body absolute bottom-0 start-0 top-0 flex flex-nowrap opacity-0 transition-transform duration-700">
          <div class="hs-carousel-slide">
            <div class="flex h-full justify-center bg-gray-100 p-6">
              <span class="self-center text-4xl transition duration-700">
                First slide
              </span>
            </div>
          </div>
          <div class="hs-carousel-slide">
            <div class="flex h-full justify-center bg-gray-200 p-6">
              <span class="self-center text-4xl transition duration-700">
                Second slide
              </span>
            </div>
          </div>
          <div class="hs-carousel-slide">
            <div class="flex h-full justify-center bg-gray-300 p-6">
              <span class="self-center text-4xl transition duration-700">
                Third slide
              </span>
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        class="hs-carousel-prev hs-carousel:disabled:opacity-50 absolute inset-y-0 start-0 inline-flex h-full w-[46px] items-center justify-center text-gray-800 hover:bg-gray-800/[.1] disabled:pointer-events-none"
      >
        <span class="text-2xl" aria-hidden="true">
          <svg
            class="h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
            />
          </svg>
        </span>
        <span class="sr-only">Previous</span>
      </button>
      <button
        type="button"
        class="hs-carousel-next hs-carousel:disabled:opacity-50 absolute inset-y-0 end-0 inline-flex h-full w-[46px] items-center justify-center text-gray-800 hover:bg-gray-800/[.1] disabled:pointer-events-none"
      >
        <span class="sr-only">Next</span>
        <span class="text-2xl" aria-hidden="true">
          <svg
            class="h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
            />
          </svg>
        </span>
      </button>

      <div class="hs-carousel-pagination absolute bottom-3 end-0 start-0 flex justify-center space-x-2">
        <span class="hs-carousel-active:bg-blue-700 hs-carousel-active:border-blue-700 h-3 w-3 cursor-pointer rounded-full border border-gray-400"></span>
        <span class="hs-carousel-active:bg-blue-700 hs-carousel-active:border-blue-700 h-3 w-3 cursor-pointer rounded-full border border-gray-400"></span>
        <span class="hs-carousel-active:bg-blue-700 hs-carousel-active:border-blue-700 h-3 w-3 cursor-pointer rounded-full border border-gray-400"></span>
      </div>
    </div>
  );
});
