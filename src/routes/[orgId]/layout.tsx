import {
  Slot,
  component$,
  createContextId,
  useContextProvider,
  useStore,
} from "@builder.io/qwik";
import CartIcon from "~/components/cart/CartIcon";
import ProductDetailsModal from "~/components/modal/ProductDetailsModal";
import type { CartItem } from "~/types/cart_types";
import type { Customer } from "~/types/customer_types";
import type { Product } from "~/types/product_types";

export interface Cart {
  cartItems: CartItem[];
  customer: Customer;
  amount: number;
  status: string;
  orgId?: string;

  // getTotal: () => void;
}
export const CartContext = createContextId<Cart>("cart-context");
export const SelectedProductContext = createContextId<{ product: Product }>(
  "selected-product",
);
export const ShowProductSelectionModalContext = createContextId<{
  show: boolean;
}>("show-modal-product");

export default component$(() => {
  const cart = useStore<Cart>({
    amount: 0,
    customer: {
      address: "",
      name: "",
      phone: "",
    },
    status: "NEW",
    orgId: "orgstring",
    cartItems: [],
    // cartItems: [
    //   {
    //     name: "hello",
    //     count: 2,
    //     amount: 20,
    //     image:
    //       "https://plus.unsplash.com/premium_photo-1663853051823-1fea94c5f52a?crop=entropy\u0026cs=tinysrgb\u0026fit=max\u0026fm=jpg\u0026ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8YXJhYmljJTIwbHVuY2h8ZW58MHx8fHwxNzA1MDMwNzQ4fDA\u0026ixlib=rb-4.0.3\u0026q=80\u0026w=200",
    //     modifiers: { "0": { name: "hello", title: "title", price: 12 } },
    //   },
    //   {
    //     name: "hello",
    //     count: 2,
    //     amount: 20,
    //     image:
    //       "https://plus.unsplash.com/premium_photo-1663853051823-1fea94c5f52a?crop=entropy\u0026cs=tinysrgb\u0026fit=max\u0026fm=jpg\u0026ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8YXJhYmljJTIwbHVuY2h8ZW58MHx8fHwxNzA1MDMwNzQ4fDA\u0026ixlib=rb-4.0.3\u0026q=80\u0026w=200",
    //     modifiers: { "0": { name: "hello", title: "title", price: 12 } },
    //   },
    //   {
    //     name: "hello",
    //     count: 2,
    //     amount: 20,
    //     image:
    //       "https://plus.unsplash.com/premium_photo-1663853051823-1fea94c5f52a?crop=entropy\u0026cs=tinysrgb\u0026fit=max\u0026fm=jpg\u0026ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8YXJhYmljJTIwbHVuY2h8ZW58MHx8fHwxNzA1MDMwNzQ4fDA\u0026ixlib=rb-4.0.3\u0026q=80\u0026w=200",
    //     modifiers: { "0": { name: "hello", title: "title", price: 12 } },
    //   },
    // ],
  });

  useContextProvider(CartContext, cart);
  const selectedProduct = useStore<{ product: Product }>({
    product: {
      name: "",
      image: [],
      indexInCategory: 0,
      inStock: true,
      modifierGroups: [],
      popular: true,
      printName: "",
      secondaryLanguageName: "",
      videoUrl: "",
      code: 0,

      price: 0,
      description: "",
    },
  });
  useContextProvider(SelectedProductContext, selectedProduct);
  const showProductSelectionModal = useStore({ show: false });

  useContextProvider(
    ShowProductSelectionModalContext,
    showProductSelectionModal,
  );

  return (
    <>
      <Slot />

      <ProductDetailsModal />
      <CartIcon />
    </>
  );
});
