import { useState, useRef, useEffect, useLayoutEffect } from 'react'
import penguinImg from './hf_20260127_174109_79ce218e-49ce-4fc5-88e4-4809e8dc77ea.png'

/* Set favicon dynamically */
function useFavicon(url: string) {
  useLayoutEffect(() => {
    const link = document.querySelector("link[rel*='icon']") as HTMLLinkElement || document.createElement('link')
    link.type = 'image/png'
    link.rel = 'icon'
    link.href = url
    document.head.appendChild(link)
  }, [url])
}
import battlefieldImg from './hf_20260127_174412_157bea41-03f9-4272-bb60-209387e3321b.png'
import introVideo from './hf_20260127_174840_785c79d5-35e2-4bc9-9e17-093fe0f1b206.mp4'
import { TwitterIcon, SolanaIcon, CopyIcon } from './components/Icons'
import { SnowCanvas } from './components/SnowCanvas'
import { LINKS } from './lib/links'

/* ========================================
   PTSD LOGO COMPONENT
======================================== */
function PTSDLogo({ size = 'text-4xl' }: { size?: string }) {
  return (
    <div className={`ptsd-logo ${size} justify-center`}>
      <span className="p">P</span>
      <span className="t">T</span>
      <span className="s">S</span>
      <span className="d">D</span>
    </div>
  )
}

/* ========================================
   FLOATING EMOJI COMPONENT
======================================== */
function FloatingEmoji({ emoji, className }: { emoji: string; className?: string }) {
  return (
    <div className={`absolute text-3xl sm:text-5xl pointer-events-none select-none ${className}`}>
      {emoji}
    </div>
  )
}

/* ========================================
   MARQUEE COMPONENT
======================================== */
function Marquee({ children, fast = false }: { children: React.ReactNode; fast?: boolean }) {
  return (
    <div className="overflow-hidden whitespace-nowrap bg-gradient-to-r from-pink-500 via-yellow-500 to-cyan-500 py-2">
      <div className={fast ? 'marquee-fast' : 'marquee'}>
        {children}
      </div>
    </div>
  )
}

/* ========================================
   ENTER SPLASH SCREEN
======================================== */
function EnterScreen({ onEnter }: { onEnter: () => void }) {
  return (
    <div className="fixed inset-0 z-[100] bg-[#0a0e12] flex flex-col items-center justify-center overflow-hidden">
      {/* Snow on splash too */}
      <SnowCanvas />
      
      {/* Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${battlefieldImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 70%',
          opacity: 0.3,
        }}
      />
      
      {/* Vignette */}
      <div className="absolute inset-0 z-[1] bg-gradient-radial from-transparent via-black/50 to-black" />
      
      {/* Floating emojis */}
      <FloatingEmoji emoji="🚀" className="float top-[10%] left-[10%]" />
      <FloatingEmoji emoji="💎" className="float-crazy top-[15%] right-[15%]" />
      <FloatingEmoji emoji="🔥" className="float bottom-[20%] left-[8%]" />
      <FloatingEmoji emoji="❄️" className="float-crazy bottom-[15%] right-[12%]" />
      <FloatingEmoji emoji="🐧" className="float top-[25%] left-[5%]" />
      <FloatingEmoji emoji="⚔️" className="float-crazy top-[20%] right-[8%]" />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center px-4 text-center">
        {/* Warning text */}
        <div className="text-yellow-400 text-sm sm:text-base font-bold mb-6 shake">
          ⚠️ WARNING: EXTREME DEGEN CONTENT AHEAD ⚠️
        </div>
        
        {/* Penguin Image */}
        <div className="penguin-vibes mb-6">
          <img
            src={penguinImg}
            alt="PTSD"
            className="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 object-contain 
              drop-shadow-[0_0_50px_rgba(255,0,255,0.5)]"
          />
        </div>
        
        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-white/60 mb-8 max-w-md">
          A battle-hardened penguin on Solana.<br/>
          <span className="text-pink-400">Not for the faint of heart.</span>
        </p>
        
        {/* ENTER BUTTON */}
        <button
          onClick={onEnter}
          className="
            relative
            px-12 sm:px-16 py-4 sm:py-5
            text-2xl sm:text-3xl font-bold
            bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500
            text-white
            border-4 border-white
            rounded-none
            cursor-pointer
            transition-all duration-300
            hover:scale-110 hover:rotate-2
            hover:shadow-[0_0_40px_rgba(255,0,255,0.8),0_0_80px_rgba(0,255,255,0.6)]
            active:scale-95
            pulse-glow
          "
          style={{ fontFamily: 'Bangers, cursive', letterSpacing: '0.15em' }}
        >
          <span className="relative z-10">🐧 ENTER 🐧</span>
          
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-1000" />
        </button>
        
        {/* Bottom text */}
        <p className="mt-8 text-xs text-white/40">
          by clicking enter you confirm you are a certified degen 🤝
        </p>
        
        {/* Social hint */}
        <div className="mt-6 flex items-center gap-4 text-white/50">
          <TwitterIcon className="w-6 h-6 hover:text-white transition" />
          <span className="text-sm">@PTSD on Solana</span>
        </div>
      </div>
    </div>
  )
}

/* ========================================
   VIDEO INTRO SCREEN
======================================== */
function VideoIntro({ onComplete }: { onComplete: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Start at 1 second
    video.currentTime = 1

    // Play video
    video.play().catch(console.error)

    // End at 3.6 seconds (2.6 seconds of playback from 1s start)
    const timer = setTimeout(() => {
      onComplete()
    }, 2600)

    // Also end if video ends naturally (if shorter than 4s)
    const handleEnded = () => onComplete()
    video.addEventListener('ended', handleEnded)

    return () => {
      clearTimeout(timer)
      video.removeEventListener('ended', handleEnded)
    }
  }, [onComplete])

  return (
    <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center">
      <video
        ref={videoRef}
        src={introVideo}
        className="w-full h-full object-cover"
        muted
        playsInline
        autoPlay
      />
    </div>
  )
}

/* ========================================
   MAIN APP
======================================== */
function App() {
  // Set favicon to penguin image
  useFavicon(penguinImg)

  // States: 'enter' -> 'video' -> 'main'
  const [stage, setStage] = useState<'enter' | 'video' | 'main'>('enter')
  const [clicks, setClicks] = useState(0)
  const [copied, setCopied] = useState(false)

  const copyCA = () => {
    if (LINKS.ca !== 'TBA') {
      navigator.clipboard.writeText(LINKS.ca)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  // Show enter screen first
  if (stage === 'enter') {
    return <EnterScreen onEnter={() => setStage('video')} />
  }

  // Show video intro
  if (stage === 'video') {
    return <VideoIntro onComplete={() => setStage('main')} />
  }

  // Main website
  return (
    <div className="min-h-screen bg-[#0a0e12] text-white overflow-x-hidden chaos-bg animate-fadeIn">
      {/* SNOW */}
      <SnowCanvas />

      {/* ==================== TOP MARQUEE ==================== */}
      <Marquee fast>
        <span className="text-black font-bold text-xl px-4">
          🐧 PTSD TO THE MOON 🚀🚀🚀 • NOT FINANCIAL ADVICE • PENGUIN GO BRRR • 
          🔥 SOLANA SPEED 🔥 • WAGMI • PROBABLY NOTHING • LFG!!!! • 
          🐧 DIAMOND FLIPPERS 💎 • NFA DYOR • SEND IT 📈 • 
        </span>
      </Marquee>

      {/* ==================== HERO SECTION ==================== */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        
        {/* Background */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${battlefieldImg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center 70%',
          }}
        />
        
        {/* Gradients */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#0a0e12] via-transparent to-[#0a0e12]" />
        <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black/80 via-black/20 to-black/90" />

        {/* FLOATING EMOJIS */}
        <FloatingEmoji emoji="🚀" className="float top-[15%] left-[5%]" />
        <FloatingEmoji emoji="💎" className="float-crazy top-[20%] right-[8%]" />
        <FloatingEmoji emoji="🔥" className="float top-[60%] left-[3%]" />
        <FloatingEmoji emoji="💰" className="float-crazy top-[65%] right-[5%]" />
        <FloatingEmoji emoji="❄️" className="float top-[40%] left-[8%]" />
        <FloatingEmoji emoji="⚔️" className="float-crazy top-[45%] right-[10%]" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center px-4 text-center">
          
          {/* GM / GN */}
          <div className="text-xl sm:text-2xl font-bold mb-4 rainbow-text">
            {new Date().getHours() < 12 ? 'GM DEGENS' : 'GN DEGENS'} 🫡
          </div>

          {/* THE PENGUIN IMAGE */}
          <div className="relative">
            {/* THE MAIN PENGUIN IMAGE */}
            <div 
              className="penguin-vibes cursor-pointer relative"
              onClick={() => setClicks(c => c + 1)}
            >
              <img
                src={penguinImg}
                alt="PTSD - Penguin Telegram Solana DexScreener"
                className="w-72 h-72 sm:w-96 sm:h-96 md:w-[28rem] md:h-[28rem] lg:w-[32rem] lg:h-[32rem] 
                  object-contain 
                  drop-shadow-[0_0_40px_rgba(255,0,255,0.4)]
                  hover:drop-shadow-[0_0_60px_rgba(0,255,255,0.6)]
                  transition-all duration-300
                  hover:scale-105"
              />
              {clicks > 0 && (
                <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center font-bold text-lg bounce border-2 border-white">
                  {clicks}
                </div>
              )}
            </div>
          </div>

          {/* Click message */}
          {clicks > 0 && (
            <div className="mt-2 text-sm text-pink-400 blink">
              {clicks < 10 ? 'keep clicking the penguin! 🐧' : 
               clicks < 50 ? 'YOOOO ' + '🔥'.repeat(Math.min(Math.floor(clicks/5), 10)) :
               clicks < 100 ? 'ABSOLUTE DEGEN ' + '🚀'.repeat(10) :
               'PENGUIN WHISPERER UNLOCKED 👑'}
            </div>
          )}

          {/* Subtitle */}
          <div className="mt-8 space-y-2">
            <p className="text-lg sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-yellow-400 to-cyan-400">
              PENGUIN • TELEGRAM • SOLANA • DEXSCREENER
            </p>
            <p className="text-base sm:text-xl text-white/70">
              the most serious memecoin (jk lmao)
            </p>
          </div>

          {/* ====== 3 BUTTONS: TWITTER, BUY, CA ====== */}
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <a
              href={LINKS.twitter}
              target="_blank"
              rel="noreferrer"
              className="neon-btn shake-hover flex items-center gap-2"
            >
              <TwitterIcon className="w-6 h-6" />
              TWITTER
            </a>
            <a
              href={LINKS.buy}
              target="_blank"
              rel="noreferrer"
              className="neon-btn shake-hover flex items-center gap-2"
            >
              <SolanaIcon className="w-6 h-6" />
              BUY 💰
            </a>
            <button
              onClick={copyCA}
              className="neon-btn shake-hover flex items-center gap-2"
            >
              <CopyIcon className="w-6 h-6" />
              {copied ? 'COPIED! ✅' : 'CA 📋'}
            </button>
          </div>

          {/* CA Display */}
          <div className="mt-4 p-3 bg-black/50 border border-white/20 rounded-lg max-w-md">
            <div className="text-xs text-white/50 mb-1">CONTRACT ADDRESS</div>
            <div className="font-mono text-sm text-green-400 break-all">
              {LINKS.ca}
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="mt-12 text-4xl bounce">
            👇
          </div>
        </div>
      </section>

      {/* ==================== MARQUEE BREAK ==================== */}
      <Marquee>
        <span className="text-black font-bold text-xl px-4">
          🐧 PENGUIN GANG 🐧 • TANKS GO BOOM 💥 • SNOW IS COLD ❄️ • 
          SOLANA IS FAST ⚡ • WE'RE ALL GONNA MAKE IT 🤝 • 
          PTSD = PROFIT TAKING SOON (DEFINITELY) 📈 • 
          THIS IS (NOT) FINANCIAL ADVICE 🤡 •
        </span>
      </Marquee>

      {/* ==================== ABOUT SECTION ==================== */}
      <section id="about" className="relative py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-purple-900/20 to-black/90" />
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-center mb-8">
            <span className="text-4xl sm:text-6xl font-bold rainbow-text" style={{ fontFamily: 'Bangers, cursive' }}>
              WTF IS PTSD???
            </span>
          </h2>

          <div className="retro-border rounded-none p-6 sm:p-10 bg-black/60">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="spin-hover mx-auto">
                <img
                  src={penguinImg}
                  alt="PTSD Penguin"
                  className="w-40 h-40 sm:w-48 sm:h-48 object-cover object-bottom rounded-lg border-4 border-yellow-400"
                  style={{ objectPosition: 'center 70%' }}
                />
              </div>
              <div className="space-y-4 text-left">
                <p className="text-xl sm:text-2xl text-yellow-300">
                  <span className="text-[#2196F3]">P</span>enguin 🐧<br/>
                  <span className="text-[#FFEB3B]">T</span>elegram 📱<br/>
                  <span className="text-[#F44336]">S</span>olana ⚡<br/>
                  <span className="text-[#4CAF50]">D</span>exScreener 📊
                </p>
                <p className="text-base sm:text-lg text-white/70">
                  A battle-hardened penguin who has seen things. 
                  War flashbacks. Tank rumbles. Endless snow.
                  <span className="text-cyan-400"> Now he's on Solana.</span>
                </p>
                <p className="text-sm text-white/50 italic">
                  "I've seen things you people wouldn't believe..." 
                  <br/>— The Penguin, probably
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== WHY PTSD SECTION ==================== */}
      <section className="relative py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-center mb-12">
            <span className="text-4xl sm:text-6xl font-bold text-cyan-400" style={{ fontFamily: 'Bangers, cursive' }}>
              WHY PTSD??? 🤔
            </span>
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { emoji: '🐧', title: 'PENGUIN', desc: 'cute but traumatized', color: 'border-blue-500' },
              { emoji: '❄️', title: 'COLD AF', desc: 'like your ex\'s heart', color: 'border-cyan-400' },
              { emoji: '⚔️', title: 'BATTLE TESTED', desc: 'survived rug pulls', color: 'border-red-500' },
              { emoji: '🚀', title: 'TO THE MOON', desc: 'or to zero idk', color: 'border-purple-500' },
            ].map((item, i) => (
              <div
                key={item.title}
                className={`
                  p-6 border-4 border-dashed ${item.color}
                  bg-black/50 backdrop-blur-sm
                  hover:scale-110 hover:rotate-2 transition-all duration-300
                  float
                `}
                style={{ animationDelay: `${i * 0.2}s` }}
              >
                <div className="text-5xl mb-4">{item.emoji}</div>
                <h3 className="text-xl sm:text-2xl font-bold text-white" style={{ fontFamily: 'Bangers, cursive' }}>
                  {item.title}
                </h3>
                <p className="text-white/60 mt-2 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== TOKENOMICS ==================== */}
      <section id="token" className="relative py-20 px-4">
        <div className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `url(${battlefieldImg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center 80%',
            filter: 'blur(3px)',
          }}
        />
        <div className="absolute inset-0 bg-black/85" />

        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-center mb-12">
            <span className="text-4xl sm:text-6xl font-bold" style={{ fontFamily: 'Bangers, cursive' }}>
              <span className="text-green-400">TOKEN</span>
              <span className="text-yellow-400">OMICS</span>
              <span className="text-3xl sm:text-4xl"> 📊</span>
            </span>
          </h2>

          <div className="retro-border p-6 sm:p-10 bg-black/60">
            <div className="grid sm:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-4 bg-black/40 border-2 border-blue-500/50">
                <div className="text-xs text-white/50 uppercase mb-2">NAME</div>
                <div className="text-sm font-bold text-blue-300">
                  Penguin<br/>Telegram<br/>Solana<br/>DexScreener
                </div>
              </div>
              <div className="text-center p-4 bg-black/40 border-2 border-yellow-500/50 pulse-glow">
                <div className="text-xs text-white/50 uppercase mb-2">TICKER</div>
                <PTSDLogo size="text-3xl" />
              </div>
              <div className="text-center p-4 bg-black/40 border-2 border-purple-500/50">
                <div className="text-xs text-white/50 uppercase mb-2">CHAIN</div>
                <div className="flex items-center justify-center gap-2">
                  <SolanaIcon className="w-8 h-8" />
                  <span className="font-bold text-purple-300 text-xl">SOLANA</span>
                </div>
              </div>
            </div>

            {/* CA with copy */}
            <div 
              className="text-center p-6 bg-black/40 border-2 border-dashed border-green-500/50 cursor-pointer hover:border-green-400 transition-colors"
              onClick={copyCA}
            >
              <div className="text-xs text-white/50 uppercase mb-2">CONTRACT ADDRESS (click to copy)</div>
              <div className="font-mono text-lg text-green-400 break-all">
                {LINKS.ca}
              </div>
              {copied && (
                <div className="text-sm text-green-300 mt-2 blink">
                  ✅ COPIED TO CLIPBOARD!
                </div>
              )}
            </div>

            {/* 3 BUTTONS */}
            <div className="mt-8 flex flex-wrap gap-4 justify-center">
              <a href={LINKS.twitter} target="_blank" rel="noreferrer" className="neon-btn shake-hover flex items-center gap-2">
                <TwitterIcon className="w-6 h-6" />
                TWITTER
              </a>
              <a href={LINKS.buy} target="_blank" rel="noreferrer" className="neon-btn shake-hover flex items-center gap-2">
                <SolanaIcon className="w-6 h-6" />
                BUY 💰
              </a>
              <button onClick={copyCA} className="neon-btn shake-hover flex items-center gap-2">
                <CopyIcon className="w-6 h-6" />
                {copied ? 'COPIED! ✅' : 'CA 📋'}
              </button>
            </div>

            <div className="mt-8 text-center space-y-2">
              <p className="text-yellow-400 text-lg font-bold shake">
                ⚠️ NOT FINANCIAL ADVICE ⚠️
              </p>
              <p className="text-white/40 text-sm">
                we're literally just a penguin with a helmet. DYOR. NFA. WAGMI (maybe).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== BOTTOM MARQUEE ==================== */}
      <Marquee fast>
        <span className="text-black font-bold text-xl px-4">
          🐧 PTSD ARMY 🐧 • WEN LAMBO??? • PENGUIN STRONG TOGETHER 💪 • 
          COLD HANDS DIAMOND FLIPPERS 💎 • DEV IS BASED 🫡 • 
          BEARS ARE FUK 🐻 • LFG!!!! 🚀🚀🚀 •
        </span>
      </Marquee>

      {/* ==================== FOOTER ==================== */}
      <footer className="relative py-12 px-4 bg-black/90 border-t-4 border-dashed border-pink-500/50">
        <div className="max-w-4xl mx-auto text-center">
          <PTSDLogo size="text-4xl" />
          
          <p className="mt-4 text-white/50 text-sm">
            © {new Date().getFullYear()} PTSD — Just a penguin with a helmet.
          </p>
          
          <div className="mt-6 flex justify-center gap-4">
            <a href={LINKS.twitter} target="_blank" rel="noreferrer" className="hover:scale-125 transition">
              <TwitterIcon className="w-10 h-10" />
            </a>
          </div>

          <div className="mt-8 text-2xl">
            🐧❄️⚔️💎🚀🔥💰🌙
          </div>
          
          <p className="mt-4 text-xs text-white/30">
            made with 💀 and questionable decisions
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
