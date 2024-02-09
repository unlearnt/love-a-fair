import {Fragment, useEffect, useRef, useState} from 'react'
import {Dialog, Transition} from '@headlessui/react'
import {ExclamationTriangleIcon} from '@heroicons/react/24/outline'
import couponImage from "@/images/rainbow_coupon.png";
import Image from "next/image";
import PayPalButton from "@/app/components/PayPalButton/PayPalButton";

export default function PaymentModal(props) {

    let {open, setOpen} = props;

    const [quantity, setQuantity] = useState(1);
    const [email, setEmail] = useState('');
    const pricePerCoupon = 0.05; // Price per coupon
    const totalPrice = quantity * pricePerCoupon;

    useEffect(() => {
        setQuantity(1);
    }, [open])

    const cancelButtonRef = useRef(null)

    const incrementQuantity = () => {
        setQuantity(quantity + 1);
    };

    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const isValidEmail = email => /\S+@\S+\.\S+/.test(email);

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>

                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>
                </Transition.Child>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">

                    <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel
                                className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">

                                <div className="items-start">

                                    {/* image */}
                                    <div className="mx-auto flex items-center justify-center ">
                                        <Image
                                            src={couponImage} // Ensure this is correctly imported or defined
                                            // fill
                                            quality={100}
                                            alt="Hero Image"
                                            className="w-full h-full object-cover rounded-xl mt-6"
                                            style={{objectFit: "cover"}}
                                        />
                                    </div>

                                    {/* button */}
                                    <div className="mx-auto flex items-center justify-center">
                                        <div
                                            className="bg-red-600 flex justify-between items-center self-center rounded-full py-1.5 px-3 w-3/6 max-w-full mt-3">
                                            <button className="bg-none border-none text-white text-2xl cursor-pointer"
                                                    onClick={decrementQuantity}>-
                                            </button>
                                            <span className="text-white text-xs mx-1.5"> Quantity: {quantity} </span>
                                            <button className="bg-none border-none text-white text-2xl cursor-pointer"
                                                    onClick={incrementQuantity}>+
                                            </button>
                                        </div>
                                    </div>

                                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-center">
                                        <Dialog.Title as="h3"
                                                      className="mt-4 text-base font-semibold leading-6 text-gray-900">
                                            Total Price: ${totalPrice.toFixed(2)}
                                        </Dialog.Title>

                                        <div className="mt-2">
                                            <p className="text-sm text-gray-800 text-left">
                                                <strong>Note:</strong> If you are a Nomura employee, enter your Nomura
                                                Email address.
                                                Otherwise, simply enter your personal email.
                                                You will need to confirm this information during coupon collection.
                                            </p>
                                        </div>

                                        <div className="mt-2 mb-2.5"> {/* Adjusted from original 10px margin-bottom to closest Tailwind value */}
                                            <input
                                                className="p-2.5 text-base w-4/5 m-2.5 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                placeholder="john.doe@mail.com"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </div>

                                        {isValidEmail(email) &&
                                            (<div className="mt-4 w-full flex justify-center items-center">
                                                <PayPalButton amount={totalPrice} quantity={quantity} email={email}/>
                                            </div>)
                                        }


                                    </div>
                                </div>

                                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                                    <button
                                        type="button"
                                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                        onClick={() => setOpen(false)}
                                        ref={cancelButtonRef}
                                    >
                                        Cancel
                                    </button>
                                </div>

                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
