const { dbcon } = require("../config/connection-db");

// postgres://mguhwyxzuehniz:513393b8847a572e661667b54ca6560f9da2239d6d569004b671a0580229af8f@ec2-52-54-212-232.compute-1.amazonaws.com:5432/dfoselo3bnj81h
class Time {
    constructor(nome, desc, id) {
        this.id = id;
        this.nome = nome;
        this.desc = desc;
    }
}

// DAO = DATA ACCESS OBJECT
class TimeDAO {

    // static async buscaPeloId(id) {
    //     const sql = 'SELECT * FROM times where id = $1';
    //     const result = await dbcon.query(sql, [id]);
    //     const time = result.rows[0];
    //     // const time = new time() -> mundo ideal <3
    //     return time;
    // }

    // static async atualiza(time) {
    //     const sql = `UPDATE times
    //         SET nome = $2, 
    //             sinopse = $3,
    //             genero = $4,
    //             data_lancamento = $5
    //         WHERE id = $1;`;
    //     const values = [time.id, time.nome];
        
    //     try {
    //         await dbcon.query(sql, values);
    //         return true;
    //     } catch (error) {
    //         console.log({ error });
    //         return false;
    //     }
    // }

    static async cadastrar(time) {
          
        const sql = `INSERT INTO public.times ("id", "nome", "desc") VALUES ($1, $2, $3);`;
        const values = [time.id, time.nome, time.desc];
        
        try {
            await dbcon.query(sql, values);
        } catch (error) {
            console.log('NAO FOI POSSIVEL INSERIR');
            console.log({ error });
        }
    }
}

module.exports = {
    Time,
    TimeDAO
};