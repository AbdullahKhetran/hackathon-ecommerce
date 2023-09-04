import { sql } from '@vercel/postgres';
import { drizzle } from 'drizzle-orm/vercel-postgres';
import { pgTable, serial, varchar, integer } from "drizzle-orm/pg-core";
import { type InferSelectModel, type InferInsertModel } from 'drizzle-orm'

export const cartTable = pgTable("cart", {
    id: serial("id").primaryKey(),
    userid: varchar("user_id", { length: 255 }).notNull(),
    productid: varchar("product_id", { length: 255 }).notNull(),
    quantity: integer("quantity").notNull(),
    price: integer("price").notNull(),
    amount: integer("amount").notNull(),
})

// Types
export type Cart = InferSelectModel<typeof cartTable>;
export type NewCart = InferInsertModel<typeof cartTable>;

// Connection
export const db = drizzle(sql)

// // They are deprecated now
// import { InferModel } from 'drizzle-orm';
// export type Cart = InferModel<typeof cartTable>
// export type NewCart = InferModel<typeof cartTable, "insert">