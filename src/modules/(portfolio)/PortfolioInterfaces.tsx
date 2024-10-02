export interface Portfolio {
    id:string
    portfolio_user: string;
    portfolio_type: string;
    portfolio_style: string;
    name:string;
    title: string;
    description: string;
    about: string;
    country: string;
    city: string,
    portfolio_state: string
}

export interface PullPortfolio {
   
    portfolio_type: string;
    portfolio_style: string;
    name:string;
    title: string;
    description: string;
    about: string;
    country: string;
    city: string,
    portfolio_state: string
}

export interface PortfolioRoutes{
    PRIVATE:string,
    PUBLIC:string
}