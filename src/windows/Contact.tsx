import WindowWrapper from '#hoc/WindowWrapper'
import { socials } from '#constants/socials'
import { WindowControls } from '#components'
import { profile } from '#constants/profile'

const Contact = () => {
    return (
        <>
            <div id="window-header">
                <WindowControls target="contact" />
                <h2>Contact Me</h2>
            </div>

            <div className="contact-content">
                <img src="/images/iva.png" alt={profile.fullName} className="w-24 h-24 object-cover rounded-full" />

                <h3>{profile.fullName}</h3>
                <p>{profile.role} based in {profile.location}.</p>
                <p>{profile.headline}</p>
                <p>{profile.contact.email}</p>
                <ul className="socials">
                    {socials.map(({ id, bg, link, icon, text }) => (
                        <li key={id} className="social-card" style={{ background: bg }}>
                            <a href={link} target="_blank" rel="noopener noreferrer" title={text} className="social-link">
                                <img src={icon} alt={text} className="size-5" />
                                <p>{text}</p>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}

const ContactWindow = WindowWrapper(Contact, 'contact')

export default ContactWindow
