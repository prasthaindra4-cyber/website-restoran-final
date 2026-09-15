import { motion } from 'framer-motion';

export default function LoadingScreen() {


  return (
    <motion.div 
      className="fixed inset-0 z-[100] bg-emerald-900 flex flex-col items-center justify-center"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -50, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }}
    >
      <div className="relative">
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-full flex items-center justify-center shadow-2xl shadow-emerald-900/50 border border-emerald-300/30"
        >
          <span className="text-white font-serif font-bold text-4xl">
            KP
          </span>
        </motion.div>

        {/* Decorative leaves */}
        <motion.div 
          animate={{ y: [0, -10, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-4 -right-4 text-emerald-300"
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22L6.66 19.7C7.14 19.87 7.64 20 8 20C19 20 22 3 22 3C21 5 14 5.25 9 6.25C4 7.25 2 11.5 2 13.5C2 15.5 3.75 17.25 3.75 17.25C7 8 17 8 17 8Z"/>
          </svg>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8 text-center"
      >
        <h1 className="text-3xl font-serif text-white tracking-widest mb-2">
          KEDAI PRASMAR
        </h1>

        <div className="h-1 w-48 bg-emerald-800 rounded-full overflow-hidden mx-auto">
          <motion.div 
            className="h-full bg-emerald-400"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{
              duration: 1.5,
              ease: "easeInOut"
            }}
          />
        </div>

        <p className="text-emerald-300/80 mt-4 text-sm uppercase tracking-[0.2em]">
          Menyiapkan Cita Rasa Alam...
        </p>
      </motion.div>
    </motion.div>
  );
}