import { Select } from "@chakra-ui/react";

const CurrencySelect = ({currency, setCurrency, currencies}) => {
  return (
    <div className="flex items-center justify-between">
      <Select
        onChange={(event) => setCurrency(event.target.value)}
        placeholder='Select'
      >
        {currencies.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </Select>
    </div>
  );
};

export default CurrencySelect;
