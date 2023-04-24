import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addSocial, removeSocial, setBagdeStyle } from "../../../redux/readmeSlice";
import Select from "../TechSelect/Select";
import Image from "next/image";

function Step4() {
  const dispatch = useDispatch();

  const { socials, badgeStyle } = useSelector((state) => state.readme);

    const handleAddition = (e) => {
        e.preventDefault();
        const social = e.target[0].value;
        const username = e.target[1].value;
        const link = e.target[2].value;
        const color = e.target[3].value;
        dispatch(addSocial({ social, username, link, color }));
    }

    // console.log(socials);

  return (
    <section>
      <h1>
        <span className="text-primary">Connection</span> is key,<br/>Add your <span className="text-primary">socials</span>
      </h1>
      <div className="flex flex-col gap-4 w-full">
        <form
            onSubmit={handleAddition}
          className="flex gap-4 items-center justify-center"
        >
          <input
            name="social"
            placeholder="Social"
            className="w-full"
          />
          <input
            name="username"
            placeholder="Username"
          />
          <input
            name="link"
            placeholder="Link"
          />
          <input type="color" title="Select color of badge" name="color" className="w-full h-11 cursor-pointer"/>
          <button className="btn btn-primary">Add</button>
        </form>
        <select title="Select badge style" defaultValue={badgeStyle} onChange={(e) => dispatch(setBagdeStyle({badgeStyle: e.target.value}))} className="w-full">
            <option value="plastic">Plastic</option>
            <option value="flat">Flat</option>
            <option value="flat-square">Flat Square</option>
            <option value="for-the-badge">For The Badge</option>
            <option value="social">Social</option>
        </select>
      </div>
      <div className="w-full space-y-4">
      {socials?.map((item, index) => {
        return (
            <div key={item?.social} className="w-full flex items-center justify-between gap-4">
                <a target="_blank" href={item?.link}><img alt={`${item.social} Badge`} src={`https://img.shields.io/badge/${item?.social}-${item?.color.replace('#','')}?style=${badgeStyle}&logo=${item?.social}`}/></a>
                <p className="p-2  outline-1 outline-dashed rounded-md w-full outline-neutral-600 text-neutral-500 font-mono">{item?.username}</p>
                <button className="btn btn-primary rounded-l-none" onClick={() => dispatch(removeSocial({social: item?.social}))}>Remove</button>
            </div>
        )
      })}
      </div>
    </section>
  );
}

export default Step4;
