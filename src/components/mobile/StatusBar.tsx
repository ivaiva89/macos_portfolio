import { SignalHigh, Wifi, BatteryFull } from 'lucide-react'
import useClock from '#lib/useClock'

const StatusBar = () => {
    const time = useClock('h:mm')

    return (
        <div id="ios-status-bar">
            <span className="time">{time}</span>
            <div className="indicators">
                <SignalHigh size={16} strokeWidth={2.5} />
                <Wifi size={16} strokeWidth={2.5} />
                <BatteryFull size={20} strokeWidth={2} />
            </div>
        </div>
    )
}

export default StatusBar
