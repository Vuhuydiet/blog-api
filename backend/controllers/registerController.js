import db from '../models/queries.js'
import { getHashPassword } from '../lib/utils.js';

export default {

  post: async (req, res) => {
    try {
      const { username, password} = req.body;
      const hashedPassword = await getHashPassword(password);
      const user_id = await db.createUser(username, hashedPassword, 'guest', null);
      if (user_id == -1)
        return res.status(400).json({ err: 'User already exists' });
      return res.json({ user_id: user_id });
    }
    catch(err) {
      console.error(err);
      res.status(500).json({ err: 'Internal Server Error' });
    }
  }

}

