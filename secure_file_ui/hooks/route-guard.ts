import ROUTES, { AUTH_USER_RESTRICTED_ROUTES } from "@/constants/routes";
import { useAppSelector } from "@/store/hooks"
import { selectUser } from "@/store/user-context/user-context.selectors"
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export const useAuthUserRouteGuard = () => {
    const user = useAppSelector(selectUser);
    const pathname = usePathname();
    const router = useRouter();

    useEffect(function() {
        if(user && AUTH_USER_RESTRICTED_ROUTES.includes(pathname)) {
            router.push(ROUTES.DASHBOARD)
        }
    }, [user, pathname, router]);
}