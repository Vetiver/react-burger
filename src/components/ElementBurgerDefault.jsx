import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
export default function ElementBurger( {bun, children, bunTarget} ) {
  return (
    <div ref={bunTarget}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        alignItems: "flex-end",
      }}
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
