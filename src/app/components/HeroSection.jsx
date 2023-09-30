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
                        <div className=" md:h-auto h-[3.5em] overflow-hidden">
                            <TypeAnimation
                                sequence={[
                                    "Gaston A. Genaud",
                                    1000,
                                    "a SR QA Automation Engineer",
                                    1000,
                                    "a SSR DevOps Engineer",
                                    3000]}
                                wrapper="span"
                                className="text-white mb-3 text-4xl sm:text-5xl lg:text-5xl font-extrabold  h-[400px]"
                                repeat={Infinity}
                                speed={10}
                                repeatDelay={2000}
                                cursor={true}
                                cursorStyle="|"
                                cursorClassName="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600"
                            />
                        </div>
                    </h1>
                    <p className="text-[#ADB7BE] text-base sm:text-lg mb-6 lg:text-xl">
                        I am a dedicated SR QA Automation Engineer with extensive experience in QA Automation and DevOps, currently working as an independent professional. I have contributed to various renowned companies like Coderio and Globant with my expertise in automation, test case design, and team leadership. My technical proficiency includes JavaScript, AWS, Python, and Selenium, and I have a solid educational background in Systems Analysis and Information Systems Engineering. My adaptability and commitment to quality make me a valuable contributor to software quality assurance.
                    </p>
                    <br />
                    <div>
                        <button className="px-6 py-3 w-full sm:w-fit rounded-full bg-gradient-to-br from-red-700 via-orange-500 to-orange-200 mr-4 bg-white hover:bg-slate-200 text-white" onClick={() => window.location.href = "/resume/_CV_ENGLISH_GASTON_GENAUD.pdf"}> Hire me</button>
                        <button className="px-1 py-1 w-full sm:w-fit rounded-full bg-transparent bg-gradient-to-br from-red-700 via-orange-500 to-orange-200 hover:bg-slate-800 text-white mt-3" onClick={() => {
                            const link = document.createElement('a');
                            link.href = '/resume/_CV_ENGLISH_GASTON_GENAUD.pdf';
                            link.download = 'CV_Gaston_Alejandro_Genaud.pdf'; // opcional renombrar el archivo descargado
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                        }}>
                            <span className="block bg-[#121212] hover:bg-slate-800 rounded-full px-5 py-2">
                                Download CV
                            </span>
                        </button>
                    </div>
                </div>
                <div className="col-span-5 place-self-center mt-4 lg:mt-0">
                    <div className="rounded-full bg-[#181818] w-[250px] h-[300px] lg:w-[250px] lg:h-[300px] relative">
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