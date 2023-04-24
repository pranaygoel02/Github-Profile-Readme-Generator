import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    githubUserId: undefined,
    githubUserProfile: {},
};

export const githubUserSlice = createSlice({
  name: "githubUserProfile",
  initialState,
  reducers: {
    getGithubUserProfile: async (state, action) => {
        const { githubUserId } = action.payload;
        const response = await fetch(`https://api.github.com/user/${githubUserId}`);
        const data = await response.json();
        // console.log(data);
        state.githubUserProfile = data;
        // console.log('State >>> ', state.githubUserProfile);
        localStorage.setItem("githubUserProfile", JSON.stringify(data));
    },
    setGithubUserId: (state, action) => {
        const { githubUserId } = action.payload;
        state.githubUserId = githubUserId;
    },
    setGithubUserProfile:  (state, action) => {
        const { githubUserProfile } = action.payload;
        state.githubUserProfile = githubUserProfile;
    },
    resetGithubUserProfile:  (state) => {
        state.githubUserId = undefined;
        state.githubUserProfile = {};
        localStorage.removeItem("githubUserProfile");
    },
  },
});

export const { setGithubUserProfile, getGithubUserProfile, setGithubUserId, resetGithubUserProfile } =
  githubUserSlice.actions;

export default githubUserSlice.reducer;
