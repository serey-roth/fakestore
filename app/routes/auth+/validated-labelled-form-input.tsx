import { LabelledFormElement } from "./labelled-form-element"

type ValidatedLabelledFormInputProps = {
    name: string,
    label: string,
    error?: string[]
} & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export const ValidatedLabelledFormInput = ({
    name,
    label,
    type,
    defaultValue,
    error
}: ValidatedLabelledFormInputProps) => {
    return (
        <LabelledFormElement
        label={label}
        elementName={name}>
            <input
            type={type} 
            name={name}
            className="rounded-sm p-1 appearance-none
            outline-none focus:ring-2 focus:ring-blue-200 
            drop-shadow-sm bg-gray-200"
            defaultValue={defaultValue}
            aria-invalid={Boolean(error)}
            aria-errormessage={
                error
                ? `${name}-error`
                : undefined
            } />
            {error ? (
                <p 
                className="text-sm font-semibold text-red-500"
                role="alert"
                id={`${name}-error`}>
                    {error[0]}
                </p>
            ) : null}
        </LabelledFormElement>
    )
}