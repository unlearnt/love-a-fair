// import { CheckCircleIcon, InformationCircleIcon } from '@heroicons/react/20/solid'

import Image from 'next/image'
import sampleImageOne from '@/images/sample_image1.png'
import sampleImageTwo from '@/images/sample_image2.png'
import oogaImage from '@/images/oogachaga.png'
import {ChevronRightIcon} from "@heroicons/react/24/solid";


export default function Content() {
    return (
        <div className="bg-white px-4 py-8 lg:px-8 w-full">
            <div className="mx-auto max-w-6xl text-base text-gray-700">

                {/*<p className="text-base font-semibold leading-7 text-indigo-600">Introducing</p>*/}

                <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#C92420] sm:text-4xl">What to expect</h1>
                <p className="mt-6 text-xl leading-8 font-bold">
                    Join us for a celebration of love and giving at Love-A-Fair!
                </p>
                <div className="mt-4 max-w-6xl">
                    <p>
                        Indulge in a day filled with joy, compassion, and community spirit as we come together to
                        support a worthy cause. Love-A-Fair brings you an eclectic array of vendors,
                        each contributing their unique talents and treasures to make a difference.
                    </p>

                    <p className="mt-3">
                        From delectable treats to a curated selection of wine, charming notebooks to stylish totes,
                        there&apos;s something for everyone at Love-A-Fair!
                    </p>

                    <p className="mt-3">
                        But that&apos;s not all! Feeling photogenic?
                        Strike a pose at our selfie booth and capture the magic of the moment with your favourite
                        colleagues.
                        Or Immerse yourself in the whimsical world of caricatures as our talented artist brings your
                        unique personality to life on paper.
                        Whether you&apos;re striking a pose solo or with friends,
                        it&apos;s a delightful keepsake to treasure forever.
                    </p>

                    <p className="mt-3">
                        Every purchase, every portrait, and every smile helps support Oogachaga and their invaluable
                        work.
                        So mark your calendars and join us at Love-A-Fair, an unforgettable celebration of love and
                        diversity. See you there!
                    </p>

                    <figure className="mt-16 flex flex-row gap-6 md:gap-8">
                        <div className="w-1/2 relative rounded-xl bg-gray-50 overflow-hidden">
                            <div className="pb-[100%]"> {/* This padding-bottom controls the aspect ratio */}
                                <Image
                                    src={sampleImageOne} // Ensure this is correctly imported or defined
                                    fill
                                    quality={100}
                                    alt="Hero Image"
                                    className="absolute inset-0 w-full h-full object-cover rounded-xl"
                                    style={{objectFit:"cover"}}
                                />
                            </div>
                        </div>
                        <div className="w-1/2 relative rounded-xl bg-gray-50 overflow-hidden">
                            <div className="pb-[100%]"> {/* This padding-bottom controls the aspect ratio */}
                                <Image
                                    src={sampleImageTwo} // Ensure this is correctly imported or defined
                                    fill
                                    quality={100}
                                    alt="Hero Image"
                                    className="absolute inset-0 w-full h-full object-cover rounded-xl"
                                    style={{objectFit:"cover"}}
                                />
                            </div>
                        </div>
                    </figure>


                    <h1 className="mt-8 text-3xl font-bold tracking-tight text-[#C92420] sm:text-4xl">Our vendors</h1>

                    <p className="mt-6 ">
                        Here’s a sneak peek at our current lineup of vendors, with more exciting additions on the horizon!
                    </p>
                    <div className="mt-6 w-full grid grid-cols-3 gap-3 text-lg md:text-xl lg:text-2xl text-black">

                        <a href="https://www.onlycreamery.com/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-bold text-gray-600 hover:underline">
                            <ChevronRightIcon className="w-4 h-4 text-black" aria-hidden="true" />
                            Only Creamery
                        </a>

                        <a href="https://www.amigosyvinos.com/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-bold text-gray-600 hover:underline">
                            <ChevronRightIcon className="w-4 h-4 text-black" aria-hidden="true" />
                            Amigos Y Vinos
                        </a>

                        <a href="https://heckinunicorn.com/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-bold text-gray-600 hover:underline">
                            <ChevronRightIcon className="w-4 h-4 text-black" aria-hidden="true" />
                            Heckin&apos; Unicorn
                        </a>

                        <a href="https://www.drips.com.sg/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-bold text-gray-600 hover:underline">
                            <ChevronRightIcon className="w-4 h-4 text-black" aria-hidden="true" />
                            Drips
                        </a>

                        <a href="https://www.smol.sg/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-bold text-gray-600 hover:underline">
                            <ChevronRightIcon className="w-4 h-4 text-black" aria-hidden="true" />
                            Smol
                        </a>

                        <div className="text-xs sm:text-xs md:text-lg lg:text-xl flex items-center gap-2 font-bold text-gray-800">
                            <ChevronRightIcon className="w-4 h-4 text-black" aria-hidden="true" />
                            Luna Chang’s Cartoon Portraits
                        </div>


                        <div className="flex items-center gap-2 font-bold text-gray-800">
                            <ChevronRightIcon className="w-4 h-4 text-black" aria-hidden="true" />
                            Miss G
                        </div>

                        <a href="https://www.selfiebox.com.sg/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-bold text-gray-600 hover:underline">
                            <ChevronRightIcon className="w-4 h-4 text-black" aria-hidden="true" />
                            Selfiebox
                        </a>

                        <a href="https://calypsoul.life/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-bold text-gray-600 hover:underline">
                            <ChevronRightIcon className="w-4 h-4 text-black" aria-hidden="true" />
                            Calypsoul Life
                        </a>

                    </div>

                    <h1 className="mt-8 text-3xl font-bold tracking-tight text-[#C92420] sm:text-4xl">Our beneficiary - Oogachaga </h1>

                    <p className="mt-6">
                        Join us in celebrating love, diversity, and equality by standing with Oogachaga.
                        Together, let&apos;s create a world where everyone can thrive, no matter who they are or who they love.
                    </p>

                    <p className="mt-6">
                        Oogachaga is a Singapore-based non-profit organization dedicated to supporting the LGBTQ+ community.
                        They offer a range of services including counseling, support groups, educational workshops, and advocacy initiatives.
                        Oogachaga works to promote acceptance, inclusion, and equality for individuals of all sexual orientations and gender identities in Singapore.
                        Their mission is to create a safe and supportive environment where LGBTQ+ individuals can access the resources and support they need to live authentically and thrive.
                        From counseling services to community outreach programs, Oogachaga&apos;s tireless efforts foster inclusivity, acceptance, and empowerment.
                        Every dollar raised directly contributes to their life-changing work, making a tangible difference in the lives of countless individuals.
                    </p>


                    <p className="mt-6">
                        Find out more about them here: <a target="_blank" rel="noopener noreferrer" href="https://oogachaga.com/" className="text-blue-500 underline">https://oogachaga.com/</a>
                    </p>

                    <figure className="mt-4 flex flex-row gap-6 md:gap-8">
                        <Image
                            src={oogaImage} // Ensure this is correctly imported or defined
                            // fill
                            quality={100}
                            alt="Hero Image"
                            className="w-full h-full object-cover rounded-xl mt-6"
                            style={{objectFit: "cover"}}
                        />
                    </figure>








                </div>


            </div>
        </div>
    )
}
