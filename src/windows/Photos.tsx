import WindowWrapper from '#hoc/WindowWrapper'
import { WindowControls } from '#components'

const galleryImages = [
    { src: '/images/products/skiper.jpg', alt: 'Skiper reservation platform' },
    { src: '/images/products/devapply.jpg', alt: 'DevApply job application tracker' },
    { src: '/images/products/stackform.jpg', alt: 'StackForm open-source form library' },
    { src: '/images/og-default.jpg', alt: 'ivakobalava.dev' },
]

const Photos = () => {
    return (
        <>
            <div id="window-header">
                <WindowControls target="photos" />
                <h2>Gallery</h2>
            </div>

            <div className="bg-white flex h-full">
                <aside className="sidebar">
                    <h2>Library</h2>
                    <ul>
                        <li>
                            <img src="/images/photos.png" alt="All photos" />
                            <p>All Photos</p>
                        </li>
                    </ul>
                </aside>

                <div className="gallery">
                    <ul>
                        {galleryImages.map(({ src, alt }) => (
                            <li key={src}>
                                <img src={src} alt={alt} loading="lazy" />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    )
}

const PhotosWindow = WindowWrapper(Photos, 'photos')

export default PhotosWindow
