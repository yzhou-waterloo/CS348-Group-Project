import { FastifyRequest, FastifyReply } from 'fastify'
import { loadSql } from '../loadSql.js';
import db from '../db'
import { PingBody } from '../typedefine'
import { FieldPacket, RowDataPacket } from 'mysql2';
const exactSearchQuery = loadSql('Feature4--.sql');
export default {
    async search(request: FastifyRequest<{ Querystring: PingBody }>, reply: FastifyReply) {
        const { dr_num } = request.query
        try {
            const []: [RowDataPacket[], FieldPacket[]] = await db.execute(
                exactSearchQuery,
                [dr_num]
              );
          } catch (err) {
            reply.status(500).send({ error: 'Database error', details: err });
          }
    },

    async randInt(request: FastifyRequest, reply: FastifyReply) {
        const randInt = Math.floor(Math.random() * 1000)
        const response = { randomInteger: randInt }
        reply.send(response)
    }
}
