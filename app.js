let state = { 
    currentBookId: null, 
    currentWordList: [], 
    currentWordIndex: 0, 
    mode: 'home',
    chaptersExpanded: true,
    homeExpanded: true, 
    homeSearchResults: [],
    lastActiveTabTitle: null,
    homeFilterRatings: new Set(),
    bookFilterRatings: new Set()
};

// 音效路径
const audioRight = new Audio('backinfo/right.mp3');
const audioWrong = new Audio('backinfo/wrong.mp3');
const audioClick = new Audio('backinfo/click.mp3');
let isClickSoundEnabled = true;

let preferredVoice = null;
function initVoices() {
    const voices = window.speechSynthesis.getVoices();
    if (voices.length === 0) return;
    preferredVoice = voices.find(v => v.name.includes('Google US English')) ||
                     voices.find(v => v.name.includes('Microsoft Zira')) ||
                     voices.find(v => v.lang === 'en-US');
}

document.addEventListener('DOMContentLoaded', () => {
    if (typeof DB === 'undefined') { alert("错误：无法读取 data.js。请检查 data.js 格式！"); return; }
    
    if (!DB.ratings) DB.ratings = {};
    loadRatingsFromStorage();

    initHome();
    initVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = initVoices;
    }
    
    document.addEventListener('click', (e) => {
        if (!isClickSoundEnabled) return;
        if (e.target.closest('.quiz-q') || e.target.closest('.opt-btn')) return;
        if (e.target.closest('.switch')) return; 
        if (e.target.closest('.audio-icon')) return;
        
        const playPromise = audioClick.play();
        if (playPromise !== undefined) { playPromise.catch(error => {}); }
    });
});

function loadRatingsFromStorage() {
    const savedRatings = localStorage.getItem('myWordRatings');
    if (savedRatings) {
        try {
            const parsed = JSON.parse(savedRatings);
            DB.ratings = { ...DB.ratings, ...parsed };
            console.log("已恢复评分数据");
        } catch (e) {
            console.error("读取缓存失败", e);
        }
    }
}

function saveRatingsToStorage() {
    localStorage.setItem('myWordRatings', JSON.stringify(DB.ratings));
}

function toggleClickSound(el) {
    isClickSoundEnabled = el.checked;
    document.querySelectorAll('.sound-switch').forEach(s => { s.checked = isClickSoundEnabled; });
}

window.exportData = function() {
    let outputLines = [];
    const sortedWords = [...DB.words].sort((a, b) => a.word.localeCompare(b.word));
    sortedWords.forEach(w => {
        const rating = DB.ratings[w.uid] || 0;
        const line = `        "${w.uid}": ${rating},`.padEnd(25) + `// ${w.word}`;
        outputLines.push(line);
    });
    const outputStr = `ratings: {\n${outputLines.join('\n')}\n    },`;
    
    const exportContent = `// ================== 星级数据导出 ==================\n// 请打开 data.js，找到 "ratings: { ... }" 部分，用下面的代码替换它：\n\n${outputStr}`;
    
    const blob = new Blob([exportContent], { type: "text/plain;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "updated_ratings.txt"; 
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    alert("星级数据已导出！\n平时会自动保存在浏览器中，导出文件可作为永久备份。");
}

function initHome() {
    state.homeExpanded = true;
    updateHomeToggleBtnUI();

    renderSidebarFilter('home');
    applyHomeFilter(); 
    
    const categories = (DB.settings && DB.settings.bookCategories) || [];
    if (categories.length > 0) renderBookTabs(categories[0]);
    
    const input = document.getElementById('global-search');
    if(input) {
        const newInput = input.cloneNode(true);
        input.parentNode.replaceChild(newInput, input);
        newInput.addEventListener('input', () => applyHomeFilter());
    }
}

function renderSidebarFilter(mode) {
    const containerId = mode === 'home' ? 'home-filter-stars' : 'book-filter-stars';
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = '';
    const currentFilters = mode === 'home' ? state.homeFilterRatings : state.bookFilterRatings;
    
    for (let i = 1; i <= 5; i++) {
        const btn = document.createElement('div');
        btn.className = `filter-star-btn ${currentFilters.has(i) ? 'active' : ''}`;
        btn.innerText = i;
        btn.onclick = () => toggleFilter(mode, i);
        container.appendChild(btn);
    }
}

function toggleFilter(mode, rating) {
    const filterSet = mode === 'home' ? state.homeFilterRatings : state.bookFilterRatings;
    if (filterSet.has(rating)) {
        filterSet.delete(rating);
    } else {
        filterSet.add(rating);
    }
    if (mode === 'home') {
        renderSidebarFilter('home');
        applyHomeFilter();
    } else {
        renderSidebarFilter('book');
        applyBookFilter();
    }
}

function generateListItemHTML(wordObj) {
    const rating = DB.ratings[wordObj.uid] || 0;
    let ratingHtml = rating > 0 ? `<span class="rating-num rating-${rating}">${rating}</span>` : `<span class="rating-num"></span>`;
    return `<li onclick="enterSoloMode('${wordObj.uid}')">${ratingHtml} ${wordObj.word} <small style='color:#ccc;margin-left:5px'>(${getSeriesNameByChapter(wordObj.chapterId)})</small></li>`;
}

function updateListCounts(count, mode) {
    const elId = mode === 'home' ? 'home-list-count' : 'book-list-count';
    const el = document.getElementById(elId);
    if (el) el.innerText = `(ct. ${count})`;
}

function applyHomeFilter() {
    const input = document.getElementById('global-search');
    const val = input ? input.value.toLowerCase() : '';
    const filters = state.homeFilterRatings;
    
    let filtered = DB.words.filter(w => {
        const wordRating = DB.ratings[w.uid] || 0;
        const matchText = !val || w.word.toLowerCase().includes(val);
        const matchStar = filters.size === 0 || filters.has(wordRating);
        return matchText && matchStar;
    });
    
    filtered.sort((a, b) => a.word.localeCompare(b.word));
    state.homeSearchResults = filtered;
    renderABCListFiltered(filtered);
    updateListCounts(filtered.length, 'home');
    
    const list = document.getElementById('search-suggestions');
    if (val && list) {
        list.style.display = filtered.length ? 'block' : 'none';
        list.innerHTML = filtered.slice(0, 5).map(w => generateListItemHTML(w)).join('');
    } else if (list) {
        list.style.display = 'none';
    }
}

function renderABCListFiltered(words) {
    const list = document.getElementById('abc-list');
    list.innerHTML = '';
    
    const groups = {};
    words.forEach(w => {
        const char = w.word[0].toUpperCase();
        if(!groups[char]) groups[char] = [];
        groups[char].push(w);
    });
    
    Object.keys(groups).sort().forEach(char => {
        const li = document.createElement('li');
        const isExpanded = state.homeExpanded || state.homeFilterRatings.size > 0 || document.getElementById('global-search').value !== '';
        const hiddenClass = isExpanded ? '' : 'hidden';
        
        li.innerHTML = `<div class="abc-group-header" onclick="this.nextElementSibling.classList.toggle('hidden')">${char} <small>${groups[char].length}</small></div><ul class="abc-items ${hiddenClass}">${groups[char].map(w => generateListItemHTML(w)).join('')}</ul>`;
        list.appendChild(li);
    });
}

function renderABCList() { applyHomeFilter(); }

function getWordsByChapterId(chapId) {
    if (!DB.words) return [];
    return DB.words.filter(w => w.chapterId === chapId).sort((a, b) => (a.order || 999) - (b.order || 999));
}
function getWordByUid(uid) { return DB.words.find(w => w.uid === uid); }
function getSeriesNameByChapter(chapId) {
    for (let b of DB.books) {
        for (let c of b.chapters) { if (c.id === chapId) return b.series; }
    } return "";
}

window.toggleHomeList = function() {
    state.homeExpanded = !state.homeExpanded;
    updateHomeToggleBtnUI();
    document.querySelectorAll('#abc-list .abc-items').forEach(ul => {
        if(state.homeExpanded) ul.classList.remove('hidden');
        else ul.classList.add('hidden');
    });
}

function updateHomeToggleBtnUI() {
    const btn = document.getElementById('btn-home-toggle');
    if(btn) btn.innerText = state.homeExpanded ? '全部收起' : '全部展开';
}

window.toggleHomeSidebar = function() {
    const s = document.getElementById('home-sidebar');
    s.style.marginLeft = s.style.marginLeft === '-261px' ? '0' : '-261px';
}

function renderBookTabs(activeType) {
    const types = (DB.settings && DB.settings.bookCategories) || [];
    const nav = document.getElementById('book-type-tabs');
    nav.innerHTML = types.map(t => `<button class="${t === activeType ? 'active' : ''}" onclick="renderBookTabs('${t}')">${t}</button>`).join('');
    const gallery = document.getElementById('book-gallery');
    const books = DB.books.filter(b => b.type === activeType);
    if (books.length === 0) { gallery.innerHTML = `<div style="text-align:center;color:#999;padding:20px">该分类下暂无书籍</div>`; return; }
    const groupedBooks = {};
    books.forEach(b => {
        const s = b.series || "其他";
        if (!groupedBooks[s]) groupedBooks[s] = [];
        groupedBooks[s].push(b);
    });
    let seriesKeys = Object.keys(groupedBooks);
    const configuredOrder = (DB.settings && DB.settings.seriesOrder) || [];
    seriesKeys.sort((a, b) => {
        const idxA = configuredOrder.indexOf(a);
        const idxB = configuredOrder.indexOf(b);
        if (idxA !== -1 && idxB !== -1) return idxA - idxB;
        if (idxA !== -1) return -1;
        if (idxB !== -1) return 1;
        return a.localeCompare(b);
    });
    gallery.innerHTML = seriesKeys.map(series => {
        const seriesBooks = groupedBooks[series];
        const cardsHtml = seriesBooks.map(b => {
            const chapIds = b.chapters.map(c => c.id);
            const count = DB.words.filter(w => chapIds.includes(w.chapterId)).length;
            let coverStyle = "", innerContent = "";
            if (b.cover && b.cover.includes('.')) { coverStyle = `background-image: url('${b.cover}')`; } 
            else { coverStyle = `background:#eee; display:flex; align-items:center; justify-content:center;`; innerContent = `<span style="font-size:30px;color:#ccc">${b.title[0]}</span>`; }
            return `<div class="book-card" onclick="enterBookMode('${b.id}')"><div class="book-cover" style="${coverStyle}">${innerContent}</div><div class="book-info"><span class="book-title">${b.title}</span><span class="book-count">${count} words</span></div></div>`;
        }).join('');
        return `<div class="series-section"><div class="series-title"><i style="margin-right:8px">📖</i> ${series}</div><div class="series-scroll-container">${cardsHtml}</div></div>`;
    }).join('');
}

window.enterSoloMode = function(uid) {
    state.mode = 'home_detail'; 
    state.currentWordList = state.homeSearchResults; 
    const idx = state.currentWordList.findIndex(w => w.uid === uid);
    if(idx !== -1) state.currentWordIndex = idx;
    
    document.getElementById('home-gallery-view').classList.add('hidden');
    document.getElementById('home-detail-view').classList.remove('hidden');
    renderWordDetail(state.currentWordList[state.currentWordIndex]);
}

window.closeHomeDetail = function() {
    state.mode = 'home';
    document.getElementById('home-detail-view').classList.add('hidden');
    document.getElementById('home-gallery-view').classList.remove('hidden');
    
    const s = document.getElementById('home-sidebar');
    if(s) s.style.marginLeft = '0';

    applyHomeFilter(); 
}

window.enterBookMode = function(bookId) {
    state.mode = 'book'; 
    state.currentBookId = bookId;
    state.bookFilterRatings.clear(); 
    
    const book = DB.books.find(b => b.id === bookId);
    state.currentWordList = []; 
    book.chapters.forEach(c => { state.currentWordList.push(...getWordsByChapterId(c.id)); }); 
    state.currentWordIndex = 0;
    
    document.querySelectorAll('.page-view').forEach(v => v.classList.add('hidden'));
    document.getElementById('view-detail').classList.remove('hidden');
    
    renderSidebarFilter('book');
    
    const input = document.getElementById('chapter-search');
    if(input) {
        input.value = '';
        const newInput = input.cloneNode(true);
        input.parentNode.replaceChild(newInput, input);
        newInput.addEventListener('input', () => applyBookFilter());
    }

    applyBookFilter();
}

function applyBookFilter() {
    const book = DB.books.find(b => b.id === state.currentBookId);
    if(!book) return;

    const input = document.getElementById('chapter-search');
    const val = input ? input.value.toLowerCase() : '';
    const filters = state.bookFilterRatings;

    let allBookWords = [];
    book.chapters.forEach(c => allBookWords.push(...getWordsByChapterId(c.id)));

    const filteredWords = allBookWords.filter(w => {
        const wordRating = DB.ratings[w.uid] || 0;
        const matchText = !val || w.word.toLowerCase().includes(val);
        const matchStar = filters.size === 0 || filters.has(wordRating);
        return matchText && matchStar;
    });

    state.currentWordList = filteredWords;
    state.currentWordIndex = 0; 
    
    updateListCounts(filteredWords.length, 'book');

    const container = document.getElementById('chapter-list-container');
    container.innerHTML = book.chapters.map(ch => {
        const chapterWords = getWordsByChapterId(ch.id).filter(w => {
            const wordRating = DB.ratings[w.uid] || 0;
            const matchText = !val || w.word.toLowerCase().includes(val);
            const matchStar = filters.size === 0 || filters.has(wordRating);
            return matchText && matchStar;
        });

        if (chapterWords.length === 0 && (val || filters.size > 0)) return '';

        const wordItems = chapterWords.map(w => {
            const rating = DB.ratings[w.uid] || 0;
            let ratingHtml = rating > 0 ? `<span class="rating-num rating-${rating}">${rating}</span>` : `<span class="rating-num"></span>`;
            return `<li onclick="jumpToWord('${w.uid}')">${ratingHtml} ${w.word}</li>`;
        }).join('');

        return `<div class="chapter-group"><div class="chapter-header" onclick="this.nextElementSibling.classList.toggle('hidden')"><span>▼ ${ch.name}</span> <span>${chapterWords.length}</span></div><ul class="chapter-words abc-items">${wordItems}</ul></div>`;
    }).join('');

    state.chaptersExpanded = true;
    updateChapterToggleButton();

    if (state.currentWordList.length > 0) {
        renderWordDetail(state.currentWordList[0]);
    } else {
        document.getElementById('word-main').innerText = "暂无单词"; 
        document.getElementById('detail-tabs').innerHTML = ""; 
        document.getElementById('tab-content-area').innerHTML = "";
    }
}

function renderChapterSidebar(book) { applyBookFilter(); }
function setupChapterSearch() { }
function setupGlobalSearch() { }

function switchView(view) { document.querySelectorAll('.page-view').forEach(v => v.classList.add('hidden')); document.getElementById(`view-${view}`).classList.remove('hidden'); }

window.goHome = function() { 
    switchView('home'); 
    closeHomeDetail();
    state.homeExpanded = true;
    updateHomeToggleBtnUI();
    initHome(); 
}

window.toggleSidebar = function() { const s = document.getElementById('chapter-sidebar'); s.style.marginLeft = s.style.marginLeft === '-261px' ? '0' : '-261px'; }

window.toggleAllChapters = function() {
    state.chaptersExpanded = !state.chaptersExpanded;
    updateChapterToggleButton();
    document.querySelectorAll('.chapter-words').forEach(ul => {
        if(state.chaptersExpanded) ul.classList.remove('hidden');
        else ul.classList.add('hidden');
    });
}

function updateChapterToggleButton() {
    const btn = document.getElementById('btn-chapter-toggle');
    if(btn) { btn.innerText = state.chaptersExpanded ? '全部收起' : '全部展开'; }
}

function renderWordDetail(wordObj) {
    if(!wordObj) return;
    
    const suffix = state.mode === 'home_detail' ? '-home' : '';
    
    const titleEl = document.getElementById(`word-main${suffix}`);
    if(titleEl) titleEl.innerText = wordObj.word;
    
    renderRatingStars(wordObj, suffix);

    const tabsContainer = document.getElementById(`detail-tabs${suffix}`);
    const contentArea = document.getElementById(`tab-content-area${suffix}`);
    if(!tabsContainer || !contentArea) return;
    
    tabsContainer.innerHTML = '';
    contentArea.innerHTML = '';
    const tabs = wordObj.tabs || [];
    
    // 【核心修改】Tab 自动定位逻辑
    let activeTabIndex = 0;
    
    // 获取当前模式下的“显示单词”开关状态
    const toggleState = document.getElementById(`word-mask-toggle${suffix}`).checked;

    if (toggleState) {
        // 如果显示单词（ON），强制定位到第一个 Tab
        activeTabIndex = 0;
        if (tabs.length > 0) {
            state.lastActiveTabTitle = tabs[0].title;
        }
    } else {
        // 如果隐藏单词（OFF），尝试保持上一个 Tab 类型
        if (state.lastActiveTabTitle) {
            const foundIndex = tabs.findIndex(t => t.title === state.lastActiveTabTitle);
            if (foundIndex !== -1) activeTabIndex = foundIndex;
        }
    }

    tabs.forEach((tab, index) => {
        const btn = document.createElement('button'); btn.innerText = tab.title;
        if(index === activeTabIndex) {
            btn.className = 'active';
            state.lastActiveTabTitle = tab.title; // 确保状态同步
        }
        btn.onclick = () => { 
            tabsContainer.querySelectorAll('button').forEach(b => b.classList.remove('active')); 
            btn.classList.add('active'); 
            state.lastActiveTabTitle = tab.title; 
            renderTabContent(tab, suffix); 
        };
        tabsContainer.appendChild(btn);
    });
    renderTabContent(tabs[activeTabIndex], suffix);
    
    if (state.mode === 'book') {
        document.querySelectorAll('.chapter-words li').forEach(li => { 
            li.classList.toggle('active', li.getAttribute('onclick').includes(wordObj.uid)); 
        });
    }
}

function renderRatingStars(wordObj, suffix) {
    const container = document.getElementById(`rating-stars${suffix}`);
    if(!container) return;
    container.innerHTML = '';
    
    const currentRating = DB.ratings[wordObj.uid] || 0;
    
    for(let i=1; i<=5; i++) {
        const img = document.createElement('img');
        img.src = i <= currentRating ? 'backinfo/yestar.png' : 'backinfo/nostar.png';
        img.className = 'star-icon';
        img.onclick = () => setRating(wordObj.uid, i);
        container.appendChild(img);
    }
}

window.setRating = function(uid, rating) {
    const current = DB.ratings[uid] || 0;
    DB.ratings[uid] = (current === rating) ? 0 : rating;
    
    saveRatingsToStorage();
    
    const word = getWordByUid(uid);
    const suffix = state.mode === 'home_detail' ? '-home' : '';
    renderRatingStars(word, suffix);
    
    if(state.mode === 'home_detail') applyHomeFilter();
    if(state.mode === 'book') applyBookFilter();
}

function renderTabContent(tab, suffix) {
    const area = document.getElementById(`tab-content-area${suffix}`);
    if(!area) return;
    
    // 【核心修改】切换 Tab 时，滚动条复位到顶部
    area.scrollTop = 0;
    
    area.innerHTML = ''; 
    const data = tab.data;
    if(tab.type === 'image') { data.forEach(src => { area.innerHTML += `<img src="${src}" class="big-image" onclick="openModal('${src}')">`; }); } 
    else if(tab.type === 'text') {
        let navHtml = ''; let navItems = [];
        data.forEach((s, i) => navItems.push({ id: `s-${i}`, title: s.title }));
        if(navItems.length > 0) {
            navHtml += '<div class="rich-nav">';
            navItems.forEach(item => { navHtml += `<button onclick="document.getElementById('${item.id}').scrollIntoView({behavior:'smooth', block: 'start'})">${item.title}</button>`; });
            navHtml += '</div>';
        }
        area.innerHTML += navHtml;
        data.forEach((s, i) => {
            area.innerHTML += `<div id="s-${i}" class="rich-section"><h3>${s.title}</h3><div class="rich-content-body">${processTextImages(s.content)}</div>${(s.subs||[]).map((sub, j) => `<div class="sub-block"><div class="sub-title">${sub.subtitle}</div><div class="sub-content">${processTextImages(sub.content)}</div></div>`).join('')}</div>`;
        });
    } 
    else if(tab.type === 'quiz') {
        const q = data; 
        area.innerHTML = `
            <div class="quiz-box">
                <div class="quiz-q" onclick="speakQuiz(this)">
                    ${q.question.replace('_______', '<span class="quiz-blank"></span>')} 
                    <img src="backinfo/laba.png" class="audio-icon" style="margin-left:10px; width:28px; height:28px; vertical-align:middle;">
                </div>
                <div class="quiz-opts">${q.options.map((o,i)=>`<button class="opt-btn" onclick="checkAnswer(this,${i},${q.answerIndex},'${o}')"><span>${String.fromCharCode(65+i)}</span> ${o}</button>`).join('')}</div>
            </div>`;
    }
}

function processTextImages(htmlContent) { if (!htmlContent) return ""; return htmlContent.replace(/<img\s+src=["']([^"']+)["'][^>]*>/gi, (match, src) => `<img src="${src}" class="big-image" onclick="openModal('${src}')">`); }
window.openModal = function(src) { const modal = document.getElementById('image-modal'); const modalImg = document.getElementById('modal-img'); modal.style.display = "block"; modalImg.src = src; }
window.closeModal = function() { document.getElementById('image-modal').style.display = "none"; }

window.speakQuiz = function(el) {
    window.speechSynthesis.cancel();
    let clone = el.cloneNode(true);
    let icon = clone.querySelector('.audio-icon');
    if(icon) icon.remove();

    let html = clone.innerHTML;
    let parts = html.split(/<span[^>]*quiz-blank[^>]*>.*?<\/span>/i);
    const blank = el.querySelector('.quiz-blank');
    const isFilled = blank && blank.innerText.trim() !== "";

    if (isFilled || parts.length < 2) {
        let text = clone.innerText.trim();
        let u = new SpeechSynthesisUtterance(text);
        u.lang = 'en-US';
        if(preferredVoice) u.voice = preferredVoice;
        window.speechSynthesis.speak(u);
    } else {
        let part1Text = stripHtml(parts[0]).trim();
        let part2Text = stripHtml(parts[1]).trim();

        let u1 = new SpeechSynthesisUtterance(part1Text);
        u1.lang = 'en-US';
        if(preferredVoice) u1.voice = preferredVoice;
        
        let u2 = new SpeechSynthesisUtterance(part2Text);
        u2.lang = 'en-US';
        if(preferredVoice) u2.voice = preferredVoice;

        u1.onend = function() {
            setTimeout(() => {
                window.speechSynthesis.speak(u2);
            }, 1000); 
        };

        window.speechSynthesis.speak(u1);
    }
}

function stripHtml(html) {
   let tmp = document.createElement("DIV");
   tmp.innerHTML = html;
   return tmp.textContent || tmp.innerText || "";
}

window.checkAnswer = function(btn, idx, correct, text) { 
    if(idx === correct) { 
        audioRight.currentTime = 0; audioRight.play().catch(()=>{});
        btn.classList.add('correct'); 
        const blanks = document.querySelectorAll('.quiz-blank');
        blanks.forEach(b => {
            b.innerText = text;
            b.style.color = '#4caf50'; 
            b.style.borderBottomColor = '#4caf50'; 
        });
    } else { 
        audioWrong.currentTime = 0; audioWrong.play().catch(()=>{});
        btn.classList.add('wrong'); 
        setTimeout(()=>btn.classList.remove('wrong'), 500);
    } 
}

window.prevWord = function() { if(state.currentWordIndex > 0) renderWordDetail(state.currentWordList[--state.currentWordIndex]); }
window.nextWord = function() { if(state.currentWordIndex < state.currentWordList.length-1) renderWordDetail(state.currentWordList[++state.currentWordIndex]); }
window.jumpToWord = function(uid) { const idx = state.currentWordList.findIndex(w => w.uid === uid); if(idx !== -1) { state.currentWordIndex = idx; renderWordDetail(state.currentWordList[idx]); } }
window.toggleSidebar = function() { const s = document.getElementById('chapter-sidebar'); s.style.marginLeft = s.style.marginLeft === '-261px' ? '0' : '-261px'; }
window.toggleWordVisibility = function() { 
    const suffix = state.mode === 'home_detail' ? '-home' : '';
    document.getElementById(`word-main${suffix}`).style.opacity = document.getElementById(`word-mask-toggle${suffix}`).checked ? '1' : '0'; 
}
window.playCurrentWord = function() { 
    const suffix = state.mode === 'home_detail' ? '-home' : '';
    const w = document.getElementById(`word-main${suffix}`).innerText.trim(); 
    const u = new SpeechSynthesisUtterance(w); 
    u.lang = 'en-US'; 
    if(preferredVoice) u.voice = preferredVoice; 
    window.speechSynthesis.speak(u); 
}
function setupGlobalSearch() { 
    const input = document.getElementById('global-search'); 
    if(!input) return; 
    input.addEventListener('input', (e)=>{ applyHomeFilter(); }); 
}