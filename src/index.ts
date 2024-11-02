import express from 'express';
import dotenv from 'dotenv';
import searchRoutes from "./routes/search";
import { google } from 'googleapis';
// .env dosyasını yükle
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
export const customSearch = google.customsearch('v1');

// JSON parse middleware
app.use(express.json());

// Test endpoint'i
app.get('/xaera', (req, res) => {
  res.json({ message: 'API çalışıyor!' });
});


// User routes api/v1/users
app.use("/api/v1/search", searchRoutes);

app.listen(port, () => {
  console.log(`Server ${port} portunda çalışıyor`);
});
