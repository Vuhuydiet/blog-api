import db from '../models/queries.js'
import { getHashPassword } from '../lib/utils.js';

const post = async (req, res) => {
  try {
    const { username, password, fullname } = req.body;
    const hashedPassword = getHashPassword(password);
    const user_id = await db.createUser(username, hashedPassword, 'guest', fullname);
    if (user_id == -1)
      return res.status(400).json({ err: 'User already exists' });
    return res.json({ user_id: user_id });
  }
  catch(err) {
    console.error(err);
    res.status(500).json({ err: 'Internal Server Error' });
  }
}

export default { post };