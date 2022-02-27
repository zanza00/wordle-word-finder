import "./styles.css";
import { useState } from "react";
import { findWords } from "./algo";

type fiveStringI = [string, string, string, string, string];
const fiveString: fiveStringI = ["", "", "", "", ""];

const emptyStringArr: string[] = [];
export default function App() {
  const [badLetters, setBadLetters] = useState("");

  const [greenLetters1, setGreenLetters1] = useState(fiveString);
  const [yellowLetters1, setYellowLetters1] = useState("");
  const [solState, setSolState] = useState("no-input");

  const viewLimit = 30;

  const [solutions, setSolutions] = useState(emptyStringArr);
  return (
    <div className="App">
      <h1>Basic Wordle word finder</h1>
      <h2>very manual and very beta</h2>
      <div>
        <label>
          Bad Letters
          <input
            className="lettersinput"
            type="text"
            value={badLetters}
            onChange={(e) => setBadLetters(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Good Letters
          <input
            type="text"
            className="lettersinput"
            value={yellowLetters1}
            onChange={(e) => setYellowLetters1(e.target.value)}
          />
        </label>
      </div>
      <div>
        Green Letters
        <div>
          {greenLetters1.map((l, i) => {
            return (
              <input
                className="letterbox"
                key={`green-${i}`}
                type="text"
                maxLength={1}
                height="24px"
                width="24px"
                value={l}
                onChange={(e) => {
                  const newArr: fiveStringI = [...greenLetters1];
                  newArr.splice(i, 1, e.target.value);
                  return setGreenLetters1(newArr);
                }}
              />
            );
          })}
        </div>
      </div>
      <div>
        <button
          className="get-words"
          onClick={() => {
            const sol = findWords(badLetters, yellowLetters1, greenLetters1);
            setSolutions(sol.solutions);
            setSolState(sol.state);
          }}
        >
          Get Words
        </button>
      </div>
      <div className="solutions">
        {solutions.slice(0, viewLimit).map((word) => {
          return (
            <div key={word} className="result">
              {word}
            </div>
          );
        })}
        {solutions.length > viewLimit && (
          <div className="solutions-more">
            And {solutions.length - viewLimit} more
          </div>
        )}
        {solState === "with-input" && (
          <div className="solutions-more">
            No solutions :(
            <br />
            change letters please
          </div>
        )}
      </div>
    </div>
  );
}
