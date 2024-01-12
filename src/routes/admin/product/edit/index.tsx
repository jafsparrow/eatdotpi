import { component$ } from "@builder.io/qwik";
import { Form, routeAction$ } from "@builder.io/qwik-city";
import { Prisma } from "@prisma/client";
import { db } from "~/lib/prima.client";
import { categoryProduct } from "~/utils/data/categoryvise.seed";
import { arabic } from "~/utils/data/image_scaping/arabic";
import { biriyani } from "~/utils/data/image_scaping/biryani";
import { breakFast } from "~/utils/data/image_scaping/breakfast";
import { burger } from "~/utils/data/image_scaping/burger";
import { chinese } from "~/utils/data/image_scaping/chines";
import { dum } from "~/utils/data/image_scaping/dumbiriyani";
import { indian } from "~/utils/data/image_scaping/indian";
import { juice } from "~/utils/data/image_scaping/juice";
import { rice } from "~/utils/data/image_scaping/rice";
import { Sandwich } from "~/utils/data/image_scaping/sandwich";
import { soupsS } from "~/utils/data/image_scaping/soup";

export const useProductAddSeed = routeAction$(async (values) => {
  const imageArray = [
    breakFast.results
      .map((item) => item.urls)
      .map((urls, index) =>
        Object.entries(urls).map(([key, val]) => ({
          storageName: key,
          downloadUrl: val,
        })),
      ),

    biriyani.results
      .map((item) => item.urls)
      .map((urls, index) =>
        Object.entries(urls).map(([key, val]) => ({
          storageName: key,
          downloadUrl: val,
        })),
      ),
    dum.results
      .map((item) => item.urls)
      .map((urls, index) =>
        Object.entries(urls).map(([key, val]) => ({
          storageName: key,
          downloadUrl: val,
        })),
      ),
    arabic.results
      .map((item) => item.urls)
      .map((urls, index) =>
        Object.entries(urls).map(([key, val]) => ({
          storageName: key,
          downloadUrl: val,
        })),
      ),
    indian.results
      .map((item) => item.urls)
      .map((urls, index) =>
        Object.entries(urls).map(([key, val]) => ({
          storageName: key,
          downloadUrl: val,
        })),
      ),
    rice.results
      .map((item) => item.urls)
      .map((urls, index) =>
        Object.entries(urls).map(([key, val]) => ({
          storageName: key,
          downloadUrl: val,
        })),
      ),
    chinese.results
      .map((item) => item.urls)
      .map((urls, index) =>
        Object.entries(urls).map(([key, val]) => ({
          storageName: key,
          downloadUrl: val,
        })),
      ),
    soupsS.results
      .map((item) => item.urls)
      .map((urls, index) =>
        Object.entries(urls).map(([key, val]) => ({
          storageName: key,
          downloadUrl: val,
        })),
      ),
    Sandwich.results
      .map((item) => item.urls)
      .map((urls, index) =>
        Object.entries(urls).map(([key, val]) => ({
          storageName: key,
          downloadUrl: val,
        })),
      ),
    juice.results
      .map((item) => item.urls)
      .map((urls, index) =>
        Object.entries(urls).map(([key, val]) => ({
          storageName: key,
          downloadUrl: val,
        })),
      ),
    burger.results
      .map((item) => item.urls)
      .map((urls, index) =>
        Object.entries(urls).map(([key, val]) => ({
          storageName: key,
          downloadUrl: val,
        })),
      ),
  ];
  // console.log(imageArray);

  // return imageArray;
  const categroyVise = categoryProduct;
  console.log(values);
  const mappedCatVise = Object.entries(categroyVise).map(
    ([key, val], cindex) => {
      console.log("cindex", cindex);
      const category = {
        name: key,
        orgId: "659e7a40169733634d0c6c1b",
        description: key,
        sortIndex: 1,
        products: val.map((prod, pindex) => {
          return {
            name: prod.name,
            secondaryLanguageName: prod.secondaryLanguageName,
            description: prod.description,
            price: prod.price,
            image: imageArray[cindex][pindex],
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
    },
  );

  const updatedResult = await db.category.createMany({ data: mappedCatVise });
  // mappedCatVise.forEach(async (category) => {
  //   await db.category.create({
  //     data: {
  //       name: category.name,
  //       description: category.description,
  //       orgId: category.orgId,
  //       products: category.products,
  //     },
  //   });
  // });
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
