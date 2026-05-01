import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Heart, 
  ChevronDown, 
  Menu, 
  X, 
  Instagram, 
  Mail, 
  Music, 
  Music2,
  Twitter,
  Facebook,
  Share2,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Send
} from 'lucide-react';

// --- CONFIGURATION ---
const AUDIO_SOURCE = 'https://github.com/vinval-291/Caleb-Elizabeth/raw/refs/heads/main/DOTTi_The_Deity_-_Forever_Sweet%5B_48507%5D.mp3';
const WEDDING_DATE = '2026-05-30T10:00:00'; 

const ShareMenu = ({ color = 'white' }: { color?: string }) => {
  const shareLinks = [
    { name: 'Instagram', icon: <Instagram size={18} />, href: 'https://instagram.com' },
    { name: 'Facebook', icon: <Facebook size={18} />, href: 'https://facebook.com' },
    { name: 'Twitter', icon: <Twitter size={18} />, href: 'https://twitter.com' },
    { name: 'Tiktok', icon: <Send size={18} />, href: 'https://tiktok.com' },
    { name: 'Share', icon: <Share2 size={18} />, href: '#' },
  ];

  return (
    <div className="flex gap-4 items-center justify-center">
      {shareLinks.map((link) => (
        <motion.a
          key={link.name}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1, y: -2 }}
          className={`p-2 rounded-full border transition-all duration-300 ${
            color === 'white' 
              ? 'border-white/20 text-white hover:bg-white hover:text-wedding-gold' 
              : 'border-wedding-gold/20 text-wedding-gold hover:bg-wedding-gold hover:text-white'
          }`}
          title={`Share on ${link.name}`}
        >
          {link.icon}
        </motion.a>
      ))}
    </div>
  );
};

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Our Story', href: '#story' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Details', href: '#details' },
    { name: 'RSVP', href: '#rsvp' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-white/80 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#home" className="text-2xl font-serif tracking-widest text-wedding-gold font-light">
          C <span className="text-sm align-middle">&</span> E
        </a>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-10">
          {navItems.map((item) => (
            <a 
              key={item.name} 
              href={item.href} 
              className={`text-xs uppercase tracking-[0.2em] hover:text-wedding-gold transition-colors ${isScrolled ? 'text-gray-600' : 'text-white'}`}
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-wedding-gold"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white shadow-xl py-8 flex flex-col items-center space-y-6 md:hidden"
          >
            {navItems.map((item) => (
              <a 
                key={item.name} 
                href={item.href} 
                className="text-sm uppercase tracking-widest text-gray-800"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Countdown = () => {
  const calculateTimeLeft = () => {
    const weddingDate = new Date('2026-05-30T00:00:00').getTime();
    const now = new Date().getTime();
    const difference = weddingDate - now;
    
    if (difference <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  const items = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Min', value: timeLeft.minutes },
    { label: 'Sec', value: timeLeft.seconds },
  ];

  return (
    <div className="flex space-x-4 md:space-x-8">
      {items.map((item) => (
        <div key={item.label} className="flex flex-col items-center">
          <span className="text-3xl md:text-5xl font-serif font-light text-white">{String(item.value).padStart(2, '0')}</span>
          <span className="text-[10px] uppercase tracking-widest text-wedding-blush/80 mt-1">{item.label}</span>
        </div>
      ))}
    </div>
  );
};

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-wedding-ivory py-20 md:py-32">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0 bg-wedding-burgundy/10">
        <img 
          src="https://i.postimg.cc/ht8YxKCR/caleb-elizabeth.jpg" 
          alt="Caleb & Elizabeth" 
          className="w-full h-full object-cover md:object-[center_25%] scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-wedding-ivory/100" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative z-10 text-center px-6"
      >
        <span className="text-accent text-xl md:text-2xl text-wedding-blush mb-4 block">We Are Getting Married</span>
        <h1 className="text-5xl md:text-[8rem] font-serif text-white tracking-tighter leading-none mb-8">
          Caleb <span className="text-wedding-gold font-light">&</span> Elizabeth
        </h1>
        <div className="flex flex-col items-center">
          <div className="h-px w-24 bg-wedding-gold/60 mb-8" />
          <p className="text-white uppercase tracking-[0.5em] text-sm md:text-base mb-12 font-light">30th May, 2026</p>
          <Countdown />
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="mt-16 flex flex-col md:flex-row gap-4"
          >
            <a href="#story" className="px-8 py-3 bg-wedding-gold text-white uppercase tracking-widest text-xs font-medium hover:bg-wedding-gold/90 transition-all duration-300">
              Our Love Story
            </a>
            <a href="#rsvp" className="px-8 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white uppercase tracking-widest text-xs font-medium hover:bg-white/20 transition-all duration-300 text-center">
              RSVP Now
            </a>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="mt-12"
          >
            <p className="text-white/40 text-[10px] uppercase tracking-[0.3em] mb-4">Share our excitement</p>
            <ShareMenu />
          </motion.div>
        </div>
      </motion.div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="text-white/40" size={32} />
      </div>
    </section>
  );
};

const StorySection = () => {
  const [perspective, setPerspective] = useState<'his' | 'her'>('his');

  const storyChapters = [
    {
      title: "The First Glimpse",
      image: "https://i.postimg.cc/RZ1Yfvgk/caleb-elizabeth1.jpg",
      his: "A few days after returning from NYSC camp, I was still adjusting to the quiet of home. One late evening, I saw her walking along the road, looking beautiful yet completely drained from a long day of classes. I stopped just to check on her, and that was how I said hello. We stood there for a moment as I asked after her well-being; she gave me a tired but genuine smile that I couldn't forget. I asked for her number, she agreed, and we went our separate ways—not knowing that simple roadside meeting was the start of everything.",
      her: "We first met on a festive day, quite unexpectedly. I had just finished a long day at school and was on my way home when our paths crossed. It was a simple moment we saw each other, exchanged a few words, and he asked for my number. That was all it was at the time… just a brief encounter on the road. But from those occasional check-ins and conversations, something beautiful began to grow."
    },
    {
      title: "The Spark",
      image: "https://i.postimg.cc/rwGHWqfH/caleb-elizabeth2.jpg",
      his: "Our first date wasn't at a fancy club; it was much more personal. I prepared a meal for us at home, and we spent the evening eating, talking, and getting lost in a movie. In that quiet, indoor space, away from the rest of the world, we realized the real \"spark\" wasn't the setting—it was us.",
      her: "Our first real hangout wasn’t anything fancy and that’s what made it so special. Instead of the usual “let me impress you” date at a restaurant or somewhere elaborate, he simply invited me over to his place. I didn’t quite know what to expect. I thought maybe we’d go out later or do something big… but that wasn’t his style. When I arrived, he had already prepared a meal Egusi soup. I can never forget it. Calmly and simply, he asked me, “Will you eat fufu? I made this for you.” It wasn’t fancy at all just two wraps of fufu and a plate of egusi soup. But in that moment, it meant so much more. It was genuine, thoughtful, and real. Of course, as time went on, we had our fair share of beautiful outings and fancy places. But that simple meal my first visit, sitting there eating fufu and egusi remains one of my favorite memories."
    },
    {
      title: "The Proposal",
      image: "https://i.postimg.cc/qvcFnp1m/caleb-elizabeth3.jpg",
      his: "It wasn’t on a distant coast, but in the warmth of an elegant apartment surrounded by those who love us. With the help of her closest friends, I asked the question that would change our lives forever. As she overwhelmed with joy and tears, and with our friends and family cheering us on, she said \"Yes.\" It was a perfect, lovely beginning to our forever.",
      her: "The proposal was a complete surprise I truly had no idea it was coming. In fact, I wasn’t expecting it at all, not even this year. I had gone out as usual, and when I got back home, I was shocked to see my friends gathered there. I kept wondering, “What are you all doing here?” Then I saw him… my love, standing there, ready to ask the most important question. In that moment, everything else faded away. He asked, “Will you marry me?” And honestly, my answer came so easily “Why not?” Because he is everything I’ve ever wanted in a man and more. It wasn’t anything overly fancy just an intimate moment in our home, surrounded by a few close friends and loved ones. But it was perfect. It was real. It was us."
    }
  ];

  return (
    <section id="story" className="py-12 bg-wedding-ivory overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-wedding-gold uppercase tracking-[0.3em] text-xs font-medium block mb-2">Since the beginning</span>
          <h2 className="heading-serif text-4xl md:text-6xl text-gray-900 mb-6">Our Journey</h2>
          
          {/* Perspective Toggle */}
          <div className="flex justify-center mb-12">
            <div className="bg-wedding-gold/10 p-1 rounded-full flex gap-1 relative">
              <motion.div 
                className="absolute inset-1 bg-wedding-gold rounded-full"
                initial={false}
                animate={{ x: perspective === 'his' ? 0 : '100%' }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                style={{ width: 'calc(50% - 4px)' }}
              />
              <button 
                onClick={() => setPerspective('his')}
                className={`relative px-6 py-2 text-xs uppercase tracking-widest font-bold transition-colors duration-300 ${perspective === 'his' ? 'text-white' : 'text-wedding-gold hover:text-wedding-gold/70'}`}
              >
                Caleb's Story
              </button>
              <button 
                onClick={() => setPerspective('her')}
                className={`relative px-6 py-2 text-xs uppercase tracking-widest font-bold transition-colors duration-300 ${perspective === 'her' ? 'text-white' : 'text-wedding-gold hover:text-wedding-gold/70'}`}
              >
                Elizabeth's Story
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-24">
          {storyChapters.map((story, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className={`flex flex-col ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8 md:gap-16`}
            >
              <div className="w-full md:w-5/12">
                <div className="relative group">
                  <div className="absolute -inset-2 border border-wedding-gold/20 translate-x-4 translate-y-4 pointer-events-none group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-500" />
                  <img 
                    src={story.image} 
                    alt={story.title} 
                    className="w-full aspect-[4/5] object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 shadow-xl"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
              <div className="w-full md:w-7/12 space-y-4">
                <span className="text-wedding-gold font-serif italic text-2xl opacity-40">Chapter {idx + 1}</span>
                <h3 className="heading-serif text-2xl md:text-4xl text-gray-800">{story.title}</h3>
                
                <div className="relative min-h-[160px]">
                  <AnimatePresence mode="wait">
                    <motion.p 
                      key={perspective}
                      initial={{ opacity: 0, x: perspective === 'his' ? -20 : 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: perspective === 'his' ? 20 : -20 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="text-gray-600 font-light leading-relaxed text-base italic md:text-lg"
                    >
                      {perspective === 'his' ? story.his : story.her}
                    </motion.p>
                  </AnimatePresence>
                </div>

                <div className="flex items-center gap-4 pt-4">
                  <div className="h-px w-8 bg-wedding-gold" />
                  <span className="text-[10px] uppercase tracking-widest text-wedding-gold font-bold">
                    Perspectives of Love
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const GallerySection = () => {
  const images = [
    "https://i.postimg.cc/ht8YxKCR/caleb-elizabeth.jpg",
    "https://i.postimg.cc/RZ1Yfvgk/caleb-elizabeth1.jpg",
    "https://i.postimg.cc/rwGHWqfH/caleb-elizabeth2.jpg",
    "https://i.postimg.cc/qvcFnp1m/caleb-elizabeth3.jpg",
    "https://i.postimg.cc/3xjqp3tt/caleb-elizabeth4.jpg",
    "https://i.postimg.cc/52WG6Xmc/caleb-elizabeth5.jpg",
    "https://i.postimg.cc/8zg3j7mx/caleb-elizabeth6.jpg",
    "https://i.postimg.cc/ht8YxKCR/caleb-elizabeth.jpg",
  ];

  // Group images for mobile carousel (4 per slide)
  const mobileSlides = [];
  for (let i = 0; i < images.length; i += 4) {
    mobileSlides.push(images.slice(i, i + 4));
  }

  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const openLightbox = (index: number) => setSelectedImage(index);
  const closeLightbox = () => setSelectedImage(null);
  const nextImage = () => setSelectedImage((prev) => (prev !== null ? (prev + 1) % images.length : null));
  const prevImage = () => setSelectedImage((prev) => (prev !== null ? (prev - 1 + images.length) % images.length : null));

  return (
    <section id="gallery" className="py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="heading-serif text-4xl md:text-5xl text-gray-900 mb-4">Captured Moments</h2>
          <div className="flex justify-center items-center gap-4">
            <div className="h-px w-8 bg-wedding-gold" />
            <Heart className="text-wedding-gold fill-wedding-gold/20" size={16} />
            <div className="h-px w-8 bg-wedding-gold" />
          </div>
        </div>

        {/* Mobile Carousel - Visible only on mobile */}
        <div className="block md:hidden relative mb-12">
          <motion.div 
            className="flex"
            animate={{ x: `-${currentSlide * 100}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {mobileSlides.map((slide, slideIdx) => (
              <div key={slideIdx} className="min-w-full grid grid-cols-2 gap-2 p-1">
                {slide.map((img, imgIdx) => {
                  const actualIdx = slideIdx * 4 + imgIdx;
                  return (
                    <div 
                      key={imgIdx} 
                      onClick={() => openLightbox(actualIdx)}
                      className="aspect-square relative overflow-hidden rounded-lg shadow-sm cursor-pointer"
                    >
                      <img 
                        src={img} 
                        alt={`Gallery ${actualIdx}`} 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  );
                })}
              </div>
            ))}
          </motion.div>
          
          {/* Carousel Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {mobileSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${currentSlide === idx ? 'bg-wedding-gold w-6' : 'bg-wedding-gold/30'}`}
              />
            ))}
          </div>
          <p className="text-center text-[10px] text-gray-400 mt-6 uppercase tracking-widest italic">Swipe to see more</p>
        </div>

        {/* Desktop Grid - Visible on md+ */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6">
          {images.map((img, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => openLightbox(idx)}
              className="relative group overflow-hidden rounded-lg shadow-md cursor-pointer aspect-square"
            >
              <motion.img 
                src={img} 
                alt={`Gallery ${idx}`} 
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6 }}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <motion.div 
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute inset-0 bg-wedding-burgundy/40 backdrop-blur-[1px] flex flex-col items-center justify-center p-4 transition-opacity duration-500"
              >
                <div className="text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <Heart className="text-white mx-auto mb-2 fill-white/20" size={24} />
                  <p className="text-white text-[10px] uppercase tracking-widest font-bold mb-4">Eternal Love</p>
                  <div onClick={(e) => e.stopPropagation()}>
                    <ShareMenu />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-12 flex flex-col items-center">
          <p className="text-[10px] text-gray-400 uppercase tracking-widest italic mb-4">Share our journey</p>
          <ShareMenu color="gold" />
        </div>
      </div>


      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-12"
          >
            <button 
              onClick={closeLightbox}
              className="absolute top-6 right-6 text-white hover:text-wedding-gold transition-colors z-50 p-2 bg-white/10 rounded-full"
            >
              <X size={32} />
            </button>

            <button 
              onClick={prevImage}
              className="absolute left-4 md:left-8 text-white hover:text-wedding-gold transition-colors z-50 p-2 bg-white/10 rounded-full"
            >
              <ChevronLeft size={32} />
            </button>

            <button 
              onClick={nextImage}
              className="absolute right-4 md:right-8 text-white hover:text-wedding-gold transition-colors z-50 p-2 bg-white/10 rounded-full"
            >
              <ChevronRight size={32} />
            </button>

            <motion.div
              key={selectedImage}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-full max-h-full flex flex-col items-center"
            >
              <img 
                src={images[selectedImage]} 
                alt={`Lightbox image ${selectedImage}`} 
                className="max-w-full max-h-[85vh] object-contain rounded-sm shadow-2xl"
                referrerPolicy="no-referrer"
              />
              <div className="mt-6 flex flex-col items-center">
                <p className="text-white/60 text-[10px] uppercase tracking-widest mb-4">
                  Image {selectedImage + 1} of {images.length}
                </p>
                <div onClick={(e) => e.stopPropagation()}>
                  <ShareMenu />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const DetailsSection = () => {
  const details = [
    {
      icon: <Calendar size={24} className="text-wedding-gold" />,
      title: "Civil Ceremony",
      date: "Thursday, May 14th, 2026",
      location: "Marriage Registry, Ikorodu",
      address: "Lagos State, Nigeria"
    },
    {
      icon: <Heart size={24} className="text-wedding-gold" />,
      title: "Traditional Wedding",
      date: "Saturday, May 30th, 2026",
      time: "12:00 Noon",
      location: "HI KIDS EVENT HALL",
      address: "Ebute Ikorodu Road, Lagos",
      note: "Reception follows immediately at the same venue."
    },
  ];

  return (
    <section id="details" className="py-16 bg-wedding-blush/30">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="space-y-8">
            <div>
              <span className="text-wedding-gold uppercase tracking-[0.3em] text-xs font-semibold block mb-4">The Celebration</span>
              <h2 className="heading-serif text-4xl md:text-6xl text-gray-900 mb-6 font-bold leading-tight">Where & When</h2>
            </div>
            <p className="text-gray-600 font-light leading-relaxed text-lg">
              We can’t wait to celebrate these special milestones with you. 
              Our journey, which began with a simple "hello" on a roadside, leads us to these two joyful days.
            </p>
            
            <div className="bg-white p-8 rounded-lg shadow-sm border-l-4 border-wedding-gold">
              <h4 className="heading-serif text-xl mb-4 text-gray-800">RSVP & Social</h4>
              <p className="text-gray-600 mb-6 text-sm">Please let us know if you can make it by contacting:</p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div>
                  <p className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-1">Hassan</p>
                  <a href="tel:08020637748" className="text-wedding-gold font-medium hover:underline">08020637748</a>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-1">Samson</p>
                  <a href="tel:07063866157" className="text-wedding-gold font-medium hover:underline">07063866157</a>
                </div>
              </div>
              <div className="pt-6 border-t border-gray-100">
                <p className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-2">Event Hashtag</p>
                <p className="text-2xl font-serif text-wedding-burgundy tracking-wide">#TheCalebs2026</p>
              </div>
            </div>
          </div>
          
          <div className="grid gap-8">
            {details.map((detail, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="bg-white p-8 shadow-md border border-wedding-gold/10 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                  {detail.icon}
                </div>
                <div className="mb-6 bg-wedding-gold/10 w-12 h-12 flex items-center justify-center rounded-full">
                  {detail.icon}
                </div>
                <h3 className="heading-serif text-2xl md:text-3xl mb-4 text-gray-900">{detail.title}</h3>
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3 text-wedding-burgundy font-semibold">
                    <Calendar size={18} />
                    <span>{detail.date}</span>
                  </div>
                  {detail.time && (
                    <div className="flex items-center gap-3 text-gray-600">
                      <Clock size={18} />
                      <span>{detail.time}</span>
                    </div>
                  )}
                  <div className="flex items-start gap-3 text-gray-800">
                    <MapPin size={18} className="mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-bold">{detail.location}</p>
                      <p className="text-sm text-gray-500">{detail.address}</p>
                    </div>
                  </div>
                  {detail.note && (
                    <p className="text-sm font-medium text-wedding-gold mt-2 italic">{detail.note}</p>
                  )}
                </div>
                
                {detail.title === "Traditional Wedding" && (
                  <div className="pt-6 border-t border-gray-100 mb-6">
                    <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-3">Color of the Day</p>
                    <div className="flex flex-wrap gap-2">
                       {['White', 'Purple', 'Navy Blue', 'Sky Blue'].map((color) => (
                         <span key={color} className="px-3 py-1 bg-gray-50 border border-gray-100 rounded-full text-[10px] uppercase tracking-wider font-semibold text-gray-600">
                           {color}
                         </span>
                       ))}
                    </div>
                  </div>
                )}

                <button className="text-xs uppercase tracking-widest text-wedding-gold border-b-2 border-wedding-gold font-bold hover:opacity-70 transition-opacity">
                  Add to Calendar
                </button>
              </motion.div>
            ))}
          </div>
        </div>


        {/* Map Placeholder */}
        <div className="h-96 w-full rounded-lg overflow-hidden relative shadow-inner border border-wedding-gold/20">
          <div className="absolute inset-0 bg-wedding-sage/10 flex flex-col items-center justify-center text-center p-8 bg-[url('https://i.postimg.cc/3xjqp3tt/caleb-elizabeth4.jpg')] bg-cover bg-center">
             <div className="absolute inset-0 bg-white/60" />
             <div className="relative z-10 flex flex-col items-center">
                <MapPin className="text-wedding-burgundy mb-4" size={48} />
                <h4 className="heading-serif text-2xl text-gray-800 mb-2 font-bold">Location Hub</h4>
                <p className="text-gray-600 mb-6">Explore the beautiful venues we've selected for our celebration.</p>
                <button className="px-6 py-2 bg-wedding-burgundy text-white rounded-full text-sm font-medium hover:bg-wedding-burgundy/90 transition-colors shadow-lg">
                  View Full Map
                </button>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const RSVPSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    attendance: 'yes',
    guests: '1',
    dietary: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
    }, 800);
  };

  return (
    <section id="rsvp" className="relative py-10 bg-wedding-burgundy overflow-hidden">
      {/* Background Decorative */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-wedding-gold/10 rounded-full blur-[100px] -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-400/5 rounded-full blur-[100px] -ml-48 -mb-48" />

      <div className="max-w-xl mx-auto px-6 relative z-10">
        <div className="text-center mb-8">
          <h2 className="heading-serif text-4xl md:text-5xl text-white mb-2">RSVP</h2>
          <p className="text-wedding-blush/70 font-light italic text-sm">Please respond by April 30, 2026</p>
        </div>

        <div className={`glass-card p-8 md:p-12 transition-all duration-700 ${isSubmitted ? 'translate-y-4' : 'translate-y-0'}`}>
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-wedding-gold font-bold">Full Name</label>
                  <input 
                    required
                    type="text" 
                    className="w-full bg-transparent border-b border-wedding-gold/30 focus:border-wedding-gold outline-none py-2 text-white placeholder-wedding-blush/30"
                    placeholder="E.g. John Doe"
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-wedding-gold font-bold">Email</label>
                  <input 
                    required
                    type="email" 
                    className="w-full bg-transparent border-b border-wedding-gold/30 focus:border-wedding-gold outline-none py-2 text-white placeholder-wedding-blush/30"
                    placeholder="john@example.com"
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-wedding-gold font-bold block mb-4">Will you attend?</label>
                <div className="flex gap-8">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input 
                      type="radio" 
                      name="attendance" 
                      className="hidden" 
                      checked={formData.attendance === 'yes'}
                      onChange={() => setFormData({...formData, attendance: 'yes'})}
                    />
                    <div className={`w-4 h-4 rounded-full border border-wedding-gold flex items-center justify-center ${formData.attendance === 'yes' ? 'bg-wedding-gold' : 'bg-transparent'}`}>
                      {formData.attendance === 'yes' && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                    </div>
                    <span className="text-white text-sm font-light">Yes, I'll be there</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input 
                      type="radio" 
                      name="attendance" 
                      className="hidden" 
                      checked={formData.attendance === 'no'}
                      onChange={() => setFormData({...formData, attendance: 'no'})}
                    />
                    <div className={`w-4 h-4 rounded-full border border-wedding-gold flex items-center justify-center ${formData.attendance === 'no' ? 'bg-wedding-gold' : 'bg-transparent'}`}>
                      {formData.attendance === 'no' && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                    </div>
                    <span className="text-white text-sm font-light">Regretfully, no</span>
                  </label>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-wedding-gold font-bold">Number of Guests</label>
                <select 
                  className="w-full bg-transparent border-b border-wedding-gold/30 focus:border-wedding-gold outline-none py-2 text-white"
                  onChange={(e) => setFormData({...formData, guests: e.target.value})}
                >
                  <option value="1" className="text-gray-900">1 Guest</option>
                  <option value="2" className="text-gray-900">2 Guests</option>
                  <option value="3" className="text-gray-900">3 Guests</option>
                  <option value="4" className="text-gray-900">4+ Guests</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-wedding-gold font-bold">A message for the couple</label>
                <textarea 
                  rows={3}
                  className="w-full bg-transparent border-b border-wedding-gold/30 focus:border-wedding-gold outline-none py-2 text-white placeholder-wedding-blush/30 overflow-hidden"
                  placeholder="Share a sweet word or memory..."
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                />
              </div>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-4 bg-wedding-gold text-white uppercase tracking-[.3em] font-bold text-xs mt-8 shadow-lg shadow-black/20 hover:bg-wedding-gold/90 transition-all"
              >
                Send Response
              </motion.button>
            </form>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <CheckCircle2 className="mx-auto text-wedding-gold mb-6" size={64} />
              <h3 className="heading-serif text-3xl text-white mb-4">Response Received</h3>
              <p className="text-wedding-blush/80 leading-relaxed">
                Thank you for celebrating Caleb & Elizabeth's love story with us 💛<br/>
                We've sent a confirmation to {formData.email}.
              </p>
              <button 
                onClick={() => setIsSubmitted(false)}
                className="mt-8 text-xs uppercase tracking-widest text-wedding-gold border-b border-wedding-gold pb-1"
              >
                Edit Response
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

const QuoteSection = () => {
  return (
    <section className="py-10 bg-wedding-ivory relative overflow-hidden border-y border-wedding-gold/5">
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/floral-paper.png')]" />
      </div>
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           transition={{ duration: 1.5 }}
        >
          <div className="flex justify-center mb-8">
            <Heart size={24} className="text-wedding-gold/30" />
          </div>
          <blockquote className="heading-serif text-3xl md:text-5xl text-gray-800 leading-tight mb-8">
            “Two hearts, one journey, forever begins here.”
          </blockquote>
          <p className="text-accent text-xl text-wedding-gold italic">— The Wedding of Caleb & Elizabeth</p>
        </motion.div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <div className="font-serif text-3xl text-wedding-gold mb-8 italic">C & E</div>
        <div className="flex justify-center space-x-6 mb-12">
          <a href="#" className="p-3 bg-gray-50 rounded-full hover:bg-wedding-blush/50 transition-colors">
            <Instagram size={20} className="text-gray-400 hover:text-wedding-gold" />
          </a>
          <a href="#" className="p-3 bg-gray-50 rounded-full hover:bg-wedding-blush/50 transition-colors">
            <Mail size={20} className="text-gray-400 hover:text-wedding-gold" />
          </a>
          <a href="#" className="p-3 bg-gray-50 rounded-full hover:bg-wedding-blush/50 transition-colors">
            <Clock size={20} className="text-gray-400 hover:text-wedding-gold" />
          </a>
        </div>
        <nav className="flex justify-center space-x-8 mb-12">
          {['Home', 'Story', 'Details', 'RSVP'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-[10px] uppercase tracking-widest text-gray-400 hover:text-wedding-gold font-bold">
              {item}
            </a>
          ))}
        </nav>
        <p className="text-[10px] uppercase tracking-[0.3em] text-gray-300">
          Made with Love &bull; Caleb & Elizabeth 2026
        </p>
        <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 mt-6 font-light">
          website is a courtesy of <a href="https://www.linkedin.com/in/kuteyi-oluwaloye-vincent" target="_blank" rel="noopener noreferrer" className="text-wedding-gold hover:underline font-bold transition-all">Kuteyi Vincent</a>
        </p>
      </div>
    </footer>
  );
};

// --- Music Toggle (Bonus) ---
const MusicToggle = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioRef.current) {
      // NOTE: Replace AUDIO_SOURCE at the top of the file with your Git/Uploaded MP3 link
      const a = new Audio(AUDIO_SOURCE);
      a.loop = true;
      a.crossOrigin = "anonymous";
      audioRef.current = a;
    }

    const audio = audioRef.current;

    if (isPlaying) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.error("Playback failed (likely autoplay restriction):", error);
          setIsPlaying(false);
        });
      }
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  // Handle source errors
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleError = (e: any) => {
      console.warn("Audio source failed. If using GitHub, ensure it is the RAW link.", e);
      // Optional fallback if the main source fails
      if (audio.src !== AUDIO_SOURCE) return; 
      audio.src = 'https://github.com/vinval-291/Caleb-Elizabeth/raw/refs/heads/main/DOTTi_The_Deity_-_Forever_Sweet%5B_48507%5D.mp3'; 
      if (isPlaying) audio.play().catch(err => console.error("Fallback failed:", err));
    };
    audio.addEventListener('error', handleError);
    return () => audio.removeEventListener('error', handleError);
  }, [isPlaying]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button 
        onClick={() => setIsPlaying(!isPlaying)}
        className="w-12 h-12 bg-white/80 backdrop-blur-md border border-wedding-gold/20 rounded-full flex items-center justify-center text-wedding-gold shadow-lg hover:bg-white transition-all transform hover:scale-110"
        title={isPlaying ? "Pause Music" : "Play Forever Sweet - Dotti"}
      >
        {isPlaying ? <Music className="animate-pulse" /> : <Music2 />}
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full bg-wedding-gold opacity-75 ${isPlaying ? 'block' : 'hidden'}`}></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-wedding-gold"></span>
        </span>
      </button>
    </div>
  );
};

// --- Main App ---
export default function App() {
  useEffect(() => {
    console.log("App mounted correctly");
  }, []);

  return (
    <div className="scroll-smooth bg-wedding-ivory min-h-screen">
      <Navbar />
      <Hero />
      <QuoteSection />
      <StorySection />
      <GallerySection />
      <DetailsSection />
      <RSVPSection />
      <Footer />
      <MusicToggle />
    </div>
  );
}

