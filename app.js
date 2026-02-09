// ================== 🛠️ 1. 资源配置 ==================
const CONFIG = {
    assetUrl: "https://cdn.jsdelivr.net/gh/mengmeng0415/", 
    imgFolder: "", 
    dataPath: "data/" 
};
// ================== 🎨 主题配置中心 ==================
const THEMES = {
    // 🎃 主题 1: 万圣节 (原版)
    "spooky": {
        name: "Spooky Night",
        introVideo: "https://cdn.jsdelivr.net/gh/mengmeng0415/wordpic01/spooky.mp4",
        introAudio: "https://cdn.jsdelivr.net/gh/mengmeng0415/wordpic01/openmusic.mp3",
        bgm: "https://cdn.jsdelivr.net/gh/mengmeng0415/wordpic01/spooky.MP3",
        cardBack: "https://cdn.jsdelivr.net/gh/mengmeng0415/wordpic01/spookybackn.png",
        cardFrontBg: "https://cdn.jsdelivr.net/gh/mengmeng0415/wordpic01/spookyface.png",
        introDuration: 5000, // 开场视频时长 (毫秒)
        thumb: "https://cdn.jsdelivr.net/gh/mengmeng0415/wordpic01/spookythumb.png" // 缩略图
    },
    // 🌊 主题 2: 冬日
    "ocean": {
        name: "Winter Time",
        introVideo: "https://cdn.jsdelivr.net/gh/mengmeng0415/wordpic01/winopen.mp4", // 请替换您的链接
        introAudio: "https://cdn.jsdelivr.net/gh/mengmeng0415/wordpic01/winteropen.mp3", // 请替换
        bgm: "https://cdn.jsdelivr.net/gh/mengmeng0415/wordpic01/winterbgm.mp3",         // 请替换
        cardBack: "https://cdn.jsdelivr.net/gh/mengmeng0415/wordpic01/winterback.png",    // 请替换
        cardFrontBg: "https://cdn.jsdelivr.net/gh/mengmeng0415/wordpic01/winterface.png", // 请替换
        introDuration: 5000, // 这个视频有5秒
        thumb: "https://cdn.jsdelivr.net/gh/mengmeng0415/wordpic01/winterthumb.png"
    }
    // 您可以继续添加更多主题...
};

// ================== 🛠️ 2. Data Manager ==================
const DataManager = {
    db: { words: {}, books: [], settings: {}, ratings: {}, quizzes: {} },
    chapterSeriesMap: {},

    init: async function() {
        try {
            console.log("Loading data...");
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
                b.chapters.forEach(c => {
                    this.chapterSeriesMap[c.id] = b.series;
                });
            });

            this.loadRatings();
            return true;
        } catch (e) {
            console.error(e);
            alert("请使用 Live Server 运行。");
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
            word.displayImages = scene.concat(card);
        }

        if (word.games && Array.isArray(word.games)) {
        } else if (word.gameUrl) {
            word.games = [word.gameUrl];
        } else {
            word.games = [];
        }

        if (!word.quizGames) word.quizGames = [];

        if (word.richDetail) {
            word.richDetail = word.richDetail.map(item => {
                if (typeof item === 'string') {
                    let title = "详细内容"; 
                    let content = item;
                    const titleMatch = item.match(/\[TITLE\](.*?)\[\/TITLE\]/);
                    if (titleMatch) {
                        title = titleMatch[1]; 
                        content = item.replace(titleMatch[0], ''); 
                    }
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
            if (this.db.quizzes[qid].wordIds.includes(uid)) {
                word.linkedQuizzes.push({ id: qid, ...this.db.quizzes[qid] });
            }
        }
        
        return word;
    },

    getWordsByChapter: function(chapterId) {
        const book = this.db.books.find(b => b.chapters.some(c => c.id === chapterId));
        if (!book) return [];
        const chapter = book.chapters.find(c => c.id === chapterId);
        if (!chapter || !chapter.wordIds) return [];
        
        return chapter.wordIds.map(item => {
            let uid = item;
            let focusIdx = 0;
            let bookSpecificGames = null;

            if (typeof item === 'string') {
                if (item.includes(':')) {
                    const parts = item.split(':');
                    uid = parts[0].trim();
                    focusIdx = parseInt(parts[1], 10);
                } else {
                    uid = item;
                }
            } 
            else if (typeof item === 'object') {
                uid = item.uid;
                if (item.focus !== undefined) focusIdx = item.focus;
                if (item.games && Array.isArray(item.games)) {
                    bookSpecificGames = item.games;
                }
            }

            const detail = this.getWordDetail(uid);
            if (!detail) return null;
            
            detail._tempFocus = focusIdx; 
            
            if (bookSpecificGames) detail.games = bookSpecificGames;
            detail.chapterQuizIds = chapter.quizIds || [];

            return detail;
        }).filter(w => w !== null);
    },
    
    getAllWords: function() { 
        return Object.keys(this.db.words).map(uid => this.getWordDetail(uid)); 
    },
    
    getSeriesName: function(chapterId) { return this.chapterSeriesMap[chapterId] || ""; },

    loadRatings: function() { const s = localStorage.getItem('myWordRatings'); if(s) try { this.db.ratings=JSON.parse(s); } catch(e){} },
    saveRating: function(uid, r) { this.db.ratings[uid] = (this.db.ratings[uid] === r) ? 0 : r; localStorage.setItem('myWordRatings', JSON.stringify(this.db.ratings)); },
    getRating: function(uid) { return this.db.ratings[uid] || 0; }
};

// ================== 🖥️ 3. UI Logic ==================
let state = { 
    currentBookId: null, currentWordList: [], currentWordIndex: 0, 
    mode: 'home', homeExpanded: true, bookExpanded: true, homeSearchResults: [], 
    lastActiveTabTitle: null,
    homeFilterRatings: new Set(), bookFilterRatings: new Set(),
    isPracticeMode: false, 
    currentPracticeIndex: 0,
    customGames: null
};

const audioClick = new Audio('backinfo/click.mp3');
const audioWrong = new Audio('backinfo/wrong.mp3'); 
const audioCorrect = new Audio('backinfo/right.mp3');
let isClickSoundEnabled = true;
let preferredVoice = null;

document.addEventListener('DOMContentLoaded', async () => {
    if(await DataManager.init()) {
        initHome();
        initVoices();
    }
});

document.addEventListener('click', (e) => {
    if (!isClickSoundEnabled) return;
    if (e.target.closest('.quiz-q') || 
        e.target.closest('.opt-btn') || 
        e.target.closest('.switch') || 
        e.target.closest('.audio-icon') || 
        e.target.closest('.spooky-card')) { 
        return; 
    }
    audioClick.play().catch(()=>{});
});

// --- Home Logic ---
function initHome() {
    state.homeExpanded = true;
    updateHomeToggleBtn();
    renderSidebarFilter('home'); 
    applyHomeFilter(); 
    
    const cats = DataManager.db.settings.bookCategories || [];
    if (cats.length > 0) renderBookTabs(cats[0]);
    
    const inp = document.getElementById('global-search');
    if(inp) inp.addEventListener('input', applyHomeFilter);
}

window.toggleHomeList = function() {
    state.homeExpanded = !state.homeExpanded;
    updateHomeToggleBtn();
    renderABCListFiltered(state.homeSearchResults);
};

function updateHomeToggleBtn() {
    const btn = document.getElementById('btn-home-toggle');
    if(btn) btn.innerText = state.homeExpanded ? '全部收起' : '全部展开';
}

window.toggleBookList = function() {
    state.bookExpanded = !state.bookExpanded;
    updateBookToggleBtn();
    renderDetailSidebar();
};

function updateBookToggleBtn() {
    const btn = document.getElementById('btn-book-toggle');
    if(btn) btn.innerText = state.bookExpanded ? '全部收起' : '全部展开';
}

function applyHomeFilter() {
    const val = document.getElementById('global-search').value.toLowerCase();
    const fs = state.homeFilterRatings;
    let all = DataManager.getAllWords();
    let filtered = all.filter(w => {
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
    words.forEach(w => { 
        const c = w.word[0].toUpperCase(); 
        if (!g[c]) g[c] = []; 
        g[c].push(w); 
    });
    
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
        const input = document.getElementById('chapter-search');
        const val = input ? input.value.toLowerCase() : '';
        const fs = state.bookFilterRatings;

        book.chapters.forEach(ch => {
            const words = DataManager.getWordsByChapter(ch.id);
            const filtered = words.filter(w => {
                const r = DataManager.getRating(w.uid);
                return (!val || w.word.toLowerCase().includes(val)) && (fs.size===0 || fs.has(r));
            });

            if (filtered.length > 0) {
                const itemsHtml = filtered.map(w => generateSidebarItemHtml(w)).join('');
                const hiddenClass = state.bookExpanded ? '' : 'hidden';
                container.innerHTML += generateGroupHtml(ch.name, filtered.length, itemsHtml, hiddenClass); 
                wordsToRender.push(...filtered);
            }
        });
    } else {
        const words = state.homeSearchResults; 
        const g = {};
        words.forEach(w => {
            const c = w.word[0].toUpperCase();
            if(!g[c]) g[c] = [];
            g[c].push(w);
        });
        
        Object.keys(g).sort().forEach(c => {
            const itemsHtml = g[c].map(w => generateSidebarItemHtml(w)).join('');
            const hiddenClass = state.homeExpanded ? '' : 'hidden';
            container.innerHTML += generateGroupHtml(c, g[c].length, itemsHtml, hiddenClass); 
            wordsToRender.push(...g[c]);
        });
    }
    
    state.currentWordList = wordsToRender;

    const countEl = document.getElementById('chapter-list-count');
    if (countEl) {
        countEl.innerText = `(${wordsToRender.length})`;
        countEl.style.display = 'inline-block';
    }
}

function generateSidebarItemHtml(w) {
    const series = DataManager.getSeriesName(w.chapterId);
    const r = DataManager.getRating(w.uid);
    const ratingHtml = r > 0 ? `<span class="rating-num rating-${r}">★${r}</span>` : `<span></span>`;
    
    let isActive = false;
    if (state.currentWordList[state.currentWordIndex] && state.currentWordList[state.currentWordIndex].uid === w.uid) {
        isActive = true;
    }

    let checkboxHtml = '';
    let clickAction = `onclick="jumpToWord('${w.uid}')"`;
    
    if (isCreationMode) {
        const checked = selectedWordUIDs.has(w.uid) ? 'checked' : '';
        checkboxHtml = `<input type="checkbox" class="word-checkbox" ${checked} onclick="event.stopPropagation(); toggleWordSelection('${w.uid}')">`;
        clickAction = `onclick="toggleWordSelection('${w.uid}')"`;
        isActive = false;
    }

    return `
    <li ${clickAction} class="${isActive ? 'active' : ''}">
        ${checkboxHtml}
        <div class="word-info-col">
            <span class="word-text">${w.word}</span>
            <span class="series-text">${series}</span>
        </div>
        ${ratingHtml}
    </li>`;
}

function generateGroupHtml(title, count, itemsHtml, hiddenClass) {
    return `
    <div class="chapter-group">
        <div class="abc-group-header" onclick="this.nextElementSibling.classList.toggle('hidden')">
            <span>${title}</span>
            <span class="group-count">${count}</span>
        </div>
        <ul class="abc-items ${hiddenClass}">${itemsHtml}</ul>
    </div>`;
}

window.enterBookMode = function(bookId) {
    state.mode = 'book'; 
    state.isPracticeMode = false;
    state.currentBookId = bookId; 
    state.bookFilterRatings.clear();
    
    document.getElementById('view-home').classList.add('hidden');
    document.getElementById('view-detail').classList.remove('hidden');
    
    const book = DataManager.db.books.find(b => b.id === bookId);
    if (!book) return;

    const wordCount = countBookWords(book);
    const hasPractices = book.bookPractices && book.bookPractices.length > 0;
    
    renderPracticeMenu(book);

    if (wordCount === 0 && hasPractices) {
        const sidebar = document.getElementById('chapter-sidebar');
        if(sidebar) sidebar.classList.add('collapsed'); 
        const bookToggleBtn = document.getElementById('btn-book-toggle'); 
        if(bookToggleBtn) bookToggleBtn.style.display = 'none';
        loadPracticeUnit(bookId, 0);
        return; 
    }

    const sidebar = document.getElementById('chapter-sidebar'); 
    if(sidebar) { sidebar.classList.remove('hidden'); sidebar.classList.remove('collapsed'); }
    renderSidebarFilter('book');
    const bookToggleBtn = document.getElementById('btn-book-toggle'); 
    if(bookToggleBtn) { 
        bookToggleBtn.style.display = 'inline-block'; 
        updateBookToggleBtn(); 
    }
    const input = document.getElementById('chapter-search');
    if(input) { input.value = ''; input.oninput = () => renderDetailSidebar(); }
    renderDetailSidebar();
    
    if(state.currentWordList.length > 0) {
        state.currentWordIndex = 0;
        renderWordDetail(state.currentWordList[0].uid);
    } else if (!hasPractices) {
        document.getElementById('word-main').innerText = "暂无内容";
        document.getElementById('tab-content-area').innerHTML = "";
    }
}

window.enterSoloMode = function(uid) {
    state.mode = 'home_detail';
    state.isPracticeMode = false;
    document.getElementById('view-home').classList.add('hidden');
    document.getElementById('view-detail').classList.remove('hidden');
    const sidebar = document.getElementById('chapter-sidebar'); if(sidebar) { sidebar.classList.remove('hidden'); sidebar.classList.remove('collapsed'); }
    const bookToggleBtn = document.getElementById('btn-book-toggle'); if(bookToggleBtn) bookToggleBtn.style.display = 'none';
    renderSidebarFilter('home');
    const input = document.getElementById('chapter-search');
    if(input) { input.value = ''; input.oninput = () => renderDetailSidebar(); }
    state.currentWordList = [...state.homeSearchResults]; 
    state.currentWordIndex = state.currentWordList.findIndex(w => w.uid === uid);
    renderDetailSidebar(); 
    renderWordDetail(uid);
};

function renderBookTabs(activeType) {
    const types=DataManager.db.settings.bookCategories||[];
    const nav = document.getElementById('book-type-tabs');
    if(nav) nav.innerHTML=types.map(t=>`<button class="${t===activeType?'active':''}" onclick="renderBookTabs('${t}')">${t}</button>`).join('');
    const bks=DataManager.db.books.filter(b=>b.type===activeType);
    const gallery = document.getElementById('book-gallery');
    const grp={}; bks.forEach(b=>{if(!grp[b.series])grp[b.series]=[];grp[b.series].push(b)});
    if(gallery) gallery.innerHTML = Object.keys(grp).map(s=>{
        const cards = grp[s].map(b=>`
            <div class="book-card" onclick="enterBookMode('${b.id}')">
                <div class="book-cover" style="background-image:url('${CONFIG.assetUrl+b.cover}')"></div>
                <div class="book-info">
                    <div class="book-title">${b.title}</div>
                    <div class="book-count">${countBookWords(b)} words</div>
                </div>
            </div>`).join('');
        return `<div class="series-section"><div class="series-header"><h3 class="series-title">${s}</h3></div><div class="series-scroll-container">${cards}</div></div>`;
    }).join('');
}

function countBookWords(book) {
    let count = 0;
    if (book.chapters) { 
        book.chapters.forEach(c => { 
            if (c.wordIds) {
                count += c.wordIds.filter(uid => DataManager.db.words[uid]).length;
            }
        }); 
    }
    return count;
}

window.toggleClickSound = function(el) { isClickSoundEnabled = el.checked; document.querySelectorAll('input[type=checkbox][id$="sound-toggle"]').forEach(i => i.checked = el.checked); };
window.goHome = function() {
    document.getElementById('view-detail').classList.add('hidden');
    document.getElementById('view-home').classList.remove('hidden');
    state.mode = 'home';
    initHome(); 
};
function renderSidebarFilter(mode) {
    const id = mode === 'home' ? 'home-filter-stars' : 'book-filter-stars';
    const container = document.getElementById(id); if(!container) return; container.innerHTML = '';
    const fs = mode === 'home' ? state.homeFilterRatings : state.bookFilterRatings;
    for(let i=1;i<=5;i++){
        const btn=document.createElement('div');
        btn.className = `filter-star-btn ${fs.has(i)?'active':''}`;
        const imgSrc = fs.has(i) ? 'backinfo/yestar.png' : 'backinfo/nostar.png';
        btn.innerHTML = `<img class="filter-star-img" src="${imgSrc}" alt="${i} 星" /><span class="filter-star-label">${i}</span>`;
        btn.title = `${i} 星`;
        btn.onclick = () => toggleFilter(mode,i);
        container.appendChild(btn);
    }
}
function toggleFilter(mode, i) {
    const fs = mode === 'home' ? state.homeFilterRatings : state.bookFilterRatings;
    if(fs.has(i)) fs.delete(i); else fs.add(i);
    if(mode === 'home') applyHomeFilter(); 
    else renderDetailSidebar();
    renderSidebarFilter(mode);
}

function renderWordDetail(uid) {
    const word = DataManager.getWordDetail(uid);
    if (!word) return;
    document.getElementById('rating-stars').style.display = 'flex';
    document.querySelector('.main-audio').style.display = 'flex'; 
    document.getElementById('nav-buttons').style.display = 'flex'; 
    const wordBtnEl = document.getElementById('btn-toggle-word');
    if(wordBtnEl) wordBtnEl.style.visibility = 'visible'; 
    const contextWord = state.currentWordList.find(w => w.uid === uid);
    if (contextWord && contextWord.chapterQuizIds) {
        word.chapterQuizIds = contextWord.chapterQuizIds;
    }
    document.getElementById('word-main').innerText = word.word;
    renderHeaderStars(uid);
    const wordBtn = document.getElementById('btn-toggle-word');
    const isWordVisible = wordBtn ? wordBtn.classList.contains('active') : true;
    if (isWordVisible) {
        state.lastActiveTabTitle = null; 
    }
    const tabs = document.getElementById('detail-tabs');
    const area = document.getElementById('tab-content-area');
    tabs.innerHTML = ''; area.innerHTML = '';
    const hasScene = word.displayImages && word.displayImages.length > 0;
    const hasText = word.richDetail && word.richDetail.length > 0;
    let availableQuizzes = word.linkedQuizzes || [];
    if (word.chapterQuizIds && word.chapterQuizIds.length > 0) {
        availableQuizzes = availableQuizzes.filter(q => word.chapterQuizIds.includes(q.id));
    }
    const validQuizCount = availableQuizzes.filter(q => q.question && q.question.trim().length > 0).length;
    const quizGameCount = (word.quizGames || []).length;
    const hasQuiz = (validQuizCount + quizGameCount) > 0;
    const hasGame = word.games && word.games.length > 0;
    const items = [];
    if (hasScene) items.push({id:'scene', t:'图片'});
    if (hasText)  items.push({id:'text', t:'单词详解'});
    if (hasQuiz)  items.push({id:'quiz', t:'挑战一下'});
    if (hasGame)  items.push({id:'game', t:'趣味游戏'});
    if (items.length === 0) {
        area.innerHTML = `<div class="empty-tip">暂无内容</div>`;
        return;
    }
    let activeTabIndex = 0; 
    if (state.lastActiveTabTitle) {
        const found = items.findIndex(i => i.t === state.lastActiveTabTitle);
        if(found !== -1) activeTabIndex = found;
    }
    items.forEach((t, i) => {
        const b = document.createElement('button'); 
        b.innerText = t.t;
        if(i === activeTabIndex) b.className = 'active';
        b.onclick = () => { 
            tabs.querySelectorAll('button').forEach(btn => btn.classList.remove('active')); 
            b.classList.add('active'); 
            state.lastActiveTabTitle = t.t;
            renderTabContent(t.id, word, area); 
        };
        tabs.appendChild(b);
    });
    renderTabContent(items[activeTabIndex].id, word, area);
    const lis = document.querySelectorAll('.abc-items li');
    lis.forEach(li => { 
        li.classList.remove('active'); 
        if(li.getAttribute('onclick') && li.getAttribute('onclick').includes(uid)) {
            li.classList.add('active');
            const group = li.closest('.chapter-group');
            if(group) {
                const ul = group.querySelector('.abc-items');
                if(ul && ul.classList.contains('hidden')) ul.classList.remove('hidden');
            }
        }
    });
}
function renderHeaderStars(uid) {
    const c = document.getElementById('rating-stars'); c.innerHTML = '';
    const r = DataManager.getRating(uid);
    for(let i=1; i<=5; i++) {
        const img = document.createElement('img'); img.src = i<=r ? 'backinfo/yestar.png' : 'backinfo/nostar.png'; img.className = 'star-icon';
        img.onclick = () => { 
            DataManager.saveRating(uid, i); 
            renderHeaderStars(uid); 
            if(state.mode==='home') applyHomeFilter(); 
            else renderDetailSidebar(); 
        };
        c.appendChild(img);
    }
}

function renderTabContent(type, word, container) {
    container.innerHTML = ''; 
    container.scrollTop = 0;

    // ============ 🌟 0. 全局 Zoom 状态控制 ============
    if (state.isImageZoom) {
        if (!container.classList.contains('pseudo-fullscreen')) {
            container.classList.add('pseudo-fullscreen');
        }
        if (type === 'text') {
            container.style.background = "#f5f5f7"; 
            container.style.padding = "0";          
        } else {
            container.style.background = "#f8f9fa"; 
            container.style.padding = "20px";
        }
    } else {
        container.classList.remove('pseudo-fullscreen');
        if (document.fullscreenElement && document.exitFullscreen) {
            document.exitFullscreen().catch(()=>{});
        }
        container.style.background = "";
        container.style.padding = "";
    }

    // 通用 Zoom 按钮图标
    const zoomIcon = state.isImageZoom ? 
        `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"></path></svg>` : 
        `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>`;
    
    const fixedZoomBtn = document.createElement('button');
    fixedZoomBtn.className = 'btn-fixed-zoom';
    fixedZoomBtn.innerHTML = zoomIcon;
    fixedZoomBtn.onclick = toggleImageZoom;

    // ============ 🖼️ SCENE (图片) ============
    if (type === 'scene') {
        
        // 1. 只收集 Scene 图片 (过滤掉 Card)
        let allImages = [];
        if (word.images && word.images.scene) {
            allImages = word.images.scene.map(u => u.startsWith('http') ? u : CONFIG.assetUrl + CONFIG.imgFolder + u);
        }
        allImages = [...new Set(allImages)];

        if (allImages.length === 0) {
            container.innerHTML = `<div class="empty-tip">暂无图片</div>`;
        } 
        else if (state.isImageZoom) {
            // ✅ [Scene Zoom 模式] (全屏大图)
            if (state.currentImgIdx >= allImages.length) state.currentImgIdx = 0;
            const currImg = allImages[state.currentImgIdx];

            container.innerHTML = `
                <button class="btn-zoom-nav prev" onclick="navigateInZoom(-1)">❮</button>
                <div style="flex:1; display:flex; justify-content:center; align-items:center; height:100%;">
                    <img src="${currImg}" 
                         onclick="toggleImageZoom()" 
                         style="max-width:90%; max-height:90%; object-fit:contain; border-radius:10px; box-shadow:0 10px 30px rgba(0,0,0,0.1); cursor: zoom-out;">
                </div>
                <div style="position:absolute; bottom:30px; left:50%; transform:translateX(-50%); color:#999; font-weight:bold;">
                    ${state.currentImgIdx + 1} / ${allImages.length}
                </div>
                <button class="btn-zoom-nav next" onclick="navigateInZoom(1)">❯</button>
            `;
            container.appendChild(fixedZoomBtn);
        } 
        else {
            // ✅ [Scene 普通模式] (九宫格)
            // 👇👇👇 重点修改：容器和图片都加 onclick，并给小图标加穿透 👇👇👇
            const imgsHtml = allImages.map((src, idx) => `
                <div class="scene-img-wrapper" style="position:relative; cursor: zoom-in;" onclick="enterImageZoom(${idx})">
                    <img src="${src}" 
                         class="scene-image" 
                         style="pointer-events: none;"> <div style="position:absolute; right:5px; bottom:5px; background:rgba(0,0,0,0.5); color:#fff; border-radius:4px; padding:2px 6px; font-size:10px; pointer-events: none;">
                         🔍
                    </div>
                </div>`).join('');
            
            container.innerHTML = `
                <div class="image-box">
                    <div class="scene-images" data-count="${allImages.length}">
                        ${imgsHtml}
                    </div>
                </div>`;
            container.appendChild(fixedZoomBtn);
        }
    } 
    // ============ 📖 TEXT (富文本) ============
    else if (type === 'text') {
        let navHtml = '', bodyHtml = '';
        if (word.richDetail) {
            navHtml = '<div class="rich-nav">';
            word.richDetail.forEach((s, i) => {
                const func = state.isImageZoom ? 'scrollToSectionInZoom' : 'scrollToSection';
                navHtml += `<button onclick="${func}('s-${i}')">${s.title}</button>`;
                bodyHtml += `<div id="s-${i}" class="rich-section"><h3>${s.title}</h3><div class="rich-content-body">${s.content}</div></div>`;
            });
            navHtml += '</div>';
        } else {
            bodyHtml = `<div class="empty-tip">暂无详解</div>`;
        }

        if (state.isImageZoom) {
            container.innerHTML = `
                <button class="btn-zoom-nav prev" onclick="navigateInZoom(-1)">❮</button>
                <div class="reader-layout">
                    <div class="reader-header">${navHtml}</div>
                    <div id="reader-scroll" class="reader-body">
                        <h1 style="text-align:center; margin-bottom:40px; color:#333;">${word.word}</h1>
                        ${bodyHtml}
                        <div style="height:80px;"></div>
                    </div>
                </div>
                <button class="btn-zoom-nav next" onclick="navigateInZoom(1)">❯</button>
            `;
            container.appendChild(fixedZoomBtn);
            
            window.scrollToSectionInZoom = function(id) {
                const t = document.getElementById(id); const s = document.getElementById('reader-scroll');
                if(t && s) s.scrollTo({top: t.offsetTop - s.offsetTop - 20, behavior: 'smooth'});
            };
        } else {
            container.innerHTML = navHtml + bodyHtml;
            container.appendChild(fixedZoomBtn);
            window.scrollToSection = function(id) {
                const t = document.getElementById(id); if(t) t.scrollIntoView({behavior:'smooth', block:'start'});
            };
        }
    }
    // ============ ⚔️ QUIZ (挑战) ============
    else if (type === 'quiz') {
        if (state.customGames && state.customGames.length > 0) {
            const gamesListHtml = state.customGames.map((g, idx) => `
                <div class="game-group-card" onclick="startSpookyGame(${idx})">
                    <div class="game-group-content">
                        <div class="game-group-icon">🎃</div>
                        <div class="game-group-title">${g.title}</div>
                        <div class="game-group-info">包含 ${g.words.length} 个单词</div>
                    </div>
                </div>`).join('');
            container.innerHTML = `<div class="custom-games-container"><h3 class="custom-games-header">已生成 ${state.customGames.length} 组翻牌游戏</h3><div class="custom-games-grid">${gamesListHtml}</div><div style="text-align:center; margin-top:40px;"><button onclick="clearCustomGames()" style="color:#999; text-decoration:underline;">清空游戏并返回</button></div></div>`;
            return;
        }

        let allQuizzes = [];
        let linked = word.linkedQuizzes || [];
        if (word.chapterQuizIds && word.chapterQuizIds.length > 0) {
             linked = linked.filter(q => word.chapterQuizIds.includes(q.id));
        }
        allQuizzes = linked.filter(q => q.question).map(q => ({ type: 'quiz', content: q, id: q.id }));
        if (word.quizGames) {
            word.quizGames.forEach((g, idx) => allQuizzes.push({ type: 'game', content: g.url, id: `game-${idx}` }));
        }

        if (allQuizzes.length > 0) {
            renderMixedPagination(allQuizzes, container, 0);
        } else {
            container.innerHTML = `<div class="empty-tip">暂无挑战</div>`;
            container.appendChild(fixedZoomBtn);
        }
    }
    // ============ 🎮 GAME ============
    else if (type === 'game') {
         if (word.games && word.games.length > 0) {
            const gamesHtml = word.games.map(url => `<div class="rich-game-item"><iframe src="${url}" frameborder="0" allowfullscreen></iframe></div>`).join('');
            container.innerHTML = `<div class="rich-section" style="margin-top:0;"><div class="rich-game-group">${gamesHtml}</div></div>`;
        } else {
            container.innerHTML = `<div class="empty-tip">暂无游戏</div>`;
        }
    }
}

function getWordQuizCount(word) {
    let count = 0;
    let quizzes = word.linkedQuizzes || [];
    if (word.chapterQuizIds && word.chapterQuizIds.length > 0) {
        quizzes = quizzes.filter(q => word.chapterQuizIds.includes(q.id));
    }
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
            let totalBook = 0;
            let currentBook = 0;
            for (let i = 0; i < book.bookPractices.length; i++) {
                const p = book.bookPractices[i];
                const validCount = (p.quizIds || []).filter(qid => DataManager.db.quizzes[qid]).length;
                totalBook += validCount;
                if (i < state.currentPracticeIndex) {
                    currentBook += validCount;
                } else if (i === state.currentPracticeIndex) {
                    currentBook += (activeIndex + 1);
                }
            }
            line2 = `本书 (${currentBook}/${totalBook})`;
        }
    } else {
        const currentWord = state.currentWordList[state.currentWordIndex];
        if (!currentWord) return { line1: "", line2: "" };
        let groupName = "";
        let groupTotal = 0;
        let groupCurrent = 0;
        let bookTotal = 0;
        let bookCurrent = 0;
        let scopeWords = []; 
        if (state.mode === 'book') {
            const book = DataManager.db.books.find(b => b.id === state.currentBookId);
            if (book) {
                const ch = book.chapters.find(c => c.wordIds.some(id => (typeof id === 'string' ? id.includes(currentWord.uid) : id.uid === currentWord.uid)));
                if (ch) {
                    groupName = ch.name;
                    const chapterUIDs = new Set(ch.wordIds.map(item => typeof item === 'string' ? item.split(':')[0] : item.uid));
                    scopeWords = state.currentWordList.filter(w => chapterUIDs.has(w.uid));
                }
            }
        } else {
            const char = currentWord.word[0].toUpperCase();
            groupName = char;
            scopeWords = state.currentWordList.filter(w => w.word[0].toUpperCase() === char);
        }
        for (let w of scopeWords) {
            let qCount = getWordQuizCount(w);
            groupTotal += qCount;
            if (w.uid === currentWord.uid) {
                groupCurrent += (activeIndex + 1);
            } else if (state.currentWordList.indexOf(w) < state.currentWordList.indexOf(currentWord)) {
                groupCurrent += qCount;
            }
        }
        line1 = `${groupName} (${groupCurrent}/${groupTotal})`;
        for (let i = 0; i < state.currentWordList.length; i++) {
            const w = state.currentWordList[i];
            let qCount = getWordQuizCount(w);
            bookTotal += qCount;
            if (i < state.currentWordIndex) {
                bookCurrent += qCount;
            } else if (i === state.currentWordIndex) {
                bookCurrent += (activeIndex + 1);
            }
        }
        const label = state.mode === 'book' ? "本书" : "总计";
        line2 = `${label} (${bookCurrent}/${bookTotal})`;
    }
    return { line1, line2 };
}

function renderMixedPagination(items, container, activeIndex) {
    container.innerHTML = ''; 
    container.scrollTop = 0;
    
    // 1. 生成分页圆圈
    const pageContainer = document.createElement('div');
    pageContainer.className = 'quiz-pagination';
    if (items.length > 1) {
        items.forEach((it, idx) => {
            const btn = document.createElement('button');
            btn.className = `quiz-page-btn ${idx === activeIndex ? 'active' : ''}`;
            if (it.type === 'game') {
                btn.innerHTML = '<span style="font-size:14px;">🎮</span>'; 
            } else {
                btn.innerText = idx + 1;
            }
            btn.onclick = () => renderMixedPagination(items, container, idx);
            pageContainer.appendChild(btn);
        });
    } else {
        pageContainer.style.visibility = 'hidden'; 
        const dummyBtn = document.createElement('button');
        dummyBtn.className = 'quiz-page-btn';
        pageContainer.appendChild(dummyBtn);
    }
    container.appendChild(pageContainer);

    // 2. 准备内容
    const item = items[activeIndex];
    let contentHtml = '';

    // 🔥 修复 1: 根据状态动态显示图标 (和 Scene/Text 保持一致)
    const zoomIcon = state.isImageZoom ? 
        `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"></path></svg>` : 
        `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>`;
    
    // 🔥 修复 2: 绑定 toggleImageZoom (卡片右上角的小按钮，如果 CSS 没删的话)
    const zoomBtnHtml = `<button class="btn-quiz-zoom" onclick="toggleImageZoom()" title="${state.isImageZoom ? '退出全屏' : '全屏模式'}" style="z-index:55;">${zoomIcon}</button>`;
    
    const progress = getQuizProgressInfo(activeIndex, items.length);
    const infoHtml = `<div class="quiz-info-text"><div>${progress.line1}</div><div>${progress.line2}</div></div>`;

    // 3. 渲染 Quiz/Game 内容
    if (item.type === 'game') {
        contentHtml = `
            <div class="quiz-box">
                ${zoomBtnHtml}
                ${infoHtml} <div class="quiz-q">
                    <span style="color:var(--primary); font-size:0.8em; margin-right:8px;">Q${activeIndex + 1}.</span>
                    互动游戏
                </div>
                <div class="game-container" style="margin:0; padding:0;">
                    <div class="game-wrapper">
                        <iframe src="${item.content}" frameborder="0" allowfullscreen></iframe>
                    </div>
                </div>
            </div>`;
    } else if (item.type === 'quiz') {
        const q = item.content;
        if (q.type === 'matching') {
            contentHtml = `
                <div class="quiz-box">
                    ${zoomBtnHtml}
                    ${infoHtml} <div class="quiz-q">
                        <span style="color:var(--primary); font-size:0.8em; margin-right:8px;">Q${activeIndex + 1}.</span>
                        ${q.title || "Match the pairs"}
                    </div>
                    <div class="match-container" id="match-area-${activeIndex}"></div>
                    <div id="match-feedback-${activeIndex}" style="text-align:center; margin-top:15px; height:20px; color:var(--green); font-weight:bold;"></div>
                </div>`;
            setTimeout(() => initMatchingGame(q, `match-area-${activeIndex}`, `match-feedback-${activeIndex}`), 0);
        } else {
            const isImgOpt = q.type === 'choice_image';
            contentHtml = `
                <div class="quiz-box">
                    ${zoomBtnHtml}
                    ${infoHtml} <div class="quiz-q">
                        <span style="color:var(--primary); font-size:0.8em; margin-right:8px;">Q${activeIndex + 1}.</span>
                        ${q.question}
                    </div>
                    <div class="quiz-opts" style="${isImgOpt ? 'grid-template-columns:1fr 1fr;' : ''}">`;
            q.options.forEach((o, idx) => {
                const letter = String.fromCharCode(65 + idx);
                let displayContent = o;
                if (typeof o === 'object' && o.label) displayContent = o.label;
                contentHtml += `<button class="opt-btn" onclick="checkAnswer(this,${idx},${q.answer})"><span>${letter}</span>${displayContent}</button>`;
            });
            contentHtml += `</div></div>`;
        }
    }

    const wrapper = document.createElement('div');
    wrapper.style.width = '100%'; 
    wrapper.innerHTML = contentHtml;
    container.appendChild(wrapper);

    // 4. Next 按钮
    const nextBtn = document.createElement('button');
    nextBtn.className = 'btn-big-next';
    const arrowIcon = `<svg style="width:20px; height:20px; margin-left:8px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>`;
    if (activeIndex < items.length - 1) {
        nextBtn.innerHTML = `Next Question ${arrowIcon}`; 
    } else {
        if (state.isPracticeMode) {
            nextBtn.innerHTML = `Next Unit ${arrowIcon}`;   
        } else {
            nextBtn.innerHTML = `Next Word ${arrowIcon}`;   
        }
    }
    nextBtn.onclick = () => handleBigNextClick(items, container, activeIndex);
    container.appendChild(nextBtn);

    // 5. 🔥 修复 3: 右下角悬浮按钮 (State Sync)
    const zoomBtn = document.createElement('button');
    zoomBtn.className = 'btn-fixed-zoom';
    // 根据状态使用 放大或缩小 图标
    zoomBtn.innerHTML = state.isImageZoom ? 
        `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"></path></svg>` : 
        `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>`;
    
    zoomBtn.title = state.isImageZoom ? "退出全屏" : "全屏专注模式";
    
    // ⚠️ 关键：这里必须绑定 toggleImageZoom，不能是 toggleFullScreen
    zoomBtn.onclick = toggleImageZoom; 
    
    container.appendChild(zoomBtn);
}

function initMatchingGame(quizData, containerId, feedbackId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const pairs = quizData.pairs;
    const leftItems = pairs.map((p, i) => ({ text: p.left, id: i }));
    const rightItems = pairs.map((p, i) => ({ text: p.right, id: i }));
    rightItems.sort(() => Math.random() - 0.5);
    const colLeft = document.createElement('div'); colLeft.className = 'match-col';
    const colRight = document.createElement('div'); colRight.className = 'match-col';
    const appendContent = (btn, content) => {
        const isImage = /\.(webp|png|jpg|jpeg|gif)$/i.test(content);
        if (isImage) {
            const fullSrc = content.startsWith('http') ? content : CONFIG.assetUrl + CONFIG.imgFolder + content;
            btn.innerHTML = `<img src="${fullSrc}" class="match-img" alt="img" />`;
            btn.classList.add('has-image'); 
        } else {
            btn.innerText = content;
        }
    };
    leftItems.forEach(item => {
        const btn = document.createElement('div');
        btn.className = 'match-item';
        appendContent(btn, item.text); 
        btn.dataset.id = item.id;
        btn.dataset.side = 'left';
        btn.onclick = (e) => handleMatchClick(e.currentTarget, feedbackId); 
        colLeft.appendChild(btn);
    });
    rightItems.forEach(item => {
        const btn = document.createElement('div');
        btn.className = 'match-item';
        appendContent(btn, item.text); 
        btn.dataset.id = item.id;
        btn.dataset.side = 'right';
        btn.onclick = (e) => handleMatchClick(e.currentTarget, feedbackId);
        colRight.appendChild(btn);
    });
    container.appendChild(colLeft);
    container.appendChild(colRight);
}

let selectedLeft = null;
let selectedRight = null;

function handleMatchClick(el, feedbackId) {
    if (el.classList.contains('matched')) return;
    const side = el.dataset.side;
    const parent = el.parentElement;
    parent.querySelectorAll('.match-item').forEach(b => b.classList.remove('selected'));
    el.classList.add('selected');
    if (side === 'left') selectedLeft = el;
    else selectedRight = el;
    if (selectedLeft && selectedRight) {
        checkMatchPair(feedbackId);
    }
}

function checkMatchPair(feedbackId) {
    const isMatch = selectedLeft.dataset.id === selectedRight.dataset.id;
    const fb = document.getElementById(feedbackId);
    if (isMatch) {
        selectedLeft.classList.remove('selected');
        selectedRight.classList.remove('selected');
        selectedLeft.classList.add('matched');
        selectedRight.classList.add('matched');
        if (typeof audioCorrect !== 'undefined') { audioCorrect.currentTime=0; audioCorrect.play().catch(()=>{}); }
        selectedLeft = null;
        selectedRight = null;
        const allMatched = document.querySelectorAll('.match-item.matched').length;
        const total = document.querySelectorAll('.match-item').length;
        if(allMatched === total) {
            fb.innerText = "🎉 All Matched! Well done!";
        }
    } else {
        selectedLeft.classList.add('error');
        selectedRight.classList.add('error');
        if (typeof audioWrong !== 'undefined') { audioWrong.currentTime=0; audioWrong.play().catch(()=>{}); }
        setTimeout(() => {
            if(selectedLeft) { selectedLeft.classList.remove('error'); selectedLeft.classList.remove('selected'); }
            if(selectedRight) { selectedRight.classList.remove('error'); selectedRight.classList.remove('selected'); }
            selectedLeft = null;
            selectedRight = null;
        }, 500);
    }
}

function scrollToSection(id) {
    const target = document.getElementById(id);
    if (!target) return;
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function checkAnswer(btn, idx, corr) {
    if (btn.classList.contains('correct')) return;
    if (btn.classList.contains('wrong')) return;
    if (idx === corr) {
        btn.classList.add('correct');
        if (isClickSoundEnabled) {
            audioCorrect.currentTime = 0;
            audioCorrect.play().catch(()=>{});
        }
    } else {
        btn.classList.add('wrong');
        btn.classList.add('shake');
        if (isClickSoundEnabled) {
            audioWrong.currentTime = 0;
            audioWrong.play().catch(()=>{});
        }
        setTimeout(() => {
            btn.classList.remove('shake');
            btn.classList.remove('wrong'); 
        }, 500);
    }
}

window.toggleSidebar = () => document.getElementById('chapter-sidebar').classList.toggle('collapsed');
window.openModal = src => { document.getElementById('image-modal').style.display='block'; document.getElementById('modal-img').src=src; };
window.closeModal = () => document.getElementById('image-modal').style.display='none';
window.playCurrentWord = () => { const t=document.getElementById('word-main').innerText; const u=new SpeechSynthesisUtterance(t); u.lang='en-US'; if(preferredVoice)u.voice=preferredVoice; speechSynthesis.speak(u); };
window.prevWord = () => { if(state.currentWordIndex>0) { state.currentWordIndex--; renderWordDetail(state.currentWordList[state.currentWordIndex].uid); } };
window.nextWord = () => { if(state.currentWordIndex<state.currentWordList.length-1) { state.currentWordIndex++; renderWordDetail(state.currentWordList[state.currentWordIndex].uid); } };
window.jumpToWord = uid => {
    state.isPracticeMode = false;
    state.currentPracticeIndex = 0;
    state.customGames = null; 
    if (state.mode === 'home') {
        enterSoloMode(uid);
        return;
    }
    const i = state.currentWordList.findIndex(w => w.uid === uid);
    if (i !== -1) {
        state.currentWordIndex = i;
        const sidebar = document.getElementById('chapter-sidebar'); 
        if(sidebar) sidebar.classList.remove('collapsed');
        renderWordDetail(uid);
    }
};
function initVoices() { const vs=speechSynthesis.getVoices(); if(vs.length) preferredVoice=vs.find(v=>v.name.includes('Google US'))||vs.find(v=>v.lang==='en-US'); }
window.exportData = () => alert(JSON.stringify(DataManager.db.ratings));

window.toggleWordVisibility = function() {
    const btn = document.getElementById('btn-toggle-word');
    const wordMain = document.getElementById('word-main');
    const isActive = btn.classList.toggle('active');
    if (isActive) {
        btn.innerText = '显示单词';
        wordMain.style.opacity = '1';
        state.lastActiveTabTitle = null; 
    } else {
        btn.innerText = '隐藏单词';
        wordMain.style.opacity = '0';
    }
};

window.togglePracticeMenu = function() {
    document.getElementById('practice-menu-content').classList.toggle('show');
}

window.onclick = function(event) {
    if (!event.target.closest('.practice-dropdown')) {
        const dropdowns = document.getElementsByClassName("dropdown-content");
        for (let i = 0; i < dropdowns.length; i++) {
            dropdowns[i].classList.remove('show');
        }
    }
}

function renderPracticeMenu(book) {
    const container = document.getElementById('book-practice-container');
    const menu = document.getElementById('practice-menu-content');
    container.style.display = 'inline-block'; 
    const createBtnHtml = `
        <button onclick="toggleCreationMode()" class="practice-btn special-create-btn" style="color:var(--primary); font-weight:800; border-bottom:1px dashed #eee;">
            🃏 创建翻牌游戏
        </button>
    `;
    let practicesHtml = '';
    if (book.bookPractices && book.bookPractices.length > 0) {
        practicesHtml = book.bookPractices.map((p, index) => 
            `<button onclick="loadPracticeUnit('${book.id}', ${index})">${p.name}</button>`
        ).join('');
    } else {
        practicesHtml = `<div style="padding:10px; color:#999; font-size:12px;">本书暂无预设练习</div>`;
    }
    menu.innerHTML = createBtnHtml + practicesHtml;
}

window.loadPracticeUnit = function(bookId, practiceIndex) {
    const book = DataManager.db.books.find(b => b.id === bookId);
    if (!book || !book.bookPractices) return;
    const practice = book.bookPractices[practiceIndex];
    if (!practice) return;
    state.isPracticeMode = true;
    state.currentBookId = bookId; 
    state.currentPracticeIndex = practiceIndex;
    document.getElementById('word-main').innerText = practice.name;
    document.getElementById('rating-stars').style.display = 'none';
    document.querySelector('.main-audio').style.display = 'none';
    document.getElementById('nav-buttons').style.display = 'none';
    const wordBtn = document.getElementById('btn-toggle-word');
    if(wordBtn) wordBtn.style.visibility = 'hidden';
    const tabs = document.getElementById('detail-tabs');
    const area = document.getElementById('tab-content-area');
    tabs.innerHTML = `<button class="active">挑战一下</button>`;
    const challengeList = [];
    (practice.quizIds || []).forEach(qid => {
        const quiz = DataManager.db.quizzes[qid];
        if (quiz) {
            if (quiz.type === 'game') {
                challengeList.push({ type: 'game', content: quiz.gameUrl, id: qid });
            } else {
                challengeList.push({ type: 'quiz', content: quiz, id: qid });
            }
        }
    });
    if (challengeList.length > 0) {
        renderMixedPagination(challengeList, area, 0);
    } else {
        area.innerHTML = `<div class="empty-tip">该单元暂无题目</div>`;
    }
    document.getElementById('practice-menu-content').classList.remove('show');
}

function parseRichContent(content) {
    if (!content) return "";
    content = content.replace(/\[L1\](.*?)\[\/L1\]/g, '<div class="level-1">$1</div>');
    content = content.replace(/\[L2\](.*?)\[\/L2\]/g, '<div class="level-2">$1</div>');
    content = content.replace(/\[L3\](.*?)\[\/L3\]/g, '<div class="level-3">$1</div>');
    content = content.replace(/\[L4\](.*?)\[\/L4\]/g, '<div class="level-4">$1</div>');
    content = content.replace(/\[PH\](.*?)\[\/PH\]/g, '<span class="rich-phonetic">$1</span>');
    content = content.replace(/\[POS\](.*?)\[\/POS\]/g, '<span class="rich-tag tag-pos">$1</span>');
    content = content.replace(/\[CN\](.*?)\[\/CN\]/g, '<span class="text-cn">$1</span>');
    content = content.replace(/\[EN\](.*?)\[\/EN\]/g, '<span class="text-en">$1</span>');
    content = content.replace(/\[DEF\]([\s\S]*?)\[\/DEF\]/g, '<div class="def-block">$1</div>');
    content = content.replace(/\[COLL\]([\s\S]*?)\[\/COLL\]/g, '<div class="col-block">$1</div>');
    content = content.replace(/\[H\](.*?)\|(.*?)\[\/H\]/g, '<div class="col-header"><span class="text-en">$1</span><span class="text-cn">$2</span></div>');
    content = content.replace(/\[H\]([\s\S]*?)\[\/H\]/g, '<div class="col-header">$1</div>');
    content = content.replace(/\[C\]([\s\S]*?)\[\/C\]/g, '<span class="col-chip">$1</span>');
    content = content.replace(/\[DU\](.*?)\|(.*?)\[\/DU\]/g, '<div class="text-du"><span class="en">$1</span><span class="cn">$2</span></div>');
    content = content.replace(/\[EX\](.*?)\|(.*?)\[\/EX\]/g, '<div class="block-example"><span class="en">$1</span><span class="cn">$2</span></div>');
    content = content.replace(/\[ERR\](.*?)\[\/ERR\]/g, '<div class="block-mistake"><b>常见误区:</b> $1</div>');
    content = content.replace(/\[CR\](.*?)\[\/CR\]/g, '<div class="block-cr"><b>重要:</b> $1</div>');
    content = content.replace(/\[CO\](.*?)\[\/CO\]/g, '<div class="block-co"><b>注意:</b> $1</div>');
    content = content.replace(/\[CB\](.*?)\[\/CB\]/g, '<div class="block-cb"><b>笔记:</b> $1</div>');
    content = content.replace(/\[IMG\]([\s\S]*?)\[\/IMG\]/g, (match, p1) => {
        const srcs = p1.split('|').map(s => s.trim());
        const imgHtml = srcs.map(s => {
            const fullSrc = s.startsWith('http') ? s : CONFIG.assetUrl + s;
            return `<img src="${fullSrc}" onclick="openModal('${fullSrc}')">`;
        }).join('');
        return `<div class="rich-img-group" data-count="${srcs.length}">${imgHtml}</div>`;
    });
    content = content.replace(/\[GAME\]([\s\S]*?)\[\/GAME\]/g, (match, p1) => {
        const urls = p1.split('|').map(s => s.trim());
        const gameHtml = urls.map(url => {
            return `<div class="rich-game-item"><iframe src="${url}" frameborder="0" allowfullscreen></iframe></div>`;
        }).join('');
        return `<div class="rich-game-group">${gameHtml}</div>`;
    });
    return content.replace(/\n/g, '<br>');
}

function handleBigNextClick(items, container, activeIndex) {
    if (activeIndex < items.length - 1) {
        renderMixedPagination(items, container, activeIndex + 1);
        return;
    }
    if (state.isPracticeMode) {
        const book = DataManager.db.books.find(b => b.id === state.currentBookId);
        if (book && book.bookPractices) {
            const nextIndex = state.currentPracticeIndex + 1;
            if (nextIndex < book.bookPractices.length) {
                loadPracticeUnit(state.currentBookId, nextIndex);
                document.getElementById('tab-content-area').scrollTop = 0;
            } else {
                alert("🎉 恭喜！本书所有练习已完成！");
            }
        }
    } 
    else {
        if (state.currentWordIndex < state.currentWordList.length - 1) {
            state.currentWordIndex++;
            const nextUid = state.currentWordList[state.currentWordIndex].uid;
            state.lastActiveTabTitle = '挑战一下'; 
            renderWordDetail(nextUid);
        } else {
            alert("🎉 恭喜！本列表单词已全部学完！");
        }
    }
}



// ============ 🃏 选词模式控制逻辑 ============
let isCreationMode = false;
let selectedWordUIDs = new Set();

function toggleCreationMode() {
    isCreationMode = true;
    selectedWordUIDs.clear();
    const searchBox = document.querySelector('.search-box');
    if (searchBox) searchBox.classList.add('hidden');
    const actionBar = document.getElementById('creation-bar');
    if (actionBar) actionBar.classList.remove('hidden');
    updateSelectionCount();
    renderDetailSidebar(); 
    const menu = document.getElementById('practice-menu-content');
    if (menu) menu.classList.remove('show');
}

function exitCreationMode() {
    isCreationMode = false;
    selectedWordUIDs.clear();
    const searchBox = document.querySelector('.search-box');
    if (searchBox) searchBox.classList.remove('hidden');
    const actionBar = document.getElementById('creation-bar');
    if (actionBar) actionBar.classList.add('hidden');
    renderDetailSidebar();
}

function updateSelectionCount() {
    const el = document.getElementById('sidebar-select-count');
    if (el) el.innerText = selectedWordUIDs.size;
}

function toggleWordSelection(uid) {
    if (selectedWordUIDs.has(uid)) selectedWordUIDs.delete(uid);
    else selectedWordUIDs.add(uid);
    const checkbox = document.querySelector(`input[onclick*="'${uid}'"]`);
    if(checkbox) checkbox.checked = selectedWordUIDs.has(uid);
    updateSelectionCount();
}

// 全局变量记录当前选中的主题（默认为 spooky）
let currentSelectedThemeId = 'spooky';

function openConfigModal() {
    if (selectedWordUIDs.size < 2) {
        alert("请至少选择 2 个单词！");
        return;
    }
    document.getElementById('selected-count').innerText = selectedWordUIDs.size;
    document.getElementById('game-config-modal').classList.remove('hidden');

    // 👇 【新增】渲染主题列表
    const container = document.getElementById('modal-theme-list');
    container.innerHTML = '';
    
    Object.keys(THEMES).forEach(key => {
        const theme = THEMES[key];
        const div = document.createElement('div');
        div.className = `theme-option ${key === currentSelectedThemeId ? 'selected' : ''}`;
        div.style.backgroundImage = `url('${theme.thumb}')`;
        div.innerHTML = `<span>${theme.name}</span>`;
        div.onclick = () => {
            currentSelectedThemeId = key;
            // 更新选中样式
            Array.from(container.children).forEach(c => c.classList.remove('selected'));
            div.classList.add('selected');
        };
        container.appendChild(div);
    });
}

function closeConfigModal() {
    document.getElementById('game-config-modal').classList.add('hidden');
}

// ============ 🃏 游戏生成逻辑 ============
function confirmGameGeneration() {
    const groupSize = parseInt(document.getElementById('group-size-select').value);
    const uids = Array.from(selectedWordUIDs);
    const newGames = [];
    for (let i = 0; i < uids.length; i += groupSize) {
        let chunk = uids.slice(i, i + groupSize);
        if (chunk.length < groupSize) {
            const need = groupSize - chunk.length;
            const padding = uids.slice(0, need);
            chunk = chunk.concat(padding);
        }
        newGames.push({
            id: `game-${Date.now()}-${i}`,
            words: chunk,
            type: 'spooky-memory',
            title: `Group ${Math.floor(i/groupSize) + 1}`,
            themeId: currentSelectedThemeId // 👈 【关键】保存主题ID
        });
    }
    state.customGames = newGames;
    closeConfigModal();
    exitCreationMode();
    // ... 后面的代码不变 ...
    const tabs = document.getElementById('detail-tabs');
    if (tabs) Array.from(tabs.children).forEach(btn => btn.classList.remove('active'));
    const area = document.getElementById('tab-content-area');
    renderTabContent('quiz', { uid: 'custom-game-mode' }, area);
}

function clearCustomGames() {
    state.customGames = null;
    if (state.currentWordList[state.currentWordIndex]) {
        renderWordDetail(state.currentWordList[state.currentWordIndex].uid);
    }
}

// ============ 🃏 Spooky Game Engine ============
let gameVideo, gameBgm;


// ============ 🛡️ 多主题全兼容版 startSpookyGame ============
function startSpookyGame(gameIndex) {
    const gameData = state.customGames[gameIndex];
    if (!gameData) return;

    // 获取当前游戏的主题配置
    let activeThemeId = gameData.themeId || 'spooky';
    let themeConfig = THEMES[activeThemeId];

    let container = document.getElementById('game-fullscreen-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'game-fullscreen-container';
        document.body.appendChild(container);
    }
    
    // 渲染容器结构
    // 注意：Video 和 Audio 的 src 现在是空的，稍后用 JS 填充，或者先填默认
    container.innerHTML = `
        <video id="game-video-bg" playsinline webkit-playsinline muted style="position: absolute; width: 100%; height: 100%; object-fit: cover; z-index: 1; background: #000;">
            <source src="${themeConfig.introVideo}" type="video/mp4">
        </video>
        
        <div id="game-start-overlay" class="game-start-overlay">
            <div style="font-size:60px; margin-bottom:20px;">🎃</div>
            
            <div id="start-screen-theme-list" class="theme-selector" style="margin-bottom:30px;"></div>

            <button class="btn-game-start" onclick="realStartGameAction()">▶ START GAME</button>
            <p style="margin-top:15px; opacity:0.8; font-size:14px;">Tap to enter the Game</p>
        </div>

        <button class="btn-exit-game" onclick="exitSpookyGame()">退出游戏</button>
        
        <div id="game-board-layer" style="opacity: 0; transition: opacity 1s; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; position: relative; z-index: 10;">
            <div id="spooky-grid" class="spooky-grid"></div>
        </div>

        <div id="victory-view" class="victory-overlay">
            <img src="https://cdn.jsdelivr.net/gh/mengmeng0415/wordpic01/youwin.png" class="victory-img" alt="You Win">
            <button class="btn-victory-ok" onclick="exitSpookyGame()">OK</button>
        </div>
        
        <audio id="sfx-open-dynamic" src="${themeConfig.introAudio}"></audio>
        <audio id="bgm-dynamic" src="${themeConfig.bgm}" loop></audio>
    `;

    // 渲染开始界面上的主题选择器
    const themeSelector = document.getElementById('start-screen-theme-list');
    Object.keys(THEMES).forEach(key => {
        const t = THEMES[key];
        const div = document.createElement('div');
        div.className = `theme-option ${key === activeThemeId ? 'selected' : ''}`;
        div.style.backgroundImage = `url('${t.thumb}')`;
        div.innerHTML = `<span>${t.name}</span>`;
        div.onclick = (e) => {
            e.stopPropagation(); // 防止触发后面的点击
            switchThemeInLobby(key); // 👈 立即切换主题
        };
        themeSelector.appendChild(div);
    });

    // 内部函数：在准备界面切换主题
    function switchThemeInLobby(newKey) {
        activeThemeId = newKey;
        themeConfig = THEMES[newKey];
        
        // 1. 更新 UI 选中状态
        Array.from(themeSelector.children).forEach(c => c.classList.remove('selected'));
        // 找到对应的 div 加 selected (这里简单重新渲染或者遍历匹配)
        // 省略遍历 dom 逻辑，简单点：
        themeSelector.innerHTML = '';
        Object.keys(THEMES).forEach(key => {
            const t = THEMES[key];
            const div = document.createElement('div');
            div.className = `theme-option ${key === activeThemeId ? 'selected' : ''}`;
            div.style.backgroundImage = `url('${t.thumb}')`;
            div.innerHTML = `<span>${t.name}</span>`;
            div.onclick = (e) => { e.stopPropagation(); switchThemeInLobby(key); };
            themeSelector.appendChild(div);
        });

        // 2. 更新 Video 
        const vid = document.getElementById('game-video-bg');
        vid.src = themeConfig.introVideo; // 切换视频源
        vid.load(); // 重新加载

        // 3. 更新 Audio
        document.getElementById('sfx-open-dynamic').src = themeConfig.introAudio;
        document.getElementById('bgm-dynamic').src = themeConfig.bgm;

        // 4. 更新 CSS 变量 (卡牌样式)
        const grid = document.getElementById('spooky-grid');
        grid.style.setProperty('--card-back', `url('${themeConfig.cardBack}')`);
        grid.style.setProperty('--card-front-bg', `url('${themeConfig.cardFrontBg}')`);
    }

    // 初始化 CSS 变量 (为了防止没点切换直接开始)
    setTimeout(() => switchThemeInLobby(activeThemeId), 0);

    // 生成卡牌数据
    const cards = [];
    gameData.words.forEach(uid => {
        const w = DataManager.getWordDetail(uid);
        if (!w) return;
        let imgUrl = ''; 
        if (w.images && w.images.card && w.images.card.length > 0) imgUrl = w.images.card[0];
        else if (w.displayImages && w.displayImages.length > 0) imgUrl = w.displayImages[0];
        
        const cardData = { id: uid, text: w.word, img: imgUrl };
        cards.push(cardData);
        cards.push(cardData);
    });
    cards.sort(() => Math.random() - 0.5);

    // 渲染网格
    const grid = document.getElementById('spooky-grid');
    const columns = Math.ceil(cards.length / 2);
    grid.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
    grid.style.maxWidth = (columns * 34) + 'vh';

    const cardsHtml = cards.map((c, i) => `
        <div class="spooky-card" id="card-${c.id}-${i}" data-idx="${i}" onclick="flipSpookyCard(this, '${c.id}', '${c.text.replace(/'/g, "\\'")}')">
            <div class="face front">
                <div class="front-img-container">
                    ${c.img ? `<img src="${c.img}" alt="${c.text}">` : '<span class="no-img-text">No Image</span>'}
                </div>
                <span class="front-word-text">${c.text}</span>
                <div class="stamp-container"></div>
            </div>
            <div class="face back"></div>
        </div>
    `).join('');

    grid.innerHTML = cardsHtml + '<div id="grid-overlay" class="grid-overlay"></div>';

    // ============ 🚀 点击“开始”时的激活逻辑 ============
    window.realStartGameAction = function() {
        const overlay = document.getElementById('game-start-overlay');
        if(overlay) overlay.style.display = 'none';

        gameVideo = document.getElementById('game-video-bg');
        
        // 1. 播放视频
        gameVideo.muted = true; 
        gameVideo.play().catch(e => console.warn("Video autoplay blocked:", e));

        // 2. 音频全员激活
        // 注意：现在有动态ID了，所以列表要包含它们
        const audioIds = ['bgm-dynamic', 'sfx-open-dynamic', 'sfx-shuffle', 'sfx-match', 'sfx-notmatch', 'sfx-flip', 'sfx-win'];
        
        audioIds.forEach(id => {
            const audio = document.getElementById(id);
            if (audio) {
                audio.muted = false; 
                audio.volume = (id.includes('bgm') || id.includes('open')) ? 0.6 : 1.0; 
                
                const p = audio.play();
                if (p !== undefined) {
                    p.then(() => {
                        audio.pause();
                        audio.currentTime = 0;
                    }).catch(e => console.warn(`Audio ${id} blocked:`, e));
                }
            }
        });

        // 3. 播放开场音乐 (动态ID)
        setTimeout(() => {
            const openMusic = document.getElementById('sfx-open-dynamic');
            if (openMusic) openMusic.play().catch(()=>{});
        }, 100);

        if (container.requestFullscreen) container.requestFullscreen().catch(()=>{});
        else if (container.webkitRequestFullscreen) container.webkitRequestFullscreen().catch(()=>{});

        // 4. 【动态等待时间】根据当前主题的时长决定
        setTimeout(() => {
            const layer = document.getElementById('game-board-layer');
            if (layer) layer.style.opacity = '1';
            
            // 切换音乐
            const openMusic = document.getElementById('sfx-open-dynamic');
            const bgm = document.getElementById('bgm-dynamic');
            
            if (openMusic) { openMusic.pause(); openMusic.currentTime = 0; }
            if (bgm) { bgm.currentTime = 0; bgm.play().catch(()=>{}); }

            safePlayAudio('sfx-shuffle');
            const allCards = document.querySelectorAll('.spooky-card');
            allCards.forEach(c => c.classList.add('shuffling'));
            setTimeout(() => { allCards.forEach(c => c.classList.remove('shuffling')); }, 1000);
            
        }, themeConfig.introDuration); // 👈 使用配置中的时长！
    };

    resetSpookyLogic();
}

function exitSpookyGame() {
    const c = document.getElementById('game-fullscreen-container');
    if (c) c.remove();
    if (document.exitFullscreen) document.exitFullscreen();
    if (gameBgm) gameBgm.pause();
    if (gameVideo) gameVideo.pause();
}

let sCard1 = null, sCard2 = null;
let sLock = false;

function resetSpookyLogic() {
    [sCard1, sCard2, sLock] = [null, null, false];
}


// ============ 翻牌逻辑 (防双重触发·终极稳定版) ============
function flipSpookyCard(el, uid, wordText) {
    // 1. 基础拦截
    if (sLock) return;
    if (sCard1 && el === sCard1.el) return;
    if (el.classList.contains('matched')) return;

    // 2. 状态记录
    let isSecondCard = false;
    if (!sCard1) {
        sCard1 = { el, uid };
    } else {
        sCard2 = { el, uid };
        sLock = true; // 立刻上锁
        isSecondCard = true;
    }

    // 3. 视觉翻转
    el.classList.add('flipped');
    
    // 4. 播放翻牌音效
    setTimeout(() => {
        safePlayAudio('sfx-flip'); 
    }, 50);

    // 5. 读单词 & 触发判断 (核心修复部分)
    setTimeout(() => {
        // --- 🛡️ 定义一个只执行一次的控制器 ---
        let hasTriggered = false;
        let safetyTimer = null;

        const triggerNextStep = () => {
            if (hasTriggered) return; // 如果已经执行过，直接退出，防止双重触发
            hasTriggered = true;      // 标记为已执行
            
            if (safetyTimer) clearTimeout(safetyTimer); // 清除保底定时器

            // 只有第二张牌才需要触发比对
            if (isSecondCard) {
                checkSpookyMatch();
            }
        };

        // --- 尝试播放语音 ---
        let hasSpeech = false;
        try {
            if ('speechSynthesis' in window) {
                speechSynthesis.cancel(); 
                const u = new SpeechSynthesisUtterance(wordText);
                u.lang = 'en-US';
                if (preferredVoice) u.voice = preferredVoice;
                u.volume = 1;
                
                // ✅ 正常读完触发
                u.onend = triggerNextStep;
                
                // ❌ 错误时也触发（防止卡死）
                u.onerror = triggerNextStep;

                speechSynthesis.speak(u);
                hasSpeech = true;
                
                // ⏰ 【保底定时器】
                // 如果 1.2秒后 u.onend 还没来（浏览器卡了/没读出声），强制触发
                safetyTimer = setTimeout(triggerNextStep, 1200);
            }
        } catch (e) {
            console.warn("TTS failed:", e);
        }

        // 如果浏览器根本不支持语音，直接触发
        if (!hasSpeech) {
            triggerNextStep();
        }

    }, 350); // 视觉延迟
}

// ============ 核心：判断与动画序列 (修复遮罩层逻辑) ============
function checkSpookyMatch() {
    sLock = true;
    const card1 = sCard1;
    const card2 = sCard2;
    const isMatch = card1.uid === card2.uid;
    const stampDelay = 300; 

    setTimeout(() => {
        if (isMatch) {
            const overlay = document.getElementById('grid-overlay');
            if(overlay) overlay.classList.add('active');

            const centerCards = () => {
                const cx = window.innerWidth / 2;
                const cy = window.innerHeight / 2;
                [card1.el, card2.el].forEach((el, index) => {
                    const rect = el.getBoundingClientRect();
                    const offset = index === 0 ? -rect.width * 0.9 : rect.width * 0.9;
                    const tx = cx - (rect.left + rect.width / 2) + offset;
                    const ty = cy - (rect.top + rect.height / 2);
                    el.style.zIndex = "9999"; 
                    el.style.transition = "transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
                    el.style.transform = `translate(${tx}px, ${ty}px) scale(1.5) rotateY(180deg)`;
                });
            };
            centerCards();

            setTimeout(() => {
                safePlayAudio('sfx-match');
                showStamp(card1.el, 'match');
                showStamp(card2.el, 'match');
            }, 500); 

            setTimeout(() => {
                removeStamp(card1.el);
                removeStamp(card2.el);
            }, 1500);

            setTimeout(() => {
                card1.el.style.opacity = '0';
                card2.el.style.opacity = '0';
                card1.el.classList.add('matched');
                card2.el.classList.add('matched');
                const left = document.querySelectorAll('.spooky-card:not(.matched)').length;
                if (left === 0) {
                    setTimeout(() => {
                        // 1. 停止背景音乐
                        // 👇 修改这里：ID 变了
                        const bgm = document.getElementById('bgm-dynamic'); 
                        if (bgm) bgm.pause();

                        // 2. 播放胜利音效
                        safePlayAudio('sfx-win');

                        // 3. 显示胜利蒙层
                        const victoryView = document.getElementById('victory-view');
                        if (victoryView) victoryView.classList.add('show');
                        
                    }, 500);
                }
            }, 3000); 

            setTimeout(() => {
                if(overlay) overlay.classList.remove('active');
                resetSpookyLogic();
            }, 3200);

        } else {
            safePlayAudio('sfx-notmatch');
            showStamp(card1.el, 'notmatch');
            showStamp(card2.el, 'notmatch');
            card1.el.classList.add('shake');
            card2.el.classList.add('shake');
            setTimeout(() => {
                removeStamp(card1.el);
                removeStamp(card2.el);
                card1.el.classList.remove('flipped', 'shake');
                card2.el.classList.remove('flipped', 'shake');
                resetSpookyLogic();
            }, 1500); 
        }
    }, stampDelay);
}

function showStamp(cardEl, type) {
    const container = cardEl.querySelector('.stamp-container');
    const imgUrl = type === 'match' 
        ? 'https://cdn.jsdelivr.net/gh/mengmeng0415/wordpic01/match.png' 
        : 'https://cdn.jsdelivr.net/gh/mengmeng0415/wordpic01/notmatch.png';
    container.style.backgroundImage = `url('${imgUrl}')`;
    container.classList.add('show');
}

function removeStamp(cardEl) {
    const container = cardEl.querySelector('.stamp-container');
    container.classList.remove('show');
}

function safePlayAudio(audioId) {
    try {
        const audio = document.getElementById(audioId);
        if (!audio) return;
        audio.currentTime = 0;
        const playPromise = audio.play();
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.warn("Audio play blocked (benign):", error);
            });
        }
    } catch (e) {
        console.warn("Audio element error:", e);
    }
}
// ============ 🚀 Zoom 核心控制器 (最终修正版) ============

// 1. 切换 Zoom 开关 (入口)
window.toggleImageZoom = function() {
    state.isImageZoom = !state.isImageZoom;
    if (state.isImageZoom) {
        state.currentImgIdx = 0; // 每次进入全屏重置图片索引
    }
    refreshCurrentTab(); // 触发界面更新
}

// 2. 智能刷新当前 Tab (防止跳去 Scene)
function refreshCurrentTab() {
    const area = document.getElementById('tab-content-area');
    const currentWord = state.currentWordList[state.currentWordIndex];
    
    if (currentWord) {
        const fullDetail = DataManager.getWordDetail(currentWord.uid);
        
        let type = 'scene'; // 默认值
        
        // 🕵️ 侦探逻辑：看现在哪个 Tab 按钮是亮(active)的
        const activeBtn = document.querySelector('#detail-tabs button.active');
        if (activeBtn) {
            const t = activeBtn.innerText;
            if (t === '单词详解') type = 'text';
            else if (t === '挑战一下') type = 'quiz';
            else if (t === '趣味游戏') type = 'game';
            else if (t === '图片') type = 'scene';
        }

        // 调用渲染函数 (它会根据 state.isImageZoom 决定是否全屏)
        renderTabContent(type, fullDetail, area);
    }
}

// 3. Zoom 模式下的前后导航 (统一处理 Scene 和 Text)
// 3. Zoom 模式下的前后导航 (统一处理 Scene 和 Text)
window.navigateInZoom = function(direction) {
    const activeBtn = document.querySelector('#detail-tabs button.active');
    const tabName = activeBtn ? activeBtn.innerText : '';
    
    // === Scene 模式特殊逻辑：优先切图 ===
    if (tabName === '图片') {
        const currentWord = state.currentWordList[state.currentWordIndex];
        const fullDetail = DataManager.getWordDetail(currentWord.uid);
        
        // 👇👇👇 修改点：只获取 Scene 图片，屏蔽 Card 图片 👇👇👇
        let allImages = [];
        if (fullDetail.images && fullDetail.images.scene) {
            allImages = fullDetail.images.scene.map(u => u.startsWith('http') ? u : CONFIG.assetUrl + CONFIG.imgFolder + u);
        }
        // 去重
        allImages = [...new Set(allImages)];

        const newIdx = state.currentImgIdx + direction;
        // 如果还有图，只切图，不切单词
        if (newIdx >= 0 && newIdx < allImages.length) {
            state.currentImgIdx = newIdx;
            refreshCurrentTab();
            return; 
        }
    }

    // === 通用逻辑：切换到前一个/后一个模块 (切换单词) ===
    const newWordIdx = state.currentWordIndex + direction;
    
    if (newWordIdx >= 0 && newWordIdx < state.currentWordList.length) {
        state.currentWordIndex = newWordIdx;
        state.currentImgIdx = 0; // 新单词重置图片索引
        
        // 渲染新单词详情 (这会更新 Header 和 播放读音)
        const nextUid = state.currentWordList[newWordIdx].uid;
        renderWordDetail(nextUid);
        
        // ⚠️ 关键：renderWordDetail 可能会默认切回第一个Tab，我们需要保持当前的 Tab 类型
        const tabs = document.getElementById('detail-tabs');
        Array.from(tabs.children).forEach(btn => {
            btn.classList.remove('active');
            if (btn.innerText === tabName) btn.classList.add('active'); // 保持 Tab 不变
        });
        
        // 刷新内容 (保持 Zoom 状态)
        refreshCurrentTab(); 
        
    } else {
        alert("到底啦！没有更多单词了。");
    }
}

// 4. 辅助函数：全屏时的 Text 内部滚动
window.scrollToSectionInZoom = function(id) {
    const t = document.getElementById(id);
    const s = document.getElementById('reader-scroll'); // 对应 Text 里的滚动容器
    if(t && s) {
        s.scrollTo({ top: t.offsetTop - s.offsetTop - 20, behavior: 'smooth' });
    }
}
// 2. 点击某张图进入 Zoom (确保此函数在 app.js 中)
window.enterImageZoom = function(idx) {
    console.log("进入放大模式:", idx); // 用于调试
    state.isImageZoom = true;
    state.currentImgIdx = idx;
    refreshCurrentTab();
}