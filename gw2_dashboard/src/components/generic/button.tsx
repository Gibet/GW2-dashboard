import type React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  active?: boolean
}

const CustomButton: React.FC<ButtonProps> = ({ children, active = false, ...props }) => {
  return (
    <button className="" data-active={active} {...props} >
      {children}
    </button>
  )
}

export default CustomButton