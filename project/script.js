/* LoveFuel – Made by a Single 😉 */
(function(){
  const categories = [
    { id: 'roast', label: 'Roast your partner 🔥' },
    { id: 'deep', label: 'Deep confession 🫣' },
    { id: 'wyr', label: 'Would you rather… 🤔' },
    { id: 'whatif', label: 'What if… 🌀' },
    { id: 'pastlife', label: 'Past life guess 🔮' },
    { id: 'dares', label: 'Relationship dares 🎯' },
    { id: 'fun', label: 'Fun challenges 🎉' },
  ];

  const sparks = {
    roast: [
      "If your partner were a phone app, which one would they be… and why would it be a bugged one?",
      "On a scale of 1–‘forgets anniversaries’, how chaotic is your partner’s memory?",
      "What’s your partner’s most adorable red flag? Yes, adorable. Explain yourself.",
      "If your partner had a loading screen, what would the tip say?",
      "Which browser tab is your partner: the one playing mystery audio, or the 49 others?",
    ],
    deep: [
      "What’s one truth about love you didn’t believe until this relationship?",
      "What’s a fear you rarely say out loud, but want your partner to know?",
      "Which moment with your partner quietly changed you for the better?",
      "If your love had a theme song, what would it be and why?",
      "Confess a tiny insecurity that your partner accidentally comforts just by existing.",
    ],
    wyr: [
      "Would you rather read your partner’s mind for a day or have them read yours?",
      "Would you rather fight 100 duck-sized arguments or one horse-sized misunderstanding?",
      "Would you rather never argue again or always make up with gourmet snacks?",
      "Would you rather swap phones for a day or swap playlists for a week?",
      "Would you rather time-travel to your first date or fast-forward to your cutest old-couple moment?",
    ],
    whatif: [
      "What if you woke up and we had swapped personalities—what’s the first chaos you’d cause?",
      "What if we only had 24 hours with unlimited money—how would we blow it?",
      "What if a rom-com was based on us—what would the most dramatic scene be?",
      "What if we could instantly master a shared hobby—what’s our duo superpower?",
      "What if you could erase one tiny habit of mine (be brave)—which one?",
    ],
    pastlife: [
      "Past life guess: Were they a dramatic poet or a sleepy housecat? Present evidence.",
      "If your partner had a past life job, what was it and why is it ‘Chief Snack Officer’?",
      "They give off ‘retired pirate’ energy. Confirm or deny with examples.",
      "Which ancient civilization would have worshiped your partner and for what oddly specific reason?",
      "Were they a mysterious librarian who knew every secret but forgot their keys?",
    ],
    dares: [
      "Dare: Make your partner laugh in 10 seconds. No tickling, you menace.",
      "Dare: Compliment your partner in the style of a sports commentator.",
      "Dare: Recreate your first photo together using whatever’s around you.",
      "Dare: Say ‘I love you’ in three ridiculous accents.",
      "Dare: Swap phones and take one aesthetic photo for the other person’s camera roll.",
    ],
    fun: [
      "Challenge: Build a 30-second jingle about your relationship. Bonus points for harmonies.",
      "Challenge: Describe each other using 3 emojis only—no words.",
      "Challenge: One-word story. Take turns adding one word until chaos.",
      "Challenge: Choose a couple nickname that would make high school you cringe.",
      "Challenge: Do a slow-motion high five like a movie finale.",
    ],
  };

  const el = (id)=>document.getElementById(id);
  const sparkText = el('sparkText');
  const sparkCategory = el('sparkCategory');
  const sparkBtn = el('sparkBtn');
  const anotherBtn = el('anotherBtn');
  const meterBtn = el('meterBtn');
  const meterFill = el('meterFill');
  const meterValue = el('meterValue');
  const categoryChips = el('categoryChips');
  const surpriseMix = el('surpriseMix');
  const streakCount = el('streakCount');
  const toast = el('toast');
  const youName = el('youName');
  const partnerName = el('partnerName');
  const soloMode = el('soloMode');
  const plInput = el('plInput');
  const plBtn = el('plBtn');
  const plPreview = el('plPreview');
  const plResult = el('plResult');
  // Intro
  const introOverlay = document.getElementById('introOverlay');
  const introArrow = document.getElementById('introArrow');
  const introStart = document.getElementById('introStart');
  const introScreen1 = document.getElementById('introScreen1');
  const introScreen2 = document.getElementById('introScreen2');
  const introScreen3 = document.getElementById('introScreen3');
  const teaseText = document.getElementById('teaseText');
  const genderChips = document.getElementById('genderChips');
  const genderNext = document.getElementById('genderNext');
  const roastScreen = document.getElementById('roastScreen');
  const roastMessage = document.getElementById('roastMessage');
  const roastExit = document.getElementById('roastExit');
  const statusChips = document.getElementById('statusChips');
  const statusNext = document.getElementById('statusNext');
  const singleScreen = document.getElementById('singleScreen');
  const singleNext = document.getElementById('singleNext');
  const findIdealType = document.getElementById('findIdealType');
  const finalScreen = document.getElementById('finalScreen');
  const ratingGrid = document.getElementById('ratingGrid');
  const ratingSubmit = document.getElementById('ratingSubmit');

  const STORAGE_GENDER = 'lovefuel_gender';
  
  // Partner rating traits
  const ratingTraits = [
    { id: 'angry', label: 'Angry Level 😤', emoji: '😤' },
    { id: 'caring', label: 'Caring Level 💕', emoji: '💕' },
    { id: 'funny', label: 'Funny Level 😂', emoji: '😂' },
    { id: 'romantic', label: 'Romantic Level 💘', emoji: '💘' },
    { id: 'patient', label: 'Patient Level 🧘', emoji: '🧘' },
    { id: 'adventurous', label: 'Adventurous Level 🌟', emoji: '🌟' }
  ];
  // Quiz
  const soloQuiz = document.getElementById('soloQuiz');
  const quizContainer = document.getElementById('quizContainer');
  const quizSubmit = document.getElementById('quizSubmit');
  const quizReset = document.getElementById('quizReset');
  const quizResult = document.getElementById('quizResult');

  const STORAGE_KEYS = {
    streak: 'lovefuel_streak',
    lastUsed: 'lovefuel_last_used',
    categories: 'lovefuel_categories',
    surprise: 'lovefuel_surprise',
    names: 'lovefuel_names'
  };

  function loadPrefs(){
    try{
      const cats = JSON.parse(localStorage.getItem(STORAGE_KEYS.categories) || '[]');
      const surprise = JSON.parse(localStorage.getItem(STORAGE_KEYS.surprise) || 'false');
      const names = JSON.parse(localStorage.getItem(STORAGE_KEYS.names) || '{}');
      if(names.you) youName.value = names.you;
      if(names.partner) partnerName.value = names.partner;
      return { cats, surprise };
    }catch(e){ return { cats: [], surprise: false }; }
  }

  function savePrefs(){
    const activeCats = [...categoryChips.querySelectorAll('.chip.active')].map(c=>c.dataset.id);
    localStorage.setItem(STORAGE_KEYS.categories, JSON.stringify(activeCats));
    localStorage.setItem(STORAGE_KEYS.surprise, JSON.stringify(!!surpriseMix.checked));
    localStorage.setItem(STORAGE_KEYS.names, JSON.stringify({ you: youName.value.trim(), partner: partnerName.value.trim() }));
  }

  function initChips(){
    const { cats, surprise } = loadPrefs();
    categoryChips.innerHTML = '';
    categories.forEach(cat=>{
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'chip';
      b.textContent = cat.label;
      b.dataset.id = cat.id;
      if(cats.length === 0 || cats.includes(cat.id)) b.classList.add('active');
      b.addEventListener('click', ()=>{
        b.classList.toggle('active');
        // ensure at least one category when surprise is off
        const actives = categoryChips.querySelectorAll('.chip.active');
        if(actives.length === 0 && !surpriseMix.checked){
          b.classList.add('active');
        }
        savePrefs();
      });
      categoryChips.appendChild(b);
    });
    surpriseMix.checked = !!surprise;
  }

  function getActiveCategoryPool(){
    const useAll = surpriseMix.checked;
    const activeIds = useAll
      ? categories.map(c=>c.id)
      : [...categoryChips.querySelectorAll('.chip.active')].map(c=>c.dataset.id);
    const pool = activeIds.flatMap(id => sparks[id] || []);
    return { pool, activeIds };
  }

  function pickRandom(arr){ return arr[Math.floor(Math.random()*arr.length)]; }

  function showSpark(){
    const { pool, activeIds } = getActiveCategoryPool();
    if(pool.length === 0){
      sparkText.textContent = "Select a category or enable Surprise mix 🎁";
      sparkCategory.textContent = '—';
      return;
    }
    const cat = pickRandom(activeIds);
    const text = pickRandom(sparks[cat]);
    sparkText.textContent = personalize(text);
    sparkCategory.textContent = labelFor(cat);
    animateSpark();
    incrementStreakIfNeeded();
    maybeSoloEasterEgg();
  }

  function labelFor(id){ return (categories.find(c=>c.id===id)||{}).label || id; }

  function animateSpark(){
    sparkText.style.animation = 'none';
    // trigger reflow
    void sparkText.offsetWidth;
    sparkText.style.animation = 'popIn .35s ease';
  }

  function personalize(text){
    const you = youName.value.trim() || 'You';
    const partner = partnerName.value.trim() || 'your partner';
    return text.replaceAll('{you}', you).replaceAll('{partner}', partner);
  }

  function showMeter(){
    const value = Math.floor(40 + Math.random()*60); // 40–99
    meterFill.style.width = '0%';
    meterValue.textContent = '—%';
    requestAnimationFrame(()=>{
      setTimeout(()=>{
        meterFill.style.width = value + '%';
        meterValue.textContent = value + '%';
      }, 30);
    });
  }

  function getStartOfDay(ts){
    const d = new Date(ts);
    d.setHours(0,0,0,0);
    return d.getTime();
  }

  function readStreak(){
    try{
      const raw = JSON.parse(localStorage.getItem(STORAGE_KEYS.streak) || '0');
      const last = JSON.parse(localStorage.getItem(STORAGE_KEYS.lastUsed) || '0');
      return { count:Number(raw)||0, last:Number(last)||0 };
    }catch(e){ return { count:0, last:0 }; }
  }

  function writeStreak(count){
    localStorage.setItem(STORAGE_KEYS.streak, JSON.stringify(count));
    localStorage.setItem(STORAGE_KEYS.lastUsed, JSON.stringify(Date.now()));
  }

  function incrementStreakIfNeeded(){
    const { count, last } = readStreak();
    const today = getStartOfDay(Date.now());
    const lastDay = getStartOfDay(last || 0);
    let newCount = count;
    if(last === 0){
      newCount = 1;
    } else if(today === lastDay){
      // already counted today; keep
    } else if(today - lastDay === 24*60*60*1000){
      newCount = count + 1;
    } else {
      newCount = 1; // reset
    }
    writeStreak(newCount);
    streakCount.textContent = String(newCount);
  }

  function initStreakUI(){
    const { count, last } = readStreak();
    const today = getStartOfDay(Date.now());
    const lastDay = getStartOfDay(last || 0);
    let shown = count;
    if(count === 0){ shown = 0; }
    else if(today !== lastDay){ shown = count; }
    streakCount.textContent = String(shown || 0);
  }

  function showToast(msg){
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(()=> toast.classList.remove('show'), 2600);
  }

  // Playful arrow that dodges the cursor and teases
  let arrowTeaseIndex = 0;
  const arrowTeases = [
    'Whoa there, smooth operator. 😏',
    'Not so fast — buy me dinner first. 🍝',
    'You call that a tap? Try again. 👀',
    'Hard to get? Me? Never. Okay, maybe a little. 😇',
  ];

  function moveArrowRandom(){
    const parent = introScreen1;
    const btn = introArrow;
    if(!parent || !btn) return;
    const rect = parent.getBoundingClientRect();
    const maxX = rect.width - btn.offsetWidth - 20;
    const maxY = rect.height - btn.offsetHeight - 20;
    const x = Math.max(10, Math.floor(Math.random()*maxX));
    const y = Math.max(10, Math.floor(Math.random()*maxY));
    btn.style.position = 'relative';
    btn.style.left = x + 'px';
    btn.style.top = y + 'px';
  }

  function tease(){
    if(arrowTeaseIndex === 0){
      // First click: hide the HI and highlight the commentary
      const hi = introScreen1.querySelector('.intro-hi');
      if(hi){ hi.style.display = 'none'; }
      teaseText.classList.add('highlight-comment');
    }
    teaseText.textContent = arrowTeases[arrowTeaseIndex % arrowTeases.length];
    arrowTeaseIndex++;
    // Remove the moveArrowRandom() call to stop arrow movement
    if(arrowTeaseIndex > 1){
      // give in and show the next screen after just 1 click
      introScreen1.hidden = true;
      introScreen2.hidden = false;
    }
  }

  function enterApp(){
    introOverlay.style.display = 'none';
  }

  function exitFromRoast(){
    // Close the app entirely - hide the intro overlay
    introOverlay.style.display = 'none';
    // Also hide the main app content to really "exit"
    document.querySelector('main').style.display = 'none';
    document.querySelector('header').style.display = 'none';
    document.querySelector('footer').style.display = 'none';
  }

  function handleStatusSelect(e){
    const btn = e.target.closest('button.status');
    if(!btn) return;
    const value = btn.dataset.value;
    
    // Normal selection flow for status buttons
    [...statusChips.querySelectorAll('button.status')].forEach(b=> b.classList.remove('active'));
    btn.classList.add('active');
    statusNext.disabled = false;
  }

  function proceedAfterStatus(){
    const active = statusChips.querySelector('button.status.active');
    const value = active ? active.dataset.value : 'single';
    
    if(value === 'single'){
      // Go to single motivation screen
      introScreen3.hidden = true;
      singleScreen.hidden = false;
    } else {
      // Go directly to final screen for committed users
      introScreen3.hidden = true;
      finalScreen.hidden = false;
    }
  }

  function proceedFromSingle(){
    singleScreen.hidden = true;
    finalScreen.hidden = false;
  }

  function findIdealTypeHandler(){
    // Hide the intro overlay and show the main app
    introOverlay.style.display = 'none';
    
    // Enable solo mode and show the quiz
    soloMode.checked = true;
    toggleQuizVisibility();
    
    // Scroll to the quiz section
    setTimeout(() => {
      document.getElementById('soloQuiz').scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }

  function createRatingSliders(){
    ratingGrid.innerHTML = '';
    ratingTraits.forEach(trait => {
      const ratingItem = document.createElement('div');
      ratingItem.className = 'rating-item';
      
      const label = document.createElement('label');
      label.textContent = trait.label;
      label.className = 'rating-label';
      
      const sliderContainer = document.createElement('div');
      sliderContainer.className = 'slider-container';
      
      const slider = document.createElement('input');
      slider.type = 'range';
      slider.min = '1';
      slider.max = '10';
      slider.value = '5';
      slider.className = 'rating-slider';
      slider.dataset.trait = trait.id;
      
      const valueDisplay = document.createElement('span');
      valueDisplay.className = 'rating-value';
      valueDisplay.textContent = '5';
      
      slider.addEventListener('input', (e) => {
        valueDisplay.textContent = e.target.value;
      });
      
      sliderContainer.appendChild(slider);
      sliderContainer.appendChild(valueDisplay);
      
      ratingItem.appendChild(label);
      ratingItem.appendChild(sliderContainer);
      ratingGrid.appendChild(ratingItem);
    });
  }

  function getRatingResults(){
    const ratings = {};
    ratingTraits.forEach(trait => {
      const slider = ratingGrid.querySelector(`[data-trait="${trait.id}"]`);
      if(slider) {
        ratings[trait.id] = parseInt(slider.value);
      }
    });
    return ratings;
  }

  function showRatingBasedSpark(){
    const ratings = getRatingResults();
    const partnerName = document.getElementById('partnerName').value.trim() || 'your partner';
    
    // Create personalized spark based on ratings
    let sparkText = '';
    const lowRatings = Object.entries(ratings).filter(([_, value]) => value <= 3);
    const highRatings = Object.entries(ratings).filter(([_, value]) => value >= 8);
    
    if(lowRatings.length > 0) {
      const lowTrait = lowRatings[0][0];
      const traitLabel = ratingTraits.find(t => t.id === lowTrait)?.label.split(' ')[0] || lowTrait;
      sparkText = `Your ${partnerName}'s ${traitLabel.toLowerCase()} level is... interesting. Let's work on that together! 😅`;
    } else if(highRatings.length > 0) {
      const highTrait = highRatings[0][0];
      const traitLabel = ratingTraits.find(t => t.id === highTrait)?.label.split(' ')[0] || highTrait;
      sparkText = `Wow! Your ${partnerName} is amazing at being ${traitLabel.toLowerCase()}. Tell me more about that! ✨`;
    } else {
      sparkText = `Your ${partnerName} seems pretty balanced. What's one thing you'd love to improve together? 💕`;
    }
    
    // Show the spark card and hide rating card
    document.querySelector('.rating-card').hidden = true;
    document.querySelector('.spark-card').hidden = false;
    
    // Set the spark text
    document.getElementById('sparkText').textContent = sparkText;
    document.getElementById('sparkCategory').textContent = 'Personalized 💝';
  }

  function handleGenderSelect(e){
    console.log('handleGenderSelect called!'); // Debug log
    const btn = e.target.closest('button.gender');
    if(!btn) return;
    const value = btn.dataset.value;
    console.log('Gender selected:', value); // Debug log
    
    // Normal selection flow for all buttons including "Prefer not to say"
    [...genderChips.querySelectorAll('button.gender')].forEach(b=> b.classList.remove('active'));
    btn.classList.add('active');
    genderNext.disabled = false;
    
    // If user picks 'Prefer not to say', just select it normally (roast will happen on next screen)
    if(value === 'nosay'){
      // Roast will be shown in the next screen
    }
  }

  function proceedAfterGender(){
    const active = genderChips.querySelector('button.gender.active');
    const value = active ? active.dataset.value : 'nosay';
    try{ localStorage.setItem(STORAGE_GENDER, value); }catch(e){}
    
    // If user chose "prefer not to say", go to roast screen
    if(value === 'nosay'){
      const nosayRoasts = [
        "If you can't even decide on your gender, how are you supposed to decide on a girlfriend? 🤔",
        "Indecisive much? Good luck making relationship decisions! 😏",
        "Can't pick a gender but expect to pick a partner? Bold strategy. 😌",
        "If you're this indecisive about gender, I can't imagine your dating life. 😅",
        "Prefer not to say? More like prefer not to commit. Classic. 😎"
      ];
      const roast = nosayRoasts[Math.floor(Math.random() * nosayRoasts.length)];
      roastMessage.textContent = roast;
      introScreen2.hidden = true;
      roastScreen.hidden = false;
    } else {
      // Normal flow for man/woman - go to status selection
      introScreen2.hidden = true;
      introScreen3.hidden = false;
    }
  }

  function maybeSoloEasterEgg(){
    const onlyOne = soloMode.checked || (!youName.value.trim() && !partnerName.value.trim());
    if(onlyOne){
      showToast('Finally… someone as single as the creator. 🥲');
    }
  }

  // Solo quiz
  const quizQuestions = [
    {
      id: 'vibe',
      q: 'Pick a vibe',
      options: ['Chaotic cute', 'Calm and caring', 'Brainy and sarcastic', 'Wildcard energy']
    },
    {
      id: 'date',
      q: 'Ideal date style',
      options: ['Street food + long walk', 'Cozy movie fort', 'Museum + mock debate', 'Spontaneous road trip']
    },
    {
      id: 'superpower',
      q: 'Attraction superpower',
      options: ['Laugh that cures bad days', 'Hugs with 200% comfort', 'Wit sharp enough to slice bread', 'Eyes that say “bad idea, let’s go”']
    }
  ];

  function renderQuiz(){
    quizContainer.innerHTML = '';
    quizResult.textContent = '';
    quizSubmit.disabled = true;
    quizReset.hidden = true;
    quizQuestions.forEach(({id, q, options})=>{
      const fs = document.createElement('fieldset');
      fs.className = 'quiz-q';
      const legend = document.createElement('legend');
      legend.textContent = q;
      fs.appendChild(legend);
      options.forEach((opt, idx)=>{
        const label = document.createElement('label');
        label.className = 'opt';
        const inp = document.createElement('input');
        inp.type = 'radio'; inp.name = id; inp.value = String(idx);
        label.appendChild(inp);
        const span = document.createElement('span'); span.textContent = opt;
        label.appendChild(span);
        fs.appendChild(label);
      });
      quizContainer.appendChild(fs);
    });
    quizContainer.addEventListener('change', onQuizChange, { once: true });
  }

  function onQuizChange(){
    // After first change, track all changes to enable submit when all answered
    quizContainer.addEventListener('change', ()=>{
      const allAnswered = quizQuestions.every(q=> !!document.querySelector(`input[name="${q.id}"]:checked`));
      quizSubmit.disabled = !allAnswered;
    });
  }

  function computeQuiz(){
    const answers = quizQuestions.map(q=> Number((document.querySelector(`input[name="${q.id}"]:checked`)||{}).value));
    const score = answers.reduce((a,b)=>a+b,0);
    const roastTails = [
      'and yes, they will ignore your texts… artistically.',
      'and they’re probably allergic to commitment and also, gluten.',
      'but they will mysteriously vanish when it’s time to choose a restaurant.',
      'and they will steal your fries without remorse.'
    ];
    const consolationNotes = [
      "But hey, you're a catch — the right one will adore your chaos. 💖",
      "Also, you're doing great. Love takes its time; keep shining. ✨",
      "Solo today, iconic tomorrow. The right energy will match yours. 💞",
    ];
    let type;
    if(score <= 2) type = 'Soft cinnamon roll with golden-retriever energy';
    else if(score <= 4) type = 'Calm brainiac with a spicy sarcasm core';
    else if(score <= 6) type = 'Adventure gremlin with a heart of chaos';
    else type = 'Dangerously charming wildcard (handle with oven mitts)';
    const tail = pickRandom(roastTails);
    const note = pickRandom(consolationNotes);
    quizResult.textContent = `Your ideal type: ${type} — ${tail} ${note}`;
    quizReset.hidden = false;
  }

  function toggleQuizVisibility(){
    const solo = soloMode.checked || (!youName.value.trim() && !partnerName.value.trim());
    soloQuiz.hidden = !solo;
    if(solo){ renderQuiz(); }
  }

  // Past Life Detector – purely client-side and random for fun
  const pastLives = [
    'retired pirate who hoarded snacks instead of gold',
    'dramatic poet who cried at sunsets and soup',
    'medieval bread critic with very high standards',
    'mysterious librarian who knew every secret but lost every bookmark',
    'time-traveling DJ stuck on a lo-fi loop',
    'royal napper, undefeated in pillow battles',
    'undercover pigeon therapist',
    'professional cloud watcher, part-time rainbow inspector',
  ];

  function detectPastLife(){
    if(!plInput.files || plInput.files.length === 0){
      showToast('Upload a selfie first! 📸');
      return;
    }
    const file = plInput.files[0];
    const reader = new FileReader();
    reader.onload = function(e){
      plPreview.src = e.target.result;
      plPreview.style.display = 'block';
      const guess = pickRandom(pastLives);
      plResult.textContent = `You were a ${guess}. Science (not) confirmed.`;
    };
    reader.readAsDataURL(file);
  }

  // Events
  sparkBtn.addEventListener('click', showSpark);
  anotherBtn.addEventListener('click', showSpark);
  meterBtn.addEventListener('click', showMeter);
  surpriseMix.addEventListener('change', ()=>{ savePrefs(); });
  [youName, partnerName].forEach(inp=> inp.addEventListener('change', savePrefs));
  soloMode.addEventListener('change', ()=>{
    if(soloMode.checked) showToast('Solo mode on. It’s just you and your stunning self. ✨');
    toggleQuizVisibility();
  });
  plBtn.addEventListener('click', detectPastLife);
  quizSubmit && quizSubmit.addEventListener('click', computeQuiz);
  quizReset && quizReset.addEventListener('click', renderQuiz);
  if(introArrow) introArrow.addEventListener('click', tease);
  if(introStart) introStart.addEventListener('click', enterApp);
  if(genderChips) {
    console.log('Gender chips found, adding event listener');
    genderChips.addEventListener('click', handleGenderSelect);
    // Also add a simple test to see if any click is detected
    genderChips.addEventListener('click', (e) => {
      console.log('Any click detected on genderChips:', e.target);
    });
  } else {
    console.log('Gender chips NOT found!');
  }
  if(genderNext) genderNext.addEventListener('click', proceedAfterGender);
  if(roastExit) roastExit.addEventListener('click', exitFromRoast);
  if(statusChips) statusChips.addEventListener('click', handleStatusSelect);
  if(statusNext) statusNext.addEventListener('click', proceedAfterStatus);
  if(singleNext) singleNext.addEventListener('click', proceedFromSingle);
  if(findIdealType) findIdealType.addEventListener('click', findIdealTypeHandler);
  if(ratingSubmit) ratingSubmit.addEventListener('click', showRatingBasedSpark);

  // Init
  initChips();
  initStreakUI();
  toggleQuizVisibility();
  createRatingSliders();
  // Intro starts visible by default

  // Small animation keyframes injected via JS for portability
  const style = document.createElement('style');
  style.textContent = `@keyframes popIn{0%{transform:translateY(4px) scale(.98); opacity:.0} 100%{transform:translateY(0) scale(1); opacity:1}}`;
  document.head.appendChild(style);
})();

