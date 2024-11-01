import { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import SingleOption from '@components/SingleOption/SingleOption';
import ManyOptions from '@components/ManyOptions/ManyOptions';
import ShortOptions from '@components/ShortOptions/ShortOptions';
import DetailedOptions from '@components/DetailedOptions/DetailedOptions';
import TestWindow from '@components/TestsWindow/TestsWindow';
import testQuestionData from '@src/data';
import { IData, TMemory } from '@customTypes/default.types';

function App() {
  let [timeMinutes, setTimeMinutes] = useState<number>(20);
  let [timeSeconds, setTimeSeconds] = useState<number>(0);
  let [finishTime, setFinishTime] = useState<number>(0);
  let [timeIsOver, setTimeIsOver] = useState<boolean>(false);
  let [tick, setTick] = useState(false);
  let [testQuestionDataIsLoaded, setTestQuestionDataIsLoaded] =
    useState<boolean>(false);
  let [testIsStarted, setTestIsStarted] = useState<boolean>(false);
  let [sections, setSections] = useState<boolean[]>([false]);
  let [loadedQuestionsData, setLoadedQuestionsData] = useState<IData[] | null>(
    null
  );
  let [currentQuestionNumber, setCurrentQuestionNumber] = useState<number>(0);
  let [memory, setMemory] = useState<TMemory[]>(['no data']);

  useEffect(() => {
    if (testIsStarted) {
      const delta = finishTime - Date.now();
      if (delta < 0) {
        setTimeIsOver(true);
        return () => {};
      }
      setTimeMinutes(Math.floor(delta / 60000));
      setTimeSeconds(Math.floor((delta / 1000) % 60));
    }
  }, [tick]);

  useEffect(() => {
    let timerID: number | NodeJS.Timeout;
    if (!timeIsOver) {
      timerID = setInterval(() => setTick(!tick), 1000);
    }
    return () => clearInterval(timerID);
  }, [tick]);

  // типа ждём ответ от сервера ⌛️
  useEffect(() => {
    let localMemory = localStorage.getItem('memory');
    setTimeout(() => {
      let jsonString = JSON.stringify(testQuestionData);
      let data = JSON.parse(jsonString);
      setLoadedQuestionsData(data);
      createMemory(data);
      setTestQuestionDataIsLoaded(true);
      if (localMemory) {
        setFinishTime(setTimer());
        setTestIsStarted(true);
      } else {
      }
    }, 1500);
  }, []);

  useEffect(() => {
    if (memory[0] !== 'no data') {
      localStorage.setItem('memory', JSON.stringify(memory));
      localStorage.setItem('sections', JSON.stringify(sections));
    }
  }, [memory]);

  useEffect(() => {
    if (testIsStarted) {
      localStorage.setItem('finishTime', JSON.stringify(finishTime));
    }
  }, [timeSeconds]);

  function createMemory(data: IData[]): void {
    let localMemory = localStorage.getItem('memory');
    let localSections = localStorage.getItem('sections');
    if (localMemory && localSections) {
      setMemory(JSON.parse(localMemory));
      setSections(JSON.parse(localSections));
    } else {
      setSections(Array(data.length).fill(false));
      let arr = data.map((m) => {
        if (m.type === 'single') {
          return 0;
        } else if (m.type === 'much') {
          return m.answerOptions ? m.answerOptions.map(() => false) : [false];
        } else {
          return '';
        }
      });
      setMemory(arr);
    }
  }

  function setTimer(): number {
    let fT = localStorage.getItem('finishTime');
    if (fT) {
      return JSON.parse(fT);
    } else {
      return Date.now() + timeMinutes * 60000 + timeSeconds * 1000;
    }
  }

  function nextQuestion(
    options: number | boolean[] | string,
    curNum: number,
    stop: undefined | 'stay'
  ): void {
    if (stop !== 'stay') {
      if (currentQuestionNumber < sections.length - 1) {
        setCurrentQuestionNumber(currentQuestionNumber + 1);
      } else {
        setCurrentQuestionNumber(0);
      }
    }
    setMemory((cur) => cur.map((m, i) => (i === curNum ? options : m)));
    setSections((cur) =>
      cur.map((m, i) => (i === currentQuestionNumber ? true : m))
    );
  }

  function restart() {
    localStorage.clear();
    window.location.reload();
    // location.reload()
  }

  return (
    <>
      {!testIsStarted && !timeIsOver && (
        <button
          type='button'
          className='btn btn-danger d-flex justify-content-start'
          disabled={!testQuestionDataIsLoaded}
          onClick={() => {
            setFinishTime(setTimer());
            setTestIsStarted(true);
          }}
        >
          {testQuestionDataIsLoaded ? 'Начать тестирование' : 'Загрузка теста'}
        </button>
      )}
      {testQuestionDataIsLoaded && !timeIsOver && testIsStarted && (
        <div>
          <div className='d-flex flex-row align-items-center'>
            <p className='h2' style={{ marginRight: '10px' }}>
              Тестирование
            </p>
            <div className='border border-secondary rounded-2 d-flex justify-content-center align-items-center px-3'>
              <p className='mb-0 font-monospace'>{`${timeMinutes}:${
                timeSeconds < 10 ? '0' + timeSeconds.toString() : timeSeconds
              }`}</p>
            </div>
          </div>

          <div
            className='d-flex flex-row justify-content-between'
            style={{ width: '80vw' }}
          >
            {sections.map((_, i) => (
              <>
                <div
                  className={`w-100 py-1 mx-1 ${
                    currentQuestionNumber === i
                      ? 'bg-danger'
                      : sections[i] === true
                      ? 'bg-dark'
                      : 'bg-light'
                  }`}
                  key={`sections-key-${i}`}
                ></div>
              </>
            ))}
          </div>
          <br />

          {loadedQuestionsData !== null &&
            loadedQuestionsData[currentQuestionNumber].type === 'much' && (
              <ManyOptions
                questionID={
                  loadedQuestionsData !== null
                    ? loadedQuestionsData[currentQuestionNumber].questionID
                    : 0
                }
                question={
                  loadedQuestionsData !== null
                    ? loadedQuestionsData[currentQuestionNumber].question
                    : 'Ошибка данных!'
                }
                answerOptions={
                  loadedQuestionsData !== null
                    ? loadedQuestionsData[currentQuestionNumber].answerOptions
                    : ['Ошибка данных!']
                }
                action={(a: boolean[], b: number, c: undefined) =>
                  nextQuestion(a, b, c)
                }
                memory={memory[currentQuestionNumber]}
                currentQuestionNumber={currentQuestionNumber}
              ></ManyOptions>
            )}

          {loadedQuestionsData !== null &&
            loadedQuestionsData[currentQuestionNumber].type === 'single' && (
              <SingleOption
                questionID={
                  loadedQuestionsData !== null
                    ? loadedQuestionsData[currentQuestionNumber].questionID
                    : 0
                }
                question={
                  loadedQuestionsData !== null
                    ? loadedQuestionsData[currentQuestionNumber].question
                    : 'Ошибка данных!'
                }
                answerOptions={
                  loadedQuestionsData !== null
                    ? loadedQuestionsData[currentQuestionNumber].answerOptions
                    : ['Ошибка данных!']
                }
                action={(a: number, b: number, c: undefined) =>
                  nextQuestion(a, b, c)
                }
                memory={memory[currentQuestionNumber]}
                currentQuestionNumber={currentQuestionNumber}
              ></SingleOption>
            )}

          {loadedQuestionsData !== null &&
            loadedQuestionsData[currentQuestionNumber].type === 'detailed' && (
              <DetailedOptions
                questionID={
                  loadedQuestionsData !== null
                    ? loadedQuestionsData[currentQuestionNumber].questionID
                    : 0
                }
                question={
                  loadedQuestionsData !== null
                    ? loadedQuestionsData[currentQuestionNumber].question
                    : 'Ошибка данных!'
                }
                action={(a: string, b: number, c: undefined | 'stay') =>
                  nextQuestion(a, b, c)
                }
                memory={memory[currentQuestionNumber]}
                currentQuestionNumber={currentQuestionNumber}
              ></DetailedOptions>
            )}

          {loadedQuestionsData !== null &&
            loadedQuestionsData[currentQuestionNumber].type === 'short' && (
              <ShortOptions
                questionID={
                  loadedQuestionsData !== null
                    ? loadedQuestionsData[currentQuestionNumber].questionID
                    : 0
                }
                question={
                  loadedQuestionsData !== null
                    ? loadedQuestionsData[currentQuestionNumber].question
                    : 'Ошибка данных!'
                }
                action={(a: string, b: number, c: undefined | 'stay') =>
                  nextQuestion(a, b, c)
                }
                memory={memory[currentQuestionNumber]}
                currentQuestionNumber={currentQuestionNumber}
              ></ShortOptions>
            )}
          <br />
        </div>
      )}
      {sections.every((e) => e === true) && !timeIsOver && (
        <button
          type='button'
          className='btn btn-danger d-flex justify-content-start'
          disabled={false}
          onClick={() => setTimeIsOver(true)}
        >
          Закончить тестирование
        </button>
      )}

      {timeIsOver && (
        <>
          <TestWindow
            loadedQuestionsData={loadedQuestionsData}
            memory={memory}
            action={() => restart()}
          ></TestWindow>
        </>
      )}
    </>
  );
}

export default App;
