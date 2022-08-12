import React, { Component } from 'react';
import {DragIcon, ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components';
import Style from '../Stuffing/Stuffing.module.css';



class Stuffing extends Component {
    constructor(props) {
    super(props);
    }
    render() {
        return (
            <div className={`${Style.stuffingBar}`}>
                <DragIcon type="primary" />
                 <ConstructorElement
                  text={this.props.el.name}
                  price={this.props.el.price}
                  thumbnail={this.props.el.image_mobile} />
            </div>
        );
    }
}

export default Stuffing;