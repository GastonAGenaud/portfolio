import { useState } from 'react';

export default function useForm(defaults) {
  const [values, setValues] = useState(defaults);

  function updateValue({ target: { value, name } }) {
    setValues({
      ...values,
      [name]: value,
    });
  }

  function resetValues() {
    setValues(defaults);
  }

  return { values, updateValue, resetValues };
}
