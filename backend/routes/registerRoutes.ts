import { FastifyInstance } from "fastify"

import sqlRoutes from "./sqlRoutes"

export default (server: FastifyInstance) => {
    sqlRoutes.registerRoutes(server)
}
