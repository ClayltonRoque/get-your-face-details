import express from "express";
import fs from "fs";
import https from "https";
const app = express(); // Criação da instância do Express

const options = {
  key: fs.readFileSync("./certificado.key"),
  cert: fs.readFileSync("./certificado.cert"),
};

app.use(express.static("public"));

https.createServer(options, app).listen(3000, () => {
  console.log("Servidor HTTPS rodando na porta 3000");
});
