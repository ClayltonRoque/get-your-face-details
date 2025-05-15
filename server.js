import express from "express";
import fs from "fs";
import https from "https";
import http from "http";
const app = express();

const port = process.env.PORT || 3000;

app.use(express.static("public"));

if (process.env.NODE_ENV === "production") {
  http.createServer(app).listen(port, () => {
    console.log(`Servidor HTTP rodando na porta ${port}`);
  });
} else {
  try {
    const options = {
      key: fs.readFileSync("./certificado.key"),
      cert: fs.readFileSync("./certificado.cert"),
    };

    https.createServer(options, app).listen(port, () => {
      console.log(`Servidor HTTPS rodando na porta ${port}`);
    });
  } catch (error) {
    console.error("Erro ao carregar certificados:", error);
    console.log("Iniciando servidor HTTP para desenvolvimento...");

    http.createServer(app).listen(port, () => {
      console.log(`Servidor HTTP rodando na porta ${port}`);
    });
  }
}
