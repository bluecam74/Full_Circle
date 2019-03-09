module.exports = function(sequelize, DataTypes) {
    var Pending = sequelize.define("Pending", {
      userId: DataTypes.STRING,
      voucherNum: DataTypes.STRING,
      amount: DataTypes.STRING, 
      createdAt: DataTypes.DATE
    }, 
    {
      freezeTableName: true
    });
    
    return Pending;
  };