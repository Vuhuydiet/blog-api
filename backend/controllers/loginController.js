import db from '../models/queries.js'
import { invalidatePassword, issueJWT } from '../lib/utils.js';

export default {
  post: async (req, res) => {
    try {
      const { username, password} = req.body;
      const user = await db.getUserByUsername(username);
      if (!user) {
        return res.status(400).json({ err: 'Wrong password or user does not exist' });
      }
      if (!invalidatePassword(password, user.password)) {
        return res.status(400).json({ err: 'Wrong password or user does not exist' });
      }
      const token = issueJWT(user.user_id);
      return res.json({ token });
    }
    catch(err) {
      console.error(err);
      res.status(500).json({ err: 'Internal Server Error' });
    }
  }
}