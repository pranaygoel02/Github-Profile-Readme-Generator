import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import generateDesc from "@/utils/generateDesc";
import {
  setUserDescription,
  fetchDesc,
  setError,
} from "../../../redux/readmeSlice";
import SkipToStep from "./SkipToStep";
import { toast } from "react-hot-toast";

function Step3() {
  const dispatch = useDispatch();
  const { selectedTechs, userInfo, userDescription, fetchingDesc, error } =
    useSelector((state) => state.readme);
  const {
    githubUserProfile
  } = useSelector((state) => state.github);

  const {login} = githubUserProfile !== undefined ? githubUserProfile : JSON.parse(localStorage.getItem('githubUserProfile'));

  const handleClick = async (e) => {
    e.preventDefault();
    if(selectedTechs.length === 0 && userInfo.length === 0) {
      toast.error('Please select at least one technology or add some keywords');
      return;
    }
    dispatch(fetchDesc());
    const data = await generateDesc({ selectedTechs: selectedTechs?.map(item => item?.name), userInfo, login });
    console.log(data);
    if (data)
      dispatch(
        setUserDescription({
          userDescription: data?.choices[0]?.message?.content,
        })
      );
    else dispatch(setError({ error: err }));
  };

  return (
    <section>
      <h1>
        {userDescription ? "Your" : `Let's get you a nice`}{" "}
        <span className="text-primary">Description</span>
      </h1>
      <div className="gap-1 self-center items-start flex flex-wrap">
        <p className="text-neutral-300">Keywords: </p>
        <span className="chip">{login}</span>
        {userInfo?.map((item) => (
          <span className="chip">{item}</span>
        ))}
        {selectedTechs?.map((item) => (
          <span className="chip">{item?.name}</span>
        ))}
      </div>
      {fetchingDesc && 
      <div className="relative w-full">
      <div className="w-full absolute h-full flex items-center justify-center gap-2">
        {Array.from({length:60}).fill(0).map((_, id) => (
        <span className="w-2 h-2 flex rounded-full bg-primary animate-jump" style={{animationDelay: `${100 * id}ms`}}></span>
        ))}
      </div>
      <div className="w-full absolute h-full flex items-center justify-center gap-2">
        {Array.from({length:60}).fill(0).map((_, id) => (
        <span className="w-2 h-2 flex rounded-full bg-primary animate-jump-rev" style={{animationDelay: `${100 * id}ms`}}></span>
        ))}
      </div>
      </div>
      }
      {error && <p>{error}</p>}
      <div className="w-full space-y-8 flex flex-col items-center">
        {!fetchingDesc && !error && userDescription && (
          <textarea
            onChange={(e) => dispatch(setUserDescription({ userDescription: e.target.value }))}
            className="text-base w-full"
            rows={10}
            defaultValue={userDescription}
          />
        )}
        
        {!fetchingDesc && <button
          disabled={fetchingDesc}
          className="capitalize btn btn-primary disabled:bg-primary/50"
          onClick={handleClick}
        >
          {userDescription && 're'}generate
        </button>}
      </div>
    </section>
  );
}

export default Step3;
