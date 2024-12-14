export type ChoiceType = Array<{ value: string | number; label: string }>;
export type OptionType = { value: string; label: string };
export type choiceType = { value: string; label: string };

export type RadioFieldProps = {
  options: { id: string; title: string }[];
  name: string;
  defaultChecked?: string | number | boolean;
  defaultValue?: any;
  helpText?: string;
  parentLabel?: string;
  labelStyle?: "label-left";
  wrapperClassName?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  checked?: boolean;
  labelWidth?: string;
  value?: string | number | boolean;
};
