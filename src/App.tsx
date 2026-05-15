import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "motion/react";
import { Camera, Image as ImageIcon, Smartphone, Zap, CheckCircle2, ChevronRight, Menu, X, Instagram, Facebook, Mail, Sun, Moon, ArrowLeft, ArrowRight, Phone, MapPin, Send } from "lucide-react";
import { useState, useEffect, useRef, FormEvent } from "react";

// Components
const SplashScreen = ({ onComplete }: { onComplete: () => void, key?: string }) => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
      className="fixed inset-0 z-[999] flex items-center justify-center overflow-hidden bg-slate-950"
    >
      {/* Premium Ambient Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(30,58,138,0.15)_0%,rgba(2,6,23,1)_100%)]" />
      
      {/* Animated glowing orbs in background */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-600/20 blur-[100px] rounded-full"
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.5, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-orange-500/10 blur-[80px] rounded-full"
      />

      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Logo Reveal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, filter: "blur(20px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-48 h-48 flex items-center justify-center"
        >
          {/* Rotating dashed ring */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border-2 border-dashed border-blue-500/30"
          />
          {/* Inner solid glowing ring */}
          <motion.div 
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-4 rounded-full border border-blue-400/20 shadow-[0_0_30px_rgba(59,130,246,0.2)]"
          />
          
          <img src="/logo.png" alt="PICON" className="w-24 h-24 object-contain relative z-10 drop-shadow-2xl" />
        </motion.div>

        {/* Text Reveal */}
        <div className="flex flex-col items-center overflow-hidden">
          <motion.h1
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl md:text-6xl font-black text-white tracking-tighter"
          >
            PICON
          </motion.h1>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ delay: 0.8, duration: 0.8, ease: "easeInOut" }}
            className="h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent mt-4"
          />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-12 flex flex-col items-center gap-3 text-white/50"
      >
        <div className="flex items-center gap-3 font-bold uppercase tracking-[0.3em] text-xs">
          <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
          Laboratoire Photo Premium
        </div>
      </motion.div>
    </motion.div>
  );
};

const Navbar = ({ darkMode, toggleDarkMode }: { darkMode: boolean, toggleDarkMode: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white/80 dark:bg-blue-950/80 backdrop-blur-md shadow-sm py-4" : "bg-transparent py-6"}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center text-blue-900 dark:text-white">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 font-bold text-xl tracking-tighter"
        >
          <img src="/logo.png" alt="PICON" className="h-10 w-auto" />
        </motion.div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <a href="#features" className="hover:text-blue-500 transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-blue-500 transition-colors">Comment ça marche</a>
          <a href="#pricing" className="hover:text-blue-500 transition-colors">Dimensions & Prix</a>
          <a href="#contact" className="hover:text-blue-500 transition-colors">Contact</a>
          <a href="#testimonials" className="hidden">Avis</a>

          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/50 transition-colors"
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-blue-600" />}
          </button>

          <a href="#cta" className="bg-blue-600 text-white px-6 py-2.5 rounded-full hover:bg-blue-700 transition-all active:scale-95 shadow-lg shadow-blue-200 dark:shadow-none">
            Télécharger
          </a>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
          </button>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 p-6 flex flex-col gap-4 text-center font-medium shadow-xl dark:text-white"
        >
          <a href="#features" onClick={() => setMobileMenuOpen(false)}>Features</a>
          <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)}>Comment ça marche</a>
          <a href="#pricing" onClick={() => setMobileMenuOpen(false)}>Dimensions & Prix</a>
          <a href="#contact" onClick={() => setMobileMenuOpen(false)}>Contact</a>
          <a href="#testimonials" className="hidden" onClick={() => setMobileMenuOpen(false)}>Avis</a>
          <a href="#cta" onClick={() => setMobileMenuOpen(false)} className="bg-black dark:bg-white dark:text-black text-white px-6 py-3 rounded-full">Télécharger l'App</a>
        </motion.div>
      )}
    </nav>
  );
};

const Hero = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -250]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -350]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const yCenter = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const yLeft = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const yRight = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={containerRef} className="relative pt-32 pb-32 overflow-hidden bg-blue-50/30 dark:bg-slate-950">
      {/* Dynamic Background Elements */}
      <motion.div
        style={{ y: y1 }}
        className="absolute top-0 right-0 -z-10 translate-x-1/4 -translate-y-1/4 opacity-40 dark:opacity-20"
      >
        <div className="w-[800px] h-[800px] bg-gradient-to-br from-blue-400/30 to-indigo-400/10 rounded-full blur-[120px] animate-pulse"></div>
      </motion.div>

      <motion.div
        style={{ y: y2 }}
        className="absolute bottom-0 left-0 -z-10 -translate-x-1/4 translate-y-1/4 opacity-30 dark:opacity-10"
      >
        <div className="w-[600px] h-[600px] bg-gradient-to-tr from-orange-400/20 to-blue-400/10 rounded-full blur-[100px]"></div>
      </motion.div>

      {/* Parallax Blobs */}
      <motion.div style={{ y: y3 }} className="absolute top-1/4 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl -z-10" />
      <motion.div style={{ y: y4 }} className="absolute bottom-1/4 right-20 w-48 h-48 bg-orange-500/10 rounded-full blur-3xl -z-10" />
      <motion.div style={{ y: y1 }} className="absolute top-1/2 left-1/3 w-24 h-24 bg-indigo-500/10 rounded-full blur-xl -z-10" />

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <motion.div
          style={{ opacity }}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-center lg:text-left"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-100 dark:bg-orange-900/40 text-orange-600 dark:text-orange-300 text-xs font-bold mb-8 uppercase tracking-widest shadow-sm">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping"></span>
            Nouveau : Tirage Fine Art disponible
          </div>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-blue-950 dark:text-white leading-[0.9] mb-8">
            Vos photos, <br />
            <span className="text-blue-600 dark:text-blue-400 italic font-serif">imprimées</span> & <br />
            livrées chez vous.
          </h1>
          <p className="text-lg md:text-xl text-blue-900/70 dark:text-blue-200/60 max-w-lg mx-auto lg:mx-0 mb-10 leading-relaxed font-medium text-center lg:text-left">
            PICON, votre laboratoire photo au Togo, s'invite dans votre poche. Chargez vos photos, commandez en un clic et recevez vos tirages sans quitter votre domicile.
          </p>
          <div className="flex flex-col items-center lg:items-start gap-6">
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center lg:justify-start">
              <button
                onClick={() => (window as any).triggerAppStoreMsg?.()}
                className="bg-blue-600 dark:bg-blue-500 text-white px-8 py-4 rounded-2xl flex items-center justify-center gap-3 group hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-blue-200 dark:shadow-blue-900/20 font-bold"
              >
                Obtenir l'application <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => (window as any).triggerAppStoreMsg?.()}
                  className="p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm hover:shadow-md transition-all active:scale-95 group/store flex items-center justify-center"
                >
                  <svg className="w-6 h-6 text-slate-900 dark:text-white fill-current group-hover/store:scale-110 transition-transform" viewBox="0 0 384 512"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" /></svg>
                </button>
                <button className="p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm hover:shadow-md transition-all active:scale-95 group/store flex items-center justify-center">
                  <svg className="w-6 h-6 group-hover/store:scale-110 transition-transform" viewBox="0 0 512 512"><path fill="#EA4335" d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1z" /><path fill="#FBBC04" d="M47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0z" /><path fill="#34A853" d="M425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8z" /><path fill="#4285F4" d="M104.6 499l280.8-161.2-60.1-60.1L104.6 499z" /></svg>
                </button>
              </div>
            </div>
            <div className="flex -space-x-3 items-center ml-2">
              {[1, 2, 3, 4].map(i => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  whileHover={{ y: -8, scale: 1.1, zIndex: 20 }}
                  className="w-12 h-12 rounded-full border-4 border-white dark:border-slate-900 overflow-hidden bg-blue-100 dark:bg-blue-800 cursor-pointer shadow-lg"
                >
                  <img src={`https://i.pravatar.cc/100?img=${i + 20}`} alt="User" referrerPolicy="no-referrer" />
                </motion.div>
              ))}
              <span className="ml-6 text-sm font-bold text-blue-900/60 dark:text-blue-400 tracking-tight">+12k utilisateurs ravis</span>
            </div>
          </div>
        </motion.div>

        <div className="relative h-[600px] flex items-center justify-center">
          {/* Ethereal Floating Forms (Advanced Particles) */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0.1, 0.3, 0.1],
                scale: [1, 1.5, 1],
                x: [0, Math.sin(i) * 50, 0],
                y: [0, Math.cos(i) * 50, 0],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: 10 + i * 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute rounded-full blur-[40px]"
              style={{
                width: `${40 + i * 10}px`,
                height: `${40 + i * 10}px`,
                background: i % 2 === 0 ? "rgba(59, 130, 246, 0.1)" : "rgba(99, 102, 241, 0.1)",
                left: `${Math.random() * 80 + 10}%`,
                top: `${Math.random() * 80 + 10}%`,
                zIndex: 0
              }}
            />
          ))}

          {/* Center Phone */}
          <motion.div
            style={{ y: yCenter }}
            initial={{ opacity: 0, y: 150, rotateY: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, rotateY: 0, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.02, rotateY: -5, transition: { duration: 0.4 } }}
            className="relative z-20 w-[280px] aspect-[9/19] rounded-[3rem] border-[10px] border-blue-950 dark:border-white shadow-[0_50px_100px_-20px_rgba(30,58,138,0.5)] overflow-hidden bg-white cursor-pointer"
          >
            <img
              src="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&q=80&w=800"
              className="w-full h-full object-cover"
              alt="App Main"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-blue-600/10 mix-blend-overlay"></div>
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-blue-950/80 to-transparent p-6 flex flex-col justify-end text-white">
              <p className="text-xl font-black leading-none mb-1">PICON</p>
              <p className="text-sm font-medium opacity-80 uppercase tracking-widest">Premium</p>
            </div>
          </motion.div>

          {/* Left Phone */}
          <motion.div
            style={{ y: yLeft }}
            initial={{ opacity: 0, x: 0, y: 200, rotate: 0 }}
            animate={{ opacity: 0.8, x: -180, y: 0, rotate: -12 }}
            transition={{ duration: 1.5, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.08, rotate: -5, opacity: 1, zIndex: 30, transition: { duration: 0.4 } }}
            className="absolute w-[240px] aspect-[9/19] rounded-[2.5rem] border-[8px] border-blue-900/10 dark:border-blue-400/10 shadow-2xl overflow-hidden bg-blue-50 cursor-pointer"
          >
            <img
              src="https://images.unsplash.com/photo-1522067813932-8126e638aa55?auto=format&fit=crop&q=80&w=600"
              className="w-full h-full object-cover grayscale-[0.2]"
              alt="App Left"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-blue-900/20 backdrop-blur-[1px]"></div>
          </motion.div>

          {/* Right Phone */}
          <motion.div
            style={{ y: yRight }}
            initial={{ opacity: 0, x: 0, y: 200, rotate: 0 }}
            animate={{ opacity: 0.8, x: 180, y: 0, rotate: 12 }}
            transition={{ duration: 1.5, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.08, rotate: 5, opacity: 1, zIndex: 30, transition: { duration: 0.4 } }}
            className="absolute w-[240px] aspect-[9/19] rounded-[2.5rem] border-[8px] border-blue-900/10 dark:border-blue-400/10 shadow-2xl overflow-hidden bg-blue-50 cursor-pointer"
          >
            <img
              src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=600"
              className="w-full h-full object-cover grayscale-[0.2]"
              alt="App Right"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-blue-900/20 backdrop-blur-[1px]"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Features = () => {
  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Vitesse Éclair",
      desc: "De votre téléphone à notre labo en un clin d'œil. Ne perdez plus de temps."
    },
    {
      icon: <CheckCircle2 className="w-6 h-6" />,
      title: "Qualité Labo",
      desc: "Nous utilisons les meilleurs papiers et encres pour un rendu professionnel durable."
    },
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: "Expérience Native",
      desc: "Une application pensée pour les amateurs. Intuitive, fluide et sans friction."
    }
  ];

  return (
    <section id="features" className="py-24 bg-white dark:bg-slate-900 border-y border-blue-100/50 dark:border-blue-900/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter dark:text-white leading-none">
            Pourquoi <span className="text-blue-600">PICON</span> ?
          </h2>
          <p className="text-blue-900/60 dark:text-blue-300/60 max-w-2xl mx-auto text-lg font-medium">Conçu pour ceux qui capturent la vie, PICON est le pont entre vos pixels et le papier.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-12">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -15, scale: 1.02 }}
              className="p-8 rounded-[2.5rem] bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/20 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-200/40 dark:hover:shadow-none flex flex-col items-center lg:items-start text-center lg:text-left"
            >
              <div className="w-14 h-14 bg-orange-500 text-white rounded-[1.2rem] flex items-center justify-center mb-8 shadow-lg shadow-orange-200 dark:shadow-none group-hover:rotate-6 transition-transform">
                {f.icon}
              </div>
              <h3 className="text-2xl font-black mb-4 dark:text-white tracking-tight">{f.title}</h3>
              <p className="text-blue-900/70 dark:text-blue-300/70 leading-relaxed font-medium text-center lg:text-left">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const HowItWorks = () => {
  const steps = [
    { number: "01", title: "Chargez", desc: "Sélectionnez vos meilleures photos directement depuis votre galerie mobile." },
    { number: "02", title: "Commandez", desc: "Choisissez vos formats et formats. Le labo PICON s'occupe du reste avec expertise." },
    { number: "03", title: "Livraison", desc: "Recevez vos tirages à domicile, partout au Togo, sans vous déplacer en agence." }
  ];

  return (
    <section id="how-it-works" className="py-32 bg-slate-50 dark:bg-black text-slate-900 dark:text-white overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full opacity-10 dark:opacity-5">
        <svg viewBox="0 0 1440 320" className="w-full"><path fill="currentColor" fillOpacity="1" d="M0,192L48,197.3C96,203,192,213,288,192C384,171,480,117,576,128C672,139,768,213,864,224C960,235,1056,181,1152,149.3C1248,117,1344,107,1392,101.3L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path></svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 font-sans">
        <div className="mb-24 text-center">
          <h2 className="text-4xl md:text-7xl font-black tracking-tighter mb-6 leading-none">Trois étapes vers <br /><span className="text-blue-600 dark:text-blue-400 italic font-serif">l'immortalité</span>.</h2>
          <div className="w-24 h-2 bg-blue-500 rounded-full mx-auto"></div>
        </div>
        <div className="grid md:grid-cols-3 gap-16 md:gap-20">
          {steps.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="relative text-center md:text-left"
            >
              <span className="text-8xl md:text-9xl font-black text-blue-500/10 absolute -top-12 -left-4 md:-top-16 md:-left-10 z-0 select-none">{s.number}</span>
              <div className="relative z-10 transition-all duration-300">
                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-6 border border-blue-400/30 mx-auto md:mx-0">
                  <span className="text-blue-600 dark:text-blue-400 font-black">{i + 1}</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-black mb-6 tracking-tight"> {s.title} </h3>
                <p className="text-slate-600 dark:text-blue-100/60 font-medium leading-relaxed text-base md:text-lg text-center md:text-left">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const iconY1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const iconY2 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const iconY3 = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const testimonials = [
    {
      name: "Marc Aubert",
      role: "Photographe Amateur",
      text: "La qualité du papier est bluffante. Enfin une application qui respecte la colorimétrie de mes clichés.",
      image: "https://images.unsplash.com/photo-1554080353-a1b6ce3dc321?auto=format&fit=crop&q=80&w=800"
    },
    {
      name: "Sophie Laurent",
      role: "Voyageuse",
      text: "Simple et intuitif. J'ai commandé mon album de voyage en 5 minutes dans le train.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=800"
    },
    {
      name: "Julie Morel",
      role: "Maman",
      text: "Les tirages sont arrivés très bien emballés. Les couleurs sont vives et le rendu est vraiment pro.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=800"
    },
    {
      name: "Thomas Roux",
      role: "Designer",
      text: "L'interface est d'une fluidité rare. C'est un plaisir de préparer ses tirages sur cette app.",
      image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=800"
    }
  ];

  const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section ref={containerRef} id="testimonials" className="py-32 bg-white dark:bg-black text-slate-900 dark:text-white overflow-hidden relative">
      {/* Background Decor */}
      <motion.div
        style={{ y: bgY }}
        className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none"
      >
        <svg viewBox="0 0 1440 320" className="w-full h-full object-cover">
          <path fill="#3b82f6" d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,149.3C672,149,768,203,864,197.3C960,192,1056,128,1152,112C1248,96,1344,128,1392,144L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </motion.div>

      {/* Floating Parallax Icons */}
      <motion.div style={{ y: iconY1 }} className="absolute top-20 left-[10%] opacity-10 pointer-events-none text-blue-600/20"><Camera className="w-40 h-40" /></motion.div>
      <motion.div style={{ y: iconY2 }} className="absolute bottom-40 right-[15%] opacity-10 pointer-events-none text-blue-600/20"><ImageIcon className="w-32 h-32" /></motion.div>
      <motion.div style={{ y: iconY3 }} className="absolute top-1/2 left-[40%] opacity-5 pointer-events-none text-orange-500/10"><Zap className="w-60 h-60" /></motion.div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-end mb-16 gap-8 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl"
          >
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 leading-tight uppercase">
              Rejoint par des <br className="hidden md:block" />
              <span className="text-blue-600 dark:text-blue-500">milliers</span> <br className="hidden md:block" />
              de passionnés<span className="text-blue-600 dark:text-blue-500">.</span>
            </h2>
            <p className="text-slate-600 dark:text-blue-100/60 text-lg font-medium">Ils ont choisi PICON pour immortaliser leurs plus beaux instants.</p>
          </motion.div>

          <div className="flex gap-4">
            <button
              onClick={prev}
              className="w-12 h-12 md:w-16 md:h-16 rounded-2xl border-2 border-blue-100 dark:border-white/20 flex items-center justify-center hover:bg-blue-600 hover:border-blue-600 hover:text-white transition-all active:scale-95 group shadow-xl"
            >
              <ArrowLeft className="w-5 h-5 md:w-6 md:h-6 group-hover:-translate-x-1 transition-transform" />
            </button>
            <button
              onClick={next}
              className="w-12 h-12 md:w-16 md:h-16 rounded-2xl border-2 border-blue-100 dark:border-white/20 flex items-center justify-center hover:bg-blue-600 hover:border-blue-600 hover:text-white transition-all active:scale-95 group shadow-xl"
            >
              <ArrowRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        <div className="relative min-h-[500px] md:h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.95, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 1.05, x: -20 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 flex flex-col lg:grid lg:grid-cols-2 gap-8 md:gap-12 items-center"
            >
              <div className="w-full h-64 md:h-full rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl relative group">
                <img
                  src={testimonials[currentIndex].image}
                  alt={testimonials[currentIndex].name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-blue-900/10 dark:bg-blue-900/20 mix-blend-multiply"></div>
                <div className="absolute top-4 right-4 md:top-8 md:right-8">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/30">
                    <ImageIcon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>
                </div>
              </div>

              <div className="w-full text-center lg:text-left">
                <div className="flex justify-center lg:justify-start gap-1 mb-4 md:mb-8">
                  {[...Array(5)].map((_, i) => (
                    <Zap key={i} className="w-4 h-4 md:w-5 md:h-5 text-orange-500 fill-orange-500" />
                  ))}
                </div>
                <p className="text-xl md:text-2xl font-bold italic leading-relaxed mb-6 md:mb-8 text-slate-800 dark:text-blue-50 text-center lg:text-left">
                  "{testimonials[currentIndex].text}"
                </p>
                <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-blue-500/10 dark:bg-blue-500/20 overflow-hidden border-2 border-blue-500 shadow-xl">
                    <img
                      src={`https://i.pravatar.cc/150?u=${testimonials[currentIndex].name}`}
                      alt={testimonials[currentIndex].name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <h4 className="text-xl md:text-2xl font-black tracking-tight text-slate-900 dark:text-white">{testimonials[currentIndex].name}</h4>
                    <p className="text-blue-600 dark:text-blue-500 font-black uppercase tracking-widest text-xs">{testimonials[currentIndex].role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

const PricingSection = () => {
  const pricingData = [
    { size: "9 x 13", price: "300 F" },
    { size: "10 x 15", price: "300 F" },
    { size: "13 x 18", price: "500 F" },
    { size: "15 x 21", price: "700 F" },
    { size: "20 x 25", price: "1500 F" },
    { size: "20 x 30", price: "2000 F" },
    { size: "24 x 30", price: "3000 F" },
    { size: "30 x 40", price: "5000 F" },
    { size: "30 x 45", price: "6000 F" },
    { size: "30 x 90", price: "8000 F" },
    { size: "40 x 50", price: "10000 F" },
    { size: "40 x 60", price: "13000 F" },
    { size: "50 x 60", price: "15000 F" },
    { size: "60 x 90", price: "18000 F" },
    { size: "60 x 120", price: "25000 F" },
  ];

  return (
    <section id="pricing" className="py-32 bg-blue-50/50 dark:bg-slate-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 dark:text-white leading-none">
              Nos <span className="text-orange-500">Dimensions</span> <br />& <span className="text-blue-600">Prix</span>.
            </h2>
            <p className="text-blue-900/60 dark:text-blue-300/60 max-w-2xl mx-auto text-lg font-medium">
              Des tarifs transparents pour des tirages d'exception. Choisissez le format qui sublimera vos souvenirs.
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pricingData.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-blue-100 dark:border-blue-900/20 shadow-xl shadow-blue-100/20 flex flex-col sm:flex-row justify-between items-center gap-6 group cursor-pointer text-center sm:text-left"
            >
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <ImageIcon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Dimension</p>
                  <p className="text-xl font-black text-blue-950 dark:text-white">{item.size}</p>
                </div>
              </div>
              <div className="sm:text-right">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Prix</p>
                <p className="text-2xl font-black text-orange-500">{item.price}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 p-8 rounded-[3rem] bg-blue-600 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl"
        >
          <div className="max-w-xl">
            <h3 className="text-3xl font-black mb-4">Besoin d'un format spécifique ?</h3>
            <p className="text-blue-100 font-medium opacity-90">Pour toute demande particulière ou tirage grand format sur mesure, n'hésitez pas à nous contacter.</p>
          </div>
          <button className="bg-white text-blue-600 px-10 py-5 rounded-2xl font-black hover:scale-105 active:scale-95 transition-all shadow-xl flex items-center gap-3 whitespace-nowrap">
            Contactez-nous <Mail className="w-6 h-6" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const whatsappNumber = "+22890000000"; // Numéro WhatsApp Placeholder
    const text = `Bonjour PICON Labs Togo! \n\n*Nom:* ${formData.name}\n*Email:* ${formData.email}\n*Message:* ${formData.message}`;
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  return (
    <section id="contact" className="py-32 bg-white dark:bg-slate-950 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 text-xs font-black mb-8 uppercase tracking-widest shadow-sm">
              Contactez-nous
            </div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-blue-950 dark:text-white mb-8 leading-[1.1]">
              Parlons de vos <br />
              <span className="text-blue-600 dark:text-blue-400 italic font-serif">souvenirs</span>.
            </h2>
            <p className="text-lg text-blue-900/70 dark:text-blue-300/60 mb-12 font-medium leading-relaxed text-center lg:text-left">
              Une question sur nos services ? Besoin d'un devis pour une commande spécifique ? Notre équipe est à votre écoute pour vous accompagner dans l'immortalisation de vos moments précieux.
            </p>

            <div className="space-y-8">
              <div className="flex flex-col sm:flex-row items-center gap-6 group justify-center lg:justify-start">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform shadow-sm">
                  <Mail className="w-6 h-6" />
                </div>
                <div className="text-center lg:text-left">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Email</p>
                  <p className="text-xl font-black text-blue-950 dark:text-white">infos@photopicon.com</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-6 group justify-center lg:justify-start">
                <div className="w-14 h-14 rounded-2xl bg-orange-50 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400 group-hover:scale-110 transition-transform shadow-sm">
                  <Phone className="w-6 h-6" />
                </div>
                <div className="text-center lg:text-left">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Téléphone</p>
                  <p className="text-xl font-black text-blue-950 dark:text-white">+228 90 00 00 00</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-6 group justify-center lg:justify-start">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform shadow-sm">
                  <MapPin className="w-6 h-6" />
                </div>
                <div className="text-center lg:text-left">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Adresse</p>
                  <p className="text-xl font-black text-blue-950 dark:text-white">Lomé, Togo - Quartier Kodjoviopé</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full -z-10 animate-pulse"></div>
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-orange-500/10 blur-[100px] rounded-full -z-10"></div>

            <form
              onSubmit={handleSubmit}
              className="bg-white dark:bg-slate-900 p-8 md:p-12 rounded-[3.5rem] border-2 border-blue-100 dark:border-blue-900/20 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] dark:shadow-none"
            >
              <div className="space-y-8">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 ml-2">Nom Complet</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ex: Jean Dupont"
                    className="w-full px-8 py-5 rounded-[1.5rem] bg-slate-50 dark:bg-slate-800/50 border-2 border-transparent focus:border-blue-500 dark:focus:border-blue-400 focus:bg-white dark:focus:bg-slate-900 transition-all outline-none text-blue-950 dark:text-white font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 ml-2">Votre Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="jean@example.com"
                    className="w-full px-8 py-5 rounded-[1.5rem] bg-slate-50 dark:bg-slate-800/50 border-2 border-transparent focus:border-blue-500 dark:focus:border-blue-400 focus:bg-white dark:focus:bg-slate-900 transition-all outline-none text-blue-950 dark:text-white font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 ml-2">Votre Message</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Comment pouvons-nous vous aider ?"
                    className="w-full px-8 py-6 rounded-[1.5rem] bg-slate-50 dark:bg-slate-800/50 border-2 border-transparent focus:border-blue-500 dark:focus:border-blue-400 focus:bg-white dark:focus:bg-slate-900 transition-all outline-none text-blue-950 dark:text-white font-bold resize-none"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 rounded-2xl font-black text-lg transition-all active:scale-95 shadow-2xl shadow-blue-200 dark:shadow-none flex items-center justify-center gap-3 group"
                >
                  Envoyer sur WhatsApp
                  <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12 text-center md:text-left">
          <div className="md:col-span-2 flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-2 font-bold text-xl tracking-tighter mb-6 dark:text-white justify-center md:justify-start">
              <img src="/logo.png" alt="PICON" className="h-10 w-auto" />
            </div>
            <p className="text-slate-500 dark:text-slate-400 max-w-sm mb-6 font-light text-center md:text-left">Le laboratoire photo leader au Togo, réinventé pour le mobile. Livraison à domicile de vos plus beaux souvenirs.</p>
            <div className="flex gap-4 justify-center md:justify-start">
              <a href="#" className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-400 hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all"><Instagram className="w-4 h-4" /></a>
              <a href="#" className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-400 hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all"><Facebook className="w-4 h-4" /></a>
              <a href="mailto:infos@photopicon.com" className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-400 hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all"><Mail className="w-4 h-4" /></a>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-6 uppercase text-xs tracking-widest text-slate-400">Navigation</h4>
            <ul className="flex flex-col gap-4 text-sm text-slate-600 dark:text-slate-400 font-medium">
              <li><a href="#features" className="hover:text-black dark:hover:text-white">Fonctionnalités</a></li>
              <li><a href="#how-it-works" className="hover:text-black dark:hover:text-white">Comment ça marche</a></li>
              <li><a href="#testimonials" className="hover:text-black dark:hover:text-white">Avis Clients</a></li>
              <li><a href="#" className="hover:text-black dark:hover:text-white">Presse</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 uppercase text-xs tracking-widest text-slate-400">Support</h4>
            <ul className="flex flex-col gap-4 text-sm text-slate-600 dark:text-slate-400 font-medium">
              <li><a href="#" className="hover:text-black dark:hover:text-white">Aide & Contact</a></li>
              <li><a href="#" className="hover:text-black dark:hover:text-white">Suivi de commande</a></li>
              <li><a href="#" className="hover:text-black dark:hover:text-white">CGU / CGV</a></li>
              <li><a href="#" className="hover:text-black dark:hover:text-white">Confidentialité</a></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col md:row justify-between items-center text-xs text-slate-400 group">
          <p>© 2026 PICON Labs Togo. Tous droits réservés.</p>
          <p className="mt-4 md:mt-0 font-medium tracking-tighter hover:text-black dark:hover:text-white transition-colors cursor-default">LE LABORATOIRE PHOTO N°1 AU TOGO</p>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3500); // Cinematic duration
    return () => clearTimeout(timer);
  }, []);

  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") === "dark" ||
        (!localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches);
    }
    return false;
  });

  const [showAppStoreMsg, setShowAppStoreMsg] = useState(false);

  const handleAppStoreClick = () => {
    setShowAppStoreMsg(true);
    setTimeout(() => setShowAppStoreMsg(false), 3000);
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }

    // Global trigger for sub-components
    (window as any).triggerAppStoreMsg = handleAppStoreClick;
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div className="min-h-screen font-sans selection:bg-slate-900 selection:text-slate-100 dark:selection:bg-slate-100 dark:selection:text-slate-900 scroll-smooth bg-white dark:bg-slate-950 transition-colors duration-300">
      <AnimatePresence>
        {loading && <SplashScreen key="splash" onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      <AnimatePresence>
        {showAppStoreMsg && (
          <motion.div
            initial={{ opacity: 0, y: -50, x: "-50%" }}
            animate={{ opacity: 1, y: 100, x: "-50%" }}
            exit={{ opacity: 0, y: -50, x: "-50%" }}
            className="fixed top-0 left-1/2 z-[100] bg-orange-600 text-white px-8 py-4 rounded-2xl font-black shadow-2xl flex items-center gap-3 border-2 border-orange-400/30 backdrop-blur-xl"
          >
            <Zap className="w-6 h-6 animate-pulse" />
            <p className="tracking-tight">Bientôt Disponible sur iOS !</p>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        <Hero />
        <Features />

        {/* Decor Wave */}
        <div className="bg-white dark:bg-slate-900 overflow-hidden leading-[0]">
          <svg viewBox="0 0 1440 120" className="w-full fill-blue-950 dark:fill-black"><path d="M0,32L120,42.7C240,53,480,75,720,74.7C960,75,1200,53,1320,42.7L1440,32L1440,120L1320,120C1200,120,960,120,720,120C480,120,240,120,120,120L0,120Z"></path></svg>
        </div>

        <HowItWorks />
        <PricingSection />

        {/* Payment Section */}
        <section className="py-24 bg-white dark:bg-slate-900 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative p-12 md:p-20 rounded-[4rem] bg-orange-50/50 dark:bg-orange-950/10 border-2 border-orange-100 dark:border-orange-900/20 flex flex-col lg:flex-row items-center justify-between gap-12 overflow-hidden"
            >
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-orange-200/20 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-200/20 blur-3xl rounded-full translate-y-1/2 -translate-x-1/2"></div>

              <div className="max-w-2xl relative z-10 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-100 dark:bg-orange-900/40 text-orange-600 dark:text-orange-400 text-xs font-black mb-8 uppercase tracking-widest shadow-sm">
                  Paiement Local & Flexible
                </div>
                <h2 className="text-3xl md:text-6xl font-black tracking-tighter text-blue-950 dark:text-white mb-6 leading-none">
                  Payez comme <br /><span className="text-orange-500">vous voulez</span>.
                </h2>
                <p className="text-blue-900/70 dark:text-blue-300/60 text-lg md:text-xl font-medium leading-relaxed text-justify md:text-center lg:text-left">
                  Nous acceptons toutes les solutions de paiement locales : <span className="font-bold underline decoration-orange-400">Mixx by Yas</span>, <span className="font-bold underline decoration-orange-400">Moov Money (Flooz)</span> et cartes bancaires. Sécurisé, rapide, flexible.
                </p>
              </div>

              <div className="flex flex-wrap gap-4 justify-center relative z-10">
                <motion.div whileHover={{ y: -5, scale: 1.05 }} className="px-6 py-4 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 flex items-center gap-3">
                  <img src="https://tse4.mm.bing.net/th/id/OIP.8InsObAPgaS51rOV9gkp5AAAAA?r=0&w=400&h=300&rs=1&pid=ImgDetMain&o=7&rm=3" alt="T-Money" className="h-6" />
                  <span className="font-black text-[#0033A0] dark:text-white">Mixx by Yas</span>
                </motion.div>
                <motion.div whileHover={{ y: -5, scale: 1.05 }} className="px-6 py-4 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 flex items-center gap-3">
                  <img src="https://tse2.mm.bing.net/th/id/OIP.hDsjDp1ZHd4JY67f-Xzv3wHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3" alt="Moov Money" className="h-6" />
                  <span className="font-black text-[#005C9E] dark:text-[#FF7900]">Flooz</span>
                </motion.div>
                <motion.div whileHover={{ y: -5, scale: 1.05 }} className="px-6 py-4 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 flex items-center justify-center h-[74px] w-32">
                  <img src="https://ai-image-editor-wasabi-bucket-prod-cdn.phot.ai/initialinitialLoadAssets/logos/VISA.webp" alt="VISA" className="h-6" />
                  <span className="font-black text-[#005C9E] dark:text-[#FF7900]">   Card</span>
                </motion.div>
                <motion.div whileHover={{ y: -5, scale: 1.05 }} className="px-6 py-4 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 flex items-center justify-center h-[74px] w-32">
                  <img src="https://w7.pngwing.com/pngs/598/890/png-transparent-mastercard-icon.png" alt="Mastercard" className="h-8" />
                  <span className="font-black text-[#005C9E] dark:text-[#FF7900]">  Mastercard</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        <ContactSection />
        {/* <Testimonials /> */}

        {/* CTA Section */}
        <section id="cta" className="py-32 bg-white dark:bg-slate-950 overflow-hidden group">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="bg-gradient-to-br from-blue-600 to-indigo-700 dark:from-blue-900 dark:to-indigo-950 rounded-[4rem] p-12 md:p-24 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-16 shadow-[0_40px_80px_-20px_rgba(37,99,235,0.4)]"
            >
              {/* Background decor */}
              <motion.div
                animate={{
                  scale: [1, 1.5, 1],
                  rotate: [0, 90, 0],
                  opacity: [0.2, 0.4, 0.2]
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute top-0 right-0 w-[500px] h-[500px] bg-white rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"
              ></motion.div>

              <div className="relative z-10 max-w-xl text-white text-center md:text-left">
                <h2 className="text-4xl md:text-7xl font-black tracking-tighter mb-8 leading-[0.9]">Prêt à imprimer vos <br />meilleures <span className="text-blue-200">histoires</span> ?</h2>
                <p className="text-blue-50 text-lg md:text-xl mb-12 font-medium opacity-90 leading-relaxed text-justify md:text-left">Téléchargez l'application dès aujourd'hui et recevez 5 tirages de bienvenue offerts pour votre première commande.</p>
                <div className="flex flex-col sm:flex-row flex-wrap gap-6 justify-center md:justify-start">
                  <button
                    onClick={handleAppStoreClick}
                    className="bg-white text-slate-900 px-8 py-4 md:px-10 md:py-5 rounded-2xl flex items-center justify-center gap-4 hover:scale-105 active:scale-95 transition-all shadow-xl font-black"
                  >
                    <svg className="w-7 h-7 md:w-8 md:h-8 fill-current" viewBox="0 0 384 512"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" /></svg>
                    <div className="text-left">
                      <p className="text-[10px] uppercase opacity-60 leading-none mb-1 tracking-widest">Download on</p>
                      <p className="text-lg md:text-xl font-black leading-none mt-1">App Store</p>
                    </div>
                  </button>
                  <button className="bg-blue-950/20 backdrop-blur-xl border-2 border-white/20 text-white px-8 py-4 md:px-10 md:py-5 rounded-2xl flex items-center justify-center gap-4 hover:scale-105 active:scale-95 transition-all shadow-xl font-black">
                    <svg className="w-7 h-7 md:w-8 md:h-8" viewBox="0 0 512 512"><path fill="#EA4335" d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1z" /><path fill="#FBBC04" d="M47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0z" /><path fill="#34A853" d="M425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8z" /><path fill="#4285F4" d="M104.6 499l280.8-161.2-60.1-60.1L104.6 499z" /></svg>
                    <div className="text-left">
                      <p className="text-[10px] uppercase opacity-60 leading-none mb-1 tracking-widest">Get it on</p>
                      <p className="text-lg md:text-xl font-black leading-none mt-1">Google Play</p>
                    </div>
                  </button>
                </div>
              </div>

              <div className="relative z-10 hidden xl:block translate-y-20">
                <motion.div
                  animate={{
                    y: [0, -20, 0],
                    rotateX: [0, 10, 0],
                    rotateY: [0, -10, 0]
                  }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  whileHover={{ scale: 1.05, rotate: 0 }}
                  className="w-[320px] h-[550px] bg-white rounded-[3.5rem] border-[12px] border-blue-950 shadow-[0_60px_100px_-30px_rgba(0,0,0,0.5)] relative cursor-pointer group"
                >
                  <img src="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover rounded-[2.5rem]" alt="App Preview" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-orange-600/20 rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl">
                      <Zap className="w-10 h-10 text-orange-600" />
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
