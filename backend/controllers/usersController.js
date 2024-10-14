import db from '../models/queries.js'

function isTheRequestedUser(user, id) {
  return user?.user_id == id;
}

const getAllUsers = async (req, res) => {
  try {
    const users = await db.getAllUsers();
    users.forEach(user => {
      delete user.username;
      delete user.password;
    });
    res.json(users);
  }
  catch(err) {
    console.error(err);
    res.status(500).json({ err: 'Internal Server Error' });
  }
}

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await db.getUserById(id);
    if (!user) {
      return res.status(404).json({ err: 'User not found' });
    }

    if (!isTheRequestedUser(req.user, id)) {
      delete user.username
      delete user.password;
    }
    res.json(user);
  }
  catch(err) {
    console.error(err);
    res.status(500).json({ err: 'Internal Server Error' });
  }
}

export default { getAllUsers, getUserById };