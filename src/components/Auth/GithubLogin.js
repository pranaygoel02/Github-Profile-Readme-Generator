import { githubLogin, githubLogout, useGithubSession } from '../../utils/authHandler'
import {FaGithub} from 'react-icons/fa'

function GithubLogin({children, text}) {
  const { session, status, githubUserId } = useGithubSession()
  
  return (
    <button onClick={session ? githubLogout : githubLogin} className={!children && 'btn btn-primary lg:text-base'}>{children ? children :  (session ? 'Logout' : <span className='inline-flex gap-2 items-center'><FaGithub/>{text || 'Login with GitHub'}</span>)}</button>
  )
}

export default GithubLogin