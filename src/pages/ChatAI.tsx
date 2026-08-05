import { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, Sparkles, AlertCircle, Plus, Volume2, Mic, MicOff, StopCircle, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import Groq from 'groq-sdk';

const apiKey = import.meta.env.VITE_GROQ_API_KEY;

const ai = new Groq({
  apiKey: apiKey,
  dangerouslyAllowBrowser: true,
});

type Message = {
  id: string;
  type: 'user' | 'ai';
  text: string;
};

const suggestedQuestions = [
  "Menu makanan apa yang paling enak?",
  "Rekomendasi minuman terbaik anda",
  "Ada makanan spesial hari ini?",
  "Berapa harga menu terlengkap?"
];

export default function ChatAI() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      text: 'Halo! 👋 Saya Asisten AI Kedai Prasmar. Siap membantu Anda menemukan menu favorit, mendapatkan rekomendasi, atau memproses pesanan. Ada yang bisa saya bantu?',
    },
  ]);

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // --- Voice / TTS states and helpers ---
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [autoPlay, setAutoPlay] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoiceIdx, setSelectedVoiceIdx] = useState<number | null>(null);

  // --- Speech-to-text & Recording states ---
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [recordedAudioUrl, setRecordedAudioUrl] = useState<string | null>(null);
  const [isRecognizing, setIsRecognizing] = useState(false);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // load available voices
    const findDefaultVoiceIndex = (voiceList: SpeechSynthesisVoice[]) => {
      const idVoiceIndex = voiceList.findIndex((voice) => voice.lang.toLowerCase().startsWith('id'));
      if (idVoiceIndex !== -1) return idVoiceIndex;
      const naturalVoiceIndex = voiceList.findIndex((voice) => /google|microsoft|wave|natural/i.test(voice.name));
      return naturalVoiceIndex !== -1 ? naturalVoiceIndex : 0;
    };

    const loadVoices = () => {
      const v = window.speechSynthesis.getVoices();
      setVoices(v);
      if (v.length && selectedVoiceIdx === null) setSelectedVoiceIdx(findDefaultVoiceIndex(v));
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    // initialize SpeechRecognition if available
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const r = new SpeechRecognition();
      r.lang = 'id-ID';
      r.interimResults = true;
      r.continuous = false;

      r.onresult = (ev: any) => {
        let interim = '';
        let finalText = '';
        for (let i = ev.resultIndex; i < ev.results.length; i++) {
          const res = ev.results[i];
          if (res.isFinal) finalText += res[0].transcript;
          else interim += res[0].transcript;
        }
        // show interim results, commit final results to input
        if (finalText) {
          setInput((prev) => (prev ? prev + ' ' + finalText : finalText));
        } else {
          // show interim (replace current input visually)
          setInput(interim);
        }
      };

      r.onend = () => {
        setIsRecognizing(false);
      };

      recognitionRef.current = r;
    }

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
      if (recognitionRef.current) {
        try { recognitionRef.current.onresult = null; recognitionRef.current.onend = null; } catch {};
      }
    };
  }, []);

  const speakText = (text: string) => {
    if (!voiceEnabled || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = 'id-ID';

      const selectedVoice = voices && voices[selectedVoiceIdx ?? -1] ? voices[selectedVoiceIdx ?? 0] : null;
      if (selectedVoice) {
        utter.voice = selectedVoice;
      } else if (voices.length) {
        const idVoice = voices.find((voice) => voice.lang.toLowerCase().startsWith('id'));
        utter.voice = idVoice ?? voices[0];
      }

      utter.rate = 0.95;
      utter.pitch = 1.05;
      utter.volume = 1;
      window.speechSynthesis.speak(utter);
    } catch (e) {
      console.warn('TTS not available', e);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Start/stop speech recognition
  const startRecognition = () => {
    const r = recognitionRef.current;
    if (!r) {
      alert('SpeechRecognition tidak tersedia di browser ini.');
      return;
    }
    try {
      r.start();
      setIsRecognizing(true);
    } catch (e) {
      console.warn('Recognition start error', e);
    }
  };

  const stopRecognition = () => {
    const r = recognitionRef.current;
    if (r) {
      try { r.stop(); } catch {};
      setIsRecognizing(false);
    }
  };

  // Recording (MediaRecorder) helpers
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mr = new MediaRecorder(stream);
      const chunks: BlobPart[] = [];
      mr.ondataavailable = (e) => chunks.push(e.data);
      mr.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm' });
        if (recordedAudioUrl) URL.revokeObjectURL(recordedAudioUrl);
        const url = URL.createObjectURL(blob);
        setRecordedAudioUrl(url);
        // stop tracks
        try { stream.getTracks().forEach(t => t.stop()); } catch {}
      };
      mediaRecorderRef.current = mr;
      mr.start();
      setIsRecording(true);
    } catch (err) {
      console.error('Recording error', err);
      alert('Tidak dapat mengakses mikrofon. Periksa izin browser.');
    }
  };

  const stopRecording = () => {
    try {
      mediaRecorderRef.current?.stop();
    } catch (e) {
      console.warn('Stop recording error', e);
    }
    setIsRecording(false);
  };

  const handleSend = async (e: React.FormEvent, text?: string) => {
    e.preventDefault();

    const messageText = text || input.trim();
    if (!messageText) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      type: 'user',
      text: messageText,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setShowSuggestions(false);
    setIsTyping(true);

    if (!apiKey) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          type: 'ai',
          text: '⚠️ API Key Groq belum dipasang. Silakan buat file .env dan tambahkan: VITE_GROQ_API_KEY=api_key_anda',
        },
      ]);
      setIsTyping(false);
      return;
    }

    try {
      const response = await ai.chat.completions.create({
        model: 'llama-3.3-70b-versatile',
        messages: [
          {
            role: 'system',
            content: `Kamu adalah Asisten AI Kedai Prasmar yang ramah dan profesional.

TUGAS UTAMA:
- Membantu pelanggan tentang menu makanan, minuman, dan cemilan
- Memberikan rekomendasi berdasarkan preferensi pelanggan
- Menjawab pertanyaan tentang Kedai Prasmar
- Membantu proses pemesanan dengan ramah

ATURAN PERCAKAPAN:
1. Selalu jawab dalam Bahasa Indonesia yang natural dan ramah
2. Pahami bahasa informal, singkatan, dan typo
3. Jangan kaku - gunakan bahasa sehari-hari
4. Jika pengguna bertanya tentang menu, berikan rekomendasi yang spesifik
5. Arahkan ke menu/pemesanan jika ada pertanyaan di luar topik

GAYA KOMUNIKASI:
- Ramah dan membantu
- Singkat tapi jelas
- Gunakan emoji jika sesuai
- Berikan rekomendasi spesifik, bukan jawaban umum`,
          },
          {
            role: 'user',
            content: messageText,
          },
        ],
      });

      const responseText = response.choices[0]?.message?.content || 'Maaf, tidak ada respons dari AI.';

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          type: 'ai',
          text: responseText,
        },
      ]);

      // Auto-play voice if enabled
      if (autoPlay && voiceEnabled) {
        speakText(responseText);
      }
    } catch (error) {
      console.error('Groq API Error:', error);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          type: 'ai',
          text: 'Maaf, terjadi kesalahan. Silakan coba lagi dalam beberapa saat.',
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const renderText = (text: string) => {
    return text.split('\n').map((line, i) => (
      <span key={i}>
        {line}
        {i !== text.split('\n').length - 1 && <br />}
      </span>
    ));
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gradient-to-b from-stone-900 via-stone-800 to-stone-900 py-6 px-4 sm:px-6 lg:px-8">
      {/* Decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div 
          className="absolute top-20 left-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"
          animate={{ y: [0, 40, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-20 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl"
          animate={{ y: [0, -40, 0], scale: [1.1, 1, 1.1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      <div className="max-w-3xl mx-auto h-[80vh] flex flex-col bg-stone-800/50 backdrop-blur-lg rounded-2xl shadow-2xl border border-stone-700/50 overflow-hidden relative z-10">
        
        {/* Header - Cleaner Design */}
        <div className="bg-white/5 backdrop-blur-sm px-6 py-4 flex items-center justify-between gap-4 shadow-md border border-stone-700/30">
          <div className="flex items-center gap-3">
            <motion.div className="w-11 h-11 bg-emerald-600/20 rounded-lg flex items-center justify-center" whileHover={{ scale: 1.05 }}>
              <Bot size={20} className="text-emerald-200" />
            </motion.div>
            <div>
              <h2 className="font-bold text-white text-lg">Asisten AI</h2>
              <p className="text-emerald-200 text-xs">Kedai Prasmar — Online</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 bg-stone-700/30 rounded-md px-2 py-1">
              <label className="flex items-center gap-2 text-sm text-emerald-100">
                <input type="checkbox" checked={voiceEnabled} onChange={() => setVoiceEnabled(!voiceEnabled)} className="accent-emerald-400" />
                <span className="hidden md:inline">Suara</span>
              </label>

              <select value={selectedVoiceIdx ?? 0} onChange={(e) => setSelectedVoiceIdx(Number(e.target.value))} className="bg-transparent text-sm text-white rounded-md px-2 py-1 outline-none">
                {voices.map((v, idx) => (
                  <option key={v.name + idx} value={idx} className="text-black">{v.name} {v.lang ? `(${v.lang})` : ''}</option>
                ))}
              </select>

              <button onClick={() => setAutoPlay(!autoPlay)} className={`text-xs px-2 py-1 rounded-md ${autoPlay ? 'bg-emerald-500 text-white' : 'bg-stone-700/40 text-stone-200'}`}>
                {autoPlay ? 'Auto' : 'Auto'}
              </button>
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-stone-800/30">
          
          {!apiKey && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-amber-500/20 border border-amber-500/50 rounded-lg p-4 flex items-start space-x-3 backdrop-blur-sm"
            >
              <AlertCircle className="text-amber-400 shrink-0 mt-0.5" size={20} />
              <div className="text-sm text-amber-100">
                <p className="font-bold mb-1">Setup Diperlukan</p>
                <p>Buat file .env dengan: <code className="bg-stone-700/50 px-2 py-1 rounded mt-1 block font-mono">VITE_GROQ_API_KEY=api_key_anda</code></p>
              </div>
            </motion.div>
          )}

          {messages.map((msg) => (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={msg.id}
              className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex max-w-[85%] ${msg.type === 'user' ? 'flex-row-reverse' : 'flex-row'} gap-2`}>
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-1 ${
                  msg.type === 'user'
                    ? 'bg-emerald-600/30 border border-emerald-500/50 text-emerald-300'
                    : 'bg-amber-600/30 border border-amber-500/50 text-amber-300'
                }`}>
                  {msg.type === 'user' ? <User size={16} /> : <Bot size={16} />}
                </div>

                <div className={`px-5 py-3 rounded-2xl text-sm md:text-base leading-relaxed backdrop-blur-sm shadow-sm ${msg.type === 'user' ? 'bg-gradient-to-r from-emerald-500/60 to-emerald-600/50 text-white border-none rounded-br-2xl' : 'bg-gradient-to-r from-stone-700/60 to-stone-800/60 text-stone-100 border border-stone-600/30 rounded-bl-2xl'}`}>
                  {renderText(msg.text)}

                  {/* If AI message, show TTS controls */}
                  {msg.type === 'ai' && (
                    <div className="flex items-center gap-2 mt-3 text-xs text-stone-300">
                      <button
                        onClick={() => speakText(msg.text)}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-stone-800/40 hover:bg-stone-700/40 transition"
                        aria-label="Play voice"
                        type="button"
                      >
                        <Volume2 size={14} /> Putar Suara
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}

          {isTyping && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="flex gap-2">
                <div className="w-8 h-8 rounded-full bg-amber-600/30 border border-amber-500/50 text-amber-300 flex items-center justify-center mt-1">
                  <Bot size={16} />
                </div>
                <div className="px-4 py-3 rounded-xl bg-stone-700/40 border border-stone-600/30 flex items-center space-x-2">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </motion.div>
          )}

          {showSuggestions && messages.length === 1 && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 space-y-2"
            >
              <p className="text-stone-400 text-xs font-semibold uppercase tracking-wide mb-3">Pertanyaan Umum:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {suggestedQuestions.map((q, idx) => (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.02, backgroundColor: 'rgba(16, 185, 129, 0.3)' }}
                    onClick={(e) => handleSend(e, q)}
                    className="text-left px-4 py-2 rounded-lg bg-emerald-600/20 border border-emerald-500/30 text-emerald-100 text-sm hover:bg-emerald-600/30 transition-all"
                  >
                    {q}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-stone-800/50 border-t border-stone-700/50 backdrop-blur-sm">
          <form onSubmit={handleSend} className="flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Tanya tentang menu atau pemesanan..."
              className="flex-1 bg-stone-700/50 border border-stone-600/50 rounded-full px-5 py-3 text-white text-sm placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-stone-700"
            />

            <div className="flex items-center gap-2">
              {/* Speech-to-text (start/stop) */}
              <button
                type="button"
                onClick={() => (isRecognizing ? stopRecognition() : startRecognition())}
                title={isRecognizing ? 'Stop listening' : 'Speak to type'}
                className={`w-10 h-10 rounded-full flex items-center justify-center ${isRecognizing ? 'bg-amber-600 text-white' : 'bg-stone-700/40 text-stone-200'} border border-stone-600/30`}
              >
                {isRecognizing ? <MicOff size={16} /> : <Mic size={16} />}
              </button>

              {/* Recording (voice-note) */}
              <button
                type="button"
                onClick={() => (isRecording ? stopRecording() : startRecording())}
                title={isRecording ? 'Stop recording' : 'Record voice note'}
                className={`w-10 h-10 rounded-full flex items-center justify-center ${isRecording ? 'bg-red-600 text-white' : 'bg-stone-700/40 text-stone-200'} border border-stone-600/30`}
              >
                {isRecording ? <StopCircle size={16} /> : <Plus size={16} />}
              </button>

              {recordedAudioUrl && (
                <a href={recordedAudioUrl} download={`voice-note-${Date.now()}.webm`} className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-stone-700/40 text-sm text-white border border-stone-600/30">
                  <Download size={14} /> Simpan
                </a>
              )}
            </div>

            <motion.button
              type="submit"
              disabled={!input.trim() || isTyping}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-11 h-11 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg"
            >
              <Send size={18} />
            </motion.button>
          </form>
        </div>
      </div>
    </div>
  );
}