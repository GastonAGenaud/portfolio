"use client";
import React from "react";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
const HeroSection = () => {
    return (
        <section>
            <div className="grid grid-cols-1 sm:grid-cols-12">
                <div className="col-span-7 place-self-center text-center sm:text-left">
                    <h1 className="text-white mb-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600">Hello, I&apos;m{" "}</span>
                        <br />
                        <TypeAnimation
                            sequence={[
                                "Gaston A. Genaud",
                                1000,
                                "a SR Software Developer Engineer in Test",
                                1000,
                                "a SSR DevOps Engineer",
                                3000]}
                            wrapper="span"
                            className="text-white mb-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold"
                            repeat={Infinity}
                            speed={50}
                            repeatDelay={2000}
                            cursor={false}
                            cursorStyle="|"
                            cursorClassName="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600"
                        />
                    </h1>
                    <p className="text-[#ADB7BE] text-base sm:text-lg mb-6 lg:text-xl">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.</p>
                    <div>
                        <button className="px-6 py-3 w-full sm:w-fit rounded-full bg-gradient-to-br from-red-700 via-orange-500 to-orange-200 mr-4 bg-white hover:bg-slate-200 text-white"> Hire me</button>
                        <button className="px-1 py-1 w-full sm:w-fit rounded-full bg-transparent bg-gradient-to-br from-red-700 via-orange-500 to-orange-200 hover:bg-slate-800 text-white mt-3">
                            <span className="block bg-[#121212] hover:bg-slate-800 rounded-full px-5 py-2">
                                Download CV
                            </span>
                        </button>
                    </div>
                </div>
                <div className="col-span-5 place-self-center mt-4 lg:mt-0">
                    <div className="rounded-full bg-[#181818] w-[250px] h-[250px] lg:w-[400px] lg:h-[400px] relative">
                        <Image src="/images/profile.jpg"
                            alt="hero image"
                            width={200}
                            className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 rounded-full"
                            height={200}
                        />
                    </div>
                </div>
            </div>

        </section>
    );
};

export default HeroSection;