module.exports = function(sequelize, DataTypes) {
    var Transactions = sequelize.define("Transactions", {
      // id: {
      //   type: DataTypes.INTEGER,
      //   primaryKey: true
      // },
      voucherNum: DataTypes.STRING,
      amount: DataTypes.STRING, 
      createdAt: DataTypes.DATE,
      approved: {
        type: DataTypes.BOOLEAN, 
        defaultValue: false
      },
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