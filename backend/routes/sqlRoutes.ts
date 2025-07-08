import { FastifyInstance } from "fastify"

import sqlHandler from "../routeHandlers/sqlHandler"

export default {
    registerRoutes(server: FastifyInstance) {
        server.get("/searchCountByCrimeCode", {
            handler: sqlHandler.searchCountByCrimeCode,
        }),
        server.get("/selectCrimeBefore/:beforeDate/After/:afterDate", {
            handler: sqlHandler.selectCrimeBeforeAfter,
        }),
        server.get("/countTime", {
            handler: sqlHandler.selectCountByTime,
        }),
        server.get("/countArea", {
            handler: sqlHandler.selectCountByArea,
        }),
        server.post("/selectWithFilter", {
            handler: sqlHandler.selectWithFilter,
        }),

        server.get("/randInt", {
            handler: sqlHandler.randInt,
        })
    }
}