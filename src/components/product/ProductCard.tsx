import type { QRL } from "@builder.io/qwik";
import { component$, $, useContext } from "@builder.io/qwik";
import { SelectedProductContext } from "~/routes/[orgId]/layout";
import type { Product } from "~/types/product_types";
type ProductCardProps = {
  product: Product;
  onSelect: QRL<() => void>;
  onAddToCart: QRL<() => void>;
};
export default component$<ProductCardProps>(({ product, onAddToCart }) => {
  const selectedProductContext = useContext(SelectedProductContext);

  const handleAddToCart$ = $(() => {
    selectedProductContext.product = { ...product };
    console.log("inside productCard handlecart button");
    onAddToCart();
  });
  return (
    <div class="flex gap-4 rounded-lg  border bg-white  p-2 sm:p-2">
      <div class="h-40 w-28 shrink-0 overflow-hidden rounded-md">
        <img
          width={28}
          height={40}
          src={product.image[4].downloadUrl}
          // src="https://images.unsplash.com/photo-1612681621979-fffe5920dbe8?auto=format&q=75&fit=crop&w=200"
          alt=""
          srcset=""
          class="h-full w-full object-cover object-center duration-200 hover:scale-105"
        />
      </div>

      <div class="flex flex-1 flex-col">
        <h3 class="text-lg font-semibold">{product.name}</h3>
        <p class="mb-2 text-sm text-gray-800">{product.price} OMR</p>
        <p class="flex-1  font-thin">
          Super delicious mix of macronic and cheese
        </p>
        <div class="mr-4 flex justify-end gap-4">
          <button
            class="rounded-lg border border-orange-600 px-3 py-1 "
            onClick$={handleAddToCart$}
          >
            add
          </button>
          {/* <button class="rounded-lg border px-3 py-1">view</button> */}
        </div>
      </div>
    </div>
  );
});
