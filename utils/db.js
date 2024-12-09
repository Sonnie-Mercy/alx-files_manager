import { MongoClient } from 'mongodb';

class DBClient {
  constructor() {
    // MongoDB connection details
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';

    const url = `mongodb://${host}:${port}`;
    this.client = new MongoClient(url, { useUnifiedTopology: true });

    // Connect to MongoDB
    this.client.connect()
      .then(() => {
        this.db = this.client.db(database);
        console.log('Connected to MongoDB');
      })
      .catch((err) => {
        console.error('MongoDB connection error:', err);
      });
  }

  /**
   * Check if the MongoDB client is connected
   * @returns {boolean} true if connected, false otherwise
   */
  isAlive() {
    return this.client && this.client.isConnected();
  }

  /**
   * Get the number of users in the 'users' collection
   * @returns {Promise<number>} number of documents in 'users'
   */
  async nbUsers() {
    try {
      const usersCollection = this.db.collection('users');
      return usersCollection.countDocuments();
    } catch (err) {
      console.error('Error counting users:', err);
      return 0;
    }
  }

  /**
   * Get the number of files in the 'files' collection
   * @returns {Promise<number>} number of documents in 'files'
   */
  async nbFiles() {
    try {
      const filesCollection = this.db.collection('files');
      return filesCollection.countDocuments();
    } catch (err) {
      console.error('Error counting files:', err);
      return 0;
    }
  }
}

// Export an instance of DBClient
const dbClient = new DBClient();
export default dbClient;
