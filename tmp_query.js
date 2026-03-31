const mysql=require('mysql2/promise');
(async()=>{const db=await mysql.createConnection({host:'127.0.0.1',user:'root',password:'13717701',database:'mysql_nodejs'});
const [rows]=await db.execute('SELECT content_id,title FROM content LIMIT 15');
console.log(rows);
await db.end();
})();