export interface PictureRoutes{
    PRIVATE_PORTFOLIO_PROYECTS:string,
    PUBLIC_PORTFOLIO_PROYECTS:string,
    PRIVATE_PORTFOLIOS:string,
    PUBLIC_PORTFOLIOS:string,
    PUBLIC_PORTFOLIO_PROYECT:string,
    PUBLIC_PORTFOLIO:string,
    PRIVATE_PORTFOLIO:string,
    PRIVATE_PORTFOLIO_PROYECT:string
}
export interface PortfolioPicture {
    id: string;
    portfolio: string;
    picture_data: string;
    picture_state: string,
}
export interface PullPortfolioPicture {
    portfolio: string;
    picture_data: string;
    picture_state: string,
}

export interface ProyectPicture {
    id: string;
    proyect: string;
    picture_data: string;
    picture_state: string,
}
export interface PullProyectPicture {
    proyect: string;
    picture_data: string;
    picture_state: string,
}
