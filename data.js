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
        { id: "dm-1", 
            type: "初章书", 
            series: "Dragon Masters", 
            title: "Saving The Sun Dragon", 
            cover: "bcover/dm2.png", 
            chapters: [
                { id: "dm1-c1", name: "Chapter 1" }, 
                { id: "dm1-c2", name: "Chapter 2" }, 
                { id: "dm1-c3", name: "Chapter 3" }, 
                { id: "dm1-c4", name: "Chapter 4" }, 
                { id: "dm1-c5", name: "Chapter 5" }, 
                { id: "dm1-c6", name: "Chapter 6" }, 
                { id: "dm1-c7", name: "Chapter 7" }, 
                { id: "dm1-c8", name: "Chapter 8" }, 
                { id: "dm1-c9", name: "Chapter 9" }, 
                { id: "dm1-c10", name: "Chapter 10" }, 
                { id: "dm1-c11", name: "Chapter 11" }, 
                { id: "dm1-c12", name: "Chapter 12" }, 
                { id: "dm1-c13", name: "Chapter 13" }, 
                { id: "dm1-c14", name: "Chapter 14" }
                
            ] },
            //dm1这里其实是第二本书
       // { id: "dm-2", type: "初章书", series: "Dragon Masters", title: "Dragon Masters book2", cover: "bcover/dm2.png", chapters: [{ id: "dm2-c1", name: "Chapter 1" }, { id: "dm2-c2", name: "Chapter 2" }] },
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
    uid: "w001",
    word: "shade",
    chapterId: "dm1-c1",
    order: 1,
    phonetic: "/ʃeɪd/",
    pos: "n./vt./vi.",
    tabs: [
      { type: "image", title: "图片", data: ["wordpic/shade.png"] },
      {
        type: "text",
        title: "单词详解",
        data: [
          {
            title: "核心含义",
            content: "<b>n. 树荫；阴凉处；vt./vi. 遮蔽（阳光）；为……挡光</b><br>名词指太阳照不到的凉爽地方，动词指阻挡阳光避免照射。"
          },
          {
            title: "含义",
            content: "名词（n.）文中意思+常用意思：树荫；阴凉处；<br>英文释义：A cool place where the sun doesn’t shine (like under a tree);<br><br>动词（vt./vi.）文中意思+常用意思：遮蔽（阳光）；为……挡光<br>英文释义：To block the sun so it doesn’t hit you or something."
          },
          {
            title: "书本原句",
            content: "Drake shaded his eyes from the sun. He was standing in the Valley of Clouds behind King Roland's castle.（德雷克用手遮着眼睛，避开阳光。他站在罗兰德国王城堡后面的云谷里。）"
          },
          {
            title: "常见用法",
            content: "名词用法：in the shade（在阴凉处）、under the shade of a tree（在树荫下）、cool shade（凉爽的阴凉处）<br><br>动词用法：shade your eyes from the sun（遮阳）、shade a plant（给植物遮阴）、shade the window（给窗户遮光）"
          },
          {
            title: "例句",
            content: "生活例句：We had a picnic in the shade— it was too hot in the sun.（我们在阴凉处野餐，太阳下太热了。）<br><br>动词例句：She used a hat to shade her face from the strong sun.（她用帽子遮住脸，避开强烈的阳光。）"
          }
        ]
      },
      {
        type: "quiz",
        title: "挑战一下",
        data: {
          question: "The dragon hid in the ______ under the big tree to avoid the sun.",
          options: ["practice", "arc", "shade", "sway"],
          answerIndex: 2
        }
      }
    ]
  },
  {
    uid: "w002",
    word: "practice",
    chapterId: "dm1-c1",
    order: 2,
    phonetic: "/ˈpræktɪs/",
    pos: "v./n.",
    tabs: [
      { type: "image", title: "图片", data: ["wordpic/practice.png"] },
      {
        type: "text",
        title: "单词详解",
        data: [
          {
            title: "核心含义",
            content: "<b>v. 练习；操练；n. 练习；训练</b><br>动词指反复做某事提升技能，名词指为提升技能进行的反复活动。"
          },
          {
            title: "含义",
            content: "动词（vt./vi.）文中意思+常用意思：练习；操练（反复做某事以提升技能）<br>英文释义：To do something many times to get better at it.<br>情景解释：If you want to play the piano well, you need to practice every day. That’s “practice”（动词）!<br><br>名词（n.）常用意思：练习；训练（为提升技能而反复进行的活动）；"
          },
          {
            title: "书本原句",
            content: "Griffith, the wizard who taught the young Dragon Masters, watched as the dragons practiced flying.（格里菲斯，这位教导年轻驯龙大师的巫师，看着龙们练习飞行。）"
          },
          {
            title: "常见用法",
            content: "动词用法：practice flying（练习飞行）、practice playing the piano（练习弹钢琴）、practice speaking English（练习说英语）、practice hard（刻苦练习）、practice regularly（定期练习）<br><br>名词用法：flying practice（飞行训练）、daily practice（日常练习）、sports practice（体育训练）、a lot of practice（大量练习）、put into practice（付诸实践）"
          },
          {
            title: "例句",
            content: "生活例句：I need to practice drawing before the art class tomorrow.（明天美术课之前我需要练习画画。）<br><br>动词例句：She practices singing songs every morning.（她每天早上练习唱歌。）<br><br>名词例句：It takes a lot of practice to ride a bike well.（学好骑自行车需要大量练习。）<br><br>⚠️ 避免用错：不要说practice to do sth，正确的是practice doing sth，必须接动名词。比如龙们练习飞行是practiced flying，不是practiced to fly。"
          }
        ]
      },
      {
        type: "quiz",
        title: "挑战一下",
        data: {
          question: "The Dragon Masters do ______ every morning to train with dragons.",
          options: ["shade", "arc", "sway", "practice"],
          answerIndex: 3
        }
      }
    ]
  },
  {
    uid: "w003",
    word: "arc",
    chapterId: "dm1-c1",
    order: 3,
    phonetic: "/ɑːk/",
    pos: "v./n.",
    tabs: [
      { type: "image", title: "图片", data: ["wordpic/arc.png"] },
      {
        type: "text",
        title: "单词详解",
        data: [
          {
            title: "核心含义",
            content: "<b>vi. 呈弧形移动；划出弧线；n. 弧线；弧形</b><br>动词指物体移动形成圆弧形轨迹，名词指圆的一部分、弯曲的线条/形状。"
          },
          {
            title: "含义",
            content: "动词（vi.）文中意思+常用意思：呈弧形移动；划出弧线（物体移动时形成圆弧形轨迹）<br>英文释义：To move in a curved path through the air.<br>情景解释：When you throw a frisbee or a ball, it moves in a curved way. That’s “arc”（动词）!<br><br>名词（n.）常用意思：弧线；弧形（圆的一部分，弯曲的线条或形状）<br>英文释义：A curved line or shape that is part of a circle."
          },
          {
            title: "书本原句",
            content: "Then a rainbow streamed from her mouth. It arced across the sky.（然后一道彩虹从她嘴里涌出，在天空中划出一道弧线。）"
          },
          {
            title: "常见用法",
            content: "动词用法：常用介词across/through/upward:<br>1.arc across（划过……）：arc across the sky、arc across the valley；<br>2.arc through the air（在空中呈弧形移动）：arc through the air、arc through the clouds；<br>3.arc upward（向上划出弧线）：arc upward into the sky<br><br>名词用法：a rainbow arc（彩虹弧线）、arc of a circle（圆弧）、arc of a bow（弓的弧形）"
          },
          {
            title: "例句",
            content: "书本延伸：The rainbow arced across the Valley of Clouds, shining brightly.（彩虹在云谷上空划出弧线，闪闪发光。）<br><br>生活例句：He threw the ball, and it arced high into the air before landing.（他把球扔出去，球在空中划出一道高弧线后落地。）<br><br>名词例句：We drew a perfect arc on the paper .（我们在纸上画了一道完美的圆弧。）"
          }
        ]
      },
      {
        type: "quiz",
        title: "挑战一下",
        data: {
          question: "A rainbow made a beautiful ______ across the blue sky.",
          options: ["shade", "practice", "arc", "gaze"],
          answerIndex: 2
        }
      }
    ]
  },
  {
    uid: "w004",
    word: "sway",
    chapterId: "dm1-c1",
    order: 4,
    phonetic: "/sweɪ/",
    pos: "v./n.",
    tabs: [
      { type: "image", title: "图片", data: ["wordpic/sway.png"] },
      {
        type: "text",
        title: "单词详解",
        data: [
          {
            title: "核心含义",
            content: "<b>vi. （头发、物体等）飘动；摇摆；n. 飘动；摇摆</b><br>指物体因风或动作缓慢左右晃动，可作动词/名词。"
          },
          {
            title: "含义",
            content: "动词（vi.）文中意思+常用意思：（头发、物体等）飘动；摇摆（缓慢左右晃动）；<br>英文释义：To move slowly from side to side, especially because of wind.<br><br>名词（n.）文中意思+常用意思：（头发、物体的）飘动；摇摆；"
          },
          {
            title: "书本原句",
            content: "Her long, black hair swayed behind her.（她乌黑的长发在身后飘动。）"
          },
          {
            title: "常见用法",
            content: "动词用法：常用介词in/from<br>1.sway gently（轻轻飘动）：sway gently in the wind、sway gently as she dances；<br>2.sway in the wind（在风中摇摆）：tree leaves sway in the wind、curtains sway in the wind；<br>3.sway from side to side（左右晃动）<br><br>名词用法：the sway of hair（头发的飘动）、the sway of trees（树木的摇摆）、the gentle sway of the boat（小船的轻轻晃动）"
          },
          {
            title: "例句",
            content: "生活例句：The curtains sway in the wind when the window is open.（窗户打开时，窗帘在风中摇摆。）<br><br>动词例句：The little girl’s pigtails swayed as she ran to her mom.（小女孩跑向妈妈时，辫子左右晃动。）"
          }
        ]
      },
      {
        type: "quiz",
        title: "挑战一下",
        data: {
          question: "Ana’s long hair would ______ behind her when she ran.",
          options: ["shade", "sway", "sense", "gaze"],
          answerIndex: 1
        }
      }
    ]
  },
  {
    uid: "w005",
    word: "gaze",
    chapterId: "dm1-c1",
    order: 5,
    phonetic: "/ɡeɪz/",
    pos: "n./vi.",
    tabs: [
      { type: "image", title: "图片", data: ["wordpic/gaze.png"] },
      {
        type: "text",
        title: "单词详解",
        data: [
          {
            title: "核心含义",
            content: "<b>n. 凝视；注视；vi. 凝视；注视</b><br>指长时间、专注地看某人/某物，可作名词/动词。"
          },
          {
            title: "含义",
            content: "名词（n.）文中意思+常用意思：凝视；注视（长时间专注地看）<br>英文释义：A long, careful look at someone or something.<br><br>动词（vi.）常用意思：凝视；注视（专注地长时间看）<br>英文释义：To look at someone or something for a long time."
          },
          {
            title: "书本原句",
            content: "Drake followed his gaze. Worm was looking at Kepri high up in the air.（德雷克顺着他的目光看去，沃姆正望着高空的凯普丽。）"
          },
          {
            title: "常见用法",
            content: "名词用法：follow one’s gaze（顺着某人的目光）、a long gaze（长时间的凝视）、a soft gaze（温柔的注视）<br><br>动词用法：常用介词at/into/up at<br>1.gaze at（凝视……）：gaze at Kepri、gaze at the painting、gaze at the fireflies；<br>2.gaze up at（抬头凝视……）：gaze up at the rainbow、gaze up at the stars、gaze up at the flying dragons；<br>3.gaze into（凝视……里面）：gaze into the cave、gaze into the clear water"
          },
          {
            title: "例句",
            content: "动词例句：We gazed up at the stars on the clear night.（晴朗的夜晚，我们抬头凝视着星星。）"
          }
        ]
      },
      {
        type: "quiz",
        title: "挑战一下",
        data: {
          question: "Drake turned his ______ to the sky and saw Kepri flying.",
          options: ["sense", "gaze", "sway", "arc"],
          answerIndex: 1
        }
      }
    ]
  },
  {
    uid: "w006",
    word: "sense",
    chapterId: "dm1-c1",
    order: 6,
    phonetic: "/sens/",
    pos: "v./n.",
    tabs: [
      { type: "image", title: "图片", data: ["wordpic/sense.png"] },
      {
        type: "text",
        title: "单词详解",
        data: [
          {
            title: "核心含义",
            content: "<b>vt. 察觉到；感觉到；n. 感觉；感官；道理</b><br>动词指通过直觉/感官感知，名词可指五官感知或逻辑合理性。"
          },
          {
            title: "含义",
            content: "动词（vt.）文中意思+常用意思：察觉到；感觉到（通过直觉或感官知道）<br>英文释义：To know or feel something without being told, using your heart or senses.<br><br>名词（n.）常用意思：感觉；感官（眼睛、耳朵等感知事物的能力）；道理；合理性（大班小朋友暂不重点掌握）<br>英文释义：A feeling or the ability to see, hear, smell, taste, or touch. The ability to think clearly and make good decisions."
          },
          {
            title: "书本原句",
            content: "Worm must have sensed that she was in trouble.（沃姆一定是察觉到她遇到了危险。）"
          },
          {
            title: "常见用法",
            content: "动词用法：sense danger（察觉到危险）、sense sadness（感觉到悲伤）、sense that...（察觉到……）、sense someone’s worry（察觉到某人的担忧）、sense the magic（感觉到魔法）<br><br>名词用法：five senses（五种感官）、a sense of joy（喜悦感）、a sense of direction（方向感）、a sense of humor（幽默感）"
          },
          {
            title: "例句",
            content: "生活例句：I could sense that my mom was happy about my good grade.（我能感觉到妈妈为我的好成绩感到开心。）<br><br>名词例句：Dogs have a strong sense of smell.（狗有敏锐的嗅觉。）"
          }
        ]
      },
      {
        type: "quiz",
        title: "挑战一下",
        data: {
          question: "The dog could ______ the food from far away with its nose.",
          options: ["gaze", "sense", "sway", "arc"],
          answerIndex: 1
        }
      }
    ]
  },
    // ================================= Chapter 2 (dm1-c2) =================================
  {
    uid: "w007",
    word: "blur",
    chapterId: "dm1-c2",
    order: 1,
    phonetic: "/blɜː(r)/",
    pos: "n./vt./vi.",
    tabs: [
      { type: "image", title: "图片", data: ["wordpic/blur.png"] },
      {
        type: "text",
        title: "单词详解",
        data: [
          {
            title: "核心含义",
            content: "<b>n. 模糊的身影；光晕；vt./vi. 使模糊；变得模糊</b><br>名词指看不清的模糊影像，动词指使视线/物体变得不清晰。"
          },
          {
            title: "含义",
            content: "名词（n.）文中意思+常用意思：模糊的身影；光晕（移动过快或距离过远而看不清的东西）<br>英文释义：Something you can’t see clearly because it’s moving fast or far away.<br><br>动词（vt./vi.）常用意思：使模糊；变得模糊（视线或物体变得不清晰）<br>英文释义：To become or make something hard to see clearly."
          },
          {
            title: "书本原句",
            content: "But before Griffith could use his magic, a red blur shot across the sky.（但格里菲斯还没来得及使用魔法，一道红色的模糊身影就划过了天空。）"
          },
          {
            title: "常见用法",
            content: "名词用法：a red blur（一道红色的模糊身影）、a blur of motion（移动的模糊影像）、a blur of light（一道模糊的光晕）、a blur of color（一片模糊的色彩）、look like a blur（看起来像模糊的影子）<br><br>动词用法：blur one’s eyes（使眼睛模糊）：Tears blurred her eyes、smoke blurred his eyes；blur the view（模糊视线）：Rain blurred the window and blurred the view outside、fog blurred the view of the mountains；blur into the distance（在远处变得模糊）：The flying dragon blurred into the distance、the car blurred into the distance"
          },
          {
            title: "例句",
            content: "动词例句：Tears blurred her eyes when she was sad.（她难过时，泪水模糊了双眼。）<br><br>名词例句：The train went by so fast that it was a blur.（火车开得太快，一下子就变成了模糊的影子。）<br><br>⚠️ 避免用错：不要混淆blur（名词/动词）和blurry（形容词）。blur是名词“模糊的东西”或动词“使模糊”；blurry是形容词“模糊的”，比如“模糊的照片”是a blurry photo，不是a blur photo。"
          }
        ]
      },
      {
        type: "quiz",
        title: "挑战一下",
        data: {
          question: "A red ______ flashed across the sky before hitting the ground.",
          options: ["lunge", "gently", "cloudy", "blur"],
          answerIndex: 3
        }
      }
    ]
  },
  {
    uid: "w008",
    word: "lunge",
    chapterId: "dm1-c2",
    order: 2,
    phonetic: "/lʌndʒ/",
    pos: "vi.",
    tabs: [
      { type: "image", title: "图片", data: ["wordpic/lunge.png"] },
      {
        type: "text",
        title: "单词详解",
        data: [
          {
            title: "核心含义",
            content: "<b>vi. 猛冲；扑向</b><br>指突然、快速地冲向某人或某物，动作具有突发性。"
          },
          {
            title: "含义",
            content: "文中意思+常用意思：猛冲；扑向（突然快速地冲向某人或某物）<br>英文释义：To rush forward quickly to grab or reach something."
          },
          {
            title: "书本原句",
            content: "He lunged for Kepri and grabbed her with his front claws.（他猛冲向凯普丽，用前爪抓住了她。）"
          },
          {
            title: "常见用法",
            content: "常用介词for/at<br>lunge for（猛冲向……）：lunge for Kepri、lunge for the falling book、lunge for the rope；<br>lunge at（扑向……）：lunge at the robber、lunge at the prey、lunge at the ball；<br>lunge forward（向前猛冲）：lunge forward to save her、lunge forward to catch it；<br>lunge to grab（猛冲去抓住）：lunge to grab the magic stone、lunge to grab the toy"
          },
          {
            title: "例句",
            content: "生活例句：The dog lunged at the ball when his owner threw it.（主人把球扔出去时，小狗猛地扑了过去。）<br><br>动词例句：She lunged for the falling book and caught it just in time.（她猛冲过去，及时接住了掉落的书。）<br><br>简单例句：The lion lunged at its prey with a loud roar.（狮子大吼一声，猛扑向猎物。）"
          }
        ]
      },
      {
        type: "quiz",
        title: "挑战一下",
        data: {
          question: "Vulcan ______ forward to catch Kepri when she fell from the sky.",
          options: ["blur", "gently", "cloudy", "lunge"],
          answerIndex: 3
        }
      }
    ]
  },
  {
    uid: "w009",
    word: "gently",
    chapterId: "dm1-c2",
    order: 3,
    phonetic: "/ˈdʒentli/",
    pos: "adv.",
    tabs: [
      { type: "image", title: "图片", data: ["wordpic/gently.png"] },
      {
        type: "text",
        title: "单词详解",
        data: [
          {
            title: "核心含义",
            content: "<b>adv. 轻轻地；温柔地</b><br>形容动作轻柔、不粗鲁、不用力，修饰动词。"
          },
          {
            title: "含义",
            content: "文中意思+常用意思：轻轻地；温柔地（动作轻柔，不粗鲁、不用力）<br>英文释义：In a soft, careful way, not using much force."
          },
          {
            title: "书本原句",
            content: "Then he gently placed Kepri in the grass.（然后他轻轻地把凯普丽放在了草地上。）"
          },
          {
            title: "常见用法",
            content: "gently place（轻轻地放）<br>gently touch（温柔地触摸）：gently touch the dragon’s head、gently touch the flower petal<br>gently speak（轻声说话）：gently speak to the scared child、gently speak to the baby<br>gently blow（轻轻吹）：gently blow the candle"
          },
          {
            title: "例句",
            content: "生活例句：Mom gently brushed the hair out of my eyes.（妈妈温柔地拨开我眼前的头发。）<br><br>简单例句：The wind gently blew the leaves on the tree.（风轻轻地吹动着树上的叶子。）"
          }
        ]
      },
      {
        type: "quiz",
        title: "挑战一下",
        data: {
          question: "The wizard placed the sick dragon ______ on the soft grass.",
          options: ["blur", "lunge", "gently", "cloudy"],
          answerIndex: 2
        }
      }
    ]
  },
  {
    uid: "w010",
    word: "cloudy",
    chapterId: "dm1-c2",
    order: 4,
    phonetic: "/ˈklaʊdi/",
    pos: "adj.",
    tabs: [
      { type: "image", title: "图片", data: ["wordpic/cloudy.png"] },
      {
        type: "text",
        title: "单词详解",
        data: [
          {
            title: "核心含义",
            content: "<b>adj. （眼睛）浑浊的；多云的</b><br>文中特指眼睛失去清澈，也可形容天气多云。"
          },
          {
            title: "含义",
            content: "文中意思+常用意思：（眼睛）浑浊的<br>英文释义：(of eyes) not clear、not bright"
          },
          {
            title: "书本原句",
            content: "And sometimes her eyes look cloudy.（而且有时候她的眼睛看起来很浑浊。）"
          },
          {
            title: "常见用法",
            content: "cloudy eyes（浑浊的眼睛）、cloudy water（浑浊的水）、cloudy sky（多云的天空）、cloudy day（阴天）"
          },
          {
            title: "例句",
            content: "形容词例句：The water in the lake is cloudy after the rain.（雨后湖里的水变浑浊了。）<br><br>拓展例句：It will be cloudy tomorrow, no sunshine.（明天是阴天，没有阳光。）"
          }
        ]
      },
      {
        type: "quiz",
        title: "挑战一下",
        data: {
          question: "Kepri’s eyes became ______ when she felt sick from dark magic.",
          options: ["gently", "blur", "cloudy", "lunge"],
          answerIndex: 2
        }
      }
    ]
  },
  {
    uid: "w011",
    word: "take place",
    chapterId: "dm1-c2",
    order: 5,
    phonetic: "/teɪk pleɪs/",
    pos: "短语",
    tabs: [
      { type: "image", title: "图片", data: ["wordpic/take place.png"] },
      {
        type: "text",
        title: "单词详解",
        data: [
          {
            title: "核心含义",
            content: "<b>短语 发生；举行</b><br>指某事按计划或自然发生，无被动语态。"
          },
          {
            title: "含义",
            content: "文中意思+常用意思：发生；举行（某事按计划或自然发生）<br>英文释义：To happen or be held (something happens as planned or naturally)."
          },
          {
            title: "书本原句",
            content: "Since King Roland wanted to keep the dragons a secret, most dragon training had to take place underground.（因为罗兰德国王想保守龙的秘密，大部分驯龙训练都必须在地下进行。）"
          },
          {
            title: "常见用法",
            content: "take place + 地点：take place underground、take place in the park、take place at school；<br>take place + 时间：take place tomorrow、take place last week、take place in the morning；<br>常见搭配：important events take place、a meeting takes place、a party takes place"
          },
          {
            title: "例句",
            content: "生活例句：Our school sports meeting will take place next Friday.（我们学校的运动会将在下周五举行。）<br><br>短语例句：A big party took place in the castle（城堡里举行了一场盛大的派对。）<br><br>⚠️ 避免用错：take place不能用于被动语态，不要说“was taken place”，正确：took place（过去式）、will take place（将来时）。"
          }
        ]
      },
      {
        type: "quiz",
        title: "挑战一下",
        data: {
          question: "Dragon training often ______ underground to keep it a secret.",
          options: ["cave-in", "tale", "bring", "take place"],
          answerIndex: 3
        }
      }
    ]
  },
  {
    uid: "w012",
    word: "cave-in",
    chapterId: "dm1-c2",
    order: 6,
    phonetic: "/ˈkeɪv ɪn/",
    pos: "n.",
    tabs: [
      { type: "image", title: "图片", data: ["wordpic/cave-in.png"] },
      {
        type: "text",
        title: "单词详解",
        data: [
          {
            title: "核心含义",
            content: "<b>n. （隧道、矿井等的）坍塌；塌陷</b><br>指洞穴、隧道等的顶部或墙壁突然坍塌。"
          },
          {
            title: "含义",
            content: "文中意思+常用意思：（隧道、矿井等的）坍塌；塌陷<br>英文释义：The sudden falling in of the roof or walls of a tunnel, mine, etc."
          },
          {
            title: "书本原句",
            content: "She has seemed a little off since last week— when the tunnel caved in.（自从上周隧道坍塌后，她就有点不对劲了。）（注：caved in是cave-in的动词短语形式）"
          },
          {
            title: "常见用法",
            content: "tunnel cave-in（隧道坍塌）、mine cave-in（矿井塌陷）、cause a cave-in（导致坍塌）、survive a cave-in（从坍塌中幸存）、after the cave-in（坍塌之后）"
          },
          {
            title: "例句",
            content: "生活例句：The heavy rain caused a cave-in of the old mine.（大雨导致了那座旧矿井的塌陷。）<br><br>名词例句：The workers tried to rescue the people after the tunnel cave-in.（隧道坍塌后，工人们努力营救被困人员。）"
          }
        ]
      },
      {
        type: "quiz",
        title: "挑战一下",
        data: {
          question: "The tunnel had a ______ after the dragon banged into the walls.",
          options: ["take place", "tale", "bring", "cave-in"],
          answerIndex: 3
        }
      }
    ]
  },
  {
    uid: "w013",
    word: "tale",
    chapterId: "dm1-c2",
    order: 7,
    phonetic: "/teɪl/",
    pos: "n.",
    tabs: [
      { type: "image", title: "图片", data: ["wordpic/tale.png"] },
      {
        type: "text",
        title: "单词详解",
        data: [
          {
            title: "核心含义",
            content: "<b>n. 故事；传说</b><br>特指带有虚构、奇幻色彩的故事，区别于普通story。"
          },
          {
            title: "含义",
            content: "文中意思+常用意思：故事；传说（通常带有虚构、奇幻色彩）<br>英文释义：A story, especially one that is made up or has magic in it."
          },
          {
            title: "书本原句",
            content: "“No time for tales now,” said Griffith with a wave of his hand.（“现在没时间讲故事了，”格里菲斯挥了挥手说。）"
          },
          {
            title: "常见用法",
            content: "dragon tale（龙的传说）、wizard tale（巫师的故事）、fairy tale（童话故事）、tell a tale（讲故事）、exciting tale（激动人心的故事）、magic tale（魔法故事）"
          },
          {
            title: "例句",
            content: "生活例句：My grandma often tells me tales of brave knights and beautiful princesses.（奶奶经常给我讲勇敢的骑士和美丽公主的故事。）<br><br>名词例句：This book is full of exciting tales of adventure.（这本书里满是激动人心的冒险故事。）<br><br>⚠️ 避免用错：不要把tale和story混淆，tale更侧重“虚构、奇幻、带有传说色彩”；story可泛指所有故事。不要说“true tale”，表示“真实的故事”用true story。"
          }
        ]
      },
      {
        type: "quiz",
        title: "挑战一下",
        data: {
          question: "Griffith had no time to tell ______ about dark wizards that day.",
          options: ["cave-in", "take place", "tale", "bring"],
          answerIndex: 2
        }
      }
    ]
  },
  {
    uid: "w014",
    word: "bring",
    chapterId: "dm1-c2",
    order: 8,
    phonetic: "/brɪŋ/",
    pos: "vt./vi.",
    tabs: [
      { type: "image", title: "图片", data: ["wordpic/bring.png"] },
      {
        type: "text",
        title: "单词详解",
        data: [
          {
            title: "核心含义",
            content: "<b>vt./vi. 带来；拿来；引起</b><br>指把某物/某人从别处带到说话人所在处，区别于take。"
          },
          {
            title: "含义",
            content: "文中意思+常用意思：带来；拿来；引起（把某物/某人从别处带到说话人所在处）<br>英文释义：To take something or someone to the place where you are or where they are needed."
          },
          {
            title: "书本原句",
            content: "Worm must have used his mind powers to bring us here!（沃姆一定是用了他的心智力量把我们带到这里来的！）（出自Chapter 7，贴合核心义）"
          },
          {
            title: "常见用法",
            content: "bring sth to sb（把某物带给某人）：bring a jar of moonbeams、bring a gift to Ana、bring water to the dragon；<br>bring sb to sp（把某人带到某地）：bring us to the pyramid、bring the children to the park；<br>bring back（带回）：bring back the potion、bring back a book"
          },
          {
            title: "例句",
            content: "书本延伸：Drake and Bo went to Griffith’s workshop to bring back moonbeams and sunflower seeds.（德雷克和波去格里菲斯的工作室，带回了月光和向日葵种子。）<br><br>生活例句：Can you bring me that pencil on the desk?（你能把桌子上的那支铅笔带给我吗？）<br><br>⚠️ 避免用错：不要混淆bring和take。bring表示“从别处带到说话人处”（带来）；take表示“从说话人处带到别处”（拿走）。"
          }
        ]
      },
      {
        type: "quiz",
        title: "挑战一下",
        data: {
          question: "Drake helped ______ the jar of moonbeams to the wizard’s pot.",
          options: ["tale", "cave-in", "bring", "take place"],
          answerIndex: 2
        }
      }
    ]
  },
    // ================================= Chapter 3 (dm1-c3) =================================
        // ================================= Chapter 3 (dm1-c3) 修正版 =================================
  {
    uid: "w015",
    word: "spy",
    chapterId: "dm1-c3",
    order: 1,
    phonetic: "/spaɪ/",
    pos: "n./vt./vi.",
    tabs: [
      { type: "image", title: "图片", data: ["wordpic/spy.png"] },
      {
        type: "text",
        title: "单词详解",
        data: [
          {
            title: "核心含义",
            content: "<b>n. 间谍；密探；v. 监视；窥探</b><br>指秘密监视他人以获取信息的人，或秘密观察他人/事物的动作。"
          },
          {
            title: "含义",
            content: "名词（n.）：文中意思+常用意思：间谍；密探（秘密监视他人的人）<br>英文释义：A person who secretly watches others to get information.<br><br>动词（vt./vi.）：常用意思：监视；窥探（秘密观察他人或某事）<br>英文释义：To secretly watch someone or something to get information."
          },
          {
            title: "书本原句",
            content: "“I have spies hidden in the Valley of Clouds,” the king said, as if he had read their minds.（“我在云谷里藏了间谍，”国王说，仿佛看穿了他们的心思。）"
          },
          {
            title: "常见用法",
            content: "名词用法：hidden spy（隐藏的间谍）、king’s spy（国王的密探）、send a spy（派间谍）、catch a spy（抓住间谍）、spy in the shadows（潜伏在暗处的间谍）<br><br>动词用法：常用介词on/for，<br>spy on（监视；窥探）：spy on the dragons、spy on the neighbors、spy on the enemy；<br>spy for（为……充当间谍）：spy for the king、spy for the country；<br>spy sth（窥探到某物）：spy a secret door、spy a flying dragon"
          },
          {
            title: "避免用错",
            content: "spy作为动词时，后接on表示“监视某人/某物”，不要直接接宾语，比如“监视龙们”是spy on the dragons，不是spy the dragons。"
          },
          {
            title: "例句",
            content: "书本延伸：The king’s spies watched every move of the Dragon Masters and reported back.（国王的间谍监视着驯龙大师们的一举一动，并汇报情况。）<br><br>生活例句：The detective spied on the bad guy to find out his plan.（侦探监视着那个坏人，想弄清他的计划。）<br><br>名词例句：No one knew that the old man was a spy working for the king.（没人知道那个老人是为国王效力的间谍。）"
          }
        ]
      },
      {
        type: "quiz",
        title: "挑战一下",
        data: {
          question: "The king sent a ______ to watch the dark wizard’s every move in the valley.",
          options: ["warrior", "spy", "wizard", "dragon"],
          answerIndex: 1
        }
      }
    ]
  },
  {
    uid: "w016",
    word: "instead of",
    chapterId: "dm1-c3",
    order: 2,
    phonetic: "/ɪnˈsted əv/",
    pos: "短语",
    tabs: [
      { type: "image", title: "图片", data: ["wordpic/instead of.png"] },
      {
        type: "text",
        title: "单词详解",
        data: [
          {
            title: "核心含义",
            content: "<b>短语 代替；作为……的替换；而不是</b><br>表示用某物/某人替代另一物/另一人，或做某事而非另一件事。"
          },
          {
            title: "含义",
            content: "文中意思+常用意思：代替；作为……的替换（用某物/某人代替另一物/另一人）<br>英文释义：In place of someone or something; rather than."
          },
          {
            title: "书本原句",
            content: "Instead, he said the dragons had tried to escape.（相反，他说龙们试图逃跑。）（完整语境：Griffith hadn't told the king that the Dragon Masters had taken the dragons out. Instead, he said...）"
          },
          {
            title: "常见用法",
            content: "instead of + 名词：instead of the truth、instead of candy、instead of him；<br>instead of + 动名词：instead of telling the truth、instead of playing、instead of eating；<br>常见句型：do A instead of B（做A而不做B）"
          },
          {
            title: "例句",
            content: "书本延伸：Griffith protected the Dragon Masters instead of telling the king the real reason.（格里菲斯保护了驯龙大师们，而没有告诉国王真正的原因。）<br><br>生活例句：She drank milk instead of juice for breakfast.（她早餐喝了牛奶，而不是果汁。）<br><br>短语例句：We walked to the park instead of taking the bus.（我们步行去了公园，而不是坐公交车。）<br><br>简单例句：He read a book instead of playing video games.（他看了书，而不是玩电子游戏。）"
          }
        ]
      },
      {
        type: "quiz",
        title: "挑战一下",
        data: {
          question: "Griffith kept the secret ______ telling the king what really happened to the dragons.",
          options: ["instead of", "because of", "thanks to", "as for"],
          answerIndex: 0
        }
      }
    ]
  },
  {
    uid: "w017",
    word: "graceful",
    chapterId: "dm1-c3",
    order: 3,
    phonetic: "/ˈɡreɪsfl/",
    pos: "adj.",
    tabs: [
      { type: "image", title: "图片", data: ["wordpic/graceful.png"] },
      {
        type: "text",
        title: "单词详解",
        data: [
          {
            title: "核心含义",
            content: "<b>adj. 优雅的；优美的；得体的</b><br>形容动作、姿态或举止流畅、优美且协调。"
          },
          {
            title: "含义",
            content: "文中意思+常用意思：优雅的；优美的；得体的（动作、姿态或举止优美协调）<br>英文释义：Moving or behaving in a smooth, beautiful, and controlled way."
          },
          {
            title: "书本原句",
            content: "And her long, graceful neck was drooping.（她那修长优雅的脖子耷拉着。）"
          },
          {
            title: "常见用法",
            content: "graceful neck（优雅的脖子）、graceful dance（优美的舞蹈）、graceful movements（优雅的动作）、graceful swan（优雅的天鹅）、graceful lady（举止优雅的女士）、graceful dragon（姿态优美的龙）"
          },
          {
            title: "例句",
            content: "生活例句：The ballerina’s graceful movements made everyone cheer.（芭蕾舞演员优雅的动作让所有人都欢呼起来。）<br><br>形容词例句：The swan glided across the lake in a graceful manner.（天鹅优雅地划过湖面。）<br><br>简单例句：She has a graceful way of walking— like a little princess.（她走路的姿态很优雅，像个小公主。）"
          }
        ]
      },
      {
        type: "quiz",
        title: "挑战一下",
        data: {
          question: "The swan moved in a ______ way across the quiet lake in the castle garden.",
          options: ["clumsy", "graceful", "slow", "fast"],
          answerIndex: 1
        }
      }
    ]
  },
  {
    uid: "w018",
    word: "droop",
    chapterId: "dm1-c3",
    order: 4,
    phonetic: "/druːp/",
    pos: "vi.",
    tabs: [
      { type: "image", title: "图片", data: ["wordpic/droop.png"] },
      {
        type: "text",
        title: "单词详解",
        data: [
          {
            title: "核心含义",
            content: "<b>vi. 下垂；耷拉；萎靡</b><br>指因疲劳、虚弱或悲伤而向下垂落的状态。"
          },
          {
            title: "含义",
            content: "文中意思+常用意思：下垂；耷拉；萎靡（因疲劳、虚弱或悲伤而向下垂）<br>英文释义：To hang down or bend downward because of tiredness, weakness, or sadness."
          },
          {
            title: "书本原句",
            content: "And her long, graceful neck was drooping.（她那修长优雅的脖子耷拉着。）"
          },
          {
            title: "常见用法",
            content: "常用介词down<br>droop down（垂下来）：neck droop down、flower heads droop down、ears droop down；<br>droop with tiredness（因疲劳而萎靡）：eyes droop with tiredness、shoulders droop with tiredness；<br>droop with sadness（因悲伤而萎靡）：head droop with sadness、spirits droop with sadness"
          },
          {
            title: "例句",
            content: "生活例句：The roses drooped because we forgot to water them for two days.（我们两天没给玫瑰浇水，它们都蔫了。）<br><br>简单例句：The little dog’s tail drooped when its owner left home.（主人出门后，小狗的尾巴耷拉了下来。）"
          }
        ]
      },
      {
        type: "quiz",
        title: "挑战一下",
        data: {
          question: "Kepri’s wings ______ with tiredness after she flew for a whole day in the sky.",
          options: ["rose", "drooped", "shook", "flapped"],
          answerIndex: 1
        }
      }
    ]
  },
  {
    uid: "w019",
    word: "be supposed to",
    chapterId: "dm1-c3",
    order: 5,
    phonetic: "/biː səˈpəʊzd tuː/",
    pos: "短语",
    tabs: [
      { type: "image", title: "图片", data: ["wordpic/be-supposed-to.png"] },
      {
        type: "text",
        title: "单词详解",
        data: [
          {
            title: "核心含义",
            content: "<b>短语 应该；理应；被期望</b><br>表示按规定、责任或常理应当做某事，也可表示被认为是。"
          },
          {
            title: "含义",
            content: "文中意思+常用意思：应该；理应；被期望（按规定、责任或常理应该做某事）"
          },
          {
            title: "书本原句",
            content: "“You are supposed to know all about dragons. Heal her!”（“你理应了解所有关于龙的事。治好她！”）"
          },
          {
            title: "常见用法",
            content: "be supposed to do sth（应该做某事）：be supposed to know、be supposed to study、be supposed to arrive on time；<br>be supposed to be（应该是；被认为是）：be supposed to be strong、be supposed to be a secret；<br>否定形式：be not supposed to do sth（不应该做某事）：be not supposed to lie、be not supposed to run in the hallway"
          },
          {
            title: "例句",
            content: "生活例句：We are supposed to finish our homework before watching TV.（我们应该先完成作业再看电视。）<br><br>简单例句：You are not supposed to talk loudly in the library.（你不应该在图书馆里大声说话。）"
          }
        ]
      },
      {
        type: "quiz",
        title: "挑战一下",
        data: {
          question: "As a wizard who studies dragons, you ______ know how to heal a sick dragon.",
          options: ["are supposed to", "are afraid to", "refuse to", "happen to"],
          answerIndex: 0
        }
      }
    ]
  },
  {
    uid: "w020",
    word: "heal",
    chapterId: "dm1-c3",
    order: 6,
    phonetic: "/hiːl/",
    pos: "vt./vi.",
    tabs: [
      { type: "image", title: "图片", data: ["wordpic/heal.png"] },
      {
        type: "text",
        title: "单词详解",
        data: [
          {
            title: "核心含义",
            content: "<b>vt./vi. 治愈；愈合；康复</b><br>指使伤口、疾病痊愈，尤指身体上的恢复，可作及物或不及物动词。"
          },
          {
            title: "含义",
            content: "文中意思+常用意思：治愈；愈合；康复（使伤口、疾病痊愈，尤指身体上的恢复）<br>英文释义：To make or become healthy again, especially for wounds or illnesses."
          },
          {
            title: "书本原句",
            content: "“Heal her!”（“治好她！”）"
          },
          {
            title: "常见用法",
            content: "A heal B（A某人 治愈 B某人/某病）：Griffith heals Kepri、heal the sick dragon、the doctors heal the patient/a broken bone/a wound；<br>病（人）heal quickly（快速愈合）：the wound heals quickly、the dragon heals quickly；<br>heal from sth（从……中康复）：heal from an illness、heal from a wound"
          },
          {
            title: "例句",
            content: "书本延伸：Griffith tried his best to heal Kepri with a magic potion.（格里菲斯努力用魔法药剂治愈凯普丽。）<br><br>生活例句：The doctor used special medicine to heal the little boy’s wound.（医生用特殊的药愈合了小男孩的伤口。）<br><br>动词例句：The cut on her knee healed in three days.（她膝盖上的伤口三天就愈合了。）<br><br>简单例句：The sick cat will heal soon if we feed it well and take care of it.（如果我们好好喂养和照顾那只生病的猫，它很快就会康复。）"
          }
        ]
      },
      {
        type: "quiz",
        title: "挑战一下",
        data: {
          question: "The magic spring water can ______ any small wound on the dragon’s body quickly.",
          options: ["hurt", "heal", "break", "damage"],
          answerIndex: 1
        }
      }
    ]
  },
  {
    uid: "w021",
    word: "cure",
    chapterId: "dm1-c3",
    order: 7,
    phonetic: "/kjʊə(r)/",
    pos: "vt./n.",
    tabs: [
      { type: "image", title: "图片", data: ["wordpic/cure.png"] },
      {
        type: "text",
        title: "单词详解",
        data: [
          {
            title: "核心含义",
            content: "<b>vt. 治愈；治好；n. 疗法；解药；治愈</b><br>动词指通过药物/治疗治愈疾病，名词指治愈疾病的方法或药物。"
          },
          {
            title: "含义",
            content: "动词（vt.）：文中意思+常用意思：治愈；治好（通过药物、治疗或某种方法治愈疾病）<br>英文释义：To make someone healthy again by using medicine, treatment, or a special method.<br><br>名词（n.）：常用意思：疗法；解药；治愈（治愈疾病的方法或药物）<br>英文释义：A medicine, treatment, or method that makes someone healthy again."
          },
          {
            title: "书本原句",
            content: "“I will look for a cure right away,” Griffith promised.（“我会立刻寻找解药，”格里菲斯承诺道。）"
          },
          {
            title: "常见用法",
            content: "动词用法：cure sb of sth（治愈某人的某种疾病）：cure Kepri of her sickness、cure him of a cold、cure the dragon of dark magic；<br>cure sth（治愈某种疾病）：cure a disease、cure an illness、cure magic harm<br><br>名词用法：<br>find a cure（寻找疗法/解药）、<br>a cure for sth（……的疗法/解药）：a cure for dark magic、a cure for colds、<br>magic cure（魔法解药）"
          },
          {
            title: "避免用错",
            content: "cure作为动词时，常用搭配是cure sb of sth，不要说cure sb sth，比如“治愈她的病”是cure her of her illness，不是cure her illness（虽可接受，但cure sb of sth更规范）。"
          },
          {
            title: "例句",
            content: "书本延伸：Wati, Kepri’s twin, was the only one who could cure her of the dark magic.（凯普丽的双胞胎弟弟瓦蒂，是唯一能治愈她黑魔法伤害的人。）<br><br>生活例句：Scientists are working hard to find a cure for that terrible disease.（科学家们正在努力寻找治疗那种可怕疾病的方法。）<br><br>动词例句：The magic potion cured the little girl of her fear of darkness.（魔法药剂治愈了小女孩对黑暗的恐惧。）<br><br>名词例句：Is there a cure for the dragon’s sickness caused by dark magic?（有没有治疗龙因黑魔法引发疾病的解药？）"
          }
        ]
      },
      {
        type: "quiz",
        title: "挑战一下",
        data: {
          question: "Griffith promised to find a ______ for Kepri’s sickness caused by dark magic.",
          options: ["cure", "toy", "book", "shield"],
          answerIndex: 0
        }
      }
    ]
  },
  {
    uid: "w022",
    word: "fix on",
    chapterId: "dm1-c3",
    order: 8,
    phonetic: "/fɪks ɒn/",
    pos: "短语",
    tabs: [
      { type: "image", title: "图片", data: ["wordpic/fix on.png"] },
      {
        type: "text",
        title: "单词详解",
        data: [
          {
            title: "核心含义",
            content: "<b>短语 盯着；注视；集中于；选定</b><br>主要指目光、注意力集中在某物上，也可表示选定某事物。"
          },
          {
            title: "含义",
            content: "文中意思+常用意思：盯着；注视；集中于（目光、注意力集中在某物上）<br>英文释义：To focus one’s eyes or attention on someone or something.<br>情景解释： If you fix your eyes on a beautiful picture, you stare at it. You can also fix your attention on your homework."
          },
          {
            title: "书本原句",
            content: "“You had better find one soon,” King Roland said, his eyes fixed on the wizard.（“你最好尽快找到解药，”罗兰德国王说，目光紧紧盯着巫师。）"
          },
          {
            title: "常见用法",
            content: "fix one’s eyes on（盯着；注视）：fix his eyes on Griffith、fix her eyes on the dragon、fix my eyes on the rainbow；<br>fix attention on（集中注意力于）：fix attention on the lesson、fix attention on the problem；<br>fix on sth（选定；确定）：fix on a date、fix on a place to meet"
          },
          {
            title: "避免用错",
            content: "fix on表示“盯着”时，常用被动形式“be fixed on”或主动形式“fix one’s eyes on”，不要直接说“fix on sth”表示注视，比如“他盯着我”是his eyes were fixed on me或he fixed his eyes on me，不是he fixed on me。"
          },
          {
            title: "例句",
            content: "书本延伸：Drake fixed his eyes on Kepri, worried about her health.（德雷克盯着凯普丽，担心她的健康。）<br><br>生活例句：The little boy fixed his attention on the magic show, not wanting to miss anything.（小男孩集中注意力看魔术表演，不想错过任何细节。）<br><br>短语例句：Her eyes were fixed on the flying dragon in the sky.（她的目光紧紧盯着天空中飞翔的龙。）<br><br>简单例句：We need to fix on a time to visit our grandma this weekend.（我们需要确定这周末去看望奶奶的时间。）"
          }
        ]
      },
      {
        type: "quiz",
        title: "挑战一下",
        data: {
          question: "All the students ______ their attention on the teacher’s story about magic dragons.",
          options: ["fixed", "paid", "took", "gave"],
          answerIndex: 0
        }
      }
    ]
  },
  {
    uid: "w023",
    word: "stomach",
    chapterId: "dm1-c3",
    order: 9,
    phonetic: "/ˈstʌmək/",
    pos: "n./vt.",
    tabs: [
      { type: "image", title: "图片", data: ["wordpic/stomach.png"] },
      {
        type: "text",
        title: "单词详解",
        data: [
          {
            title: "核心含义",
            content: "<b>n. 胃；肚子；腹部；vt. 忍受</b><br>名词指身体部位，也有相关情绪搭配，动词指忍受某物。"
          },
          {
            title: "含义",
            content: "名词（n.）：文中意思+常用意思：胃；肚子；腹部"
          },
          {
            title: "书本原句",
            content: "Drake's stomach did a flip.（德雷克的胃一阵翻腾。）"
          },
          {
            title: "常见用法",
            content: "名词用法：empty stomach（空腹）、full stomach（饱腹）、have a stomach ache（肚子痛）、butterflies in one’s stomach（心里发慌；紧张）、stomach did a flip（胃一阵翻腾）<br><br>动词用法：stomach sth（忍受某物）：can’t stomach spicy food、can’t stomach lies"
          },
          {
            title: "避免用错",
            content: "stomach作为名词时，常用搭配“have a stomach ache”表示“肚子痛”，不要说“have stomach ache”（缺少a）。"
          },
          {
            title: "例句",
            content: "情景例句：I have a stomach ache because I ate too much candy yesterday.（我肚子痛，因为昨天吃了太多糖果。）<br><br>情绪例句：I had butterflies in my stomach before the magic test.（魔法测试前我心里发慌。）<br><br>动词例句：He can’t stomach the taste of bitter magic potions.（他忍受不了苦味魔法药剂的味道。）"
          }
        ]
      },
      {
        type: "quiz",
        title: "挑战一下",
        data: {
          question: "Drake’s ______ did a flip when he heard the king’s angry words to Griffith.",
          options: ["head", "stomach", "heart", "leg"],
          answerIndex: 1
        }
      }
    ]
  },
  {
    uid: "w024",
    word: "act",
    chapterId: "dm1-c3",
    order: 10,
    phonetic: "/ækt/",
    pos: "vi./vt./n.",
    tabs: [
      { type: "image", title: "图片", data: ["wordpic/act.png"] },
      {
        type: "text",
        title: "单词详解",
        data: [
          {
            title: "核心含义",
            content: "<b>v. 行动；做事；扮演；n. 行动；行为；表演</b><br>动词指采取行动或扮演角色，名词指具体的行为或表演。"
          },
          {
            title: "含义",
            content: "动词（vi./vt.）：文中意思+常用意思：行动；做事；扮演（采取行动；扮演角色）<br>英文释义：To do something; to behave in a certain way; to perform a role in a play.<br><br>名词（n.）：常用意思：行动；行为；表演"
          },
          {
            title: "书本原句",
            content: "“We must act quickly to save Kepri!”（“我们必须尽快行动，拯救凯普丽！”）"
          },
          {
            title: "常见用法",
            content: "动词用法：<br>act quickly（快速行动）：act quickly to save、act quickly in an emergency；<br>act as（充当；担任）：act as a leader、act as a guide；<br><br>名词用法：a brave act（勇敢的行为）、kind act（善良的举动）、stage act（舞台表演）、take action（采取行动，action为act的名词形式）"
          },
          {
            title: "例句",
            content: "书本延伸：The Dragon Masters decided to act together to find a cure for Kepri.（驯龙大师们决定一起行动，寻找治愈凯普丽的方法。）<br><br>动词例句：She acted as a guide for the visitors in the castle.（她在城堡里为游客们充当向导。）<br><br>名词例句：It was a brave act to save the little dragon from the dark cave.（从黑暗洞穴里救出小龙是一件勇敢的行为。）"
          }
        ]
      },
      {
        type: "quiz",
        title: "挑战一下",
        data: {
          question: "We must ______ quickly, or the dark magic will hurt Kepri more seriously.",
          options: ["think", "act", "talk", "wait"],
          answerIndex: 1
        }
      }
    ]
  },
  // ================================= Chapter 4 (dm1-c4) =================================
    // ================================= Chapter 4 (dm1-c4) 完整版 =================================
  {
    uid: "w025",
    word: "drop off",
    chapterId: "dm1-c4",
    order: 1,
    phonetic: "/ˈdrɒp ɒf/",
    pos: "短语",
    tabs: [
      { type: "image", title: "图片", data: ["wordpic/drop off.png"] },
      {
        type: "text",
        title: "单词详解",
        data: [
          {
            title: "核心含义",
            content: "<b>短语 放下；交付；让……下车</b><br>指把某物/某人送到某地并放下，也可引申为打瞌睡。"
          },
          {
            title: "含义",
            content: "文中意思+常用意思：放下；交付；让……下车；（把某物/某人送到某地并放下）<br>英文释义：To take someone or something to a place and leave them there;"
          },
          {
            title: "书本原句",
            content: "The Dragon Masters dropped off their dragons and headed to the Training Room.（驯龙大师们把龙们安置好，然后前往训练室。）"
          },
          {
            title: "常见用法",
            content: "drop off sb（让某人下车；放下某人）：drop off the children、drop off Drake at the castle；drop off sth（交付某物；放下某物）：drop off the books、drop off the potion；<br>drop off at sp（在某地放下）：drop off at the cave、drop off at the school gate；<br>drop off to sleep（打瞌睡）：drop off to sleep on the couch"
          },
          {
            title: "例句",
            content: "生活例句：My dad drops me off at school every morning before going to work.（爸爸每天早上上班前把我送到学校。）<br><br>短语例句：She dropped off the package at the post office on her way home.（她回家路上把包裹送到了邮局。）"
          }
        ]
      },
      {
        type: "quiz",
        title: "挑战一下",
        data: {
          question: "My mom ______ me ______ at the dance school every Saturday morning.",
          options: ["takes, away", "drops, off", "puts, on", "gives, up"],
          answerIndex: 1
        }
      }
    ]
  },
  {
    uid: "w026",
    word: "section",
    chapterId: "dm1-c4",
    order: 2,
    phonetic: "/ˈsekʃn/",
    pos: "n.",
    tabs: [
      { type: "image", title: "图片", data: ["wordpic/section.png"] },
      {
        type: "text",
        title: "单词详解",
        data: [
          {
            title: "核心含义",
            content: "<b>n. 部分；区域；章节</b><br>指整体中划分出来的某一部分，可用于空间、书籍等场景。"
          },
          {
            title: "含义",
            content: "文中意思+常用意思：部分；区域；章节（整体中的一部分）<br>英文释义：A part of something larger, like a room, book, or place."
          },
          {
            title: "书本原句",
            content: "The section where Griffith taught lessons was kind of like a cave.（格里菲斯上课的那个区域有点像一个洞穴。）"
          },
          {
            title: "常见用法",
            content: "section of a room（房间的一个区域）、section of a book（书的一个章节）、lesson section（教学区域）、toy section（玩具区）、food section（食品区）、section of the cave（洞穴的一部分）"
          },
          {
            title: "例句",
            content: "名词例句：This section of the park is for children to play in.（公园的这个区域是给孩子们玩耍的。）<br><br>简单例句：Turn to the next section of the book— there are more dragon stories.（翻到书的下一部分，那里有更多龙的故事。）"
          }
        ]
      },
      {
        type: "quiz",
        title: "挑战一下",
        data: {
          question: "The ______ of the library with picture books is my little sister's favorite place.",
          options: ["time", "section", "people", "book"],
          answerIndex: 1
        }
      }
    ]
  },
  {
    uid: "w027",
    word: "complain",
    chapterId: "dm1-c4",
    order: 3,
    phonetic: "/kəmˈpleɪn/",
    pos: "vi./vt.",
    tabs: [
      { type: "image", title: "图片", data: ["wordpic/complain.png"] },
      {
        type: "text",
        title: "单词详解",
        data: [
          {
            title: "核心含义",
            content: "<b>vi./vt. 抱怨；埋怨；发牢骚</b><br>指对某事不满并表达出来，后接宾语需搭配介词。"
          },
          {
            title: "含义",
            content: "文中意思+常用意思：抱怨；埋怨；发牢骚（对某事不满并表达出来）<br>英文释义：To say that you are unhappy, annoyed, or not satisfied with something."
          },
          {
            title: "书本原句",
            content: "But today, nobody was complaining about staying inside.（但今天，没人抱怨要待在室内。）"
          },
          {
            title: "常见用法",
            content: "常用介词about/of/to<br>complain about sth（抱怨某事）：complain about staying inside、complain about the weather、complain about the food；<br>complain to sb（向某人抱怨）：complain to Griffith、complain to mom、complain to the teacher；<br>complain of sth（诉说某种不适或不满）：complain of being tired、complain of a headache"
          },
          {
            title: "避免用错",
            content: "complain是不及物动词，后接宾语需加介词about/of/to，不能直接接宾语，比如“抱怨作业多”是complain about too much homework，不是complain too much homework。"
          },
          {
            title: "例句",
            content: "生活例句：She complained to her dad about the noisy neighbors.（她向爸爸抱怨邻居太吵。）<br><br>动词例句：He never complains about hard work— he always tries his best.（他从不抱怨工作辛苦，总是全力以赴。）<br><br>简单例句：My little sister complains about brushing her teeth every night.（我妹妹每晚都抱怨刷牙。）"
          }
        ]
      },
      {
        type: "quiz",
        title: "挑战一下",
        data: {
          question: "The children never ______ about the hard training with the dragons.",
          options: ["complain", "talk", "think", "know"],
          answerIndex: 0
        }
      }
    ]
  },
  {
    uid: "w028",
    word: "flip through",
    chapterId: "dm1-c4",
    order: 4,
    phonetic: "/ˈflɪp θruː/",
    pos: "短语",
    tabs: [
      { type: "image", title: "图片", data: ["wordpic/flip through.png"] },
      {
        type: "text",
        title: "单词详解",
        data: [
          {
            title: "核心含义",
            content: "<b>短语 快速翻阅；浏览</b><br>指快速地一页页翻看书籍、杂志等，侧重粗略查看。"
          },
          {
            title: "含义",
            content: "文中意思+常用意思：快速翻阅；浏览（快速地一页页翻看书籍、杂志等）<br>英文释义：To look through the pages of a book, magazine, etc.,"
          },
          {
            title: "书本原句",
            content: "He was already flipping through All About Sun Dragons.（他已经在快速翻阅《关于太阳龙的一切》了。）"
          },
          {
            title: "常见用法",
            content: "flip through + 书籍/杂志/文件：flip through All About Sun Dragons（快速翻阅《关于太阳龙的一切》）、flip through a storybook（快速翻阅故事书）、flip through a magazine（浏览杂志）、flip through notes（快速翻看笔记）"
          },
          {
            title: "避免用错",
            content: "flip through 强调 “快速、粗略地翻阅”，不侧重仔细阅读，不要和 read through（仔细通读）混淆。"
          },
          {
            title: "例句",
            content: "生活例句：I flipped through the comic book to see if there were any new characters.（我快速翻阅漫画书，看看有没有新角色。）<br><br>简单例句：Dad flipped through the newspaper before going to work.（爸爸上班前快速翻看了报纸。）"
          }
        ]
      },
      {
        type: "quiz",
        title: "挑战一下",
        data: {
          question: "Drake ______ the dragon book to find the story about Sun Dragons.",
          options: ["read through", "flip through", "write in", "talk about"],
          answerIndex: 1
        }
      }
    ]
  },
  {
    uid: "w029",
    word: "lore",
    chapterId: "dm1-c4",
    order: 5,
    phonetic: "/lɔː(r)/",
    pos: "n.",
    tabs: [
      { type: "image", title: "图片", data: ["wordpic/lore.png"] },
      {
        type: "text",
        title: "单词详解",
        data: [
          {
            title: "核心含义",
            content: "<b>n. 传说；传统知识</b><br>指关于某主题的、代代相传的传统知识和传说集合，为不可数名词。"
          },
          {
            title: "含义",
            content: "文中意思+常用意思：传说（关于某主题的传统知识、传说）<br>英文释义：Traditional knowledge, stories, or beliefs about a particular subject, passed down over time."
          },
          {
            title: "书本原句",
            content: "Then Rori held up Dragon Lore.（然后罗里举起了《龙类传说》这本书。）"
          },
          {
            title: "常见用法",
            content: "dragon lore（龙类传说）、wizard lore（巫师传说）、magic lore（魔法秘闻）、folk lore（民间传说）、ancient lore（古老传说）、lore about twins（关于双胞胎的传说）"
          },
          {
            title: "避免用错",
            content: "lore 是不可数名词，不要加 s 变成 lores；表示 “一本关于传说的书” 用 a book of lore 或 a lore book，比如 Dragon Lore（《龙类传说》），不是 Dragons Lore。<br><br>不要混淆 lore 和 story，lore 侧重 “代代相传的传统知识或传说集合”；story 侧重 “单个的故事”，比如 “一个龙的故事” 是 a dragon story，“龙的传说（集合）” 是 dragon lore。"
          },
          {
            title: "例句",
            content: "生活例句：Grandpa told us lore about stars and how they got into the sky.（爷爷给我们讲了关于星星如何来到天空的古老传说。）<br><br>名词例句：This book is full of lore about magical creatures.（这本书里满是关于魔法生物的传说。）<br><br>简单例句：People in the village share lore about the old castle.（村里的人流传着关于那座古老城堡的传说。）"
          }
        ]
      },
      {
        type: "quiz",
        title: "挑战一下",
        data: {
          question: "This old book is full of ______ about magic dragons and their powers.",
          options: ["story", "lore", "book", "picture"],
          answerIndex: 1
        }
      }
    ]
  },
  {
    uid: "w030",
    word: "potion",
    chapterId: "dm1-c4",
    order: 6,
    phonetic: "/ˈpəʊʃn/",
    pos: "n.",
    tabs: [
      { type: "image", title: "图片", data: ["wordpic/potion.png"] },
      {
        type: "text",
        title: "单词详解",
        data: [
          {
            title: "核心含义",
            content: "<b>n. 药剂；魔药</b><br>指具有魔法或特殊功效的液体，常见于奇幻故事中。"
          },
          {
            title: "含义",
            content: "文中意思+常用意思：药剂；魔药（具有魔法或特殊功效的液体）<br>英文释义：A liquid with magic power or a special effect, especially in stories."
          },
          {
            title: "书本原句",
            content: "“Well, my book has a potion in it called Wicked-Away,” she said. “It heals creatures harmed by dark magic.”（“嗯，我的书里有一种叫‘驱邪剂’的药剂，” 她说，“它能治愈被黑魔法伤害的生物。”）"
          },
          {
            title: "常见用法",
            content: "magic potion（魔法药剂）、healing potion（治疗药剂）、Wicked-Away potion（驱邪剂）、potion for healing（治疗用的药剂）、drink a potion（喝药剂）"
          },
          {
            title: "例句",
            content: "生活例句：In the fairy tale, the princess drank a magic potion and woke up.（童话里，公主喝了魔法药剂就醒了。）<br><br>名词例句：The wizard’s workshop was full of bottles of different potions.（巫师的工作室里摆满了各种药剂瓶。）<br><br>简单例句：They needed special ingredients to make the magic potion.（他们需要特殊的材料来调制魔法药剂。）"
          }
        ]
      },
      {
        type: "quiz",
        title: "挑战一下",
        data: {
          question: "Griffith made a magic ______ to heal the dragons hurt by dark magic.",
          options: ["book", "potion", "stone", "wand"],
          answerIndex: 1
        }
      }
    ]
  },
  {
    uid: "w031",
    word: "harm",
    chapterId: "dm1-c4",
    order: 7,
    phonetic: "/hɑːm/",
    pos: "n./vt.",
    tabs: [
      { type: "image", title: "图片", data: ["wordpic/harm.png"] },
      {
        type: "text",
        title: "单词详解",
        data: [
          {
            title: "核心含义",
            content: "<b>n./vt. 伤害；损害</b><br>指对人或事物造成的不良影响，动词可直接接宾语，名词有固定搭配。"
          },
          {
            title: "含义",
            content: "文中意思+常用意思：伤害；损害（对人或事物造成的不良影响）<br>英文释义：Damage or injury done to someone or something.<br>情景解释：Running with scissors can harm you.（拿着剪刀跑会伤害到你。）"
          },
          {
            title: "书本原句",
            content: "It heals creatures harmed by dark magic.（它能治愈被黑魔法伤害的生物。）"
          },
          {
            title: "常见用法",
            content: "（n.）do harm to sb/sth（对某人/某物造成伤害）：Do not do harm to small animals.（不要伤害小动物。）<br>（n.）cause harm（造成伤害）：Loud noise can cause harm to your ears.（噪音会伤害你的耳朵。）<br>（n.）no harm（没有伤害）：Playing gently does no harm.（温柔地玩耍不会有伤害。）<br>（vt.）harm sb/sth（伤害某人/某物）：Hot water can harm your skin.（热水会烫伤你的皮肤。）"
          },
          {
            title: "例句",
            content: "（vt.）Be careful with knives—they can harm you.（小心刀子，它们会伤害你。）<br><br>（vt.）We should never harm plants or animals.（我们永远不该伤害动植物。）<br><br>（n.）There is no harm in asking for help.（寻求帮助没有坏处。）"
          }
        ]
      },
      {
        type: "quiz",
        title: "挑战一下",
        data: {
          question: "Dark magic can ______ the little dragons and make them sick.",
          options: ["help", "harm", "heal", "save"],
          answerIndex: 1
        }
      }
    ]
  },
  {
    uid: "w032",
    word: "worth",
    chapterId: "dm1-c4",
    order: 8,
    phonetic: "/wɜːθ/",
    pos: "adj./n.",
    tabs: [
      { type: "image", title: "图片", data: ["wordpic/worth.png"] },
      {
        type: "text",
        title: "单词详解",
        data: [
          {
            title: "核心含义",
            content: "<b>adj./n. 值得的；有价值的</b><br>表示值得做或拥有，形容词有固定的主动表被动搭配。"
          },
          {
            title: "含义",
            content: "文中意思+常用意思：值得的；有价值的（值得做或拥有）<br>英文释义：Deserving of time, money, or effort.<br>情景解释：The storybook is worth reading twice.（这本故事书值得读两遍。）"
          },
          {
            title: "书本原句",
            content: "But it's worth a try, he said.（“但值得一试，”他说。）"
          },
          {
            title: "常见用法",
            content: "be worth doing（值得做）：This game is worth playing.（这个游戏值得玩。）<br>be worth sth（值某物/某价值）：The toy is worth ten yuan.（这个玩具值十元。）<br>be worth it（值得）：Waiting for the bus is worth it.（等公交车是值得的。）<br>well worth（非常值得）：The movie is well worth watching.（这部电影非常值得看。）"
          },
          {
            title: "避免用错",
            content: "worth 是形容词，常用搭配“be worth doing”（主动形式表被动），不要说“be worth to do”（错误），正确：be worth doing（√）。<br><br>不要混淆worth和worthy，worthy 常用搭配“be worthy of sth”或“be worthy to be done”，比如“The book is worthy of reading.”（= The book is worth reading.）"
          },
          {
            title: "例句",
            content: "Spending time with family is worth it.（和家人共度时光是值得的。）<br><br>This painting is worth a lot of money.（这幅画值很多钱。）"
          }
        ]
      },
      {
        type: "quiz",
        title: "挑战一下",
        data: {
          question: "Trying to make the healing potion is ______ a try for the wizards.",
          options: ["worth", "worthy", "good", "nice"],
          answerIndex: 0
        }
      }
    ]
  },
  {
    uid: "w033",
    word: "moonbeam",
    chapterId: "dm1-c4",
    order: 9,
    phonetic: "/muːnbiːm/",
    pos: "n.",
    tabs: [
      { type: "image", title: "图片", data: ["wordpic/moonbeam.png"] },
      {
        type: "text",
        title: "单词详解",
        data: [
          {
            title: "核心含义",
            content: "<b>n. 月光光束；月辉</b><br>指月亮发出的柔和光线，为可数名词，复数为moonbeams。"
          },
          {
            title: "含义",
            content: "文中意思+常用意思：月光光束；月辉（月亮发出的柔和光线）<br>英文释义：A ray of light from the moon.<br>情景解释：Moonbeams shine through the window at night.（夜晚，月光光束透过窗户照进来。）"
          },
          {
            title: "书本原句",
            content: "Bring back a jar of moonbeams and a sack of sunflower seeds.（带回一罐月光光束和一袋向日葵种子。）"
          },
          {
            title: "常见用法",
            content: "a beam of moonbeam（一束月光）：We saw a bright beam of moonbeam in the dark.（我们在黑暗中看到一束明亮的月光。）<br>moonbeams glow（月光闪耀）：Moonbeams glow softly on the grass.（月光在草地上柔和地闪耀。）"
          },
          {
            title: "避免用错",
            content: "moonbeam 是可数名词，复数形式是 moonbeams（√），不要说“moonbeam light”（重复），正确：moonbeams（√）。"
          },
          {
            title: "例句",
            content: "情景例句：Moonbeams slipped through the leaves and fell on the ground.（月光透过树叶洒落在地上。）<br><br>简单例句：We collected a jar of moonbeams for the magic potion.（我们为魔法药剂收集了一罐月光。）"
          }
        ]
      },
      {
        type: "quiz",
        title: "挑战一下",
        data: {
          question: "The wizards needed a jar of ______ to make the Wicked-Away potion.",
          options: ["sunlight", "moonbeam", "water", "dew"],
          answerIndex: 1
        }
      }
    ]
  },
  {
    uid: "w034",
    word: "dew",
    chapterId: "dm1-c4",
    order: 10,
    phonetic: "/djuː/",
    pos: "n.",
    tabs: [
      { type: "image", title: "图片", data: ["wordpic/dew.png"] },
      {
        type: "text",
        title: "单词详解",
        data: [
          {
            title: "核心含义",
            content: "<b>n. 露水；露珠</b><br>指清晨附着在物体表面的小水珠，为不可数名词。"
          },
          {
            title: "含义",
            content: "文中意思+常用意思：露水；露珠（清晨附着在物体表面的小水珠）<br>英文释义：Small drops of water that form on plants and other surfaces at night.<br>情景解释：Dew covers grass early in the morning.（清晨，露水覆盖在草地上。）"
          },
          {
            title: "书本原句",
            content: "Lily dew, he read out loud.（“百合露水，”他大声念道。）"
          },
          {
            title: "常见用法",
            content: "morning dew（晨露）：The morning dew makes flowers look fresh.（晨露让花朵看起来鲜嫩。）<br>dew on leaves（叶子上的露水）：Dew on leaves shines in the sun.（叶子上的露水在阳光下闪闪发光。）<br>wipe off dew（擦掉露水）：I wiped off dew from the bike seat.（我擦掉了自行车座位上的露水。）"
          },
          {
            title: "避免用错",
            content: "dew 是不可数名词，不要说“a dew”（错误），正确：a drop of dew（一滴露水）或 dew（√）。"
          },
          {
            title: "例句",
            content: "情景例句：The grass is wet with dew in the early morning.（清晨的草被露水打湿了。）<br><br>简单例句：We picked lily dew from the flowers for the magic potion.（我们从花上采集了百合露水做魔法药剂。）"
          }
        ]
      },
      {
        type: "quiz",
        title: "挑战一下",
        data: {
          question: "The ______ on the grass glistened in the morning sun.",
          options: ["rain", "dew", "snow", "water"],
          answerIndex: 1
        }
      }
    ]
  },
  {
    uid: "w035",
    word: "shimmer",
    chapterId: "dm1-c4",
    order: 11,
    phonetic: "/ˈʃɪmə(r)/",
    pos: "vi./n.",
    tabs: [
      { type: "image", title: "图片", data: ["wordpic/shimmer.png"] },
      {
        type: "text",
        title: "单词详解",
        data: [
          {
            title: "核心含义",
            content: "<b>vi./n. 微微发光；闪烁；微光；光泽</b><br>动词指发出柔和、微弱的光，为不及物动词；名词指柔和的闪光。"
          },
          {
            title: "含义",
            content: "动词（vi.）文中意思+常用意思：微微发光；闪烁（发出柔和、微弱的光）<br>英文释义：To shine with a soft, gentle light that shimmers.<br>情景解释：The lake shimmers in the sun.（湖面在阳光下微微发光。）<br><br>名词（n.）常用意思：微光；光泽（柔和的闪光）<br>英文释义：A soft, gentle glow.<br>情景解释：The snow has a faint shimmer in the moonlight.（雪在月光下泛着淡淡的微光。）"
          },
          {
            title: "书本原句",
            content: "A pale blue light shimmered inside the jar.（罐子里闪烁着淡淡的蓝光。）"
          },
          {
            title: "常见用法",
            content: "（vi.）shimmer in the light（在光中闪烁）：Her dress shimmers in the party light.（她的裙子在派对灯光下闪烁。）<br>（vi.）shimmer softly（微微发光）：Candlelight shimmers softly in the dark room.（烛光在黑暗的房间里微微发光。）<br>（n.）a golden shimmer（金色光泽）：Honey has a warm golden shimmer.（蜂蜜有着温暖的金色光泽。）<br>（n.）the shimmer of water（水面的微光）：We saw the shimmer of water in the distance.（我们看到远处水面的微光。）"
          },
          {
            title: "避免用错",
            content: "shimmer 作为动词时是不及物动词，不要直接接宾语，比如“钻石闪烁”是 The diamond shimmers（√），不是 The diamond shimmers light（×）。<br><br>不要混淆 shimmer 和 shine，shimmer 侧重“柔和、微弱的闪烁”，shine 侧重“明亮、强烈的照耀”，比如“太阳照耀”是 The sun shines brightly，“宝石闪烁”是 The gem shimmers gently。"
          },
          {
            title: "例句",
            content: "（vi.）The starry sky shimmers above the quiet village.（宁静的村庄上空，星空微微发光。）<br><br>（n.）The sequins on her shirt have a bright shimmer when she moves.（她衬衫上的亮片在她动的时候有着明亮的光泽。）<br><br>（vi.）The river shimmers under the sunset glow.（夕阳的余晖下，小河闪烁着光芒。）"
          }
        ]
      },
      {
        type: "quiz",
        title: "挑战一下",
        data: {
          question: "A soft light ______ inside the jar of moonbeams for the magic potion.",
          options: ["shone", "shimmered", "glared", "flashed"],
          answerIndex: 1
        }
      }
    ]
  },
  {
    uid: "w036",
    word: "direction",
    chapterId: "dm1-c4",
    order: 12,
    phonetic: "/dəˈrekʃn/",
    pos: "n.",
    tabs: [
      { type: "image", title: "图片", data: ["wordpic/direction.png"] },
      {
        type: "text",
        title: "单词详解",
        data: [
          {
            title: "核心含义",
            content: "<b>n. 方向；指示；说明</b><br>可指行进的方位，也可指做事的步骤/说明，表“指示”时常用复数。"
          },
          {
            title: "含义",
            content: "文中意思+常用意思：方向；指示；说明（行进的方位；做事的步骤）<br>英文释义：The way you should go; instructions on how to do something.<br>情景解释：Follow directions to build the toy.（按照说明组装玩具。）"
          },
          {
            title: "书本原句",
            content: "Ana was reading directions aloud from her book.（安娜正从书中大声朗读操作说明。）"
          },
          {
            title: "常见用法",
            content: "give directions（给出指示）：The teacher gave directions for the game.（老师给出了游戏的操作指示。）<br>in the right direction（朝正确方向）：Walk straight to go in the right direction.（直走就是朝正确方向。）<br>ask for directions（问路）：He asked a stranger for directions to the library.（他向陌生人询问去图书馆的路。）<br>simple directions（简单指示）：The cake recipe has simple directions.（这个蛋糕食谱的说明很简单。）"
          },
          {
            title: "避免用错",
            content: "direction 是可数名词，复数形式是 directions（常用，表“指示”），不要说“follow direction”（错误），正确：follow directions（√）。<br><br>不要混淆 direction 和 way，direction 侧重“明确的指示或方位”，way 侧重“笼统的路线或方式”，比如“告诉我去公园的路”是 Tell me the way to the park，“按照指示做”是 Follow the directions。"
          },
          {
            title: "例句",
            content: "Can you read the directions on the medicine bottle?（你能看看药瓶上的说明吗？）<br><br>We walked in the direction of the park.（我们朝着公园的方向走去。）"
          }
        ]
      },
      {
        type: "quiz",
        title: "挑战一下",
        data: {
          question: "Ana read the ______ aloud to help everyone make the healing potion.",
          options: ["books", "directions", "stories", "lore"],
          answerIndex: 1
        }
      }
    ]
  },
  {
    uid: "w037",
    word: "ladle",
    chapterId: "dm1-c4",
    order: 13,
    phonetic: "/ˈleɪdl/",
    pos: "n./vt.",
    tabs: [
      { type: "image", title: "图片", data: ["wordpic/ladle.png"] },
      {
        type: "text",
        title: "单词详解",
        data: [
          {
            title: "核心含义",
            content: "<b>n./vt. 长柄勺；汤勺；用长柄勺舀</b><br>名词指舀取液体/食物的长柄工具，动词有固定的搭配格式。"
          },
          {
            title: "含义",
            content: "名词（n.）文中意思+常用意思：长柄勺；汤勺（用于舀取液体或食物的工具）<br>英文释义：A large spoon with a long handle, used for serving soup or food.<br>情景解释：Use a ladle to serve soup.（用长柄勺舀汤。）<br><br>动词（vt.）常用意思：用长柄勺舀（液体或食物）<br>英文释义：To serve or scoop with a ladle.<br>情景解释：Mom ladles soup into our bowls every dinner.（妈妈每天晚饭都会把汤舀进我们的碗里。）"
          },
          {
            title: "书本原句",
            content: "Griffith scooped up some liquid with a ladle and put it in a clean jar.（格里菲斯用长柄勺舀了一些液体，放进一个干净的罐子里。）"
          },
          {
            title: "常见用法",
            content: "a soup ladle（汤勺）：Mom bought a new soup ladle for the kitchen.（妈妈给厨房买了一个新汤勺。）<br>ladle soup（舀汤）：Dad helped ladle soup into our bowls.（爸爸帮忙把汤舀进我们的碗里。）<br>metal ladle（金属长柄勺）：The metal ladle is easy to clean.（这个金属长柄勺很容易清洗。）<br>ladle into bowls（舀进碗里）：Ladle the stew into warm bowls.（把炖菜舀进温热的碗里。）"
          },
          {
            title: "避免用错",
            content: "ladle 作为动词时，常用搭配“ladle sth into sth”，不要说“ladle sth to sb”（错误），正确：ladle sth into bowls（√）。<br><br>不要混淆 ladle 和 spoon，ladle 是“长柄大勺子”，spoon 是“普通小勺子”，比如“用小勺吃冰淇淋”是 Eat ice cream with a spoon，“用长柄勺舀汤”是 Ladle soup with a ladle。"
          },
          {
            title: "例句",
            content: "She used a ladle to pour hot cocoa into mugs.（她用长柄勺把热可可倒进马克杯里。）<br><br>The ladle’s long handle keeps hands away from hot soup.（长柄勺的长柄能让手远离热汤。）"
          }
        ]
      },
      {
        type: "quiz",
        title: "挑战一下",
        data: {
          question: "Griffith used a metal ______ to scoop the magic liquid into a clean jar.",
          options: ["spoon", "ladle", "cup", "bottle"],
          answerIndex: 1
        }
      }
    ]
  },
  // ================================= Chapter 5 (dm1-c5) 完整版 =================================
  // ================================= Chapter 5 (dm1-c5) 完整版 =================================
  {
    uid: "w038",
    word: "firmly",
    chapterId: "dm1-c5",
    order: 1,
    phonetic: "/ˈfɜːmli/",
    pos: "adv.",
    tabs: [
      { type: "image", title: "图片", data: ["wordpic/firmly.png"] },
      {
        type: "text",
        title: "单词详解",
        data: [
          {
            title: "核心含义",
            content: "<b>adv. 坚定地；牢固地；坚决地</b><br>可修饰动词/形容词，表态度坚决或物体固定的状态。"
          },
          {
            title: "含义",
            content: "副词（adv.）文中意思 + 常用意思：坚定地；牢固地；坚决地（态度坚决或物体固定牢固）<br>英文释义：In a strong, steady, or determined way.<br>情景解释：Speak firmly when you have a good idea.（当你有好主意时，坚定地说出来。）"
          },
          {
            title: "书本原句",
            content: "I'm not leaving her, Ana said firmly.（“我不会离开她的，”安娜坚定地说。）"
          },
          {
            title: "常见用法",
            content: "（adv.）firmly refuse（坚决拒绝）：She firmly refused to lie to her mom.（她坚决拒绝向妈妈撒谎。）<br>（adv.）hold firmly（紧紧握住）：Hold the rope firmly when climbing.（爬山时紧紧抓住绳子。）<br>（adv.）stand firmly（稳稳站立）：The tree stands firmly in the wind.（这棵树在风中稳稳站立。）<br>（adv.）speak firmly（坚定地说）：He spoke firmly about his decision.（他坚定地谈论自己的决定。）"
          },
          {
            title: "例句",
            content: "（adv.）Please close the door firmly to keep the cold out.（请把门关紧，挡住寒气。）<br>（adv.）She firmly believes she can finish the task.（她坚信自己能完成任务。）<br>（adv.）The nail was hammered firmly into the wall.（钉子被牢牢钉进墙里。）"
          },
          {
            title: "避免用错",
            content: "firmly 是副词（adv.），用来修饰动词、形容词或其他副词，不要当作形容词（adj.）使用，比如“坚定的态度”是 firm attitude（adj.），不是 firmly attitude（×）。<br><br>不要混淆 firmly 和 hard，firmly 侧重“坚定、牢固”，hard 侧重“用力、努力”，比如“用力推”是 push hard，“牢牢抓住”是 hold firmly。"
          }
        ]
      },
      {
        type: "quiz",
        title: "挑战一下",
        data: {
          question: "Ana said ______ that she would stay with the sick dragon and not leave.",
          options: ["softly", "firmly", "quietly", "happily"],
          answerIndex: 1
        }
      }
    ]
  },
  {
    uid: "w039",
    word: "gentle",
    chapterId: "dm1-c5",
    order: 2,
    phonetic: "/ˈdʒentl/",
    pos: "adj.",
    tabs: [
      { type: "image", title: "图片", data: ["wordpic/gently.png"] },
      {
        type: "text",
        title: "单词详解",
        data: [
          {
            title: "核心含义",
            content: "<b>adj. 温和的；轻柔的；慈祥的</b><br>修饰人或事物，表态度、动作或声音不猛烈、柔和。"
          },
          {
            title: "含义",
            content: "形容词（adj.）文中意思 + 常用意思：温和的；轻柔的；慈祥的（态度、动作或声音不猛烈）<br>英文释义：Kind, soft, or not rough in manner or action.<br>情景解释：Mom speaks to the baby in a gentle voice.（妈妈用温和的声音对宝宝说话。）"
          },
          {
            title: "书本原句",
            content: "Griffith put a gentle hand on her shoulder.（格里菲斯把一只温和的手放在她的肩膀上。）"
          },
          {
            title: "常见用法",
            content: "（adj.）gentle hand（轻柔的手）：She touched the cat with a gentle hand.（她用轻柔的手抚摸小猫。）<br>（adj.）gentle voice（温和的声音）：The teacher has a gentle voice.（老师有着温和的声音。）<br>（adj.）gentle wind（微风）：A gentle wind blows through the window.（微风从窗户吹进来。）<br>（adj.）gentle smile（慈祥的微笑）：Grandma gave me a gentle smile.（奶奶给了我一个慈祥的微笑。）"
          },
          {
            title: "例句",
            content: "（adj.）Be gentle with the little dog-it’s scared.（对小狗温柔点，它很害怕。）<br>（adj.）The gentle rain kept falling all morning.（轻柔的雨下了一整个早上。）<br>（adj.）He has a gentle way of teaching kids.（他教孩子的方式很温和。）"
          },
          {
            title: "避免用错",
            content: "gentle 是形容词（adj.），用来修饰名词，不要当作副词使用，比如“温和地说话”是 speak gently（adv.），不是 speak gentle（×）。<br><br>不要混淆 gentle 和 soft，gentle 侧重“态度、动作的温和”，soft 侧重“质地、声音的柔软”，比如“柔软的毛巾”是 soft towel，“温和的眼神”是 gentle eyes。"
          }
        ]
      },
      {
        type: "quiz",
        title: "挑战一下",
        data: {
          question: "Griffith touched Kepri with a ______ hand, not wanting to scare the sick dragon.",
          options: ["rough", "gentle", "hard", "cold"],
          answerIndex: 1
        }
      }
    ]
  },
  {
    uid: "w040",
    word: "take care of",
    chapterId: "dm1-c5",
    order: 3,
    phonetic: "/teɪk keə(r) ɒv/",
    pos: "动词短语",
    tabs: [
      { type: "image", title: "图片", data: ["wordpic/take care of.png"] },
      {
        type: "text",
        title: "单词详解",
        data: [
          {
            title: "核心含义",
            content: "<b>动词短语 照顾；照料；处理</b><br>固定搭配，表关心照料人/物，或处理问题。"
          },
          {
            title: "含义",
            content: "动词短语（v.）文中意思 + 常用意思：照顾；照料；处理（关心并照料某人/某物）<br>英文释义：To look after someone or something; to deal with a problem.<br>情景解释：I take care of my pet fish every day.（我每天照顾我的宠物鱼。）"
          },
          {
            title: "书本原句",
            content: "Ana, you must take care of yourself, he said.（“安娜，你必须照顾好自己，”他说。）"
          },
          {
            title: "常见用法",
            content: "（v.）take care of sb（照顾某人）：She takes care of her little sister after school.（放学后她照顾妹妹。）<br>（v.）take care of sth（照料某物）：Take care of the plants so they grow well.（照料好这些植物，让它们茁壮成长。）<br>（v.）take care of a problem（处理问题）：Dad will take care of the broken bike.（爸爸会处理坏掉的自行车。）<br>（v.）take good care of（好好照顾）：Take good care of your books.（好好爱护你的书。）"
          },
          {
            title: "例句",
            content: "（v.）My aunt takes care of her garden every weekend.（我姑姑每个周末都打理她的花园。）<br>（v.）You need to take care of yourself when you’re alone.（你一个人的时候要照顾好自己。）<br>（v.）Can you take care of my bag while I go to the bathroom?（我去洗手间时，你能帮我看一下包吗？）"
          },
          {
            title: "避免用错",
            content: "take care of 是固定短语，不要遗漏 of，比如“照顾妈妈”是 take care of mom（√），不是 take care mom（×）。"
          }
        ]
      },
      {
        type: "quiz",
        title: "挑战一下",
        data: {
          question: "You must ______ your little brother when our parents are out.",
          options: ["look for", "take care of", "look at", "talk to"],
          answerIndex: 1
        }
      }
    ]
  },
  {
    uid: "w041",
    word: "usual",
    chapterId: "dm1-c5",
    order: 4,
    phonetic: "/ˈjuːʒuəl/",
    pos: "adj.",
    tabs: [
      { type: "image", title: "图片", data: ["wordpic/usual.png"] },
      {
        type: "text",
        title: "单词详解",
        data: [
          {
            title: "核心含义",
            content: "<b>adj. 通常的；平常的；惯常的</b><br>修饰名词，表符合日常习惯、常态化的状态。"
          },
          {
            title: "含义",
            content: "形容词（adj.）文中意思 + 常用意思：通常的；平常的；惯常的（符合日常习惯的）<br>英文释义：Happening or done most of the time; normal.<br>情景解释：I eat my usual breakfast at 7 o’clock.（我通常7点吃早餐。）"
          },
          {
            title: "书本原句",
            content: "Drake ate some carrots and chicken-but only about half as much as usual.（德雷克吃了些胡萝卜和鸡肉——但只有平时的一半左右。）"
          },
          {
            title: "常见用法",
            content: "（adj.）as usual（像往常一样）：She got up early as usual.（她像往常一样早起。）<br>（adj.）usual time（平常的时间）：We meet at the usual time after school.（我们放学后在平常的时间见面。）<br>（adj.）usual place（惯常的地方）：Let’s meet at our usual place.（我们在老地方见。）<br>（adj.）usual food（平常吃的食物）：My usual food for lunch is rice and vegetables.（我午餐通常吃米饭和蔬菜。）"
          },
          {
            title: "例句",
            content: "（adj.）He took his usual seat by the window.（他坐在了他惯常的靠窗座位。）<br>（adj.）It’s not usual for her to be late.（她迟到是不常见的。）<br>（adj.）The weather is better than usual today.（今天的天气比平时好。）"
          },
          {
            title: "避免用错",
            content: "usual 是形容词（adj.），常用搭配“as usual”，不要说“usual as”（错误），正确：as usual（√）。<br><br>不要混淆 usual 和 common，usual 侧重“个人习惯上的平常”，common 侧重“普遍存在的常见”，比如“常见的错误”是 common mistakes，“平常的路线”是 usual route。"
          }
        ]
      },
      {
        type: "quiz",
        title: "挑战一下",
        data: {
          question: "Drake was sad and ate only half the food he eats ______.",
          options: ["as usual", "as common", "usual as", "common as"],
          answerIndex: 0
        }
      }
    ]
  },
  {
    uid: "w042",
    word: "fabric",
    chapterId: "dm1-c5",
    order: 5,
    phonetic: "/ˈfæbrɪk/",
    pos: "n.",
    tabs: [
      { type: "image", title: "图片", data: ["wordpic/fabric.png"] },
      {
        type: "text",
        title: "单词详解",
        data: [
          {
            title: "核心含义",
            content: "<b>n. 织物；布料；面料</b><br>可数/不可数名词，表制作衣物、窗帘等的纺织材料。"
          },
          {
            title: "含义",
            content: "名词（n.）文中意思 + 常用意思：织物；布料；面料（制作衣服、窗帘等的材料）<br>英文释义：Material made from threads, used for making clothes, curtains, etc.<br>情景解释：This dress is made of soft fabric.（这条裙子是用柔软的布料做的。）"
          },
          {
            title: "书本原句",
            content: "My father sells beautiful fabrics, she said.（“我爸爸卖漂亮的布料，”她说。）"
          },
          {
            title: "常见用法",
            content: "（n.）soft fabric（柔软的布料）：The toy is covered with soft fabric.（这个玩具外面包着柔软的布料。）<br>（n.）beautiful fabrics（漂亮的面料）：The store sells all kinds of beautiful fabrics.（这家店卖各种各样漂亮的面料。）<br>（n.）cotton fabric（棉织物）：Cotton fabric is good for summer clothes.（棉织物适合做夏装。）<br>（n.）colorful fabrics（彩色面料）：She bought colorful fabrics to make a quilt.（她买了彩色面料做被子。）"
          },
          {
            title: "例句",
            content: "（n.）Mom chose a red fabric to make a skirt for me.（妈妈选了一块红色面料给我做裙子。）<br>（n.）This fabric feels smooth and comfortable.（这种面料摸起来顺滑又舒服。）<br>（n.）The curtains are made of thick fabric.（窗帘是用厚面料做的。）"
          },
          {
            title: "避免用错",
            content: "fabric 是可数或不可数名词，表“某种面料”时可数（fabrics），表“面料总称”时不可数，不要说“a fabric cloth”（重复），正确：a piece of fabric（一块面料）。<br><br>不要混淆 fabric 和 cloth，fabric 侧重“经过加工的织物、面料”，cloth 侧重“未裁剪的布料、坯布”，比如“一块棉布”是 a piece of cotton cloth，“一块丝绸面料”是 a piece of silk fabric。"
          }
        ]
      },
      {
        type: "quiz",
        title: "挑战一下",
        data: {
          question: "The girl’s mother buys different kinds of beautiful ______ to make clothes for her family.",
          options: ["food", "fabric", "toys", "books"],
          answerIndex: 1
        }
      }
    ]
  },
  {
    uid: "w043",
    word: "far-away",
    chapterId: "dm1-c5",
    order: 6,
    phonetic: "/ˌfɑːr əˈweɪ/",
    pos: "adj.",
    tabs: [
      { type: "image", title: "图片", data: ["wordpic/far away.png"] },
      {
        type: "text",
        title: "单词详解",
        data: [
          {
            title: "核心含义",
            content: "<b>adj. 遥远的；远方的</b><br>复合形容词，修饰名词，表距离很远的状态。"
          },
          {
            title: "含义",
            content: "形容词（adj.）文中意思 + 常用意思：遥远的；远方的（距离很远的）<br>英文释义：Very far in distance; distant.<br>情景解释：My uncle lives in a far-away city.（我叔叔住在一个遥远的城市。）"
          },
          {
            title: "书本原句",
            content: "He travels all over far-away lands selling them.（他游历世界各地遥远的地方售卖它们。）"
          },
          {
            title: "常见用法",
            content: "（adj.）far-away lands（遥远的地方）：Stories often talk about far-away lands.（故事里经常提到遥远的地方。）<br>（adj.）far-away city（遥远的城市）：We visited a far-away city last summer.（去年夏天我们去了一个遥远的城市。）<br>（adj.）far-away friends（远方的朋友）：I write letters to my far-away friends.（我给远方的朋友写信。）<br>（adj.）far-away mountain（远山）：We can see far-away mountains from the window.（从窗户能看到远山。）"
          },
          {
            title: "例句",
            content: "（adj.）She dreams of visiting far-away countries.（她梦想去游览遥远的国家。）<br>（adj.）The stars look like far-away lights in the sky.（星星在天上像遥远的灯光。）<br>（adj.）It takes a long time to get to that far-away village.（去那个遥远的村庄要花很长时间。）"
          }
        ]
      },
      {
        type: "quiz",
        title: "挑战一下",
        data: {
          question: "The merchant travels to many ______ countries to sell his beautiful fabrics.",
          options: ["near", "far-away", "small", "big"],
          answerIndex: 1
        }
      }
    ]
  },
  {
    uid: "w044",
    word: "hold",
    chapterId: "dm1-c5",
    order: 7,
    phonetic: "/həʊld/",
    pos: "vt./vi./n.",
    tabs: [
      { type: "image", title: "图片", data: ["wordpic/hold.png"] },
      {
        type: "text",
        title: "单词详解",
        data: [
          {
            title: "核心含义",
            content: "<b>v. 拿着；握住；抱住；举办；n. 抓住；握住；支撑</b><br>动词表用手支撑/组织活动，名词表抓握的动作或支撑力。"
          },
          {
            title: "含义",
            content: "动词（v.）文中意思 + 常用意思：拿着；握住；抱住；举办（用手或手臂支撑某物；组织活动）<br>英文释义：To take and keep something in your hand or arms; to organize an event.<br>情景解释：Hold your backpack when you walk.（走路时拿着你的书包。）<br><br>名词（n.）常用意思：抓住；握住；支撑（抓握的动作；支撑的力量）<br>英文释义：The act of holding something; a grip or support.<br>情景解释：He kept a tight hold on the rope.（他紧紧抓住绳子。）"
          },
          {
            title: "书本原句",
            content: "He holds a king's body after he dies.（他死后，金字塔里安放着他的遗体。）（注：此处 hold 意为“安放、容纳”，贴合核心含义延伸）"
          },
          {
            title: "常见用法",
            content: "（v.）hold sth in hand（手里拿着某物）：She held a book in her hand.（她手里拿着一本书。）<br>（v.）hold sb in arms（抱住某人）：Mom held the baby in her arms.（妈妈把宝宝抱在怀里。）<br>（v.）hold a party（举办派对）：We will hold a birthday party for her.（我们会为她举办生日派对。）<br>（n.）have a hold on（抓住）：He has a firm hold on the rope.（他紧紧抓住绳子。）"
          },
          {
            title: "例句",
            content: "（v.）Hold the door open for me, please.（请帮我扶住门。）<br>（n.）She kept a tight hold on her dad’s hand in the crowd.（在人群中她紧紧抓住爸爸的手。）<br>（v.）The school will hold a sports meeting next month.（学校下个月会举办运动会。）"
          },
          {
            title: "避免用错",
            content: "hold 作动词时，过去式和过去分词是 held（√），不要写成“holded”（错误）。"
          }
        ]
      },
      {
        type: "quiz",
        title: "挑战一下",
        data: {
          question: "The children ______ a small party to celebrate the dragon’s recovery.",
          options: ["held", "holded", "took", "made"],
          answerIndex: 0
        }
      }
    ]
  },
  {
    uid: "w045",
    word: "argue",
    chapterId: "dm1-c5",
    order: 8,
    phonetic: "/ˈɑːɡjuː/",
    pos: "vi.",
    tabs: [
      { type: "image", title: "图片", data: ["wordpic/argue.png"] },
      {
        type: "text",
        title: "单词详解",
        data: [
          {
            title: "核心含义",
            content: "<b>vi. 争论；争辩；争吵</b><br>不及物动词，后接宾语需搭配介词，表因意见不同产生争执。"
          },
          {
            title: "含义",
            content: "动词（v.）文中意思 + 常用意思：争论；争辩；争吵（因意见不同而争论）<br>英文释义：To disagree with someone in words; to have a quarrel.<br>情景解释：Don’t argue with your friends over small things.（不要因为小事和朋友争论。）"
          },
          {
            title: "书本原句",
            content: "That is why my father did not argue when King Roland's men came for me.（这就是为什么当罗兰德国王的人来接我时，我爸爸没有反对。）"
          },
          {
            title: "常见用法",
            content: "（v.）argue with sb（和某人争论）：He argued with his sister about the toy.（他和妹妹为了玩具争吵。）<br>（v.）argue about sth（为某事争论）：They argued about where to go for dinner.（他们为了晚餐去哪里而争论。）<br>（v.）argue against（反对）：She argued against staying late.（她反对熬夜。）<br>（v.）argue for（支持）：He argued for his plan to the teacher.（他向老师说明自己的计划以争取支持。）"
          },
          {
            title: "例句",
            content: "（v.）We shouldn’t argue with our parents.（我们不应该和父母争吵。）<br>（v.）They argued for a long time but didn’t agree.（他们争论了很久但没有达成一致。）<br>（v.）She argued that the story was true.（她争辩说这个故事是真的。）"
          },
          {
            title: "避免用错",
            content: "argue 是动词（v.），常用搭配“argue with sb about sth”，不要说“argue sb about sth”（错误），正确：argue with sb about sth（√）。<br><br>不要混淆 argue 和 quarrel，argue 侧重“因意见不同而争论”，quarrel 侧重“因小事而争吵”，比如“为政治观点争论”是 argue about politics，“为家务争吵”是 quarrel over housework。"
          }
        ]
      },
      {
        type: "quiz",
        title: "挑战一下",
        data: {
          question: "It's not polite to ______ with your classmates about small things in class.",
          options: ["talk", "argue", "play", "study"],
          answerIndex: 1
        }
      }
    ]
  },
  {
    uid: "w046",
    word: "homesick",
    chapterId: "dm1-c5",
    order: 9,
    phonetic: "/ˈhəʊmsɪk/",
    pos: "adj.",
    tabs: [
      { type: "image", title: "图片", data: ["wordpic/homesick.png"] },
      {
        type: "text",
        title: "单词详解",
        data: [
          {
            title: "核心含义",
            content: "<b>adj. 想家的；思乡的</b><br>修饰人，表因远离家乡而产生的思念情绪。"
          },
          {
            title: "含义",
            content: "形容词（adj.）文中意思 + 常用意思：想家的；思乡的（因远离家乡而想念）<br>英文释义：Sad because you are away from home and miss your family.<br>情景解释：I felt homesick when I stayed at my grandma’s for a week.（我在奶奶家待了一周，很想家。）"
          },
          {
            title: "书本原句",
            content: "I guess everyone else is just as homesick as I am, Drake thought.（“我猜其他人也和我一样想家，”德雷克想。）"
          },
          {
            title: "常见用法",
            content: "（adj.）feel homesick（感到想家）：She felt homesick on her first day at school.（她上学第一天就感到想家。）<br>（adj.）very homesick（非常想家）：He was very homesick when he traveled alone.（他独自旅行时非常想家。）<br>（adj.）a homesick child（想家的孩子）：The homesick child called his mom every night.（这个想家的孩子每天晚上都给妈妈打电话。）<br>（adj.）homesick for（思念……）：She was homesick for her hometown food.（她想念家乡的食物。）"
          },
          {
            title: "例句",
            content: "（adj.）Many students feel homesick when they first live at school.（很多学生第一次住校时会想家。）<br>（adj.）Looking at photos made her more homesick.（看照片让她更想家了。）<br>（adj.）He became homesick after being away for a month.（离开一个月后，他开始想家了。）"
          },
          {
            title: "避免用错",
            content: "常用搭配“feel homesick”“be homesick for sth”，不要说“homesick of”（错误），正确：homesick for（√）。"
          }
        ]
      },
      {
        type: "quiz",
        title: "挑战一下",
        data: {
          question: "Drake felt ______ because he was far away from his family and home.",
          options: ["happy", "homesick", "angry", "excited"],
          answerIndex: 1
        }
      }
    ]
  },
  {
    uid: "w047",
    word: "tomb",
    chapterId: "dm1-c5",
    order: 10,
    phonetic: "/tuːm/",
    pos: "n.",
    tabs: [
      { type: "image", title: "图片", data: ["wordpic/tomb.png"] },
      {
        type: "text",
        title: "单词详解",
        data: [
          {
            title: "核心含义",
            content: "<b>n. 坟墓；墓穴；冢</b><br>可数名词，表安放死者遗体的地方，尤指石质大型墓葬。"
          },
          {
            title: "含义",
            content: "名词（n.）文中意思 + 常用意思：坟墓；墓穴；冢（安放死者遗体的地方）<br>英文释义：A place where a dead person is buried, especially a large stone structure.<br>情景解释：The king’s tomb is inside the pyramid.（国王的坟墓在金字塔里面。）"
          },
          {
            title: "书本原句",
            content: "He dreamed of rivers and big tombs shaped like triangles.（他梦见了河流和三角形的大坟墓。）"
          },
          {
            title: "常见用法",
            content: "（n.）king’s tomb（国王的坟墓）：People visited the ancient king’s tomb.（人们参观了这座古老的国王坟墓。）<br>（n.）pyramid tomb（金字塔形坟墓）：The pyramid is a famous tomb.（金字塔是一座著名的坟墓。）<br>（n.）ancient tomb（古墓）：Archaeologists found an ancient tomb.（考古学家发现了一座古墓。）<br>（n.）stone tomb（石墓）：The dead was buried in a stone tomb.（死者被安葬在一座石墓里。）"
          },
          {
            title: "例句",
            content: "（n.）The tomb was filled with valuable things.（这座坟墓里装满了珍贵的东西。）<br>（n.）We learned about ancient tombs in history class.（我们在历史课上学到了关于古墓的知识。）<br>（n.）The tomb is protected by the government.（这座坟墓受政府保护。）"
          }
        ]
      },
      {
        type: "quiz",
        title: "挑战一下",
        data: {
          question: "In his dream, Drake saw big ______ shaped like triangles in the far-away land.",
          options: ["parks", "tombs", "houses", "schools"],
          answerIndex: 1
        }
      }
    ]
  },
  // ================================= Chapter 6 (dm1-c6) 完整版 =================================
  // ================================= Chapter 6 (dm1-c6) 完整版 =================================
  {
    uid: "w048",
    word: "dull",
    chapterId: "dm1-c6",
    order: 1,
    phonetic: "/dʌl/",
    pos: "adj.",
    tabs: [
      { type: "image", title: "图片", data: ["wordpic/dull.png"] },
      {
        type: "text",
        title: "单词详解",
        data: [
          {
            title: "核心含义",
            content: "<b>adj. 暗淡的；无光泽的；迟钝的；沉闷的</b><br>可形容颜色、光泽、头脑或氛围，表不鲜明、不灵敏或压抑的状态。"
          },
          {
            title: "含义",
            content: "形容词（adj.）文中意思 + 常用意思：暗淡的；无光泽的；迟钝的（颜色、光泽不鲜明；反应不灵敏）<br>英文释义：Not bright or shiny; slow to understand or react.<br>情景解释：The old toy car has a dull color.（这辆旧玩具车的颜色很暗淡。）"
          },
          {
            title: "书本原句",
            content: "Her scales looked dull. She looked thin and pale.（她的鳞片看起来毫无光泽，人又瘦又苍白。）"
          },
          {
            title: "常见用法",
            content: "（adj.）dull color（暗淡的颜色）：The wall is painted a dull gray.（这面墙刷成了暗淡的灰色。）<br>（adj.）dull shine（微弱的光泽）：The metal has a dull shine after being used.（这块金属用过后只有微弱的光泽。）<br>（adj.）dull mind（迟钝的头脑）：He is not dull—he just needs more time to think.（他不迟钝，只是需要更多时间思考。）<br>（adj.）dull sound（沉闷的声音）：We heard a dull thud from the next room.（我们听到隔壁房间传来一声沉闷的重击声。）"
          },
          {
            title: "例句",
            content: "（adj.）The diamond looks dull because it’s dirty.（这颗钻石因为脏了，看起来毫无光泽。）<br>（adj.）Don’t be dull—try to solve the problem creatively.（别那么迟钝，试着用创造性的方法解决问题。）<br>（adj.）The dull weather made everyone feel sleepy.（沉闷的天气让每个人都觉得犯困。）"
          },
          {
            title: "避免用错",
            content: "dull 是形容词（adj.），不要混淆其不同含义，需结合语境判断（颜色/光泽/反应/氛围）。"
          }
        ]
      },
      {
        type: "quiz",
        title: "挑战一下",
        data: {
          question: "Kepri’s scales looked ______ because she was sick and weak from the dark magic.",
          options: ["bright", "dull", "shiny", "colorful"],
          answerIndex: 1
        }
      }
    ]
  },
  {
    uid: "w049",
    word: "startle",
    chapterId: "dm1-c6",
    order: 2,
    phonetic: "/ˈstɑːtl/",
    pos: "vt./vi.",
    tabs: [
      { type: "image", title: "图片", data: ["wordpic/startle.png"] },
      {
        type: "text",
        title: "单词详解",
        data: [
          {
            title: "核心含义",
            content: "<b>vt./vi. 使吃惊；惊吓；受惊</b><br>及物动词表使他人受惊，不及物动词表自身突然吃惊，多形容突发的惊吓。"
          },
          {
            title: "含义",
            content: "及物动词（vt.）/ 不及物动词（vi.）文中意思 + 常用意思：使吃惊；惊吓；受惊（突然受到惊吓；使他人突然吃惊）<br>英文释义：To surprise someone suddenly; to be surprised suddenly.<br>情景解释：A loud thunder can startle you.（一声响雷会吓你一跳。）"
          },
          {
            title: "书本原句",
            content: "Startled, his friends obeyed.（他的朋友们吃了一惊，但还是照做了。）"
          },
          {
            title: "常见用法",
            content: "（vt.）startle sb（使某人吃惊）：The sudden noise startled the baby.（突然的声响吓到了宝宝。）<br>（vi.）startle at sth（因某事受惊）：She startled at the sight of the snake.（她看到蛇时吓了一跳。）<br>（vt.）startle sb by doing sth（通过做某事使某人吃惊）：He startled us by jumping out from behind the door.（他从门后跳出来，吓了我们一跳。）<br>（adj.）startled look（吃惊的表情）：She had a startled look on her face.（她脸上露出吃惊的表情。）"
          },
          {
            title: "例句",
            content: "（vt.）The cat startled the bird away with a sudden move.（猫突然一动，把鸟吓跑了。）<br>（vi.）I often startle at unexpected phone calls.（我经常被突然的电话吓一跳。）<br>（vt.）Her loud laugh startled everyone in the room.（她响亮的笑声让房间里的每个人都吃了一惊。）"
          },
          {
            title: "避免用错",
            content: "startle 作及物动词时，直接接宾语（startle sb），作不及物动词时需加介词 at（startle at sth），不要说“startle with sb”（错误）。"
          }
        ]
      },
      {
        type: "quiz",
        title: "挑战一下",
        data: {
          question: "The sudden roar of the dragon ______ all the little animals in the forest.",
          options: ["calmed", "startled", "pleased", "relaxed"],
          answerIndex: 1
        }
      }
    ]
  },
  {
    uid: "w050",
    word: "obey",
    chapterId: "dm1-c6",
    order: 3,
    phonetic: "/əˈbeɪ/",
    pos: "v.",
    tabs: [
      { type: "image", title: "图片", data: ["wordpic/obey.png"] },
      {
        type: "text",
        title: "单词详解",
        data: [
          {
            title: "核心含义",
            content: "<b>v. 服从；遵守；听从</b><br>表按照他人的命令、要求或既定的规则、法律行事。"
          },
          {
            title: "含义",
            content: "动词（v.）文中意思 + 常用意思：服从；遵守；听从（按照他人的命令或规则行事）<br>英文释义：To do what someone tells you to do; to follow a rule or law.<br>情景解释：Obey the traffic rules when crossing the street.（过马路时要遵守交通规则。）"
          },
          {
            title: "书本原句",
            content: "Startled, his friends obeyed.（他的朋友们吃了一惊，但还是照做了。）"
          },
          {
            title: "常见用法",
            content: "（v.）obey sb（服从某人）：Children should obey their parents.（孩子们应该听从父母的话。）<br>（v.）obey rules（遵守规则）：Everyone must obey school rules.（每个人都必须遵守校规。）<br>（v.）obey orders（听从命令）：The soldiers obeyed the general’s orders.（士兵们听从了将军的命令。）<br>（v.）obey the law（遵守法律）：Adults must obey the law.（成年人必须遵守法律。）"
          },
          {
            title: "例句",
            content: "（v.）Obey the teacher and sit down quietly.（听老师的话，安静坐下。）<br>（v.）The dog obeys its owner’s commands quickly.（这只狗能快速听从主人的指令。）<br>（v.）We should obey the rules to keep safe.（我们应该遵守规则以保证安全。）"
          },
          {
            title: "避免用错",
            content: "obey 是动词（v.），常用搭配“obey sb/sth”，不要说“obey to sb”（错误），正确：obey sb（√）。"
          }
        ]
      },
      {
        type: "quiz",
        title: "挑战一下",
        data: {
          question: "All the soldiers must ______ the general’s orders in the battle against the dark wizard.",
          options: ["refuse", "obey", "argue", "ignore"],
          answerIndex: 1
        }
      }
    ]
  },
  // ================================= Chapter 7 (dm1-c7) 完整版 =================================
  {
    uid: "w051",
    word: "flip-flop",
    chapterId: "dm1-c7",
    order: 1,
    phonetic: "/ˈflɪp flɒp/",
    pos: "n.",
    tabs: [
      { type: "image", title: "图片", data: ["wordpic/flip-flop.png"] },
      {
        type: "text",
        title: "单词详解",
        data: [
          {
            title: "核心含义",
            content: "<b>n. 翻来覆去；辗转反侧；心里七上八下</b><br>文中为比喻义，表身体或情绪的不安、悸动，非本义“人字拖”。"
          },
          {
            title: "含义",
            content: "名词（n.）文中意思 + 常用意思：翻来覆去；辗转反侧（身体或内心的不安感；也指人字拖，文中取前者）<br>英文释义：A feeling of unease or a quick back-and-forth movement; also a type of sandal (not in this book’s context).<br>情景解释：Your stomach does a flip-flop when you’re nervous.（紧张时肚子会翻来覆去。）"
          },
          {
            title: "书本原句",
            content: "His stomach did a flip-flop.（他的肚子翻江倒海。）"
          },
          {
            title: "常见用法",
            content: "（n.）stomach flip-flop（肚子翻江倒海）：The scary movie gave me a stomach flip-flop.（这部恐怖片让我肚子翻来覆去。）<br>（n.）do a flip-flop（翻来覆去）：She did a flip-flop when she heard the surprise.（听到这个惊喜，她心里七上八下。）<br>（n.）nervous flip-flop（紧张导致的辗转反侧）：He felt a nervous flip-flop before the test.（考试前他感到紧张不安，心里发慌。）<br>（n.）emotional flip-flop（情绪上的起伏）：Her mood did a flip-flop after the good news.（听到好消息后，她的情绪大起大落。）"
          },
          {
            title: "例句",
            content: "（n.）I got a stomach flip-flop when I stood on the stage for the first time.（第一次站在舞台上时，我肚子里翻来覆去。）<br>（n.）The sudden noise made my heart do a flip-flop.（突然的声响让我心里一惊，怦怦直跳。）<br>（n.）He felt a flip-flop of excitement when he saw the magic dragon.（看到魔法龙时，他感到一阵兴奋的悸动。）"
          },
          {
            title: "避免用错",
            content: "flip-flop 作“翻来覆去”时是可数名词，不要与动词 flip（翻转）混淆，比如“翻转书页”是 flip the page（v.），“肚子翻覆”是 a stomach flip-flop（n.）。<br><br>注意语境区分：flip-flop 也可指“人字拖”，但文中是比喻义“翻来覆去”，避免误解为衣物。"
          }
        ]
      },
      {
        type: "quiz",
        title: "挑战一下",
        data: {
          question: "Drake’s stomach did a ______ when he saw the dark magic fog in the far-away forest.",
          options: ["flip-flop", "smile", "song", "shout"],
          answerIndex: 0
        }
      }
    ]
  },
  {
    uid: "w052",
    word: "pathway",
    chapterId: "dm1-c7",
    order: 2,
    phonetic: "/ˈpɑːθweɪ/",
    pos: "n.",
    tabs: [
      { type: "image", title: "图片", data: ["wordpic/pathway.png"] },
      {
        type: "text",
        title: "单词详解",
        data: [
          {
            title: "核心含义",
            content: "<b>n. 小路；路径；通道</b><br>指有铺设或规划的、供人行走的窄路，比path更侧重“规整的小径”。"
          },
          {
            title: "含义",
            content: "名词（n.）文中意思 + 常用意思：小路；路径；通道（供人行走的窄路）<br>英文释义：A narrow path for walking; a route or way.<br>情景解释：Walk along the pathway in the park.（沿着公园的小路走。）"
          },
          {
            title: "书本原句",
            content: "Worm, Kepri, and the Dragon Masters were standing on a pathway.（沃姆、凯普丽和龙法师们站在一条小路上。）"
          },
          {
            title: "常见用法",
            content: "（n.）stone pathway（石头小路）：We walked on the stone pathway to the garden.（我们走在石头小路上前往花园。）<br>（n.）narrow pathway（狭窄路径）：The narrow pathway leads to the mountain top.（这条狭窄的小路通往山顶。）<br>（n.）grass pathway（草地小径）：The grass pathway is soft under our feet.（草地小径踩起来软软的。）<br>（n.）pathway through the forest（穿过森林的小路）：They followed the pathway through the quiet forest.（他们沿着穿过寂静森林的小路走。）"
          },
          {
            title: "例句",
            content: "（n.）The pathway is lined with colorful flowers on both sides.（小路两旁种满了五颜六色的花。）<br>（n.）We lost our way but found a quiet pathway to the village.（我们迷路了，但找到了一条通往村庄的幽静小路。）<br>（n.）She picked up beautiful leaves along the forest pathway.（她沿着森林小路捡漂亮的树叶。）"
          },
          {
            title: "避免用错",
            content: "pathway 是可数名词，复数形式是 pathways（√），不要与 path 混淆：pathway 更侧重“有铺设或规划的小路”，path 泛指“任何路径”，比如“泥泞的小径”是 a muddy path，“铺设的石板路”是 a stone pathway。<br><br>不要说“pathway road”（重复），正确：pathway（√）或 path（√）。"
          }
        ]
      },
      {
        type: "quiz",
        title: "挑战一下",
        data: {
          question: "Worm and Kepri stood on a stone ______ that led to the center of the magic forest.",
          options: ["river", "pathway", "mountain", "tree"],
          answerIndex: 1
        }
      }
    ]
  },
  {
    uid: "w053",
    word: "homeland",
    chapterId: "dm1-c7",
    order: 3,
    phonetic: "/ˈhəʊmlænd/",
    pos: "n.",
    tabs: [
      { type: "image", title: "图片", data: ["wordpic/homeland.png"] },
      {
        type: "text",
        title: "单词详解",
        data: [
          {
            title: "核心含义",
            content: "<b>n. 祖国；故乡；故土</b><br>指出生的国家或有深厚情感的大范围地区，区别于具体的出生城镇hometown。"
          },
          {
            title: "含义",
            content: "名词（n.）文中意思 + 常用意思：祖国；故乡；故土（出生或有深厚感情的国家/地区）<br>英文释义：The country or region where someone was born or has deep roots.<br>情景解释：My grandma misses her homeland far away.（奶奶想念远方的故乡。）"
          },
          {
            title: "书本原句",
            content: "Ana turned to her 'I think we are in my homeland.'（安娜转向她说：“我想我们在我的祖国。”）"
          },
          {
            title: "常见用法",
            content: "（n.）one’s homeland（某人的故乡）：He is proud of his homeland’s magic culture.（他为故乡的魔法文化感到自豪。）<br>（n.）return to homeland（回到祖国）：Her parents decided to return to their homeland after years abroad.（她的父母在国外多年后决定回到祖国。）<br>（n.）distant homeland（遥远的故土）：They talked about their distant homeland every night before sleep.（他们每晚睡前都谈论遥远的故土。）<br>（n.）love for homeland（对祖国的热爱）：His songs are full of love for his magical homeland.（他的歌里充满了对魔法故乡的热爱。）"
          },
          {
            title: "例句",
            content: "（n.）She left her homeland with her family when she was ten years old.（她十岁时和家人离开了故乡。）<br>（n.）People often visit their homeland during the holiday to see relatives.（人们常在假期回故乡看望亲人。）<br>（n.）The book tells wonderful stories about his homeland’s dragon history.（这本书讲述了他故乡关于龙的精彩历史故事。）"
          },
          {
            title: "避免用错",
            content: "homeland 是可数名词，复数形式 homelands（√），不要与 hometown 混淆：homeland 指“国家或大范围的故土”，hometown 指“具体的出生城镇”，比如“我的故乡是北京”是 My hometown is Beijing，“他热爱祖国”是 He loves his homeland。<br><br>不要说“my homeland country”（重复），正确：my homeland（√）。"
          }
        ]
      },
      {
        type: "quiz",
        title: "挑战一下",
        data: {
          question: "Ana was so happy when she realized she and her friends were in her ______ with many magic dragons.",
          options: ["hometown", "homeland", "school", "castle"],
          answerIndex: 1
        }
      }
    ]
  },
  {
    uid: "w054",
    word: "language",
    chapterId: "dm1-c7",
    order: 4,
    phonetic: "/ˈlæŋɡwɪdʒ/",
    pos: "n.",
    tabs: [
      { type: "image", title: "图片", data: ["wordpic/language.png"] },
      {
        type: "text",
        title: "单词详解",
        data: [
          {
            title: "核心含义",
            content: "<b>n. 语言；话语；表达方式</b><br>可指交流用的语言体系，也可指肢体、文字等表达形式，可数/不可数均可。"
          },
          {
            title: "含义",
            content: "名词（n.）文中意思 + 常用意思：语言；话语；表达方式（用于交流的声音、文字或手势）<br>英文释义：A system of words and sounds used for communication; words or way of expressing.<br>情景解释：We use language to talk to friends.（我们用语言和朋友交流。）"
          },
          {
            title: "书本原句",
            content: "Drake didn't understand the language.（德雷克听不懂这种语言。）"
          },
          {
            title: "常见用法",
            content: "（n.）speak a language（说一种语言）：She can speak three magic languages.（她会说三种魔法语言。）<br>（n.）foreign language（外语）：We learn a foreign language at the magic school.（我们在魔法学校学一门外语。）<br>（n.）body language（肢体语言）：Smiling is a friendly body language for dragons and humans.（微笑对龙和人类来说都是友好的肢体语言。）<br>（n.）use simple language（用简单的语言）：Please use simple language to explain the magic spell.（请用简单的语言解释这个魔法咒语。）"
          },
          {
            title: "例句",
            content: "（n.）English is a popular language used all over the world.（英语是世界上广泛使用的语言。）<br>（n.）He uses sign language to talk to the deaf wizards in the castle.（他用手语和城堡里的聋哑巫师交流。）<br>（n.）The dragon story is written in simple language for little kids.（这个龙的故事用简单的语言写给小朋友看。）"
          },
          {
            title: "避免用错",
            content: "language 是可数名词，复数形式 languages（√），表示“某种语言”时加 a，泛指“语言”时不加，比如“语言很重要”是 Language is important，“学一门魔法语言”是 learn a magic language。<br><br>不要混淆 language 和 speech，language 指“语言体系”，speech 指“具体的讲话或发言”，比如“他的魔法演讲很精彩”是 His magic speech is wonderful，“她精通多种语言”是 She is good at many languages。"
          }
        ]
      },
      {
        type: "quiz",
        title: "挑战一下",
        data: {
          question: "Drake didn't understand the ______ spoken by the magic dragons in Ana's homeland.",
          options: ["story", "language", "song", "game"],
          answerIndex: 1
        }
      }
    ]
  },
  // ================================= Chapter 8 (dm1-c8) 完整版 =================================
     // ================================= Chapter 8 (dm1-c8) 完整版 =================================
  {
    uid: "w055",
    word: "reveal",
    chapterId: "dm1-c8",
    order: 1,
    phonetic: "/rɪˈviːl/",
    pos: "vt.",
    tabs: [
      { type: "image", title: "图片", data: ["wordpic/reveal.png"] },
      {
        type: "text",
        title: "单词详解",
        data: [
          {
            title: "核心含义",
            content: "<b>vt. 显露；揭示；展现</b><br>及物动词，专指让原本隐藏、未知的人/物/真相显现出来。"
          },
          {
            title: "含义",
            content: "及物动词（vt.）文中意思 + 常用意思：显露；揭示；展现（让之前隐藏的事物显现出来）<br>英文释义：To make something hidden become visible or known.<br>情景解释：Opening a box will reveal what’s inside.（打开盒子会显露里面的东西。）"
          },
          {
            title: "书本原句",
            content: "He touched the pyramid. One of the big stones pushed in, revealing an opening.（他按了按金字塔，一块大石头陷了进去，露出一个入口。）"
          },
          {
            title: "常见用法",
            content: "（vt.）reveal a secret（揭露秘密）：She promised not to reveal his secret.（她答应不揭露他的秘密。）<br>（vt.）reveal an opening（显露入口）：The moving stone revealed a dark opening.（移动的石头露出一个黑暗的入口。）<br>（vt.）reveal the truth（揭示真相）：The test will reveal the truth about the story.（这个测试会揭示故事的真相。）<br>（vt.）reveal a surprise（展现惊喜）：Her smile revealed a big surprise.（她的微笑展现了一个大惊喜。）"
          },
          {
            title: "例句",
            content: "（vt.）The curtain opened to reveal a beautiful magic stage.（幕布拉开，露出一个漂亮的魔法舞台。）<br>（vt.）He lifted the lid to reveal fresh magic cookies.（他掀开盖子，露出新鲜的魔法饼干。）<br>（vt.）The old map revealed a hidden path in the dark forest.（旧地图揭示了森林里一条隐藏的小路。）"
          },
          {
            title: "避免用错",
            content: "reveal 是及物动词（vt.），直接接宾语，不要说“reveal out sth”（错误），正确：reveal sth（√）。<br><br>不要混淆 reveal 和 show，reveal 侧重“让隐藏、未知的事物显现”，show 侧重“主动展示已知事物”，比如“展示照片”是 show photos，“揭露真相”是 reveal the truth。"
          }
        ]
      },
      {
        type: "quiz",
        title: "挑战一下",
        data: {
          question: "The moving stone on the pyramid ______ a dark opening to the secret tomb.",
          options: ["hid", "revealed", "covered", "closed"],
          answerIndex: 1
        }
      }
    ]
  },
  {
    uid: "w056",
    word: "nudge",
    chapterId: "dm1-c8",
    order: 2,
    phonetic: "/nʌdʒ/",
    pos: "vt./vi.",
    tabs: [
      { type: "image", title: "图片", data: ["wordpic/nudge.png"] },
      {
        type: "text",
        title: "单词详解",
        data: [
          {
            title: "核心含义",
            content: "<b>vt./vi. 轻推；用肘轻碰</b><br>指用手、肘或鼻子等轻轻推，多为提醒、促使对方注意，动作轻柔。"
          },
          {
            title: "含义",
            content: "及物动词（vt.）/ 不及物动词（vi.）文中意思 + 常用意思：轻推；用肘轻碰（用手或肘轻轻推某人以提醒或促使）<br>英文释义：To push someone gently with your hand or elbow, especially to get their attention.<br>情景解释：Nudge your friend to remind him it’s time to go.（轻推你的朋友，提醒他该走了。）"
          },
          {
            title: "书本原句",
            content: "Kepri was weak, but Worm nudged her gently with his nose.（凯普丽很虚弱，但沃姆用鼻子轻轻推了推她。）"
          },
          {
            title: "常见用法",
            content: "（vt.）nudge sb gently（轻轻推某人）：Mom nudged me gently to say hello to the wizard.（妈妈轻轻推了我一下，让我向巫师打招呼。）<br>（vt.）nudge sb with sth（用某物轻推某人）：He nudged his sister with his elbow to see the dragon.（他用胳膊肘轻碰了妹妹一下，让她看那条龙。）<br>（vi.）nudge forward（慢慢前移）：The crowd nudged forward to see the magic show.（人群慢慢前移，想看清楚魔法表演。）<br>（vt.）nudge sb to do sth（轻推某人做某事）：She nudged him to answer the wizard’s question.（她轻推他，让他回答巫师的问题。）"
          },
          {
            title: "例句",
            content: "（vt.）The little cat nudged the ball with its paw and played with it.（小猫用爪子轻轻推了推球，玩了起来。）<br>（vt.）I nudged my brother to tell him the teacher was looking at us.（我轻推哥哥，告诉他老师在看我们。）<br>（vi.）We nudged forward slowly in the busy magic market.（我们在拥挤的魔法市场里慢慢前移。）"
          },
          {
            title: "避免用错",
            content: "nudge 侧重“轻柔的推”，不要与 push 混淆，push 是“用力推”，比如“用力推门”是 push the door hard，“轻轻推朋友”是 nudge a friend gently。<br><br>作及物动词时直接接宾语，不要说“nudge at sb”（错误），正确：nudge sb（√）。"
          }
        ]
      },
      {
        type: "quiz",
        title: "挑战一下",
        data: {
          question: "Worm ______ Kepri gently with his nose to encourage her to walk forward.",
          options: ["pushed", "nudged", "hit", "beat"],
          answerIndex: 1
        }
      }
    ]
  },
  {
    uid: "w057",
    word: "dangle",
    chapterId: "dm1-c8",
    order: 3,
    phonetic: "/ˈdæŋɡl/",
    pos: "vi./vt.",
    tabs: [
      { type: "image", title: "图片", data: ["wordpic/dangle.png"] },
      {
        type: "text",
        title: "单词详解",
        data: [
          {
            title: "核心含义",
            content: "<b>vi./vt. 悬挂；悬垂</b><br>指物体悬空并可能随外力摆动，不及物动词需搭配固定介词，及物动词可直接接宾语。"
          },
          {
            title: "含义",
            content: "不及物动词（vi.）/ 及物动词（vt.）文中意思 + 常用意思：悬挂；悬垂（某物悬空摆动或悬挂着）<br>英文释义：To hang or swing freely; to hold something so that it hangs down.<br>情景解释：Keys often dangle from a backpack zipper.（钥匙常常悬挂在书包拉链上。）"
          },
          {
            title: "书本原句",
            content: "Something green and sparkling was dangling from the cord.（一根绿色的、闪闪发光的东西悬挂在绳子上。）"
          },
          {
            title: "常见用法",
            content: "（vi.）dangle from sth（悬挂在某物上）：Earrings dangle from her ears.（耳环悬挂在她的耳朵上。）<br>（vt.）dangle sth（悬挂某物）：He dangled the magic toy in front of the baby dragon.（他在小龙宝宝面前悬挂着魔法玩具。）<br>（vi.）dangle in the air（悬在空中）：The magic lantern dangled in the soft wind.（魔法灯笼在微风中悬着摆动。）<br>（vi.）dangle over sth（悬在某物上方）：Tree branches dangle over the forest path.（树枝悬在小路上方。）"
          },
          {
            title: "例句",
            content: "（vi.）The kite string dangled from his hand as he ran.（他跑的时候，风筝线悬挂在他的手上。）<br>（vt.）She dangled her feet in the cool magic spring water.（她把脚悬在清凉的魔法泉水里摆动。）<br>（vi.）A spider web dangled between two big magic trees.（一张蜘蛛网悬在两棵魔法大树之间。）"
          },
          {
            title: "避免用错",
            content: "dangle 侧重“悬空且可能摆动”，不要与 hang 混淆，hang 泛指“悬挂”，可静止可摆动，比如“衣服挂在衣架上”是 hang clothes on the hanger，“钥匙悬在拉链上摆动”是 keys dangle from the zipper。<br><br>作不及物动词时常用搭配“dangle from/over”，不要说“dangle on”（错误），正确：dangle from（√）。"
          }
        ]
      },
      {
        type: "quiz",
        title: "挑战一下",
        data: {
          question: "A sparkling green stone ______ from the cord on the wall of the secret cave.",
          options: ["hung", "dangled", "fell", "stood"],
          answerIndex: 1
        }
      }
    ]
  },
  // ================================= Chapter 9 (dm1-c9) 完整版 =================================
  {
    uid: "w058",
    word: "thrill",
    chapterId: "dm1-c9",
    order: 1,
    phonetic: "/θrɪl/",
    pos: "vt./vi./n.",
    tabs: [
      { type: "image", title: "图片", data: ["wordpic/thrill.png"] },
      {
        type: "text",
        title: "单词详解",
        data: [
          {
            title: "核心含义",
            content: "<b>vt./vi. 使兴奋；使激动；感到兴奋；n. 兴奋；激动；令人兴奋的事</b><br>表强烈的、令人振奋的愉悦感，动词可作及物/不及物，名词为可数名词。"
          },
          {
            title: "含义",
            content: "及物动词（vt.）/ 不及物动词（vi.）文中意思 + 常用意思：使兴奋；使激动；感到兴奋（让他人或自己产生强烈的愉悦感）<br>英文释义：To make someone feel a strong sense of pleasure or excitement; to feel excited.<br>情景解释：Winning a game will thrill you.（赢了比赛会让你很兴奋。）<br><br>名词（n.）常用意思：兴奋；激动；令人兴奋的事（强烈的愉悦或激动的感觉）<br>英文释义：A strong feeling of pleasure or excitement; an exciting experience.<br>情景解释：Riding a roller coaster gives you a thrill.（坐过山车会让你感到刺激。）"
          },
          {
            title: "书本原句",
            content: "Heru looked thrilled.（赫鲁看起来非常兴奋。）"
          },
          {
            title: "常见用法",
            content: "（v.）thrill sb（使某人兴奋）：The surprise gift thrilled the little girl.（这份惊喜礼物让小女孩很兴奋。）<br>（v.）thrill at sth（因某事感到兴奋）：She thrilled at the sound of magic applause.（听到魔法掌声她感到很激动。）<br>（n.）a thrill of excitement（一阵兴奋）：He felt a thrill of excitement when he won the magic game.（获胜时他感到一阵兴奋。）<br>（n.）the thrill of adventure（冒险的刺激）：She loves the thrill of traveling to magic new places.（她喜欢去魔法新地方旅行的刺激感。）"
          },
          {
            title: "例句",
            content: "（v.）The magician’s amazing tricks thrilled the whole audience.（魔术师的精彩表演让全场观众很兴奋。）<br>（n.）Riding a magic dragon gives me a big thrill every time.（每次骑魔法龙都给我带来极大的刺激。）<br>（v.）We thrilled at the news of our team’s victory in the magic battle.（听到我们队在魔法大战中获胜的消息，我们很激动。）"
          },
          {
            title: "避免用错",
            content: "thrill 侧重“强烈的、令人振奋的兴奋”，不要与 excite 混淆，excite 是泛指“使兴奋”，程度较温和，比如“有趣的故事让孩子兴奋”是 The interesting story excited the kids，“惊喜让她极度兴奋”是 The surprise thrilled her.<br><br>作名词时常用搭配“a thrill of + 名词”，不要说“thrill of excitement”（缺少 a），正确：a thrill of excitement（√）。"
          }
        ]
      },
      {
        type: "quiz",
        title: "挑战一下",
        data: {
          question: "Heru looked ______ when he saw the magic stone in the secret tomb.",
          options: ["bored", "thrilled", "sad", "tired"],
          answerIndex: 1
        }
      }
    ]
  },
  {
    uid: "w059",
    word: "ribbon",
    chapterId: "dm1-c9",
    order: 2,
    phonetic: "/ˈrɪbən/",
    pos: "n.",
    tabs: [
      { type: "image", title: "图片", data: ["wordpic/ribbon.png"] },
      {
        type: "text",
        title: "单词详解",
        data: [
          {
            title: "核心含义",
            content: "<b>n. 丝带；绸带；光带</b><br>可数名词，本义为装饰性细长绸带，也可作比喻义指连续的光带、烟带等。"
          },
          {
            title: "含义",
            content: "名词（n.）文中意思 + 常用意思：丝带；绸带；光带（细长的装饰带或连续的光带）<br>英文释义：A long, narrow piece of cloth or a continuous strip of light.<br>情景解释：Use a colorful ribbon to tie a gift box.（用彩色丝带绑礼盒。）"
          },
          {
            title: "书本原句",
            content: "A ribbon of dark colors streamed out.（一道深色的光带流了出来。）"
          },
          {
            title: "常见用法",
            content: "（n.）colorful ribbon（彩色丝带）：She tied her hair with a pink magic ribbon.（她用粉色魔法丝带扎头发。）<br>（n.）ribbon of light（光带）：The sunset made a ribbon of orange light in the sky.（夕阳在天空中划出一道橙色光带。）<br>（n.）silk ribbon（丝绸丝带）：The magic dress is decorated with silk ribbons.（这条魔法裙子用丝绸丝带装饰。）<br>（n.）ribbon of smoke（烟带）：Smoke rose in a thin ribbon from the magic chimney.（烟从魔法烟囱里呈细带状升起。）"
          },
          {
            title: "例句",
            content: "（n.）I bought a red ribbon to decorate the Christmas magic tree.（我买了一条红丝带装饰魔法圣诞树。）<br>（n.）The magic dancer twirled a ribbon as she performed on the stage.（魔法舞者表演时挥舞着丝带。）<br>（n.）A ribbon of stars stretched across the dark night sky.（一道星河横跨漆黑的夜空。）"
          },
          {
            title: "避免用错",
            content: "ribbon 是可数名词，复数形式 ribbons（√），不要与 string 混淆，ribbon 是“有装饰性的丝带、绸带”，string 是“普通的绳子、线”，比如“缝衣服的线”是 sewing string，“装饰用的丝带”是 decorative ribbon.<br><br>文中“光带”是 ribbon 的比喻义，不要仅理解为“丝带”，需结合语境判断含义。"
          }
        ]
      },
      {
        type: "quiz",
        title: "挑战一下",
        data: {
          question: "A dark ______ of light streamed out from the stone when we touched the pyramid.",
          options: ["line", "ribbon", "dot", "circle"],
          answerIndex: 1
        }
      }
    ]
  },
  // ================================= Chapter 10 (dm1-c10) 完整版 =================================
  {
    uid: "w060",
    word: "arrow",
    chapterId: "dm1-c10",
    order: 1,
    phonetic: "/ˈærəʊ/",
    pos: "n.",
    tabs: [
      { type: "image", title: "图片", data: ["wordpic/arrow.png"] },
      {
        type: "text",
        title: "单词详解",
        data: [
          {
            title: "核心含义",
            content: "<b>n. 箭；箭头</b><br>可数名词，本义为弓箭的箭，也可指指示方向的箭头符号。"
          },
          {
            title: "含义",
            content: "名词（n.）文中意思 + 常用意思：箭；箭头（用于射击的武器或指示方向的符号）<br>英文释义：A thin, pointed weapon shot from a bow; a mark (→) used to show direction.<br>情景解释：Archers practice shooting arrows at targets.（弓箭手练习向靶子射箭。）"
          },
          {
            title: "书本原句",
            content: "He sent an arrow flying right at Kepri.（他射出一支箭直奔凯普丽。）"
          },
          {
            title: "常见用法",
            content: "（n.）shoot an arrow（射箭）：The hunter shot an arrow at the magic deer.（猎人向魔法鹿射出一支箭。）<br>（n.）arrow sign（箭头标志）：Follow the arrow sign to the magic exit.（跟着箭头标志找魔法出口。）<br>（n.）bow and arrow（弓箭）：Children love playing with toy bows and arrows.（孩子们喜欢玩玩具弓箭。）<br>（n.）arrow of love（爱神之箭）：People say Cupid shoots arrows of love.（人们说丘比特射出爱神之箭。）"
          },
          {
            title: "例句",
            content: "（n.）The magic arrow hit the center of the wooden target.（魔法箭射中了木靶子的中心。）<br>（n.）Look at the arrow on the magic map—it points to the secret tomb.（看魔法地图上的箭头，它指向秘密坟墓。）<br>（n.）She made an arrow with a stick and magic string for the little dragon.（她用树枝和魔法绳子给小龙做了一支箭。）"
          },
          {
            title: "避免用错",
            content: "arrow 是可数名词，复数形式 arrows（√），不要与 bow 混淆，bow 是“弓”，arrow 是“箭”，搭配为“bow and arrow”（弓箭），不要说“arrow and bow”（顺序错误）。<br><br>表示“箭头符号”时，不要写成“arrow mark”（重复），正确：arrow（√）或 arrow sign（√）。"
          }
        ]
      },
      {
        type: "quiz",
        title: "挑战一下",
        data: {
          question: "The hunter sent an ______ flying right at the deer in the forest.",
          options: ["arrow", "bow", "spear", "club"],
          answerIndex: 0
        }
      }
    ]
  },
  {
    uid: "w061",
    word: "spear",
    chapterId: "dm1-c10",
    order: 2,
    phonetic: "/spɪə(r)/",
    pos: "n.",
    tabs: [
      { type: "image", title: "图片", data: ["wordpic/spear.png"] },
      {
        type: "text",
        title: "单词详解",
        data: [
          {
            title: "核心含义",
            content: "<b>n. 矛；长枪</b><br>可数名词，指一端尖锐的长柄武器，也可作比喻义指细长的尖状物（如草叶）。"
          },
          {
            title: "含义",
            content: "名词（n.）文中意思 + 常用意思：矛；长枪（一端尖锐的长柄武器）<br>英文释义：A long weapon with a sharp point at one end, used for fighting or hunting.<br>情景解释：Ancient warriors used spears to hunt and fight.（古代战士用矛打猎和战斗。）"
          },
          {
            title: "书本原句",
            content: "They carried bows and arrows, spears, and clubs.（他们带着弓箭、矛和棍棒。）"
          },
          {
            title: "常见用法",
            content: "（n.）hold a spear（握矛）：The magic soldier held a spear tightly in his hand.（魔法士兵手里紧紧握着矛。）<br>（n.）wooden spear（木矛）：Early humans made spears from wood and stone.（早期人类用木头和石头做矛。）<br>（n.）throw a spear（掷矛）：He can throw a magic spear very far in the battle.（他能在战斗中把魔法矛掷得很远。）<br>（n.）spear of grass（草叶）：A spear of grass stuck out of the magic soil.（一片草叶从魔法土里冒出来。）"
          },
          {
            title: "例句",
            content: "（n.）The tribe used magic spears to catch fish in the river.（这个部落用魔法矛在河里捕鱼。）<br>（n.）The magic museum has a collection of ancient spears from different lands.（魔法博物馆收藏了一批来自不同地区的古代矛。）<br>（n.）He carved a sharp point on the stick to make a simple spear.（他在木棍上刻了一个尖，做成了一支简易的矛。）"
          },
          {
            title: "避免用错",
            content: "spear 是可数名词，复数形式 spears（√），不要与 sword 混淆，spear 是“长柄、尖头的矛”，sword 是“短柄、有刃的剑”，比如“击剑用剑”是 fencing sword，“狩猎用矛”是 hunting spear.<br><br>不要说“a spear stick”（重复），正确：a spear（√）。"
          }
        ]
      },
      {
        type: "quiz",
        title: "挑战一下",
        data: {
          question: "The warriors carried bows, arrows and long wooden ______ to the battle.",
          options: ["clubs", "spears", "swords", "knives"],
          answerIndex: 1
        }
      }
    ]
  },
  {
    uid: "w062",
    word: "club",
    chapterId: "dm1-c10",
    order: 3,
    phonetic: "/klʌb/",
    pos: "n./v.",
    tabs: [
      { type: "image", title: "图片", data: ["wordpic/club.png"] },
      {
        type: "text",
        title: "单词详解",
        data: [
          {
            title: "核心含义",
            content: "<b>n. 棍棒；俱乐部；社团；v. 加入俱乐部；用棍棒打；集资</b><br>名词多义，文中指作武器的粗木棒；动词可表加入社团或集资，次要含义为用棍棒打。"
          },
          {
            title: "含义",
            content: "名词（n.）文中意思 + 常用意思：棍棒；俱乐部；社团（用作武器的粗木棒；志同道合的人组成的团体）<br>英文释义：A heavy stick used as a weapon; a group of people who share a common interest.<br>情景解释：People used wooden clubs as weapons long ago.（很久以前人们把木杖当武器。）<br><br>动词（v.）常用意思：加入俱乐部；用棍棒打（次要含义）<br>英文释义：To join a club; to hit with a club.<br>情景解释：They clubbed together to buy a gift.（他们集资买了一份礼物。）"
          },
          {
            title: "书本原句",
            content: "They carried bows and arrows, spears, and clubs.（他们带着弓箭、矛和棍棒。）"
          },
          {
            title: "常见用法",
            content: "（n.）wooden club（木杖）：The robber held a heavy wooden club in his hand.（强盗手里拿着一根粗木杖。）<br>（n.）sports club（运动俱乐部）：He joined a magic football club last year.（他去年加入了一个魔法足球俱乐部。）<br>（n.）book club（读书俱乐部）：We meet every week in the magic book club.（我们每周在魔法读书俱乐部碰面。）<br>（v.）club together（集资）：We clubbed together to buy a magic gift for her.（我们集资给她买了一份魔法礼物。）"
          },
          {
            title: "例句",
            content: "（n.）The old wizard used a wooden club to walk in the magic mountains.（老巫师用一根木杖在魔法山里行走。）<br>（n.）She is a member of the school magic art club.（她是学校魔法艺术俱乐部的成员。）<br>（v.）They clubbed together to help the poor little magic dragon.（他们集资帮助那只可怜的小龙。）"
          },
          {
            title: "避免用错",
            content: "club 作“棍棒”时是可数名词，作“俱乐部”时也是可数名词，需结合语境区分含义，不要混淆“武器棍棒”和“社团俱乐部”。<br><br>不要与 stick 混淆，club 是“较粗、可作武器或工具的棍棒”，stick 是“普通的细树枝、棍子”，比如“捡一根树枝”是 pick up a stick，“一根武器棍棒”是 a weapon club."
          }
        ]
      },
      {
        type: "quiz",
        title: "挑战一下",
        data: {
          question: "The soldiers carried bows, arrows, spears and heavy wooden ______ for the battle against dark magic.",
          options: ["sticks", "clubs", "ribbons", "arrows"],
          answerIndex: 1
        }
      }
    ]
  },
  {
    uid: "w063",
    word: "horror",
    chapterId: "dm1-c11",
    order: 1,
    phonetic: "/ˈhɒrə(r)/",
    pos: "n.",
    tabs: [
      { type: "image", title: "图片", data: ["wordpic/horror.png"] },
      {
        type: "text",
        title: "单词详解",
        data: [
          {
            title: "核心含义",
            content: "<b>n. 恐惧；惊骇；可怕的事物</b><br>不可数名词，表强烈的害怕、厌恶感，也可指令人恐惧的人/事。"
          },
          {
            title: "含义",
            content: "名词（n.）文中意思 + 常用意思：恐惧；惊骇；可怕的事物（强烈的害怕或厌恶感）<br>英文释义：A strong feeling of fear or disgust; something very scary.<br>情景解释：You feel horror when you see a big spider suddenly.（突然看到一只大蜘蛛时，你会感到恐惧。）"
          },
          {
            title: "书本原句",
            content: "Drake watched in horror as the arrow flew toward Ana.（德雷克惊恐地看着箭朝安娜飞去。）"
          },
          {
            title: "常见用法",
            content: "（n.）in horror（惊恐地）：She screamed in horror at the loud noise.（听到巨响，她惊恐地尖叫起来。）<br>（n.）a sense of horror（一阵恐惧）：A sense of horror came over him when he saw the dark room.（看到黑暗的房间，他感到一阵恐惧。）<br>（n.）horror movie（恐怖片）：I don’t like watching horror movies—they’re too scary.（我不喜欢看恐怖片，它们太吓人了。）<br>（n.）fill with horror（充满恐惧）：The story filled the children with horror.（这个故事让孩子们充满恐惧。）"
          },
          {
            title: "例句",
            content: "（n.）He stared in horror as the glass fell off the table.（看着杯子从桌子上掉下来，他惊恐地瞪大了眼睛。）<br>（n.）The horror of the storm made everyone stay indoors.（暴风雨的可怕让所有人都待在了室内。）<br>（n.）She felt a wave of horror when she thought about the dark.（想到黑暗，她感到一阵恐惧。）"
          },
          {
            title: "避免用错",
            content: "horror 是不可数名词，表“一种恐惧”时可加 a（a sense of horror），不要说“horrors”表示“恐惧”（复数形式表“恐怖片”或“可怕的事”）。"
          }
        ]
      },
      {
        type: "quiz",
        title: "挑战一下",
        data: {
          question: "Drake watched ______ as the arrow flew straight toward Ana in the forest.",
          options: ["in joy", "in horror", "in anger", "in surprise"],
          answerIndex: 1
        }
      }
    ]
  },
  {
    uid: "w064",
    word: "midair",
    chapterId: "dm1-c11",
    order: 2,
    phonetic: "/ˌmɪdˈeə(r)/",
    pos: "n.",
    tabs: [
      { type: "image", title: "图片", data: ["wordpic/midair.png"] },
      {
        type: "text",
        title: "单词详解",
        data: [
          {
            title: "核心含义",
            content: "<b>n. 半空中；空中</b><br>不可数名词，特指离地面不高的空中区域，常用搭配“in midair”。"
          },
          {
            title: "含义",
            content: "名词（n.）文中意思 + 常用意思：半空中；空中（离地面不高的空中区域）<br>英文释义：The space in the air, not on the ground or in the sky far above.<br>情景解释：The bird caught the bug in midair.（小鸟在半空中抓住了虫子。）"
          },
          {
            title: "书本原句",
            content: "but before he could reach her, the arrow stopped in midair-inches from Ana's face.（但还没等他碰到她，箭就在半空中停了下来——离安娜的脸只有几英寸远。）"
          },
          {
            title: "常见用法",
            content: "（n.）in midair（在半空中）：The ball was caught in midair by the player.（球被球员在半空中接住了。）<br>（n.）stop in midair（停在半空中）：The magic made the toy stop in midair.（魔法让玩具停在了半空中。）<br>（n.）fly in midair（在半空中飞）：Butterflies fly in midair among the flowers.（蝴蝶在花丛的半空中飞舞。）<br>（n.）fall from midair（从半空中落下）：A leaf fell from midair onto the grass.（一片叶子从半空中落到了草地上。）"
          },
          {
            title: "例句",
            content: "（n.）The acrobat jumped and turned in midair.（杂技演员跳起来，在半空中转了个身。）<br>（n.）The kite got stuck in midair between two trees.（风筝卡在了两棵树之间的半空中。）<br>（n.）He threw the ball high, and it stayed in midair for a second.（他把球扔得很高，球在半空中停留了一秒钟。）"
          }
        ]
      },
      {
        type: "quiz",
        title: "挑战一下",
        data: {
          question: "The magic arrow suddenly stopped ______, just a few inches from Ana's face.",
          options: ["on the ground", "in midair", "in the tree", "on the rock"],
          answerIndex: 1
        }
      }
    ]
  },
  {
    uid: "w065",
    word: "thud",
    chapterId: "dm1-c11",
    order: 3,
    phonetic: "/θʌd/",
    pos: "n./v.",
    tabs: [
      { type: "image", title: "图片", data: ["wordpic/thud.png"] },
      {
        type: "text",
        title: "单词详解",
        data: [
          {
            title: "核心含义",
            content: "<b>n. 重击声；砰的一声；v. 砰地落下；重击</b><br>名词表重物撞击的沉闷声响，动词为不及物动词，表发出闷响地撞击/落下。"
          },
          {
            title: "含义",
            content: "名词（n.）文中意思 + 常用意思：重击声；砰的一声（重物落下或撞击发出的沉闷声音）<br>英文释义：A dull, heavy sound made by something falling or hitting a surface.<br>情景解释：A book falling on the floor makes a thud.（书掉在地上会发出砰的一声。）<br><br>动词（v.）常用意思：砰地落下；重击（发出沉闷的撞击声）<br>英文释义：To fall or hit something with a dull, heavy sound.<br>情景解释：The box thudded onto the ground.（盒子砰地掉在了地上。）"
          },
          {
            title: "书本原句",
            content: "Drake landed with a thud.（德雷克砰的一声摔落在地。）"
          },
          {
            title: "常见用法",
            content: "（n.）a loud thud（一声巨响）：We heard a loud thud from the next room.（我们听到隔壁房间传来一声巨响。）<br>（n.）fall with a thud（砰地落下）：The box fell with a thud on the floor.（盒子砰地一声掉在了地上。）<br>（v.）thud to the ground（砰地摔在地上）：The branch thudded to the ground in the wind.（树枝在风中砰地摔在了地上。）<br>（v.）thud against（砰地撞在……上）：The ball thudded against the wall.（球砰地撞在了墙上。）"
          },
          {
            title: "例句",
            content: "（n.）The hammer hit the nail with a heavy thud.（锤子重重地砸在钉子上，发出一声闷响。）<br>（v.）The tired runner thudded onto the sofa.（疲惫的跑步者砰地坐在了沙发上。）<br>（n.）A thud woke me up in the middle of the night.（半夜一声砰响把我吵醒了。）"
          },
          {
            title: "避免用错",
            content: "thud 作名词时是可数名词，作动词时是不及物动词，不要说“thud the floor”（错误），正确：thud to the floor（√）。<br><br>不要混淆 thud 和 bang，thud 是“沉闷的重击声”，bang 是“响亮、尖锐的撞击声”，比如“关门的砰声”是 the bang of a door，“箱子落地的闷响”是 the thud of a box."
          }
        ]
      },
      {
        type: "quiz",
        title: "挑战一下",
        data: {
          question: "Drake jumped from the rock and landed ______ on the soft grass below.",
          options: ["with a thud", "with a bang", "with a whisper", "with a song"],
          answerIndex: 0
        }
      }
    ]
  },
  {
    uid: "w066",
    word: "flicker",
    chapterId: "dm1-c11",
    order: 4,
    phonetic: "/ˈflɪkə(r)/",
    pos: "vi./n.",
    tabs: [
      { type: "image", title: "图片", data: ["wordpic/flicker.png"] },
      {
        type: "text",
        title: "单词详解",
        data: [
          {
            title: "核心含义",
            content: "<b>vi. 闪烁；忽明忽暗；n. 闪烁；微光</b><br>动词为不及物动词，表光线/火焰不稳定明暗，名词表忽明忽暗的微弱光亮。"
          },
          {
            title: "含义",
            content: "不及物动词（vi.）文中意思 + 常用意思：闪烁；忽明忽暗（光线或火焰不稳定地明暗变化）<br>英文释义：To shine unsteadily, turning on and off quickly.<br>情景解释：The candle flickers when there’s a breeze.（有微风时，蜡烛会闪烁。）<br><br>名词（n.）常用意思：闪烁；微光（不稳定的光亮）<br>英文释义：An unsteady light that turns on and off.<br>情景解释：A flicker of light came from the dark room.（黑暗的房间里透出一丝微光。）"
          },
          {
            title: "书本原句",
            content: "Drake could see the green light in Worm's eyes starting to flicker.（德雷克看到沃姆眼睛里的绿光开始闪烁。）"
          },
          {
            title: "常见用法",
            content: "（vi.）flicker gently（轻轻闪烁）：The fireflies flickered gently in the dark.（萤火虫在黑暗中轻轻闪烁。）<br>（vi.）light flickers（灯光闪烁）：The old lamp’s light flickers when it’s windy.（刮风时，那盏旧灯的灯光会闪烁。）<br>（n.）a flicker of light（一缕微光）：A flicker of light came from the keyhole.（一缕微光从钥匙孔里透出来。）<br>（vi.）flicker and die（闪烁着熄灭）：The candle flickered and died out.（蜡烛闪烁着熄灭了。）"
          },
          {
            title: "例句",
            content: "（vi.）The stars flicker in the night sky.（星星在夜空中闪烁。）<br>（n.）There was a flicker of hope in his eyes.（他的眼睛里闪过一丝希望。）<br>（vi.）The TV screen flickered and then went black.（电视屏幕闪烁了一下，然后就黑了。）"
          },
          {
            title: "避免用错",
            content: "flicker 作动词时是不及物动词，不要直接接宾语，比如“灯光闪烁”是 The light flickers（√），不是 The light flickers brightness（×）。<br><br>不要混淆 flicker 和 shine，flicker 侧重“不稳定、忽明忽暗的闪烁”，shine 侧重“稳定、明亮的照耀”，比如“太阳照耀”是 The sun shines brightly，“烛光闪烁”是 The candle flickers gently."
          }
        ]
      },
      {
        type: "quiz",
        title: "挑战一下",
        data: {
          question: "When Worm was tired, the green light in his eyes started to ______ slowly.",
          options: ["shine", "flicker", "glare", "flash"],
          answerIndex: 1
        }
      }
    ]
  },
  {
    uid: "w067",
    word: "order",
    chapterId: "dm1-c11",
    order: 5,
    phonetic: "/ˈɔːdə(r)/",
    pos: "n./v.",
    tabs: [
      { type: "image", title: "图片", data: ["wordpic/order.png"] },
      {
        type: "text",
        title: "单词详解",
        data: [
          {
            title: "核心含义",
            content: "<b>v. 命令；吩咐；订购；n. 命令；秩序；订单</b><br>动词表权威下的吩咐/订购，名词表命令、整齐状态或购物订单，多义词汇需结合语境判断。"
          },
          {
            title: "含义",
            content: "动词（v.）文中意思 + 常用意思：命令；吩咐；要求（让他人做某事，带有权威性）<br>英文释义：To tell someone to do something, especially because you have authority.<br>情景解释：The teacher ordered the students to be quiet.（老师命令学生们安静。）<br><br>名词（n.）常用意思：命令；秩序；订单（他人要求做的事；整齐的状态；购买的货物）<br>英文释义：A command; a state of being neat; a request to buy something.<br>情景解释：We keep our classroom in good order.（我们保持教室整洁有序。）"
          },
          {
            title: "书本原句",
            content: "Heru ordered. 'Watil Blast the top of the pyramid!'（赫鲁命令道：“瓦蒂！炸开金字塔的顶部！”）"
          },
          {
            title: "常见用法",
            content: "（v.）order sb to do sth（命令某人做某事）：The general ordered the soldiers to march.（将军命令士兵们行军。）<br>（n.）give an order（下命令）：The king gave an order to protect the village.（国王下了一道保护村庄的命令。）<br>（v.）order sth（订购；点购）：We ordered pizza for dinner.（我们点了披萨当晚餐。）<br>（n.）follow orders（听从命令）：Good soldiers follow orders.（优秀的士兵听从命令。）"
          },
          {
            title: "例句",
            content: "（v.）Mom ordered me to clean my room before playing.（妈妈命令我先打扫房间再玩。）<br>（n.）The manager gave an order to improve service.（经理下了一道改善服务的命令。）<br>（v.）She ordered a book online yesterday.（她昨天在网上订购了一本书。）"
          },
          {
            title: "避免用错",
            content: "order 作动词“命令”时，常用搭配“order sb to do sth”，不要说“order sb do sth”（错误），正确：order sb to do sth（√）。<br><br>不要混淆 order 和 command，order 更口语化、适用范围广，command 更正式、侧重“权威下达的强制命令”，比如“父母吩咐孩子”是 parents order the child，“军官命令士兵”是 the officer commands the soldiers.<br><br>作“秩序”讲时，常用搭配“in order”（整齐）、“out of order”（混乱），不要混淆含义。"
          }
        ]
      },
      {
        type: "quiz",
        title: "挑战一下",
        data: {
          question: "Heru ______ Watil to blast the top of the pyramid with magic power.",
          options: ["asked", "ordered", "begged", "suggested"],
          answerIndex: 1
        }
      }
    ]
  },
  // ================================= Chapter 12 (dm1-c12) 完整版 =================================
  {
    uid: "w068",
    word: "decision",
    chapterId: "dm1-c12",
    order: 1,
    phonetic: "/dɪˈsɪʒn/",
    pos: "n.",
    tabs: [
      { type: "image", title: "图片", data: ["wordpic/decision.png"] },
      {
        type: "text",
        title: "单词详解",
        data: [
          {
            title: "核心含义",
            content: "<b>n. 决定；抉择；决断</b><br>可数名词，表经过思考后做出的选择，为动词decide的名词形式。"
          },
          {
            title: "含义",
            content: "名词（n.）文中意思 + 常用意思：决定；抉择；决断（经过思考后做出的选择）<br>英文释义：A choice made after thinking carefully about something.<br>情景解释：Choosing where to go on weekends is a decision.（选择周末去哪玩是一个决定。）"
          },
          {
            title: "书本原句",
            content: "Ana's Decision（安娜的抉择）（章节标题，核心原句体现“抉择”含义）"
          },
          {
            title: "常见用法",
            content: "（n.）make a decision（做决定）：She needs to make a decision about her birthday party.（她需要为生日派对做一个决定。）<br>（n.）hard decision（艰难的决定）：It was a hard decision to leave her hometown.（离开家乡是一个艰难的决定。）<br>（n.）important decision（重要的决定）：Choosing a school is an important decision.（选择学校是一个重要的决定。）<br>（n.）final decision（最终决定）：The teacher made the final decision.（老师做出了最终决定。）"
          },
          {
            title: "例句",
            content: "（n.）He thought for a long time before making his decision.（他思考了很久才做出决定。）<br>（n.）My parents supported my decision to learn painting.（父母支持我学画画的决定。）<br>（n.）The decision to help Kepri stay with Wati made Ana sad.（让凯普丽留在瓦蒂身边的决定让安娜很伤心。）"
          },
          {
            title: "避免用错",
            content: "decision 是名词（n.），不要与动词 decide 混淆，比如“决定去公园”是 decide to go to the park（v.），“做出去公园的决定”是 make a decision to go to the park（n.）。<br><br>常用搭配“make a decision”，不要说“do a decision”（错误），正确：make a decision（√）。"
          }
        ]
      },
      {
        type: "quiz",
        title: "挑战一下",
        data: {
          question: "Ana made a hard ______ to let Kepri stay with her brother Wati in the homeland.",
          options: ["plan", "decision", "wish", "dream"],
          answerIndex: 1
        }
      }
    ]
  },
  {
    uid: "w069",
    word: "serve",
    chapterId: "dm1-c12",
    order: 2,
    phonetic: "/sɜːv/",
    pos: "v.",
    tabs: [
      { type: "image", title: "图片", data: ["wordpic/serve.png"] },
      {
        type: "text",
        title: "单词详解",
        data: [
          {
            title: "核心含义",
            content: "<b>v. 服务；侍奉；提供；服役</b><br>及物动词，表为他人做事、供应物品或为国家/集体效力，搭配丰富。"
          },
          {
            title: "含义",
            content: "动词（v.）文中意思 + 常用意思：服务；侍奉；提供；服役（为他人做事；供应物品；为国家效力）<br>英文释义：To work for someone; to provide something; to work for a country.<br>情景解释：Waiters serve food to customers in restaurants.（餐厅里服务员给顾客上菜。）"
          },
          {
            title: "书本原句",
            content: "I serve no king. All I know is that for many ages, my family has served dragons.（我不为任何国王效力。我只知道，多少年来，我的家族一直侍奉着龙。）"
          },
          {
            title: "常见用法",
            content: "（v.）serve sb（为某人服务）：She serves her grandma every day.（她每天照顾奶奶。）<br>（v.）serve food/drinks（提供食物/饮品）：The café serves delicious cakes.（这家咖啡馆提供美味的蛋糕。）<br>（v.）serve the country（为国家效力）：His father served the country as a soldier.（他的爸爸作为士兵为国家效力。）<br>（v.）serve a purpose（有作用）：This tool serves an important purpose.（这个工具有着重要的作用。）"
          },
          {
            title: "例句",
            content: "（n.）The librarian serves readers with a smile.（图书管理员微笑着为读者服务。）<br>（n.）The hotel serves breakfast from 7 to 9.（这家酒店从7点到9点提供早餐。）<br>（n.）Her family has served dragons for many years.（她的家族已经侍奉龙很多年了。）"
          },
          {
            title: "避免用错",
            content: "serve 作“提供”时，直接接宾语，不要说“serve to sb”（错误），正确：serve sb sth 或 serve sth to sb（√），比如“给客人倒茶”是 serve tea to guests 或 serve guests tea。"
          }
        ]
      },
      {
        type: "quiz",
        title: "挑战一下",
        data: {
          question: "The girl said her family has ______ dragons for many ages and would never serve a human king.",
          options: ["served", "helped", "found", "raised"],
          answerIndex: 0
        }
      }
    ]
  },
  {
    uid: "w070",
    word: "shudder",
    chapterId: "dm1-c12",
    order: 3,
    phonetic: "/ˈʃʌdər/",
    pos: "vi./n.",
    tabs: [
      { type: "image", title: "图片", data: ["wordpic/shudder.png"] },
      {
        type: "text",
        title: "单词详解",
        data: [
          {
            title: "核心含义",
            content: "<b>vi. 发抖；战栗；不寒而栗；n. 发抖；战栗</b><br>动词为不及物动词，表因恐惧/寒冷/厌恶发抖，名词表相应的身体抖动。"
          },
          {
            title: "含义",
            content: "不及物动词（vi.）文中意思 + 常用意思：发抖；战栗；不寒而栗（因恐惧、寒冷或厌恶而发抖）<br>英文释义：To shake slightly because of fear, cold, or dislike.<br>情景解释：You shudder when you see a scary spider.（看到可怕的蜘蛛时，你会发抖。）<br><br>名词（n.）常用意思：发抖；战栗（因恐惧等产生的身体抖动）<br>英文释义：A slight shake because of fear, cold, or dislike.<br>情景解释：A shudder ran through her body at the thought.（一想到这，她浑身一阵战栗。）"
          },
          {
            title: "书本原句",
            content: "Drake shuddered. 'That would be bad for us-and for Griffith!'（德雷克打了个寒颤。“那对我们——还有格里菲斯来说都太糟糕了！”）"
          },
          {
            title: "常见用法",
            content: "（vi.）shudder with fear（因恐惧而发抖）：She shuddered with fear at the dark.（她因为黑暗而恐惧地发抖。）<br>（vi.）shudder at the thought of（一想到……就发抖）：He shudders at the thought of snakes.（他一想到蛇就发抖。）<br>（n.）a shudder of horror（一阵恐惧的战栗）：A shudder of horror ran through her.（她浑身一阵恐惧的战栗。）<br>（vi.）shudder with cold（因寒冷而发抖）：We shuddered with cold in the snow.（我们在雪地里冻得发抖。）"
          },
          {
            title: "例句",
            content: "（vi.）Drake shuddered when he thought of King Roland’s anger.（一想到罗兰德国王的怒火，德雷克就打了个寒颤。）<br>（n.）A sudden shudder made her hug herself tightly.（一阵突如其来的战栗让她紧紧抱住了自己。）<br>（vi.）Everyone shuddered at the scary story.（听到这个可怕的故事，每个人都不寒而栗。）"
          },
          {
            title: "避免用错",
            content: "作动词时是不及物动词，不要直接接宾语，比如“因害怕发抖”是 shudder with fear（√），不是 shudder fear（×）。"
          }
        ]
      },
      {
        type: "quiz",
        title: "挑战一下",
        data: {
          question: "Drake ______ when he thought about what King Roland would do if he failed the mission.",
          options: ["smiled", "laughed", "shuddered", "cheered"],
          answerIndex: 2
        }
      }
    ]
  },
  // ================================= Chapter 14 (dm1-c14) 完整版 =================================
  {
    uid: "w071",
    word: "unusual",
    chapterId: "dm1-c14",
    order: 1,
    phonetic: "/ʌnˈjuːʒuəl/",
    pos: "adj.",
    tabs: [
      { type: "image", title: "图片", data: ["wordpic/unusual.png"] },
      {
        type: "text",
        title: "单词详解",
        data: [
          {
            title: "核心含义",
            content: "<b>adj. 不寻常的；罕见的；特别的</b><br>形容词，为usual的反义词，表不常见、和平时状态不一样，可修饰人/物/经历。"
          },
          {
            title: "含义",
            content: "形容词（adj.）文中意思 + 常用意思：不寻常的；罕见的；特别的（不常见、和平时不一样）<br>英文释义：Not usual; not common; different from what happens most of the time.<br>情景解释：It’s unusual to see snow in summer.（夏天看到雪是不寻常的。）"
          },
          {
            title: "书本原句",
            content: "He is very unusual, said the shorter wizard, stepping up close to Worm.（“他非常特别，”矮个子巫师说着，走近沃姆。）"
          },
          {
            title: "常见用法",
            content: "（adj.）unusual day（不寻常的一天）：Today is an unusual day—I met my old friend.（今天是不寻常的一天——我见到了老朋友。）<br>（adj.）unusual animal（特别的动物）：The panda is an unusual animal.（熊猫是一种特别的动物。）<br>（adj.）unusual experience（罕见的经历）：Traveling to the pyramid was an unusual experience.（去金字塔旅行是一次罕见的经历。）<br>（adj.）very unusual（非常特别）：Her talent is very unusual for a child.（对一个孩子来说，她的天赋非常特别。）"
          },
          {
            title: "例句",
            content: "（adj.）Worm’s mind powers are unusual for an Earth Dragon.（沃姆的意念力对土龙来说很不寻常。）<br>（adj.）It’s unusual for him to be late for school.（他上学迟到是很不寻常的。）<br>（adj.）She has an unusual hobby—collecting stones.（她有一个特别的爱好——收集石头。）"
          }
        ]
      },
      {
        type: "quiz",
        title: "挑战一下",
        data: {
          question: "The wizard said Worm was very ______ because he had special mind powers for an Earth Dragon.",
          options: ["usual", "unusual", "boring", "common"],
          answerIndex: 1
        }
      }
    ]
  },
  {
    uid: "w072",
    word: "ask for",
    chapterId: "dm1-c14",
    order: 2,
    phonetic: "/ɑːsk fɔː(r)/",
    pos: "动词短语",
    tabs: [
      { type: "image", title: "图片", data: ["wordpic/ask for.png"] },
      {
        type: "text",
        title: "单词详解",
        data: [
          {
            title: "核心含义",
            content: "<b>动词短语 请求；要求；寻求</b><br>固定搭配，表向某人索要某物或请求他人提供帮助/建议。"
          },
          {
            title: "含义",
            content: "动词短语（v.）文中意思 + 常用意思：请求；要求；寻求（向某人要某物或请求帮助）<br>英文释义：To request something from someone; to seek help or support.<br>情景解释：You ask for water when you’re thirsty.（口渴时你会要水喝。）"
          },
          {
            title: "书本原句",
            content: "I have asked Diego for his help, Griffith said.（“我已经向迭戈求助了，”格里菲斯说。）"
          },
          {
            title: "常见用法",
            content: "（v.）ask sb for sth（向某人要某物）：She asked her mom for a new pencil.（她向妈妈要一支新铅笔。）<br>（v.）ask for help（寻求帮助）：Don’t be afraid to ask for help when you’re in trouble.（遇到困难时，不要害怕寻求帮助。）<br>（v.）ask for advice（寻求建议）：He asked the teacher for advice on study.（他向老师寻求学习建议。）"
          },
          {
            title: "例句",
            content: "（v.）Griffith asked Diego for help to find the dark wizard.（格里菲斯向迭戈求助，寻找黑巫师。）<br>（v.）I asked the librarian for a storybook about dragons.（我向图书管理员要了一本关于龙的故事书。）<br>（v.）She asked her dad for permission to go to the park.（她请求爸爸允许她去公园。）"
          },
          {
            title: "避免用错",
            content: "不要说“ask help”（错误），正确：ask for help（√）；“向他要书”是 ask him for the book（√），不是 ask him the book。"
          }
        ]
      },
      {
        type: "quiz",
        title: "挑战一下",
        data: {
          question: "Griffith ______ Diego ______ help when he couldn't defeat the dark wizard alone.",
          options: ["asked, for", "told, for", "said, to", "spoke, to"],
          answerIndex: 0
        }
      }
    ]
  },
  {
    uid: "w073",
    word: "replace",
    chapterId: "dm1-c14",
    order: 3,
    phonetic: "/rɪˈpleɪs/",
    pos: "vt.",
    tabs: [
      { type: "image", title: "图片", data: ["wordpic/replace.png"] },
      {
        type: "text",
        title: "单词详解",
        data: [
          {
            title: "核心含义",
            content: "<b>vt. 替换；取代；更换</b><br>及物动词，表用一个人/物代替另一个，常用固定搭配“replace A with B”。"
          },
          {
            title: "含义",
            content: "及物动词（vt.）文中意思 + 常用意思：替换；取代；更换（用一个人或物代替另一个）<br>英文释义：To take the place of someone or something; to put something new in the place of an old one.<br>情景解释：You replace a broken toy with a new one.（用新玩具替换坏掉的玩具。）"
          },
          {
            title: "书本原句",
            content: "It looks like I won't have to replace you with another wizard ... for now（“看来我暂时不用找另一个巫师来取代你了……”）"
          },
          {
            title: "常见用法",
            content: "（vt.）replace sb with sb（用某人取代某人）：The coach replaced the old player with a new one.（教练用新队员替换了老队员。）<br>（vt.）replace sth with sth（用某物替换某物）：We replaced the old lamp with a new one.（我们用新灯替换了旧灯。）<br>（vt.）replace sth（更换某物）：You need to replace the battery of the clock.（你需要更换时钟的电池。）<br>（vt.）replace a broken part（更换损坏的零件）：The mechanic replaced the broken part of the bike.（修理工更换了自行车损坏的零件。）"
          },
          {
            title: "例句",
            content: "（vt.）King Roland threatened to replace Griffith with another wizard.（罗兰德国王威胁要用另一个巫师取代格里菲斯。）<br>（vt.）My mom replaced the old sofa with a comfortable one.（妈妈用一个舒适的新沙发替换了旧沙发。）<br>（vt.）The teacher asked him to replace the broken chalk.（老师让他更换断掉的粉笔。）"
          },
          {
            title: "避免用错",
            content: "replace 常用搭配“replace A with B”（用B替换A），注意A和B的位置，不要颠倒。"
          }
        ]
      },
      {
        type: "quiz",
        title: "挑战一下",
        data: {
          question: "King Roland said he would ______ Griffith with another wizard if he failed to stop the dark magic.",
          options: ["help", "replace", "praise", "protect"],
          answerIndex: 1
        }
      }
    ]
  }
  
]
};