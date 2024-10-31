import { TMemory, IData } from '@customTypes/default.types';

export default function TestWindow({
  loadedQuestionsData,
  memory,
}: {
  loadedQuestionsData: IData[] | null;
  memory: TMemory[];
}) {
  function compareSingle(mdata: IData, indx: number): string {
    let userAnswer: string = mdata.answerOptions
      ? mdata.answerOptions[
          typeof memory[indx] === 'number' ? memory[indx] - 1 : 0
        ]
      : '';
    let correctAnswer: string = mdata.answerOptions
      ? mdata.answerOptions[
          typeof mdata.answersCode === 'number' ? mdata.answersCode : 0
        ]
      : '';
    return `Вопрос № ${indx + 1}
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
    let correctAnswer: string =
      mdata.answerOptions && Array.isArray(mdata.answersCode)
        ? mdata.answersCode
            .map((m, i) =>
              m && mdata.answerOptions ? mdata.answerOptions[i] : ''
            )
            .filter(Boolean)
            .join('; ')
        : '';

    return `Вопрос № ${indx + 1}
    ${mdata.question}
    Ваши ответы:
    ${userAnswer}
    Верные ответы:
    ${correctAnswer}
    `;
  }
  function compareShort(mdata: IData, indx: number): string {
    let userAnswer = typeof memory[indx] === 'string' ? memory[indx] : '';
    let correctAnswer: string =
      typeof mdata.answersCode === 'string' ? mdata.answersCode : '';
    return `Вопрос № ${indx + 1}
    ${mdata.question}
    Ваш ответ:
    ${userAnswer}
    Верный ответ:
    ${correctAnswer}
    `;
  }
  function compareDetailed(mdata: IData, indx: number): string {
    let userAnswer = typeof memory[indx] === 'string' ? memory[indx] : '';
    let correctAnswer: string =
      typeof mdata.answersCode === 'string' ? mdata.answersCode : '';
    return `Вопрос № ${indx + 1}
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
      {typeof loadedQuestionsData !== null && (
        <div className='py-5 vh-100 overflow-scroll'>
          {Array.isArray(loadedQuestionsData)
            ? loadedQuestionsData.map((m, i) => (
                <div key={`test_window-key-${i}`}>
                  {test(m, i)}
                  <br />
                </div>
              ))
            : 'Ошибка данных!'}
        </div>
      )}
    </>
  );
}
