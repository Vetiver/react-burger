import React, { Component } from 'react';
import Style from '../BurgerIngredients/BurgerIngredients.module.css';
import '../Tab/Tab.jsx';
import Ingredient from '../Ingredient/Ingredient.jsx';
import mas from "../../utils/Mas.js";
import Tabs from '../Tab/Tab.jsx';

const bun = mas.filter(el => el.type === 'bun');
const main = mas.filter(el => el.type === 'main');
const sauce = mas.filter(el => el.type === 'sauce');

class BurgerIngredients extends Component {
    render() {
        return (
            <section className={`${Style.burgerCatalog}`}>
                <h2 className={`${Style.title} text text_type_main-large`}>Соберите бургер</h2>
                <Tabs />
                <div className={`${Style.chapter}`}>
             <h3 className={`${Style.title} text text_type_main-medium`}>Булки</h3>
             <div className={`${Style.burgerGrid}`}>
                {bun.map(function(el) {
                  return <Ingredient arr={el} key={el._id} />;
                })}
             </div>
             <h3 className={`${Style.title} text text_type_main-medium`}>Соусы</h3>
             <div className={`${Style.burgerGrid}`}>
             {sauce.map(function(el) {
                  return <Ingredient arr={el} key={el._id} />;
                })}
             </div>
             <h3 className={`${Style.title} text text_type_main-medium`}>Начинки</h3>
             <div className={`${Style.burgerGrid}`}>
             {main.map(function(el) {
                  return <Ingredient arr={el} key={el._id} />;
                })}
             </div>
           </div>
                
            </section>
        );
    }
}

export default BurgerIngredients;