import express from "express";
import boottstrap from "./src/app.controller.js";

const app = express();
const port = process.env.PORT || 3000;

await boottstrap(app, express);

app.use(express.json());

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
