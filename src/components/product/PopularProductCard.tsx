import { component$ } from "@builder.io/qwik";
import { LuPlusSquare } from "@qwikest/icons/lucide";

export default component$(() => {
  return (
    <div class="w-full rounded-lg border bg-white p-2">
      <div class="overflow-hidden rounded-lg border">
        <img
          src="/chicken_biriyani.jpg"
          alt="food photo"
          class="aspect-square w-full  object-cover object-center"
        />
      </div>
      <div class="mt-2 flex flex-col justify-center">
        <h4 class="font-medium">Name</h4>
        <p class="font-thin">A delicacy mized with</p>
        <div class="flex justify-between">
          <p>0.200 Bz</p>
          <button class="text-gray-900 ">
            <LuPlusSquare />
          </button>
        </div>
      </div>
    </div>
  );
});
