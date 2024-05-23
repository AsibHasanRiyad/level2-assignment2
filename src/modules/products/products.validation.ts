import { z } from "zod";

const TVariantsValidationSchema = z.object({
  type: z.string(),
  value: z.string(),
});

const TInventoryValidationSchema = z.object({
  quantity: z.number(),
  inStock: z.boolean(),
});

const TProductsValidationSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
  category: z.string(),
  tags: z.array(z.string()),
  variants: z.array(TVariantsValidationSchema),
  inventory: TInventoryValidationSchema,
});

const TProductsUpdateValidationSchema = TProductsValidationSchema.partial();
export { TProductsValidationSchema, TProductsUpdateValidationSchema };
