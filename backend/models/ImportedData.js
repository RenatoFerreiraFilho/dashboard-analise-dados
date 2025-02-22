const mongoose = require("mongoose");

const ImportedDataSchema = new mongoose.Schema({}, { strict: false });

const ImportedData = mongoose.model("ImportedData", ImportedDataSchema);

module.exports = ImportedData;
