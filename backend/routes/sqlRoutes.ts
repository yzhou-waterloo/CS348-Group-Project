import { FastifyInstance } from "fastify"

import sqlHandler from "../routeHandlers/sqlHandler"

export default {
    registerRoutes(server: FastifyInstance) {
        // server.get("/selectCrimeBefore/:beforeDate/After/:afterDate", {
        //     handler: sqlHandler.selectCrimeBeforeAfter,
        // }),
        server.get("/countTime", {
            handler: sqlHandler.selectCountByTime,
        }),
        server.get("/countArea", {
            handler: sqlHandler.selectCountByArea,
        }),
        server.post("/selectWithFilter", {
            handler: sqlHandler.selectWithFilter,
        }),
        server.post("/insert", {
            handler: sqlHandler.insert,
        }),
        server.post("/delete", {
            handler: sqlHandler.delete,
        }),
        server.post("/update", {
            handler: sqlHandler.update,
        })

    }
}