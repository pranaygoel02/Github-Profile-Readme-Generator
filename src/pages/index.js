import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";

import Landing_bg from "@/assets/images/landing.png";
import GithubLogin from "@/components/Auth/GithubLogin";
import { getSession } from "next-auth/react";
import { useGithubSession } from "@/utils/authHandler";
import { useDispatch, useSelector } from "react-redux";
import {
  getGithubUserProfile,
  resetGithubUserProfile,
  setGithubUserProfile,
} from "../../redux/auth/githubUserSlice";
import { resetReadmeSlice } from "../../redux/readmeSlice";

function Index({ session }) {
  const { githubUserId } = useGithubSession();

  const dispatch = useDispatch();

  const { githubUserProfile } = useSelector((state) => state.github);

  const [githubProfile, setGithubProfile] = useState({})

  useEffect(() => {
    setGithubProfile(JSON.parse(localStorage.getItem("githubUserProfile")));
  }, [])

  // useEffect(() => {
  //   setGithubProfile(githubUserProfile)
  // },[githubUserProfile])

  useEffect(() => {
    console.log('Use Effect >>>> GitHub User Id >>>> ', githubUserId);
    console.log('Get GitHub User Profile >>>>>>> ', githubUserProfile);
    if (session !== null) {
      console.log('Git Profile >>>>>>> ', githubProfile);
      if (githubProfile !== undefined && githubProfile !== null) {
        dispatch(setGithubUserProfile({ githubUserProfile: githubProfile }));
      } else if (
        githubUserId !== null &&
        Object.keys(githubUserProfile).length === 0
      ) {
        const data = dispatch(getGithubUserProfile({ githubUserId }));
        console.log('Data >>>>>>> ', data);
        // dispatch(setGithubUserProfile({ githubUserProfile: JSON.parse(localStorage.getItem('githubUserProfile')) }));
      }
    }
    else {
      console.log('Reset GitHub User Profile >>>>>>> ');
      dispatch(resetGithubUserProfile());
      dispatch(resetReadmeSlice());
    }
  }, [githubUserId,dispatch, githubProfile]);

  return (
    <section>
      <h1 className="font-black tracking-tight text-5xl lg:text-7xl xl:text-8xl normal-case drop-shadow-[0_2px_80px_rgba(34,197,94,0.9)]">
        The ultimate home for your{" "}
        <span className="text-primary">readme(s)</span>
      </h1>
      {session === null && (
        <GithubLogin>
          <div className="btn btn-secondary">
            Get started for free{" "}
            <span>
              <MdKeyboardArrowRight />
            </span>
          </div>
        </GithubLogin>
      )}
      {session !== null && (
        <Link className="btn btn-secondary" href="/step/1">
          Generate your profile readme {session?.user?.name?.split(" ")[0]}
          <span>
            <MdKeyboardArrowRight />
          </span>
        </Link>
      )}
      <Image
        quality={100}
        className="rounded-lg outline-neutral-800 outline-1 outline w-full h-full drop-shadow-[0_0_80px_rgba(34,197,94,0.4)]"
        src={Landing_bg}
      />
    </section>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  console.log(session);

  if (!session) {
    return {
      props: {
        session: null,
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