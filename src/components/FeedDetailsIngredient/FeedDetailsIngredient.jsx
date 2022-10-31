import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import Style from "./FeedDetailsIngredient.module.css";

function FeedDetailsIngredient({ data, amount}) {
  const X = amount.filter((el) => el == data._id).length
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
      <p className={`text text_type_main-default`}>
        {data.name}
      </p>
      <p
        className={`${Style.amountContainer} text text_type_digits-default`}
      >
        <span className={Style.amount}>{X}</span> x{" "}
        <p className={Style.price}>{data.price}</p>
        <CurrencyIcon className={Style.currency} type="primary" />
      </p>
    </li>
  );
}

export default FeedDetailsIngredient;
