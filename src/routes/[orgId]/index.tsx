import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import CategoryTitle from "~/components/product/CategoryTitle";
import PopularProductCard from "~/components/product/PopularProductCard";
import Jumbotron from "~/components/shared/Jumbotron";
import type { Product } from "~/types/product_types";
import { popularProducts } from "~/utils/data/popular.seed";
export const usePopularProducts = routeLoader$<Product[]>(() => {
  return popularProducts;
});

export default component$(() => {
  const popularProducts = usePopularProducts();
  return (
    <>
      <Jumbotron />
      {/* <dir>{JSON.stringify(popularProducts.value)}</dir> */}
      <div class="p-2 sm:p-4">
        <CategoryTitle title="Popular Items" />
        <div class="mt-4 grid  grid-cols-2 gap-2 pb-2 sm:grid-cols-3 sm:gap-4 md:grid-cols-4">
          {popularProducts.value.map((item, index) => (
            <PopularProductCard key={index} product={item} />
          ))}
        </div>
      </div>
    </>
  );
});
