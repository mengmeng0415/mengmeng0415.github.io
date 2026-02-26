// ================== 🛠️ 1. 资源配置 ==================
const CONFIG = {
    assetUrl: "https://cdn.jsdelivr.net/gh/mengmeng0415/", 
    imgFolder: "", 
    dataPath: "data/" 
};


// ================== 🧠 2. AI 引擎核心模块 ==================
const AI_MANAGER = {
    getKey: () => localStorage.getItem('gemini_api_key'),
    setKey: (k) => localStorage.setItem('gemini_api_key', k),
    
    // 单次请求 (用于生成解析、出题)
    async ask(prompt, isJson = false) {
        const key = this.getKey();
        if (!key) { openApiKeyModal(); throw new Error('NO_API_KEY'); }
        
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${key}`;
        const body = { contents: [{ parts: [{ text: prompt }] }] };
        if (isJson) body.generationConfig = { responseMimeType: "application/json" };
        
        try {
            const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
            const data = await res.json();
            
            if (!res.ok) {
                console.error("API 错误:", data);
                if (res.status === 429) throw new Error("请求太快啦，请稍等一分钟再试！(429)");
                throw new Error(data.error?.message || 'API 请求失败');
            }
            return data.candidates[0].content.parts[0].text;
        } catch(e) {
            console.error(e);
            if (e.message !== 'NO_API_KEY') {
                alert("AI 请求失败: " + (e.message === 'Failed to fetch' ? "网络连接断开，请检查 VPN 节点是否可用。" : e.message));
            }
            throw e;
        }
    },

    // 💬 多轮对话请求 (用于聊天面板)
    async askChat(messages) {
        const key = this.getKey();
        if (!key) { openApiKeyModal(); throw new Error('NO_API_KEY'); }
        
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${key}`;
        const body = { contents: messages }; 
        
        try {
            const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
            const data = await res.json();
            
            if (!res.ok) {
                console.error("聊天 API 错误:", data);
                if (res.status === 429) throw new Error("您问得太快啦，请休息一分钟再接着聊！(429 Rate Limit)");
                throw new Error(data.error?.message || '未知 API 错误');
            }
            
            // 处理安全拦截的情况
            if (!data.candidates || data.candidates.length === 0 || !data.candidates[0].content) {
                console.warn("AI 拦截提示:", data);
                throw new Error("AI 助手觉得这个问题不太合适回答哦 (触发了安全策略)。");
            }
            
            return data.candidates[0].content.parts[0].text;
        } catch(e) {
            console.error("聊天错误详情:", e);
            if (e.message !== 'NO_API_KEY') {
                alert("💬 聊天失败: " + (e.message === 'Failed to fetch' ? "网络连接失败，请检查您的科学上网环境 (建议使用美国、日本、台湾等节点，避开香港节点)。" : e.message));
            }
            throw e;
        }
    }
};

// ================== 🧠 AI 引擎设置与提示词管理 ==================
// 默认的单词详解提示词模板
const DEFAULT_WORD_PROMPT = `你是一位资深的儿童英语教育专家。请为单词 "{{word}}" 生成生动易懂的详细讲解。
【强制要求】
必须严格使用以下标签格式输出纯文本，绝不能包含Markdown代码块符号(如\`\`\`)，也不要说任何废话：
[TITLE] 解释 [/TITLE]
[DEF]
[EN]一句简短易懂的英文解释[/EN]
[CN]准确的中文解释[/CN]
[POS]词性[/POS]
[PH]英美音标[/PH]
[DU]一个简单的英文例句|(原文例句) 中文翻译[/DU]
[/DEF]
[TITLE] 常见用法 [/TITLE]
[COLL]
[H]一个常用短语或搭配英文 | 中文搭配 [POS]词性[/POS][/H]
[EX]这个搭配的英文例句 | 例句中文[/EX]
[/COLL]`;

window.openApiKeyModal = () => {
    // 读取 Key
    document.getElementById('api-key-input').value = AI_MANAGER.getKey() || '';
    // 读取自定义 Prompt，如果没有则显示默认的
    document.getElementById('ai-prompt-input').value = localStorage.getItem('gemini_word_prompt') || DEFAULT_WORD_PROMPT;
    document.getElementById('apikey-modal').classList.remove('hidden');
};

window.closeApiKeyModal = () => document.getElementById('apikey-modal').classList.add('hidden');

window.saveApiKey = () => {
    const k = document.getElementById('api-key-input').value.trim();
    const p = document.getElementById('ai-prompt-input').value.trim();
    
    if (k) AI_MANAGER.setKey(k); 
    if (p) localStorage.setItem('gemini_word_prompt', p); // 保存自定义的提示词
    
    closeApiKeyModal(); 
    alert("🎉 AI 引擎设置与提示词已保存！");
};
const showAILoading = (text) => {
    document.getElementById('ai-loading-text').innerText = text || "AI 正在思考中...";
    document.getElementById('ai-loading-overlay').classList.remove('hidden');
};
const hideAILoading = () => document.getElementById('ai-loading-overlay').classList.add('hidden');
function parseAIJson(text) { return JSON.parse(text.replace(/```json/g, '').replace(/```/g, '').trim()); }

// ================== 🎨 主题配置中心 ==================
const THEMES = {
    "spooky": {
        name: "Spooky Night",
        introVideo: "https://cdn.jsdelivr.net/gh/mengmeng0415/wordpic01/spooky.mp4",
        introAudio: "https://cdn.jsdelivr.net/gh/mengmeng0415/wordpic01/openmusic.mp3",
        bgm: "https://cdn.jsdelivr.net/gh/mengmeng0415/wordpic01/spooky.MP3",
        cardBack: "https://cdn.jsdelivr.net/gh/mengmeng0415/wordpic01/spookybackn.png",
        cardFrontBg: "https://cdn.jsdelivr.net/gh/mengmeng0415/wordpic01/spookyface.png",
        introDuration: 5000,
        thumb: "https://cdn.jsdelivr.net/gh/mengmeng0415/wordpic01/spookythumb.png"
    },
    "ocean": {
        name: "Winter Time",
        introVideo: "https://cdn.jsdelivr.net/gh/mengmeng0415/wordpic01/winopen.mp4", 
        introAudio: "https://cdn.jsdelivr.net/gh/mengmeng0415/wordpic01/winteropen.mp3", 
        bgm: "https://cdn.jsdelivr.net/gh/mengmeng0415/wordpic01/winterbgm.mp3",         
        cardBack: "https://cdn.jsdelivr.net/gh/mengmeng0415/wordpic01/winterback.png",    
        cardFrontBg: "https://cdn.jsdelivr.net/gh/mengmeng0415/wordpic01/winterface.png", 
        introDuration: 5000, 
        thumb: "https://cdn.jsdelivr.net/gh/mengmeng0415/wordpic01/winterthumb.png"
    }
};

// ================== 🛠️ Data Manager ==================
const DataManager = {
    db: { words: {}, books: [], settings: {}, ratings: {}, quizzes: {} },
    chapterSeriesMap: {},

    init: async function() {
        try {
            const [wordsRes, booksRes, settingsRes, quizzesRes] = await Promise.all([
                fetch(`${CONFIG.dataPath}words.json`),
                fetch(`${CONFIG.dataPath}books.json`),
                fetch(`${CONFIG.dataPath}settings.json`),
                fetch(`${CONFIG.dataPath}quizzes.json`)
            ]);

            this.db.words = await wordsRes.json();
            this.db.books = await booksRes.json();
            this.db.settings = await settingsRes.json();
            this.db.quizzes = await quizzesRes.json();
            
            this.db.books.forEach(b => {
                b.chapters.forEach(c => { this.chapterSeriesMap[c.id] = b.series; });
            });

            this.loadRatings();
            return true;
        } catch (e) {
            console.error(e);
            alert("加载数据失败，请确保格式正确且使用了 Live Server。");
            return false;
        }
    },

    getWordDetail: function(uid) {
        const raw = this.db.words[uid];
        if (!raw) return null;
        
        const word = JSON.parse(JSON.stringify(raw));
        word.uid = uid; 
        const process = (url) => url.startsWith('http') ? url : CONFIG.assetUrl + CONFIG.imgFolder + url;
        
        word.displayImages = [];
        if (word.images) {
            const scene = (word.images.scene || []).map(process);
            const card = (word.images.card || []).map(process);
            word.images.scene = scene;
            word.images.card = card;
            // 合并所有图片，保证不错过
            word.displayImages = scene.concat(card);
        }

        word.games = word.games && Array.isArray(word.games) ? word.games : (word.gameUrl ? [word.gameUrl] : []);
        if (!word.quizGames) word.quizGames = [];

        if (word.richDetail && Array.isArray(word.richDetail)) {
            word.richDetail = word.richDetail.map(item => {
                if (typeof item === 'string') {
                    let title = "详细内容"; let content = item;
                    const titleMatch = item.match(/\[TITLE\](.*?)\[\/TITLE\]/);
                    if (titleMatch) { title = titleMatch[1]; content = item.replace(titleMatch[0], ''); }
                    return { title: title, content: content };
                }
                return item;
            });

            word.richDetail.forEach(s => {
                s.content = parseRichContent(s.content);
                s.content = s.content.replace(/src=["']([^"']+)["']/g, (m, src) => {
                    const fullSrc = src.startsWith('http') ? src : CONFIG.assetUrl + CONFIG.imgFolder + src;
                    return `src="${fullSrc}" onclick="openModal('${fullSrc}')"`;
                });
            });
        }
        
        word.linkedQuizzes = [];
        for (const qid in this.db.quizzes) {
            if (this.db.quizzes[qid].wordIds.includes(uid)) word.linkedQuizzes.push({ id: qid, ...this.db.quizzes[qid] });
        }
        return word;
    },

    getWordsByChapter: function(chapterId) {
        const book = this.db.books.find(b => b.chapters.some(c => c.id === chapterId));
        if (!book) return [];
        const chapter = book.chapters.find(c => c.id === chapterId);
        if (!chapter || !chapter.wordIds) return [];
        
        return chapter.wordIds.map(item => {
            let uid = typeof item === 'string' ? item.split(':')[0].trim() : item.uid;
            const detail = this.getWordDetail(uid);
            if (!detail) return null;
            detail.chapterQuizIds = chapter.quizIds || [];
            return detail;
        }).filter(w => w !== null);
    },
    getAllWords: function() { return Object.keys(this.db.words).map(uid => this.getWordDetail(uid)); },
    getSeriesName: function(chapterId) { return this.chapterSeriesMap[chapterId] || ""; },
    loadRatings: function() { const s = localStorage.getItem('myWordRatings'); if(s) try { this.db.ratings=JSON.parse(s); } catch(e){} },
    saveRating: function(uid, r) { this.db.ratings[uid] = (this.db.ratings[uid] === r) ? 0 : r; localStorage.setItem('myWordRatings', JSON.stringify(this.db.ratings)); },
    getRating: function(uid) { return this.db.ratings[uid] || 0; }
};

// ================== 🖥️ UI Logic ==================
let state = { 
    currentBookId: null, currentWordList: [], currentWordIndex: 0, 
    mode: 'home', homeExpanded: true, bookExpanded: true, homeSearchResults: [], 
    lastActiveTabTitle: null, homeFilterRatings: new Set(), bookFilterRatings: new Set(),
    isPracticeMode: false, currentPracticeIndex: 0, customGames: null, isImageZoom: false
};
let chatHistories = {}; // 用于存储每个单词的聊天记录: { "uid": [...] }

const audioClick = new Audio('backinfo/click.mp3');
const audioWrong = new Audio('backinfo/wrong.mp3'); 
const audioCorrect = new Audio('backinfo/right.mp3');
let isClickSoundEnabled = false;
let preferredVoice = null;

document.addEventListener('DOMContentLoaded', async () => {
    if(await DataManager.init()) { initHome(); initVoices(); }
});

document.addEventListener('click', (e) => {
    if (!isClickSoundEnabled) return;
    if (e.target.closest('.quiz-q') || e.target.closest('.opt-btn') || e.target.closest('.switch') || e.target.closest('.audio-icon') || e.target.closest('.spooky-card')) return; 
    audioClick.play().catch(()=>{});
});

function countBookWords(book) {
    let count = 0;
    if (book.chapters) { 
        book.chapters.forEach(c => { 
            if (c.wordIds) count += c.wordIds.filter(item => DataManager.db.words[typeof item === 'string' ? item.split(':')[0].trim() : item.uid]).length;
        }); 
    }
    return count;
}

function initHome() {
    state.homeExpanded = true;
    updateHomeToggleBtn();
    renderSidebarFilter('home'); applyHomeFilter(); 
    const cats = DataManager.db.settings.bookCategories || [];
    if (cats.length > 0) renderBookTabs(cats[0]);
    const inp = document.getElementById('global-search');
    if(inp) inp.addEventListener('input', applyHomeFilter);
}

window.toggleHomeList = () => { state.homeExpanded = !state.homeExpanded; updateHomeToggleBtn(); renderABCListFiltered(state.homeSearchResults); };
function updateHomeToggleBtn() { const btn = document.getElementById('btn-home-toggle'); if(btn) btn.innerText = state.homeExpanded ? '全部收起' : '全部展开'; }
window.toggleBookList = () => { state.bookExpanded = !state.bookExpanded; updateBookToggleBtn(); renderDetailSidebar(); };
function updateBookToggleBtn() { const btn = document.getElementById('btn-book-toggle'); if(btn) btn.innerText = state.bookExpanded ? '全部收起' : '全部展开'; }

function applyHomeFilter() {
    const val = document.getElementById('global-search').value.toLowerCase();
    const fs = state.homeFilterRatings;
    let filtered = DataManager.getAllWords().filter(w => {
        const r = DataManager.getRating(w.uid);
        if (!w.word) return false;
        return (!val || w.word.toLowerCase().includes(val)) && (fs.size===0 || fs.has(r));
    });
    filtered.sort((a, b) => a.word.localeCompare(b.word));
    state.homeSearchResults = filtered;
    renderABCListFiltered(filtered);
    document.getElementById('home-list-count').innerText = `(${filtered.length})`;
}

function renderABCListFiltered(words) {
    const l = document.getElementById('abc-list'); l.innerHTML = '';
    const g = {}; 
    words.forEach(w => { const c = w.word[0].toUpperCase(); if (!g[c]) g[c] = []; g[c].push(w); });
    Object.keys(g).sort().forEach(c => {
        const hiddenClass = state.homeExpanded ? '' : 'hidden';
        const itemsHtml = g[c].map(w => generateSidebarItemHtml(w)).join('');
        l.innerHTML += generateGroupHtml(c, g[c].length, itemsHtml, hiddenClass);
    });
}

function renderDetailSidebar() {
    const container = document.getElementById('chapter-list-container');
    if(!container) return;
    container.innerHTML = '';
    let wordsToRender = []; 

    if (state.mode === 'book') {
        const book = DataManager.db.books.find(b => b.id === state.currentBookId);
        const val = (document.getElementById('chapter-search')?.value || '').toLowerCase();
        book.chapters.forEach(ch => {
            const filtered = DataManager.getWordsByChapter(ch.id).filter(w => {
                return (!val || w.word.toLowerCase().includes(val)) && (state.bookFilterRatings.size===0 || state.bookFilterRatings.has(DataManager.getRating(w.uid)));
            });
            if (filtered.length > 0) {
                const itemsHtml = filtered.map(w => generateSidebarItemHtml(w)).join('');
                container.innerHTML += generateGroupHtml(ch.name, filtered.length, itemsHtml, state.bookExpanded ? '' : 'hidden'); 
                wordsToRender.push(...filtered);
            }
        });
    } else {
        const g = {};
        state.homeSearchResults.forEach(w => { const c = w.word[0].toUpperCase(); if(!g[c]) g[c] = []; g[c].push(w); });
        Object.keys(g).sort().forEach(c => {
            const itemsHtml = g[c].map(w => generateSidebarItemHtml(w)).join('');
            container.innerHTML += generateGroupHtml(c, g[c].length, itemsHtml, state.homeExpanded ? '' : 'hidden'); 
            wordsToRender.push(...g[c]);
        });
    }
    state.currentWordList = wordsToRender;
    const countEl = document.getElementById('chapter-list-count');
    if (countEl) { countEl.innerText = `(${wordsToRender.length})`; countEl.style.display = 'inline-block'; }
}

function generateSidebarItemHtml(w) {
    const series = DataManager.getSeriesName(w.chapterId);
    const r = DataManager.getRating(w.uid);
    const ratingHtml = r > 0 ? `<span class="rating-num rating-${r}">★${r}</span>` : `<span></span>`;
    let isActive = state.currentWordList[state.currentWordIndex]?.uid === w.uid;
    let checkboxHtml = '';
    let clickAction = `onclick="jumpToWord('${w.uid}')"`;
    
    if (isCreationMode) {
        const checked = selectedWordUIDs.has(w.uid) ? 'checked' : '';
        checkboxHtml = `<input type="checkbox" class="word-checkbox" ${checked} onclick="event.stopPropagation(); toggleWordSelection('${w.uid}')">`;
        clickAction = `onclick="toggleWordSelection('${w.uid}')"`;
        isActive = false;
    }
    return `<li ${clickAction} class="${isActive ? 'active' : ''}">${checkboxHtml}<div class="word-info-col"><span class="word-text">${w.word}</span><span class="series-text">${series}</span></div>${ratingHtml}</li>`;
}

function generateGroupHtml(title, count, itemsHtml, hiddenClass) {
    return `<div class="chapter-group"><div class="abc-group-header" onclick="this.nextElementSibling.classList.toggle('hidden')"><span>${title}</span><span class="group-count">${count}</span></div><ul class="abc-items ${hiddenClass}">${itemsHtml}</ul></div>`;
}

window.enterBookMode = function(bookId) {
    state.mode = 'book'; state.isPracticeMode = false; state.currentBookId = bookId; state.bookFilterRatings.clear();
    document.getElementById('view-home').classList.add('hidden');
    document.getElementById('view-detail').classList.remove('hidden');
    const book = DataManager.db.books.find(b => b.id === bookId);
    if (!book) return;

    renderPracticeMenu(book);
    renderPdfMenu(book);
    const hasPractices = book.bookPractices && book.bookPractices.length > 0;
    
    if (countBookWords(book) === 0 && hasPractices) {
        document.getElementById('chapter-sidebar')?.classList.add('collapsed'); 
        document.getElementById('btn-book-toggle').style.display = 'none';
        loadPracticeUnit(bookId, 0);
        return; 
    }

    document.getElementById('chapter-sidebar')?.classList.remove('hidden', 'collapsed');
    renderSidebarFilter('book');
    const btn = document.getElementById('btn-book-toggle'); if(btn) { btn.style.display = 'inline-block'; updateBookToggleBtn(); }
    const input = document.getElementById('chapter-search'); if(input) { input.value = ''; input.oninput = () => renderDetailSidebar(); }
    renderDetailSidebar();
    
    if(state.currentWordList.length > 0) { state.currentWordIndex = 0; renderWordDetail(state.currentWordList[0].uid); } 
    else if (!hasPractices) { document.getElementById('word-main').innerText = "暂无内容"; document.getElementById('tab-content-area').innerHTML = ""; }
}

window.enterSoloMode = function(uid) {
    state.mode = 'home_detail'; state.isPracticeMode = false;
    document.getElementById('view-home').classList.add('hidden'); document.getElementById('view-detail').classList.remove('hidden');
    document.getElementById('chapter-sidebar')?.classList.remove('hidden', 'collapsed');
    const btn = document.getElementById('btn-book-toggle'); if(btn) btn.style.display = 'none';
    renderSidebarFilter('home');
    const input = document.getElementById('chapter-search'); if(input) { input.value = ''; input.oninput = () => renderDetailSidebar(); }
    state.currentWordList = [...state.homeSearchResults]; 
    state.currentWordIndex = state.currentWordList.findIndex(w => w.uid === uid);
    renderDetailSidebar(); renderWordDetail(uid);
};

function renderBookTabs(activeType) {
    const types=DataManager.db.settings.bookCategories||[];
    document.getElementById('book-type-tabs').innerHTML=types.map(t=>`<button class="${t===activeType?'active':''}" onclick="renderBookTabs('${t}')">${t}</button>`).join('');
    const bks=DataManager.db.books.filter(b=>b.type===activeType);
    const grp={}; bks.forEach(b=>{if(!grp[b.series])grp[b.series]=[];grp[b.series].push(b)});
    document.getElementById('book-gallery').innerHTML = Object.keys(grp).map(s=>{
        const cards = grp[s].map(b=>`
            <div class="book-card" onclick="enterBookMode('${b.id}')">
                <div class="book-cover" style="background-image:url('${CONFIG.assetUrl+b.cover}')"></div>
                <div class="book-info"><div class="book-title">${b.title}</div><div class="book-count">${countBookWords(b)} words</div></div>
            </div>`).join('');
        return `<div class="series-section"><div class="series-header"><h3 class="series-title">${s}</h3></div><div class="series-scroll-container">${cards}</div></div>`;
    }).join('');
}

window.toggleClickSound = (el) => { isClickSoundEnabled = el.checked; document.querySelectorAll('input[type=checkbox][id$="sound-toggle"]').forEach(i => i.checked = el.checked); };
window.goHome = () => { document.getElementById('view-detail').classList.add('hidden'); document.getElementById('view-home').classList.remove('hidden'); state.mode = 'home'; initHome(); };
function renderSidebarFilter(mode) {
    const container = document.getElementById(mode === 'home' ? 'home-filter-stars' : 'book-filter-stars'); if(!container) return; container.innerHTML = '';
    const fs = mode === 'home' ? state.homeFilterRatings : state.bookFilterRatings;
    for(let i=1;i<=5;i++){
        const btn=document.createElement('div'); btn.className = `filter-star-btn ${fs.has(i)?'active':''}`;
        btn.innerHTML = `<img class="filter-star-img" src="${fs.has(i)?'backinfo/yestar.png':'backinfo/nostar.png'}" /><span class="filter-star-label">${i}</span>`;
        btn.onclick = () => { fs.has(i) ? fs.delete(i) : fs.add(i); mode === 'home' ? applyHomeFilter() : renderDetailSidebar(); renderSidebarFilter(mode); };
        container.appendChild(btn);
    }
}

// ====== 🧠 单词渲染引擎 (已移除自动 AI 调用) ======
window.renderWordDetail = async function(uid) {
    const word = DataManager.getWordDetail(uid);
    if (!word) return;

    // (这里的自动调用 AI 代码已经被删除了)

    document.getElementById('rating-stars').style.display = 'flex';
    document.querySelector('.main-audio').style.display = 'flex'; 
    document.getElementById('nav-buttons').style.display = 'flex'; 
    const wordBtnEl = document.getElementById('btn-toggle-word');
    if(wordBtnEl) wordBtnEl.style.visibility = 'visible'; 
    
    const contextWord = state.currentWordList.find(w => w.uid === uid);
    if (contextWord && contextWord.chapterQuizIds) word.chapterQuizIds = contextWord.chapterQuizIds;
    document.getElementById('word-main').innerText = word.word;
    renderHeaderStars(uid);
    
    if (wordBtnEl && wordBtnEl.classList.contains('active')) state.lastActiveTabTitle = null; 
    
    const tabs = document.getElementById('detail-tabs'); 
    const area = document.getElementById('tab-content-area');
    tabs.innerHTML = ''; area.innerHTML = '';
    
    const hasScene = word.displayImages && word.displayImages.length > 0;
    
    // 👇 修改点：永远为 true，保证“单词详解”Tab 始终存在，用来放生成按钮
    const hasText = true; 
    
    let availableQuizzes = word.linkedQuizzes || [];
    if (word.chapterQuizIds && word.chapterQuizIds.length > 0) availableQuizzes = availableQuizzes.filter(q => word.chapterQuizIds.includes(q.id));
    const hasQuiz = (availableQuizzes.filter(q => q.question).length + (word.quizGames||[]).length) > 0;
    const hasGame = word.games && word.games.length > 0;
    
    const items = [];
    if (hasScene) items.push({id:'scene', t:'图片'});
    if (hasText)  items.push({id:'text', t:'单词详解'});
    items.push({id:'chat', t:'🤖 AI 助教'}); // 聊天面板
    if (hasQuiz)  items.push({id:'quiz', t:'挑战一下'});
    if (hasGame)  items.push({id:'game', t:'趣味游戏'});
    if (items.length === 0) { area.innerHTML = `<div class="empty-tip">暂无内容</div>`; return; }
    
    let activeTabIndex = state.lastActiveTabTitle ? Math.max(0, items.findIndex(i => i.t === state.lastActiveTabTitle)) : 0;
    items.forEach((t, i) => {
        const b = document.createElement('button'); b.innerText = t.t; if(i === activeTabIndex) b.className = 'active';
        b.onclick = () => { tabs.querySelectorAll('button').forEach(btn => btn.classList.remove('active')); b.classList.add('active'); state.lastActiveTabTitle = t.t; renderTabContent(t.id, word, area); };
        tabs.appendChild(b);
    });
    renderTabContent(items[activeTabIndex].id, word, area);
    
    document.querySelectorAll('.abc-items li').forEach(li => { 
        li.classList.remove('active'); 
        if(li.getAttribute('onclick') && li.getAttribute('onclick').includes(uid)) {
            li.classList.add('active');
            const group = li.closest('.chapter-group');
            if(group) { const ul = group.querySelector('.abc-items'); if(ul) ul.classList.remove('hidden'); }
        }
    });
}

function renderHeaderStars(uid) {
    const c = document.getElementById('rating-stars'); c.innerHTML = '';
    const r = DataManager.getRating(uid);
    for(let i=1; i<=5; i++) {
        const img = document.createElement('img'); img.src = i<=r ? 'backinfo/yestar.png' : 'backinfo/nostar.png'; img.className = 'star-icon';
        img.onclick = () => { DataManager.saveRating(uid, i); renderHeaderStars(uid); state.mode==='home' ? applyHomeFilter() : renderDetailSidebar(); };
        c.appendChild(img);
    }
}

// ============ 🔍 Zoom 全屏查看核心逻辑 (修复找回) ============
window.toggleImageZoom = function() {
    state.isImageZoom = !state.isImageZoom;
    if (state.isImageZoom) state.currentImgIdx = 0;
    refreshCurrentTab();
};

window.enterImageZoom = function(idx) {
    state.isImageZoom = true;
    state.currentImgIdx = idx;
    refreshCurrentTab();
};

window.refreshCurrentTab = function() {
    const area = document.getElementById('tab-content-area');
    const currentWord = state.currentWordList[state.currentWordIndex];
    if (currentWord) {
        let type = 'scene'; 
        const activeBtn = document.querySelector('#detail-tabs button.active');
        if (activeBtn) {
            const t = activeBtn.innerText;
            if (t.includes('详解')) type = 'text';
            else if (t.includes('挑战') || t.includes('训练')) type = 'quiz';
            else if (t.includes('游戏')) type = 'game';
            else if (t.includes('图片')) type = 'scene';
        }
        renderTabContent(type, DataManager.getWordDetail(currentWord.uid), area);
    } else if (state.customGames && state.customGames.length > 0) {
        renderTabContent('quiz', { uid: 'custom-game-mode' }, area);
    }
};

window.navigateInZoom = function(direction) {
    const activeBtn = document.querySelector('#detail-tabs button.active');
    const tabName = activeBtn ? activeBtn.innerText : '';
    
    if (tabName.includes('图片')) {
        const currentWord = state.currentWordList[state.currentWordIndex];
        const fullDetail = DataManager.getWordDetail(currentWord.uid);
        let allImages = fullDetail.images && fullDetail.images.scene ? fullDetail.images.scene : [];
        const newIdx = state.currentImgIdx + direction;
        if (newIdx >= 0 && newIdx < allImages.length) {
            state.currentImgIdx = newIdx;
            refreshCurrentTab();
            return; 
        }
    }

    const newWordIdx = state.currentWordIndex + direction;
    if (newWordIdx >= 0 && newWordIdx < state.currentWordList.length) {
        state.currentWordIndex = newWordIdx;
        state.currentImgIdx = 0;
        const nextUid = state.currentWordList[newWordIdx].uid;
        renderWordDetail(nextUid);
        
        setTimeout(() => {
            const tabs = document.getElementById('detail-tabs');
            if(tabs) {
                Array.from(tabs.children).forEach(btn => {
                    btn.classList.remove('active');
                    if (btn.innerText === tabName) btn.classList.add('active'); 
                });
            }
            refreshCurrentTab(); 
        }, 50);
    } else {
        alert("到底啦！没有更多单词了。");
    }
};

function renderTabContent(type, word, container) {
    container.innerHTML = ''; container.scrollTop = 0;
    if (state.isImageZoom) {
        if (!container.classList.contains('pseudo-fullscreen')) container.classList.add('pseudo-fullscreen');
        if (type === 'scene') {
            container.style.background = "#000"; container.style.padding = "0";
            container.style.setProperty('overflow', 'hidden', 'important'); 
            container.style.display = "flex"; container.style.justifyContent = "center"; container.style.alignItems = "center";
            container.style.width = "100%"; container.style.height = "100%";
        } else if (type === 'text') {
            container.style.background = "#f5f5f7"; container.style.padding = "0"; container.style.overflowY = "hidden"; container.style.display = "flex";     
        } else {
            container.style.background = "#f8f9fa"; container.style.padding = "20px"; container.style.overflowY = "auto"; container.style.display = "flex";
        }
    } else {
        container.classList.remove('pseudo-fullscreen');
        if (document.fullscreenElement && document.exitFullscreen) document.exitFullscreen().catch(()=>{});
        container.style.cssText = '';
    }

    const zoomIcon = state.isImageZoom ? 
        `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"></path></svg>` : 
        `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>`;
    const fixedZoomBtn = document.createElement('button'); fixedZoomBtn.className = 'btn-fixed-zoom'; fixedZoomBtn.innerHTML = zoomIcon; fixedZoomBtn.onclick = toggleImageZoom;

    if (type === 'scene') {
        // 🔥 修复：直接使用合并好的 displayImages，确保不会因为场景图为空而漏掉卡片图
        let allImages = word.images && word.images.scene ? word.images.scene : [];
        if (allImages.length === 0) { container.innerHTML = `<div class="empty-tip">暂无图片</div>`; } 
        else if (state.isImageZoom) {
            if (state.currentImgIdx >= allImages.length) state.currentImgIdx = 0;
            container.innerHTML = `
                <button class="btn-zoom-nav prev" onclick="navigateInZoom(-1)" style="position:fixed;">❮</button>
                <button class="btn-zoom-nav next" onclick="navigateInZoom(1)" style="position:fixed;">❯</button>
                <div style="width:100%; height:100%; display:flex; justify-content:center; align-items:center;">
                    <img src="${allImages[state.currentImgIdx]}" onclick="toggleImageZoom()" style="max-width:100%; max-height:100%; width:auto; height:auto; object-fit:contain; display:block; cursor:zoom-out; margin: 0 auto; box-shadow:none;">
                    <div style="position:fixed; bottom:30px; left:50%; transform:translateX(-50%); color:rgba(255,255,255,0.8); font-weight:bold; font-size:16px; background:rgba(0,0,0,0.5); padding:4px 12px; border-radius:20px; pointer-events:none;">${state.currentImgIdx + 1} / ${allImages.length}</div>
                </div>`;
            container.appendChild(fixedZoomBtn);
        } else {
            const imgsHtml = allImages.map((src, idx) => `
                <div class="scene-img-wrapper" style="position:relative; cursor: zoom-in;" onclick="enterImageZoom(${idx})">
                    <img src="${src}" class="scene-image" style="pointer-events: none;">
                    <div style="position:absolute; right:5px; bottom:5px; background:rgba(0,0,0,0.5); color:#fff; border-radius:4px; padding:2px 6px; font-size:10px; pointer-events: none;">🔍</div>
                </div>`).join('');
            container.innerHTML = `<div class="image-box"><div class="scene-images" data-count="${allImages.length}">${imgsHtml}</div></div>`;
            container.appendChild(fixedZoomBtn);
        }
    } else if (type === 'text') {
        let navHtml = '', bodyHtml = '';
        if (word.richDetail && word.richDetail.length > 0) {
            navHtml = '<div class="rich-nav">';
            word.richDetail.forEach((s, i) => {
                const func = state.isImageZoom ? 'scrollToSectionInZoom' : 'scrollToSection';
                navHtml += `<button onclick="${func}('s-${i}')">${s.title}</button>`;
                bodyHtml += `<div id="s-${i}" class="rich-section"><h3>${s.title}</h3><div class="rich-content-body">${s.content}</div></div>`;
            });
            navHtml += '</div>';
        } else {
            // 👇 修改点：如果没有详解，则显示一个漂亮的生成按钮
            bodyHtml = `
                <div class="empty-tip" style="display:flex; flex-direction:column; align-items:center; justify-content:center; gap:20px; padding: 60px 20px;">
                    <div style="font-size: 16px; color: #999;">词库中暂无该单词的详细解释</div>
                    <button onclick="generateWordDetailAI('${word.uid}')" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; padding: 12px 30px; border-radius: 25px; font-size: 16px; font-weight: bold; cursor: pointer; box-shadow: 0 4px 15px rgba(118, 75, 162, 0.3); transition: transform 0.2s;">
                        ✨ 点击由 AI 智能生成详解
                    </button>
                </div>`;
        }

        if (state.isImageZoom) {
            container.innerHTML = `
                <button class="btn-zoom-nav prev" onclick="navigateInZoom(-1)">❮</button>
                <div class="reader-layout"><div class="reader-header">${navHtml}</div><div id="reader-scroll" class="reader-body"><h1 style="text-align:center; margin-bottom:40px; color:#333;">${word.word}</h1>${bodyHtml}<div style="height:80px;"></div></div></div>
                <button class="btn-zoom-nav next" onclick="navigateInZoom(1)">❯</button>`;
            container.appendChild(fixedZoomBtn);
            window.scrollToSectionInZoom = function(id) { const t = document.getElementById(id); const s = document.getElementById('reader-scroll'); if(t && s) s.scrollTo({top: t.offsetTop - s.offsetTop - 20, behavior: 'smooth'}); };
        } else {
            container.innerHTML = navHtml + bodyHtml; container.appendChild(fixedZoomBtn);
            window.scrollToSection = function(id) { const t = document.getElementById(id); if(t) t.scrollIntoView({behavior:'smooth', block:'start'}); };
        }
    
    } else if (type === 'quiz') {
        if (state.customGames && state.customGames.length > 0) {
            const gamesListHtml = state.customGames.map((g, idx) => `
                <div class="game-group-card" onclick="startSpookyGame(${idx})">
                    <div class="game-group-content"><div class="game-group-icon">🎃</div><div class="game-group-title">${g.title}</div><div class="game-group-info">包含 ${g.words.length} 个单词</div></div>
                </div>`).join('');
            container.innerHTML = `<div class="custom-games-container"><h3 class="custom-games-header">已生成 ${state.customGames.length} 组翻牌游戏</h3><div class="custom-games-grid">${gamesListHtml}</div><div style="text-align:center; margin-top:40px;"><button onclick="clearCustomGames()" style="color:#999; text-decoration:underline;">清空游戏并返回</button></div></div>`;
            return;
        }
        let allQuizzes = (word.linkedQuizzes || []).filter(q => !word.chapterQuizIds?.length || word.chapterQuizIds.includes(q.id)).filter(q => q.question).map(q => ({ type: 'quiz', content: q, id: q.id }));
        if (word.quizGames) word.quizGames.forEach((g, idx) => allQuizzes.push({ type: 'game', content: g.url, id: `game-${idx}` }));
        
        if (allQuizzes.length > 0) renderMixedPagination(allQuizzes, container, 0);
        else { container.innerHTML = `<div class="empty-tip">暂无挑战</div>`; container.appendChild(fixedZoomBtn); }
    } else if (type === 'game') {
        if (word.games && word.games.length > 0) {
            container.innerHTML = `<div class="rich-section" style="margin-top:0;"><div class="rich-game-group">${word.games.map(url => `<div class="rich-game-item"><iframe src="${url}" frameborder="0" allowfullscreen></iframe></div>`).join('')}</div></div>`;
        } else container.innerHTML = `<div class="empty-tip">暂无游戏</div>`;
    
    } else if (type === 'chat') {
        container.style.padding = "10px"; // 稍微小一点的边距
        
        // 快捷回复预设内容
        const quickReplies = [
            "用简单中英双语解释常见用法",
            "常见搭配",
            "考考我这个词怎么用",
            "用这个词造个句",
            "它的使用误区"
        ];

        // 构建聊天面板 HTML
        container.innerHTML = `
            <div class="chat-container">
                <div class="chat-history" id="chat-history-${word.uid}"></div>
                <div class="chat-typing hidden" id="chat-typing-${word.uid}">AI 正在思考中...</div>
                
                <div class="chat-quick-replies">
                    ${quickReplies.map(text => `<button class="chat-quick-btn" onclick="sendChatMessage('${word.uid}', '${word.word}', this.innerText)">${text}</button>`).join('')}
                </div>
                
                <div class="chat-input-area">
                    <input type="text" id="chat-input-${word.uid}" placeholder="有什么不懂的，问问 AI 助教..." onkeypress="if(event.key==='Enter') sendChatMessage('${word.uid}', '${word.word}')">
                    <button class="chat-send-btn" id="chat-sendbtn-${word.uid}" onclick="sendChatMessage('${word.uid}', '${word.word}')">
                        <svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
                    </button>
                </div>
            </div>
        `;

        // 渲染历史记录
        renderChatHistory(word.uid, word.word);
    }
}

function getWordQuizCount(word) {
    let count = 0;
    let quizzes = word.linkedQuizzes || [];
    if (word.chapterQuizIds && word.chapterQuizIds.length > 0) quizzes = quizzes.filter(q => word.chapterQuizIds.includes(q.id));
    count += quizzes.filter(q => q.question && q.question.trim().length > 0).length;
    if (word.quizGames) count += word.quizGames.length;
    return count;
}

function getQuizProgressInfo(activeIndex, currentItemTotal) {
    let line1 = "", line2 = "";
    if (state.isPracticeMode) {
        const book = DataManager.db.books.find(b => b.id === state.currentBookId);
        if (book && book.bookPractices) {
            const practice = book.bookPractices[state.currentPracticeIndex];
            line1 = `${practice.name} (${activeIndex + 1}/${currentItemTotal})`;
            let totalBook = 0, currentBook = 0;
            for (let i = 0; i < book.bookPractices.length; i++) {
                const validCount = (book.bookPractices[i].quizIds || []).filter(qid => DataManager.db.quizzes[qid]).length;
                totalBook += validCount;
                if (i < state.currentPracticeIndex) currentBook += validCount;
                else if (i === state.currentPracticeIndex) currentBook += (activeIndex + 1);
            }
            line2 = `本书 (${currentBook}/${totalBook})`;
        }
    } else {
        const currentWord = state.currentWordList[state.currentWordIndex];
        if (!currentWord) return { line1: "", line2: "" };
        let groupName = "", groupTotal = 0, groupCurrent = 0, bookTotal = 0, bookCurrent = 0, scopeWords = []; 
        if (state.mode === 'book') {
            const book = DataManager.db.books.find(b => b.id === state.currentBookId);
            if (book) {
                const ch = book.chapters.find(c => c.wordIds.some(id => (typeof id === 'string' ? id.includes(currentWord.uid) : id.uid === currentWord.uid)));
                if (ch) { groupName = ch.name; scopeWords = state.currentWordList.filter(w => new Set(ch.wordIds.map(item => typeof item === 'string' ? item.split(':')[0] : item.uid)).has(w.uid)); }
            }
        } else {
            groupName = currentWord.word[0].toUpperCase();
            scopeWords = state.currentWordList.filter(w => w.word[0].toUpperCase() === groupName);
        }
        for (let w of scopeWords) { let qCount = getWordQuizCount(w); groupTotal += qCount; if (w.uid === currentWord.uid) groupCurrent += (activeIndex + 1); else if (state.currentWordList.indexOf(w) < state.currentWordList.indexOf(currentWord)) groupCurrent += qCount; }
        line1 = `${groupName} (${groupCurrent}/${groupTotal})`;
        for (let i = 0; i < state.currentWordList.length; i++) { let qCount = getWordQuizCount(state.currentWordList[i]); bookTotal += qCount; if (i < state.currentWordIndex) bookCurrent += qCount; else if (i === state.currentWordIndex) bookCurrent += (activeIndex + 1); }
        line2 = `${state.mode === 'book' ? "本书" : "总计"} (${bookCurrent}/${bookTotal})`;
    }
    return { line1, line2 };
}

function renderMixedPagination(items, container, activeIndex) {
    container.innerHTML = ''; container.scrollTop = 0;
    
    const pageContainer = document.createElement('div'); pageContainer.className = 'quiz-pagination';
    if (items.length > 1) {
        items.forEach((it, idx) => {
            const btn = document.createElement('button'); btn.className = `quiz-page-btn ${idx === activeIndex ? 'active' : ''}`;
            btn.innerHTML = it.type === 'game' ? '<span style="font-size:14px;">🎮</span>' : idx + 1;
            btn.onclick = () => renderMixedPagination(items, container, idx);
            pageContainer.appendChild(btn);
        });
    } else { pageContainer.style.visibility = 'hidden'; pageContainer.appendChild(document.createElement('button')); }
    container.appendChild(pageContainer);

    const item = items[activeIndex]; let contentHtml = '';
    const zoomIcon = state.isImageZoom ? `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"></path></svg>` : `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>`;
    const zoomBtnHtml = `<button class="btn-quiz-zoom" onclick="toggleImageZoom()" style="z-index:55;">${zoomIcon}</button>`;
    const progress = getQuizProgressInfo(activeIndex, items.length);
    const infoHtml = `<div class="quiz-info-text"><div>${progress.line1}</div><div>${progress.line2}</div></div>`;

    if (item.type === 'game') {
        contentHtml = `<div class="quiz-box">${zoomBtnHtml}${infoHtml} <div class="quiz-q"><span style="color:var(--primary); font-size:0.8em; margin-right:8px;">Q${activeIndex + 1}.</span>互动游戏</div><div class="game-container" style="margin:0; padding:0;"><div class="game-wrapper"><iframe src="${item.content}" frameborder="0" allowfullscreen></iframe></div></div></div>`;
    } else if (item.type === 'quiz') {
        const q = item.content;
        
        // --- 🧠 AI 词义配图题渲染逻辑 ---
        if (q.type === 'vocab_ai_image') {
            const fullImgSrc = q.image ? (q.image.startsWith('http') ? q.image : CONFIG.assetUrl + q.image) : null;
            const imgDisplay = q.showImage ? 'block' : 'none'; const maskDisplay = q.showImage ? 'none' : 'flex'; const btnText = q.showImage ? '🙈 隐藏图片' : '👁️ 显示图片';
            let imgHtml = fullImgSrc ? `<div style="display:flex; flex-direction:column; align-items:flex-end;"><button class="quiz-img-toggle ${q.showImage?'active':''}" onclick="toggleQuizImage(this, 'quiz-img-${activeIndex}')">${btnText}</button><div class="quiz-stem-image-box" id="quiz-img-${activeIndex}"><img src="${fullImgSrc}" class="quiz-stem-img" style="display:${imgDisplay}"><div class="quiz-img-mask" style="display:${maskDisplay}"><span>图片已隐藏</span></div></div></div>` : '';

            contentHtml = `<div class="quiz-box">${zoomBtnHtml}${infoHtml}<div class="quiz-q" style="margin-bottom:20px;"><span style="color:var(--primary); font-size:0.6em;">Q${activeIndex + 1}.</span> Choose the correct word:</div><div class="quiz-stem-wrapper"><div class="quiz-stem-text">${q.question}</div>${imgHtml}</div><div class="quiz-opts">`;
            q.options.forEach((o, idx) => { contentHtml += `<button class="opt-btn" onclick="checkAnswer(this,${idx},${q.answer})"><span>${String.fromCharCode(65 + idx)}</span>${o}</button>`; });
            contentHtml += `</div></div>`;
        } 
        else if (q.type === 'matching') {
            contentHtml = `<div class="quiz-box">${zoomBtnHtml}${infoHtml} <div class="quiz-q"><span style="color:var(--primary); font-size:0.8em; margin-right:8px;">Q${activeIndex + 1}.</span>${q.title || "Match the pairs"}</div><div class="match-container" id="match-area-${activeIndex}"></div><div id="match-feedback-${activeIndex}" style="text-align:center; margin-top:15px; height:20px; color:var(--green); font-weight:bold;"></div></div>`;
            setTimeout(() => initMatchingGame(q, `match-area-${activeIndex}`, `match-feedback-${activeIndex}`), 0);
        } else {
            contentHtml = `<div class="quiz-box">${zoomBtnHtml}${infoHtml} <div class="quiz-q"><span style="color:var(--primary); font-size:0.8em; margin-right:8px;">Q${activeIndex + 1}.</span>${q.question}</div><div class="quiz-opts" style="${q.type === 'choice_image' ? 'grid-template-columns:1fr 1fr;' : ''}">`;
            q.options.forEach((o, idx) => { contentHtml += `<button class="opt-btn" onclick="checkAnswer(this,${idx},${q.answer})"><span>${String.fromCharCode(65 + idx)}</span>${typeof o === 'object' && o.label ? o.label : o}</button>`; });
            contentHtml += `</div></div>`;
        }
    }

    const wrapper = document.createElement('div'); wrapper.style.width = '100%'; wrapper.innerHTML = contentHtml; container.appendChild(wrapper);

    const nextBtn = document.createElement('button'); nextBtn.className = 'btn-big-next';
    const arrowIcon = `<svg style="width:20px; height:20px; margin-left:8px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>`;
    nextBtn.innerHTML = activeIndex < items.length - 1 ? `Next Question ${arrowIcon}` : (state.isPracticeMode ? `Next Unit ${arrowIcon}` : `Next Word ${arrowIcon}`);
    nextBtn.onclick = () => handleBigNextClick(items, container, activeIndex);
    container.appendChild(nextBtn);

    const zoomBtn = document.createElement('button'); zoomBtn.className = 'btn-fixed-zoom';
    zoomBtn.innerHTML = state.isImageZoom ? `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"></path></svg>` : `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>`;
    zoomBtn.onclick = toggleImageZoom; container.appendChild(zoomBtn);
}

function initMatchingGame(quizData, containerId, feedbackId) {
    const container = document.getElementById(containerId); if (!container) return;
    const leftItems = quizData.pairs.map((p, i) => ({ text: p.left, id: i })), rightItems = quizData.pairs.map((p, i) => ({ text: p.right, id: i })).sort(() => Math.random() - 0.5);
    const colLeft = document.createElement('div'); colLeft.className = 'match-col'; const colRight = document.createElement('div'); colRight.className = 'match-col';
    const appendContent = (btn, content) => { if (/\.(webp|png|jpg|jpeg|gif)$/i.test(content)) { btn.innerHTML = `<img src="${content.startsWith('http') ? content : CONFIG.assetUrl + CONFIG.imgFolder + content}" class="match-img" />`; btn.classList.add('has-image'); } else btn.innerText = content; };
    leftItems.forEach(item => { const btn = document.createElement('div'); btn.className = 'match-item'; appendContent(btn, item.text); btn.dataset.id = item.id; btn.dataset.side = 'left'; btn.onclick = (e) => handleMatchClick(e.currentTarget, feedbackId); colLeft.appendChild(btn); });
    rightItems.forEach(item => { const btn = document.createElement('div'); btn.className = 'match-item'; appendContent(btn, item.text); btn.dataset.id = item.id; btn.dataset.side = 'right'; btn.onclick = (e) => handleMatchClick(e.currentTarget, feedbackId); colRight.appendChild(btn); });
    container.appendChild(colLeft); container.appendChild(colRight);
}

let selectedLeft = null, selectedRight = null;
function handleMatchClick(el, feedbackId) {
    if (el.classList.contains('matched')) return;
    el.parentElement.querySelectorAll('.match-item').forEach(b => b.classList.remove('selected')); el.classList.add('selected');
    el.dataset.side === 'left' ? selectedLeft = el : selectedRight = el;
    if (selectedLeft && selectedRight) {
        const fb = document.getElementById(feedbackId);
        if (selectedLeft.dataset.id === selectedRight.dataset.id) {
            selectedLeft.classList.remove('selected'); selectedRight.classList.remove('selected'); selectedLeft.classList.add('matched'); selectedRight.classList.add('matched');
            audioCorrect.currentTime=0; audioCorrect.play().catch(()=>{}); selectedLeft = null; selectedRight = null;
            if(document.querySelectorAll('.match-item.matched').length === document.querySelectorAll('.match-item').length) fb.innerText = "🎉 All Matched!";
        } else {
            selectedLeft.classList.add('error'); selectedRight.classList.add('error'); audioWrong.currentTime=0; audioWrong.play().catch(()=>{});
            setTimeout(() => { if(selectedLeft) { selectedLeft.classList.remove('error', 'selected'); } if(selectedRight) { selectedRight.classList.remove('error', 'selected'); } selectedLeft = null; selectedRight = null; }, 500);
        }
    }
}

function scrollToSection(id) { const target = document.getElementById(id); if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
function checkAnswer(btn, idx, corr) {
    if (btn.classList.contains('correct') || btn.classList.contains('wrong')) return;
    if (idx === corr) { btn.classList.add('correct'); if (isClickSoundEnabled) { audioCorrect.currentTime = 0; audioCorrect.play().catch(()=>{}); } } 
    else { btn.classList.add('wrong', 'shake'); if (isClickSoundEnabled) { audioWrong.currentTime = 0; audioWrong.play().catch(()=>{}); } setTimeout(() => btn.classList.remove('shake', 'wrong'), 500); }
}

window.toggleSidebar = () => document.getElementById('chapter-sidebar').classList.toggle('collapsed');
window.openModal = src => { document.getElementById('image-modal').style.display='block'; document.getElementById('modal-img').src=src; };
window.closeModal = () => document.getElementById('image-modal').style.display='none';
window.playCurrentWord = () => { const u=new SpeechSynthesisUtterance(document.getElementById('word-main').innerText); u.lang='en-US'; if(preferredVoice)u.voice=preferredVoice; speechSynthesis.speak(u); };
window.prevWord = () => { if(state.currentWordIndex>0) { state.currentWordIndex--; renderWordDetail(state.currentWordList[state.currentWordIndex].uid); } };
window.nextWord = () => { if(state.currentWordIndex<state.currentWordList.length-1) { state.currentWordIndex++; renderWordDetail(state.currentWordList[state.currentWordIndex].uid); } };
window.jumpToWord = uid => { state.isPracticeMode = false; state.currentPracticeIndex = 0; state.customGames = null; if (state.mode === 'home') { enterSoloMode(uid); return; } const i = state.currentWordList.findIndex(w => w.uid === uid); if (i !== -1) { state.currentWordIndex = i; document.getElementById('chapter-sidebar')?.classList.remove('collapsed'); renderWordDetail(uid); } };
function initVoices() { const vs=speechSynthesis.getVoices(); if(vs.length) preferredVoice=vs.find(v=>v.name.includes('Google US'))||vs.find(v=>v.lang==='en-US'); }
window.exportData = () => alert(JSON.stringify(DataManager.db.ratings));

window.toggleWordVisibility = () => { const btn = document.getElementById('btn-toggle-word'); const isActive = btn.classList.toggle('active'); document.getElementById('word-main').style.opacity = isActive ? '1' : '0'; btn.innerText = isActive ? '显示单词' : '隐藏单词'; if(isActive) state.lastActiveTabTitle = null; };
window.togglePracticeMenu = () => document.getElementById('practice-menu-content').classList.toggle('show');
window.onclick = (e) => { 
    if (!e.target.closest('.practice-dropdown')) {
        document.querySelectorAll('.dropdown-content').forEach(d => d.classList.remove('show')); 
    } 
};
function renderPracticeMenu(book) {
    const menu = document.getElementById('practice-menu-content'); 
    document.getElementById('book-practice-container').style.display = 'inline-block'; 
    
    // 👇 第三个按钮改为了 window.open，点击后直接在新标签页打开您的 GitHub 网站
    const createBtnHtml = `
        <button onclick="toggleCreationMode('game')"  special-create-btn" style="color:#E91E63; font-weight:800; border-bottom:1px dashed #eee;">创建翻牌游戏</button>
        <button onclick="toggleCreationMode('quiz')"  special-create-btn" style="color:var(--primary); font-weight:800; border-bottom:1px dashed #eee;">AI单选题</button>
        <button onclick="window.open('https://gemini.google.com/share/3e6cc57726ed', '_blank')"  special-create-btn" style="color:#008080; font-weight:800; border-bottom:1px dashed #eee;">Canvas</button>
    `;
    
    menu.innerHTML = createBtnHtml + (book.bookPractices && book.bookPractices.length > 0 ? book.bookPractices.map((p, i) => `<button onclick="loadPracticeUnit('${book.id}', ${i})">${p.name}</button>`).join('') : `<div style="padding:10px; color:#999; font-size:12px;">本书暂无预设练习</div>`);
}

window.loadPracticeUnit = (bookId, idx) => {
    const book = DataManager.db.books.find(b => b.id === bookId); if (!book || !book.bookPractices || !book.bookPractices[idx]) return;
    state.isPracticeMode = true; state.currentBookId = bookId; state.currentPracticeIndex = idx;
    document.getElementById('word-main').innerText = book.bookPractices[idx].name;
    document.getElementById('rating-stars').style.display = 'none'; document.querySelector('.main-audio').style.display = 'none'; document.getElementById('nav-buttons').style.display = 'none';
    const wordBtn = document.getElementById('btn-toggle-word'); if(wordBtn) wordBtn.style.visibility = 'hidden';
    const area = document.getElementById('tab-content-area'); document.getElementById('detail-tabs').innerHTML = `<button class="active">挑战一下</button>`;
    const challengeList = (book.bookPractices[idx].quizIds || []).map(qid => { const quiz = DataManager.db.quizzes[qid]; return quiz ? (quiz.type === 'game' ? { type: 'game', content: quiz.gameUrl, id: qid } : { type: 'quiz', content: quiz, id: qid }) : null; }).filter(Boolean);
    challengeList.length > 0 ? renderMixedPagination(challengeList, area, 0) : (area.innerHTML = `<div class="empty-tip">该单元暂无题目</div>`);
    document.getElementById('practice-menu-content').classList.remove('show');
}

function parseRichContent(c) {
    if (!c) return "";
    return c.replace(/\[L1\](.*?)\[\/L1\]/g, '<div class="level-1">$1</div>').replace(/\[L2\](.*?)\[\/L2\]/g, '<div class="level-2">$1</div>').replace(/\[L3\](.*?)\[\/L3\]/g, '<div class="level-3">$1</div>').replace(/\[L4\](.*?)\[\/L4\]/g, '<div class="level-4">$1</div>')
    .replace(/\[PH\](.*?)\[\/PH\]/g, '<span class="rich-phonetic">$1</span>').replace(/\[POS\](.*?)\[\/POS\]/g, '<span class="rich-tag tag-pos">$1</span>').replace(/\[CN\](.*?)\[\/CN\]/g, '<span class="text-cn">$1</span>').replace(/\[EN\](.*?)\[\/EN\]/g, '<span class="text-en">$1</span>')
    .replace(/\[DEF\]([\s\S]*?)\[\/DEF\]/g, '<div class="def-block">$1</div>').replace(/\[COLL\]([\s\S]*?)\[\/COLL\]/g, '<div class="col-block">$1</div>').replace(/\[H\](.*?)\|(.*?)\[\/H\]/g, '<div class="col-header"><span class="text-en">$1</span><span class="text-cn">$2</span></div>').replace(/\[H\]([\s\S]*?)\[\/H\]/g, '<div class="col-header">$1</div>')
    .replace(/\[C\]([\s\S]*?)\[\/C\]/g, '<span class="col-chip">$1</span>').replace(/\[DU\](.*?)\|(.*?)\[\/DU\]/g, '<div class="text-du"><span class="en">$1</span><span class="cn">$2</span></div>').replace(/\[EX\](.*?)\|(.*?)\[\/EX\]/g, '<div class="block-example"><span class="en">$1</span><span class="cn">$2</span></div>')
    .replace(/\[ERR\](.*?)\[\/ERR\]/g, '<div class="block-mistake"><b>常见误区:</b> $1</div>').replace(/\[CR\](.*?)\[\/CR\]/g, '<div class="block-cr"><b>重要:</b> $1</div>').replace(/\[CO\](.*?)\[\/CO\]/g, '<div class="block-co"><b>注意:</b> $1</div>').replace(/\[CB\](.*?)\[\/CB\]/g, '<div class="block-cb"><b>笔记:</b> $1</div>')
    .replace(/\[IMG\]([\s\S]*?)\[\/IMG\]/g, (m, p1) => `<div class="rich-img-group" data-count="${p1.split('|').length}">${p1.split('|').map(s => `<img src="${s.trim().startsWith('http') ? s.trim() : CONFIG.assetUrl + s.trim()}" onclick="openModal('${s.trim().startsWith('http') ? s.trim() : CONFIG.assetUrl + s.trim()}')">`).join('')}</div>`)
    .replace(/\[GAME\]([\s\S]*?)\[\/GAME\]/g, (m, p1) => `<div class="rich-game-group">${p1.split('|').map(s => `<div class="rich-game-item"><iframe src="${s.trim()}" frameborder="0" allowfullscreen></iframe></div>`).join('')}</div>`).replace(/\n/g, '<br>');
}

function handleBigNextClick(items, container, activeIndex) {
    if (activeIndex < items.length - 1) { renderMixedPagination(items, container, activeIndex + 1); return; }
    if (state.isPracticeMode) {
        const book = DataManager.db.books.find(b => b.id === state.currentBookId);
        if (book && book.bookPractices && state.currentPracticeIndex + 1 < book.bookPractices.length) { loadPracticeUnit(state.currentBookId, state.currentPracticeIndex + 1); document.getElementById('tab-content-area').scrollTop = 0; } 
        else alert("🎉 恭喜！本书所有练习已完成！");
    } else {
        if (state.currentWordIndex < state.currentWordList.length - 1) { state.currentWordIndex++; state.lastActiveTabTitle = '挑战一下'; renderWordDetail(state.currentWordList[state.currentWordIndex].uid); } 
        else alert("🎉 恭喜！本列表单词已全部学完！");
    }
}

// ============ 🃏 选词模式控制逻辑 ============
let isCreationMode = false, selectedWordUIDs = new Set(), creationTarget = 'game';

window.toggleCreationMode = (target) => {
    isCreationMode = true; creationTarget = target || 'game'; selectedWordUIDs.clear();
    document.querySelector('.search-box')?.classList.add('hidden'); document.getElementById('creation-bar')?.classList.remove('hidden');
    updateSelectionCount(); renderDetailSidebar(); document.getElementById('practice-menu-content')?.classList.remove('show');
}
window.exitCreationMode = () => { isCreationMode = false; selectedWordUIDs.clear(); document.querySelector('.search-box')?.classList.remove('hidden'); document.getElementById('creation-bar')?.classList.add('hidden'); renderDetailSidebar(); }
function updateSelectionCount() { const el = document.getElementById('sidebar-select-count'); if (el) el.innerText = selectedWordUIDs.size; }
window.toggleWordSelection = (uid) => { selectedWordUIDs.has(uid) ? selectedWordUIDs.delete(uid) : selectedWordUIDs.add(uid); const cb = document.querySelector(`input[onclick*="'${uid}'"]`); if(cb) cb.checked = selectedWordUIDs.has(uid); updateSelectionCount(); }

let currentSelectedThemeId = 'spooky';
window.openConfigModal = () => {
    if (selectedWordUIDs.size < 1) { alert("请至少选择 1 个单词！"); return; }
    if (creationTarget === 'quiz') {
        document.getElementById('quiz-selected-count').innerText = selectedWordUIDs.size;
        document.getElementById('quiz-config-modal').classList.remove('hidden');
    } else {
        if (selectedWordUIDs.size < 2) { alert("翻牌游戏至少需要2个单词"); return; }
        document.getElementById('selected-count').innerText = selectedWordUIDs.size; document.getElementById('game-config-modal').classList.remove('hidden');
        const container = document.getElementById('modal-theme-list'); container.innerHTML = '';
        Object.keys(THEMES).forEach(key => {
            const div = document.createElement('div'); div.className = `theme-option ${key === currentSelectedThemeId ? 'selected' : ''}`; div.style.backgroundImage = `url('${THEMES[key].thumb}')`; div.innerHTML = `<span>${THEMES[key].name}</span>`;
            div.onclick = () => { currentSelectedThemeId = key; Array.from(container.children).forEach(c => c.classList.remove('selected')); div.classList.add('selected'); };
            container.appendChild(div);
        });
    }
}
window.closeConfigModal = () => document.getElementById('game-config-modal').classList.add('hidden');
window.closeQuizConfigModal = () => document.getElementById('quiz-config-modal').classList.add('hidden');
window.toggleQuizImage = (btn, cid) => { const c = document.getElementById(cid); if (!c) return; const img = c.querySelector('img'), mask = c.querySelector('.quiz-img-mask'); if (img.style.display === 'none') { img.style.display = 'block'; mask.style.display = 'none'; btn.innerHTML = '🙈 隐藏图片'; btn.classList.add('active'); } else { img.style.display = 'none'; mask.style.display = 'flex'; btn.innerHTML = '👁️ 显示图片'; btn.classList.remove('active'); } }

window.confirmGameGeneration = () => {
    const groupSize = parseInt(document.getElementById('group-size-select').value), uids = Array.from(selectedWordUIDs), newGames = [];
    for (let i = 0; i < uids.length; i += groupSize) {
        let chunk = uids.slice(i, i + groupSize); if (chunk.length < groupSize) chunk = chunk.concat(uids.slice(0, groupSize - chunk.length));
        newGames.push({ id: `game-${Date.now()}-${i}`, words: chunk, type: 'spooky-memory', title: `Group ${Math.floor(i/groupSize) + 1}`, themeId: currentSelectedThemeId });
    }
    state.customGames = newGames; closeConfigModal(); exitCreationMode();
    document.querySelectorAll('#detail-tabs button').forEach(btn => btn.classList.remove('active'));
    renderTabContent('quiz', { uid: 'custom-game-mode' }, document.getElementById('tab-content-area'));
}
window.clearCustomGames = () => { state.customGames = null; if (state.currentWordList[state.currentWordIndex]) renderWordDetail(state.currentWordList[state.currentWordIndex].uid); }

// ============ 🧠 真 AI 实时出题核心 ============
window.generateVocabQuiz = async function() {
    const imgSetting = document.getElementById('quiz-img-setting')?.value || 'show'; 
    if (selectedWordUIDs.size === 0) { alert("请先选择单词！"); return; }
    const uids = Array.from(selectedWordUIDs);
    const quizList = [];

    try {
        showAILoading(`🧠 Gemini 正在为您定制 ${uids.length} 道专项训练题...`);
        for (let uid of uids) {
            const targetWord = DataManager.getWordDetail(uid);
            if (!targetWord) continue;
            const prompt = `你是一位专业的儿童英语出题专家。请为学习者生成一道关于单词 "${targetWord.word}" 的单选题。
            【要求】
            1. 题干是一个生动有趣的英文句子，将目标单词用 "___" 留空。题干的用词和句子结构不要太复杂。
            2. 提供4个选项，只有一个是正确单词，其他3个为同词性的合理干扰项。
            【强制格式】
            严格以 JSON 格式输出，不要包含Markdown代码块：
            { "question": "题干", "options": ["选项A", "选项B", "选项C", "选项D"], "answer": 0 }`;

            const aiJsonText = await AI_MANAGER.ask(prompt, true);
            const aiQuizData = parseAIJson(aiJsonText);

            quizList.push({
                type: 'quiz', id: `ai-quiz-${uid}`,
                content: { type: 'vocab_ai_image', question: aiQuizData.question, options: aiQuizData.options, answer: aiQuizData.answer, image: targetWord.images?.card?.[0] || targetWord.images?.scene?.[0] || null, showImage: imgSetting === 'show' }
            });
        }
        hideAILoading();
    } catch(e) {
        hideAILoading();
        if(e.message !== 'NO_API_KEY') { console.error(e); alert("❌ AI 出题失败，请检查网络或稍后再试。"); }
        return; 
    }

    closeQuizConfigModal(); exitCreationMode();
    const area = document.getElementById('tab-content-area'), tabs = document.getElementById('detail-tabs');
    if (tabs) tabs.innerHTML = `<button class="active">🧠 AI 专项训练</button>`;
    quizList.sort(() => Math.random() - 0.5);
    renderMixedPagination(quizList, area, 0);
};

// ============ 🃏 Spooky Game Engine ============
let gameVideo, gameBgm, sCard1 = null, sCard2 = null, sLock = false;
function resetSpookyLogic() { [sCard1, sCard2, sLock] = [null, null, false]; }

window.startSpookyGame = function(gameIndex) {
    const gameData = state.customGames[gameIndex]; if (!gameData) return;
    let activeThemeId = gameData.themeId || 'spooky', themeConfig = THEMES[activeThemeId];
    let container = document.getElementById('game-fullscreen-container') || document.body.appendChild(Object.assign(document.createElement('div'), {id: 'game-fullscreen-container'}));
    
    container.innerHTML = `
        <video id="game-video-bg" playsinline webkit-playsinline muted style="position: absolute; width: 100%; height: 100%; object-fit: cover; z-index: 1; background: #000;"><source src="${themeConfig.introVideo}" type="video/mp4"></video>
        <div id="game-start-overlay" class="game-start-overlay"><div style="font-size:60px; margin-bottom:20px;">🎃</div><div id="start-screen-theme-list" class="theme-selector" style="margin-bottom:30px;"></div><button class="btn-game-start" onclick="realStartGameAction()">▶ START GAME</button><p style="margin-top:15px; opacity:0.8; font-size:14px;">Tap to enter the Game</p></div>
        <button class="btn-exit-game" onclick="exitSpookyGame()">退出游戏</button>
        <div id="game-board-layer" style="opacity: 0; transition: opacity 1s; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; position: relative; z-index: 10;"><div id="spooky-grid" class="spooky-grid"></div></div>
        <div id="victory-view" class="victory-overlay"><img src="https://cdn.jsdelivr.net/gh/mengmeng0415/wordpic01/youwin.png" class="victory-img" alt="You Win"><button class="btn-victory-ok" onclick="exitSpookyGame()">OK</button></div>
        <audio id="sfx-open-dynamic" src="${themeConfig.introAudio}"></audio><audio id="bgm-dynamic" src="${themeConfig.bgm}" loop></audio>
    `;

    const themeSelector = document.getElementById('start-screen-theme-list');
    const switchThemeInLobby = (newKey) => {
        activeThemeId = newKey; themeConfig = THEMES[newKey]; themeSelector.innerHTML = '';
        Object.keys(THEMES).forEach(key => {
            const div = document.createElement('div'); div.className = `theme-option ${key === activeThemeId ? 'selected' : ''}`; div.style.backgroundImage = `url('${THEMES[key].thumb}')`; div.innerHTML = `<span>${THEMES[key].name}</span>`;
            div.onclick = (e) => { e.stopPropagation(); switchThemeInLobby(key); }; themeSelector.appendChild(div);
        });
        document.getElementById('game-video-bg').src = themeConfig.introVideo; document.getElementById('game-video-bg').load();
        document.getElementById('sfx-open-dynamic').src = themeConfig.introAudio; document.getElementById('bgm-dynamic').src = themeConfig.bgm;
        const grid = document.getElementById('spooky-grid'); grid.style.setProperty('--card-back', `url('${themeConfig.cardBack}')`); grid.style.setProperty('--card-front-bg', `url('${themeConfig.cardFrontBg}')`);
    };
    setTimeout(() => switchThemeInLobby(activeThemeId), 0);

    const cards = [];
    gameData.words.forEach(uid => {
        const w = DataManager.getWordDetail(uid); if (!w) return;
        const cardData = { id: uid, text: w.word, img: w.images?.card?.[0] || w.displayImages?.[0] || '' };
        cards.push(cardData, cardData);
    });
    cards.sort(() => Math.random() - 0.5);

    const grid = document.getElementById('spooky-grid'); const columns = Math.ceil(cards.length / 2);
    grid.style.gridTemplateColumns = `repeat(${columns}, 1fr)`; grid.style.maxWidth = (columns * 34) + 'vh';
    grid.innerHTML = cards.map((c, i) => `<div class="spooky-card" id="card-${c.id}-${i}" data-idx="${i}" onclick="flipSpookyCard(this, '${c.id}', '${c.text.replace(/'/g, "\\'")}')"><div class="face front"><div class="front-img-container">${c.img ? `<img src="${c.img}">` : '<span class="no-img-text">No Image</span>'}</div><span class="front-word-text">${c.text}</span><div class="stamp-container"></div></div><div class="face back"></div></div>`).join('') + '<div id="grid-overlay" class="grid-overlay"></div>';

    window.realStartGameAction = () => {
        document.getElementById('game-start-overlay').style.display = 'none';
        gameVideo = document.getElementById('game-video-bg'); gameVideo.muted = true; gameVideo.play().catch(()=>{});
        ['bgm-dynamic', 'sfx-open-dynamic', 'sfx-shuffle', 'sfx-match', 'sfx-notmatch', 'sfx-flip', 'sfx-win'].forEach(id => { const audio = document.getElementById(id); if (audio) { audio.muted = false; audio.volume = id.includes('bgm') || id.includes('open') ? 0.6 : 1.0; const p = audio.play(); if (p) p.then(() => { audio.pause(); audio.currentTime = 0; }).catch(()=>{}); } });
        setTimeout(() => document.getElementById('sfx-open-dynamic')?.play().catch(()=>{}), 100);
        if (container.requestFullscreen) container.requestFullscreen().catch(()=>{}); else if (container.webkitRequestFullscreen) container.webkitRequestFullscreen().catch(()=>{});
        setTimeout(() => {
            document.getElementById('game-board-layer').style.opacity = '1';
            const openMusic = document.getElementById('sfx-open-dynamic'), bgm = document.getElementById('bgm-dynamic');
            if (openMusic) { openMusic.pause(); openMusic.currentTime = 0; } if (bgm) { bgm.currentTime = 0; bgm.play().catch(()=>{}); }
            safePlayAudio('sfx-shuffle'); document.querySelectorAll('.spooky-card').forEach(c => c.classList.add('shuffling'));
            setTimeout(() => document.querySelectorAll('.spooky-card').forEach(c => c.classList.remove('shuffling')), 1000);
        }, themeConfig.introDuration);
    };
    resetSpookyLogic();
}

window.exitSpookyGame = () => { document.getElementById('game-fullscreen-container')?.remove(); if (document.exitFullscreen) document.exitFullscreen().catch(()=>{}); if (gameBgm) gameBgm.pause(); if (gameVideo) gameVideo.pause(); }

window.flipSpookyCard = (el, uid, wordText) => {
    if (sLock || (sCard1 && el === sCard1.el) || el.classList.contains('matched')) return;
    let isSecondCard = false; if (!sCard1) sCard1 = { el, uid }; else { sCard2 = { el, uid }; sLock = true; isSecondCard = true; }
    el.classList.add('flipped'); setTimeout(() => safePlayAudio('sfx-flip'), 50);
    setTimeout(() => {
        let hasTriggered = false, safetyTimer = null;
        const triggerNextStep = () => { if (hasTriggered) return; hasTriggered = true; if (safetyTimer) clearTimeout(safetyTimer); if (isSecondCard) checkSpookyMatch(); };
        let hasSpeech = false;
        try { if ('speechSynthesis' in window) { speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(wordText); u.lang = 'en-US'; if (preferredVoice) u.voice = preferredVoice; u.onend = triggerNextStep; u.onerror = triggerNextStep; speechSynthesis.speak(u); hasSpeech = true; safetyTimer = setTimeout(triggerNextStep, 1200); } } catch (e) {}
        if (!hasSpeech) triggerNextStep();
    }, 350);
}

function checkSpookyMatch() {
    sLock = true; const card1 = sCard1, card2 = sCard2, isMatch = card1.uid === card2.uid;
    setTimeout(() => {
        if (isMatch) {
            document.getElementById('grid-overlay')?.classList.add('active');
            [card1.el, card2.el].forEach((el, index) => { const rect = el.getBoundingClientRect(), tx = window.innerWidth / 2 - (rect.left + rect.width / 2) + (index === 0 ? -rect.width * 0.9 : rect.width * 0.9), ty = window.innerHeight / 2 - (rect.top + rect.height / 2); el.style.zIndex = "9999"; el.style.transition = "transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)"; el.style.transform = `translate(${tx}px, ${ty}px) scale(1.5) rotateY(180deg)`; });
            setTimeout(() => { safePlayAudio('sfx-match'); showStamp(card1.el, 'match'); showStamp(card2.el, 'match'); }, 500);
            setTimeout(() => { removeStamp(card1.el); removeStamp(card2.el); }, 1500);
            setTimeout(() => { card1.el.style.opacity = '0'; card2.el.style.opacity = '0'; card1.el.classList.add('matched'); card2.el.classList.add('matched'); if (document.querySelectorAll('.spooky-card:not(.matched)').length === 0) setTimeout(() => { document.getElementById('bgm-dynamic')?.pause(); safePlayAudio('sfx-win'); document.getElementById('victory-view')?.classList.add('show'); }, 500); }, 3000);
            setTimeout(() => { document.getElementById('grid-overlay')?.classList.remove('active'); resetSpookyLogic(); }, 3200);
        } else {
            safePlayAudio('sfx-notmatch'); showStamp(card1.el, 'notmatch'); showStamp(card2.el, 'notmatch'); card1.el.classList.add('shake'); card2.el.classList.add('shake');
            setTimeout(() => { removeStamp(card1.el); removeStamp(card2.el); card1.el.classList.remove('flipped', 'shake'); card2.el.classList.remove('flipped', 'shake'); resetSpookyLogic(); }, 1500);
        }
    }, 300);
}
function showStamp(cardEl, type) { const c = cardEl.querySelector('.stamp-container'); c.style.backgroundImage = `url('${type === 'match' ? 'https://cdn.jsdelivr.net/gh/mengmeng0415/wordpic01/match.png' : 'https://cdn.jsdelivr.net/gh/mengmeng0415/wordpic01/notmatch.png'}')`; c.classList.add('show'); }
function removeStamp(cardEl) { cardEl.querySelector('.stamp-container').classList.remove('show'); }
function safePlayAudio(id) { try { const a = document.getElementById(id); if (a) { a.currentTime = 0; const p = a.play(); if (p) p.catch(()=>{}); } } catch (e) {} }
// ============ 💬 AI 聊天面板交互逻辑 ============

function renderChatHistory(uid, wordText) {
    const historyBox = document.getElementById(`chat-history-${uid}`);
    if (!historyBox) return;
    
    // 如果没有历史记录，初始化并加上 AI 的欢迎语
    if (!chatHistories[uid]) {
        chatHistories[uid] = [
            // 第一条作为 System Prompt 隐藏起来，告诉 AI 它的身份和当前上下文
            { role: "user", parts: [{ text: `你现在是一个专教儿童英语的 AI 助教。我们正在学习单词 "${wordText}"。请用非常亲切、鼓励的语气回答我的问题。`}] },
            { role: "model", parts: [{ text: `你好呀！我是你的 AI 小助手。我们在学习 **${wordText}** 这个词，你有什么不懂的想问我吗？或者你想听个故事？`}] }
        ];
    }

    historyBox.innerHTML = '';
    // 从第二条开始渲染（跳过系统提示词）
    for (let i = 1; i < chatHistories[uid].length; i++) {
        const msg = chatHistories[uid][i];
        const div = document.createElement('div');
        div.className = `chat-msg ${msg.role === 'user' ? 'user' : 'ai'}`;
        // 将 Markdown 加粗和换行简单转换为 HTML
        div.innerHTML = msg.parts[0].text.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>').replace(/\n/g, '<br>');
        historyBox.appendChild(div);
    }
    // 滚动到底部
    historyBox.scrollTop = historyBox.scrollHeight;
}

window.sendChatMessage = async function(uid, wordText, overrideText = null) {
    const inputEl = document.getElementById(`chat-input-${uid}`);
    const btnEl = document.getElementById(`chat-sendbtn-${uid}`);
    const typingEl = document.getElementById(`chat-typing-${uid}`);
    const historyBox = document.getElementById(`chat-history-${uid}`);
    
    const text = overrideText || inputEl.value.trim();
    if (!text) return;

    // 1. 将用户的消息存入历史并渲染
    chatHistories[uid].push({ role: "user", parts: [{ text: text }] });
    inputEl.value = '';
    renderChatHistory(uid, wordText);
    
    // 2. 锁定 UI
    inputEl.disabled = true;
    btnEl.disabled = true;
    typingEl.classList.remove('hidden');
    historyBox.scrollTop = historyBox.scrollHeight;

    try {
        // 3. 请求 Gemini
        const responseText = await AI_MANAGER.askChat(chatHistories[uid]);
        
        // 4. 将 AI 的回复存入历史并渲染
        chatHistories[uid].push({ role: "model", parts: [{ text: responseText }] });
    } catch (e) {
        // 如果失败，把刚才用户发的消息弹出来，防止卡死
        chatHistories[uid].pop(); 
    }

    // 5. 恢复 UI
    typingEl.classList.add('hidden');
    inputEl.disabled = false;
    btnEl.disabled = false;
    inputEl.focus();
    renderChatHistory(uid, wordText);
};
// ============ ✨ 手动触发 AI 生成单词详解 ============
window.generateWordDetailAI = async function(uid) {
    const word = DataManager.getWordDetail(uid);
    if (!word) return;

    try {
        // 1. 弹出加载动画
        showAILoading(`🧠 正在由 Gemini 解析单词 [${word.word}] ...`);
        
        // 2. 获取本地保存的提示词模板，替换占位符
        let savedPrompt = localStorage.getItem('gemini_word_prompt');
        if (!savedPrompt) {
            savedPrompt = `你是一位资深的儿童英语教育专家。请为单词 "{{word}}" 生成生动易懂的详细讲解。
            【强制要求】
            必须严格使用以下标签格式输出纯文本，绝不能包含Markdown代码块符号(如\`\`\`)，也不要说任何除了标签内容外的废话：
            [TITLE] 解释 [/TITLE]
            [DEF]
            [EN]一句简短易懂的英文解释[/EN]
            [CN]准确的中文解释[/CN]
            [POS]词性[/POS]
            [PH]英美音标[/PH]
            [DU]一个简单的英文例句|(原文例句) 中文翻译[/DU]
            [/DEF]
            [TITLE] 常见用法 [/TITLE]
            [COLL]
            [H]一个常用短语或搭配英文 | 中文搭配 [POS]词性[/POS][/H]
            [EX]这个搭配的英文例句 | 例句中文[/EX]
            [/COLL]`;
        }
        
        const prompt = savedPrompt.replace(/\{\{word\}\}/g, word.word);

        // 3. 调用 AI 接口
        let aiText = await AI_MANAGER.ask(prompt, false);
        
        // 4. 清理格式并保存到内存中
        aiText = aiText.replace(/```text/g, '').replace(/```/g, '').trim();
        DataManager.db.words[uid].richDetail = [aiText];
        
        hideAILoading();
        
        // 5. 重新渲染当前单词（此时会有数据，直接展示详解）
        renderWordDetail(uid);
        
    } catch (e) {
        hideAILoading();
        if (e.message !== 'NO_API_KEY') {
            console.error("生成失败:", e);
        }
    }
};
// ============ 📖 渲染 PDF 菜单 ============
function renderPdfMenu(book) {
    const container = document.getElementById('book-pdf-container');
    const menu = document.getElementById('pdf-menu-content');
    
    if (book.pdfs && book.pdfs.length > 0) {
        container.style.display = 'inline-block'; // 有 PDF，显示按钮
        // 遍历生成 PDF 选项
        menu.innerHTML = book.pdfs.map(pdf => 
            `<button onclick="openPdfViewer('${pdf.url}')" style="font-weight: 600; color: #444;">📄 ${pdf.name}</button>`
        ).join('');
    } else {
        container.style.display = 'none'; // 没 PDF，隐藏按钮
        menu.innerHTML = '';
    }
}

// 控制 PDF 菜单的展开/收起，并实现互斥（点开一个关掉另一个）
window.togglePdfMenu = () => {
    document.getElementById('pdf-menu-content').classList.toggle('show');
    document.getElementById('practice-menu-content').classList.remove('show'); 
};
// ============ 📄 内置 PDF 阅读器 ============
window.openPdfViewer = (url) => {
    // 隐藏下拉菜单
    document.getElementById('pdf-menu-content').classList.remove('show');
    
    let overlay = document.getElementById('pdf-viewer-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'pdf-viewer-overlay';
        overlay.style.cssText = 'position:fixed; top:0; left:0; width:100vw; height:100vh; z-index:999999; background:#f5f5f7;';
        document.body.appendChild(overlay);
    }
    
    // 动态注入 iframe 和操作按钮
    overlay.innerHTML = `
        <div style="position: absolute; top: 15px; left: 15px; z-index: 1000000; display: flex; gap: 10px;">
            <button onclick="document.getElementById('pdf-viewer-overlay').style.display='none'" style="background: rgba(0,0,0,0.6); color: white; padding: 8px 16px; border-radius: 20px; font-weight: bold; font-size: 14px; border: none; cursor: pointer; display: flex; align-items: center; gap: 6px; box-shadow: 0 4px 10px rgba(0,0,0,0.2);">
                ◀ 返回单词页
            </button>
            <button onclick="window.open('${url}', '_blank')" style="background: #E91E63; color: white; padding: 8px 16px; border-radius: 20px; font-weight: bold; font-size: 14px; border: none; cursor: pointer; box-shadow: 0 4px 10px rgba(233, 30, 99, 0.3);">
                在新标签页放大阅读
            </button>
        </div>
        <iframe src="${url}" style="width:100%; height:100%; border:none; display:block;"></iframe>
    `;
    
    overlay.style.display = 'block';
};
