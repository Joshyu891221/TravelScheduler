import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
// TODO: session
import morgan from "morgan";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import helmet from "helmet";
import session from "express-session";
import mysqlSession from "express-mysql-session";
import { pool } from "./database/pool.js";

// import Routers
import userRouter from "./routes/user.js";
import spotRouter from "./routes/spot.js";
import groupRouter from "./routes/group.js";
import travelRouter from "./routes/travel.js";
import tagRouter from "./routes/tag.js";

const app = express();
dotenv.config();
const port = process.env.PORT || 8080;

// log to access.log
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
var accessLogStream = fs.createWriteStream(path.join(__dirname, "access.log"), {
  flags: "a",
});
app.use(morgan("combined", { stream: accessLogStream }));

// helmet
// app.use(helmet());
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),
        "script-src": ["'self'", "'unsafe-inline'", "*"],
        "connect-src": ["'self'", "*"],
        "frame-src": ["'self'", "*"],
      },
    },
  })
);

// helmet with all opened
// app.use(
//   helmet({
//     contentSecurityPolicy: {
//       directives: {
//         defaultSrc: ["'self'", "*"],
//         scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "*"],
//         styleSrc: ["'self'", "'unsafe-inline'", "*"],
//         imgSrc: ["'self'", "data:", "*"],
//         fontSrc: ["'self'", "*"],
//         connectSrc: ["'self'", "*"],
//         frameSrc: ["'self'", "*"],
//         objectSrc: ["'none'"],
//         mediaSrc: ["'self'", "*"],
//       },
//     },
//   })
// );

// body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// cors
// app.use(cors());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

// express
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
// app.use(express.static('./view/dist'));

// session
const MySQLStore = mysqlSession(session);
var sessionStore = new MySQLStore({}, pool);

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      maxAge: 86400000,
    },
  })
);

// Routes
app.use("/api/user/", userRouter);
app.use("/api/spot/", spotRouter);
app.use("/api/travel", travelRouter);
app.use("/api/group/", groupRouter);
app.use("/api/tag/", tagRouter);

// root router
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
