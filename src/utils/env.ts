import z from 'zod';

export const env = z.object({
    PORT: z.string().transform(val => Number(val))
}).parse(process.env);