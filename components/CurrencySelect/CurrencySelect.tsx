import { useEffect, useState } from "react";
import { FormLabel, Select } from "@chakra-ui/react";

const CurrencySelect = ({currency, setCurrency}) => {
  return (
    <div className="flex items-center justify-between">
      <Select
        onChange={(event) => setCurrency(event.target.value)}
        name="currency-select"
      >
        {/* {data && Object.entries(data.symbols).map((symbol, index) => (
          <option
            key={index}
            value={symbol[0]}
            selected={currency === symbol[0]}
          >
            {symbol[0]}
          </option>
        ))} */}
        {["USD", "EUR", "CAD"].map((option, index) => (
          <option key={index} value={option} selected={option === currency}>
            {option}
          </option>
        ))}
      </Select>
    </div>
  );
};

export default CurrencySelect;
