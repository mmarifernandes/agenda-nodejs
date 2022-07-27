const { dbcon } = require("../config/connection-db");

// postgres://mguhwyxzuehniz:513393b8847a572e661667b54ca6560f9da2239d6d569004b671a0580229af8f@ec2-52-54-212-232.compute-1.amazonaws.com:5432/dfoselo3bnj81h
class User {
    constructor(nome, email, senha, perfilpic) {
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.perfilpic = perfilpic;
    }
}

// DAO = DATA ACCESS OBJECT
class UserDAO {

    static async buscaPeloId(email) {
        const sql = 'SELECT * FROM users where email = $1';
        const result = await dbcon.query(sql, [email]);
        const user = result.rows[0];
        // const user = new user() -> mundo ideal <3
        return user;
    }

    static async atualiza(user) {
        const sql = `UPDATE users
            SET nome = $2, 
                sinopse = $3,
                genero = $4,
                data_lancamento = $5
            WHERE id = $1;`;
        const values = [user.id, user.nome];
        
        try {
            await dbcon.query(sql, values);
            return true;
        } catch (error) {
            console.log({ error });
            return false;
        }
    }

    static async cadastrar(user) {
          
        const sql = 'INSERT INTO public.users (nome, email, senha, perfilpic) VALUES ($1, $2, $3, $4);';
        const values = [user.nome, user.email, user.senha, user.perfilpic];
        
        try {
            await dbcon.query(sql, values);
        } catch (error) {
            console.log('NAO FOI POSSIVEL INSERIR');
            console.log({ error });
        }
    }
}

module.exports = {
    User,
    UserDAO
};