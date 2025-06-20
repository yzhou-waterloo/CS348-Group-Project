import { FastifyInstance } from "fastify"

import sqlHandler from "../routeHandlers/sqlHandler"

export default {
    registerRoutes(server: FastifyInstance) {
        server.get("/search", {
            handler: sqlHandler.search,
        }),

        server.get("/randInt", {
            handler: sqlHandler.randInt,
        })
    }
}