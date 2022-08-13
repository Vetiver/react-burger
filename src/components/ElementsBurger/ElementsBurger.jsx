import {ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components'
export default function ElementBurger(props)  {
  
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'flex-end'}}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text="Краторная булка N-200i (верх)"
          price={200}
          thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
        />
        {props.children}
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text="Краторная булка N-200i (низ)"
          price={200}
          thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
        />
      </div>
    )
  }