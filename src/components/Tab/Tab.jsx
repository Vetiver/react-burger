import React, { useState } from 'react';
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

export default function Tabs() {

  const bunCont = document.getElementById('bun');
  const sauseCont = document.getElementById('sauses');
  const mainCont = document.getElementById('main')
  function target() {
    bunCont.scrollIntoView({block: "center", behavior: "smooth"});
    setCurrent('bun')
  }
  function target2() {
    sauseCont.scrollIntoView({block: "center", behavior: "smooth"});
    setCurrent('sause')
  }
  function target3() {
    mainCont.scrollIntoView({block: "center", behavior: "smooth"});
    setCurrent('main')
  }
    const [current, setCurrent] = useState("bun");
    return (
      <div style={{ display: "flex" }}>
        <Tab value="bun" active={current === "bun"} onClick={target}>
          Булки
        </Tab>
        <Tab value="sause" active={current === "sause"} onClick={target2}>
          Соусы
        </Tab>
        <Tab value="main" active={current === "main"} onClick={target3}>
          Начинки
        </Tab>
      </div>
    );
  }