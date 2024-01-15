import { component$, useSignal, $, useContext } from "@builder.io/qwik";
import { Link, routeLoader$ } from "@builder.io/qwik-city";
import { LuShoppingCart } from "@qwikest/icons/lucide";
import CartIcon from "~/components/cart/CartIcon";
import ProductCard from "~/components/product/ProductCard";
import HomeCarousal from "~/components/promotion/HomeCarousal";
import { Company } from "~/types/company_typs";
import { ShowProductSelectionModalContext } from "../../layout";
import { PrismaClient } from "@prisma/client";
import { sampleProduct } from "~/utils/data/single_product_sample";

export const useCompanyDetails = routeLoader$<Company>(() => {
  const company: Company = {
    name: "Dawar zadna",
    currencyCode: "OMR",
    charges: [{ isPercentage: true, title: "VAT 5%", value: 5 }],
    decimalPlaces: 3,
    license: "hello",
  };

  return company;
});

// export const useProductLists = routeLoader$(async ({ params, error }) => {
//   const orgId = params.orgId;

//   console.log("getting rpoduct");
//   const products = await db.product.findMany({
//     where: {
//       orgId,
//     },
//   });

//   return products;
// });

export const useOrganisation = routeLoader$(async ({ params, error }) => {
  const prisma = new PrismaClient();
  console.log(params);
  const organisation = await prisma.organisation.findUnique({
    where: {
      id: params.orgId,
    },
  });

  if (!organisation) {
    throw error(404, "Contact not found");
  }
  return organisation;
});

export default component$(() => {
  // const company = useCompanyDetails();
  const organisation = useOrganisation();
  const showSheet = useSignal(false);
  // const showModal = useSignal(false);
  const showProductSelectionModal = useContext(
    ShowProductSelectionModalContext,
  );
  // const cartContext = useContext(CartContext);

  // const handleSome$ = $(() => {
  //   console.log("hello");
  //   showModal.value = false;
  // });

  const handleAddToCart = $(() => {
    console.log("add to cart ddklajf");
    showProductSelectionModal.show = true;
  });
  return (
    <div>
      <div class="mx-auto max-w-lg p-2 text-center">
        <input
          type="text"
          class="w-full rounded-md border px-2 py-2"
          placeholder="Search product here"
        />
      </div>

      <div>{JSON.stringify(organisation.value)}</div>
      {/* <ProductDetailsModal showProductModal={showProductSelectionModal} /> */}
      <HomeCarousal />

      <div>
        <ProductCard
          onAddToCart={handleAddToCart}
          product={sampleProduct}
          onSelect={handleAddToCart}
        />
      </div>

      {/* <div class="divide-y">
        <div class="mb-6 ">
          <CategoryTitle title="Biriryani" />

          <div class="grid gap-4 px-2  sm:grid-cols-2  lg:grid-cols-3 lg:gap-4 ">
            {products.value.map((val, index) => (
              <ProductCard
                onAddToCart={handleAddToCart}
                product={val}
                onSelect={handleAddToCart}
                key={index}
              />
            ))}
          </div>
        </div>
      </div> */}

      <div
        class={`fixed inset-x-0 bottom-1 mx-auto max-w-xl   origin-bottom divide-y rounded-t-lg border bg-gray-50 p-2 px-2 text-center duration-200 ${
          showSheet.value ? "scale-100" : "scale-0"
        }`}
      >
        <div onClick$={() => (showSheet.value = !showSheet.value)}>First</div>
        <div>First</div>
        <div>First</div>
        <div>First</div>
        <div>First</div>
        <div>First</div>
      </div>

      {!showSheet.value && (
        <button
          class="fixed inset-x-0 bottom-1 mx-auto w-24 rounded-full bg-green-900 px-4 py-2 text-white"
          onClick$={() => (showSheet.value = !showSheet.value)}
        >
          MENU
        </button>
      )}

      <Link href={"../../cart"}>
        <div class="fixed right-1 top-2 h-8 w-8 bg-blue-800 text-white">
          <LuShoppingCart height="16" width="16" />
          <CartIcon />
        </div>
      </Link>
    </div>
  );
});
