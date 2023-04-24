import React from "react";
import OpenAI from "../../assets/images/OpenAI_Logo.png";
import Link from "next/link";
import Image from "next/image";

function Footer() {
  return (
    <div className="p-4 lg:p-16 border-t lg:border-none border-x-0 border-neutral-600 border-1 z-10 space-y-4">
      <div className=" flex gap-4 justify-between">
        <h1 className="text-2xl font-black">.md</h1>
        <div className="font-mono">
          <p className="inline-flex gap-2 items-center">
            Using{" "}
            <Image src={OpenAI} className="w-24 invert" width={100} height={100} alt="Using OpenAI"/>
          </p>
        </div>
      </div>
      <p className="text-neutral-300 font-mono text-xs text-center">Made with 💚 by, <Link className="hover:text-primary" href={'pranaygoel.vercel.app'} passHref>Pranay Goel</Link> | <span>&copy; Copyright {new Date().getFullYear()}</span></p>
    </div>
  );
}

export default Footer;
