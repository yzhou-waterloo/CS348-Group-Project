import { FastifyRequest, FastifyReply } from 'fastify'

import { PingBody } from '../typedefine'

export default {
    async ping(request: FastifyRequest<{ Querystring: PingBody }>, reply: FastifyReply) {
        const { dr_num } = request.query
        const response = { message: dr_num * 2 }
        reply.send(response)
    },

    async randInt(request: FastifyRequest, reply: FastifyReply) {
        const randInt = Math.floor(Math.random() * 1000)
        const response = { randomInteger: randInt }
        reply.send(response)
    }
}
