import type {
  AriaAttributes,
  ChangeEventHandler,
  DetailedHTMLProps,
  InputHTMLAttributes
} from "react"

export interface InputProps
  extends Omit<
    DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    "onChange"
  > {
  name: string
  type?: InputHTMLAttributes<HTMLInputElement>["type"]
  id?: string
  label: string
  placeholder?: string
  helpText?: string
  onChange?(value: string): void
}

export function Input({
  name,
  type = "text",
  label,
  id = `${name}-input`,
  helpText,
  className,
  onChange,
  ...rest
}: InputProps) {
  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    onChange?.(e.target.value)
  }

  return (
    <div className={className}>
      <label htmlFor={id} className="block text-md font-medium text-slate-200">
        {label}
      </label>
      <div className="mt-1">
        <input
          type={type}
          name={name}
          id={id}
          className="shadow-sm block focus:ring-slate-400 focus:border-slate-400 w-full min-h-[36px] bg-slate-700 text-md border-slate-700 rounded-md px-2"
          onChange={handleInputChange}
          {...rest}
        />
      </div>
      {helpText && (
        <p className="mt-2 text-sm text-gray-500" id="email-description">
          {helpText}
        </p>
      )}
    </div>
  )
}
