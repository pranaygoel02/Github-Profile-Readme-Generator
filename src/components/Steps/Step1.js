// import React, { useState, useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import techStacks from "@/data/lang.json";

// import { addTech, removeTech } from "../../../redux/readmeSlice";
// import Select from "@/components/TechSelect/Select";
// import numberToWords from "@/utils/convertToWords";
// import { MdOutlineKeyboardArrowRight } from "react-icons/md";
// import Link from "next/link";
// import SkipToStep from './SkipToStep';

// export function Step1() {
//     const [search, setSearch] = useState("");
//     const [searchList, setSearchList] = useState(techStacks);

//     const { selectedTechs, selectedTechsCount } = useSelector(
//       (state) => state.readme
//     );
//     const {
//       githubUserProfile: { login },
//     } = useSelector((state) => state.github);

//     const dispatch = useDispatch();

//     const handleSelect = (e, tech) => {
//       e.preventDefault();
//       if (selectedTechs?.includes(tech)) {
//         dispatch(removeTech({ tech }));
//       } else {
//         dispatch(addTech({ tech }));
//       }
//     };

//     const handleCustomTech = (e) => {
//       e.preventDefault();
//       if (!selectedTechs?.includes(search)) {
//         techStacks["Custom"] = [search, ...techStacks["Custom"]];
//         setSearchList({ ...techStacks });
//       } else {
//         setSearchList((prev) => ({
//           ...prev,
//           Custom: prev["Custom"]?.filter((tech) => tech !== search),
//         }));
//       }
//       handleSelect(e, search);
//     };

//     useEffect(() => {
//       if (search) {
//         const filtered = Object.keys(techStacks)?.reduce((acc, key) => {
//           const filteredTech = techStacks[key]?.filter((tech) =>
//             tech.toLowerCase().includes(search.toLowerCase())
//           );
//           if (filteredTech?.length > 0) {
//             acc[key] = filteredTech;
//           }
//           return acc;
//         }, {});
//         setSearchList((prev) => filtered);
//       } else {
//         setSearchList(techStacks);
//       }
//     }, [search]);

//     console.log(searchList);
//     return (
//       <section>
//         <h1>
//           {selectedTechsCount > 0
//             ? numberToWords(selectedTechsCount)
//             : "Enter your"}{" "}
//           technology <span className="text-primary">stacks & skills</span>
//         </h1>
//         <form className="w-full flex gap-4 items-center justify-center">
//           <input
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             placeholder="Search..."
//           />
//           <button onClick={handleCustomTech} className="btn btn-secondary">
//             Add
//           </button>
//           <SkipToStep to={2}/>
//         </form>
//         <div>
//           {Object.keys(searchList).map((key) => {
//             console.log(searchList[key]);
//             return (
//               searchList[key]?.length > 0 && (
//                 <div className="py-8">
//                   <h2>{key}</h2>
//                   <div className="flex gap-2 justify-center flex-wrap">
//                     {searchList[key]?.map((tech) => (
//                       <Select
//                         onClick={(e) => handleSelect(e, tech)}
//                         selected={selectedTechs?.includes(tech)}
//                         key={tech}
//                         text={tech}
//                       />
//                     ))}
//                   </div>
//                 </div>
//               )
//             );
//           })}
//         </div>
//       </section>
//     );
//   }

// export default Step1

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addTech,
  removeTech,
  setSkillsBadgeStyle,
} from "../../../redux/readmeSlice";
import numberToWords from "@/utils/convertToWords";
import {AiOutlineInfoCircle} from 'react-icons/ai'
import Image from "next/image";

function Step1() {
  const dispatch = useDispatch();

  const { selectedTechs, selectedTechsCount, skillsBadgeStyle } = useSelector(
    (state) => state.readme
  );

  const handleAddition = (e) => {
    e.preventDefault();
    const name = e.target[0].value;
    const color = e.target[1].value;
    dispatch(addTech({ name, color }));
  };

  console.log(selectedTechs);

  return (
    <section>
      <h1>
        {selectedTechsCount > 0
          ? numberToWords(selectedTechsCount)
          : "Enter your"}{" "}
        technology <span className="text-primary">stacks & skills</span>
      </h1>
      <div className="flex flex-col gap-4 w-full">
        <form
          onSubmit={handleAddition}
          className="flex gap-4 items-center justify-center"
        >
          <input name="name" placeholder="Technology Name" className="w-full" />
          <input
            type="color"
            title="Select color of badge"
            name="color"
            className="w-full h-11 cursor-pointer"
          />
          <button className="btn btn-primary">Add</button>
        </form>
        <select
          title="Select badge style"
          defaultValue={skillsBadgeStyle}
          onChange={(e) =>
            dispatch(setSkillsBadgeStyle({ skillsBadgeStyle: e.target.value }))
          }
          className="w-full"
        >
          <option value="plastic">Plastic</option>
          <option value="flat">Flat</option>
          <option value="flat-square">Flat Square</option>
          <option value="for-the-badge">For The Badge</option>
          <option value="social">Social</option>
        </select>
      </div>
      <div className="w-full lg:gap-4 grid lg:grid-cols-2">
        {selectedTechs?.map((item, index) => {
          return (
            <p key={index} className=" w-full flex items-center justify-between gap-4 p-2  outline-1 outline-dashed rounded-md outline-neutral-600 text-neutral-500 font-mono">
              <img
                alt={`${item?.name} badge`}
                src={`https://img.shields.io/badge/${item?.name
                  ?.split(" ")
                  .join("%20")}-${item?.color.replace(
                  "#",
                  ""
                )}?style=${skillsBadgeStyle}&logo=${item?.name
                  ?.split(" ")
                  .join("%20")}`}
                className="w-auto h-auto"
              />
              {item?.name}
              <button
                className="btn btn-primary rounded-l-none"
                onClick={() => dispatch(removeTech({ name: item?.name }))}
              >
                Remove
              </button>
            </p>
          );
        })}
      </div>
    </section>
  );
}

export default Step1;
