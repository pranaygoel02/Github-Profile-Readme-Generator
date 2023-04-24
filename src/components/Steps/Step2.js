import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addUserInfo, removeUserInfo } from "../../../redux/readmeSlice";
import Select from "../TechSelect/Select";
import SkipToStep from "./SkipToStep";
import { AiOutlineInfoCircle } from "react-icons/ai";

function Step2() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.readme);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addUserInfo({ userInfo: e.target[0].value }));
  };

  return (
    <section>
      <h1>
        Describe <span className="text-primary">yourself</span> in brief points
      </h1>
      <div className="flex flex-col gap-4 w-full">
        <form className="flex gap-4 items-center justify-center" onSubmit={handleSubmit}>
          <input
            name="description"
            placeholder="Enter your description here. Press ENTER to add."
            className="w-full"
          />
          <SkipToStep to={3} />
        </form>
      </div>
      <p className="text-neutral-400 text-sm inline-flex items-center gap-1"><AiOutlineInfoCircle/> Kindly provide as many points as possible about your work and contributions to help the AI tool generate a precise description for you.</p>
      
      <div className="flex flex-wrap gap-2">
        {userInfo?.map((item, index) => (
          <Select
            onClick={(e) => dispatch(removeUserInfo({ userInfo: item }))}
            selected={true}
            secondary
            key={item}
            text={item}
          />
        ))}
      </div>
    </section>
  );
}

export default Step2;
