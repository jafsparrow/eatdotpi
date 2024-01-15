import { $, component$, useContext } from "@builder.io/qwik";
import { LuPlusSquare } from "@qwikest/icons/lucide";
import {
  SelectedProductContext,
  ShowProductSelectionModalContext,
} from "~/routes/[orgId]/layout";
import { Product } from "~/types/product_types";
type PropularProductProsp = {
  product: Product;
};
export default component$<PropularProductProsp>(({ product }) => {
  const selectedProductContext = useContext(SelectedProductContext);
  const showProductSelectionModalContext = useContext(
    ShowProductSelectionModalContext,
  );

  const handleAdd = $(() => {
    selectedProductContext.product = product;
    showProductSelectionModalContext.show = true;
  });
  return (
    <div class="w-full rounded-lg border bg-white p-2">
      <div class="overflow-hidden rounded-lg border">
        <img
          src={product.image[4].downloadUrl}
          alt="food photo"
          class="aspect-square w-full  object-cover object-center"
        />
      </div>
      <div class="mt-2 flex flex-col justify-center">
        <h4 class="font-medium">{product.name}</h4>
        <p class="font-thin">A delicacy mized with</p>
        <div class="flex justify-between">
          <p>{product.price}</p>
          <button class="text-gray-900 " onClick$={handleAdd}>
            <LuPlusSquare />
          </button>
        </div>
      </div>
    </div>
  );
});
