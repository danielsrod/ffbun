import type { FastifyInstance } from 'fastify';
import { fooRoutes } from "./modules/FooBar/routes";

export const router = (fastify: FastifyInstance) => {
    fastify.register(fooRoutes);
}