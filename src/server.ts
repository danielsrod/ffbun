import fastify from "fastify";
import { startPool } from "./database/index";
import { env } from "./utils/env";
import { router } from "./router";
import * as ffZod from "fastify-type-provider-zod";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUI from "@fastify/swagger-ui";
import ffCors from "@fastify/cors";
import pino from "pino";

const PORT = env.PORT || 3000;

const logger = pino({
	transport: {
		target: "pino-pretty",
		options: {
			colorize: true,
		},
	},
});

const ff = fastify({
	logger: {
		level: "info",
		transport: {
			target: "pino-pretty",
		},
	},
});

ff.setValidatorCompiler(ffZod.validatorCompiler);
ff.setSerializerCompiler(ffZod.serializerCompiler);

ff.register(fastifySwagger, {
	openapi: {
		info: {
			title: "Swagger",
			description: "Swagger Documentation",
			version: "1.0.0",
		},
		servers: [],
	},
	transform: ffZod.jsonSchemaTransform,
});

ff.register(fastifySwaggerUI, {
	routePrefix: "/",
});

ff.register(ffCors, {
	origin: "*",
	methods: "*",
});

ff.register(router);

await startPool();
await ff.listen({ port: PORT, host: "0.0.0.0" });
