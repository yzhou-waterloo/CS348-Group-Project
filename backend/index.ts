import Fastify, { FastifyReply, FastifyRequest} from "fastify"
import mysql, { Pool } from "mysql2"
import cors from "@fastify/cors"
import registerRoutes from "./routes/registerRoutes";

const server = Fastify( {logger: true, trustProxy: true} )
// IP provider
server.register(cors, {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
})

;(async () => {
    registerRoutes(server)
})()

server.listen(
    {
        port: 8080, 
        host: "localhost"
    }, 
        (err, address) => {
    if (err) {
        console.error("Error:" + err)
        process.exit(1)
    }
    console.log(`Server listening at ${address}`)
})
