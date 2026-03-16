type ButtonProps = {
    onClick: () => void;
    disabled?: boolean;
    label: string;
    className?: string;
}

const Button = ({ onClick, disabled, label, className }: ButtonProps) => {
    return <button onClick={onClick} disabled={disabled} className={className}>{label}</button>;
}

export default Button;