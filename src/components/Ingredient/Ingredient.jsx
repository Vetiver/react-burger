import React, { Component } from 'react';
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import Style from '../Ingredient/Ingredient.module.css';

class Ingredient extends Component {
    constructor(props) {
      super(props);  
    }
    render() {
        return (
            <div className={`${Style.ingredientContainer}`}>
              <img src={this.props.arr.image} alt={this.props.arr.name} />
              <div className={`${Style.classContainer}`}>
                <p className='text text_type_main-medium'>{this.props.arr.price}</p>
                <CurrencyIcon type="primary" />
              </div>  
              <p className='text text_type_main-small'>{this.props.arr.name}</p>
            </div>
        );
    }
}

export default Ingredient;