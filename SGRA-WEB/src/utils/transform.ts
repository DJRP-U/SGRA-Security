import { toTitleCase } from "./format";

export const enumToOptions = <T extends Record<string, string>>(enm: T) => {
    return Object.values(enm).map((value) => ({
        label: toTitleCase(value),
        value,
    }));
};

export const enumNumberToOptions = <T extends Record<string, number>>(enm: T) => {
    return Object.entries(enm)
        .filter(([key]) => isNaN(Number(key)))
        .map(([_, value]) => ({
            label: `${value} puntos`,
            value,
        }));
};

export const mapEnumToOptions = <T extends Record<string, string>>(
    enumObj: T,
    firstOptionLabel: string | null = "Limpiar filtro"
) => {
    const options = Object.values(enumObj).map(value => ({
        label: toTitleCase(value),
        value,
    }));
    if (firstOptionLabel) {
        return [{ label: firstOptionLabel, value: null }, ...options];
    }
    return options;
};
