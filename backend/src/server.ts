import express from "express";
import cors from "cors";
import pessoaRoutes from "./routes/pessoaRoutes";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api/pessoas", pessoaRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});