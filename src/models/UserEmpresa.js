const {
    dbcon
} = require("../config/connection-db");

// postgres://mguhwyxzuehniz:513393b8847a572e661667b54ca6560f9da2239d6d569004b671a0580229af8f@ec2-52-54-212-232.compute-1.amazonaws.com:5432/dfoselo3bnj81h
class UserEmpresa {
    constructor(useremail, empresaid) {
        this.useremail = useremail;
        this.empresaid = empresaid;
    }
}

// DAO = DATA ACCESS OBJECT
class UserEmpresaDAO {

    static async buscaPeloId(useremail) {
        const sql = 'SELECT * FROM userempresas where useremail = $1';
        const result = await dbcon.query(sql, [useremail]);
        const userempresa = result.rows[0];
        // const userempresa = new userempresa() -> mundo ideal <3
        return userempresa;
    }

    static async atualiza(userempresa) {
        const sql = `UPDATE userempresas
            SET nome = $2, 
                sinopse = $3,
                genero = $4,
                data_lancamento = $5
            WHERE id = $1;`;
        const values = [userempresa.id, userempresa.nome];

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

    static async cadastrar(userempresa) {

        const sql = 'INSERT INTO public.userempresas (empresaid, useremail) VALUES ($1, $2);';
        const values = [userempresa.empresaid, userempresa.useremail];

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
    UserEmpresa,
    UserEmpresaDAO
};