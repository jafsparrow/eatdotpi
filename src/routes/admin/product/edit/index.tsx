import { component$ } from "@builder.io/qwik";
import { Form, routeAction$ } from "@builder.io/qwik-city";
import { Prisma } from "@prisma/client";
import { db } from "~/lib/prima.client";
import { categoryProduct } from "~/utils/data/categoryvise.seed";

export const useProductAddSeed = routeAction$(async (values) => {
  const categroyVise = categoryProduct;
  console.log(values);
  const mappedCatVise = Object.entries(categroyVise).map(([key, val]) => {
    const category = {
      name: key,
      orgId: "659e7a40169733634d0c6c1b",
      description: key,
      sortIndex: 1,
      products: val.map((prod) => {
        return {
          name: prod.name,
          secondaryLanguageName: prod.secondaryLanguageName,
          description: prod.description,
          price: prod.price,
          image: [],
          code: prod.code,
          printName: prod.printName,
          indexInCategory: 1,
          modifierGroups: {
            shouldBeSelected: true,
            description: "Size Option",

            items: prod.variants.map((variant, index) => ({
              title: variant.name,
              price: variant.price,
              isDefault: index == 0 ? true : false,
            })),
          },
        };
      }),
    };

    return category;
  });

  const updatedResult = await db.category.createMany({ data: mappedCatVise });
  //   mappedCatVise.forEach(async (category) => {
  //    await db.category.create({
  //       data: {
  //         name: category.name,
  //         description: category.description,
  //         orgId: category.orgId,
  //         products: category.products,
  //       },
  //     });
  //   });
  return updatedResult;
});
export default component$(() => {
  const catProductsAction = useProductAddSeed();

  return (
    <div>
      hello
      <div>
        <Form action={catProductsAction}>
          <input type="text" />
          <button type="submit">sumit data</button>
        </Form>
      </div>
      <div>{JSON.stringify(catProductsAction.value)}</div>
    </div>
  );
});
