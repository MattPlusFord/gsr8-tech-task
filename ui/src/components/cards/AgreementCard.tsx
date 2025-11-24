import {Card} from "./Card.tsx";
import carPlaceholder from '../../assets/images/car_placeholder.jpg';
import {Link} from "react-router-dom";

export type AgreementCardProps = {
    id: string;
    balance: number;
    interestRate: number;
}

export const AgreementCard = ({id, balance, interestRate}: AgreementCardProps) => {
    return (
        <Card>
            <Link to={`/agreement/${id}`}>
                <div id={`user-agreement-${id}`} className="card card--agreement">
                    <img src={carPlaceholder} alt='Image of agreement vehicle' className='card__image--agreement' />
                    <h2 className="card__title card__title--agreement">Account number: {id}</h2>

                    <p className="card__description card__description--agreement">
                        Balance: £{balance}
                    </p>

                    <p className="card__description card__description--agreement">
                        Interest rate: {interestRate}%
                    </p>
                </div>
            </Link>
        </Card>
    );
}

export default AgreementCard;
