import { z } from "zod";

export const fooBar = z.object({
    foo: z.string(),
    bar: z.string()
});