const db = require('../db/config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.registerUser = (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    console.log(hashedPassword);

    const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
    db.query(sql, [username, hashedPassword], (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(201).send({ message: 'User registered successfully!' });
    });
};

exports.loginUser = (req, res) => {
    const { username, password } = req.body;

    const sql = 'SELECT * FROM users WHERE username = ?';
    db.query(sql, [username], (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.length === 0) return res.status(404).send({ message: 'User not found!' });

        const user = results[0];
        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) return res.status(401).send({ message: 'Invalid credentials!' });

        const token = jwt.sign({ id: user.id }, 'your_secret_key', { expiresIn: '1h' });
        res.send({ token });
    });
};
