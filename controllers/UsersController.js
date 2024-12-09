import crypto from 'crypto';
import dbClient from '../utils/db';

class UsersController {
  static async postNew(req, res) {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Missing email' });
    }
    if (!password) {
      return res.status(400).json({ error: 'Missing password' });
    }

    // Check if the database is available
    if (!dbClient.isAlive()) {
      return res.status(500).json({ error: 'Database not connected' });
    }

    const usersCollection = dbClient.db.collection('users');

    const existing = await usersCollection.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: 'Already exist' });
    }

    const hashedPwd = crypto.createHash('sha1').update(password).digest('hex');

    const result = await usersCollection.insertOne({ email, password: hashedPwd });

    const newUser = { id: result.insertedId, email };

    return res.status(201).json(newUser);
  }
}

export default UsersController;
