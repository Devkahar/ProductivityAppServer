const houseData = require('../helper/loanEligilibilityPredectionModel.json')
const houseModel = async (req,res) =>{
    res.header("Content-Type",'application/json');
    res.send(JSON.stringify(houseData));
}
module.exports ={
    houseModel
}