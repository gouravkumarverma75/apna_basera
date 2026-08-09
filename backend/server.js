import express from "express";
import cors from "cors";
import propertyRoutes from "./routes/properties.js";
import enquiryRoutes from "./routes/enquiries.js";

const DEFAULT_ORIGINS = "http://localhost:5173,http://127.0.0.1:5173";

const allowedOrigins = (process.env.ALLOWED_ORIGINS || DEFAULT_ORIGINS)
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const app = express();
app.disable("x-powered-by");
app.use(express.json({ limit: "100kb" }));

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error(`Origin ${origin} is not allowed by CORS`));
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
    optionsSuccessStatus: 204,
  })
);

app.get("/api/health", (req, res) => {
  res.json({ ok: true, service: "apna-basera-api" });
});

app.use("/api/properties", propertyRoutes);
app.use("/api/enquiries", enquiryRoutes);

app.use((req, res) => {
  res.status(404).json({ message: `Route ${req.method} ${req.path} not found` });
});

app.use((err, req, res, next) => {
  if (err.message && err.message.includes("not allowed by CORS")) {
    return res.status(403).json({ message: err.message });
  }
  console.error(err);
  res.status(500).json({ message: "Something went wrong on the server." });
});

if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () => {
    console.log(`Apna Basera API running at http://localhost:${PORT}`);
  });
}

export default app;