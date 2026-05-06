import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

const ODOO_URL = "https://districam.odoo.com/jsonrpc";
const DB = "districam";
const USER = "districamok@gmail.com";
const API_KEY = "7d4ec67cf475c0a508ca8a727afd6061f8e9c863";

app.post("/login", async (req, res) => {
  try {
    const response = await fetch(ODOO_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        method: "call",
        params: {
          service: "common",
          method: "login",
          args: [DB, USER, API_KEY]
        }
      })
    });

    const data = await response.json();
    res.json(data);

  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

app.listen(3000, () => {
  console.log("Servidor corriendo en puerto 3000");
});
