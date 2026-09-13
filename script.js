/* =====================================================================
   EVERYTHING YOU'D WANT TO PERSONALIZE LIVES IN THIS ONE OBJECT.
   Edit the values below — you never need to touch the HTML or the
   rest of this file to make the site yours.
===================================================================== */
const loveStory = {

  proposerName: "Me",
  partnerName:  "You",

  // shown as "Dear {partnerName}," in chapter one
  personalMessage:
    "Some people enter our lives quietly, without any warning, and somehow become the part of the story you never want to end. That's what happened when I met you.",

  loveLetter:
    "If you're reading this, it means you finally opened it — just like you opened up a part of my life I didn't know was waiting to be filled. Thank you for every ordinary afternoon that became a memory, every terrible joke you laughed at anyway, and every quiet moment that felt like home. I don't know what our story still has written for us, but I know I want you on every page of it.",

  // optional — set to null to hide the countdown section entirely
  specialDate: "2027-02-14T00:00:00",
  specialDateLabel: "Our Special Day",

  memories: [
    { date: "The beginning", title: "The First Time We Met", desc: "The ordinary afternoon that turned out to be the start of everything." },
    { date: "Soon after",    title: "Our First Conversation", desc: "We talked for hours about nothing and everything at once." },
    { date: "Somewhere in between", title: "The Memory That Still Makes Us Laugh", desc: "You know the one. We still bring it up." },
    { date: "Quietly",       title: "When I Realized I Loved You", desc: "There wasn't a single moment — just a slow certainty that grew." },
    { date: "Always",        title: "Our Favorite Memory", desc: "The one we keep coming back to, on ordinary days and hard ones." },
    { date: "Today",         title: "Right Now", desc: "The next page, waiting to be written." },
  ],

  galleryCaptions: [
    "That smile.", "One of my favorite days.", "A memory I'll always keep.",
    "Look at us.", "I'd relive this one.", "This one, especially."
  ],

  reasons: [
    { glyph: "❤", text: "Your smile" },
    { glyph: "🌸", text: "Your kindness" },
    { glyph: "😂", text: "The way you make me laugh" },
    { glyph: "🌙", text: "How you make ordinary days special" },
    { glyph: "✨", text: "The person I become around you" },
    { glyph: "☕", text: "How you remember the small things" },
    { glyph: "🤍", text: "The way you say my name" },
    { glyph: "🎧", text: "Our shared terrible taste in music" },
  ],

  // yes/no question game — add as many as you like, the code handles the rest
  questions: [
    {
      emoji: "❤",
      question: "Do you like me?",
      yes: "Good. I already knew that. 😌",
      no: ["Hmm... suspicious. 👀", "Are you sure about that? 😂", "I think your finger slipped. 🙈"]
    },
    {
      emoji: "🥺",
      question: "Do you think I'm cute?",
      yes: "Correct answer. Very intelligent.",
      no: ["Please reconsider. 😂", "Wow... I'm offended. 😭"]
    },
    {
      emoji: "💬",
      question: "Do you enjoy talking to me?",
      yes: "I knew our conversations were special. ❤",
      no: ["Then why are you still here? 🤨😂"]
    },
    {
      emoji: "🌹",
      question: "Would you go on a date with me?",
      yes: "Date officially requested. 💕",
      no: ["I'll pretend I didn't see that. 😭"]
    },
    {
      emoji: "👀",
      question: "Am I your favorite person?",
      yes: "Excellent choice. 😌",
      no: ["Wrong answer detected. 🚨😂"]
    },
  ],

  dreams: [
    { glyph: "✈️", title: "Travel somewhere new", text: "Anywhere neither of us has been — we'll figure the rest out when we're there." },
    { glyph: "🏠", title: "Build a home together", text: "Nothing fancy. Just somewhere that's ours." },
    { glyph: "🍳", title: "Cook terrible recipes", text: "And eat them anyway, laughing the whole time." },
    { glyph: "🌅", title: "Watch countless sunsets", text: "From wherever we happen to be that year." },
    { glyph: "📸", title: "Fill albums with memories", text: "Ordinary Tuesdays included." },
    { glyph: "👵👴", title: "Grow old, still annoying each other", text: "That's the whole plan, really." },
  ],
};


/* =====================================================================
   APP
===================================================================== */
const App = {

  reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  noClicksTotal: 0,

  init(){
    this.injectContent();
    this.setupLoader();
    this.setupScrollProgress();
    this.setupChapterNav();
    this.setupRevealObserver();
    this.setupHero();
    this.setupTypewriters();
    this.setupEnvelope();
    this.setupReasons();
    this.setupDreams();
    this.setupQuestionGame();
    this.setupProposal();
    this.setupCelebration();
    this.setupSecret();
    this.setupMusic();
    this.setupCountdown();
    this.setupCursorHearts();
  },

  /* ---------------------------------------------------------------
     Fill in dynamic content from the config object
  --------------------------------------------------------------- */
  injectContent(){
    document.getElementById("dearName").textContent = `Dear ${loveStory.partnerName},`;
    document.getElementById("personalMessage").dataset.full = loveStory.personalMessage;
    document.getElementById("letterText").dataset.full = loveStory.loveLetter;
    document.getElementById("letterFrom").textContent = loveStory.proposerName;
    document.getElementById("namesLine").textContent = `${loveStory.partnerName} & ${loveStory.proposerName}`;

    // timeline
    const timeline = document.getElementById("timeline");
    timeline.innerHTML = loveStory.memories.map(m => `
      <div class="timeline-item reveal">
        <div class="timeline-date">${m.date}</div>
        <div class="timeline-title">${m.title}</div>
        <div class="timeline-desc">${m.desc}</div>
      </div>
    `).join("");

    // gallery
    const gallery = document.getElementById("galleryGrid");
    gallery.innerHTML = loveStory.galleryCaptions.map(cap => `
      <div class="gallery-item reveal"><span>${cap}</span></div>
    `).join("");

    // reasons (show first 4 initially)
    this.reasonQueue = [...loveStory.reasons];
    this.renderReasons(4);

    // dreams
    const dreams = document.getElementById("dreamsGrid");
    dreams.innerHTML = loveStory.dreams.map(d => `
      <div class="dream-card reveal" tabindex="0">
        <span class="glyph">${d.glyph}</span>
        <h4>${d.title}</h4>
        <p>${d.text}</p>
      </div>
    `).join("");

    // question totals
    document.getElementById("qTotal").textContent = loveStory.questions.length;

    // countdown title
    document.getElementById("countdownTitle").textContent = loveStory.specialDateLabel;
    if(!loveStory.specialDate){
      document.getElementById("countdown").style.display = "none";
    }
  },

  renderReasons(count){
    const grid = document.getElementById("reasonsGrid");
    const slice = this.reasonQueue.splice(0, count);
    slice.forEach((r, i) => {
      const el = document.createElement("div");
      el.className = "reason-card";
      el.style.animationDelay = (i * 0.08) + "s";
      el.innerHTML = `<span class="glyph">${r.glyph}</span>${r.text}`;
      grid.appendChild(el);
    });
    if(this.reasonQueue.length === 0){
      document.getElementById("moreReasonsBtn").style.display = "none";
    }
  },

  /* ---------------------------------------------------------------
     Loader
  --------------------------------------------------------------- */
  setupLoader(){
    const loader = document.getElementById("loader");
    const glyph = document.getElementById("loaderGlyph");
    const frames = ["❤", "💕", "💍"];
    let i = 0;
    const interval = setInterval(() => {
      i++;
      if(i < frames.length){ glyph.textContent = frames[i]; }
    }, 380);
    window.setTimeout(() => {
      clearInterval(interval);
      loader.classList.add("done");
    }, 1250);
  },

  /* ---------------------------------------------------------------
     Scroll progress bar
  --------------------------------------------------------------- */
  setupScrollProgress(){
    const fill = document.getElementById("progressFill");
    const update = () => {
      const h = document.documentElement;
      const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
      fill.style.width = (scrolled || 0) + "%";
    };
    document.addEventListener("scroll", update, { passive:true });
    update();
  },

  /* ---------------------------------------------------------------
     Floating chapter nav — highlight + click to scroll
  --------------------------------------------------------------- */
  setupChapterNav(){
    const buttons = [...document.querySelectorAll(".chapter-nav button")];
    buttons.forEach(btn => {
      btn.addEventListener("click", () => {
        const target = document.getElementById(btn.dataset.target);
        if(target) target.scrollIntoView({ behavior: this.reducedMotion ? "auto" : "smooth" });
      });
    });

    const sections = buttons.map(b => document.getElementById(b.dataset.target)).filter(Boolean);
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          buttons.forEach(b => b.classList.remove("active"));
          const match = buttons.find(b => b.dataset.target === entry.target.id);
          if(match) match.classList.add("active");
        }
      });
    }, { threshold: 0.5 });
    sections.forEach(s => obs.observe(s));
  },

  /* ---------------------------------------------------------------
     Generic scroll-reveal for anything with .reveal
  --------------------------------------------------------------- */
  setupRevealObserver(){
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry, idx) => {
        if(entry.isIntersecting){
          const delay = this.reducedMotion ? 0 : (idx % 6) * 70;
          setTimeout(() => entry.target.classList.add("active"), delay);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    // observe existing + dynamically injected .reveal elements
    document.querySelectorAll(".reveal").forEach(el => obs.observe(el));
    this.revealObserver = obs;

    // re-scan after dynamic content injected (timeline/gallery/dreams)
    setTimeout(() => {
      document.querySelectorAll(".reveal:not(.active)").forEach(el => obs.observe(el));
    }, 50);
  },

  /* ---------------------------------------------------------------
     Hero: "Open My Heart" cinematic reveal
  --------------------------------------------------------------- */
  setupHero(){
    const btn = document.getElementById("openHeartBtn");
    const revealed = document.getElementById("revealedContent");
    const hero = document.getElementById("hero");

    btn.addEventListener("click", () => {
      btn.disabled = true;
      btn.style.transform = "scale(1.08)";
      this.spawnHearts(document.body, 14);

      // try to start music (browser may block until interaction — this counts as one)
      const audio = document.getElementById("bgMusic");
      audio.play().then(() => {
        document.getElementById("musicToggle").classList.add("playing");
      }).catch(() => { /* no audio file present / autoplay blocked — silently ignore */ });

      setTimeout(() => {
        revealed.style.transition = "opacity 1.1s ease";
        revealed.style.opacity = "1";
        hero.scrollIntoView({ behavior: this.reducedMotion ? "auto" : "smooth" });
        setTimeout(() => {
          document.getElementById("message").scrollIntoView({ behavior: this.reducedMotion ? "auto" : "smooth" });
        }, 500);
      }, 450);
    });
  },

  /* ---------------------------------------------------------------
     Typewriter reveal for important sentences (personal message + letter)
  --------------------------------------------------------------- */
  setupTypewriters(){
    const targets = document.querySelectorAll(".typewriter-target");
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting && !entry.target.dataset.typed){
          entry.target.dataset.typed = "true";
          this.typeText(entry.target, entry.target.dataset.full);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    targets.forEach(t => obs.observe(t));
  },

  typeText(el, text){
    if(this.reducedMotion){ el.textContent = text; return; }
    el.textContent = "";
    let i = 0;
    const speed = 16;
    const step = () => {
      el.textContent += text[i];
      i++;
      if(i < text.length){ setTimeout(step, speed); }
    };
    step();
  },

  /* ---------------------------------------------------------------
     Envelope / love letter
  --------------------------------------------------------------- */
  setupEnvelope(){
    const envelope = document.getElementById("envelope");
    const paper = document.getElementById("letterPaper");
    envelope.addEventListener("click", () => {
      if(envelope.classList.contains("open")) return;
      envelope.classList.add("open");
      setTimeout(() => {
        paper.classList.add("shown");
        // re-trigger typewriter now that it's visible
        const target = document.getElementById("letterText");
        if(!target.dataset.typed){
          target.dataset.typed = "true";
          this.typeText(target, target.dataset.full);
        }
      }, 350);
    });
  },

  /* ---------------------------------------------------------------
     "Give me another reason" button
  --------------------------------------------------------------- */
  setupReasons(){
    document.getElementById("moreReasonsBtn").addEventListener("click", () => {
      this.renderReasons(2);
    });
  },

  /* ---------------------------------------------------------------
     Future dream cards — click to expand
  --------------------------------------------------------------- */
  setupDreams(){
    document.getElementById("dreamsGrid").addEventListener("click", (e) => {
      const card = e.target.closest(".dream-card");
      if(card) card.classList.toggle("open");
    });
  },

  /* ---------------------------------------------------------------
     Optional countdown to a special date
  --------------------------------------------------------------- */
  setupCountdown(){
    if(!loveStory.specialDate) return;
    const grid = document.getElementById("countdownGrid");
    const target = new Date(loveStory.specialDate).getTime();

    const render = (d,h,m,s) => {
      grid.innerHTML = [
        [d,"days"], [h,"hrs"], [m,"min"], [s,"sec"]
      ].map(([val,label]) => `
        <div class="countdown-cell">
          <span class="num">${String(val).padStart(2,"0")}</span>
          <span class="label">${label}</span>
        </div>
      `).join("");
    };

    const tick = () => {
      const diff = target - Date.now();
      if(diff <= 0){
        grid.innerHTML = `<p class="serif-lg">Today is our special day. ❤</p>`;
        clearInterval(this._countdownInterval);
        return;
      }
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      render(d,h,m,s);
    };
    tick();
    this._countdownInterval = setInterval(tick, 1000);
  },

  /* ---------------------------------------------------------------
     Playful YES/NO question game
  --------------------------------------------------------------- */
  setupQuestionGame(){
    this.qIndex = 0;
    this.qNoClicks = 0;

    this.qCard   = document.querySelector("#questions .question-card");
    this.qEmoji  = document.getElementById("qEmoji");
    this.qText   = document.getElementById("qText");
    this.qNum    = document.getElementById("qNum");
    this.qReact  = document.getElementById("qReaction");
    this.qYesBtn = document.getElementById("qYes");
    this.qNoBtn  = document.getElementById("qNo");
    this.qContinueBtn = document.getElementById("qContinue");

    this.loadQuestion();

    this.qYesBtn.addEventListener("click", () => this.handleQYes());
    this.qNoBtn.addEventListener("click", () => this.handleQNo());
    this.qContinueBtn.addEventListener("click", () => this.nextQuestion());
  },

  loadQuestion(){
    const q = loveStory.questions[this.qIndex];
    this.qNoClicks = 0;
    this.qEmoji.textContent = q.emoji;
    this.qText.textContent = q.question;
    this.qNum.textContent = this.qIndex + 1;
    this.qReact.textContent = "";
    this.qReact.classList.remove("show");
    this.qContinueBtn.classList.remove("show");
    this.qNoBtn.style.transform = "translate(0,0)";
    this.qNoBtn.textContent = "No 🙈";
    this.qYesBtn.textContent = "Yes ❤";
  },

  handleQYes(){
    const q = loveStory.questions[this.qIndex];
    this.showQReaction(q.yes);
    this.spawnHearts(this.qCard, 5);
    this.qContinueBtn.classList.add("show");
  },

  handleQNo(){
    const q = loveStory.questions[this.qIndex];
    this.qNoClicks++;
    this.noClicksTotal++;
    const msg = q.no[(this.qNoClicks - 1) % q.no.length];
    this.showQReaction(msg);

    this.qNoBtn.classList.add("shake");
    setTimeout(() => this.qNoBtn.classList.remove("shake"), 400);

    if(this.qNoClicks === 3){
      const x = (Math.random()-0.5) * 90;
      const y = (Math.random()-0.5) * 40;
      this.qNoBtn.style.transform = `translate(${x}px, ${y}px)`;
    }
    if(this.qNoClicks === 4){
      this.qYesBtn.textContent = "Yes ❤ (much better choice)";
    }
    if(this.qNoClicks >= 5){
      this.qContinueBtn.classList.add("show");
    }
  },

  showQReaction(msg){
    this.qReact.textContent = msg;
    this.qReact.classList.add("show");
  },

  nextQuestion(){
    this.qIndex++;
    if(this.qIndex >= loveStory.questions.length){
      document.getElementById("dreams").scrollIntoView({ behavior: this.reducedMotion ? "auto" : "smooth" });
      return;
    }
    this.qCard.style.opacity = "0";
    this.qCard.style.transform = "translateY(16px)";
    setTimeout(() => {
      this.loadQuestion();
      this.qCard.style.opacity = "1";
      this.qCard.style.transform = "translateY(0)";
    }, 300);
  },

  /* ---------------------------------------------------------------
     The proposal — countdown beat, then the real question,
     with a NO button that teases but never traps.
  --------------------------------------------------------------- */
  setupProposal(){
    this.proposalNoClicks = 0;
    this.proposalYesBtn = document.getElementById("proposalYes");
    this.proposalNoBtn  = document.getElementById("proposalNo");
    this.proposalReact  = document.getElementById("proposalReaction");

    const beats = document.getElementById("countdownBeats");
    const proposalSection = document.getElementById("proposal");

    let played = false;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting && !played){
          played = true;
          this.playCountdownBeats(beats);
        }
      });
    }, { threshold: 0.5 });
    obs.observe(proposalSection);

    this.proposalYesBtn.addEventListener("click", () => this.acceptProposal());
    this.proposalNoBtn.addEventListener("click", () => this.handleProposalNo());
  },

  playCountdownBeats(el){
    if(this.reducedMotion){ return; }
    const frames = ["3","2","1"];
    let i = 0;
    el.textContent = frames[0];
    const interval = setInterval(() => {
      i++;
      if(i < frames.length){ el.textContent = frames[i]; }
      else { el.textContent = ""; clearInterval(interval); }
    }, 650);
  },

  handleProposalNo(){
    this.proposalNoClicks++;
    this.noClicksTotal++;

    const reactions = [
      "Are you sure? 👀",
      "Really? 🥺",
      "Take your time... ❤",
      "One more thought? 🙈",
      "Okay — that's okay. I just wanted you to know how I feel. ❤"
    ];
    const idx = Math.min(this.proposalNoClicks - 1, reactions.length - 1);
    this.proposalReact.textContent = reactions[idx];

    if(this.proposalNoClicks < reactions.length){
      const x = (Math.random()-0.5) * 100;
      const y = (Math.random()-0.5) * 46;
      this.proposalNoBtn.style.transform = `translate(${x}px, ${y}px)`;
    } else {
      // final, respectful state — button stays fully usable, never disabled
      this.proposalNoBtn.style.transform = "translate(0,0)";
      this.proposalNoBtn.textContent = "No ❤";
    }
  },

  acceptProposal(){
    this.spawnHearts(document.body, 40);
    document.getElementById("celebration").classList.add("active");
    setTimeout(() => {
      document.getElementById("celebration").scrollIntoView({ behavior: this.reducedMotion ? "auto" : "smooth" });
    }, 250);
  },

  /* ---------------------------------------------------------------
     Replay
  --------------------------------------------------------------- */
  setupCelebration(){
    document.getElementById("replayBtn").addEventListener("click", () => {
      document.getElementById("celebration").classList.remove("active");
      this.qIndex = 0;
      this.proposalNoClicks = 0;
      this.proposalNoBtn.textContent = "No 🙈";
      this.proposalNoBtn.style.transform = "translate(0,0)";
      this.proposalReact.textContent = "";
      this.loadQuestion();
      document.getElementById("hero").scrollIntoView({ behavior: this.reducedMotion ? "auto" : "smooth" });
    });
  },

  /* ---------------------------------------------------------------
     Small hidden secret heart at the very end
  --------------------------------------------------------------- */
  setupSecret(){
    document.getElementById("secretHeart").addEventListener("click", () => {
      document.getElementById("secretMessage").classList.add("shown");
    });
  },

  /* ---------------------------------------------------------------
     Music control (no-op gracefully if no audio file is present)
  --------------------------------------------------------------- */
  setupMusic(){
    const btn = document.getElementById("musicToggle");
    const audio = document.getElementById("bgMusic");
    btn.addEventListener("click", () => {
      if(audio.paused){
        audio.play().then(() => btn.classList.add("playing")).catch(() => {});
      } else {
        audio.pause();
        btn.classList.remove("playing");
      }
    });
  },

  /* ---------------------------------------------------------------
     Subtle heart trail on desktop pointer movement (disabled on
     touch devices and for reduced-motion users)
  --------------------------------------------------------------- */
  setupCursorHearts(){
    if(this.reducedMotion) return;
    if(window.matchMedia("(pointer: coarse)").matches) return;

    let last = 0;
    window.addEventListener("mousemove", (e) => {
      const now = Date.now();
      if(now - last < 260) return;
      last = now;
      if(Math.random() > 0.85){
        this.spawnHeartAt(e.clientX, e.clientY);
      }
    });
  },

  /* ---------------------------------------------------------------
     Heart particle helpers
  --------------------------------------------------------------- */
  spawnHearts(container, amount){
    if(this.reducedMotion) amount = Math.min(amount, 4);
    for(let i=0; i<amount; i++){
      const x = Math.random() * window.innerWidth;
      const y = window.innerHeight * (0.5 + Math.random() * 0.4);
      setTimeout(() => this.spawnHeartAt(x, y), i * 40);
    }
  },

  spawnHeartAt(x, y){
    const heart = document.createElement("div");
    heart.className = "floating-heart";
    heart.textContent = Math.random() > 0.5 ? "❤" : "💕";
    heart.style.left = x + "px";
    heart.style.top = y + "px";
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 2500);
  },
};

document.addEventListener("DOMContentLoaded", () => App.init());
