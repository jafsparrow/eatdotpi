import { component$, useSignal, $, useContext } from "@builder.io/qwik";
import { Link, routeLoader$ } from "@builder.io/qwik-city";
import { LuShoppingCart } from "@qwikest/icons/lucide";
import CartIcon from "~/components/cart/CartIcon";
import ProductDetailsModal from "~/components/modal/ProductDetailsModal";
import CategoryTitle from "~/components/product/CategoryTitle";
import ProductCard from "~/components/product/ProductCard";
import type { Company } from "~/types/company_typs";
import { CartContext } from "../layout";
import { db } from "~/lib/prima.client";
import { sampleProduct } from "~/utils/data/single_product_sample";

export const useCompanyDetails = routeLoader$<Company>((requestEvent) => {
  const company: Company = {
    name: "Dawar zadna",
    currencyCode: "OMR",
    charges: [{ isPercentage: true, title: "VAT 5%", value: 5 }],
    decimalPlaces: 3,
    license: "hello",
  };

  return company;
});

export const useCategoryViceProducts = routeLoader$(
  async ({ params, error }) => {
    const orgId = params.orgId;
    // if (!orgId) {
    //   return error(404, "Organisation Id is not recognised.");
    // }
    console.log("getting rpoduct");
    const categoryViceProduct = await db.category.findMany({
      where: { orgId },
    });
    // console.log(JSON.stringify(categoryViceProduct));
    return categoryViceProduct;
  },
);

// export const useOrganisation = routeLoader$(async ({ params, error }) => {
//   const prisma = new PrismaClient();
//   console.log(params);
//   const organisation = await prisma.organisation.findUnique({
//     where: {
//       id: params.orgId,
//     },
//   });

//   if (!organisation) {
//     throw error(404, "Contact not found");
//   }
//   return organisation;
// });

export default component$(() => {
  const categoryViceProducts = useCategoryViceProducts();
  const cartContext = useContext(CartContext);
  const showSheet = useSignal(false);
  const showModal = useSignal(false);
  const showProductSelectionModal = useSignal(false);

  const handleSome$ = $(() => {
    console.log("hello");
    showModal.value = false;
  });

  const handleAddToCart = $(() => {
    showProductSelectionModal.value = true;
  });
  return (
    <div class="px-2">
      <div class="mx-auto max-w-lg py-2 text-center">
        <input
          type="text"
          class="w-full rounded-md border px-2 py-2"
          placeholder="Search product here"
        />
      </div>

      <div class="divide-y">
        {categoryViceProducts.value.map((category, index) => (
          <div key={index} class="mb-6">
            <div class="mb-2" id={category.id}>
              <CategoryTitle title={category.name} />
            </div>

            <div class="mt-2 grid gap-4 sm:grid-cols-2  lg:grid-cols-3 lg:gap-4 ">
              {category.products.map((val, index) => (
                <ProductCard
                  onAddToCart={handleAddToCart}
                  product={val}
                  onSelect={handleAddToCart}
                  key={index}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* <div>
        <ProductCard
          onAddToCart={handleAddToCart}
          product={sampleProduct}
          onSelect={handleAddToCart}
        />
      </div> */}
      <div
        class={`fixed inset-x-0 bottom-1 mx-auto max-w-xl   origin-bottom divide-y rounded-t-lg border bg-gray-50 p-2 px-2 text-center duration-200 ${
          showSheet.value ? "scale-100" : "scale-0"
        }`}
      >
        {categoryViceProducts.value.map((category, index) => {
          return (
            <div
              key={index}
              onClick$={() => (showSheet.value = !showSheet.value)}
              class="py-2 hover:bg-gray-300"
            >
              <a href={`#${category.id}`}>{category.name}</a>
            </div>
          );
        })}
      </div>

      {!showSheet.value && (
        <button
          class="fixed inset-x-0 bottom-1 mx-auto w-24 rounded-full bg-green-900 px-4 py-2 text-white"
          onClick$={() => (showSheet.value = !showSheet.value)}
        >
          MENU
        </button>
      )}
      {/* 
      {cartContext.cartItems.length && (
        <Link href={"../cart"}>
          <div class="fixed bottom-2 right-1 flex h-12 w-12 items-center justify-center rounded-full bg-blue-800 text-xl text-white shadow-md ">
            <CartIcon />
          </div>
        </Link>
      )} */}
    </div>
  );
});
