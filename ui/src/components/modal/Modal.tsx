import React from 'react';
import Button from '../buttons/Button';
import './modal.css';

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    closeLabel: string;
    children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, closeLabel, children }) => {
    if (!isOpen) return null;
    return (
        <div className="modal--overlay">
            <div className="modal">
                {children}
                <Button className="modal--close" onClick={onClose} label={closeLabel} />
            </div>
        </div>
    );
};

export default Modal;
