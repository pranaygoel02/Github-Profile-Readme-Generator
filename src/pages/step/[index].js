import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { getStepPage } from "@/components/Steps/getStepPage";
import SkipToStep from "@/components/Steps/SkipToStep";
import { useDispatch, useSelector } from "react-redux";

function Index({ session }) {
  const router = useRouter();
  const { githubUserProfile } = useSelector((state) => state.github);
  const { index } = router.query; 
  const dispatch = useDispatch()

  useEffect(() => {
    // console.log("GITHUB USER PROFILE IN USE EFFECT >>> ", githubUserProfile);
    if(Object.keys(JSON.parse(localStorage.getItem("githubUserProfile"))).length === 0 || (githubUserProfile !== null && githubUserProfile !== undefined && Object.keys(githubUserProfile)?.length === 0)) {
      router.replace("/");
    }
  }, [index,githubUserProfile]);

  // console.log("Github User Profile IN STEP >>> ", githubUserProfile);

  // useEffect(() => {
  // dispatch
  // },[])
  
  return (
    <>
      {/* <div className="flex flex-col h-full w-min fixed gap-4 top-[50%] -translate-y-[20%] left-8">
      {Array.from({length: 5}).fill(0).map((_, i) => {
        return <SkipToStep primary={index === (i + 1)} arrow={false} to={i + 1} text={i + 1} />
      })}
    </div> */}
      {getStepPage(index)}
      <div className="flex sticky bottom-0 gap-2 w-full justify-between p-8">
        <SkipToStep arrow={false} outline={true} to={Math.max(1, parseInt(index) - 1)} text={"Go back"} />
        <SkipToStep outline={true} arrow={false} to={Math.min(6, parseInt(index) + 1)} text={"Go next"} />
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/",
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}

export default Index;
