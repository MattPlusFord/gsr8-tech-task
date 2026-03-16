import React from 'react';
import './modal.css';

type ModalProps = {
    isOpen: boolean;
    children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ isOpen, children }) => {
    if (!isOpen) return null;
    return (
        <div className="modal--overlay">
            <div className="modal">
                {children}
            </div>
        </div>
    );
};

export default Modal;
