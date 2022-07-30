const {
    dbcon
} = require("../config/connection-db");

// postgres://mguhwyxzuehniz:513393b8847a572e661667b54ca6560f9da2239d6d569004b671a0580229af8f@ec2-52-54-212-232.compute-1.amazonaws.com:5432/dfoselo3bnj81h
class UserTime {
    constructor(useremail, timeid, tipo, data) {
        this.useremail = useremail;
        this.timeid = timeid;
        this.tipo = tipo;
        this.data = data;
    }
}

// DAO = DATA ACCESS OBJECT
class UserTimeDAO {

    static async buscaPeloId(id) {
        const sql = 'SELECT * FROM usertimes where id = $1';
        const result = await dbcon.query(sql, [id]);
        const usertime = result.rows[0];
        // const usertime = new usertime() -> mundo ideal <3
        return usertime;
    }

    static async aprova(usertime) {
        const sql = `UPDATE usertimes
            SET tipo = $2 
            WHERE timeid = $1 and useremail = $3;`;
        const values = [usertime.timeid, usertime.tipo, usertime.useremail];

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

       static async reprova(usertime) {
           const sql = `DELETE FROM usertimes
            WHERE timeid = $1 and useremail = $2;`;
           const values = [usertime.timeid, usertime.useremail];

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

    static async cadastrar(usertime) {

        const sql = 'INSERT INTO public.usertimes (timeid, useremail, tipo, data) VALUES ($1, $2, $3, $4);';
        const values = [usertime.timeid, usertime.useremail, usertime.tipo, usertime.data];

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
    UserTime,
    UserTimeDAO
};