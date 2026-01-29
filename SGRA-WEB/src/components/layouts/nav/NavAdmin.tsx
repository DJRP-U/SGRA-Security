"use client"
import NavItem from "./items/NavItem";
import AsideMenuPanel from "./AsideMenuPanel";
import { HouseIcon, IdCardIcon, LogOutIcon, UsersRoundIcon } from "lucide-react";

export default function NavAdmin() {
    return (
        <AsideMenuPanel
            footer={
                <NavItem
                    href="/logout"
                    IconComponent={LogOutIcon}
                    label="Cerrar sesión"
                />
            }
        >
            <div>
                <NavItem
                    href={{
                        pathname: '/panel/request',
                        query: {
                            page: 1,
                        }
                    }}
                    IconComponent={IdCardIcon}
                    label="Solicitudes"
                />
                <NavItem
                    href="/panel/account"
                    IconComponent={UsersRoundIcon}
                    label="Cuentas"
                />
            </div>
        </AsideMenuPanel>
    );
}
