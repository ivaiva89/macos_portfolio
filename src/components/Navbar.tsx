import dayjs from 'dayjs'

import { navIcons, navLinks, type WindowKey } from '#constants'
import { useRouterStore, useWindowStore } from '#store'
import { BLOG_INDEX_PATH } from '#lib/routes'

const Navbar = () => {
    const { openWindow } = useWindowStore()
    const { navigate } = useRouterStore()

    const handleOpen = (type: WindowKey) => {
        if (type === 'safari') {
            navigate(BLOG_INDEX_PATH)
        }

        openWindow(type)
    }

    return (
        <nav>
            <div>
                <img src="/images/logo.svg" alt="logo" />
                <p className="font-bold">Iva's Portfolio</p>
                <ul>
                    {navLinks.map(({ id, name, type }) => (
                        <li key={id} onClick={() => handleOpen(type as WindowKey)}>
                            <p>{name}</p>
                        </li>
                    ))}
                </ul>
            </div>

            <div>
                <ul>
                    {navIcons.map(({ id, img }) => (
                        <li key={id}>
                            <img src={img} className="icon-hover" alt={`icon-${id}`} />
                        </li>
                    ))}
                </ul>
                <time>{dayjs().format('ddd MMM D h:mm A')}</time>
            </div>
        </nav>
    )
}
export default Navbar
