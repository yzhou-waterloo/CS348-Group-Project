import { FastifyInstance } from "fastify"

import sqlHandler from "../routeHandlers/sqlHandler"

export default {
    registerRoutes(server: FastifyInstance) {
        server.get("/ping", {
            handler: sqlHandler.ping,
            schema: {
                response: {
                    200: {}
                }
            }
        }),

        server.get("/randInt", {
            handler: sqlHandler.randInt,
            schema: {
                response: {
                    200: {}
                }
            }
        })
    }
}