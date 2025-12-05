import React, { useState } from 'react';
import { EmailConfig, GenerationStatus } from './types';
import { ConfigurationForm } from './components/ConfigurationForm';
import { PythonPreview } from './components/PythonPreview';
import { generatePythonScript } from './services/geminiService';
import { Bot, AlertTriangle } from 'lucide-react';

const App: React.FC = () => {
  const [config, setConfig] = useState<EmailConfig>({
    smtpServer: 'smtp.gmail.com',
    port: '587',
    email: '',
    password: '',
    destination: '',
    subject: 'Email teste',
    content: 'Teste Delta system'
  });

  const [generatedCode, setGeneratedCode] = useState<string>('');
  const [status, setStatus] = useState<GenerationStatus>(GenerationStatus.IDLE);

  const handleGenerate = async () => {
    // Basic validation
    if (!config.email || !config.destination) {
      alert("Por favor, insira pelo menos os e-mails de remetente e destinatário.");
      return;
    }

    setStatus(GenerationStatus.LOADING);

    // Simular um pequeno delay para sensação de processamento
    setTimeout(async () => {
      try {
        const code = generatePythonScript(config);
        setGeneratedCode(code);
        setStatus(GenerationStatus.SUCCESS);

        // Executar o script automaticamente
        try {
          console.log("Enviando script para execução...");
          const response = await fetch('http://localhost:3001/api/execute-python', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ script: code }),
          });

          const result = await response.json();

          if (result.success) {
            alert(`E-mail enviado com sucesso!`);
          } else {
            alert(`Erro ao executar o script Python:\n${result.error}\n\nOutput:\n${result.output || ''}`);
          }

        } catch (execError) {
          console.error("Erro de execução:", execError);
          alert("Erro ao conectar com o servidor local para execução do Python. Verifique se o backend está rodando.");
        }
      } catch (error) {
        console.error(error);
        setStatus(GenerationStatus.ERROR);
        alert("Erro ao gerar script.");
      }
    }, 500);
  };

  const handleQuickSend = (type: 'panico' | 'adormeceu' | 'sabotagem') => {
    // Basic validation
    if (!config.email || !config.destination) {
      alert("Configure primeiro os e-mails de remetente e destinatário.");
      return;
    }

    let subject = "";
    let content = "";

    switch (type) {
      case 'panico':
        subject = "🚨 ALERTA MÁXIMO: PÂNICO ACIONADO";
        content = "O botão de PÂNICO foi acionado no local. Verifique as câmeras e contate a segurança IMEDIATAMENTE.";
        break;
      case 'adormeceu':
        subject = "💤 ALERTA: POSSÍVEL SONOLÊNCIA (ADORMECEU)";
        content = "Sistema detectou falta de atividade ou 'homem morto' não acionado. Operador pode ter adormecido.";
        break;
      case 'sabotagem':
        subject = "⚠️ ALERTA DE SEGURANÇA: SABOTAGEM";
        content = "Sensores indicam tentativa de sabotagem ou violação física do equipamento de monitoramento.";
        break;
    }

    // Create a temporary config for this specific action without changing form state
    const quickConfig = { ...config, subject, content };

    setStatus(GenerationStatus.LOADING);
    const code = generatePythonScript(quickConfig);
    setGeneratedCode(code); // Update preview to show what was sent

    // Send immediately
    fetch('http://localhost:3001/api/execute-python', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ script: code }),
    })
      .then(res => res.json())
      .then(result => {
        setStatus(GenerationStatus.SUCCESS);
        if (result.success) {
          alert(`ALERTA DE ${type.toUpperCase()} ENVIADO COM SUCESSO!`);
        } else {
          alert(`Erro no envio: ${result.error}`);
        }
      })
      .catch(err => {
        console.error(err);
        setStatus(GenerationStatus.ERROR);
        alert("Erro de conexão com servidor local.");
      });
  };

  return (
    <div className="min-h-screen bg-[#0b1120] text-slate-200 p-4 md:p-8 relative overflow-hidden font-sans">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-python-blue/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-python-yellow/5 rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white flex items-center gap-3">
              <span className="bg-gradient-to-br from-python-blue to-python-yellow text-transparent bg-clip-text">
                Automação Gmail Python
              </span>
              <div className="px-2 py-1 rounded bg-slate-800 border border-slate-700 text-xs text-slate-400 font-mono font-normal">
                Local
              </div>
            </h1>
            <p className="text-slate-400 mt-2 max-w-xl">
              Configure seus parâmetros e envie e-mails automaticamente usando Python local.
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* AI Badge Removed */}
          </div>
        </header>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column: Form */}
          <div className="flex flex-col gap-6">
            <ConfigurationForm
              config={config}
              setConfig={setConfig}
              onGenerate={handleGenerate}
              onQuickSend={handleQuickSend}
              status={status}
            />

            {/* Info Card */}
            <div className="bg-amber-900/20 border border-amber-900/50 rounded-xl p-4 flex gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-amber-200/80">
                <p className="font-semibold text-amber-500 mb-1">Nota de Segurança Importante</p>
                <p>
                  Para o Gmail, você <strong>deve</strong> usar uma "Senha de App" em vez da sua senha normal se a Verificação em Duas Etapas estiver ativa.
                  <a href="https://myaccount.google.com/apppasswords" target="_blank" rel="noreferrer" className="text-amber-400 hover:underline ml-1">
                    Obter Senha de App aqui &rarr;
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Preview */}
          <div className="h-full">
            <PythonPreview code={generatedCode} status={status} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;