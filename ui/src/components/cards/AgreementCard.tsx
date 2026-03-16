import {Card} from "./Card.tsx";
import carPlaceholder from '../../assets/images/car_placeholder.jpg';
import {Link} from "react-router-dom";
import {AccountOverview} from "../../types/accounts.ts";

export type AgreementCardProps = {
    agreement: AccountOverview;
}

export const AgreementCard = ({agreement}: AgreementCardProps) => {
    return (
        <Card>
            <Link to={`/agreement/${agreement.id}`}>
                <div id={`user-agreement-${agreement.id}`} className="card card--agreement">
                    <img src={carPlaceholder} alt='Image of agreement vehicle' className='card__image--agreement' />
                    <h2 className="card__title card__title--agreement">{agreement.registration}</h2>

                    <p className="card__description card__description--agreement">
                        {agreement.make} {agreement.model} {agreement.variant}
                    </p>

                    <p className="card__description card__description--agreement">
                        {agreement.year}
                    </p>
                </div>
            </Link>
        </Card>
    );
}

export default AgreementCard;
