import Image from "next/image";
import { Inter } from "next/font/google";
import CurrencySelect from "@/components/CurrencySelect/CurrencySelect";
import { Button, HStack, IconButton, Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ArrowRightIcon } from "@chakra-ui/icons";

const inter = Inter({ subsets: ["latin"] });

const myHeaders = new Headers();
myHeaders.append("apikey", "4bpDvyttu7FVyYM0kriwko2ETbwt2WOs");

const requestOptions = {
  method: "GET",
  redirect: "follow",
  headers: myHeaders,
};

export default function Home() {
  const [amount, setAmount] = useState("0.0");
  const [result, setResult] = useState("0.0");
  const [loading, setLoading] = useState(false);
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");

  const [data, setData] = useState({});

  useEffect(() => {
    async function getCurrencies() {
      fetch(
        "https://api.apilayer.com/exchangerates_data/symbols",
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => setData(JSON.parse(result)))
        .catch((error) => console.log("error", error));
    }
    getCurrencies();
  }, []);

  function calculateExchange() {
    if (!amount || parseFloat(amount) <= 0) {
      return;
    }
    setLoading(true);

    fetch(
      `https://api.apilayer.com/exchangerates_data/convert?to=usd&from=eur&amount=${amount}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        const data = JSON.parse(result);
        setResult(data.result);
        setLoading(false);
      })
      .catch((error) => console.log("error", error));
  }

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-start lg:p-24 ${inter.className}`}
    >
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed font-bold uppercase left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Exchange Calculator
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Fonoma Logo
          </a>
        </div>
      </div>

      <div className="lg:w-1/3 w-full lg:mx-auto lg:p-20 p-5 mt-10 border-2 border-black rounded-2xl">
        <Input
          placeholder="Enter the amount to convert"
          className="mb-5 text-right"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
          required
        />
        <HStack justify="space-between" className="mb-5">
          <CurrencySelect
            currency={fromCurrency}
            setCurrency={setFromCurrency}
          />
          <IconButton icon={<ArrowRightIcon />} aria-label="Invert operation" />
          <CurrencySelect currency={toCurrency} setCurrency={setToCurrency} />
        </HStack>
        <HStack>
          <Button
            variant={"solid"}
            colorScheme="blue"
            onClick={() => calculateExchange()}
          >
            Convert
          </Button>
          <div>
            {loading ? (
              <>{`Converting ${fromCurrency} ${amount} to ${toCurrency} ...`}</>
            ) : (
              <label>{`Result: ${toCurrency} ${result}`}</label>
            )}
          </div>
        </HStack>
      </div>
    </main>
  );
}
