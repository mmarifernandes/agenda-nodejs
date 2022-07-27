const { dbcon } = require("../config/connection-db");

// postgres://mguhwyxzuehniz:513393b8847a572e661667b54ca6560f9da2239d6d569004b671a0580229af8f@ec2-52-54-212-232.compute-1.amazonaws.com:5432/dfoselo3bnj81h
class Empresa {
    constructor(id, nome) {
        this.id = id;
        this.nome = nome;
    }
}

// DAO = DATA ACCESS OBJECT
class EmpresaDAO {

    static async buscaPeloId(id) {
        const sql = 'SELECT * FROM empresas where id = $1';
        const result = await dbcon.query(sql, [id]);
        const empresa = result.rows[0];
        // const empresa = new empresa() -> mundo ideal <3
        return empresa;
    }

    static async atualiza(empresa) {
        const sql = `UPDATE empresas
            SET nome = $2, 
                sinopse = $3,
                genero = $4,
                data_lancamento = $5
            WHERE id = $1;`;
        const values = [empresa.id, empresa.nome];
        
        try {
            await dbcon.query(sql, values);
            return true;
        } catch (error) {
            console.log({ error });
            return false;
        }
    }

    static async cadastrar(empresa) {
          
        const sql = 'INSERT INTO public.empresas (nome) VALUES ($1);';
        const values = [empresa.nome];
        
        try {
            await dbcon.query(sql, values);
        } catch (error) {
            console.log('NAO FOI POSSIVEL INSERIR');
            console.log({ error });
        }
    }
}

module.exports = {
    Empresa,
    EmpresaDAO
};