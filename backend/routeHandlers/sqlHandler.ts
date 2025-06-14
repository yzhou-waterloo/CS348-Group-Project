import { FastifyRequest, FastifyReply } from 'fastify'

export default {
    async ping(request: FastifyRequest, reply: FastifyReply) {
        const response = { message: "pong" }
        reply.send(response)
    },

    async randInt(request: FastifyRequest, reply: FastifyReply) {
        const randInt = Math.floor(Math.random() * 1000)
        const response = { randomInteger: randInt }
        reply.send(response)
    }
}