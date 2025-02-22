import { useState } from "react";
import axios from "axios";

const UploadFile = () => {
    const [file, setFile] = useState<File | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setFile(event.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!file) {
            setMessage("Selecione um arquivo antes de enviar.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axios.post("http://localhost:4000/api/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setMessage(response.data.message);
        } catch (error) {
            setMessage(`Erro ao enviar arquivo: ${error}`);
        }
    };

    return (
        <div>
            <h2>Upload de Arquivo CSV/Excel</h2>
            <input type="file" accept=".csv, .xlsx" onChange={handleFileChange} />
            <button onClick={handleUpload}>Enviar</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default UploadFile;
