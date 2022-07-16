const { sequelize } = require("../config/db-config");
const { Time } = require("./Time");
const { User } = require("./User");
const { Empresa } = require("./Empresa");
const { UserTime } = require("./UserTime");
const { UserEmpresa } = require("./UserEmpresa");

User.belongsToMany(Time, { through: 'UserTime', foreignKey: 'user_timefk' });
Time.belongsToMany(Empresa, { through: 'EmpresaTime', foreignKey: 'empresatimefk' });
User.belongsToMany(Empresa, { through: 'UserEmpresa', foreignKey: 'user_empresafk' });

Empresa.init(sequelize);
User.init(sequelize);
Time.init(sequelize);
UserTime.init(sequelize);
UserEmpresa.init(sequelize);

sequelize.sync();