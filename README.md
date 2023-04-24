# Github Profile Readme Generator

- Developed using **NextJS**, **TailwindCSS**, **Redux Toolkit** (for state management) and **OpenAI** API.
- The Application uses **Github authorization** to sign in users.

## Description 🚀

### Why the need of such an application?
Many young developers and begineer contributors find it difficult to make a nice Github profile readme. So they go ahead and start forking multiple readmes of different users, which is time consuming.
This application aims to cut short this time and provide the functionality to all such users make their own profile readme at ease, in just a few steps.
- #### Step 1:
The user adds their tech stack and skills one by one in a field provided. These list is then used to render the skillset of the user in the final readme in the form of [Img Shield](https://shields.io) badges, of which the color can also fully customised as per preference.
- #### Step 2:
Here the user adds a few keywords and phrases related to their work, experience, projects and skills.
- #### Step 3:
This step is the USP of the application. Here the application levrages the power of OpenAIs API to generate a description of the user with the help of the keywords and the skillset provided by the user.
- #### Step 4:
This step is reserved for the socials, because connection is key in todays world. The users add their social links and username. It is again used to make badges for the final readme. The style of these badges is fully customizable.
- #### Step 5:
For any github contibutor, showcasing their stats becomes a valuable factor. So here the users can add their **Github Trophies**, **Github Overall Statistics**, **Language Stats**, and **Contribution Stats** in any order as per their choice.
- #### Step 6:
This is the final step, where the user can make see a final preview of their profile readme, make changes accordingly and download the `readme.md` file.

**So in just 6 easy steps, a simple, short, yet crucial profile readme is ready for any Github contributor.**
## Live Demo🌐
[Live Site Link](https://dotmd.vercel.app)

## For Developers
- Clone the application.
- Register a OAuth App in Github Developer Settings.
- Add the `.env` file. A template of .env file is as follows:
```env
GITHUB_ID = OAuth App Client ID
GITHUB_SECRET = OAuth App Client Secret. The secret once generated is visible only once. So make sure you keep it safely.
NEXTAUTH_URL = http://localhost:3000 (The Github authorization fallback url. Here localhost:3000 for development environment)
JWT_SECRET = Your JWT Secret Key
NEXT_PUBLIC_RAPID_API_KEY = Get a OpenAI API key from [Radpid API](https://rapidapi.com/openai-api-openai-api-default/api/openai80)
NEXT_PUBLIC_RAPID_API_HOST = openai80.p.rapidapi.com
```
- Install packages
`npm i`
- Run the app in development environment
`npm run dev`
- To make a build
`npm run build`
