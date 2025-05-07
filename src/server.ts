import fastify from "fastify";
import { startPool } from "./database/index";
import { env } from "./utils/env";
import { router } from "./router";
import * as ffZod from "fastify-type-provider-zod";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUI from "@fastify/swagger-ui";
import ffCors from "@fastify/cors";
import { logger } from "./utils/logger"

const PORT = env.PORT || 3000;

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

try {
	logger.info("Creating a Oracle Pool.")
	await startPool();
	logger.info("Oracle Pool created. 🐒")
	ff.listen({ port: PORT, host: "0.0.0.0" });
	logger.info("Documentation at / 🐒")
} catch (error) {
	logger.error(error);
	process.exit(1);
}
