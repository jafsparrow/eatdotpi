import { Product } from "~/types/product_types";

export const sampleProduct: Product = {
  name: "C Lemone Burger",
  secondaryLanguageName: "C Lemone Burger",
  description: "product details",
  price: 0.5,
  image: [
    {
      storageName: "raw",
      downloadUrl:
        "https://plus.unsplash.com/premium_photo-1672363353886-a106864f5cb9?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTN8fGJ1cmdlcnxlbnwwfHx8fDE3MDUwMzExMjd8MA&ixlib=rb-4.0.3",
    },
    {
      storageName: "full",
      downloadUrl:
        "https://plus.unsplash.com/premium_photo-1672363353886-a106864f5cb9?crop=entropy&cs=srgb&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTN8fGJ1cmdlcnxlbnwwfHx8fDE3MDUwMzExMjd8MA&ixlib=rb-4.0.3&q=85",
    },
    {
      storageName: "regular",
      downloadUrl:
        "https://plus.unsplash.com/premium_photo-1672363353886-a106864f5cb9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTN8fGJ1cmdlcnxlbnwwfHx8fDE3MDUwMzExMjd8MA&ixlib=rb-4.0.3&q=80&w=1080",
    },
    {
      storageName: "small",
      downloadUrl:
        "https://plus.unsplash.com/premium_photo-1672363353886-a106864f5cb9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTN8fGJ1cmdlcnxlbnwwfHx8fDE3MDUwMzExMjd8MA&ixlib=rb-4.0.3&q=80&w=400",
    },
    {
      storageName: "thumb",
      downloadUrl:
        "https://plus.unsplash.com/premium_photo-1672363353886-a106864f5cb9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTN8fGJ1cmdlcnxlbnwwfHx8fDE3MDUwMzExMjd8MA&ixlib=rb-4.0.3&q=80&w=200",
    },
    {
      storageName: "small_s3",
      downloadUrl:
        "https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/unsplash-premium-photos-production/premium_photo-1672363353886-a106864f5cb9",
    },
  ],
  inStock: true,
  popular: false,
  printName: "Not Added",
  modifierGroups: [],
  indexInCategory: 1,
  code: 244,
};
