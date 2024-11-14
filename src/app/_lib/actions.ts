'server-only'

import { redirect } from 'next/navigation'

export async function createRound(beers: { id: string, quantity: number }[]) {
    const response = await fetch('http://localhost:8000/orders/3fa85f64-5717-4562-b3fc-2c963f66afa9/round', {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            beers: beers
        })
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    redirect('/')
}

export async function payOrder() {
    const response = await fetch('http://localhost:8000/orders/3fa85f64-5717-4562-b3fc-2c963f66afa9/pay', {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    redirect('/order')
}