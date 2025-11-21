import {Card} from "./Card.tsx";
import carPlaceholder from '../../assets/images/car_placeholder.jpg';

export type AgreementCardProps = {
    id: string;
    balance: number;
    interestRate: number;
}

export const AgreementCard = ({id, balance, interestRate}: AgreementCardProps) => {
    return (
        <Card>
            <div id={`user-agreement-${id}`} className="card--agreement">
                <img src={carPlaceholder} alt='Image of agreement vehicle' />
                <h2 className="card__title card__title--agreement">Account number: {id}</h2>

                <p className="card__description card__description--agreement">
                    Balance: {balance}
                </p>

                <p className="card__description card__description--agreement">
                    Interest rate: {interestRate}
                </p>
            </div>
        </Card>
    );
}

export default AgreementCard;
