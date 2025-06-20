import { FastifyInstance } from "fastify"

import sqlHandler from "../routeHandlers/sqlHandler"

export default {
    registerRoutes(server: FastifyInstance) {
        server.get("/ping", {
            handler: sqlHandler.ping,
        }),

        server.get("/randInt", {
            handler: sqlHandler.randInt,
        })
    }
}