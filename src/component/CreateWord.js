import React, { useRef } from "react";
import useFetch from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";

function CreateWord(props) {
  const days = useFetch("http://localhost:3001/days");
  const history = useNavigate();
  function onSubmit(e) {
    e.preventDefault();

    fetch(`http://localhost:3001/words/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        day: dayRef.current.value,
        eng: engRef.current.value,
        kor: korRef.current.value,
        inDone: false,
      }),
    }).then((res) => {
      if (res.ok) {
        alert("생성이 완료 되었습니다.");
        history(`/day/${dayRef.current.value}`);
      }
    });
  }

  const engRef = useRef(null);
  const korRef = useRef(null);
  const dayRef = useRef(null);
  return (
    <form onSubmit={onSubmit}>
      <div className="input_area">
        <label>Eng</label>
        <input type="text" placeholder="computer" ref={engRef} />
      </div>
      <div className="input_area">
        <label>Kor</label>
        <input type="text" placeholder="컴퓨터" ref={korRef}></input>
      </div>
      <div className="input_area">
        <label>Day</label>
        <select ref={dayRef}>
          {days.map((day) => (
            <option key={day.id} value={day.day}>
              {day.day}
            </option>
          ))}
        </select>
      </div>
      <button>저장</button>
    </form>
  );
}

export default CreateWord;
