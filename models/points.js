
module.exports = function(sequelize, DataTypes) {
  var Points = sequelize.define("Points", {
    userId: DataTypes.STRING,
    email: DataTypes.STRING,
    fname: DataTypes.STRING,
    lname: DataTypes.STRING,
    zip: DataTypes.STRING,
    points: {
      type: DataTypes.INTEGER, 
      defaultValue: 0
    }
},
    {
    freezeTableName: true
  });

  return Points;
}