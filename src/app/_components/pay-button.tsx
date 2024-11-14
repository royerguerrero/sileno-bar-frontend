"use client"

import { payOrder } from "../_lib/actions";
import { Button } from "./ui/button";

export default function PayButton() {
    return <Button className="w-full" onClick={() => payOrder()}>Pay</Button>
}