import ButtonIcon from '../../ui/ButtonIcon'
import Spinner from '../../ui/Spinner'
import { IoIosLogOut } from "react-icons/io";
import { useLogout } from './useLogout';

export default function Logout() {
    const{ logout , isLoading} = useLogout()
        
return (
    <ButtonIcon onClick ={logout} disabled={isLoading}>
      {isLoading? <Spinner/> :<IoIosLogOut /> }
    </ButtonIcon>
  )
}
