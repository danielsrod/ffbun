import type z from "zod";
import type * as schema from "./schema";

export interface IFooBar {
    BAR: string
}

export interface IFooBarFromZod
	extends z.infer<(typeof schema)["fooBar"]> {}