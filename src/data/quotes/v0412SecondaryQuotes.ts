import type { CharacterQuoteReview } from './characterQuotes'
/** Excerpts transcribed by secondary comics recap sources, NEVER label manga-checked.
 * A unique character ID owns exactly one candidate. Recheck printed manga before official promotion.
 */
type SecondaryQuote = CharacterQuoteReview & { verificationStatus: 'secondary-excerpt' }
const reviewed = [
  {
    "characterId": "newgate",
    "originalJapanese": "バカな息子をそれでも愛そう",
    "displayKorean": "어리석은 아들이지만, 그래도 사랑하마.",
    "mangaChapter": 563,
    "verificationStatus": "secondary-excerpt",
    "translationStatus": "editorial",
    "context": "스쿼드가 해군의 거짓말에 속아 흰수염을 찌른 뒤 용서하는 장면",
    "source": {
      "label": "소년점프+ 해당 화 독자 댓글 (원문 미대조)",
      "url": "https://shonenjumpplus.com/episode/3269754496381507811"
    }
  },
  {
    "characterId": "usopp",
    "originalJapanese": "仲間の夢を笑われた時だ!!!!",
    "displayKorean": "동료의 꿈이 비웃음당했을 때다!",
    "mangaChapter": 186,
    "verificationStatus": "secondary-excerpt",
    "translationStatus": "editorial",
    "context": "루피가 해적왕이 되리라는 꿈이 모욕당하자 싸움을 결심",
    "source": {
      "label": "만화wiki 2차 발언 정리 (원작 미대조)",
      "url": "https://mangakawiki.com/archives/569"
    }
  },
  {
    "characterId": "garp",
    "originalJapanese": "お前達が海軍の未来じゃ!!",
    "displayKorean": "너희들이 해군의 미래다!",
    "mangaChapter": 1088,
    "verificationStatus": "secondary-excerpt",
    "translationStatus": "editorial",
    "context": "하치노스에서 젊은 해병의 미래를 위해 자신을 남기는 결의; 공식 보조자료로 뜻 확인, 일본어 표기 직접 미대조",
    "source": {
      "label": "ONE PIECE.com 공식 보조자료 (일본어 전사 미대조)",
      "url": "https://one-piece.com/62932/index.html"
    }
  },
  {
    "characterId": "kaido",
    "originalJapanese": "「戦争」だけが人間の価値を決める",
    "displayKorean": "전쟁만이 인간의 가치를 정한다!",
    "mangaChapter": 1049,
    "verificationStatus": "secondary-excerpt",
    "translationStatus": "editorial",
    "context": "권력자와 세상의 평등을 전쟁으로 결정하려는 왜곡된 세계관",
    "source": {
      "label": "만화wiki 2차 발언 정리 (원작 미대조)",
      "url": "https://mangakawiki.com/archives/5368"
    }
  },
  {
    "characterId": "kizaru",
    "originalJapanese": "お前さん親友を殺した事あんのかい",
    "displayKorean": "자네는 친구를 죽여본 적이 있나?",
    "mangaChapter": 1124,
    "verificationStatus": "secondary-excerpt",
    "translationStatus": "editorial",
    "context": "베가펑크의 죽음 뒤 사카즈키와 통화하며 격앙되는 장면",
    "source": {
      "label": "만화wiki 2차 발언 정리 (원작 미대조)",
      "url": "https://katakunad.hatenablog.com/entry/dai1124wa-shinyuu"
    }
  },
  {
    "characterId": "burgess",
    "originalJapanese": "ウィ～～～ハハハ 最高だぜ!! リキリキの実の能力!!!",
    "displayKorean": "위하하하! 최고잖아! 힘힘 열매의 능력!",
    "mangaChapter": 1063,
    "verificationStatus": "secondary-excerpt",
    "translationStatus": "editorial",
    "context": "능력을 얻고 압도적인 완력을 자랑",
    "source": {
      "label": "만화wiki 2차 발언 정리 (원작 미대조)",
      "url": "https://mangakawiki.com/archives/9296"
    }
  },
  {
    "characterId": "doflamingo",
    "originalJapanese": "海賊が悪!? 海軍が正義!? …勝者だけが正義だ!!!!",
    "displayKorean": "해적이 악이고 해군이 정의라고? … 승자만이 정의다!",
    "mangaChapter": 556,
    "verificationStatus": "secondary-excerpt",
    "translationStatus": "editorial",
    "context": "마린포드에서 정의가 권력과 승자에 의해 바뀐다는 연설. 중간 문장 생략",
    "source": {
      "label": "만화wiki 2차 발언 정리 (원작 미대조)",
      "url": "https://mangakawiki.com/archives/4056"
    }
  },
  {
    "characterId": "roger",
    "originalJapanese": "おれの財宝か? 欲しけりゃくれてやる…探せ!",
    "displayKorean": "내 보물? 원한다면 주도록 하지… 찾아봐! 이 세상의 모든 것을 그곳에 두고 왔다!",
    "mangaChapter": 1,
    "verificationStatus": "secondary-excerpt",
    "translationStatus": "editorial",
    "context": "처형대에서 보물의 존재와 탐색을 선언; 흰수염의 원피스 실재 선언과 혼동 금지",
    "source": {
      "label": "ONE PIECE Wiki 2차 자료",
      "url": "https://onepiece.fandom.com/wiki/Chapter_1"
    }
  },
  {
    "characterId": "marco",
    "originalJapanese": "その命こそ生けるエースの意志だ!!",
    "displayKorean": "그 목숨이야말로 살아 있는 에이스의 의지야!",
    "mangaChapter": 575,
    "verificationStatus": "secondary-excerpt",
    "translationStatus": "editorial",
    "context": "전쟁 막바지 루피를 보호하며 에이스의 의지를 이야기",
    "source": {
      "label": "만화wiki 2차 발언 정리 (원작 미대조)",
      "url": "https://mangakawiki.com/archives/6062"
    }
  },
  {
    "characterId": "vista",
    "originalJapanese": "お初に鷹の目のミホーク おれを知ってんのかい",
    "displayKorean": "처음 뵙겠군, 매의 눈 미호크. 날 알고 있나?",
    "mangaChapter": 561,
    "verificationStatus": "secondary-excerpt",
    "translationStatus": "editorial",
    "context": "정상전쟁에서 미호크를 요격",
    "source": {
      "label": "만화wiki 2차 발언 정리 (원작 미대조)",
      "url": "https://mangakawiki.com/archives/8814"
    }
  },
  {
    "characterId": "queen",
    "originalJapanese": "おれ達ァカイドウさんを守る三つの災害!!!",
    "displayKorean": "우린 카이도 씨를 지키는 세 재해다!",
    "mangaChapter": 1023,
    "verificationStatus": "secondary-excerpt",
    "translationStatus": "editorial",
    "context": "대간판의 강함을 과시",
    "source": {
      "label": "만화wiki 2차 발언 정리 (원작 미대조)",
      "url": "https://mangakawiki.com/archives/11169"
    }
  },
  {
    "characterId": "jack",
    "originalJapanese": "おれァ破壊が好きだ",
    "displayKorean": "난 파괴하는 게 좋아.",
    "mangaChapter": 809,
    "verificationStatus": "secondary-excerpt",
    "translationStatus": "editorial",
    "context": "조우에서 라이조를 찾으라며 협박",
    "source": {
      "label": "만화wiki 2차 발언 정리 (원작 미대조)",
      "url": "https://mangakawiki.com/archives/11171"
    }
  },
  {
    "characterId": "katakuri",
    "originalJapanese": "おれはもうお前を格下とは思わねェ",
    "displayKorean": "이제 널 나보다 격이 낮다고 생각하지 않아.",
    "mangaChapter": 894,
    "verificationStatus": "secondary-excerpt",
    "translationStatus": "editorial",
    "context": "루피와의 사투에서 대등한 상대로 인정",
    "source": {
      "label": "만화wiki 2차 발언 정리 (원작 미대조)",
      "url": "https://mangakawiki.com/archives/10900"
    }
  },
  {
    "characterId": "cracker",
    "originalJapanese": "おれはビスケットの騎士クラッカー!!",
    "displayKorean": "나는 비스킷의 기사 크래커다!",
    "mangaChapter": 837,
    "verificationStatus": "secondary-excerpt",
    "translationStatus": "editorial",
    "context": "비스킷 병사의 정체와 전투 방식을 소개",
    "source": {
      "label": "만화wiki 2차 발언 정리 (원작 미대조)",
      "url": "https://mangakawiki.com/archives/10906"
    }
  },
  {
    "characterId": "linlin",
    "originalJapanese": "ライフ オア トリート",
    "displayKorean": "라이프 오어 트리트!",
    "mangaChapter": 828,
    "verificationStatus": "secondary-excerpt",
    "translationStatus": "editorial",
    "context": "빅 맘이 생명 또는 과자를 요구",
    "source": {
      "label": "만화wiki 2차 발언 정리 (원작 미대조)",
      "url": "https://mangakawiki.com/archives/5375"
    }
  },
  {
    "characterId": "smoker",
    "originalJapanese": "クソ喰らえってな",
    "displayKorean": "엿이나 먹으라고 전해.",
    "mangaChapter": 212,
    "verificationStatus": "secondary-excerpt",
    "translationStatus": "editorial",
    "context": "알라바스타에서 정부가 공적을 해군 것으로 조작하자 거부",
    "source": {
      "label": "만화wiki 2차 발언 정리 (원작 미대조)",
      "url": "https://mangakawiki.com/archives/4413"
    }
  },
  {
    "characterId": "tashigi",
    "originalJapanese": "何が正義…!! 何が海軍本部…!!",
    "displayKorean": "뭐가 정의고, 뭐가 해군본부라는 거야…!",
    "mangaChapter": 202,
    "verificationStatus": "secondary-excerpt",
    "translationStatus": "editorial",
    "context": "알라바스타에서 자신의 무력함과 부조리에 분노",
    "source": {
      "label": "만화wiki 2차 발언 정리 (원작 미대조)",
      "url": "https://mangakawiki.com/archives/4837"
    }
  },
  {
    "characterId": "akainu",
    "originalJapanese": "悪は可能性から根絶やしにせねばならん",
    "displayKorean": "악은 가능성부터 뿌리 뽑아야 한다.",
    "mangaChapter": 397,
    "verificationStatus": "secondary-excerpt",
    "translationStatus": "editorial",
    "context": "오하라에서 자신의 철저한 정의를 보여주는 발언",
    "source": {
      "label": "만화wiki 2차 발언 정리 (원작 미대조)",
      "url": "https://mangakawiki.com/archives/7608"
    }
  },
  {
    "characterId": "fujitora",
    "originalJapanese": "目ェ閉じなきゃよかったな あんたの顔見てみたい",
    "displayKorean": "눈을 감지 않았더라면 좋았을 텐데. 자네 얼굴이 보고 싶군.",
    "mangaChapter": 799,
    "verificationStatus": "secondary-excerpt",
    "translationStatus": "editorial",
    "context": "루피를 떠올리며 얼굴을 보고 싶어함",
    "source": {
      "label": "만화wiki 2차 발언 정리 (원작 미대조)",
      "url": "https://mangakawiki.com/archives/6605"
    }
  },
  {
    "characterId": "vergo",
    "originalJapanese": "訂正しろ…ヴェルゴさんだ",
    "displayKorean": "정정해라… 베르고 씨다.",
    "mangaChapter": 672,
    "verificationStatus": "secondary-excerpt",
    "translationStatus": "editorial",
    "context": "자신의 이름에 존칭을 붙이도록 요구하는 버릇",
    "source": {
      "label": "만화wiki 2차 발언 정리 (원작 미대조)",
      "url": "https://mangakawiki.com/archives/8435"
    }
  },
  {
    "characterId": "hancock",
    "originalJapanese": "そうよ わらわが美しいから!!",
    "displayKorean": "그래, 내가 아름답기 때문이지!",
    "mangaChapter": 516,
    "verificationStatus": "secondary-excerpt",
    "translationStatus": "editorial",
    "context": "무슨 행동을 해도 아름다움 때문에 용서된다는 자신감",
    "source": {
      "label": "만화wiki 2차 발언 정리 (원작 미대조)",
      "url": "https://mangakawiki.com/archives/3850"
    }
  },
  {
    "characterId": "mihawk",
    "originalJapanese": "このおれを越えてみよ ロロノア!!!",
    "displayKorean": "나를 넘어 보아라, 롤로노아!",
    "mangaChapter": 52,
    "verificationStatus": "secondary-excerpt",
    "translationStatus": "editorial",
    "context": "바라티에에서 조로에게 다시 도전하라고 독려",
    "source": {
      "label": "만화wiki 2차 발언 정리 (원작 미대조)",
      "url": "https://mangakawiki.com/archives/3017"
    }
  },
  {
    "characterId": "crocodile",
    "originalJapanese": "理想ってのは実力が伴う者のみ口にできる現実だ",
    "displayKorean": "이상은 실력이 뒷받침되는 자만이 말할 수 있는 현실이다.",
    "mangaChapter": 198,
    "verificationStatus": "secondary-excerpt",
    "translationStatus": "editorial",
    "context": "비비를 몰아붙이며 현실주의를 설파",
    "source": {
      "label": "만화wiki 2차 발언 정리 (원작 미대조)",
      "url": "https://mangakawiki.com/archives/3279"
    }
  },
  {
    "characterId": "buggy",
    "originalJapanese": "たちまち四皇!? いやさ勢い余って海賊王!?",
    "displayKorean": "곧장 사황? 아니, 기세를 몰아 해적왕까지?!",
    "mangaChapter": 549,
    "verificationStatus": "secondary-excerpt",
    "translationStatus": "editorial",
    "context": "상황을 이용해 자신의 명성을 부풀리는 익살",
    "source": {
      "label": "만화wiki 2차 발언 정리 (원작 미대조)",
      "url": "https://mangakawiki.com/archives/5033"
    }
  },
  {
    "characterId": "rayleigh",
    "originalJapanese": "今の時代を作れるのは今を生きてる人間だけだよ",
    "displayKorean": "지금 시대를 만드는 건 지금 살아가는 사람들이야.",
    "mangaChapter": 506,
    "verificationStatus": "secondary-excerpt",
    "translationStatus": "editorial",
    "context": "로저의 의지와 새 시대의 주인에 대해 이야기한 대표 발언; 공식 굿즈 인용에서도 뜻 확인",
    "source": {
      "label": "ONE PIECE.com 공식 보조자료 (일본어 전사 미대조)",
      "url": "https://one-piece.com/news/o20190805_9635/index.html"
    }
  },
  {
    "characterId": "ivankov",
    "originalJapanese": "奇跡は諦めない奴の頭上にしか降りて来ない",
    "displayKorean": "기적은 포기하지 않는 자의 머리 위에만 찾아온다!",
    "mangaChapter": 538,
    "verificationStatus": "secondary-excerpt",
    "translationStatus": "editorial",
    "context": "루피의 치료를 포기하지 않으려는 분들께 충고",
    "source": {
      "label": "만화wiki 2차 발언 정리 (원작 미대조)",
      "url": "https://mangakawiki.com/archives/4058"
    }
  },
  {
    "characterId": "lucci",
    "originalJapanese": "ここにいると殺しさえ正当化される",
    "displayKorean": "여기서는 살인마저 정당화되지.",
    "mangaChapter": 382,
    "verificationStatus": "secondary-excerpt",
    "translationStatus": "editorial",
    "context": "세계정부의 살육 명분에 관해 이야기",
    "source": {
      "label": "만화wiki 2차 발언 정리 (원작 미대조)",
      "url": "https://mangakawiki.com/archives/5241"
    }
  },
  {
    "characterId": "kaku",
    "originalJapanese": "わしはキリン気に入っとるんじゃ!!",
    "displayKorean": "난 기린이 마음에 든단 말이다!",
    "mangaChapter": 402,
    "verificationStatus": "secondary-excerpt",
    "translationStatus": "editorial",
    "context": "자신의 새 악마의 열매 변신 형태를 좋아함",
    "source": {
      "label": "만화wiki 2차 발언 정리 (원작 미대조)",
      "url": "https://mangakawiki.com/archives/5513"
    }
  },
  {
    "characterId": "kid",
    "originalJapanese": "この先はそれを口にする度胸のねぇ奴が死ぬ海だ",
    "displayKorean": "이 앞바다는 그걸 말할 배짱도 없는 자가 죽는 바다다.",
    "mangaChapter": 505,
    "verificationStatus": "secondary-excerpt",
    "translationStatus": "editorial",
    "context": "새로운 세계의 해적왕 꿈과 도전을 이야기",
    "source": {
      "label": "만화wiki 2차 발언 정리 (원작 미대조)",
      "url": "https://mangakawiki.com/archives/13495"
    }
  },
  {
    "characterId": "killer",
    "originalJapanese": "キッドに左腕はない!!!",
    "displayKorean": "키드에겐 왼팔이 없어!",
    "mangaChapter": 1029,
    "verificationStatus": "secondary-excerpt",
    "translationStatus": "editorial",
    "context": "호킨스의 짚인형 능력과 키드의 신체 특성을 이용한 역전",
    "source": {
      "label": "만화wiki 2차 발언 정리 (원작 미대조)",
      "url": "https://mangakawiki.com/archives/9463"
    }
  },
  {
    "characterId": "kinemon",
    "originalJapanese": "さァ 生きようぞ モモの助!!!",
    "displayKorean": "자, 살아가자꾸나, 모모노스케!",
    "mangaChapter": 696,
    "verificationStatus": "secondary-excerpt",
    "translationStatus": "editorial",
    "context": "모모노스케에게 생존과 희망을 다짐",
    "source": {
      "label": "만화wiki 2차 발언 정리 (원작 미대조)",
      "url": "https://mangakawiki.com/archives/8181"
    }
  },
  {
    "characterId": "ashura-doji",
    "originalJapanese": "ここから離れろ お前ら!!",
    "displayKorean": "여길 떠나라, 너희들!",
    "mangaChapter": 1008,
    "verificationStatus": "secondary-excerpt",
    "translationStatus": "editorial",
    "context": "오뎅을 모욕하는 위장 폭탄의 위협에서 동료를 구하며 희생",
    "source": {
      "label": "만화wiki 2차 발언 정리 (원작 미대조)",
      "url": "https://mangakawiki.com/archives/11467"
    }
  },
  {
    "characterId": "raizo",
    "originalJapanese": "あんたの夢なら拙者達の夢でござる",
    "displayKorean": "당신의 꿈이라면 저희의 꿈이기도 하옵니다!",
    "mangaChapter": 972,
    "verificationStatus": "secondary-excerpt",
    "translationStatus": "editorial",
    "context": "코즈키 오뎅에 대한 충성과 의지",
    "source": {
      "label": "만화wiki 2차 발언 정리 (원작 미대조)",
      "url": "https://mangakawiki.com/archives/11307"
    }
  },
  {
    "characterId": "whos-who",
    "originalJapanese": "おれにそのニカの話をした看守は後日消された",
    "displayKorean": "내게 니카 이야기를 해 준 간수는 나중에 사라졌지.",
    "mangaChapter": 1018,
    "verificationStatus": "secondary-excerpt",
    "translationStatus": "editorial",
    "context": "징베를 상대로 니카와 자신의 과거를 밝힘",
    "source": {
      "label": "만화wiki 2차 발언 정리 (원작 미대조)",
      "url": "https://mangakawiki.com/archives/11238"
    }
  },
  {
    "characterId": "sasaki",
    "originalJapanese": "黙れ!! 助走は長ェ方が威力は増す!!",
    "displayKorean": "닥쳐! 도움닫기가 길수록 위력은 강해진다!",
    "mangaChapter": 1019,
    "verificationStatus": "secondary-excerpt",
    "translationStatus": "editorial",
    "context": "자신의 공룡 기술을 자랑하며 프랑키와 대치",
    "source": {
      "label": "만화wiki 2차 발언 정리 (원작 미대조)",
      "url": "https://mangakawiki.com/archives/11243"
    }
  },
  {
    "characterId": "black-maria",
    "originalJapanese": "ねェニコ・ロビン あんたはカイドウ様のものになるのよ",
    "displayKorean": "니코 로빈, 넌 카이도 님의 것이 될 거야.",
    "mangaChapter": 1005,
    "verificationStatus": "secondary-excerpt",
    "translationStatus": "editorial",
    "context": "로빈을 유인·포획하려는 장면",
    "source": {
      "label": "만화wiki 2차 발언 정리 (원작 미대조)",
      "url": "https://mangakawiki.com/archives/11240"
    }
  },
  {
    "characterId": "ulti",
    "originalJapanese": "ウチのぺーたんナメたらシバキ殺すぞ",
    "displayKorean": "우리 페땅 무시하면 가만 안 둬!",
    "mangaChapter": 978,
    "verificationStatus": "secondary-excerpt",
    "translationStatus": "editorial",
    "context": "동생 페이지 원을 감싸며 위협",
    "source": {
      "label": "만화wiki 2차 발언 정리 (원작 미대조)",
      "url": "https://mangakawiki.com/archives/11188"
    }
  },
  {
    "characterId": "page-one",
    "originalJapanese": "オイ本当やめろ姉貴!!",
    "displayKorean": "누나, 진짜 그만해!",
    "mangaChapter": 978,
    "verificationStatus": "secondary-excerpt",
    "translationStatus": "editorial",
    "context": "울티와 티격태격하는 남매 관계",
    "source": {
      "label": "만화wiki 2차 발언 정리 (원작 미대조)",
      "url": "https://mangakawiki.com/archives/11185"
    }
  },
  {
    "characterId": "x-drake",
    "originalJapanese": "お前達と共に戦わせてくれ",
    "displayKorean": "너희들과 함께 싸우게 해 줘.",
    "mangaChapter": 990,
    "verificationStatus": "secondary-excerpt",
    "translationStatus": "editorial",
    "context": "배신이 드러나 루피 측에 협력을 구함",
    "source": {
      "label": "만화wiki 2차 발언 정리 (원작 미대조)",
      "url": "https://mangakawiki.com/archives/9373"
    }
  },
  {
    "characterId": "kanjuro",
    "originalJapanese": "最高の終幕だ おれの人生は美しい舞台",
    "displayKorean": "최고의 막이군. 내 인생은 아름다운 무대야.",
    "mangaChapter": 1008,
    "verificationStatus": "secondary-excerpt",
    "translationStatus": "editorial",
    "context": "코즈키 가문을 몰락시키는 자신의 연극을 말함",
    "source": {
      "label": "만화wiki 2차 발언 정리 (원작 미대조)",
      "url": "https://mangakawiki.com/archives/11557"
    }
  }
,
  {
  "characterId": "shiryu",
  "originalJapanese": "クズを斬って誰かが困るのか・・・？",
  "displayKorean": "쓰레기를 베었다고 누가 곤란해지기라도 하나?",
  "mangaChapter": 538,
  "verificationStatus": "secondary-excerpt",
  "translationStatus": "editorial",
  "context": "임펠다운에서 잔혹한 가치관을 드러냄",
  "source": {
    "label": "만화wiki 발언 전사 · 원작 직접 미대조",
    "url": "https://mangakawiki.com/archives/9110"
  }
},
{
  "characterId": "van-augur",
  "originalJapanese": "この世は全て強い望みの赴くままに巡り合う歯車なのである",
  "displayKorean": "이 세상은 강한 바람에 이끌려 만나는 운명의 톱니바퀴일 뿐이다.",
  "mangaChapter": 237,
  "verificationStatus": "secondary-excerpt",
  "translationStatus": "editorial",
  "context": "자야에서 운명과 만남에 대해 말함",
  "source": {
    "label": "만화wiki 발언 전사 · 원작 직접 미대조",
    "url": "https://mangakawiki.com/archives/9364"
  }
},
{
  "characterId": "ryokugyu",
  "originalJapanese": "差別とは安堵だ!!!",
  "displayKorean": "차별이란 안도감이다!",
  "mangaChapter": 1054,
  "verificationStatus": "secondary-excerpt",
  "translationStatus": "editorial",
  "context": "와노쿠니에서 차별을 정당화하는 왜곡된 세계관",
  "source": {
    "label": "만화wiki 발언 전사 · 원작 직접 미대조",
    "url": "https://mangakawiki.com/archives/8844"
  }
},
{
  "characterId": "pica",
  "originalJapanese": "国とは武力だ",
  "displayKorean": "국가란 무력이다!",
  "mangaChapter": 778,
  "verificationStatus": "secondary-excerpt",
  "translationStatus": "editorial",
  "context": "조로에 맞서 무력을 강조",
  "source": {
    "label": "만화wiki 발언 전사 · 원작 직접 미대조",
    "url": "https://mangakawiki.com/archives/10715"
  }
},
{
  "characterId": "diamante",
  "originalJapanese": "そこまで言うなら天才と認めるしかない!!!",
  "displayKorean": "그렇게까지 말한다면 천재라고 인정할 수밖에!",
  "mangaChapter": 700,
  "verificationStatus": "secondary-excerpt",
  "translationStatus": "editorial",
  "context": "도플라밍고의 칭찬을 받아들이는 우스꽝스러운 말버릇",
  "source": {
    "label": "만화wiki 발언 전사 · 원작 직접 미대조",
    "url": "https://mangakawiki.com/archives/10176"
  }
},
{
  "characterId": "nekomamushi",
  "originalJapanese": "何が滅ぼうとも敵に仲間は売らんぜよ!!!",
  "displayKorean": "무엇이 멸망하더라도 적에게 동료는 팔지 않는다!",
  "mangaChapter": 816,
  "verificationStatus": "secondary-excerpt",
  "translationStatus": "editorial",
  "context": "라이조를 보호한 밍크족의 신의",
  "source": {
    "label": "만화wiki 발언 전사 · 원작 직접 미대조",
    "url": "https://mangakawiki.com/archives/8437"
  }
},
{
  "characterId": "inuarashi",
  "originalJapanese": "ジャック ゆガラだけが話の通じぬ男だと思うな",
  "displayKorean": "잭, 말이 통하지 않는 게 너뿐인 줄 아나?",
  "mangaChapter": 809,
  "verificationStatus": "secondary-excerpt",
  "translationStatus": "editorial",
  "context": "밍크족이 침략자 잭에 맞서며 대응",
  "source": {
    "label": "만화wiki 발언 전사 · 원작 직접 미대조",
    "url": "https://mangakawiki.com/archives/13617"
  }
}
,
 {
  "characterId": "king",
  "originalJapanese": "カイドウさんこそ海賊王になる男!!",
  "displayKorean": "카이도 씨야말로 해적왕이 될 남자다!",
  "mangaChapter": 1035,
  "verificationStatus": "secondary-excerpt",
  "translationStatus": "editorial",
  "context": "카이도와의 약속을 떠올리며 충성을 선언",
  "source": {
    "label": "만화wiki 발언 전사 · 원작 직접 미대조",
    "url": "https://mangakawiki.com/archives/11159"
  }
},
{
  "characterId": "kawamatsu",
  "originalJapanese": "いかなる苦業も主君の無念をそう思えばそよ風!!",
  "displayKorean": "주군의 원통함을 생각한다면 어떤 고통도 산들바람일 뿐!",
  "mangaChapter": 948,
  "verificationStatus": "secondary-excerpt",
  "translationStatus": "editorial",
  "context": "13년 유폐를 견뎌내고 전장에 복귀",
  "source": {
    "label": "만화wiki 발언 전사 · 원작 직접 미대조",
    "url": "https://mangakawiki.com/archives/11469"
  }
},
{
  "characterId": "izo",
  "originalJapanese": "エースが守りオヤジが認めた男をおれ達は新しい時代へ送ってやる義務がある!!!",
  "displayKorean": "에이스가 지키고 아버지가 인정한 남자를 새로운 시대로 보내야 한다!",
  "mangaChapter": 578,
  "verificationStatus": "secondary-excerpt",
  "translationStatus": "editorial",
  "context": "정상전쟁에서 루피를 탈출시키려는 결의",
  "source": {
    "label": "만화wiki 발언 전사 · 원작 직접 미대조",
    "url": "https://mangakawiki.com/archives/8821"
  }
},
{
  "characterId": "kuzan",
  "originalJapanese": "徹底した正義は時に人を狂気に変える",
  "displayKorean": "철저한 정의는 때로 사람을 광기로 몰아넣지.",
  "mangaChapter": 397,
  "verificationStatus": "secondary-excerpt",
  "translationStatus": "editorial",
  "context": "오하라의 기억을 바탕으로 절대적 정의를 경계",
  "source": {
    "label": "만화wiki 발언 전사 · 원작 직접 미대조",
    "url": "https://mangakawiki.com/archives/5397"
  }
},
{
  "characterId": "pizarro",
  "originalJapanese": "おれ達だって名を売りてェよ",
  "displayKorean": "우리도 이름을 날리고 싶다고!",
  "mangaChapter": 1087,
  "verificationStatus": "secondary-excerpt",
  "translationStatus": "editorial",
  "context": "하치노스에서 해군 상대 명성을 얻으려 함",
  "source": {
    "label": "만화wiki 발언 전사 · 원작 직접 미대조",
    "url": "https://mangakawiki.com/archives/15174"
  }
},
{
  "characterId": "denjiro",
  "originalJapanese": "腕を上げてなきゃ20年生きた意味がない",
  "displayKorean": "실력이 늘지 않았다면 20년을 살아온 의미가 없다.",
  "mangaChapter": 978,
  "verificationStatus": "secondary-excerpt",
  "translationStatus": "editorial",
  "context": "오랜 잠입과 수련의 의미",
  "source": {
    "label": "만화wiki 발언 전사 · 원작 직접 미대조",
    "url": "https://mangakawiki.com/archives/11255"
  }
},
{
  "characterId": "kikunojo",
  "originalJapanese": "拙者は侍です!!",
  "displayKorean": "저는 무사입니다!",
  "mangaChapter": 914,
  "verificationStatus": "secondary-excerpt",
  "translationStatus": "editorial",
  "context": "자신의 정체를 자랑스럽게 선언",
  "source": {
    "label": "만화wiki 발언 전사 · 원작 직접 미대조",
    "url": "https://mangakawiki.com/archives/11309"
  }
}
] satisfies SecondaryQuote[]
export const v0412SecondaryQuotes: Record<string, CharacterQuoteReview> = Object.fromEntries(reviewed.map(q=>[q.characterId,q]))
