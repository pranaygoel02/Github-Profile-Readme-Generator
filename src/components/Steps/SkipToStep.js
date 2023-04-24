import Link from "next/link";
import React from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

function SkipToStep({ to, primary=true, arrow = true,  outline=false,text }) {
  return (
    <Link
      href={`/step/${to}`}
      passHref
      className={`btn ${!outline && (primary ? 'btn-primary' : 'btn-secondary')} ${outline && 'outline outline-1 outline-neutral-600 hover:outline-primary opacity-70 hover:opacity-100 bg-transparent text-neutral-600 hover:text-primary'} justify-self-end`}
    >
      {text || "Continue"}{" "}
      {arrow && (
        <span>
          <MdOutlineKeyboardArrowRight />
        </span>
      )}{" "}
    </Link>
  );
}

export default SkipToStep;
