// import classes from '@components/ManyOptions/ManyOptions.module.css';
import { IQuestionProps } from '@customTypes/default.types';
import { useState } from 'react';

export default function ManyOptions({
  questionID,
  question,
  answerOptions,
  action,
  memory,
  currentQuestionNumber,
}: IQuestionProps) {
  let [answerNumber, setAnswerNumber] = useState<boolean[]>(
    Array.isArray(memory) && memory.every((el) => typeof el === 'boolean')
      ? memory
      : [false]
  );
  function selectChange(value: number): void {
    setAnswerNumber((ex) => ex.map((m, i) => (i === value ? !m : m)));
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
                type='checkbox'
                name={`question-${questionID}`}
                id={`question-${questionID}-${i}`}
                value={i + 1}
                defaultChecked={
                  Array.isArray(memory) ? memory[i] === true : false
                }
                onChange={() => selectChange(i)}
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
        disabled={answerNumber.every((e) => e === false)}
        onClick={
          action ? () => action(answerNumber, currentQuestionNumber) : () => {}
        }
      >
        Ответить
      </button>
    </>
  );
}
