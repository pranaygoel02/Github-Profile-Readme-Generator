import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import { getSession } from "next-auth/react";
import React from "react";

function AppLayout({ children }) {
  return (
    <div className="main flex flex-col min-h-screen justify-between">
      <Navbar />
      <div className="flex-1 relative">{children}</div>
      <Footer />
    </div>
  );
}

export default AppLayout;


export async function getServerSideProps({ req }) {
  const session = await getSession({ req });
  if(!session) return {
    redirect: {
      destination: 'http://localhost:3000/login',
      permanent: false,
    }
  }
  return {
    props: {
      session,
    },
  };
}
