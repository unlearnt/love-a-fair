import Image from 'next/image';
import backgroundImage from '@/images/nomura_rainbow.png'
import styles from './hero.module.css'

export function Hero() {
    return (
        <div className="bg-white w-full overflow-hidden">
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
                        <h1 className="text-black font-bold text-6xl sm:text-2xl md:text-8xl lg:text-9xl">Love-A-Fair</h1>

                        <div className="inline-flex items-center space-x-4 mt-2">
                            <p className="text-black font-bold text-9xl sm:text-4xl md:text-8xl lg:text-9xl">2024</p>
                        </div>

                        <div>
                            <div className="flex flex-col space-y-1">
                                <p className="text-black text-lg">Thu, 29 Feb</p>
                                <p className="text-black text-lg">11:30am – 2pm</p>
                                <p className="text-black text-lg">MBFC Level 35 Pantry</p>
                            </div>
                        </div>

                        <div className="mt-4">
                            <button
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
