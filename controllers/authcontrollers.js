const db = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const registerUser = async (req, res) => {
const { First_name, Last_name, E_mail,Password, User_name,Tel} = req.body;
  
    // check user
db.query("SELECT * FROM users WHERE E_mail = ?",[E_mail],
    async (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }

        if (!result) {
            return res.status(500).json({
                msg: "Database query failed"
            });
        }
        if (result.length > 0) {
            return res.status(400).json({
                msg: "User already exists"
            });
        }
        const hashedPassword = await bcrypt.hash(Password, 10);

          db.query("INSERT INTO users (First_name, Last_name, E_mail, Password, User_name, Tel) VALUES (?, ?, ?, ?, ?, ?)",
                [First_name, Last_name, E_mail, hashedPassword, User_name, Tel],
                (err, data) => {

                    if (err) return res.status(500).json(err);

                    return res.json({
                        msg: "Account created successfully"
                    });
                }
                )}      
    );
};

const loginUser = (req, res) => {
    console.log("REGISTER BODY:", req.body);
    console.log("sheep");

    const {E_mail,Password } = req.body;

    // check if user exists
    db.query(
        "SELECT * FROM users WHERE E_mail = ?",
        [E_mail],
        async (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            // user not found
            if (result.length === 0) {
                return res.status(400).json({
                    msg: "Invalid credentials"
                });
            }

            const user = result[0];

            // compare passwords
            const isMatch = await bcrypt.compare(Password,user.Password
                );

            if (!isMatch) {
                return res.status(400).json({
                    msg: "Invalid credentials"
                });
            }

            // create token
            const token = jwt.sign(
                {
                    id: user.id,
                    E_mail: user.E_mail
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: "1d"
                }
            );

            res.json({
                msg: "Login successful",
                token
            });
        }
    );
};

module.exports = { registerUser, loginUser};