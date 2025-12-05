
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { writeFile } from 'fs/promises';
import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Ajuste para subir um nível e acessar a pasta dist na raiz do projeto
const distPath = path.join(__dirname, '..', 'dist');

console.log('Iniciando servidor...');
console.log('Diretório base (__dirname):', __dirname);
console.log('Caminho do Frontend (dist):', distPath);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Servir arquivos estáticos do Frontend (Build)
app.use(express.static(distPath));

app.post('/api/execute-python', async (req, res) => {
    const { script } = req.body;

    if (!script) {
        return res.status(400).json({ error: 'Nenhum script fornecido' });
    }

    const tempFilePath = path.join(__dirname, 'temp_email_sender.py');

    try {
        // Salvar o script em um arquivo
        await writeFile(tempFilePath, script);

        console.log('Script salvo em:', tempFilePath);
        console.log('Executando python...');

        // Executar o script Python forçando UTF-8 para evitar erros de acentuação no Windows
        const pythonProcess = spawn('python', ['-X', 'utf8', tempFilePath]);

        let output = '';
        let errorOutput = '';

        pythonProcess.stdout.on('data', (data) => {
            output += data.toString();
        });

        pythonProcess.stderr.on('data', (data) => {
            errorOutput += data.toString();
        });

        pythonProcess.on('close', (code) => {
            console.log(`Processo Python finalizado com código ${code}`);
            if (code === 0) {
                res.json({ success: true, output });
            } else {
                res.status(500).json({ success: false, error: errorOutput || 'Erro desconhecido na execução do script', output });
            }
        });

    } catch (error) {
        console.error('Erro no servidor:', error);
        res.status(500).json({ error: 'Falha interna ao processar script' });
    }
});

// Qualquer outra requisição retorna o index.html (SPA)
app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
