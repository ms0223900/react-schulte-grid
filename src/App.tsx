import { DetailedHTMLProps, useEffect, useState } from "react";
import shuffleArr from "./functions/shuffle";
import useTimer from "./functions/useTimer";
import "./index.scss";

const DEFAULT_GRID_AMOUNT = Math.pow(5, 2);

export interface GridItemProps
  extends DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  id: string;
  num: number;
}

const GridItem = (props: GridItemProps) => (
  <div className={"grid-item"} {...props}>
    {props.num}
  </div>
);

const makeGridListData = (gridAmount = DEFAULT_GRID_AMOUNT): GridItemProps[] =>
  Array(gridAmount)
    .fill(0)
    .map((i, _idx) => ({
      id: _idx.toString(),
      num: _idx + 1,
    }));

const makeRandomGridListData = (gridAmount = DEFAULT_GRID_AMOUNT) =>
  shuffleArr(makeGridListData(gridAmount));

export default function App() {
  // const gridListData = shuffleArr(makeGridListData(DEFAULT_GRID_AMOUNT));
  const [gridListData, setGridListData] = useState(
    makeRandomGridListData(DEFAULT_GRID_AMOUNT)
  );
  // const [time, setTime] = useState(0);
  const [clickedNum, setClickedNum] = useState<number | null>(null);
  const [recordTimeListData, setRecordTimeListData] = useState<string[]>([]);

  const { isTicking, setTimerTicking, time, setTime, handledTime } = useTimer();

  const handleClickNum = (num: number) => {
    if (clickedNum === null && num === 1) {
      setTimerTicking(true);
      setClickedNum(1);
      return;
    }

    setClickedNum((n) => {
      if (n === null) return n;
      if (num === n + 1) return num;
      return n;
    });
  };

  const handleStopGame = () => {
    setTimerTicking(false);
  };

  const handleRestart = () => {
    handleStopGame();
    setClickedNum(null);
    setClickedNum(null);
    setTime(0);
    setGridListData(makeRandomGridListData(DEFAULT_GRID_AMOUNT));
  };

  const handleGameOver = () => {
    handleStopGame();
    setRecordTimeListData((r) => [...r, handledTime]);
  };

  useEffect(() => {
    if (clickedNum === DEFAULT_GRID_AMOUNT) {
      handleGameOver();
    }
  }, [clickedNum]);

  return (
    <main className={"app"}>
      <div className={"top-part"}>
        <h2>舒爾特方格</h2>
        <div>
          <h3>
            Time: <span>{handledTime}</span>
          </h3>
          <button className={"restart-btn"} onClick={handleRestart}>
            Restart
          </button>
        </div>
      </div>
      <hr />
      <div className={"main-part"}>
        <div
          className={"grid-list"}
          style={{
            maxWidth: 100 * Math.pow(DEFAULT_GRID_AMOUNT, 0.5),
          }}
        >
          {gridListData.map((g) => (
            <GridItem key={g.id} {...g} onClick={() => handleClickNum(g.num)} />
          ))}
        </div>
        <div>
          <h4>秒數紀錄</h4>
          <ul>
            {recordTimeListData.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
