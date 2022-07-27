const { dbcon } = require("../config/connection-db");

// postgres://mguhwyxzuehniz:513393b8847a572e661667b54ca6560f9da2239d6d569004b671a0580229af8f@ec2-52-54-212-232.compute-1.amazonaws.com:5432/dfoselo3bnj81h
class Agenda {
    constructor(id, titulo, desc, data, time) {
        this.id = id;
        this.titulo = titulo;
        this.desc = desc;
        this.data = data;
        this.time = time;
    }
}

// DAO = DATA ACCESS OBJECT
class AgendaDAO {

    static async buscaPeloId(id) {
        const sql = 'SELECT * FROM agendas where id = $1';
        const result = await dbcon.query(sql, [id]);
        const agenda = result.rows[0];
        // const agenda = new agenda() -> mundo ideal <3
        return agenda;
    }

    static async atualiza(agenda) {
        const sql = `UPDATE agendas
            SET nome = $2, 
                sinopse = $3,
                genero = $4,
                data_lancamento = $5
            WHERE id = $1;`;
        const values = [agenda.id, agenda.nome];
        
        try {
            await dbcon.query(sql, values);
            return true;
        } catch (error) {
            console.log({ error });
            return false;
        }
    }

    static async cadastrar(agenda) {
          
        const sql = `INSERT INTO public.agendas ("titulo", "desc", "data", "time") VALUES ($1, $2, $3, $4);`
        const values = [agenda.titulo, agenda.desc, agenda.data, agenda.time];
        
        try {
            await dbcon.query(sql, values);
        } catch (error) {
            console.log('NAO FOI POSSIVEL INSERIR');
            console.log({ error });
        }
    }
}

module.exports = {
    Agenda,
    AgendaDAO
};