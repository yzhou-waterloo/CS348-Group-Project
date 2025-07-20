import fastify, { FastifyRequest, FastifyReply } from 'fastify'
import { loadSql } from '../loadSql.js';
import pool from '../db.js'
import { DeletePayload, InsertPayload, PingBody, SearchPayload } from '../typedefine'
import { FieldPacket, RowDataPacket } from 'mysql2';
import { console } from 'inspector';
// const CrimeBeforeAfterQuery = loadSql("Feature2--select crime by time.sql");
const SelectWithCountByArea = loadSql("Feature2--select by count and area.sql")
const SelectWithCountByTime = loadSql("Feature2--select by count and time.sql")
const selectWithFilter = loadSql("Feature1--Select with Filters.sql");
const insert = loadSql("Feature3--add row.sql");
const deleteSQL = loadSql("Feature4--delete by dr num.sql");
export default {
    // async selectCrimeBeforeAfter(request: FastifyRequest<{ Params: { beforeDate: string; afterDate: string };
    //   }>,
    //   reply: FastifyReply) {
    //     const { beforeDate, afterDate } = request.params;
    //     console.log(beforeDate, afterDate)
    //     try {
    //         const [rows, fields]: [RowDataPacket[], FieldPacket[]] = await pool.execute(
    //             CrimeBeforeAfterQuery,
    //             [beforeDate, afterDate]
    //           );
    //           reply.send(rows);
    //       } catch (err) {
    //         reply.status(500).send({ error: 'Database error', details: err });
    //       }
    // },
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
            rows.forEach(row => {
                row.date_occurred = new Date(row.date_occurred).toISOString().split('T')[0];
                row.date_reported = new Date(row.date_reported).toISOString().split('T')[0];
              });
                reply.send(rows);
            } catch (err) {
                reply.status(500).send({ error: 'Database error', details: err });
            }
    },
    async insert(request: FastifyRequest<{ Body: InsertPayload ;
      }>,
      reply: FastifyReply) {
        var {
            dr_num,
            date_reported,
            date_occurred,
            time_occurred,
            area_code,
            area_name,
            crime_code,
            crime_description,
            victim_age,
            sex,
            race,
            weapon_code,           // optional
            weapon_description,    // optional
            latitude,
            longitude
          } = request.body; 
        
       
        var weapon_sql = ""
        if (weapon_code && weapon_code.trim() !== "") {    
              
            weapon_sql += `INSERT ignore INTO Weapon VALUES\n(${weapon_code},'${weapon_description}');\n`
            
        } else {
            weapon_code = null
            
        }       
        const Area = [(area_code),area_name]
        const Crime = [(crime_code),crime_description]
        const Crime_Records = [(dr_num),weapon_code, (area_code),(crime_code)]
        const Times = [(dr_num),date_reported,date_occurred,time_occurred]
        const Coordinates = [dr_num,latitude,longitude]
        const Victim = [dr_num,victim_age,sex,race]
        const sql = weapon_sql + insert
        try {
          const [rows, fields]: [RowDataPacket[], FieldPacket[]] = await pool.query(
            sql,
            [
            ...Area,
            ...Crime,
            ...Crime_Records,
            ...Times,
            ...Coordinates,
            ...Victim]      
          );
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
     async delete(request: FastifyRequest<{ Body: DeletePayload ;
     }>, reply: FastifyReply) {
       const { dr_num } = request.body;    
        [ dr_num,dr_num,dr_num,dr_num]
       try {
           const [rows, fields]: [RowDataPacket[], FieldPacket[]] = await pool.query(deleteSQL,[ dr_num,dr_num,dr_num,dr_num]);

               reply.send(rows);
           } catch (err) {
               reply.status(500).send({ error: 'Database error', details: err });
           }
   },

}
