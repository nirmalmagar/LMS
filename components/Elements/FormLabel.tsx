import React, { ReactNode, LabelHTMLAttributes } from "react";
import classNames from "classnames";

interface FormLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  children?: ReactNode;
  className?: string;
  labelWidth?: String;
}

const FormLabel: React.FC<FormLabelProps> = ({
  className,
  children,
  labelWidth,
  id,
  ...props
}) => {
  const classes = classNames(
    // dark:text-white 
    `block text-sm font-medium leading-6 text-gray-900 text-black mb-2 ${
      labelWidth ? labelWidth : "w-2/5"
    } `,
    className
  );

  return (
    <label {...props} className={classes} htmlFor={id}>
      {children}
    </label>
  );
};

// FormLabel.defaultProps = {
//   children: null,
//   labelHidden: false,
// };

export default FormLabel;
