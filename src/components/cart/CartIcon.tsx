import { component$, useContext } from "@builder.io/qwik";
import { CartContext } from "~/routes/[orgId]/layout";

export default component$(() => {
  const cartContext = useContext(CartContext);
  return <div> cart Icon {JSON.stringify(cartContext)}</div>;
});