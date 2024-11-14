'use client'

import { Button } from "@/app/_components/ui/button";
import { Lock } from 'lucide-react';
import { useRoundContext } from "@/app/_contexts/round-context";
import { useToast } from "@/app/_hooks/use-toast";
import { createRound } from "@/app/_lib/actions";

export default function RoundButton() {
    const { toast } = useToast()
    const { round } = useRoundContext()
    const count = round.values().reduce((acc, value) => acc + value, 0)

    const handleCreateRound = () => {
        if (count === 0) {
            toast({
                description: '🍻 You appear to be in need of refreshment. Please feel free to help yourself to some beer.',
            })
        } else {
            const beers = Array.from(round.entries()).map(([key, value]) => ({
                id: key,
                quantity: value,
            }))

            createRound(beers)
        }
    }

    return (
        <div className="flex flex-col items-center gap-2">
            <span className="text-neutral-950 bg-white border w-fit px-3 py-1 rounded-full text-sm">{count} Beers</span>
            <Button size="lg" className="w-[320px]" onClick={handleCreateRound}>
                {count > 0 ? <>Order Round</> : <><Lock /> Add beers to start a round <Lock /></>}
            </Button>
        </div>
    )
}