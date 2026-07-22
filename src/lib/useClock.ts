import { useEffect, useState } from 'react'
import dayjs from 'dayjs'

/** Live clock that stays in sync with the minute boundary. */
const useClock = (format: string) => {
    const [now, setNow] = useState(() => dayjs())

    useEffect(() => {
        const tick = () => setNow(dayjs())
        const msToNextMinute = 60_000 - (Date.now() % 60_000)

        let interval: ReturnType<typeof setInterval> | undefined
        const timeout = setTimeout(() => {
            tick()
            interval = setInterval(tick, 60_000)
        }, msToNextMinute)

        return () => {
            clearTimeout(timeout)
            if (interval) clearInterval(interval)
        }
    }, [])

    return now.format(format)
}

export default useClock
