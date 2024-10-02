export interface PortfolioAbilitie {
    id: string
    abilitie_type: string;
    portfolio: string;
    comment: string;
    abilitie_state: string;
}

export interface AllPortfolioAbilitie {
    id: string
    abilitie_type: {
        type: string,
        type_value: string,
        state: string
    };
    portfolio: string;
    comment: string;
    abilitie_state: string;
}

export interface PullPortfolioAbilitie {
    abilitie_type: string;
    portfolio: string;
    comment: string;
    abilitie_state: string;
}

export interface PortfolioAbilitieType {
    id: string;
    type: string;
    type_value: string;
}
export interface PortfolioAbilitieRoutes{
    PRIVATE:string,
    PUBLIC:string,
    TYPES:string,
    COUNTER:string,
    ABILITIE:string
}