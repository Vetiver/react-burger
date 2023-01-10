import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import Style from "./FeedDetailsIngredient.module.css";

interface IFeedDetailsIngredientProps {
  onClick?: (evt: Event) => void;
    image?: string;
    name?: string;
    price?: number;
  amount?: any;
  data?: any;
}

const FeedDetailsIngredient:React.FC<IFeedDetailsIngredientProps> = ({ data, amount }) => {
  const X = amount.filter((el: any) => el == data._id).length;
  return (
    <li className={Style.containerItem}>
      <div className={Style.ingredient}>
        <div className={Style.ingredientBackground}>
          <img
            className={Style.ingredientImage}
            src={data.image}
            alt={data.image}
          />
        </div>
      </div>
      <p className={`text text_type_main-default`}>{data.name}</p>
      <p className={`${Style.amountContainer} text text_type_digits-default`}>
        <span className={Style.amount}>{X}</span> x{" "}
        <p className={Style.price}>{data.price}</p>
        <CurrencyIcon type="primary" />
      </p>
    </li>
  );
}

export default FeedDetailsIngredient;
