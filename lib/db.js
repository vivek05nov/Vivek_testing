var {Client,Pool} = require('pg');
require('dotenv').config();

var pool = new Pool({
    connectionString : process.env.DATABASE_URL,
    ssl : true
})

pool.connect((err)=>{
if(err) throw err;

console.log("Connected");
})

module.exports = {
    pool,
    
};