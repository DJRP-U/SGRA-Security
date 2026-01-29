export const colorMapBacklogItems: Record<
    string,
    { textColor: string; hoverText: string; hoverActiveBg: string; hoverActiveText: string }
> = {
    blue: {
        textColor: "text-blue-500",
        hoverText: "hover:text-blue-500",
        hoverActiveBg: "hover:bg-blue-300",
        hoverActiveText: "hover:text-blue-700",
    },
    red: {
        textColor: "text-red-500",
        hoverText: "hover:text-red-500",
        hoverActiveBg: "hover:bg-red-300",
        hoverActiveText: "hover:text-red-700",
    },
    green: {
        textColor: "text-teal-500",
        hoverText: "hover:text-teal-500",
        hoverActiveBg: "hover:bg-teal-300",
        hoverActiveText: "hover:text-teal-700",
    },
};