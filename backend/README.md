# Elite Fusion Project Setup

## MongoDB Atlas Setup

1. **Get MongoDB Connection String**:
   - Log in to [MongoDB Atlas](https://cloud.mongodb.com)
   - Click on "Connect" button for your cluster
   - Select "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your actual password (eliteFusion)

2. **Update Connection String**:
   - Open `database/dbConnection.js`
   - Replace the existing connection string with your actual connection string
   - Make sure to replace `<password>` with "eliteFusion" and add the database name "eliteFusion" at the end

   Example:
   ```javascript
   const mongoURI = 'mongodb+srv://eliteFusion:eliteFusion@cluster0.abcdef.mongodb.net/eliteFusion?retryWrites=true&w=majority';
   ```

3. **Also update the connection string in `seedData.js`**

## Running the Application

1. **Seed the Database**:
   ```
   node seedData.js
   ```

2. **Start the Backend**:
   ```
   npm start
   ```
   The backend will run on http://localhost:5000

3. **Start the Frontend** (in a new terminal):
   ```
   cd ../frontend
   npm run dev
   ```
   The frontend will run on http://localhost:5173

## User Credentials

After seeding the database, you can log in with:
- Email: admin@example.com
- Password: password123

Or:
- Email: user@example.com
- Password: password123 