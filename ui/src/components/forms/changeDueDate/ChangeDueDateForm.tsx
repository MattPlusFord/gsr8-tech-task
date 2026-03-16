import React, {useState} from 'react';
import "./change-due-date-form.css"
import Button from "../../buttons/Button.tsx";
import accountClient from "../../../api/account/accountClient.ts";

type ChangeDueDateFormProps = {
  agreementId: string;
  currentDate: number;
  closeCallback: () => void;
  completionCallback: (newDate: number) => void;
};

const ChangeDueDateForm: React.FC<ChangeDueDateFormProps> = ({agreementId, currentDate, closeCallback, completionCallback}) => {
  const [dueDate, setDueDate] = useState<any>(currentDate);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDueDate(e);
  };

  const handlePaymentDateSave = () => {
    accountClient.updatePaymentDate(agreementId, dueDate)
        .then(res => {
          if (!res) {
            setError('There was an error updating your payment date. Please try again later.');
          } else {
            completionCallback(dueDate);
            closeCallback();
          }
        });
  };

  return (
    <div className="change-due-date-form">
      <form>
        <h2>Select a new payment date</h2>

        {error &&
          <div className="change-due-date-form__error">
            {error}
          </div>
        }
        <input
            id="paymentDate"
            type="number"
            max="31"
            value={dueDate}
            onChange={handleChange}
        />
      </form>

      <div className='change-due-date-form__contorls'>
        <Button className="modal--confirm" onClick={handlePaymentDateSave} label={"Update"}/>
        <Button className="modal--close" onClick={closeCallback} label={'Close'} />
      </div>
    </div>
  );
};

export default ChangeDueDateForm;
