import { listBeers } from "@/app/_lib/data";

import BeerCard from "@/app/_components/beer-card";
import RoundButton from "@/app/_components/round-button";

import { RoundContextProvider } from "@/app/_contexts/round-context";


export default async function MenuPage() {
  const beers = await listBeers()

  return (
    <>
      <RoundContextProvider>
        {
          beers.length > 0
            ? beers.map(beer => <BeerCard key={beer.id} {...beer} />)
            : <iframe src="https://giphy.com/embed/1l7GT4n3CGTzW" width="100%" height="360" className="mx-auto mt-20"></iframe>
        }
        <div className="px-3 fixed bottom-3 w-full max-w-[600px] flex justify-center">
          <RoundButton />
        </div>
      </RoundContextProvider>
    </>
  );
}
