const { sequelizeCon } = require("../config/db-config");
const { Post } = require("./Post");
const { User } = require("./User");

Post.belongsTo(User);
User.hasMany(Post);

sequelizeCon.sync();

