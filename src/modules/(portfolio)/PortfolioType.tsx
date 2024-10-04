import {  Resolver } from "react-hook-form";
import {ValidationError} from '../../types/AuthfaceTypes'
export const ClientPortfolioRoutes={
    PRIVATE:"/portfolios",
    PUBLIC:"/portfolios-public"
}

export const PullPortfolioObject={
    portfolio_type: "0bc6bd16-86d4-429e-afe3-b213b56e2121",
    portfolio_style: "3cccd400-708c-4f36-bb48-898c887583b6",
    name: "",
    title: "",
    description: "",
    about: "",
    country: "",
    city: "",
    portfolio_state: "6b17756c-c1da-4636-821e-4b98ed59c02f",
}
export type PortfolioFormValues = {
    name: string;
    title: string;
    description: string;
    about: string;
    country: string;
    city: string;
};

type Errors = {
    [K in keyof PortfolioFormValues]?: ValidationError;
  };
  
export const resolver: Resolver<PortfolioFormValues> = async (values) => {
    const errors: Errors = {};
  
    if (!values.name) {
      errors.name = {
        type: "required",
        message: "Name es requerido.",
      };
    }
  
    if (!values.title) {
      errors.title = {
        type: "required",
        message: "Title es requerido.",
      };
    }
    if (!values.description) {
      errors.description = {
        type: "required",
        message: "Description es requerido.",
      };
    }
    if (!values.about) {
      errors.about = {
        type: "required",
        message: "About es requerido.",
      };
    }
    if (!values.country) {
      errors.country = {
        type: "required",
        message: "Country es requerido.",
      };
    }
    if (!values.city) {
      errors.city = {
        type: "required",
        message: "City es requerido.",
      };
    }
  
    return {
      values: Object.keys(errors).length ? {} : values,
      errors,
    };
  };



