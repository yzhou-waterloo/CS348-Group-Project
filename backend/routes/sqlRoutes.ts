import { FastifyInstance } from "fastify"

import sqlHandler from "../routeHandlers/sqlHandler"

export default {
    registerRoutes(server: FastifyInstance) {
<<<<<<< HEAD
        server.get("/searchAll", {
            handler: sqlHandler.searchAll,
=======
        server.get("/search", {
            handler: sqlHandler.search,
>>>>>>> 01266a109480a298b4d65c53b41f4c5520331cea
        }),

        server.get("/randInt", {
            handler: sqlHandler.randInt,
        })
    }
}