import React from 'react';
import { Mail, Server, Lock, Send, User, FileText, Hash, Siren, Moon, ShieldAlert } from 'lucide-react';
import { EmailConfig, GenerationStatus } from '../types';

interface ConfigurationFormProps {
  config: EmailConfig;
  setConfig: React.Dispatch<React.SetStateAction<EmailConfig>>;
  onGenerate: () => void;
  onQuickSend: (type: 'panico' | 'adormeceu' | 'sabotagem') => void;
  status: GenerationStatus;
}

export const ConfigurationForm: React.FC<ConfigurationFormProps> = ({ config, setConfig, onGenerate, onQuickSend, status }) => {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setConfig(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-md border border-slate-700 rounded-2xl p-6 shadow-xl">
      <div className="flex items-center gap-2 mb-6 border-b border-slate-700 pb-4">
        <div className="p-2 bg-gmail-red rounded-lg">
          <Mail className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-xl font-semibold text-white">Configuração do E-mail</h2>
      </div>

      <div className="space-y-4">
        {/* Quick Actions - DISPARO IMEDIATO */}
        <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-700/50 mb-6">
          <label className="text-xs text-slate-400 font-bold mb-3 block tracking-wider uppercase text-center">
            🔥 Disparo Imediato (Use com Cautela)
          </label>
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => onQuickSend('panico')}
              className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/30 hover:bg-red-500/20 hover:border-red-500 text-red-400 hover:text-red-300 transition-all group active:scale-95"
              title="Enviar alerta de PÂNICO agora"
            >
              <Siren className="w-6 h-6 group-hover:animate-pulse" />
              <span className="text-[10px] font-bold uppercase">Pânico</span>
            </button>

            <button
              onClick={() => onQuickSend('adormeceu')}
              className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl bg-blue-500/10 border border-blue-500/30 hover:bg-blue-500/20 hover:border-blue-500 text-blue-400 hover:text-blue-300 transition-all group active:scale-95"
              title="Enviar alerta de ADORMECEU agora"
            >
              <Moon className="w-6 h-6" />
              <span className="text-[10px] font-bold uppercase">Adormeceu</span>
            </button>

            <button
              onClick={() => onQuickSend('sabotagem')}
              className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl bg-yellow-500/10 border border-yellow-500/30 hover:bg-yellow-500/20 hover:border-yellow-500 text-yellow-400 hover:text-yellow-300 transition-all group active:scale-95"
              title="Enviar alerta de SABOTAGEM agora"
            >
              <ShieldAlert className="w-6 h-6" />
              <span className="text-[10px] font-bold uppercase">Sabotagem</span>
            </button>
          </div>
        </div>

        {/* Server Settings */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 space-y-1">
            <label className="text-xs text-slate-400 font-medium ml-1 flex items-center gap-1">
              <Server className="w-3 h-3" /> Servidor SMTP
            </label>
            <input
              type="text"
              name="smtpServer"
              value={config.smtpServer}
              onChange={handleChange}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-200 focus:ring-2 focus:ring-python-blue focus:border-transparent outline-none transition-all"
              placeholder="smtp.gmail.com"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs text-slate-400 font-medium ml-1 flex items-center gap-1">
              <Hash className="w-3 h-3" /> Porta
            </label>
            <input
              type="text"
              name="port"
              value={config.port}
              onChange={handleChange}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-200 focus:ring-2 focus:ring-python-blue focus:border-transparent outline-none transition-all"
              placeholder="587"
            />
          </div>
        </div>

        {/* Authentication */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs text-slate-400 font-medium ml-1 flex items-center gap-1">
              <User className="w-3 h-3" /> Email Gmail
            </label>
            <input
              type="email"
              name="email"
              value={config.email}
              onChange={handleChange}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-200 focus:ring-2 focus:ring-python-blue focus:border-transparent outline-none transition-all"
              placeholder="seu.email@gmail.com"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs text-slate-400 font-medium ml-1 flex items-center gap-1">
              <Lock className="w-3 h-3" /> Senha do App Gmail
            </label>
            <input
              type="password"
              name="password"
              value={config.password}
              onChange={handleChange}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-200 focus:ring-2 focus:ring-python-blue focus:border-transparent outline-none transition-all"
              placeholder="xxxx xxxx xxxx xxxx"
            />
            <p className="text-[10px] text-slate-500 text-right">Requer 2FA & Senha de App</p>
          </div>
        </div>

        {/* Destination */}
        <div className="space-y-1 pt-2">
          <label className="text-xs text-slate-400 font-medium ml-1 flex items-center gap-1">
            <Send className="w-3 h-3" /> Email Destino
          </label>
          <input
            type="email"
            name="destination"
            value={config.destination}
            onChange={handleChange}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-200 focus:ring-2 focus:ring-python-blue focus:border-transparent outline-none transition-all"
            placeholder="destinatario@exemplo.com"
          />
        </div>

        <div className="border-t border-slate-700/50 my-4"></div>
        <p className="text-xs text-slate-500 text-center mb-2">Envio Manual Personalizado</p>

        {/* Subject */}
        <div className="space-y-1">
          <label className="text-xs text-slate-400 font-medium ml-1 flex items-center gap-1">
            <FileText className="w-3 h-3" /> Título (Assunto)
          </label>
          <input
            type="text"
            name="subject"
            value={config.subject}
            onChange={handleChange}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-200 focus:ring-2 focus:ring-python-blue focus:border-transparent outline-none transition-all"
          />
        </div>

        {/* Content */}
        <div className="space-y-1">
          <div className="flex justify-between items-end">
            <label className="text-xs text-slate-400 font-medium ml-1">Conteúdo</label>
          </div>
          <textarea
            name="content"
            value={config.content}
            onChange={handleChange}
            rows={5}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-sm text-slate-200 focus:ring-2 focus:ring-python-blue focus:border-transparent outline-none transition-all resize-none font-sans"
          />
        </div>

        {/* Action Button */}
        <div className="pt-4">
          <button
            onClick={onGenerate}
            disabled={status === GenerationStatus.LOADING}
            className="w-full group relative overflow-hidden bg-gradient-to-r from-python-blue to-[#2b5b84] hover:from-[#3a7db3] hover:to-python-blue text-white font-medium py-3 px-4 rounded-xl transition-all shadow-lg hover:shadow-python-blue/20 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <div className="flex items-center justify-center gap-2 relative z-10">
              {status === GenerationStatus.LOADING ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Enviando...</span>
                </>
              ) : (
                <>
                  <div className="bg-white/10 p-1 rounded-md">
                    <span className="text-xs font-mono font-bold">py</span>
                  </div>
                  <span>Enviar Personalizado</span>
                </>
              )}
            </div>
          </button>
          <p className="text-xs text-center mt-3 text-slate-500">
            Nota: O clique gera o código Python necessário para realizar o envio real no seu PC.
          </p>
        </div>
      </div>
    </div>
  );
};