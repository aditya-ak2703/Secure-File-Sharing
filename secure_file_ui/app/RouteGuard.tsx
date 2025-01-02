import ROUTES, { AUTH_USER_RESTRICTED_ROUTES, PUBLIC_ROUTES } from "@/constants/routes";
import { useAppSelector } from "@/store/hooks";
import { selectUser, selectUserIsInitialized } from "@/store/user-context/user-context.selectors";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RouteGuard({children}: {children: React.ReactNode}) {
    const router = useRouter();
    const pathname = usePathname();
    const isInitialized = useAppSelector(selectUserIsInitialized);
    const user = useAppSelector(selectUser);

    useEffect(() => {
        if(!isInitialized) return;
        if(user){
            if(AUTH_USER_RESTRICTED_ROUTES.includes(pathname)) {
                router.push(ROUTES.DASHBOARD);
            }
        } else {
            if(PUBLIC_ROUTES.includes(pathname)) return;
            router.push(ROUTES.LOGIN);
        }
    }, [isInitialized, user, router, pathname]);

    if(!isInitialized) return null
    
    if(user) {
        if(AUTH_USER_RESTRICTED_ROUTES.includes(pathname)) return null;
    }
    else {
        if(!PUBLIC_ROUTES.includes(pathname)) return null;
    }
    return children
}