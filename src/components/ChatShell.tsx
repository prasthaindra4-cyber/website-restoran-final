import React, { useEffect, useState } from 'react';
import { X, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatContent } from '../pages/ChatAI';

export default function ChatShell() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [widgetOpen, setWidgetOpen] = useState(true);

  useEffect(() => {
    const onOpen = () => setDrawerOpen(true);
    window.addEventListener('open-chat-drawer', onOpen as any);
    return () => window.removeEventListener('open-chat-drawer', onOpen as any);
  }, []);

  return (
    <>
      <div className="hidden md:block fixed inset-0 pointer-events-none z-40">
        <div className="absolute right-10 top-28 pointer-events-auto w-[min(78vw,760px)]">
          <div className="rounded-[28px] bg-[#171c22]/90 border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.4)] backdrop-blur-xl overflow-hidden">
            <ChatContent />
          </div>
        </div>
      </div>

      <div className="fixed right-5 bottom-5 z-50 md:hidden pointer-events-auto">
        <div className="flex items-end flex-col gap-3">
          <AnimatePresence>
            {widgetOpen && (
              <motion.div initial={{ opacity: 0, y: 12, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12, scale: 0.96 }} className="w-[min(88vw,340px)] rounded-[28px] bg-[#171c22]/90 border border-white/10 shadow-[0_28px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-[#1d232b]">
                  <div className="flex items-center gap-2 text-sm text-white font-semibold"><MessageSquare size={16} /> Asisten</div>
                  <button onClick={() => setWidgetOpen(false)} className="p-1.5 rounded-md bg-white/5 text-white/80"><X size={16} /></button>
                </div>
                <div className="max-h-[72vh] overflow-auto">
                  <ChatContent />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <button onClick={() => setWidgetOpen((s) => !s)} className="w-14 h-14 rounded-full bg-[#1d232b] border border-white/10 text-white shadow-[0_18px_40px_rgba(0,0,0,0.35)]">
            <MessageSquare className="mx-auto" size={20} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setDrawerOpen(false)} className="fixed inset-0 bg-black/45 z-40 md:hidden" />
            <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} className="fixed bottom-0 left-0 right-0 h-[84vh] bg-[#171c22]/95 z-50 rounded-t-[28px] border-t border-white/10 overflow-hidden md:hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-[#1d232b]">
                <div className="text-white font-semibold">Asisten AI</div>
                <button onClick={() => setDrawerOpen(false)} className="p-2 rounded-md bg-white/5 text-white/80"><X size={18} /></button>
              </div>
              <div className="h-[calc(100%-60px)] overflow-auto">
                <ChatContent />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
