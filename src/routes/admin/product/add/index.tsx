import { component$, useSignal, useStore } from "@builder.io/qwik";
import { routeLoader$, useLocation } from "@builder.io/qwik-city";
import {
  InitialValues,
  formAction$,
  insert,
  remove,
  setValue,
  useForm,
  valiForm$,
} from "@modular-forms/qwik";
import { PrismaClient } from "@prisma/client";
import { LuPlusCircle } from "@qwikest/icons/lucide";
import { create } from "domain";
import {
  Input,
  array,
  boolean,
  decimal,
  email,
  integer,
  minLength,
  number,
  object,
  optional,
  string,
} from "valibot";

export const ProductSchema = object({
  name: string([minLength(1, "Please enter Product Name")]),
  code: number([integer("Please enter a number")]),
  price: number(),
  categoryId: string(),
  description: optional(string()),
  modifiers: array(
    object({
      name: string(),
      shouldBeSelected: boolean(),
      items: array(
        object({
          title: string(),
          price: number(),
          isDefault: boolean(),
        }),
      ),
    }),
  ),
});

export type ProductAddFrom = Input<typeof ProductSchema>;

export const useFormAction = formAction$<ProductAddFrom>(
  async (values) => {
    // Runs on server
    console.log(JSON.stringify(values));
    const prisma = new PrismaClient();
    const product = await prisma.product.create({
      data: {
        name: values.name,
        code: values.code.toString(),
        price: values.price,
        modifiers: values.modifiers,
        orgId: "659e7a40169733634d0c6c1b",
      },
    });
    console.log(product);
  },
  {
    validate: valiForm$(ProductSchema),
    arrays: ["modifiers", "modifiers.$.items"],
  },
);

export const useProductDetail = routeLoader$<InitialValues<ProductAddFrom>>(
  (requestEvent) => {
    const product: ProductAddFrom = {
      name: "Chatu",
      price: 10,
      code: 33,
      categoryId: "3",
      description: "BLend of chatu and shit juice mixed with snot syrup",
      modifiers: [
        {
          name: "Size",
          shouldBeSelected: true,
          items: [
            { title: "Small", price: 33, isDefault: true },
            { title: "Medium", price: 60, isDefault: false },
            { title: "Large", price: 80, isDefault: false },
          ],
        },
      ],
    };

    return product;
  },
);

export default component$(() => {
  const categoryOptions = useSignal([
    { categoryId: "1", value: "Juice" },
    { categoryId: "2", value: "Chinese" },
    { categoryId: "3", value: "Mexican" },
  ]);
  const [productAddFrom, { Form, Field, FieldArray }] = useForm<ProductAddFrom>(
    {
      loader: useProductDetail(),
      action: useFormAction(),
      fieldArrays: ["modifiers", "modifiers.$.items"],
    },
  );

  // const location = useLocation();
  // const productInfo = useProductDetail();

  return (
    <>
      <section class="m-4 rounded-lg bg-white dark:bg-gray-900">
        <div class="mx-auto max-w-2xl px-4 py-8 lg:py-16">
          <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">
            Add a new product
          </h2>
          <Form
            onSubmit$={(values) => {
              // Runs on client
              console.log(values);
            }}
          >
            <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <Field name="name">
                {(field, props) => (
                  <div class="sm:col-span-2">
                    <label
                      for="name"
                      class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Product Name
                    </label>
                    <input
                      type="text"
                      {...props}
                      class="focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                      placeholder="Type product name"
                      value={field.value}
                      required
                    />
                  </div>
                )}
              </Field>

              <Field name="code" type="number">
                {(field, props) => (
                  <div class="w-full">
                    <label
                      for="brand"
                      class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Code
                    </label>
                    <input
                      type="text"
                      {...props}
                      class="focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                      placeholder="Product code"
                      value={field.value}
                      required
                    />
                  </div>
                )}
              </Field>

              <Field name="price" type="number">
                {(field, props) => (
                  <div class="w-full">
                    <label
                      for="price"
                      class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Price
                    </label>
                    <input
                      type="number"
                      {...props}
                      value={field.value}
                      class="focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                      placeholder="OMR .800"
                      required
                    />
                  </div>
                )}
              </Field>

              <Field name="categoryId">
                {(field, props) => (
                  <div class="mb-2">
                    <label
                      for="category"
                      class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Category
                    </label>
                    <div>{field.value}</div>
                    <select
                      {...props}
                      class="focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                    >
                      {categoryOptions.value.map((item, index) => (
                        <option value={item.categoryId} key={index}>
                          {item.value}
                        </option>
                      ))}
                      {/* <option value="1">TV/Monitors</option>
                      <option>Select category</option>
                      <option value="2">PC</option>
                      <option value="3">Gaming/Console</option>
                      <option value="4">Phones</option> */}
                    </select>
                  </div>
                )}
              </Field>
            </div>

            <Field name="description">
              {(field, props) => (
                <div class="sm:col-span-3">
                  <label
                    for="description"
                    class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Description
                  </label>
                  <textarea
                    rows={8}
                    {...props}
                    value={field.value}
                    class="focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                    placeholder="Your description here"
                  ></textarea>
                </div>
              )}
            </Field>

            <div class="col-span-3 mt-4 ">
              <div class="flex">
                <div class="mb-2 block flex-grow text-lg font-medium text-gray-900 dark:text-white">
                  Modifiers
                </div>
                <button
                  onClick$={() =>
                    insert(productAddFrom, "modifiers", {
                      value: {
                        name: "Extra fieldure",
                        items: [{ isDefault: false, price: 0, title: "" }],
                        shouldBeSelected: false,
                      },
                    })
                  }
                >
                  <div class="h-8 w-8 text-2xl">
                    <LuPlusCircle />
                  </div>
                </button>
              </div>
              <FieldArray name="modifiers">
                {(fieldArray) => (
                  <>
                    {fieldArray.items.map((item, index) => (
                      <div
                        key={item}
                        class=" mt-2 grid grid-cols-3 gap-2 rounded-lg bg-gray-100 p-4 lg:gap-4  "
                      >
                        <Field name={`${fieldArray.name}.${index}.name`}>
                          {(field, props) => (
                            <div class="col-span-2">
                              <label
                                for="name"
                                class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                              >
                                Name
                              </label>
                              <input
                                type="text"
                                {...props}
                                class="focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                                placeholder="Type modifier name"
                                value={field.value}
                                required
                              />
                            </div>
                          )}
                        </Field>

                        <Field
                          name={`${fieldArray.name}.${index}.shouldBeSelected`}
                          type="boolean"
                        >
                          {(field, props) => (
                            <div>
                              <label
                                for="price"
                                class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                              >
                                Required
                              </label>
                              <input
                                type="checkbox"
                                {...props}
                                checked={field.value}
                                class="h-8 w-8"
                              />
                            </div>
                          )}
                        </Field>

                        <FieldArray name={`${fieldArray.name}.${index}.items`}>
                          {(fieldArray) => (
                            <div class="col-span-3">
                              <div class="flex">
                                <h2 class="mb-2 flex-grow text-base font-bold text-gray-900 dark:text-white">
                                  Items
                                </h2>

                                <button
                                  onClick$={() =>
                                    insert(productAddFrom, fieldArray.name, {
                                      value: {
                                        isDefault: false,
                                        price: 0,
                                        title: "",
                                      },
                                    })
                                  }
                                >
                                  <div class="h-8 w-8 text-2xl">
                                    <LuPlusCircle />
                                  </div>
                                </button>
                              </div>

                              {fieldArray.items.map((item, index) => (
                                <div
                                  key={item}
                                  class="grid grid-cols-4 gap-2 lg:gap-6"
                                >
                                  <Field
                                    name={`${fieldArray.name}.${index}.title`}
                                  >
                                    {(field, props) => (
                                      <div class="col-span-2 w-full">
                                        <label
                                          for="price"
                                          class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                          Title
                                        </label>
                                        <input
                                          type="text"
                                          {...props}
                                          value={field.value}
                                          class="focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                                          placeholder="Name the modifier"
                                          required
                                        />
                                      </div>
                                    )}
                                  </Field>

                                  <Field
                                    name={`${fieldArray.name}.${index}.price`}
                                    type="number"
                                  >
                                    {(field, props) => (
                                      <div class="w-full">
                                        <label
                                          for="price"
                                          class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                          Price
                                        </label>
                                        <input
                                          type="number"
                                          {...props}
                                          value={field.value}
                                          class="focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                                          placeholder="Price"
                                          required
                                        />
                                      </div>
                                    )}
                                  </Field>

                                  <Field
                                    name={`${fieldArray.name}.${index}.isDefault`}
                                    type="boolean"
                                  >
                                    {(field, props) => (
                                      <div class="text-center">
                                        <label
                                          for="isDefault"
                                          class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                          Default selected
                                        </label>
                                        <input
                                          type="checkbox"
                                          {...props}
                                          checked={field.value}
                                          class="h-8 w-8 "
                                          required
                                        />
                                      </div>
                                    )}
                                  </Field>
                                </div>
                              ))}
                            </div>
                          )}
                        </FieldArray>
                      </div>
                    ))}
                  </>
                )}
              </FieldArray>
            </div>

            <div class="col-span-3 mt-4 flex justify-end">
              <button
                class="mt-4 rounded-lg bg-gray-900 p-2 px-8 font-bold text-white"
                type="submit"
              >
                SAVE
              </button>
            </div>
          </Form>
        </div>
      </section>
    </>
  );
});
