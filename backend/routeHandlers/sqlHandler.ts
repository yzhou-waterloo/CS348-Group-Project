import { FastifyRequest, FastifyReply } from 'fastify'
import { loadSql } from '../loadSql.js';
import pool from '../db.js'
import { PingBody, SearchPayload } from '../typedefine'
import { FieldPacket, RowDataPacket } from 'mysql2';
const CountByCrimeCode = loadSql("Feature1--count by crime code.sql");
const CrimeBeforeAfterQuery = loadSql("Feature2--select crime by time.sql");
const SelectWithCountByArea = loadSql("Feature2--select by count and area.sql")
const SelectWithCountByTime = loadSql("Feature2--select by count and time.sql")
const selectWithFilter = loadSql("Feature1--Select with Filters.sql");
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
    async selectWithFilter(request: FastifyRequest<{ Body: SearchPayload ;
      }>,
      reply: FastifyReply) {
        const { dr_num, date_occurred, area_name } = request.body;
        console.log(dr_num, date_occurred, area_name)
        const conditions: string[] = [];
        const values: any[] = [];

        if (dr_num && dr_num.trim() !== "") {
            conditions.push("cr.dr_num = ?");
            values.push(dr_num.trim());
        }

        if (date_occurred && date_occurred.trim() !== "") {
            conditions.push("t.date_occurred = ?");
            values.push(date_occurred.trim());
        }

        if (area_name && area_name.trim() !== "") {
            conditions.push("a.area_name = ?");
            values.push(area_name.trim());        
        }

        const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';
        const sql = selectWithFilter + whereClause + ";";
        try {
            const [rows, fields]: [RowDataPacket[], FieldPacket[]] = await pool.query(sql,values);
                reply.send(rows);
            } catch (err) {
                reply.status(500).send({ error: 'Database error', details: err });
            }
    },
    async selectCountByArea(request: FastifyRequest, reply: FastifyReply) {      
        try {
            const [rows, fields]: [RowDataPacket[], FieldPacket[]] = await pool.execute(
                SelectWithCountByArea
                );
                reply.send(rows);
            } catch (err) {
                reply.status(500).send({ error: 'Database error', details: err });
            }
     },

     async selectCountByTime(request: FastifyRequest, reply: FastifyReply) {      
        try {
            const [rows, fields]: [RowDataPacket[], FieldPacket[]] = await pool.execute(
                SelectWithCountByTime
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
