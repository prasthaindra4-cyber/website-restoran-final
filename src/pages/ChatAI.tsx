import { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, Sparkles, AlertCircle, Plus, Volume2, Mic, MicOff, StopCircle, Download, Copy, Trash2, Search, Compass, BookOpen, FolderOpen, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { GoogleGenAI } from '@google/genai';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';

const ai = apiKey
  ? new GoogleGenAI({
      apiKey,
    })
  : null;

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

const getFallbackReply = (input: string): string => {
  const text = input.toLowerCase();

  if (text.includes('makanan') || text.includes('enak') || text.includes('rekomendasi')) {
    return 'Rekomendasi favorit kami saat ini adalah Ayam Bakar Prasmar, Nasi Goreng Kambing, dan Soto Lamongan. Kalau kamu suka rasa pedas, coba sambal kesukaan kami yang dibuat dari cabai lokal segar.';
  }

  if (text.includes('minuman') || text.includes('drink') || text.includes('teh') || text.includes('jus')) {
    return 'Untuk minuman, paling cocok adalah Es Teh Melati, Es Jeruk Segar, dan Es Cendol Prasmar. Kalau kamu suka yang lebih hangat, roti bakar dengan teh tarik juga sangat cocok.';
  }

  if (text.includes('spesial') || text.includes('hari ini') || text.includes('promo')) {
    return 'Menu spesial hari ini adalah Ayam Bakar Spesial + Nasi + Sambal dan Es Jeruk Segar. Biasanya paling populer karena rasa yang seimbang dan cocok untuk semua kalangan.';
  }

  if (text.includes('harga') || text.includes('murah') || text.includes('terlengkap')) {
    return 'Harga menu kami mulai dari Rp 10.000 sampai dengan Rp 65.000, tergantung jenis makanan dan minuman. Kami juga punya paket combo yang lebih hemat untuk keluarga.';
  }

  if (text.includes('lokasi') || text.includes('alamat')) {
    return 'Kedai Prasmar berada di Jl. Talas V No.153, Pondok Cabe Ilir. Buka setiap hari dari 10.00 sampai 23.00 WIB.';
  }

  if (text.includes('buka') || text.includes('jam')) {
    return 'Kedai kami buka setiap hari pukul 10.00 - 23.00 WIB.';
  }

  return 'Saya bisa membantu merekomendasikan menu favorit, minuman, promo hari ini, atau jam operasional Kedai Prasmar. Kalau mau, saya bisa bantu pilih menu sesuai selera kamu.';
};

export function ChatContent() {
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
  const [activeView, setActiveView] = useState<'chat' | 'explore' | 'library' | 'work'>('chat');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // --- Voice / TTS states and helpers ---
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [autoPlay, setAutoPlay] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoiceIdx, setSelectedVoiceIdx] = useState<number | null>(null);
  
  // Presentation helpers
  const [conciseMode, setConciseMode] = useState(false); // when true, ask AI to be brief

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

      // Split into sentences to add natural pauses and slight variation
      const sentences = (text || '').match(/[^.!?]+[.!?]*\\s*/g) || [text];

      // choose voice
      const selectedVoice = voices && voices[selectedVoiceIdx ?? -1] ? voices[selectedVoiceIdx ?? 0] : null;
      const voiceToUse = selectedVoice || voices.find((v) => v.lang.toLowerCase().startsWith('id')) || voices[0] || null;

      let idx = 0;
      const speakNext = () => {
        if (idx >= sentences.length) return;
        const s = sentences[idx].trim();
        if (!s) { idx++; speakNext(); return; }

        const utter = new SpeechSynthesisUtterance(s);
        utter.lang = 'id-ID';
        if (voiceToUse) utter.voice = voiceToUse;

        // small randomization to make speech feel less robotic
        utter.rate = 0.95 + Math.random() * 0.12; // ~0.95-1.07
        utter.pitch = 0.98 + Math.random() * 0.12; // ~0.98-1.10
        utter.volume = 1;

        utter.onend = () => {
          // slight pause before next sentence
          idx++;
          setTimeout(speakNext, 140 + Math.random() * 140);
        };

        // speak current sentence
        try { window.speechSynthesis.speak(utter); } catch (e) { console.warn('TTS speak error', e); }
      };

      speakNext();
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

 const handleSend = async (e: React.SyntheticEvent | null, text?: string) => {
   if (e) e.preventDefault();

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

   if (!apiKey || !ai) {
     const fallbackText = getFallbackReply(messageText);
     setMessages((prev) => [
       ...prev,
       {
         id: Date.now().toString(),
         type: 'ai',
         text: `Saya sedang dalam mode offline / fallback. ${fallbackText}`,
       },
     ]);
     setIsTyping(false);
     return;
   }

   try {
     const systemPrompt = `Kamu adalah Asisten AI Kedai Prasmar yang ramah dan profesional.\n\nTUGAS UTAMA:\n- Membantu pelanggan tentang menu makanan, minuman, dan cemilan\n- Memberikan rekomendasi berdasarkan preferensi pelanggan\n- Menjawab pertanyaan tentang Kedai Prasmar\n- Membantu proses pemesanan dengan ramah\n\nATURAN PERCAKAPAN:\n1. Selalu jawab dalam Bahasa Indonesia yang natural dan ramah\n2. Pahami bahasa informal, singkatan, dan typo\n3. Jangan kaku - gunakan bahasa sehari-hari\n4. Jika pengguna bertanya tentang menu, berikan rekomendasi yang spesifik\n5. Arahkan ke menu/pemesanan jika ada pertanyaan di luar topik\n\nGAYA KOMUNIKASI:\n- Ramah dan membantu\n- Singkat tapi jelas\n- Gunakan emoji jika sesuai\n- Berikan rekomendasi spesifik, bukan jawaban umum`;

     const messagesForApi: any[] = [
       { role: 'system', content: systemPrompt }
     ];

     if (conciseMode) {
       messagesForApi.push({ role: 'system', content: 'Jadikan jawaban sangat singkat dan to the point (1-2 kalimat). Gunakan bahasa yang mudah dipahami.' });
     }

     messagesForApi.push({ role: 'user', content: messageText });

     const response = await ai!.models.generateContent({
     model: 'gemini-3.6-flash',
     contents: [
    {
      role: 'user',
      parts: [
        {
          text: `${systemPrompt}\n\n${conciseMode ? 'Jadikan jawaban sangat singkat dan to the point (1-2 kalimat).' : ''}\n\nPertanyaan pelanggan: ${messageText}`,
        },
      ],
    },
  ],
});

const responseText =
  response.text ||
  'Maaf, tidak ada respons dari AI. Saya bisa bantu dengan rekomendasi menu, lokasi, jam buka, dan promo hari ini.';

     setMessages((prev) => [
       ...prev,
       {
         id: Date.now().toString(),
         type: 'ai',
         text: responseText,
       },
     ]);

      if (autoPlay && voiceEnabled) {
        speakText(responseText);
      }
    } catch (error) {
      console.error('Gemini API Error:', error);
     const fallbackText = getFallbackReply(messageText);
     setMessages((prev) => [
       ...prev,
       {
         id: Date.now().toString(),
         type: 'ai',
         text: `Maaf, ada gangguan koneksi AI. Saya tetap bisa bantu: ${fallbackText}`,
       },
     ]);
   } finally {
     setIsTyping(false);
   }
 };

  const exploreCards = [
    { title: 'Chef Picks', desc: 'Ayam Bakar Prasmar, Nasi Goreng Kambing, Soto Lamongan', tag: 'Favorit', prompt: 'Rekomendasi menu favorit di Kedai Prasmar untuk saya yang suka makanan enak dan cocok untuk keluarga.' },
    { title: 'Minuman Segar', desc: 'Es Teh Melati, Es Jeruk, Cendol Prasmar', tag: 'Ramah', prompt: 'Rekomendasi minuman paling ramah dan segar di Kedai Prasmar untuk siang hari.' },
    { title: 'Promo Hari Ini', desc: 'Combo keluarga dan paket hemat', tag: 'Hemat', prompt: 'Ada promo hemat atau combo keluarga yang cocok untuk saya hari ini?' },
  ];

  const libraryItems = [
    { title: 'Menu utama', prompt: 'Tampilkan menu utama yang paling populer di Kedai Prasmar.' },
    { title: 'Menu keluarga', prompt: 'Ada menu keluarga yang cocok untuk makan bersama? Beri rekomendasi dan harganya.' },
    { title: 'Minuman dingin', prompt: 'Rekomendasi minuman dingin terbaik beserta harga yang cocok untuk cuaca panas.' },
    { title: 'Cemilan favorit', prompt: 'Cemilan favorit apa yang paling enak di Kedai Prasmar untuk nongkrong?' },
    { title: 'Promo spesial', prompt: 'Apakah ada promo spesial hari ini yang paling hemat?' },
  ];

  const workCards = [
    { title: 'Booking', desc: 'Reservasi meja untuk keluarga / grup', value: '12 meja', prompt: 'Bantu saya booking meja untuk keluarga di Kedai Prasmar.' },
    { title: 'Pesanan', desc: 'Order aktif hari ini', value: '8 pesanan', prompt: 'Ada order aktif hari ini? Cek status pesanan yang paling sering dipesan.' },
    { title: 'Menu Baru', desc: 'Update menu favorit & rekomendasi', value: '2 update', prompt: 'Menu baru apa yang sedang populer di Kedai Prasmar dan rekomendasi paling cocok?' },
    { title: 'Status', desc: 'Kedai sedang buka & siap melayani', value: 'Online', prompt: 'Cek status kedai saat ini apakah masih buka dan siap melayani pelanggan.' },
  ];

  const renderText = (text: string) => {
    return text.split('\n').map((line, i) => (
      <span key={i}>
        {line}
        {i !== text.split('\n').length - 1 && <br />}
      </span>
    ));
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[radial-gradient(circle_at_top_left,_rgba(191,219,254,0.18),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(167,243,208,0.14),_transparent_30%),#111827] px-3 py-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[920px] overflow-hidden rounded-[32px] border border-white/10 bg-[#1a1e24]/90 shadow-[0_28px_70px_rgba(0,0,0,0.45)] backdrop-blur-xl">
        <div className="flex min-h-[78vh] flex-col lg:flex-row">
          <aside className="w-full border-b border-white/10 bg-[#1d232b]/90 p-5 lg:w-[290px] lg:border-b-0 lg:border-r">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-white">
                  <Sparkles size={18} />
                </div>
                <div>
                  <div className="text-lg font-semibold text-white">Chat</div>
                </div>
              </div>
              <button className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-xs text-white/70">AI</button>
            </div>

            <div className="mb-5 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-3 py-3 text-white/70">
              <Search size={18} className="text-white/60" />
              <span className="text-sm">Search</span>
            </div>

            <div className="space-y-3">
              {[
                { label: 'Chat', value: 'chat' },
                { label: 'Explore', value: 'explore' },
                { label: 'Library', value: 'library' },
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={() => setActiveView(item.value as 'chat' | 'explore' | 'library' | 'work')}
                  className={`flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left text-base font-medium transition ${
                    activeView === item.value ? 'bg-white/10 text-white' : 'text-white/70 hover:bg-white/5'
                  }`}
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5">
                    {item.label === 'Chat' ? <Bot size={16} /> : item.label === 'Explore' ? <Compass size={16} /> : <BookOpen size={16} />}
                  </span>
                  {item.label}
                </button>
              ))}
            </div>

            <div className="mt-8 space-y-3">
              <div className="text-sm text-white/45">Projects</div>
              <button
                onClick={() => setActiveView('work')}
                className={`flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left text-base font-medium transition ${
                  activeView === 'work' ? 'bg-white/10 text-white' : 'text-white/70 hover:bg-white/5'
                }`}
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5"><FolderOpen size={16} /></span>
                Work
              </button>
            </div>
          </aside>

          <main className="flex flex-1 flex-col bg-[#1a1e24]">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <div className="flex items-center gap-3 text-white">
                <button className="rounded-full border border-white/10 bg-white/5 p-2 text-white/80">
                  <Bot size={16} />
                </button>
                <div className="text-xl font-semibold">Chat</div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setVoiceEnabled((prev) => !prev)}
                  className={`rounded-full border px-2 py-1 text-xs ${voiceEnabled ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-200' : 'border-white/10 bg-white/5 text-white/80'}`}
                >
                  {voiceEnabled ? 'Voice ON' : 'Voice'}
                </button>
                <button
                  onClick={() => setAutoPlay((prev) => !prev)}
                  className={`rounded-full border px-2 py-1 text-xs ${autoPlay ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-200' : 'border-white/10 bg-white/5 text-white/80'}`}
                >
                  {autoPlay ? 'Auto ON' : 'Auto'}
                </button>
                <button onClick={() => setConciseMode(!conciseMode)} className={`rounded-full border px-2 py-1 text-xs ${conciseMode ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-200' : 'border-white/10 bg-white/5 text-white/80'}`}>
                  {conciseMode ? 'Singkat' : 'Normal'}
                </button>
                <button onClick={() => {
                  setMessages([{ id: '1', type: 'ai', text: 'Halo! 👋 Saya Asisten AI Kedai Prasmar. Siap membantu Anda menemukan menu favorit, mendapatkan rekomendasi, atau memproses pesanan. Ada yang bisa saya bantu?' }]);
                  setShowSuggestions(true);
                }} className="rounded-full border border-white/10 bg-white/5 p-2 text-white/80" title="Bersihkan percakapan">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>

            {activeView === 'chat' && (
              <>
                <div className="flex-1 space-y-4 overflow-y-auto bg-[#1b1f25] p-5">
                  {!apiKey && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-3 text-sm text-amber-100">
                      <div className="mb-1 flex items-center gap-2 font-semibold"><AlertCircle size={16} /> Setup API</div>
                      <code className="mt-1 block rounded-md bg-black/20 px-2 py-1 font-mono text-[11px]">VITE_GEMINI_API_KEY=api_key_anda</code>
                    </motion.div>
                  )}

                  {messages.map((msg) => (
                    <motion.div key={msg.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[82%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${msg.type === 'user' ? 'bg-white/10 text-white' : 'bg-white/5 text-white/90'}`}>
                        {renderText(msg.text)}
                        {msg.type === 'ai' && (
                          <div className="mt-3 flex items-center gap-2">
                            <button onClick={() => speakText(msg.text)} className="rounded-full border border-white/10 bg-white/5 p-2 text-white/80" type="button" aria-label="Play voice">
                              <Volume2 size={14} />
                            </button>
                            <button onClick={async () => { try { await navigator.clipboard.writeText(msg.text); } catch (e) { console.warn('Copy failed', e); } }} className="rounded-full border border-white/10 bg-white/5 p-2 text-white/80" type="button" aria-label="Copy text">
                              <Copy size={14} />
                            </button>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}

                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="flex items-center gap-2 rounded-2xl bg-white/5 px-4 py-3">
                        <div className="h-2 w-2 rounded-full bg-white/70 animate-bounce" />
                        <div className="h-2 w-2 rounded-full bg-white/70 animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="h-2 w-2 rounded-full bg-white/70 animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  )}

                  {showSuggestions && messages.length === 1 && (
                    <div className="mt-2 space-y-3">
                      <div className="text-xs uppercase tracking-[0.2em] text-white/40">Suggestions</div>
                      <div className="grid gap-2 sm:grid-cols-2">
                        {suggestedQuestions.map((q, idx) => (
                          <button key={idx} onClick={(e) => handleSend(e, q)} className="rounded-2xl border border-white/10 bg-white/5 px-3 py-3 text-left text-sm text-white/80 hover:bg-white/10">
                            {q}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                <div className="border-t border-white/10 bg-[#171c22] p-4">
                  <div className="flex items-center gap-3 rounded-[26px] border border-white/10 bg-[#0f1419] p-3">
                    <button type="button" onClick={() => (isRecognizing ? stopRecognition() : startRecognition())} className={`flex h-12 w-12 items-center justify-center rounded-full border ${isRecognizing ? 'border-amber-400/50 bg-amber-500/10 text-amber-200' : 'border-white/10 bg-white/5 text-white/70'}`}>
                      {isRecognizing ? <MicOff size={18} /> : <Mic size={18} />}
                    </button>

                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Ask anything"
                      className="flex-1 bg-transparent text-base text-white placeholder:text-white/35 focus:outline-none"
                    />

                    <button type="button" onClick={() => (isRecording ? stopRecording() : startRecording())} className={`flex h-12 w-12 items-center justify-center rounded-full border ${isRecording ? 'border-red-400/50 bg-red-500/10 text-red-200' : 'border-white/10 bg-white/5 text-white/70'}`}>
                      {isRecording ? <StopCircle size={18} /> : <Plus size={18} />}
                    </button>

                    <motion.button
                      type="button"
                      onClick={(e) => handleSend(e)}
                      disabled={!input.trim() || isTyping}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-slate-900 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <Send size={18} />
                    </motion.button>
                  </div>

                  {recordedAudioUrl && (
                    <div className="mt-3 flex justify-end">
                      <a href={recordedAudioUrl} download={`voice-note-${Date.now()}.webm`} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80">
                        <Download size={14} /> Simpan Rekaman
                      </a>
                    </div>
                  )}
                </div>
              </>
            )}

            {activeView === 'explore' && (
              <div className="flex-1 overflow-y-auto bg-[#1b1f25] p-5">
                <div className="mb-4 flex items-center justify-between">
                  <div className="text-lg font-semibold text-white">Explore</div>
                  <div className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-emerald-200">
                    Trending
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {exploreCards.map((card) => (
                    <button
                      key={card.title}
                      onClick={() => {
                        setActiveView('chat');
                        handleSend(null, card.prompt);
                      }}
                      className="rounded-2xl border border-white/10 bg-white/5 p-4 text-left text-white/90 transition hover:bg-white/10"
                    >
                      <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-emerald-300">
                        <Star size={12} className="fill-current" /> {card.tag}
                      </div>
                      <div className="mb-2 text-lg font-semibold">{card.title}</div>
                      <p className="text-sm text-white/70">{card.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {activeView === 'library' && (
              <div className="flex-1 overflow-y-auto bg-[#1b1f25] p-5">
                <div className="mb-4 text-lg font-semibold text-white">Library</div>
                <div className="space-y-3">
                  {libraryItems.map((item) => (
                    <button
                      key={item.title}
                      onClick={() => {
                        setActiveView('chat');
                        handleSend(null, item.prompt);
                      }}
                      className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left text-white/80 hover:bg-white/10"
                    >
                      <span>{item.title}</span>
                      <span className="text-emerald-300">›</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {activeView === 'work' && (
              <div className="flex-1 overflow-y-auto bg-[#1b1f25] p-5">
                <div className="mb-4 text-lg font-semibold text-white">Work</div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {workCards.map((card) => (
                    <button
                      key={card.title}
                      onClick={() => {
                        setActiveView('chat');
                        handleSend(null, card.prompt);
                      }}
                      className="rounded-2xl border border-white/10 bg-white/5 p-4 text-left text-white/90 transition hover:bg-white/10"
                    >
                      <div className="mb-2 text-xs uppercase tracking-[0.2em] text-amber-300">{card.value}</div>
                      <div className="mb-2 text-lg font-semibold">{card.title}</div>
                      <p className="text-sm text-white/70">{card.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default function ChatAI() {
  return <ChatContent />;
}
