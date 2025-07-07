import React, { useEffect, useState } from "react";

interface FieldConfig {
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  validate?: (value: string) => string | null;
  props?: React.InputHTMLAttributes<HTMLInputElement>;
}

interface GenericFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: Record<string, string>) => void;
  fields: FieldConfig[];
  title?: string;
  initialValues?: Record<string, string>;
}

export function GenericFormModal({
  isOpen,
  onClose,
  onSubmit,
  fields,
  title = "Formulário",
  initialValues,
}: GenericFormModalProps) {
  const [formValues, setFormValues] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string | null>>({});

  const handleChange = (name: string, value: string) => {
    setFormValues((prev) => ({ ...prev, [name]: value }));

    const field = fields.find((f) => f.name === name);
    if (field?.validate) {
      setErrors((prev) => ({ ...prev, [name]: field.validate!(value) }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
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
      onSubmit(formValues);
      onClose();
      setFormValues({});
      setErrors({});
    }
  };

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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
        <h2 className="text-xl font-bold mb-4">{title}</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {fields.map((field) => (
            <div key={field.name}>
              <label htmlFor={field.name} className="block font-medium mb-1">
                {field.label}
              </label>
              <input
                id={field.name}
                type={field.type || "text"}
                placeholder={field.placeholder}
                value={formValues[field.name] || ""}
                onChange={(e) => handleChange(field.name, e.target.value)}
                className={`w-full px-3 py-2 border rounded ${
                  errors[field.name]
                    ? "border-red-500"
                    : "border-gray-300 focus:border-blue-500"
                } focus:outline-none`}
                {...field.props}
              />
              {errors[field.name] && (
                <p className="text-sm text-red-600 mt-1">
                  {errors[field.name]}
                </p>
              )}
            </div>
          ))}

          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded border border-gray-300 text-gray-600 hover:bg-gray-100"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
