import { UrlObject } from 'url';

export default function isPathActive(
    pathname: string,
    href?: string | UrlObject
) {
    if (!href) return false;

    const normalize = (p: string) =>
        p.split("?")[0].replace(/\/+$/, "");

    const path = normalize(pathname);

    let targetPath: string;

    if (typeof href === "string") {
        targetPath = href;
    } else {
        targetPath = href.pathname ?? "";
    }

    const target = normalize(targetPath);

    if (!target) return false;

    if (target === "/home") {
        return path === "/home" || path === "/home/projects";
    }

    if (target === "/panel") {
        return path === "/panel";
    }

    if (path === target) return true;

    return path.startsWith(`${target}/`);
}


export const isBacklogPathActive = (
    pathname: string,
    href: string
) => {

    // Normaliza eliminando query y trailing slash
    const normalize = (p: string) => p.split("?")[0].replace(/\/+$/, "");

    const path = normalize(pathname);
    const target = normalize(href);

    if (!target) return false;

    // Si es la ruta exacta, activo
    if (path === target) return true;

    // Para los items que no deben seleccionarse en hijos
    // (el primer BacklogNavItem por ejemplo)
    // solo devolvemos true si path === target exacto, no startsWith
    return false;
}
