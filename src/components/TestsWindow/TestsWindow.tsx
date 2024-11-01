import { TMemory, IData } from '@customTypes/default.types';

export default function TestWindow({
  loadedQuestionsData,
  memory,
  action,
}: {
  loadedQuestionsData: IData[] | null;
  memory: TMemory[];
  action: Function;
}) {
  function spanner(strings: TemplateStringsArray, ...keys: string[]) {
    let finalString = ``;
    keys.forEach((value: any, i: number) => {
      if (i === 0) {
        finalString += `<strong>${strings[i]}${value}</strong>`;
      } else {
        finalString += `<strong>${strings[i]}</strong>${value}`;
      }
    });
    finalString += strings[strings.length - 1];
    return `${finalString}`;
  }

  function compareSingle(mdata: IData, indx: number): string {
    let userAnswer: string = mdata.answerOptions
      ? mdata.answerOptions[
          typeof memory[indx] === 'number' ? memory[indx] - 1 : 0
        ]
      : '';
    userAnswer = typeof userAnswer === 'string' ? userAnswer : '';
    let correctAnswer: string = mdata.answerOptions
      ? mdata.answerOptions[
          typeof mdata.answersCode === 'number' ? mdata.answersCode : 0
        ]
      : '';
    return spanner`Вопрос № ${(indx + 1).toString()}
    ${mdata.question}
    Ваш ответ:
    ${userAnswer}
    Верный ответ:
    ${correctAnswer}
    `;
  }
  function compareMuch(mdata: IData, indx: number): string {
    let userAnswer = mdata.answerOptions
      ? Array.isArray(memory[indx])
        ? memory[indx]
            .map((m, i) =>
              m && mdata.answerOptions ? mdata.answerOptions[i] : ''
            )
            .filter(Boolean)
            .join('; ')
        : ''
      : '';
    userAnswer = typeof userAnswer === 'string' ? userAnswer : '';
    let correctAnswer: string =
      mdata.answerOptions && Array.isArray(mdata.answersCode)
        ? mdata.answersCode
            .map((m, i) =>
              m && mdata.answerOptions ? mdata.answerOptions[i] : ''
            )
            .filter(Boolean)
            .join('; ')
        : '';

    return spanner`Вопрос № ${(indx + 1).toString()}
    ${mdata.question}
    Ваши ответы:
    ${userAnswer}
    Верные ответы:
    ${correctAnswer}
    `;
  }
  function compareShort(mdata: IData, indx: number): string {
    let userAnswer = typeof memory[indx] === 'string' ? memory[indx] : '';
    userAnswer = typeof userAnswer === 'string' ? userAnswer : '';
    let correctAnswer: string =
      typeof mdata.answersCode === 'string' ? mdata.answersCode : '';
    return spanner`Вопрос № ${(indx + 1).toString()}
    ${mdata.question}
    Ваш ответ:
    ${userAnswer}
    Верный ответ:
    ${correctAnswer}
    `;
  }
  function compareDetailed(mdata: IData, indx: number): string {
    let userAnswer = typeof memory[indx] === 'string' ? memory[indx] : '';
    userAnswer = typeof userAnswer === 'string' ? userAnswer : '';
    let correctAnswer: string =
      typeof mdata.answersCode === 'string' ? mdata.answersCode : '';
    return spanner`Вопрос № ${(indx + 1).toString()}
    ${mdata.question}
    Ваш ответ:
    ${userAnswer}
    Верный ответ:
    ${correctAnswer}
    `;
  }
  function test(mdata: IData, indx: number): string {
    if (mdata.type === 'single') {
      return compareSingle(mdata, indx);
    } else if (mdata.type === 'much') {
      return compareMuch(mdata, indx);
    } else if (mdata.type === 'short') {
      return compareShort(mdata, indx);
    } else if (mdata.type === 'detailed') {
      return compareDetailed(mdata, indx);
    } else {
      return '';
    }
  }

  return (
    <>
      <p className='h2'>Тестирование завершено</p>
      {loadedQuestionsData !== null && (
        <div className='pb-5 d-flex ' style={{ height: '80vh' }}>
          <div className='overflow-scroll text-start'>
            {Array.isArray(loadedQuestionsData)
              ? loadedQuestionsData.map((m, i) => (
                  <div>
                    <div
                      key={`test_window-key-${i}`}
                      dangerouslySetInnerHTML={{ __html: test(m, i) }}
                    />
                    <br />
                  </div>
                ))
              : 'Ошибка данных!'}
          </div>
        </div>
      )}
      <button
        type='button'
        className='btn btn-danger d-flex flex-row justify-content-start'
        disabled={false}
        onClick={() => action()}
      >
        Пройти заново
      </button>
    </>
  );
}
