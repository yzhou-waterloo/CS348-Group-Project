import { FastifyInstance } from "fastify"

import sqlHandler from "../routeHandlers/sqlHandler"

export default {
    registerRoutes(server: FastifyInstance) {
        server.get("/searchAll", {
            handler: sqlHandler.searchAll,
        }),

        server.get("/randInt", {
            handler: sqlHandler.randInt,
        })
    }
}