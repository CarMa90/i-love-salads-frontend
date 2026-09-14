import { useState, useCallback } from "react";

export function useFormAndValidation(initialValues = {}) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (e) => {
    const { name, value, validity, title, validationMessage, form } = e.target;

    let errorMessage = validationMessage;
    if (validity.patternMismatch && title) {
      errorMessage = title;
    }

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setValues((prevValues) => ({
        ...prevValues,
        [parent]: {
          ...prevValues[parent],
          [child]: value,
        },
      }));
    } else {
      setValues((prevValues) => ({ ...prevValues, [name]: value }));
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMessage }));
    setIsValid(form.checkValidity());
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid],
  );

  return { values, handleChange, errors, isValid, resetForm, setValues };
}
