const DB = {
    settings: {
        bookCategories: ["初章书", "RAZ分级", "桥梁书",  "中高章", "原版教材"],
        seriesOrder: ["Dragon Masters", "Pincess in black", "Rocket Girl", "Level AA"]
    },

    // 【核心修改】这里是专门维护星级的地方
    // 格式： "单词ID": 星级数字
    // 导出数据时，只需替换这一块内容即可
    ratings: {
        "w001": 5,
        "w003": 3,
        "w002": 1
    },

    books: [
        { id: "dm-1", type: "初章书", series: "Dragon Masters", title: "Rise of the Earth Dragon", cover: "bcover/dm1.png", chapters: [{ id: "dm1-c1", name: "Chapter 1" }, { id: "dm1-c2", name: "Chapter 2" }] },
        { id: "dm-2", type: "初章书", series: "Dragon Masters", title: "Dragon Masters book2", cover: "bcover/dm2.png", chapters: [{ id: "dm2-c1", name: "Chapter 1" }, { id: "dm2-c2", name: "Chapter 2" }] },
        { id: "dm-3", type: "初章书", series: "Dragon Masters", title: "Dragon Masters book3", cover: "bcover/dm3.png", chapters: [{ id: "dm3-c1", name: "Chapter 1" }, { id: "dm3-c2", name: "Chapter 2" }] },
        { id: "dm-4", type: "初章书", series: "Dragon Masters", title: "Dragon Masters book4", cover: "bcover/dm4.png", chapters: [{ id: "dm4-c1", name: "Chapter 1" }, { id: "dm4-c2", name: "Chapter 2" }] },
        { id: "dm-5", type: "初章书", series: "Dragon Masters", title: "Dragon Masters book5", cover: "bcover/dm5.png", chapters: [{ id: "dm5-c1", name: "Chapter 1" }, { id: "dm5-c2", name: "Chapter 2" }] },
        { id: "dm-6", type: "初章书", series: "Dragon Masters", title: "Dragon Masters book6", cover: "bcover/dm6.png", chapters: [{ id: "dm6-c1", name: "Chapter 1" }, { id: "dm6-c2", name: "Chapter 2" }] },
        { id: "dm-7", type: "初章书", series: "Dragon Masters", title: "Dragon Masters book7", cover: "bcover/dm7.png", chapters: [{ id: "dm7-c1", name: "Chapter 1" }, { id: "dm7-c2", name: "Chapter 2" }] },
        { id: "dm-8", type: "初章书", series: "Dragon Masters", title: "Dragon Masters book8", cover: "bcover/dm8.png", chapters: [{ id: "dm8-c1", name: "Chapter 1" }, { id: "dm8-c2", name: "Chapter 2" }] },
        { id: "dm-9", type: "初章书", series: "Dragon Masters", title: "Dragon Masters book3", cover: "bcover/dm3.png", chapters: [{ id: "dm9-c1", name: "Chapter 1" }, { id: "dm9-c2", name: "Chapter 2" }] },
        { id: "dm-10", type: "初章书", series: "Dragon Masters", title: "Dragon Masters book10", cover: "bcover/dm3.png", chapters: [{ id: "dm10-c1", name: "Chapter 1" }, { id: "dm10-c2", name: "Chapter 2" }] },
        { id: "pb-1", type: "初章书", series: "Pincess in black", title: "Pincess in black book1", cover: "bcover/pb1.png", chapters: [{ id: "pb1-c1", name: "Chapter 1" }, { id: "pb2-c2", name: "Chapter 2" }] },
        { id: "pb-2", type: "初章书", series: "Pincess in black", title: "Pincess in black book2", cover: "bcover/pb2.png", chapters: [{ id: "pb2-c1", name: "Chapter 1" }, { id: "pb2-c2", name: "Chapter 2" }] },
        { id: "pb-3", type: "初章书", series: "Pincess in black", title: "Pincess in black book3", cover: "bcover/pb3.png", chapters: [{ id: "pb3-c1", name: "Chapter 1" }, { id: "pb3-c2", name: "Chapter 2" }] },
        { id: "rg-1", type: "初章书", series: "Rocket Girl", title: "Rocket Girl book1", cover: "bcover/rg1.png", chapters: [{ id: "rg1-c1", name: "Chapter 1" }, { id: "rg1-c2", name: "Chapter 2" }] },
        { id: "rg-2", type: "初章书", series: "Rocket Girl", title: "Rocket Girl book2", cover: "bcover/rg2.png", chapters: [{ id: "rg2-c1", name: "Chapter 1" }, { id: "rg2-c2", name: "Chapter 2" }] },
        { id: "raz-aa", type: "RAZ分级", series: "Level AA", title: "My Family", cover: "", chapters: [] }
    ],

    words: [
        {
            uid: "w001", word: "Abundant", chapterId: "dm1-c1", order: 10, phonetic: "/əˈbʌndənt/", pos: "ADJ.",
            tabs: [
                { type: "image", title: "视觉联想", data: ["https://img.freepik.com/free-photo/abundant-harvest-concept-illustration_114360-1438.jpg?w=826"] },
                { type: "text", title: "老师笔记", data: [{ title: "核心含义", content: "<b>大量的，充足的。</b><br>形容某样东西非常多，用之不尽。", subs: [{ subtitle: "💡 助记", content: "a + bun (大量馒头) + dant" }] }] },
                { type: "quiz", title: "挑战一下", data: { question: "The farmer had an _______ harvest.", options: ["tiny", "abundant", "tired", "broken"], answerIndex: 1, explanation: "因为是大丰收，所以是 Abundant。" } }
            ]
        },
        {
            uid: "w003", word: "horror", chapterId: "dm1-c1", order: 11, phonetic: "/ˈhɔːrər/", pos: "N.",
            tabs: [
                { 
                    type: "image", 
                    title: "图片联想", 
                    data: [
                        "wordpic/act.PNG",
                        "wordpic/bring.PNG" 
                    ] 
                },
                {
                    type: "text",
                    title: "📝 老师笔记",
                    data: [
                        {
                           title: "核心含义",
                           content: "<b>n. 恐惧；惊骇；可怕的事物。</b><br>指强烈的害怕或厌恶感，也可指代令人感到恐惧的人或事物。",
                           subs: [
                             { subtitle: "📖 含义", content: "名词（n.）文中意思 + 常用意思：恐惧；惊骇；可怕的事物" },
                             { subtitle: "📜 书本原句", content: "\"Drake watched in horror as the arrow flew toward Ana.\"" },
                             { subtitle: "🔧 常见用法", content: "（n.）in horror（惊恐地）：She screamed in horror at the loud noise..." },
                             { subtitle: "✍️ 例句", content: "（n.）He stared in horror..." },
                             { subtitle: "⚠️ 避免用错", content: "horror 是不可数名词..." }
                           ]
                        },
                         {
                           title: "补充说明",
                           content: "这里是第二个主标题，测试导航是否正常生成。",
                           subs: []
                        }
                    ]
                },
                { type: "quiz", title: "挑战一下", data: { question: "The farmer had an _______ harvest.", options: ["tiny", "abundant", "tired", "broken"], answerIndex: 1, explanation: "因为是大丰收，所以是 Abundant。" } }
            ]
        },
        {
            uid: "w002", word: "Collaborate", chapterId: "dm1-c1", order: 20, phonetic: "/kəˈlæbəreɪt/", pos: "V.",
            tabs: [{ type: "text", title: "词义解析", data: [{ title: "含义", content: "合作，协作。", subs: [] }] }]
        }
    ]
};