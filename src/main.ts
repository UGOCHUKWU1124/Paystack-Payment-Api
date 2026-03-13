import 'dotenv/config';
import express, { Application } from 'express';
import router from "./routes/payment.routes";
import bodyParser from 'body-parser';
import cors from 'cors';
import rateLimit, { ipKeyGenerator } from 'express-rate-limit'; // Middleware to limit request rates per IP, preventing abuse.
import { errorHandler } from './packages/error-handler/error-middleware';


const app: Application = express();
app.use(
    cors({
        origin: ['http://localhost:3000'], // Allow only the specified frontend origin to prevent unauthorized access.
        methods: ['GET', 'POST', 'PUT', 'DELETE'], // Permitted HTTP methods for cross-origin requests.
        allowedHeaders: ['Authorization', 'Content-Type'], // Allowed headers in requests.
        credentials: true, // Enable sending cookies and authentication headers.
    }),
);
// Middleware to parse incoming JSON payloads, with a size limit to prevent large request attacks.
app.use(express.json({ limit: '100mb' }));

// Middleware to parse URL-encoded data, with extended support and size limit.
app.use(express.urlencoded({ limit: '100mb', extended: true }));

// Configure rate limiting to prevent abuse.
// Limits requests to 100 per 15-minute window per IP, with custom key generation for IPv4/IPv6 handling.
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // Time window for rate limiting (15 minutes).
    max: 100, // Maximum requests allowed per window.
    message: 'Too many requests from this IP, please try again later.', // Error message when limit exceeded.
    keyGenerator: (req: any) => {
        // Generate a unique key based on client IP, handling both IPv4 and IPv6.
        return ipKeyGenerator(req.ip);
    },
    standardHeaders: true, // Include rate limit info in standard headers.
    legacyHeaders: false, // Disable deprecated legacy headers.
});

// Apply rate limiting middleware to all routes.
app.use(limiter);

app.use("/api", router);

app.use(errorHandler);

const PORT = process.env.PORT;

// Start the server and listen on the specified port.
const server = app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}/api`);
});

// Handle server errors by logging them.
server.on('error', console.error);




//app.use(express.json());//this helps to parse json data
// app.use(bodyParser.json());//this helps to parse json data
// app.use(bodyParser.urlencoded({ extended: true }));//this helps to parse url encoded data