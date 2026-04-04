import WindowWrapper from '#hoc/WindowWrapper'
import { WindowControls } from '#components'

const galleryImages = [
    { src: '/images/skiper.png', alt: 'Skiper project preview' },
    { src: '/images/iva.png', alt: 'Portrait of Iva' },
    { src: '/images/wallpaper.png', alt: 'Desktop wallpaper preview' },
    { src: '/macbook.png', alt: 'MacBook portfolio frame' },
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
