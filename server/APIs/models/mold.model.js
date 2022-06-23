const sql = require("./db.js");

// mold constructor
const Mold = function (mold) {
    this.moldID = mold.moldID;
    this.monaNumber = mold.monaNumber;
    this.material = mold.material;
    this.moldMaker = mold.moldMaker;
}

// check whether a mold exists in the molds table
Mold.checkMold = async (moldID) => {
    const row = await sql.query("SELECT * FROM molds WHERE moldID = ?", [moldID]);
    if (row.length > 0) {
        return true;
    }
    return false;
}

module.exports = Mold;