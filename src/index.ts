import express from 'express';
import dotenv from 'dotenv';
import searchRoutes from "./routes/search";
import { google } from 'googleapis';
import morgan from "morgan";
import createHttpError, {isHttpError} from "http-errors";
import { Request, Response, NextFunction } from 'express';


// .env dosyasını yükle
// dotenv.config();

const environment = process.env.NODE_ENV || 'development';
dotenv.config({
  path: `.env.${environment}`
});

const app = express();
const port = process.env.PORT || 3000;
export const customSearch = google.customsearch('v1');



app.use(morgan("dev"));

// JSON parse middleware
app.use(express.json());

// Test endpoint'i
app.get('/xaera', (req, res) => {
  res.json({ message: 'API çalışıyor!' });
});


// User routes api/v1/users
app.use("/api/v1/search", searchRoutes);


app.use((req, res, next) => {
    next(createHttpError(404, "Endpoint not found"));
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.log(error);
    let errorMessage = "An unknown error occurred";
    let statusCode = 500;
    if (isHttpError(error)) {
        statusCode = error.status;
        errorMessage = error.message;
    }
    res.status(statusCode).json({error: errorMessage});
});


app.listen(port, () => {
  console.log(`Server ${port} portunda çalışıyor`);
});
