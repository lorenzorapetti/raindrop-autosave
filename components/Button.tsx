import type { ButtonHTMLAttributes, DetailedHTMLProps } from "react"

export interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  variant?: "solid" | "faded"
  colorScheme?: "primary" | "error" | "success"
}

export function Button({
  variant = "solid",
  colorScheme = "primary",
  ...rest
}: ButtonProps) {
  let colorClasses = ""

  switch (variant) {
    case "solid":
      switch (colorScheme) {
        case "primary":
          colorClasses =
            "text-white bg-sky-600 hover:bg-sky-700 focus:ring-sky-500"
          break
        case "error":
          colorClasses =
            "text-white bg-red-600 hover:bg-red-700 focus:ring-red-500"
          break
        case "success":
          colorClasses =
            "text-white bg-green-600 hover:bg-green-700 focus:ring-green-500"
          break
      }
      break
    case "faded":
      switch (colorScheme) {
        case "primary":
          colorClasses =
            "text-sky-700 bg-sky-100 hover:bg-sky-200 focus:ring-sky-500"
          break
        case "error":
          colorClasses =
            "text-red-700 bg-red-100 hover:bg-red-200 focus:ring-red-500"
          break
        case "success":
          colorClasses =
            "text-green-700 bg-green-100 hover:bg-green-200 focus:ring-green-500"
          break
      }
      break
  }

  return (
    <button
      {...rest}
      className={`inline-flex items-center justify-center px-4 py-2 border border-transparent font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${colorClasses}`}
    />
  )
}
