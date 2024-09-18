import axios from '../../../libs/axios'

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


export const portfolioReviewsRequest = async () => {
    const result = await axios.get(`/portfolio-reviews`);
    return result.data
}
export const petitionsRequest = async () => {
    const result = await axios.get(`/petitions-received`);
    return result.data
}
export const getByIdRequest = async (id: string) => {
    const result = await axios.get(`/portfolio-reviews/${id}`);
    return result.data
}
export const createRequest = async (user: object) => {
    const result = await axios.post(`/portfolio-reviews`, user);
    return result.data
}

export const sendedRequest = async (user: object) => {
    const result = await axios.post(`/portfolio-reviews-sended`, user);
    return result.data
}

export const updateRequest = async (id: string, user: object) => {
    const result = await axios.put(`/portfolio-reviews/${id}`, user);
    return result.data
}

export const responseRequest = async (id: string, user: object) => {
    const result = await axios.put(`/portfolio-reviews-response/${id}`, user);
    return result.data
}

export const deleteRequest = async (id: string) => {
    const result = await axios.delete(`/portfolio-reviews/${id}`);
    return result.data
}

export const publlicGetReviewsByPortfolioRequest = async (id: string) => {
    const result = await axios.get(`/portfolio-reviews-public/${id}`);
    return result.data
}
export const usersRequest = async () => {
    const result = await axios.get(`/users`);
    return result.data
}