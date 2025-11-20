import {Card} from "./Card.tsx";

interface HeroCardProps {
    userName: string;
}

export const HeroCard = ({userName}: HeroCardProps) => {
    return (
        <Card>
            <div className="card--hero">
                <h1 className="card__title card__title--hero">Welcome {userName}</h1>
            </div>
        </Card>
    );
}

export default HeroCard;