import React, { useState, useEffect, useRef } from 'react';
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import Style from "../Tab/Tab.module.css";
import $ from "jquery";

export default function Tabs() {
  const scrollBar = document.getElementById('scrollBar');

  const bunCont = document.getElementById('bun');
  const sauseCont = document.getElementById('sauses');
  const mainCont = document.getElementById('main');
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
  
  const observer1 = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // если элемент является наблюдаемым
      if (entry.isIntersecting) {
        setCurrent('sause')
      }})
  }, {threshold: 1})
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // если элемент является наблюдаемым
      if (entry.isIntersecting) {
        setCurrent('bun')
      }}) 
  }, {threshold: 1})
  
  const observer2 = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // если элемент является наблюдаемым
      if (entry.isIntersecting) {
        setCurrent('main')
      }})
  }, {threshold: 1})
  setTimeout(() => {  observer1.observe(sauseCont) }, 1000);
  setTimeout(() => {  observer.observe(bunCont) }, 1000);
  setTimeout(() => {  observer2.observe(mainCont) }, 1000);

  
  const [current, setCurrent] = useState("bun");
    return (
      <div className={`${Style.mainContainer}`}>

        <Tab   value="bun" active={current === "bun"} onClick={target}>
          Булки
        </Tab>
        <Tab  value="sause" active={current === "sause"} onClick={target2}>
          Соусы
        </Tab>
        <Tab  value="main" active={current === "main"} onClick={target3}>
          Начинки
        </Tab>
      </div>
    )
  }