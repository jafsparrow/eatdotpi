export type Product = {
  name: string;
  secondaryLanguageName: string;
  description: string;
  price: number;
  image: ProductImage[];
  inStock: boolean;
  videoUrl: string;
  popular: boolean;
  printName: string;
  modifierGroups: ModifierGroup[];
  indexInCategory: number;
  code: number;
  createdAt?: Date;
};

type ModifierGroup = {
  description: string;
  shouldBeSelected: boolean;
  items: Modifier[];
};
type ProductImage = {
  storageName: string;
  downloadUrl: string;
};

type Modifier = {
  title: string;
  price: number;
  isDefault: boolean;
};
