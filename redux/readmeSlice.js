import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import generateDesc from "@/utils/generateDesc";

const initialState = {
  selectedTechs: [],
  selectedTechsCount: 0,
  socials: [],
  socialsCount: 0,
  githubUserId: "",
  gitCards: [],
  gitTrophies: [],
  gitStats: {},
  gitProfile: {},
  userInfo: [],
  userDescription: "",
  fetchingDesc: false,
  error: null,
  skillsBadgeStyle: 'flat',
  badgeStyle: 'flat',
  cardTheme: 'dark',
  cardsToShow: [],
  githubStatsCard: {
    title_color: 'fff',
    text_color: 'fff',
    icon_color: 'fff',
    border_color: 'fff',
    bg_color: '000',
    hide_border: true,
    theme: 'dark',
    cache_seconds: 1800,
    border_radius: 10,
    hide_title: false,
    card_width: 400,
    hide_rank: false,
    show_icons: true,
    include_all_commits: false,
    count_private: true,
    line_height: 25,
    custom_title: '',
    text_bold: true,
    disable_animations: false,
    ring_color: 'fff',
    number_format: '',
  },
  githubLanguageCard: {
    title_color: 'fff',
    text_color: 'fff',
    icon_color: 'fff',
    border_color: 'fff',
    bg_color: '000',
    hide_border: true,
    theme: 'dark',
    cache_seconds: 1800,
    border_radius: 10,
    hide_title: false,
    card_width: 400,
    layout: 'default',
    langs_count: 5,
    custom_title: '',
    disable_animations: false,
    hide_progress: false,
  }
};

const readmeSlice = createSlice({
  name: "readme",
  initialState,
  reducers: {
    // addTech: (state, action) => {
    //   const { tech } = action.payload;
    //   state.selectedTechs.push(tech);
    //   state.selectedTechsCount++;
    // },
    // removeTech: (state, action) => {
    //   const { tech } = action.payload;
    //   state.selectedTechs = state.selectedTechs.filter((item) => item !== tech);
    //   state.selectedTechsCount--;
    // },
    addUserInfo: (state, action) => {
      const { userInfo } = action.payload;
      state.userInfo.push(userInfo);
    },
    removeUserInfo: (state, action) => {
      const { userInfo } = action.payload;
      state.userInfo = state.userInfo.filter((item) => item !== userInfo);
    },
    fetchDesc: (state) => {
      state.fetchingDesc = true;
    },
    setUserDescription: (state, action) => {
      const { userDescription } = action.payload;
      state.userDescription = userDescription;
      state.fetchingDesc = false;
      state.error = null;
    },
    setError: (state, action) => {
      const { error } = action.payload;
      state.error = error;
      state.fetchingDesc = false;
    },
    addSocial: (state, action) => {
      const { social, username, link, color } = action.payload;
      if(state.socials.find(item => item.social === social)) {
        state.socials = state.socials.map(item => {
          if(item.social === social) {
            return { social, username, color, link }
          }
          return item;
        })
        return;
      };
      state.socials.push({ social, username, color, link });
      state.socialsCount++;
    },
    removeSocial: (state, action) => {
      const { social } = action.payload;
      state.socials = state.socials.filter((item) => item.social !== social);
      state.socialsCount--;
    },
    addTech: (state, action) => {
      const { name, color } = action.payload;
      if(state.selectedTechs.find(item => item.name === name)) {
        state.selectedTechs = state.selectedTechs.map(item => {
          if(item.name === name) {
            return { name, color }
          }
          return item;
        })
        return;
      };
      state.selectedTechs.push({ name, color });
      state.selectedTechsCount++;
    },
    removeTech: (state, action) => {
      const { name } = action.payload;
      state.selectedTechs = state.selectedTechs.filter((item) => item.name !== name);
      state.selectedTechsCount--;
    },
    resetReadmeSlice: (state) => {
      state.selectedTechs = [];
      state.selectedTechsCount = 0;
      state.socials = [];
      state.socialsCount = 0;
      state.githubUserId = "";
      state.gitCards = [];
      state.gitTrophies = [];
      state.gitStats = {};
      state.gitProfile = {};
      state.userInfo = [];
    },
    setBagdeStyle: (state, action) => {
      const { badgeStyle } = action.payload;
      state.badgeStyle = badgeStyle;
    },
    setSkillsBadgeStyle: (state, action) => {
      const { skillsBadgeStyle } = action.payload;
      state.skillsBadgeStyle = skillsBadgeStyle;
    },
    changeTheme: (state, action) => {
      const { theme } = action.payload;
      state.cardTheme = theme;
    },
    addCardToShow: (state, action) => {
      const { card } = action.payload;
      state.cardsToShow.push(card);
    },
    removeCardToShow: (state, action) => {
      const { card } = action.payload;
      state.cardsToShow = state.cardsToShow.filter(item => item !== card);
    }
  },
});

export const {
  addTech,
  removeTech,
  addUserInfo,
  removeUserInfo,
  resetReadmeSlice,
  setUserDescription,
  fetchDesc,
  setError,
  addSocial,
  removeSocial,
  setBagdeStyle,
  setSkillsBadgeStyle,
  changeTheme,
  addCardToShow,
  removeCardToShow
} = readmeSlice.actions;

export default readmeSlice.reducer;
