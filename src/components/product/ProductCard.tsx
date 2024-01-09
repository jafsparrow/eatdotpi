import { component$ } from "@builder.io/qwik";

export default component$(() => {
  return (
    <div class="flex gap-4 rounded-lg border-l-2 border-l-lime-500 bg-white p-2  sm:p-2">
      <div class="h-40 w-28 shrink-0 overflow-hidden rounded-md">
        <img
          width={28}
          height={40}
          src="https://images.unsplash.com/photo-1612681621979-fffe5920dbe8?auto=format&q=75&fit=crop&w=200"
          alt=""
          srcset=""
          class="h-full w-full object-cover object-center duration-200 hover:scale-105"
        />
      </div>

      <div class="flex flex-1 flex-col">
        <h3 class="text-lg font-semibold">Chicken Biriyani</h3>
        <p class="mb-2 text-sm text-gray-800">OMR 0.800</p>
        <p class="flex-1  font-thin">
          Super delicious mix of macronic and cheese
        </p>
        <div class="mr-4 flex justify-end gap-4">
          <button
            class="rounded-lg border px-3 py-1 "
            data-hs-overlay="#hs-basic-modal"
          >
            add
          </button>
          <button class="rounded-lg border px-3 py-1">view</button>
        </div>
      </div>
    </div>
  );
});
