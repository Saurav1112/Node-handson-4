const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors())

const users = [];
app.post('/register/:firstName/:lastName', async (req, res) => {
  try {
    const { firstName, lastName } = req.params;
    const { email, password } = req.query;
    console.log(email);
    if (users.find(user => user.email === email)) {
      return res.status(409).json({ message: 'User already exists' });
     
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      id: users.length + 1,
      firstName,
      lastName,
      email,
      password: hashedPassword
    };

    // Save the user to the temporary storage
    users.push(newUser);

    return res.status(201).json({ message: 'User successfully registered' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'User registration failed' });
  }
});

// Login endpoint
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.query;
    const user = users.find(user => user.email === email);
    if (!user) {
      return res.status(404).json({ message: 'User is not registered' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id }, 'dnabduiauifbuibfibui');

    return res.status(200).json({ message: 'User has logged in successfully', token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Login failed' });
  }
});
app.listen(5000,()=>{
    console.log("server is running inside the port number 5000");
})