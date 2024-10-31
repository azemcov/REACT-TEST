// import classes from '@components/SingleOption/SingleOption.module.css';
import { IQuestionProps } from '@customTypes/default.types';
import { useState } from 'react';

export default function SingleOption({
  questionID,
  question,
  answerOptions,
  action,
  memory,
  currentQuestionNumber,
}: IQuestionProps) {
  let [answerNumber, setAnswerNumber] = useState<number>(
    typeof memory === 'number' ? memory : 0
  );
  function selectChange(value: number): void {
    setAnswerNumber(value);
  }

  return (
    <>
      <p className='h5 text-start'>{question}</p>
      <br />
      <div className='mw-100 text-start'>
        {answerOptions !== undefined ? (
          answerOptions.map((m, i) => (
            <div className='form-check' key={`key-${questionID}-${i}`}>
              <input
                className='form-check-input'
                type='radio'
                name={`question-${questionID}`}
                id={`question-${questionID}-${i}`}
                value={i + 1}
                defaultChecked={memory === i + 1}
                onChange={() => selectChange(i + 1)}
              />
              <label
                className='form-check-label'
                htmlFor={`question-${questionID}-${i}`}
              >
                {m}
              </label>
            </div>
          ))
        ) : (
          <p>Ошибка данных!</p>
        )}
      </div>
      <br />
      <button
        type='button'
        className='btn btn-danger d-flex justify-content-start'
        disabled={answerNumber === 0}
        onClick={
          action ? () => action(answerNumber, currentQuestionNumber) : () => {}
        }
      >
        Ответить
      </button>
    </>
  );
}
