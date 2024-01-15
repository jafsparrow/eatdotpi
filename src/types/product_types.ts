export type Product = {
  name: string;
  secondaryLanguageName?: string;
  description: string;
  price: number;
  image: ProductImage[];
  inStock: boolean;
  videoUrl?: string;
  popular: boolean;
  printName: string;
  modifierGroups: ModifierGroup[];
  indexInCategory: number;
  code: number;
  createdAt?: Date;
};

export type ModifierGroup = {
  description: string;
  shouldBeSelected: boolean;
  items: Modifier[];
};
export type ProductImage = {
  storageName: string;
  downloadUrl: string;
};

export type Modifier = {
  title: string;
  price: number;
  isDefault: boolean;
};
