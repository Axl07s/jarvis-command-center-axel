import { useState } from 'react';
import { ArrowLeft, Bot, Activity } from 'lucide-react';



export function App() {
  const [activeTab, setActiveTab] = useState<'hud' | 'agents' | 'ledger'>('hud');
  const [state, setState] = useState<'idle' | 'listening' | 'speaking'>('idle');
  const [hudMessage, setHudMessage] = useState('Jarvis Chief Brain initialized. Neural mesh online across 9 nodes.');
  const [tokenCost, setTokenCost] = useState(14.82);

  const subagents = [
    { id: '1', name: 'Chief Brain (Orchestrator)', model: 'Claude 3.5 Sonnet', status: 'Active', latency: '120ms', task: 'Task routing & voice response synthesis' },
    { id: '2', name: 'Code Synthesizer', model: 'GPT-4o', status: 'Idle', latency: '180ms', task: 'Component generation & refactoring' },
    { id: '3', name: 'Security & CVE Auditor', model: 'Llama 3 70B', status: 'Active', latency: '95ms', task: 'Zero-trust auth analysis & vulnerability check' },
    { id: '4', name: 'Market Intelligence Scraper', model: 'DeepSeek V2', status: 'Active', latency: '210ms', task: 'Upwork & Fiverr pricing dynamics monitor' },
    { id: '5', name: 'Financial Token Ledger', model: 'Claude 3 Haiku', status: 'Active', latency: '65ms', task: 'Real-time OpenAI/Anthropic spend audit' },
    { id: '6', name: 'Database Architect', model: 'GPT-4o Mini', status: 'Idle', latency: '110ms', task: 'PostgreSQL schema migration generator' },
    { id: '7', name: 'Voice Synthesis Pipeline', model: 'ElevenLabs Turbo v2', status: 'Active', latency: '140ms', task: 'Neural streaming audio generation' },
    { id: '8', name: 'Git & Deployment Bot', model: 'Custom Agent', status: 'Idle', latency: '80ms', task: 'Vercel / GitHub Actions CI webhook dispatch' },
    { id: '9', name: 'Client Communication Proxy', model: 'Claude 3.5 Sonnet', status: 'Active', latency: '130ms', task: 'Drafting high-ticket B2B proposals' },
  ];

  const handleVoiceCommand = (cmd: string) => {
    setState('listening');
    setHudMessage(`Executing command: "${cmd}"...`);
    setTimeout(() => {
      setState('speaking');
      setHudMessage(`Processed command across subagent mesh. ElevenLabs audio response stream active. Cost: +$0.0024.`);
      setTokenCost(prev => +(prev + 0.0024).toFixed(4));
    }, 900);
  };

  return (
    <div className="min-h-screen bg-[#030611] text-cyan-100 flex flex-col font-mono animate-fadeIn">
      
      {/* Return Bar */}
      <div className="bg-gradient-to-r from-red-950 via-zinc-950 to-zinc-950 border-b border-red-500/30 px-4 py-2.5 flex items-center justify-between z-40 sticky top-0 backdrop-blur-md">
        <button
          onClick={() => window.location.href = "https://portfolio-axel-nine.vercel.app"}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-mono font-bold bg-red-600 hover:bg-red-500 text-white shadow-glow-red transition-all active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al Portafolio Maestro</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-cyan-950/60 border border-cyan-500/30 text-cyan-300">
            ● 9 Subagents Online (ElevenLabs Turbo v2)
          </span>
        </div>
      </div>

      {/* Main HUD Header */}
      <header className="border-b border-cyan-500/20 px-6 py-4 flex items-center justify-between max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-400 text-cyan-300 flex items-center justify-center font-bold">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-base font-bold text-white tracking-wider">JARVIS AI COMMAND CENTER</h1>
            <span className="text-[10px] text-cyan-400">Autonomous Neural Mesh & Real-Time Executive HUD</span>
          </div>
        </div>

        <nav className="flex items-center gap-1 bg-black/60 p-1 rounded-2xl border border-cyan-500/30 text-xs">
          {(['hud', 'agents', 'ledger'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded-xl font-bold uppercase transition-all ${
                activeTab === tab ? 'bg-cyan-500 text-black shadow-md' : 'text-zinc-400 hover:text-cyan-200'
              }`}
            >
              {tab === 'hud' ? 'Chief Brain HUD' : tab === 'agents' ? '9-Agent Network' : 'Token Ledger'}
            </button>
          ))}
        </nav>
      </header>

      {/* Main App Body */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        
        {activeTab === 'hud' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Visualizer Frame */}
            <div className="p-6 rounded-3xl bg-black/70 border border-cyan-500/30 relative overflow-hidden space-y-6 shadow-2xl">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-cyan-400 flex items-center gap-2">
                  <Activity className="w-4 h-4 animate-pulse" />
                  <span>ELEVENLABS NEURAL AUDIO STREAM</span>
                </span>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                  state === 'speaking' ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500 animate-pulse' :
                  state === 'listening' ? 'bg-amber-500/20 text-amber-300 border-amber-500' :
                  'bg-zinc-900 text-zinc-500 border-zinc-800'
                }`}>
                  {state.toUpperCase()}
                </span>
              </div>

              {/* Animated Audio Waveform */}
              <div className="h-24 bg-[#050b18] rounded-2xl border border-cyan-500/20 flex items-center justify-center gap-1.5 px-6">
                {[30, 60, 90, 45, 80, 100, 70, 40, 95, 60, 30, 85, 90, 40, 70, 95, 50, 80, 30, 60].map((h, i) => (
                  <div
                    key={i}
                    className={`w-2 rounded-full transition-all duration-150 ${
                      state === 'speaking' ? 'bg-gradient-to-t from-cyan-600 to-cyan-300' :
                      state === 'listening' ? 'bg-amber-400' : 'bg-cyan-950'
                    }`}
                    style={{ height: state === 'speaking' ? `${Math.max(15, (h * Math.random() * 1.3))}%` : '15%' }}
                  />
                ))}
              </div>

              <div className="p-4 rounded-2xl bg-zinc-950/80 border border-cyan-500/30 text-xs leading-relaxed text-zinc-200">
                {hudMessage}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  onClick={() => handleVoiceCommand('Ejecutar auditoría de seguridad en contratos y dependencias')}
                  className="p-3 rounded-xl bg-zinc-900 hover:bg-cyan-950 text-xs text-left border border-zinc-800 hover:border-cyan-500 transition-all text-cyan-200"
                >
                  <span className="font-bold block text-white">Auditar Seguridad</span>
                  <span className="text-[10px] text-zinc-400">Dispatch a Security Bot (Llama 3)</span>
                </button>

                <button
                  onClick={() => handleVoiceCommand('Monitorear nuevos clientes B2B en Ecuador y propuestas')}
                  className="p-3 rounded-xl bg-zinc-900 hover:bg-cyan-950 text-xs text-left border border-zinc-800 hover:border-cyan-500 transition-all text-cyan-200"
                >
                  <span className="font-bold block text-white">Scraping Prospectos B2B</span>
                  <span className="text-[10px] text-zinc-400">Dispatch a Market Bot (DeepSeek)</span>
                </button>

                <button
                  onClick={() => handleVoiceCommand('Calcular coste de tokens y balances por modelo')}
                  className="p-3 rounded-xl bg-zinc-900 hover:bg-cyan-950 text-xs text-left border border-zinc-800 hover:border-cyan-500 transition-all text-cyan-200"
                >
                  <span className="font-bold block text-white">Balance de Finanzas</span>
                  <span className="text-[10px] text-zinc-400">Dispatch a Ledger Bot (Haiku)</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'agents' && (
          <div className="space-y-4 animate-fadeIn">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">9-Agent Autonomous Mesh Status</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {subagents.map(agent => (
                <div key={agent.id} className="p-4 rounded-2xl bg-black/60 border border-cyan-500/20 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-white">{agent.name}</span>
                    <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                      agent.status === 'Active' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'bg-zinc-800 text-zinc-500'
                    }`}>
                      {agent.status}
                    </span>
                  </div>
                  <span className="text-[10px] text-cyan-400 block">{agent.model} ({agent.latency})</span>
                  <p className="text-[11px] text-zinc-400">{agent.task}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'ledger' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between pb-4 border-b border-cyan-500/20">
              <div>
                <h2 className="text-sm font-bold text-white uppercase">Real-Time Model Spend Audit</h2>
                <p className="text-xs text-zinc-400">Aggregated API ledger across OpenAI, Anthropic & ElevenLabs.</p>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-zinc-400 block">Total Month Spend</span>
                <span className="text-xl font-bold text-cyan-400">${tokenCost} USD</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-black/60 border border-zinc-800">
                <span className="text-zinc-400 block">Claude 3.5 Sonnet</span>
                <span className="text-base font-bold text-white mt-1 block">$8.42 (56.8%)</span>
              </div>
              <div className="p-4 rounded-xl bg-black/60 border border-zinc-800">
                <span className="text-zinc-400 block">GPT-4o & Mini</span>
                <span className="text-base font-bold text-white mt-1 block">$4.10 (27.6%)</span>
              </div>
              <div className="p-4 rounded-xl bg-black/60 border border-zinc-800">
                <span className="text-zinc-400 block">ElevenLabs Neural Voice</span>
                <span className="text-base font-bold text-white mt-1 block">$2.30 (15.6%)</span>
              </div>
            </div>
          </div>
        )}

      </main>

    </div>
  );
};

export default App;
