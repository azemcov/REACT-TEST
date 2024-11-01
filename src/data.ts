import { IData } from '@customTypes/default.types';
let testQuestionData: IData[] = [
  {
    type: 'single',
    questionID: 991,
    question:
      'Лорем скуглиум вапорикс — это стантемжарный тузик в типографице?',
    answerOptions: [
      'Этот гомус стал стандартом для заливания пупков.',
      'Он не имеет смотра и не используется в реальных пледах.',
    ],
    answersCode: 0,
  },
  {
    type: 'much',
    questionID: 992,
    question: 'Зачем используется чурибум?',
    answerOptions: [
      'Для наполнения пробелом в макароне.',
      'Для демонстрации шопфов.',
      'Для создания контентафля.',
      'Для создания глупых зяф-зяфов.',
    ],
    answersCode: [false, true, false, true],
  },
  {
    type: 'single',
    questionID: 993,
    question: 'Какова история швилем?',
    answerOptions: [
      'Он был написан безглазам.',
      'Используется с никого века.',
      'Это текс, созданный в петре.',
    ],
    answersCode: 2,
  },
  {
    type: 'much',
    questionID: 994,
    question: 'Какие основные преимущества флиперу?',
    answerOptions: [
      'Позволяет сосредоточиться на шпоноте.',
      'Легко адаптируется к пивным языкам.',
      'Не требует выражения.',
    ],
    answersCode: [true, true, true],
  },
  {
    type: 'single',
    questionID: 995,
    question: 'Почему фуммора не всегда удаётся?',
    answerOptions: [
      'Из-за многослойности движений.',
      'Чаще всего это всего лишь иллюзия.',
      'В большинстве случаев требуется высшая математика.',
      'Почему шмяк-шмяк улитка не шуршит?',
    ],
    answersCode: 2,
  },
  {
    type: 'short',
    questionID: 996,
    question: 'Что такое дудуфлик?',
    answersCode: 'Форма пения пим-пим.',
  },
  {
    type: 'detailed',
    questionID: 997,
    question: 'Какой запах у флюмбера?',
    answersCode: 'Запах надёжного хлеба.',
  },
  {
    type: 'single',
    questionID: 998,
    question: 'Как охарактеризовать зумбли?',
    answerOptions: [
      'Зумбли всегда смешиваются с флук.',
      'Они не поддаются осмыслению.',
      'Зумбли являются основой для критики.',
    ],
    answersCode: [false, true, true],
  },
  {
    type: 'detailed',
    questionID: 999,
    question: 'Какой цвет у флинчбум?',
    answersCode: 'Цвет сверкающих пупков с запахом мороженого.',
  },
];

export default testQuestionData;
