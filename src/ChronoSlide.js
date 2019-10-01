import React, { useState } from "react";
import { FormField, TextInput, RangeInput } from "grommet";

const ChronoSlide = () => {
  const [value, setValue] = useState(10);
  return (
    <FormField label="Chronologie">
      <RangeInput
        value={value}
        onChange={event => setValue(event.target.value)}
      />
    </FormField>
  );
};

export default ChronoSlide;
