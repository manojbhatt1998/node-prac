const express = require('express');
const con = require('./mysql_conn');
const app = express();

app.use(express.json());

app.get('/list', (req, res) => {
    con.query("select * from users", (err, result) => {
        if (err) {
            res.send('error', err);
        } else {
            res.status(200).send(result);
        }
    });
});

app.get('/insert', (req, res) => {
    const data = { name: 'Anu sharama', roll_no: 31, subject: 'Science', user_type: 'user' };
    con.query("INSERT INTO users SET ?", data, function (err, result) {
        if (err) throw err;
        res.send(`Success inserted id -- ',${result.insertId}`);
        console.log(result.insertId);
    });
});


app.put('/:id', (req, res) => {
    // Extracting data from request
    const { name, roll_no, subject, user_type } = req.body; // Destructure request body
    const  id  = req.params.id; // Extract ID from URL parameter

    const sql = "UPDATE users SET name = ?, roll_no = ?, subject = ?, user_type = ? WHERE id = ?";
    const data = [name, roll_no, subject, user_type, id];
  
    con.query(sql, data , (err, result) => {
        if (err) {
            console.error("Error updating record:", err);
            res.status(500).send("Error updating record");
            return;
        }
        // Response with success message
        res.send(`${result.affectedRows} record(s) updated`);
        console.log(result.affectedRows + " record(s) updated");
    });
});

app.get('/delete/:id', (req, res) => {
        const id = req.params.id;
         var sql = "DELETE FROM users WHERE id = ?";
         //console.log(id);
        con.query(sql, id, function (err, result) {
          if (err) throw err;
          res.send("Number of records deleted: " + result.affectedRows);
        });
});


app.listen(8080);