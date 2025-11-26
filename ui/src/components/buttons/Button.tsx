type ButtonProps = {
    onClick: () => void;
    disabled?: boolean;
    label: string;
}

const Button = ({onClick, disabled, label}: ButtonProps) => {
    return <button onClick={onClick} disabled={disabled}>{label}</button>;
}

export default Button;
