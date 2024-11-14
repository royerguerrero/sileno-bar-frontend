import Image from "next/image"
import { retrieveOrder } from "../_lib/data"
import PayButton from "../_components/pay-button"

export default async function OrderPage() {
    const order = await retrieveOrder()

    if (!order) {
        return <p className="text-center text-muted-foreground pt-10">Create a round. For start your order</p>
    }

    return (
        <>
            <div className="bg-white w-full p-6 font-mono tracking-tighter mt-16 max-w-[420px] m-auto">
                <div className="text-center border-b py-4 text-xs">
                    <Image src="logo-pixel.svg" alt="Sileno's bar" width={200} height={40} className="mx-auto mb-2" />
                    <h2 className="text-base">Sileno's Bar LLC</h2>
                    <p>www.silenosbar.com</p>
                </div>
                <div className=" py-4 text-sm flex flex-col gap-3">
                    <div className="flex justify-between border-b pb-4">
                        <span>Rounds</span>
                        <span>{order.rounds.length}</span>
                    </div>
                    {order.rounds.map((round, idx) => (
                        <section className="border-b pb-4" key={idx}>
                            <div className="flex justify-between">
                                <span>Detail Round [{new Date(round.created).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}]</span>
                                <span>{idx + 1}</span>
                            </div>
                            <div className="flex flex-col mt-3 gap-1">
                                {round.items.map((item, idx) => (
                                    <div className="flex justify-between" key={idx}>
                                        <span>{item.name} X {item.quantity}</span>
                                        <span>{item.price_per_unit.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} C/U</span>
                                    </div>
                                ))}
                                <div className="flex justify-between mt-2">
                                    <span>Total</span>
                                    <span>{round.items.reduce((total, item) => total + (item.quantity ?? 0) * item.price_per_unit, 0).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
                                </div>
                            </div>
                        </section>
                    ))}
                    <div className="mt-4">
                        <div className="flex justify-between">
                            <span>Subtotal</span><span>{order.subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Tax</span><span>{order.taxes.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Discounts</span><span>{order.discounts.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between mt-4">
                            <span>Total</span><span>{(order.subtotal + order.taxes - order.discounts).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Paid Status</span><span>{order.paid ? "Paid" : "Pending"}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Order Date</span><span>{new Date(order.created).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-96 mx-auto flex flex-col gap-2">
                {!order.paid && <PayButton />}
                <span className="text-muted-foreground text-sm flex gap-2 items-center justify-center font-medium leading-none">
                    {order.paid ? '🥴 Thanks! We hope you comeback soon 🥴' : 'At the time to pay your order will be restarted'}
                </span>
            </div>
        </>
    )
}