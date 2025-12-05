import React from 'react';
import { Copy, Terminal, Check } from 'lucide-react';
import { GenerationStatus } from '../types';

interface PythonPreviewProps {
  code: string;
  status: GenerationStatus;
}

export const PythonPreview: React.FC<PythonPreviewProps> = ({ code, status }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (status === GenerationStatus.IDLE) {
    return (
      <div className="h-full min-h-[500px] flex flex-col items-center justify-center bg-slate-900/50 rounded-2xl border border-slate-700 border-dashed text-slate-500 p-8 text-center">
        <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4">
          <Terminal className="w-8 h-8 text-slate-600" />
        </div>
        <h3 className="text-lg font-medium text-slate-400 mb-2">Pronto para Gerar</h3>
        <p className="max-w-xs text-sm">Preencha os detalhes à esquerda e clique em "Enviar Email" para criar seu script de automação.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-[#1e293b] rounded-2xl border border-slate-700 overflow-hidden shadow-2xl relative">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#0f172a] border-b border-slate-700">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
          </div>
          <span className="ml-3 text-xs font-mono text-slate-400">automacao_email.py</span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 transition-colors border border-slate-600"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
          {copied ? 'Copiado!' : 'Copiar Código'}
        </button>
      </div>

      {/* Code Area */}
      <div className="relative flex-1 overflow-hidden">
        <div className="absolute inset-0 overflow-auto">
          <pre className="p-4 font-mono text-sm leading-relaxed text-slate-300">
            <code>{code}</code>
          </pre>
        </div>
        {status === GenerationStatus.LOADING && (
           <div className="absolute inset-0 bg-[#0f172a]/80 backdrop-blur-sm flex items-center justify-center z-20">
             <div className="flex flex-col items-center gap-3">
                <div className="w-10 h-10 border-4 border-python-blue border-t-python-yellow rounded-full animate-spin"></div>
                <p className="text-sm font-medium text-slate-300 animate-pulse">Escrevendo script com Gemini...</p>
             </div>
           </div>
        )}
      </div>
      
      {/* Footer Instructions */}
      <div className="bg-[#0f172a] p-4 border-t border-slate-700 text-xs text-slate-400">
        <p className="font-semibold text-slate-300 mb-1">Como enviar o email REAL:</p>
        <ol className="list-decimal pl-4 space-y-1">
          <li>Instale o Python no seu computador.</li>
          <li>Copie o código acima e salve em um arquivo (ex: <code className="bg-slate-800 px-1 py-0.5 rounded text-python-yellow">email_sender.py</code>).</li>
          <li>Execute no terminal: <code className="bg-slate-800 px-1 py-0.5 rounded text-python-yellow">python email_sender.py</code></li>
          <li>O email será enviado instantaneamente usando o servidor SMTP do Google.</li>
        </ol>
      </div>
    </div>
  );
};