import {
  Slot,
  component$,
  createContextId,
  useContextProvider,
  useStore,
} from "@builder.io/qwik";
import type { CartItem } from "~/types/cart_types";
import type { Product } from "~/types/product_types";

export interface Cart {
  cartItems: CartItem[];
  // getTotal: () => void;
}
export const CartContext = createContextId<Cart>("cart-context");
export const SelectedProductContext = createContextId<{ product: Product }>(
  "selected-product",
);

export default component$(() => {
  const cart = useStore({
    cartItems: [],
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

  return (
    <>
      <Slot />
    </>
  );
});
