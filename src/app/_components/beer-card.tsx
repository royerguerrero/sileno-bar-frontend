'use client'

import { Minus, Plus } from "lucide-react"
import { Button } from "./ui/button"
import { useEffect, useState } from "react"
import { useRoundContext } from "../_contexts/round-context"

type Props = {
    id: string,
    name: string,
    price: number,
    quantity: number,
    picture: string,
}

export default function BeerCard({ id, name, price, quantity, picture }: Props) {
    const { round, setRound } = useRoundContext()
    const [amount, setAmount] = useState(round.get(id) ?? 0)
    const stock = quantity - amount

    console.log(amount)
    console.log(round)

    useEffect(() => {
        setRound((prev) => {
            const newRound = new Map(prev);
            newRound.set(id, amount);
            return newRound;
        })
    }, [amount])

    return (
        <div className="text-center">
            <picture className={`aspect-square grid items-center bg-cover bg-center ${quantity === 0 ? 'mix-blend-luminosity' : ''}`} style={{
                backgroundImage: `url(${picture})`
            }}>
                {quantity > 0 ? (
                    <div className="m-auto flex items-center gap-1">
                        {amount > 0 && (
                            <Button size="icon" variant="secondary" onClick={() => setAmount(amount > 0 ? amount - 1 : 0)}>
                                <Minus className="w-4 h-4" />
                            </Button>
                        )}
                        <Button className="w-12 h-12" size="icon" onClick={() => setAmount(prev => stock > 0 ? prev + 1 : prev)}>
                            {amount === 0 ? <Plus className="w-10 h-10" /> : <span className="text-lg">{amount}</span>}
                        </Button>
                        {amount > 0 && (
                            <Button size="icon" variant="secondary" onClick={() => setAmount(prev => stock > 0 ? prev + 1 : prev)}>
                                <Plus className="w-4 h-4" />
                            </Button>
                        )}
                    </div>
                ) : <Button className="w-fit m-auto">Out Stock</Button>}
            </picture>
            <h2 className="text-lg font-medium tracking-tight">{name}</h2>
            <p className="text-muted-foreground">
                {parseFloat(price).toLocaleString('en-US', { style: 'currency', currency: 'USD' })} ⋅ {stock > 0 ? `${stock} Left` : `Out Stock`}
                <br /> Total {(parseFloat(price) * amount).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
            </p>
        </div >
    )
}