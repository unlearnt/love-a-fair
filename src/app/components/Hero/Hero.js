"use client"

import Image from 'next/image';
import backgroundImage from '@/images/nomura_rainbow.png'
import styles from './hero.module.css'
import { useRouter } from 'next/navigation'
import PaymentModal from "@/app/components/payment-modal/PaymentModal";
import {useState} from "react";


export function Hero() {

    const router = useRouter()
    const [open, setOpen] = useState(false)

    return (
        <div className="bg-white w-full overflow-hidden">

            <PaymentModal open={open} setOpen={setOpen}/>
            {/* Banner Section */}
            <div className="text-center py-2 bg-[#C92420] "/>

            {/* Image Section with Text Overlay */}
            <div className="relative w-full h-100"> {/* Adjust the height as needed */}
                <Image
                    src={backgroundImage}
                    fill
                    style={{
                        objectFit: "cover",
                    }}
                    quality={100}
                    alt="Hero Image"
                />

                {/* Text Overlay */}
                <div className="relative w-full h-full flex items-center justify-center p-4">
                    <div className="text-center mt-8">
                        <h1 className="text-black font-bold text-4xl sm:text-4xl md:text-6xl lg:text-8xl">Love-A-Fair</h1>

                        <div className="inline-flex items-center space-x-4 mt-1 sm:mt-1 md:mt-2 lg:mt-2">
                            <p className="text-black font-bold text-5xl sm:text-5xl md:text-7xl lg:text-9xl">2024</p>
                        </div>

                        <div>
                            <div className="mt-2 flex flex-col">
                                <p className="text-black text-xs sm:text-sm md:text-lg lg:text-lg">Thursday, 29 Feb 2024</p>
                                <p className="text-black text-xs sm:text-sm md:text-lg lg:text-lg">11:30am – 2pm</p>
                                <p className="text-black text-xs sm:text-sm md:text-lg lg:text-lg">MBFC Level 35 Pantry</p>
                            </div>
                        </div>

                        <div className="mt-4">
                            <button
                                onClick={() => setOpen(true)}
                                className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition duration-300 ease-in-out">
                                Get your coupons
                            </button>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}
