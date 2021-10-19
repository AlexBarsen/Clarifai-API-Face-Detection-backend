const express = require("express");
const bcrypt = require("bcrypt");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const database = {
  users: [
    {
      id: "1",
      name: "Alex",
      email: "alex@gmail.com",
      password: "cookies",
      entries: 0,
      joined: new Date(),
    },
    {
      id: "2",
      name: "France",
      email: "france@gmail.com",
      password: "bananas",
      entries: 0,
      joined: new Date(),
    },
  ],

  login: [
    {
      id: "99",
      hash: "",
      email: "alex@gmail.com",
    },
  ],
};

app.get("/", (req, res) => {
  res.send(database.users);
});

app.post("/signin", (req, res) => {
  //   // Load hash from your password DB.
  //   bcrypt.compare(
  //     "deaconu",
  //     "$2b$04$0A5twCmmyRJkWBsx7gnZF..q8g4kQcy4HqIERuewi2FuTgAZx6XGG",
  //     function (err, result) {
  //       console.log("first guess", result);
  //     }
  //   );
  //   bcrypt.compare(
  //     "veggies",
  //     "$2b$04$0A5twCmmyRJkWBsx7gnZF..q8g4kQcy4HqIERuewi2FuTgAZx6XGG",
  //     function (err, result) {
  //       console.log("second guess", result);
  //     }
  //   );

  if (
    req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password
  ) {
    res.json(database.users[0]);
  } else {
    res.status(400).json("error logging in");
  }
});

app.post("/register", (req, res) => {
  // const { email, name, password } = req.body;
  console.log(req.body);
  // bcrypt.hash(password, 1, function (err, hash) {
  //   console.log(hash);
  // });

  const { name, email, password } = req.body;

  database.users.push({
    id: "3",
    name: name,
    email: email,
    entires: 0,
    joined: new Date(),
  });

  res.json(database.users[database.users.length - 1]);
});

app.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  let found = false;
  database.users.forEach((user) => {
    if (user.id === id) {
      found = true;
      res.json(user);
    }
  });
  if (!found) res.status(404).json("no such user");
});

app.put("/image", (req, res) => {
  const { id } = req.body;
  let found = false;
  database.users.forEach((user) => {
    if (user.id === id) {
      found = true;
      user.entries++;
      res.json(user.entries);
    }
  });
  if (!found) res.status(404).json("no such user");
});

// const saltRounds = 10;

// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function (err, result) {
//   // result == true
// });
// bcrypt.compare("veggies", hash, function (err, result) {
//   // result == false
// });

app.listen(3000, () => {
  console.log("app is runing on port 3000");
});

/*
/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user

*/
