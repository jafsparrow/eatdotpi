import type { Input } from "valibot";
import type { ProductSchema } from "~/routes/admin/product/add";

export type Product = Input<typeof ProductSchema>;
