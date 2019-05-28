module.exports=function(sequelize,DataTypes){
    var trip_details=sequelize.define("trip_details",{
      destination:{
         type:DataTypes.STRING,
         allownull:false,
         unique:true,

      }  ,
      startDate:{
          type:DataTypes.STRING,
          allownull:false
      },
      duration:{
          type:DataTypes.INTEGER,
          allownull:false
      },
      distance:{
          type:DataTypes.INTEGER,
          allownull:false
      },
      origin:{
          type:DataTypes.STRING,
          allownull:false
      }
    },{
        timestamps:false
    
      
    })
    trip_details.associate = function(models) {
        trip_details.hasMany(models.trip_register,{
            onDelete: "cascade"
        })
    }
    return trip_details;
}