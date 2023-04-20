import path from "node:path";
import app from "./src/app.js";
import { config } from "dotenv";

config({ path: path.resolve() + "/.env" });
app();
