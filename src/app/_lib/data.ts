type BeerDTO = {
    id: string
    name: string
    price: number
    quantity: number
    picture: string
}

export async function listBeers(): Promise<BeerDTO[]> {
    const response = await fetch('http://localhost:8000/beers/');
    const data = await response.json();
    return data;
}

export async function retrieveOrder() {
    const response = await fetch('http://localhost:8000/orders/3fa85f64-5717-4562-b3fc-2c963f66afa9');
    const data = await response.json();

    if (!response.ok) {
        return null
    }

    return data;
}