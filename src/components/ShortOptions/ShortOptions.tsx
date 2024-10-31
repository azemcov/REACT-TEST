// import classes from '@components/ShortOptions/ShortOptions.module.css'
import { IQuestionProps } from '@customTypes/default.types';
import { useState } from 'react';

export default function ShortOptions({
  questionID,
  question,
  action,
  memory,
  currentQuestionNumber,
}: IQuestionProps) {
  let [replyText, setReplyText] = useState<string>(
    typeof memory === 'string' ? memory : ''
  );

  function recordChanges(value: string): void {
    setReplyText(value);
    action ? action(replyText, currentQuestionNumber, 'stay') : 0;
  }

  return (
    <>
      <p className='h5 text-start'>{question}</p>
      <br />

      <div className='mw-100 text-start h-100'>
        <div className='input-group flex-nowrap'>
          <input
            type='text'
            className='form-control'
            value={replyText}
            aria-label={`text-${questionID}`}
            onChange={(event) => recordChanges(event.target.value)}
            // style={{ resize: 'none', height: '20vh' }}
            // aria-describedby='addon-wrapping'
          />
        </div>
      </div>
      <br />

      <button
        type='button'
        className='btn btn-danger d-flex justify-content-start'
        disabled={replyText === ``}
        onClick={
          action ? () => action(replyText, currentQuestionNumber) : () => {}
        }
      >
        Ответить
      </button>
    </>
  );
}
