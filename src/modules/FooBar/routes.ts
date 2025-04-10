import type { FastifyInstance } from 'fastify';
import * as controller from './controller';
import * as schema from './schema';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import type { ICatchError } from '../../utils/interfaces';

export const fooRoutes = async (fastify: FastifyInstance) => {
    fastify.withTypeProvider<ZodTypeProvider>().post('/foo', {
        schema: {
            querystring: schema.fooBar,
            body:  schema.fooBar,
            params: schema.fooBar
        },
    }, async (request, replay) => {
        try {
            const { params, query, body } = request;
            const result = await controller.foo(params, query, body);
            return replay.send({
                status: true,
                message: 'Foo',
                data: result
            });
        } catch (error) {
            const { stack } = error as ICatchError;
            return replay.send({
                status: false,
                message: stack,
                data: null
            });
        }
    })  
};