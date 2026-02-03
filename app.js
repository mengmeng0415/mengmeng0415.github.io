let state = { 
    currentBookId: null, 
    currentWordList: [], 
    currentWordIndex: 0, 
    mode: 'home',
    chaptersExpanded: true,
    homeExpanded: false, // 首页默认状态：折叠
    lastActiveTabTitle: null 
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

function toggleClickSound(el) {
    isClickSoundEnabled = el.checked;
    document.querySelectorAll('.sound-switch').forEach(s => { s.checked = isClickSoundEnabled; });
}

function initHome() {
    renderABCList();
    const categories = (DB.settings && DB.settings.bookCategories) || [];
    if (categories.length > 0) renderBookTabs(categories[0]);
    setupGlobalSearch();
}

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

function renderABCList() {
    const list = document.getElementById('abc-list');
    const groups = {};
    const sortedWords = [...DB.words].sort((a, b) => a.word.localeCompare(b.word));
    sortedWords.forEach(w => {
        const char = w.word[0].toUpperCase();
        if(!groups[char]) groups[char] = [];
        groups[char].push(w);
    });
    list.innerHTML = '';
    Object.keys(groups).sort().forEach(char => {
        const li = document.createElement('li');
        // 默认 hidden，即折叠状态
        li.innerHTML = `<div class="abc-group-header" onclick="this.nextElementSibling.classList.toggle('hidden')">${char} <small>${groups[char].length}</small></div><ul class="abc-items hidden">${groups[char].map(w => `<li onclick="enterSoloMode('${w.uid}')">${w.word} <span style="font-size:10px;color:#ccc;margin-left:5px">(${getSeriesNameByChapter(w.chapterId)})</span></li>`).join('')}</ul>`;
        list.appendChild(li);
    });
    const totalSpan = document.getElementById('total-stats');
    if(totalSpan) totalSpan.innerText = `Total: ${DB.words.length}`;
}

// 【新增】首页列表 Toggle 逻辑
window.toggleHomeList = function() {
    state.homeExpanded = !state.homeExpanded;
    const btn = document.getElementById('btn-home-toggle');
    if(btn) btn.innerText = state.homeExpanded ? '全部收起' : '全部展开';
    
    document.querySelectorAll('#abc-list .abc-items').forEach(ul => {
        if(state.homeExpanded) ul.classList.remove('hidden');
        else ul.classList.add('hidden');
    });
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
    state.mode = 'solo'; const wordObj = getWordByUid(uid);
    state.currentWordList = [wordObj]; state.currentWordIndex = 0;
    switchView('detail'); document.getElementById('view-detail').classList.add('solo-mode'); renderWordDetail(wordObj);
}
window.enterBookMode = function(bookId) {
    state.mode = 'book'; state.currentBookId = bookId; const book = DB.books.find(b => b.id === bookId);
    state.currentWordList = []; book.chapters.forEach(c => { state.currentWordList.push(...getWordsByChapterId(c.id)); }); state.currentWordIndex = 0;
    switchView('detail'); document.getElementById('view-detail').classList.remove('solo-mode'); renderChapterSidebar(book);
    
    // 【新增】进入书籍时初始化详情页搜索
    setupChapterSearch();

    if(state.currentWordList.length > 0) { renderWordDetail(state.currentWordList[0]); } 
    else { document.getElementById('word-main').innerText = "暂无单词"; document.getElementById('detail-tabs').innerHTML = ""; document.getElementById('tab-content-area').innerHTML = "<p style='text-align:center;color:#999;margin-top:50px'>这本书还没有添加单词哦</p>"; }
}
function switchView(view) { document.querySelectorAll('.page-view').forEach(v => v.classList.add('hidden')); document.getElementById(`view-${view}`).classList.remove('hidden'); }
window.goHome = function() { switchView('home'); document.getElementById('word-mask-toggle').checked = true; initHome(); }

function renderChapterSidebar(book) {
    document.getElementById('current-book-title').innerText = `《${book.title}》`;
    const container = document.getElementById('chapter-list-container');
    container.innerHTML = book.chapters.map(ch => {
        const words = getWordsByChapterId(ch.id);
        return `<div class="chapter-group"><div class="chapter-header" onclick="this.nextElementSibling.classList.toggle('hidden')"><span>▼ ${ch.name}</span> <span>${words.length}</span></div><ul class="chapter-words abc-items">${words.map(w => `<li onclick="jumpToWord('${w.uid}')">${w.word}</li>`).join('')}</ul></div>`;
    }).join('');
    
    // 默认展开
    state.chaptersExpanded = true;
    updateChapterToggleButton();
    
    // 清空搜索框
    const searchInput = document.getElementById('chapter-search');
    if(searchInput) searchInput.value = '';
}

// 【新增】详情页搜索逻辑
function setupChapterSearch() {
    const input = document.getElementById('chapter-search');
    if(!input) return;
    
    // 移除旧的监听器防止叠加 (简单粗暴克隆替换)
    const newInput = input.cloneNode(true);
    input.parentNode.replaceChild(newInput, input);
    
    newInput.addEventListener('input', (e) => {
        const val = e.target.value.toLowerCase();
        const groups = document.querySelectorAll('#chapter-list-container .chapter-group');
        
        groups.forEach(group => {
            const list = group.querySelector('.chapter-words');
            const items = list.querySelectorAll('li');
            let hasMatch = false;
            
            items.forEach(li => {
                const text = li.innerText.toLowerCase();
                if(text.includes(val)) {
                    li.style.display = 'block';
                    hasMatch = true;
                } else {
                    li.style.display = 'none';
                }
            });
            
            if(val) {
                // 搜索模式
                if(hasMatch) {
                    group.style.display = 'block';
                    list.classList.remove('hidden'); // 自动展开有匹配的章节
                } else {
                    group.style.display = 'none';
                }
            } else {
                // 清空搜索时，恢复全部显示
                group.style.display = 'block';
                items.forEach(li => li.style.display = 'block');
                // 恢复默认展开状态 (这里保持展开比较方便)
                list.classList.remove('hidden');
            }
        });
    });
}

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
    if(btn) {
        btn.innerText = state.chaptersExpanded ? '全部收起' : '全部展开';
    }
}

function renderWordDetail(wordObj) {
    if(!wordObj) return;
    document.getElementById('word-main').innerText = wordObj.word;
    toggleWordVisibility();
    const tabsContainer = document.getElementById('detail-tabs');
    tabsContainer.innerHTML = '';
    const contentArea = document.getElementById('tab-content-area');
    contentArea.innerHTML = '';
    const tabs = wordObj.tabs || [];
    if (tabs.length === 0) { contentArea.innerHTML = "<p style='color:#999;text-align:center;margin-top:50px'>该单词暂无精讲内容</p>"; return; }
    
    let activeTabIndex = 0;
    if (state.lastActiveTabTitle) {
        const foundIndex = tabs.findIndex(t => t.title === state.lastActiveTabTitle);
        if (foundIndex !== -1) activeTabIndex = foundIndex;
    }

    tabs.forEach((tab, index) => {
        const btn = document.createElement('button'); btn.innerText = tab.title;
        if(index === activeTabIndex) {
            btn.className = 'active';
            state.lastActiveTabTitle = tab.title;
        }
        btn.onclick = () => { 
            document.querySelectorAll('.detail-tabs button').forEach(b => b.classList.remove('active')); 
            btn.classList.add('active'); 
            state.lastActiveTabTitle = tab.title; 
            renderTabContent(tab); 
        };
        tabsContainer.appendChild(btn);
    });
    renderTabContent(tabs[activeTabIndex]);
    document.querySelectorAll('.chapter-words li').forEach(li => { li.classList.toggle('active', li.getAttribute('onclick').includes(wordObj.uid)); });
}

function renderTabContent(tab) {
    const area = document.getElementById('tab-content-area'); area.innerHTML = ''; const data = tab.data;
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
window.toggleWordVisibility = function() { document.getElementById('word-main').style.opacity = document.getElementById('word-mask-toggle').checked ? '1' : '0'; }
window.playCurrentWord = function() { const w = document.getElementById('word-main').innerText.trim(); const u = new SpeechSynthesisUtterance(w); u.lang = 'en-US'; if(preferredVoice) u.voice = preferredVoice; window.speechSynthesis.speak(u); }
function setupGlobalSearch() { const input = document.getElementById('global-search'); if(!input) return; input.addEventListener('input', (e)=>{ const val = e.target.value.toLowerCase(); const list = document.getElementById('search-suggestions'); if(!val) { list.style.display='none'; return; } const matches = DB.words.filter(w => w.word.toLowerCase().includes(val)); list.style.display = matches.length ? 'block' : 'none'; list.innerHTML = matches.slice(0,5).map(w => `<li onclick="enterSoloMode('${w.uid}')">${w.word} <small style='color:#ccc'>(${getSeriesNameByChapter(w.chapterId)})</small></li>`).join(''); }); }