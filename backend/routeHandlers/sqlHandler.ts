import { FastifyRequest, FastifyReply } from 'fastify'
import { loadSql } from '../loadSql.js';
import pool from '../db.js'
import { PingBody } from '../typedefine'
import { FieldPacket, RowDataPacket } from 'mysql2';
const CountByCrimeCode = loadSql("Feature1--count by crime code.sql");
const CrimeBeforeAfterQuery = loadSql("Feature2--select crime by time.sql");
export default {
    async searchCountByCrimeCode(request: FastifyRequest<{ Querystring: PingBody }>, reply: FastifyReply) {
        const { dr_num } = request.query
        try {
            const [rows, fields]: [RowDataPacket[], FieldPacket[]] = await pool.execute(
                CountByCrimeCode
              );
              reply.send(rows);
          } catch (err) {
            reply.status(500).send({ error: 'Database error', details: err });
          }
    },
    async selectCrimeBeforeAfter(request: FastifyRequest<{ Params: { beforeDate: string; afterDate: string };
      }>,
      reply: FastifyReply) {
        const { beforeDate, afterDate } = request.params;
        console.log(beforeDate, afterDate)
        try {
            const [rows, fields]: [RowDataPacket[], FieldPacket[]] = await pool.execute(
                CrimeBeforeAfterQuery,
                [beforeDate, afterDate]
              );
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
