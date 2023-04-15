type LabelledFormElementProps = {
    label: string;
    elementName: string;
    children: React.ReactNode;
}

export const LabelledFormElement = ({
    label,
    elementName,
    children,
}: LabelledFormElementProps) => {
    return (
        <div className="mb-2 flex flex-col gap-1">
            <label htmlFor={elementName}>{label}</label>
            {children}
        </div>
    )
}