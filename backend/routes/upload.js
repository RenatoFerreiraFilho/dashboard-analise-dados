const express = require("express");
const multer = require("multer");
const XLSX = require("xlsx");
const DataModel = require("../models/ImportedData"); // Importação correta do modelo

const router = express.Router();

// Configuração do Multer para armazenar arquivos temporariamente na memória
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Endpoint para Upload de Arquivo CSV/Excel
router.post("/upload", upload.single("file"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "Nenhum arquivo enviado." });
        }

        // Lê o arquivo enviado e converte para JSON
        const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
        const sheetName = workbook.SheetNames[0];
        const jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

        if (!jsonData.length) {
            return res.status(400).json({ error: "O arquivo está vazio." });
        }

        // Salva os dados no MongoDB
        await DataModel.insertMany(jsonData);

        res.status(200).json({ message: "Arquivo importado com sucesso!", data: jsonData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao processar o arquivo." });
    }
});

// Endpoint para buscar todos os dados importados
router.get("/imported-data", async (req, res) => {
    try {
        const data = await DataModel.find().limit(100); // Limita a 100 registros para evitar sobrecarga
        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao buscar os dados." });
    }
});

module.exports = router;
