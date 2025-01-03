import { useUserRepository } from "@/hooks/user.repository";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Button, Typography } from "@mui/material";
import { logOut as logOutAction } from '@/store/user-context/user-context.reducer';
import { useRouter } from "next/navigation";
import ROUTES from "@/constants/routes";
import { selectUser } from "@/store/user-context/user-context.selectors";

export default function TopPanel() {

    const {logout} = useUserRepository();
    const dispatch = useAppDispatch();
    const router = useRouter();
    const user = useAppSelector(selectUser);

    function logoutHandler() {
        try {
            logout();
        } catch (err) {
            return;
        }
        dispatch(logOutAction());
        router.push(ROUTES.HOMEPAGE);
    }
    
    return <>
    <div className="flex h-16 items-center">
        <Typography variant="h4" className="pl-6">Secure File Sharing</Typography>
        {user && <Button style={{"marginLeft": "auto", "marginRight": "40px"}} onClick={logoutHandler}>Log out</Button> }
    </div>
    <hr></hr>
    </>
}