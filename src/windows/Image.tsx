import WindowControls from '#components/WindowControls'
import WindowWrapper from '#hoc/WindowWrapper'
import useWindowStore from '#store/window'
import type { FileItem } from '#constants/location'

const Image = () => {
    const { windows } = useWindowStore()
    const data = windows.imgfile.data as FileItem | null

    if (!data) return null

    const { name, imageUrl } = data

    if (!imageUrl) return null

    return (
        <>
            <div id="window-header">
                <WindowControls target="imgfile" />
                <p>{name}</p>
            </div>

            <div className="preview">
                <img src={imageUrl} alt={name} />
            </div>
        </>
    )
}

const ImageWindow = WindowWrapper(Image, 'imgfile')

export default ImageWindow
