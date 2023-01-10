import { useDispatch} from "react-redux";
import {
  useSelector as useReduxSelector,
  TypedUseSelectorHook,
} from 'react-redux'
import { TDispatch, RootState } from "../services/store/store";

export const useTDispatch = () => useDispatch<TDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;




export type TLocation = {
  background: {
    pathname: string;
    hash: string;
    search: string;
    state: Object;
  };
  from: any;
};

export type TBun = "bun";
export type TMainAndSauce= "main" | "sauce";
export type TAll = TBun | TMainAndSauce;

export type TIngredients = {
  readonly _id: string;
  readonly name: string;
  readonly type: TAll;
  readonly proteins: number;
  readonly fat: number;
  readonly carbohydrates: number;
  readonly calories: number;
  readonly price: number;
  readonly image: string;
  readonly image_mobile: string;
  readonly image_large: string;
  readonly __v: number;
  uuid:string;
  };

export type TOrders = {
  _id?: string;
  ingredients?: Array<string>;
  readonly status?: string;
  readonly name?: string;
  createdAt?: string;
  updatedAt?: string;
  number?: number;
};  

export type TWs = {
  orders: Array<TOrders>;
  _id?: string;
};  
  
export type TUser = {
    readonly _id: string;
    readonly ingredients: Array<string>;
    readonly status: string;
    readonly name: string;
    number: number;
    updatedAt: string;
    createdAt: string;
    userInfoData: {
      name: string;
      email: string;
    }
  };  


export  type TRequestOptions = {
    method: "POST" | "GET" | "PATCH";
    headers: {
      "Content-Type": "application/json";
      Authorization?: string;
    };
    body?: any;
  };

  export type TRegisterForm = {
    readonly name: string;
    readonly email: string;
    readonly password: string;
  };
  
  export type TLoginForm = {
    readonly name?: string;
    readonly email: string;
    readonly password: string;
  };
  
  export type TApiUserData = {
    user: {
      readonly name: string;
      readonly email: string;
    };
  };
  
  export type TUserDataParams = {
    readonly name: string;
    readonly email: string;
  };
  
  export type TForgotPasswordForm = {
    readonly email: string;
  };
  
  export type TResetPasswordForm = {
    readonly password: string;
    readonly token: string;
  };

  export type useAppParams = {
    id: string;
  };