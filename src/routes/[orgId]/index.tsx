import { component$ } from "@builder.io/qwik";
import CategoryTitle from "~/components/product/CategoryTitle";
import PopularProductCard from "~/components/product/PopularProductCard";
import Jumbotron from "~/components/shared/Jumbotron";

export default component$(() => {
  return (
    <>
      <Jumbotron />
      <div class="p-2 sm:p-4">
        <CategoryTitle title="Popular Items" />
        <div class="mt-4 grid  grid-cols-2 gap-2 pb-2 sm:grid-cols-3 sm:gap-4 md:grid-cols-4">
          {[0, 0, 0, 0, 0].map((item, index) => (
            <PopularProductCard key={index} />
          ))}
        </div>
      </div>
    </>
  );
});
