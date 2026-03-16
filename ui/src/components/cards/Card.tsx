import { ReactNode } from "react";
import './cards.css';

interface CardProps {
    children: ReactNode;
}

export function Card({ children }: CardProps) {
    return <div className={'card'}>{children}</div>;
}

export default Card;
