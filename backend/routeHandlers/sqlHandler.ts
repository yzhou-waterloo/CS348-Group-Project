import { FastifyRequest, FastifyReply } from 'fastify'
import { loadSql } from '../../db/loadSql';
import db from '../../db/db'
import { PingBody } from '../typedefine'
const exactSearchQuery = loadSql('Feauture4.sql');
export default {
    async search(request: FastifyRequest<{ Querystring: PingBody }>, reply: FastifyReply) {
        const { dr_num } = request.query
        try {
            const [rows] = await db.execute(exactSearchQuery, [dr_num]); // exact match
            reply.send(rows);
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
