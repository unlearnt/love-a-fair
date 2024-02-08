import Image from "next/image";
import {Hero} from "@/app/components/Hero/Hero";
import Content from "@/app/components/content/Content";

export default function Home() {
    return (
        <main className="flex flex-col items-center justify-between min-h-screen">

            {/*    Header section  */}

            <Hero/>
            <Content/>

        </main>
    );
}
