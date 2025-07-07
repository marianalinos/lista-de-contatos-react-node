import React, { useEffect, useState } from "react";

interface FieldConfig {
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  validate?: (value: string) => string | null;
  props?: React.InputHTMLAttributes<HTMLInputElement>;
}

export interface GenericFormProps {
  isOpen: boolean;
  onClose?: () => void;
  onSubmit: (values: Record<string, string>) => void | Promise<void>;
  fields: FieldConfig[];
  title?: string;
  initialValues?: Record<string, string>;
}

export function GenericForm({
  isOpen,
  onClose,
  onSubmit,
  fields,
  title = "Formulário",
  initialValues,
}: GenericFormProps) {
  const [formValues, setFormValues] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string | null>>({});

  useEffect(() => {
    if (isOpen) {
      const initial: Record<string, string> = {};
      fields.forEach((field) => {
        const initValue =
          (initialValues && initialValues[field.name]) ??
          (field.props?.value as string) ??
          "";
        initial[field.name] = initValue;
      });
      setFormValues(initial);
      setErrors({});
    }
  }, [isOpen, fields, initialValues]);

  if (!isOpen) return null;

  const handleChange = (name: string, value: string) => {
    setFormValues((prev) => ({ ...prev, [name]: value }));

    const field = fields.find((f) => f.name === name);
    if (field?.validate) {
      setErrors((prev) => ({ ...prev, [name]: field.validate!(value) }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let hasErrors = false;
    const newErrors: Record<string, string | null> = {};

    fields.forEach((field) => {
      const value = formValues[field.name] || "";
      const error = field.validate ? field.validate(value) : null;
      newErrors[field.name] = error;
      if (error) hasErrors = true;
    });

    setErrors(newErrors);

    if (!hasErrors) {
      await onSubmit(formValues);
      if (onClose) onClose();
      setFormValues({});
      setErrors({});
    }
  };

  return (
  <div className="bg-white rounded-2xl border border-gray-200 shadow-md p-6 w-full">
    <h2 className="text-2xl font-semibold text-pink-600 mb-6">{title}</h2>

    <form onSubmit={handleSubmit} className="space-y-5">
      {fields.map((field) => (
        <div key={field.name}>
          <label
            htmlFor={field.name}
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {field.label}
          </label>
          <input
            id={field.name}
            type={field.type || "text"}
            placeholder={field.placeholder}
            value={formValues[field.name] || ""}
            onChange={(e) => handleChange(field.name, e.target.value)}
            className={`w-full px-4 py-2 rounded-lg border text-sm shadow-sm transition ${
              errors[field.name]
                ? "border-pink-500 focus:ring-pink-400 focus:border-pink-400"
                : "border-gray-300 focus:ring-pink-500 focus:border-pink-500"
            } focus:outline-none`}
            {...field.props}
          />
          {errors[field.name] && (
            <p className="text-xs text-pink-600 mt-1">{errors[field.name]}</p>
          )}
        </div>
      ))}

      <div className="flex justify-end gap-2 pt-2">
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-md text-gray-600 border border-gray-300 hover:bg-gray-100 text-sm"
          >
            Cancelar
          </button>
        )}
        <button
          type="submit"
          className="px-4 py-2 rounded-md bg-pink-500 text-white hover:bg-pink-600 text-sm shadow-sm"
        >
          Salvar
        </button>
      </div>
    </form>
  </div>
);
}