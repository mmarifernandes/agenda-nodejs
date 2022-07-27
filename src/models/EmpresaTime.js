const {
    dbcon
} = require("../config/connection-db");

// postgres://mguhwyxzuehniz:513393b8847a572e661667b54ca6560f9da2239d6d569004b671a0580229af8f@ec2-52-54-212-232.compute-1.amazonaws.com:5432/dfoselo3bnj81h
class EmpresaTime {
    constructor(empresaid, timeid) {
        this.empresaid = empresaid;
        this.timeid = timeid;
    }
}

// DAO = DATA ACCESS OBJECT
class EmpresaTimeDAO {

    static async buscaPeloId(id) {
        const sql = 'SELECT * FROM empresatimes where id = $1';
        const result = await dbcon.query(sql, [id]);
        const empresatime = result.rows[0];
        // const empresatime = new empresatime() -> mundo ideal <3
        return empresatime;
    }

    static async atualiza(empresatime) {
        const sql = `UPDATE empresatimes
            SET nome = $2, 
                sinopse = $3,
                genero = $4,
                data_lancamento = $5
            WHERE id = $1;`;
        const values = [empresatime.id, empresatime.nome];

        try {
            await dbcon.query(sql, values);
            return true;
        } catch (error) {
            console.log({
                error
            });
            return false;
        }
    }

    static async cadastrar(empresatime) {

        const sql = 'INSERT INTO public.empresatimes (empresaid, timeid) VALUES ($1, $2);';
        const values = [empresatime.empresaid, empresatime.timeid];

        try {
            await dbcon.query(sql, values);
        } catch (error) {
            console.log('NAO FOI POSSIVEL INSERIR');
            console.log({
                error
            });
        }
    }
}

module.exports = {
    EmpresaTime,
    EmpresaTimeDAO
};