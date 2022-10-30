import  Style  from '../ElementBurgerDefault/ElementBurgerDefault.module.css';
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
export default function ElementBurger( {children, bunTarget} ) {
  return (
    <div ref={bunTarget}
    className={`${Style.element}`}
    >
      <ConstructorElement
        type="top"
        isLocked={true}
        text='Выберите Булку'
        price=''
        thumbnail='https://code.s3.yandex.net/react/code/bun-02-mobile.png'
      />
      {children}
      <ConstructorElement
        type="bottom"
        isLocked={true}
        text='Выберите Булку'
        price=''
        thumbnail='https://code.s3.yandex.net/react/code/bun-02-mobile.png'
      />
    </div>
  );
}
