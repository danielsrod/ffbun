import z from 'zod';

export const env = z.object({
    ORACLE_USER: z.string(),
    ORACLE_PASSWORD: z.string(),
    ORACLE_CONNECTIONSTRING: z.string(),
    PORT: z.string().transform(val => Number(val))
}).parse(process.env);