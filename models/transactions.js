module.exports = function(sequelize, DataTypes) {
    var Transactions = sequelize.define("Transactions", {
      userId: DataTypes.STRING,
      voucherNum: DataTypes.STRING,
      amount: DataTypes.STRING, 
      createdAt: DataTypes.DATE,
      approved: {
        type: DataTypes.BOOLEAN, 
        defaultValue: false
      },
      denied: {
        type: DataTypes.BOOLEAN, 
        defaultValue: false
      },
      deniedReason: DataTypes.STRING
    },
    {
      freezeTableName: true
    });

    // Transactions.associate = function(models){
    //     Transactions.belongsTo(models.User,{
    //         foreignKey: 'id',
    //     });
    // };
    
    return Transactions;
  };