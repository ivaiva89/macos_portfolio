import { useWindowStore, type WindowKey } from '#store'

interface WindowControlsProps {
    target: WindowKey
    onClose?: () => void
}

const WindowControls = ({ target, onClose }: WindowControlsProps) => {
    const { closeWindow } = useWindowStore()
    return (
        <div id="window-controls">
            <button type="button" className="close" aria-label={`Close ${target}`} onClick={() => (onClose ? onClose() : closeWindow(target))} />
            <div className="minimize " />
            <div className="maximize" />
        </div>
    )
}
export default WindowControls
