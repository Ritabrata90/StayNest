import 'dotenv/config';
import app from './app.js';
import { connectToDatabase } from './config/database.js';

const port = Number(process.env.PORT ?? 4000);

try {
  await connectToDatabase();
} catch (error) {
  console.error('MongoDB connection failed. Start MongoDB or check MONGODB_URI.', error);
}

app.listen(port, () => {
  console.log(`StayNest API listening on http://localhost:${port}`);
});
