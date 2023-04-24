import React, { useEffect } from "react";
import GithubLogin from "../Auth/GithubLogin";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useGithubSession } from "../../utils/authHandler";
import { useSelector } from "react-redux";
import Image from "next/image";

function Navbar() {
  const { session, status, githubUserId } = useGithubSession();

  const { githubUserProfile } = useSelector((state) => state.github);

  let login, html_url, avatar_url;

    
      login = githubUserProfile?.login || session?.user?.name;
      html_url = githubUserProfile?.html_url || session?.user?.image;
      avatar_url = githubUserProfile?.avatar_url || session?.user?.image;
    
  
  return (
    <div className="flex items-center justify-between p-4 lg:p-8 z-10">
      <Link href="/">
        <h2 className="font-black text-lg">.md</h2>
      </Link>
      <div className="flex gap-4 items-center">
        {session !== null && (
          <>
            <Link
              target="_blank"
              title={`@${login}`}
              passHref
              href={`${html_url}`}
            >
              <Image width={100} height={100} alt={'Avatar'} className="rounded-full w-10" src={avatar_url} />
            </Link>
          </>
        )}
        <GithubLogin />
      </div>
    </div>
  );
}

export default Navbar;
