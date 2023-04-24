import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import ReactMarkdown from "react-markdown";
import { saveAs } from "file-saver";
import {BiCopy} from 'react-icons/bi'
import { toast } from "react-hot-toast";

function Finalize() {
  
  const markedRef = useRef(null);
  const [finalReadme, setFinalReadme] = useState('');

  const {
    githubUserProfile: { login },
  } = useSelector((state) => state.github);
  const {
    selectedTechs,
    userDescription,
    socials,
    cardsToShow,
    cardTheme,
    skillsBadgeStyle,
    badgeStyle,
  } = useSelector((state) => state.readme);

  console.log({
    login,
    selectedTechs,
    userDescription,
    socials,
    cardsToShow,
    cardTheme,
    skillsBadgeStyle,
    badgeStyle,
  });

  function DownloadMd (content) {
    const blob = new Blob([content], { type: "text/markdown" });
    saveAs(blob, "readme.md");
  }

  const handleDownload = (e) => {
    e.preventDefault();
    try {
      DownloadMd(finalReadme);
      toast.success('Downloaded successfully')
    }catch(err) {
      toast.error('Something went wrong')
    }
  }

  const cards = {
    "github-trophies": `https://github-profile-trophy.vercel.app/?username=${login}`,
    "github-stats": `https://github-readme-stats.vercel.app/api?username=${login}&show_icons=true&locale=en&theme=${cardTheme}`,
    "github-language-stats": `https://github-readme-stats.vercel.app/api/top-langs?username=${login}&show_icons=true&locale=en&layout=compact&theme=${cardTheme}`,
    "github-contributions": `https://github-readme-streak-stats.herokuapp.com/?user=${login}&theme=${cardTheme}`,
  };

  const socialLinks = `# Social Links\n\n
  ${socials
    ?.map(
      (item) =>
        `[![${item?.social}](https://img.shields.io/badge/${
          item?.social
        }-${item?.color.replace("#", "")}?style=${badgeStyle}&logo=${
          item?.social
        })](${item?.link})`
    )
    .join("\n")}`;

  const techs = `# Tech Stack\n\n
  ${selectedTechs
    ?.map(
      (item) =>
        `[![${item?.name}](https://img.shields.io/badge/${
          item?.name
        }-${item?.color.replace("#", "")}?style=${skillsBadgeStyle}&logo=${
          item?.name
        })](${item?.link})`
    )
    .join("\n")}`;

  const gitCards = `# Github Cards\n\n
  ${cardsToShow?.map((card) => `[![Github](${cards[card]})]()`).join("\n")}`;

  useEffect(() => {
    setFinalReadme(`${userDescription}\n${techs}\n${socialLinks}\n${gitCards}`);
  }, [userDescription, techs, socialLinks, gitCards]);

  console.log(finalReadme);

  return (
    <>
      <section>
        <h1>
          <span className="text-primary">Wohooo!</span> Let&apos;s finalize your{" "}
          <span className="text-primary">readme</span>
        </h1>
      </section>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 px-8  lg:px-48 pb-16">
        <div className="relative">
          <textarea onChange={(e) => setFinalReadme(e.target.value)} defaultValue={finalReadme} className="w-full text-sm h-full" />
          <button onClick={(e) => {
            e.preventDefault();
            navigator.clipboard.writeText(finalReadme);
            toast.success('Copied to clipboard')
          }} className="absolute inline-flex items-center gap-1 active:bg-primary transition-all right-0 top-0 m-2 bg-gray-800 p-1 text-sm rounded-md"
          ><BiCopy/> Copy</button>
        </div>
        <div
          id="readme"
          className="relative p-4 bg-[#0d1117]  rounded-lg outline-1 outline-dashed outline-neutral-500 max-h-[50vh] overflow-y-auto"
        >
          <div className="prose">
            {finalReadme && <ReactMarkdown>{finalReadme}</ReactMarkdown>}
          </div>

          <p className="absolute top-0 right-0 w-min h-min bg-gray-800 p-2 text-sm rounded-bl-md">Preview</p>
          </div>
          <button onClick={handleDownload} className="btn col-span-2 btn-primary w-max justify-self-center my-8">Download .md</button>
      </div>
    </>
  );
}

export default Finalize;
