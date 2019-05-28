var bcrypt = require("bcryptjs");
module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
              isEmail: true
            }
          },
          password: {
            type: DataTypes.STRING,
            allowNull: false
          },
          firstName:{
              type:DataTypes.STRING,
              allowNull:false
          },
          lastName:{
              type:DataTypes.STRING,
              allowNull:false
          },
          licenceNo:{
              type:DataTypes.STRING,
              allowNull:false
          },
          category:{
              type:DataTypes.STRING,
              allowNull:true
          }
        });    
        User.prototype.validPassword = function(password) {
            return bcrypt.compareSync(password, this.password);
          };
          User.beforeCreate(user => {
            user.password = bcrypt.hashSync(
              user.password,
              bcrypt.genSaltSync(10),
              null
            );
          });
          /*User.hook("beforeCreate", function(User) {
            user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
          });*/
          return User;
                           
}