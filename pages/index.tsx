import Image from "next/image";
import { Inter } from "next/font/google";
import { Box, Text } from "@chakra-ui/react";
import ExchangeCalculator from "@/components/ExchangeCalculator";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-start lg:p-24 ${inter.className}`}
    >
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <Text>Exchange Calculator</Text>
        <Box>Fonoma Logo</Box>
      </div>

      <ExchangeCalculator />
    </main>
  );
}
