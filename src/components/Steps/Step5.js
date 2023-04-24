import { useSelector, useDispatch } from "react-redux";
import {
  changeTheme,
  addCardToShow,
  removeCardToShow,
} from "../../../redux/readmeSlice";
import Select from "../TechSelect/Select";
import Link from "next/link";
import { AiOutlineInfoCircle } from "react-icons/ai";

const availableCards = [
  "github-stats",
  "github-trophies",
  "github-language-stats",
  "github-contributions",
];

function Step5() {
  const {
    githubUserProfile,
  } = useSelector((state) => state.github);
  
  const {login} = githubUserProfile !== undefined ? githubUserProfile : JSON.parse(localStorage.getItem('githubUserProfile'));

  const { cardTheme, cardsToShow } = useSelector((state) => state.readme);

  const dispatch = useDispatch();

  return (
    <section>
      <h1>
        Time to flaunt your <span className="text-primary">github stats</span>
      </h1>

      <div className="flex gap-4 w-full items-center justify-center">
        <label className="w-fit text-neutral-400">Theme</label>
        <select
          onChange={(e) => dispatch(changeTheme({ theme: e.target.value }))}
          defaultValue={changeTheme}
        >
          <option value="default">Default</option>
          <option value="dark">Dark</option>
          <option value="radical">Radical</option>
          <option value="merko">Merko</option>
          <option value="gruvbox">Gruvbox</option>
          <option value="tokyonight">Tokyonight</option>
          <option value="onedark">Onedark</option>
          <option value="cobalt">Cobalt</option>
          <option value="synthwave">Synthwave</option>
          <option value="highcontrast">Highcontrast</option>
          <option value="dracula">Dracula</option>
          <option value="prussian">Prussian</option>
          <option value="monokai">Monokai</option>
          <option value="vue">Vue</option>
          <option value="vue-dark">Vue Dark</option>
          <option value="shades-of-purple">Shades of Purple</option>
          <option value="nightowl">Nightowl</option>
          <option value="buefy">Buefy</option>
          <option value="blue-green">Blue Green</option>
          <option value="algolia">Algolia</option>
          <option value="great-gatsby">Great Gatsby</option>
          <option value="darcula">Darcula</option>
          <option value="bear">Bear</option>
          <option value="solarized-dark">Solarized Dark</option>
          <option value="solarized-light">Solarized Light</option>
          <option value="chartreuse-dark">Chartreuse Dark</option>
          <option value="nord">Nord</option>
          <option value="gotham">Gotham</option>
          <option value="material-palenight">Material Palenight</option>
          <option value="graywhite">Graywhite</option>
          <option value="vision-friendly-dark">Vision Friendly Dark</option>
          <option value="ayu-mirage">Ayu Mirage</option>
          <option value="midnight-purple">Midnight Purple</option>
          <option value="calm">Calm</option>
          <option value="flag-india">Flag India</option>
          <option value="omni">Omni</option>
          <option value="react">React</option>
          <option value="jolly">Jolly</option>
          <option value="maroongold">Maroongold</option>
          <option value="yeblu">Yeblu</option>
          <option value="blueberry">Blueberry</option>
          <option value="slateorange">Slateorange</option>
          <option value="kacho_ga">Kacho Ga</option>
          <option value="outrun">Outrun</option>
          <option value="passport">Passport</option>
          <option value="shades-of-orange">Shades of Orange</option>
          <option value="night-owl">Night Owl</option>
          <option value="bubbly">Bubbly</option>
          <option value="sugarplum">Sugarplum</option>
          <option value="dark-plus">Dark Plus</option>
          <option value="ash">Ash</option>
          <option value="solarized-dark-high-contrast">
            Solarized Dark High Contrast
          </option>
          <option value="dracula-pro">Dracula Pro</option>
          <option value="far">Far</option>
          <option value="terminal">Terminal</option>
          <option value="line">Line</option>
          <option value="min">Min</option>
          <option value="doom-one">Doom One</option>
          <option value="vue-dark">Vue Dark</option>
          <option value="bear">Bear</option>
          <option value="solarized-dark">Solarized Dark</option>
          <option value="solarized-light">Solarized Light</option>
          <option value="chartreuse-dark">Chartreuse Dark</option>
          <option value="nord">Nord</option>
          <option value="gotham">Gotham</option>
          <option value="material-palenight">Material Palenight</option>
        </select>
      </div>
      <div>
        <p className="inline-flex gap-2 items-center text-neutral-400 pb-4"><AiOutlineInfoCircle/> Select the cards in the order you want to display them.</p>
        <div className="flex flex-wrap gap-2 justify-center">
          {availableCards.map((card) => (
            <Select
              key={card}
              text={card}
              selected={cardsToShow.includes(card)}
              onClick={
                cardsToShow.includes(card)
                  ? () => dispatch(removeCardToShow({ card }))
                  : () => dispatch(addCardToShow({ card }))
              }
            />
          ))}
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {cardsToShow.map((card) => {
          switch (card) {
            case "github-trophies":
              return (
                <img
                  src={`https://github-profile-trophy.vercel.app/?username=${login}`}
                  alt={login}
                />
              );
            case "github-stats":
                return (
                    <img
                        src={`https://github-readme-stats.vercel.app/api?username=${login}&show_icons=true&locale=en&theme=${cardTheme}`}
                        alt={login}
                    />
                );
            case "github-language-stats":
                return (
                    <img
                        src={`https://github-readme-stats.vercel.app/api/top-langs?username=${login}&show_icons=true&locale=en&layout=compact&theme=${cardTheme}`}
                        alt={login}
                    />
                );
            case "github-contributions":
                return (
                    <img
                        src={`https://github-readme-streak-stats.herokuapp.com/?user=${login}&theme=${cardTheme}`}
                        alt={login}
                    />
                );
            default:
                return null;
          }
        })}
    </div>
        <Link className="btn btn-primary" href={'/step/6'} passHref>Finalize</Link>
    </section>
  );
}

export default Step5;
