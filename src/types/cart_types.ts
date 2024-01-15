export type Modifier = {
  title: string;
  price: number;
  name: string;
};
export type CartItem = {
  name: string;
  image?: string;
  count: number;
  amount: number;
  modifiers?: Record<string, Modifier>;
};
