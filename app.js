// ================== 🛠️ 1. 资源配置 ==================
const CONFIG = {
    assetUrl: "https://mengmeng0415.github.io/", 
    imgFolder: "", 
    dataPath: "data/" 
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
        
        // 深拷贝
        const word = JSON.parse(JSON.stringify(raw));
        word.uid = uid; 
        
        const process = (url) => url.startsWith('http') ? url : CONFIG.assetUrl + CONFIG.imgFolder + url;
        
        // 1. 图片路径处理
        word.displayImages = [];
        if (word.images) {
            const scene = (word.images.scene || []).map(process);
            const card = (word.images.card || []).map(process);
            word.displayImages = scene.concat(card);
        }

        // 2. Tab 游戏 (games)
        if (word.games && Array.isArray(word.games)) {
        } else if (word.gameUrl) {
            word.games = [word.gameUrl];
        } else {
            word.games = [];
        }

        // 3. Quiz 游戏 (quizGames)
        if (word.quizGames && Array.isArray(word.quizGames)) {
            // 保持原样
        } else {
            word.quizGames = [];
        }

        // 4. 富文本详情处理
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
        
        // 5. 关联题目 (Quiz)
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
                
                // Tab 游戏依然保留，因为它是独立 Tab
                if (item.games && Array.isArray(item.games)) {
                    bookSpecificGames = item.games;
                }
            }

            const detail = this.getWordDetail(uid);
            if (!detail) return null;
            
            detail._tempFocus = focusIdx; 
            
            if (bookSpecificGames) detail.games = bookSpecificGames;
            
            // 把章节配置的 quizIds 列表挂载到单词上
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
    currentPracticeIndex: 0
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
    if (e.target.closest('.quiz-q') || e.target.closest('.opt-btn') || e.target.closest('.switch') || e.target.closest('.audio-icon')) return;
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

    // 更新侧边栏顶部的统计数字
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

    return `
    <li onclick="jumpToWord('${w.uid}')" class="${isActive ? 'active' : ''}">
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
    state.isPracticeMode = false; // 【新增】重置标记
    state.currentBookId = bookId; 
    state.bookFilterRatings.clear();
    
    document.getElementById('view-home').classList.add('hidden');
    document.getElementById('view-detail').classList.remove('hidden');
    
    // 1. 获取书本信息
    const book = DataManager.db.books.find(b => b.id === bookId);
    if (!book) return;

    // 2. 统计单词数
    const wordCount = countBookWords(book);
    
    // 3. 检查是否有书本练习
    const hasPractices = book.bookPractices && book.bookPractices.length > 0;
    
    // 渲染练习菜单 (无论是否有单词，都要准备好菜单)
    renderPracticeMenu(book);

    // ============ 核心修改：无单词但有练习，自动跳转 ============
    if (wordCount === 0 && hasPractices) {
        // 收起侧边栏
        const sidebar = document.getElementById('chapter-sidebar');
        if(sidebar) sidebar.classList.add('collapsed'); // 强制收起
        
        // 隐藏“展开/收起”按钮 (因为没东西可展开)
        const bookToggleBtn = document.getElementById('btn-book-toggle'); 
        if(bookToggleBtn) bookToggleBtn.style.display = 'none';

        // 直接进入第一个练习单元
        loadPracticeUnit(bookId, 0);
        return; // 结束，不再渲染单词列表
    }
    // =======================================================

    // 正常流程：显示侧边栏
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
    
    // 如果有单词，默认显示第一个
    if(state.currentWordList.length > 0) {
        state.currentWordIndex = 0;
        renderWordDetail(state.currentWordList[0].uid);
    } else if (!hasPractices) {
        // 既没单词也没练习
        document.getElementById('word-main').innerText = "暂无内容";
        document.getElementById('tab-content-area').innerHTML = "";
    }
}

window.enterSoloMode = function(uid) {
    state.mode = 'home_detail';
    state.isPracticeMode = false; // 【新增】重置标记
    document.getElementById('view-home').classList.add('hidden');
    document.getElementById('view-detail').classList.remove('hidden');
    const sidebar = document.getElementById('chapter-sidebar'); if(sidebar) { sidebar.classList.remove('hidden'); sidebar.classList.remove('collapsed'); }
    
    // 隐藏书本展开按钮
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

// 统计单词数量时，增加校验，只统计真实存在于 words 库中的单词
function countBookWords(book) {
    let count = 0;
    if (book.chapters) { 
        book.chapters.forEach(c => { 
            if (c.wordIds) {
                // 修复逻辑：过滤掉无效的 ID
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
    // 1. 获取基础数据
    const word = DataManager.getWordDetail(uid);
    if (!word) return;

    // ======= 恢复 UI 状态 (修正版) =======
    // 从练习模式返回时，需要把隐藏的星星、发音等显示出来
    document.getElementById('rating-stars').style.display = 'flex'; // 显示星星
    document.querySelector('.main-audio').style.display = 'flex';   // 显示发音
    document.getElementById('nav-buttons').style.display = 'flex';  // 显示前后翻页
    
    // 恢复“显示单词”按钮
    const wordBtnEl = document.getElementById('btn-toggle-word');
    if(wordBtnEl) wordBtnEl.style.visibility = 'visible'; 
    // ================================================
    
    // 从当前状态列表中获取“上下文信息”（比如书本规定的题目顺序）
    const contextWord = state.currentWordList.find(w => w.uid === uid);
    if (contextWord && contextWord.chapterQuizIds) {
        word.chapterQuizIds = contextWord.chapterQuizIds;
    }

    document.getElementById('word-main').innerText = word.word;
    renderHeaderStars(uid);
    
   // ======= 判断单词显示状态 =======
    const wordBtn = document.getElementById('btn-toggle-word');
    // 如果按钮有 active 类，说明当前是“显示单词”模式
    const isWordVisible = wordBtn ? wordBtn.classList.contains('active') : true;

    if (isWordVisible) {
        state.lastActiveTabTitle = null; 
    }
    // ======= 修改结束 =======

    const tabs = document.getElementById('detail-tabs');
    const area = document.getElementById('tab-content-area');
    tabs.innerHTML = ''; area.innerHTML = '';
    
    // ================= 动态生成 Tab 列表 =================
    const hasScene = word.displayImages && word.displayImages.length > 0;
    const hasText = word.richDetail && word.richDetail.length > 0;
    
    // 检查挑战内容
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
    
    // 高亮侧边栏
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
    
    if (type === 'scene') {
        if (word.displayImages.length) {
            const imgs = word.displayImages.map(src => `<div class="scene-img-wrapper"><img src="${src}" class="scene-image" onclick="openModal('${src}')"></div>`).join('');
            container.innerHTML = `<div class="scene-images" data-count="${word.displayImages.length}">${imgs}</div>`;
        } else container.innerHTML = `<div class="empty-tip">暂无图片</div>`;
    
    } else if (type === 'text') {
        if(word.richDetail) {
            let nav='<div class="rich-nav">', body='';
            word.richDetail.forEach((s,i) => { nav+=`<button onclick="scrollToSection('s-${i}')">${s.title}</button>`; body+=`<div id="s-${i}" class="rich-section"><h3>${s.title}</h3><div class="rich-content-body">${s.content}</div></div>`; });
            container.innerHTML = nav+'</div>'+body;
        }
    
    } else if (type === 'quiz') {
        // ======= 基于 quizzes.json 和 顺序控制 =======
        let allQuizzes = word.linkedQuizzes || [];
        
        // 如果存在“书本规定的题目列表”
        if (word.chapterQuizIds && word.chapterQuizIds.length > 0) {
            allQuizzes = allQuizzes.filter(q => word.chapterQuizIds.includes(q.id));
            allQuizzes.sort((a, b) => {
                return word.chapterQuizIds.indexOf(a.id) - word.chapterQuizIds.indexOf(b.id);
            });
        }

        let challengeList = [];
        allQuizzes.forEach(item => {
            if (item.type === 'game') {
                challengeList.push({ 
                    type: 'game', 
                    content: item.gameUrl, 
                    id: item.id 
                });
            } else {
                challengeList.push({ 
                    type: 'quiz', 
                    content: item, 
                    id: item.id 
                });
            }
        });

        if (challengeList.length > 0) {
            renderMixedPagination(challengeList, container, 0);
        } else {
            container.innerHTML = `<div class="empty-tip">暂无挑战</div>`;
        }

    } else if (type === 'game') {
        if (word.games && word.games.length > 0) {
            const gamesHtml = word.games.map(url => `
                <div class="rich-game-item">
                    <iframe src="${url}" frameborder="0" allowfullscreen></iframe>
                </div>
            `).join('');
            
            container.innerHTML = `
                <div class="rich-section" style="margin-top:0;">
                    <div class="rich-game-group">
                        ${gamesHtml}
                    </div>
                </div>`;
        } else {
            container.innerHTML = `<div class="empty-tip">暂无游戏</div>`;
        }
    }
}

// 混合内容分页渲染函数
// 混合内容分页渲染函数 (修改版：按钮在顶部)
// 混合内容分页渲染函数 (最终版：顶部圆点 + 底部大按钮)
// 混合内容分页渲染函数 (修复版：各种间距与图标优化)
// 混合内容分页渲染函数 (完美防跳动版)
// 混合内容分页渲染函数 (含全屏缩放按钮)
// 混合内容分页渲染函数 (悬浮按钮版)
function renderMixedPagination(items, container, activeIndex) {
    container.innerHTML = ''; 
    container.scrollTop = 0;
    
    // 1. 顶部：分页占位区
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

    // 2. 中间：白底卡片 (注意：这里不再插入 zoom 按钮了)
    const item = items[activeIndex];
    let contentHtml = '';
    
    if (item.type === 'game') {
        contentHtml = `
            <div class="quiz-box">
                <div class="quiz-q">
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
                    <div class="quiz-q">
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
                    <div class="quiz-q">
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

    // 3. 底部：大号 Next 按钮
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

    // ============ 4. 悬浮全屏按钮 (新位置：屏幕右下角) ============
    
    // 四箭头向外扩散的 SVG 图标
    const fourArrowsIcon = `
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
    </svg>`;

    const zoomBtn = document.createElement('button');
    zoomBtn.className = 'btn-fixed-zoom'; // 使用新的 CSS 类
    zoomBtn.innerHTML = fourArrowsIcon;
    zoomBtn.title = "全屏专注模式";
    zoomBtn.onclick = toggleFullScreen;
    
    // 添加到容器的最末尾 (确保它在最上层)
    container.appendChild(zoomBtn);
}

// 配对题逻辑
// ================== 新增：配对题逻辑处理 (支持图片版) ==================
function initMatchingGame(quizData, containerId, feedbackId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // 1. 准备数据
    const pairs = quizData.pairs;
    const leftItems = pairs.map((p, i) => ({ text: p.left, id: i }));
    const rightItems = pairs.map((p, i) => ({ text: p.right, id: i }));
    
    // 右侧乱序
    rightItems.sort(() => Math.random() - 0.5);

    // 2. 生成 HTML
    const colLeft = document.createElement('div'); colLeft.className = 'match-col';
    const colRight = document.createElement('div'); colRight.className = 'match-col';

    // --- 内部辅助函数：判断是显示文字还是图片 ---
    const appendContent = (btn, content) => {
        // 检查是否为图片路径 (简单判断：以常见的图片后缀结尾)
        const isImage = /\.(webp|png|jpg|jpeg|gif)$/i.test(content);
        
        if (isImage) {
            // 如果是图片，插入 img 标签
            // 注意：这里自动拼接了 CONFIG.assetUrl，就像处理其他图片一样
            const fullSrc = content.startsWith('http') ? content : CONFIG.assetUrl + CONFIG.imgFolder + content;
            btn.innerHTML = `<img src="${fullSrc}" class="match-img" alt="img" />`;
            btn.classList.add('has-image'); // 加个类名方便写样式
        } else {
            // 如果是文字，直接显示
            btn.innerText = content;
        }
    };

    leftItems.forEach(item => {
        const btn = document.createElement('div');
        btn.className = 'match-item';
        appendContent(btn, item.text); // 使用辅助函数渲染
        btn.dataset.id = item.id;
        btn.dataset.side = 'left';
        btn.onclick = (e) => handleMatchClick(e.currentTarget, feedbackId); // 改为 currentTarget 确保点到 div
        colLeft.appendChild(btn);
    });

    rightItems.forEach(item => {
        const btn = document.createElement('div');
        btn.className = 'match-item';
        appendContent(btn, item.text); // 使用辅助函数渲染
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
    // 修复：如果是在首页点击，直接进入详情模式（不要去查 currentWordList，因为此时它是空的）
    if (state.mode === 'home') {
        enterSoloMode(uid);
        return;
    }

    // 其他模式（书本内、详情页内）保持原有逻辑
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

// 全新的切换逻辑：控制按钮样式和文字
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

// ============ 书本练习功能模块 ============
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
    
    if (book.bookPractices && book.bookPractices.length > 0) {
        container.style.display = 'inline-block'; 
        menu.innerHTML = book.bookPractices.map((p, index) => 
            `<button onclick="loadPracticeUnit('${book.id}', ${index})">${p.name}</button>`
        ).join('');
    } else {
        container.style.display = 'none'; 
    }
}

window.loadPracticeUnit = function(bookId, practiceIndex) {
    const book = DataManager.db.books.find(b => b.id === bookId);
    if (!book || !book.bookPractices) return;

    const practice = book.bookPractices[practiceIndex];
    if (!practice) return;

    // 【新增】记录当前状态
    state.isPracticeMode = true;
    state.currentBookId = bookId; // 确保 bookId 正确
    state.currentPracticeIndex = practiceIndex;

    // --- UI 调整：进入“纯净”做题模式 ---
    document.getElementById('word-main').innerText = practice.name;
    
    document.getElementById('rating-stars').style.display = 'none';
    document.querySelector('.main-audio').style.display = 'none';
    document.getElementById('nav-buttons').style.display = 'none';
    // 隐藏“显示单词”按钮
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

// 快捷标签解析器
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
// 处理大号 Next 按钮的跳转逻辑
function handleBigNextClick(items, container, activeIndex) {
    // 情况 1: 本组还有题目，跳转下一题
    if (activeIndex < items.length - 1) {
        renderMixedPagination(items, container, activeIndex + 1);
        return;
    }

    // 情况 2: 本组题目做完了，需要跨越跳转
    // ------------------------------------------------
    
    // A. 如果是【书本练习模式】 -> 跳到下一个练习单元
    if (state.isPracticeMode) {
        const book = DataManager.db.books.find(b => b.id === state.currentBookId);
        if (book && book.bookPractices) {
            const nextIndex = state.currentPracticeIndex + 1;
            if (nextIndex < book.bookPractices.length) {
                // 加载下一个单元
                loadPracticeUnit(state.currentBookId, nextIndex);
                // 滚回顶部
                document.getElementById('tab-content-area').scrollTop = 0;
            } else {
                alert("🎉 恭喜！本书所有练习已完成！");
            }
        }
    } 
    // B. 如果是【普通背单词模式】 -> 跳到下一个单词
    else {
        if (state.currentWordIndex < state.currentWordList.length - 1) {
            // 1. 切换到下一个单词
            state.currentWordIndex++;
            const nextUid = state.currentWordList[state.currentWordIndex].uid;
            
            // 2. 【关键】强制下个单词默认打开“挑战一下”Tab
            state.lastActiveTabTitle = '挑战一下'; 
            
            // 3. 渲染
            renderWordDetail(nextUid);
        } else {
            alert("🎉 恭喜！本列表单词已全部学完！");
        }
    }
}
// 全屏切换逻辑
window.toggleFullScreen = function() {
    // 获取需要全屏的容器（这里是整个 Tab 内容区，包含了圆点、卡片和 Next 按钮）
    const elem = document.getElementById('tab-content-area');
    
    if (!document.fullscreenElement) {
        // 进入全屏
        if (elem.requestFullscreen) {
            elem.requestFullscreen().catch(err => {
                alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
            });
        } else if (elem.webkitRequestFullscreen) { /* Safari */
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { /* IE11 */
            elem.msRequestFullscreen();
        }
    } else {
        // 退出全屏
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) { /* Safari */
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { /* IE11 */
            document.msExitFullscreen();
        }
    }
};