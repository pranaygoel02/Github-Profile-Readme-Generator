import axios from "axios";

export default async function generateDesc({ selectedTechs, userInfo, login }) {

  const options = {
    method: "POST",
    url: "https://openai80.p.rapidapi.com/chat/completions",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY,
      "X-RapidAPI-Host": process.env.NEXT_PUBLIC_RAPID_API_HOST,
    },
    data: `{"model":"gpt-3.5-turbo","messages":[{"role":"user","content":"${generateprompt({selectedTechs, userInfo, login})}"}]}`,
  };

  try {
    const res = await axios.request(options);
    console.log(res.data);
    return res.data;
  } catch (err) {
      console.log(err);
  }
}

function generateprompt({ selectedTechs, userInfo, login }) {
  const prompt = `Generate a brief user description in first person for github profile username ${login}. Try getting as much data possible from the grihub page. Use this ${selectedTechs.join(
    ", "
  )} as tech stack keywords. Some more information about the user are as follows: ${userInfo?.join(
    ", "
  )} Highlight their expertise in specific technologies, passion for specific field/industry, and notable contributions to relevant domain/field. Mention their collaborative nature, quick learning ability, and excitement for taking up new challenges in bullet points as a Markdown formatted string. Just provide a brief description of the user in first person. Do not add any projects listing, unless given in keywords.`;
  console.log(prompt);
  return `${prompt}`;
}
