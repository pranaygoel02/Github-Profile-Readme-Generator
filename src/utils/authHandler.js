import { signIn, signOut, useSession } from "next-auth/react";
import { toast } from "react-hot-toast";

export const useGithubSession = () => {
  const { data: session, status } = useSession();
  const githubUserId = session
    ? session?.user?.image
        .replace("https://avatars.githubusercontent.com/u/", "")
        .replace("?v=4", "")
    : null;
  return { session, status, githubUserId };
};

export const githubLogin = async () => {
  await signIn('github')
};

export const githubLogout = async () => {
  await signOut();
  toast.success("Logged out successfully");
};
