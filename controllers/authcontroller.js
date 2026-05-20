const prisma = require("../prismaClient");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const registerUser = async (req, res) => {
  const { First_name, Last_name, email, Password, User_name, Tel } = req.body;

  try {
    // check user
    const existingUser = await prisma.user.findUnique({
      where: { email: email}
    });

    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(Password, 10);

    // create user
    await prisma.user.create({
      data: {
        first_name: First_name,
        last_name: Last_name,
        email: email,
        password: hashedPassword,
        user_name: User_name,
        tel: Tel
      }
    });

    return res.json({ msg: "Account created successfully" });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const loginUser = async (req, res) => {
  const { email, Password } = req.body;

  try {
    // find user
    const user = await prisma.user.findUnique({
      where: { email: email }
    });

    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // check password
    const isMatch = await bcrypt.compare(Password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // create token
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      msg: "Login successful",
      token
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
module.exports = {registerUser,loginUser};
