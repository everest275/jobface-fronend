
export interface ReviewRoutes{
    PRIVATE:string,
    PUBLIC:string,
    COUNTER:string,
    USERS:string,   
    RESPONSE:string,
    SUCCESS:string,
    SENDED:string,
    PENDING:string,
}

export interface PortfolioReview {
    id: string
    reviewer_user: {
        id: string;
        user_name: string;
        name: string;
        email: string;
        gender: string;
        birth: Date;
        user_membership: string,
        user_state: string
    };
    review_user:{
        id: string;
        user_name: string;
        name: string;
        email: string;
        gender: string;
        birth: Date;
        user_membership: string,
        user_state: string
    };
    portfolio: {
        id: string
        portfolio_user: string;
        portfolio_type: string;
        portfolio_style: string;
        name: string;
        title: string;
        description: string;
        about: string;
        country: string;
        city: string,
        portfolio_state: string
    };
    comment: string;
    is_accept: string;
    review_state: string;
}
export interface PortfolioUserReview {
    id: string
    reviewer_user: string;
    review_user: {
        id: string;
        user_name: string;
        name: string;
        email: string;
        gender: string;
        birth: Date;
        user_membership: string,
        user_state: string
    };
    portfolio: {
        id: string
        portfolio_user: string;
        portfolio_type: string;
        portfolio_style: string;
        name: string;
        title: string;
        description: string;
        about: string;
        country: string;
        city: string,
        portfolio_state: string
    };
    comment: string;
    is_accept: string;
    review_state: string;
}

export interface PullPetitionResponse {
    reviewer_user: string;
    review_user: string;
    portfolio: string;
    comment: string;
    is_accept: string;
    review_state: string;
}


export interface PullPortfolioReview {
    review_user: string;
    portfolio: string;
    comment: string;
    is_accept: string;
    review_state: string;
}

export interface userPortfolioReview {
    reviewer_user: string;
    portfolio: string;
    comment: string;
    is_accept: string;
    review_state: string;
}