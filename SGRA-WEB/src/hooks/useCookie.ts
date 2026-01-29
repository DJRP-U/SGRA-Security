import { useEffect, useState } from "react"

export function useCookie(name: string) {
    const [value, setValue] = useState<string | null>(null)

    useEffect(() => {
        cookieStore.get(name).then(c => {
            setValue(c?.value ?? null)
        })
    }, [name])

    return value
}
