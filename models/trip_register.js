module.exports=function(sequelize,DataTypes){
    var trip_register=sequelize.define("trip_register",{
     userId:{
         type:DataTypes.INTEGER,
         allownull:false
     },
    status:{
          type:DataTypes.INTEGER,
          defaultValue:false
    },
   
},{
    timestamps:false
    })
    trip_register.associate = function(models) {
        trip_register.belongsTo(models.trip_details,{
            foreignKey:{
                allowNull:false
            }
        })
    }
    return trip_register;  
}