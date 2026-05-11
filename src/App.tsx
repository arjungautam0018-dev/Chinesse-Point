import { useState, useRef, useEffect, MouseEvent as ReactMouseEvent } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { Utensils, Phone, MapPin, Clock, Flame, ChevronRight, Menu as MenuIcon, X, Instagram, Facebook } from 'lucide-react';
import { ThreeBackground } from './components/ThreeBackground';
import { SPECIALS, RICE_NOODLES, STARTERS, SOUPS, MOMO, MenuItem } from './constants/MenuData';
import confetti from 'canvas-confetti';

interface Card3DProps {
  children: React.ReactNode;
  className?: string;
}

function Card3D({ children, className = "" }: Card3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) * 0.05;
    const rotateY = (centerX - x) * 0.05;
    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX: rotate.x, rotateY: rotate.y }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`preserve-3d cursor-pointer ${className}`}
    >
      {children}
    </motion.div>
  );
}

function FlipCard({ item }: { item: typeof SPECIALS[0] }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="h-[300px] perspective-1000 group relative"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <motion.div
        className="w-full h-full preserve-3d relative duration-500"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
      >
        {/* Front */}
        <div className="absolute inset-0 backface-hidden bg-chinese-card border border-gold/20 rounded-2xl p-6 flex flex-col items-center justify-between shadow-2xl overflow-hidden">
          <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-gold/30 to-transparent transform -translate-x-8 -translate-y-8 rotate-45" />
          <span className="self-end px-3 py-1 bg-red-primary/20 text-red-primary text-xs font-bold rounded-full border border-red-primary/30">
            {item.badge}
          </span>
          <span className="text-6xl drop-shadow-lg group-hover:scale-110 transition-transform duration-300">
            {item.icon}
          </span>
          <div className="text-center">
            <h3 className="text-xl font-bold text-white mb-1">{item.name}</h3>
            <p className="text-gold font-bold">Rs. {item.price}</p>
          </div>
          <p className="text-muted text-sm text-center">{item.teaser}</p>
        </div>

        {/* Back */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 bg-gold/10 border border-gold rounded-2xl p-6 flex flex-col items-center justify-center text-center backdrop-blur-sm">
          <h4 className="text-xl font-bold text-gold mb-4">Chef's Secret</h4>
          <p className="text-[#F5EDD8] mb-6">Hand-prepared with signature spices and the freshest ingredients of the day.</p>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 }, colors: ['#D4A843', '#C1271A'] });
            }}
            className="px-6 py-2 bg-gold text-chinese-black font-bold rounded-full hover:bg-gold-lt transition-colors"
          >
            I'M HUNGRY!
          </button>
        </div>
      </motion.div>
    </div>
  );
}

function SectionHeading({ subtitle, title }: { subtitle: string, title: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="mb-16 text-center"
    >
      <span className="text-gold font-bold uppercase tracking-widest mb-4 inline-block">{subtitle}</span>
      <h2 className="text-5xl md:text-6xl font-black [text-shadow:0_0_20px_rgba(212,168,67,0.1)]">{title}</h2>
    </motion.div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState('rice');
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const navBackground = useTransform(scrollYProgress, [0, 0.05], ["rgba(8, 5, 2, 0)", "rgba(8, 5, 2, 0.9)"]);

  const menuSections: Record<string, MenuItem[]> = {
    rice: RICE_NOODLES,
    starters: STARTERS,
    soups: SOUPS,
    momo: MOMO
  };

  const menuTabs = [
    { label: '🍚 Rice & Noodles', id: 'rice' },
    { label: '🍗 Starters', id: 'starters' },
    { label: '🍵 Soups', id: 'soups' },
    { label: '🥟 Momo', id: 'momo' }
  ];

  const lanternAnimation = {
    animate: {
      rotate: [0, -5, 5, 0],
      transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
    }
  };

  return (
    <div className="relative scroll-smooth">
      <ThreeBackground />

      {/* Navigation */}
      <motion.nav 
        style={{ backgroundColor: navBackground }}
        className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 backdrop-blur-sm px-6 py-4 flex items-center justify-between"
      >
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-red-primary rounded-full flex items-center justify-center text-white font-serif font-black italic">CP</div>
          <h1 className="text-2xl font-black tracking-tighter text-white">
            THE CHINESE <span className="text-gold">POINT</span>
          </h1>
        </div>

        <div className="hidden md:flex items-center gap-8 font-medium text-muted">
          {['Home', 'Specials', 'Menu', 'About', 'Contact'].map(link => (
            <a key={link} href={`#${link.toLowerCase()}`} className="hover:text-gold transition-colors">{link}</a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button onClick={() => setIsNavOpen(true)} className="md:hidden text-white"><MenuIcon /></button>
        </div>
      </motion.nav>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isNavOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-[60] bg-chinese-black p-8 flex flex-col"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="text-xl font-serif text-gold italic">CP</span>
              <button onClick={() => setIsNavOpen(false)} className="text-white"><X /></button>
            </div>
            <div className="flex flex-col gap-6 text-3xl font-serif">
              {['Home', 'Specials', 'Menu', 'About', 'Contact'].map(link => (
                <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setIsNavOpen(false)} className="hover:text-gold">{link}</a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section id="home" className="min-h-screen relative flex flex-col justify-center items-center px-6 overflow-hidden text-center">
        {/* Lanterns */}
        <motion.div {...lanternAnimation} className="absolute top-24 left-10 hidden xl:block drop-shadow-[0_0_15px_rgba(193,39,26,0.3)]">
          <svg width="80" height="120" viewBox="0 0 100 150">
            <line x1="50" y1="0" x2="50" y2="30" stroke="#D4A843" strokeWidth="2" />
            <ellipse cx="50" cy="80" rx="40" ry="50" fill="#C1271A" stroke="#D4A843" strokeWidth="3" />
            <rect x="25" y="40" width="50" height="80" fill="rgba(255,255,255,0.1)" />
            <line x1="10" y1="80" x2="90" y2="80" stroke="#D4A843" strokeWidth="1" />
            <line x1="50" y1="130" x2="50" y2="150" stroke="#D4A843" strokeWidth="2" />
          </svg>
        </motion.div>
        <motion.div {...lanternAnimation} className="absolute top-24 right-10 hidden xl:block drop-shadow-[0_0_15px_rgba(193,39,26,0.3)]">
          <svg width="80" height="120" viewBox="0 0 100 150">
            <line x1="50" y1="0" x2="50" y2="30" stroke="#D4A843" strokeWidth="2" />
            <ellipse cx="50" cy="80" rx="40" ry="50" fill="#C1271A" stroke="#D4A843" strokeWidth="3" />
            <rect x="25" y="40" width="50" height="80" fill="rgba(255,255,255,0.1)" />
            <line x1="50" y1="130" x2="50" y2="150" stroke="#D4A843" strokeWidth="2" />
          </svg>
        </motion.div>

        <div className="max-w-4xl z-10">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-gold font-bold tracking-[0.4em] uppercase mb-4 text-sm md:text-base selection:bg-gold selection:text-black"
          >
            Authentic Chinese Cuisine · Lamahi, Nepal
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, type: "spring", damping: 12 }}
            className="text-7xl md:text-9xl font-black mb-8 leading-none tracking-tighter"
          >
            THE CHINESE <br />
            <span className="text-gold [text-shadow:0_0_50px_rgba(212,168,67,0.5)]">POINT</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-xl text-muted max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Bold flavors. Fiery woks. A premium dining experience that takes you to the heart of Hong Kong, right here in Lamahi.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex flex-wrap justify-center gap-6"
          >
            <a href="#menu" className="px-10 py-5 bg-red-primary text-white font-black rounded-full hover:scale-105 hover:shadow-[0_0_30px_rgba(193,39,26,0.4)] transition-all flex items-center gap-2">
              Explore Menu <ChevronRight size={20} />
            </a>
            <a href="#specials" className="px-10 py-5 border border-gold/40 text-gold font-black rounded-full hover:bg-gold/10 transition-all flex items-center gap-2">
              Today's Special
            </a>
          </motion.div>
        </div>

        {/* Marquee Ticker */}
        <div className="absolute bottom-12 left-0 w-full overflow-hidden bg-gold py-4 translate-y-1/2 rotate-[-2deg] z-20 shadow-2xl">
          <div className="flex whitespace-nowrap animate-[marquee_30s_linear_infinite] font-black text-chinese-black uppercase tracking-[0.2em] text-sm md:text-base">
            {[1,2,3,4].map(i => (
              <span key={i} className="flex-shrink-0 px-12 italic">
                Rice & Noodles ✦ Starters ✦ Soups ✦ Momo ✦ Chef's Special ✦ Fresh Ingredients ✦ Lamahi's Finest ✦ Wok-He Mastery ✦
              </span>
            ))}
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted/40"
        >
          <span className="text-[10px] uppercase tracking-widest font-bold">Scroll to Explore</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-gold/40 to-transparent" />
        </motion.div>
      </section>

      <section id="specials" className="py-40 px-6 bg-chinese-dark relative">
        <div className="max-w-7xl mx-auto">
          <SectionHeading subtitle="🔥 Limited Time" title="Today's Special" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {SPECIALS.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
              >
                <FlipCard item={item} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="menu" className="py-40 px-6 bg-chinese-surface relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <SectionHeading subtitle="👨‍🍳 Authentic Selection" title="Our Full Menu" />
          
          <div className="flex flex-wrap justify-center gap-3 p-1.5 bg-chinese-black/60 backdrop-blur-md rounded-full w-fit mx-auto border border-white/10 mb-20 shadow-2xl">
            {menuTabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-8 py-3 rounded-full transition-all text-sm font-black tracking-wide ${activeTab === tab.id ? 'bg-gold text-chinese-black shadow-xl shadow-gold/30' : 'text-muted hover:text-white'}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <motion.div
            key={activeTab}
            initial={{ opacity: 0, scale: 0.98, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {menuSections[activeTab].map((item, idx) => (
              <Card3D key={idx}>
                <div className="bg-chinese-card p-8 rounded-[30px] border border-white/5 group hover:border-gold/40 transition-all relative overflow-hidden h-full flex flex-col justify-between shadow-lg hover:shadow-gold/10">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-black text-white group-hover:text-gold transition-colors leading-tight">{item.name}</h3>
                        {item.isVeg && <div className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_12px_rgba(34,197,94,0.6)]" />}
                        {item.isSpicy && <Flame size={18} className="text-red-primary animate-pulse" />}
                      </div>
                      {item.description && <p className="text-muted/60 text-sm italic mb-4 line-clamp-2">{item.description}</p>}
                    </div>
                    <div className="text-gold font-black text-xl text-right min-w-[90px] drop-shadow-sm">Rs. {item.price}</div>
                  </div>
                  
                  <div className="flex items-end justify-between mt-6">
                    {item.isChefSpecial ? (
                      <div className="px-3 py-1 bg-gold/10 border border-gold/30 text-gold text-[10px] uppercase font-black tracking-widest rounded-md">Chef Recommended</div>
                    ) : <div />}
                    <div className="text-white/20 group-hover:text-gold/40 transition-colors">
                      <Utensils size={20} />
                    </div>
                  </div>

                  {/* Hover Decoration */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-bl-[100px]" />
                  <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-gold to-transparent opacity-0 group-hover:opacity-100 transition-all translate-y-1 group-hover:translate-y-0" />
                </div>
              </Card3D>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-6 bg-chinese-black">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-20">
          <div className="flex-1 perspective-1000">
            <motion.div
              whileHover={{ rotateY: -10, rotateX: 5, scale: 1.02 }}
              className="relative p-12 bg-chinese-surface rounded-[40px] border border-gold/20 overflow-hidden"
            >
              <div className="absolute -bottom-10 -right-10 text-[150px] opacity-10">🍜</div>
              <h3 className="text-7xl mb-12">🔥</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Items", value: "40+", icon: <Utensils /> },
                  { label: "Fresh", value: "100%", icon: <Flame /> },
                  { label: "Rating", value: "4.9", icon: <Instagram /> },
                  { label: "Experience", value: "Elite", icon: <Clock /> }
                ].map((stat, i) => (
                  <div key={i} className="bg-chinese-card/50 p-6 rounded-3xl border border-white/5 flex flex-col items-center">
                    <div className="text-gold mb-2">{stat.icon}</div>
                    <span className="text-2xl font-black text-white">{stat.value}</span>
                    <span className="text-xs text-muted font-bold uppercase mt-1">{stat.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="flex-1">
            <h2 className="text-5xl md:text-6xl font-black mb-8">Wok-Fired <br /><span className="text-gold">Mastery</span></h2>
            <p className="text-lg text-muted/80 leading-relaxed mb-10">
              For years, **The Chinese Point** has been a culinary landmark in Lamahi. We don't just cook—we craft flavors using traditional wok techniques that seal in the smoky 'Wok Hei' essence. Every ingredient is sourced at dawn to ensure peak freshness in every bite.
            </p>
            <ul className="space-y-4">
              {[
                "Open kitchen — witness the fire in action",
                "Wide range of Veg & Non-Veg delicacies",
                "Premium ingredients, authentic Chinese sauces",
                "Perfect balance of heat, salt, and soul"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-4 text-white font-medium">
                  <div className="w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center text-gold text-xs">✓</div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6 bg-chinese-dark relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-chinese-surface p-10 rounded-[30px] border border-white/5 relative overflow-hidden"
          >
            <MapPin className="text-gold mb-6" size={40} />
            <h3 className="text-3xl font-black mb-6">Find The Fire</h3>
            <p className="text-xl text-white mb-2">Lamahi, Lumbini Province, Nepal</p>
            <p className="text-muted mb-8">Near Sarthi Mart, where the aroma of Schezwan fills the air.</p>
            <a href="tel:+9779714116420" className="flex items-center gap-4 text-2xl font-black text-gold hover:text-gold-lt transition-colors">
              <Phone /> +977 971-4116420
            </a>
            <div className="mt-12 flex gap-4">
              <button className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-gold hover:text-chinese-black transition-all">
                <Instagram />
              </button>
              <button className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-gold hover:text-chinese-black transition-all">
                <Facebook />
              </button>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-chinese-surface p-10 rounded-[30px] border border-white/5"
          >
            <Clock className="text-gold mb-6" size={40} />
            <h3 className="text-3xl font-black mb-8">Opening Hours</h3>
            <div className="space-y-6">
              {[
                { day: "Mon–Fri", hours: "6:00 AM – 8:00 PM" },
                { day: "Saturday", hours: "6:00 AM – 8:00 PM" },
                { day: "Sunday", hours: "6:00 AM – 8:00 PM" }
              ].map((row, i) => (
                <div key={i} className="flex justify-between border-b border-white/5 pb-4">
                  <span className="font-bold text-white">{row.day}</span>
                  <span className="text-gold font-black">{row.hours}</span>
                </div>
              ))}
              <div className="pt-4 flex items-center gap-3 text-red-primary font-black italic uppercase">
                <Flame size={20} /> Wok is hot and ready for you
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 text-center text-muted text-sm font-medium">
        <p>© 2025 THE CHINESE POINT · LAMAHI, NEPAL · BOLDLY CRAFTED</p>
      </footer>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
