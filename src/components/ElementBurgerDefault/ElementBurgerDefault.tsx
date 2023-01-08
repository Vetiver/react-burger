import Style from "../ElementBurgerDefault/ElementBurgerDefault.module.css";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";

interface IElementBurgerProps {
  children: string;
  bunTarget: string;
}
export const ElementBurger:React.FC<IElementBurgerProps> = ({ children, bunTarget }) => {
  return (
    <div ref={bunTarget} className={`${Style.element}`}>
      <ConstructorElement
        type="top"
        isLocked={true}
        text="Выберите Булку"
        price = {0}
        thumbnail="https://code.s3.yandex.net/react/code/bun-02-mobile.png"
      />
      {children}
      <ConstructorElement
        type="bottom"
        isLocked={true}
        text="Выберите Булку"
        price = {0}
        thumbnail="https://code.s3.yandex.net/react/code/bun-02-mobile.png"
      />
    </div>
  );
}
