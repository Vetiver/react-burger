import React, { useState, useEffect, useRef } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import Style from "../Tab/Tab.module.css";

export default function Tabs({ bunRef, sauseRef, mainRef }) {
  function target() {
    bunRef.current.scrollIntoView({ block: "center", behavior: "smooth" });
    setCurrent("bun");
  }
  function target2() {
    sauseRef.current.scrollIntoView({ block: "center", behavior: "smooth" });
    setCurrent("sause");
  }
  function target3() {
    mainRef.current.scrollIntoView({ block: "center", behavior: "smooth" });
    setCurrent("main");
  }

  useEffect(() => {
    const observer1 = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // если элемент является наблюдаемым
          if (entry.isIntersecting) {
            setCurrent("sause");
          }
        });
      },
      { threshold: 1 }
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // если элемент является наблюдаемым
          if (entry.isIntersecting) {
            setCurrent("bun");
          }
        });
      },
      { threshold: 1 }
    );

    const observer2 = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // если элемент является наблюдаемым
          if (entry.isIntersecting) {
            setCurrent("main");
          }
        });
      },
      { threshold: 1 }
    );

    setTimeout(() => {
      observer1.observe(sauseRef.current);
    }, 1000);
    setTimeout(() => {
      observer.observe(bunRef.current);
    }, 1000);
    setTimeout(() => {
      observer2.observe(mainRef.current);
    }, 1000);
  }, []);

  const [current, setCurrent] = useState("bun");
  return (
    <div className={`${Style.mainContainer}`}>
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
