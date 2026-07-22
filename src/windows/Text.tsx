import { WindowControls } from '#components'
import WindowWrapper from '#hoc/WindowWrapper'
import { useWindowStore } from '#store'
import type { FileItem, FileSection } from '#constants/location'

const Section = ({ section }: { section: FileSection }) => (
    <section className="space-y-2">
        {section.heading && <h3 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-400">{section.heading}</h3>}
        {section.paragraphs?.map((paragraph, index) => (
            <p key={index} className="text-sm text-gray-600 leading-6">
                {paragraph}
            </p>
        ))}
        {section.bullets && (
            <ul className="list-disc pl-5 space-y-1.5">
                {section.bullets.map((bullet, index) => (
                    <li key={index} className="text-sm text-gray-600 leading-6">
                        {bullet}
                    </li>
                ))}
            </ul>
        )}
    </section>
)

const Text = () => {
    const { windows } = useWindowStore()
    const data = windows.tstfile.data as FileItem | null

    if (!data) return null

    const { name, image, subtitle, description, sections } = data

    return (
        <>
            <div id="window-header">
                <WindowControls target="tstfile" />
                <h2>{name}</h2>
            </div>

            <article className="bg-white p-5 space-y-4">
                {image && <img src={image} alt={name} className="w-full object-contain rounded-md bg-gray-100" />}
                {subtitle && <p className="text-sm font-semibold text-gray-700">{subtitle}</p>}

                {sections
                    ? sections.map((section, index) => <Section key={`${name}-section-${index}`} section={section} />)
                    : description?.map((paragraph, index) => (
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
