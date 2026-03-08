import WindowControls from '#components/WindowControls'
import WindowWrapper from '#hoc/WindowWrapper'
import useWindowStore from '#store/window'
import type { FileItem } from '#constants/location'

const Text = () => {
    const { windows } = useWindowStore()
    const data = windows.tstfile.data as FileItem | null

    if (!data) return null

    const { name, image, subtitle, description } = data

    return (
        <>
            <div id="window-header">
                <WindowControls target="tstfile" />
                <h2>{name}</h2>
            </div>

            <article className="bg-white p-5 space-y-4">
                {image && <img src={image} alt={name} className="w-full object-contain rounded-md bg-gray-100" />}
                {subtitle && <p className="text-sm font-semibold text-gray-700">{subtitle}</p>}
                {description?.map((paragraph, index) => (
                    <p key={`${name}-${index}`} className="text-sm text-gray-600 leading-6">
                        {paragraph}
                    </p>
                ))}
            </article>
        </>
    )
}

const TextWindow = WindowWrapper(Text, 'tstfile')

export default TextWindow
