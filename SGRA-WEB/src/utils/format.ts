export const toTitleCase = (s?: string | null): string => {
        if (typeof s !== "string") return "";

        return s
                .toLowerCase()
                .replace(/[_]+/g, " ")
                .trim()
                .split(/\s+/)
                .map(w => w.charAt(0).toUpperCase() + w.slice(1))
                .join(" ");
};


export const formatDateForInput = (dateString: string | null | undefined): string => {
        if (!dateString) return "";
        return dateString.substring(0, 10);
};