import { GrUserAdmin } from "react-icons/gr";
import { MdSupervisorAccount } from "react-icons/md";
import { TbLicense } from "react-icons/tb";
export const services = [
  {
    icon: <TbLicense />,
    title: "Licensing",
    shortDescription: `Unleash your music's potential with our expert licensing services. We connect your art with the world of film, TV, and advertising, helping you reach a broader audience and secure new opportunities.`,
    description: `Unlock new horizons for your music with our comprehensive music licensing services. Whether you're a budding artist or an established musician, we have the expertise and connections to get your work featured in film, television, commercials, and more. Our dedicated team will guide you through the intricate world of licensing, securing opportunities that align perfectly with your artistic vision.`,
  },
  {
    icon: <GrUserAdmin className="invert-0 dark:invert" />,
    title: "Administration",
    shortDescription: `Leave the administrative burdens to us. We handle copyright registration, royalty collection, and negotiations, so you can focus on making music while we protect your rights and ensure you get paid.    `,
    description: `Navigating the administrative aspects of the music industry can be daunting. That's where Crib Music Global comes in. We offer meticulous and efficient administration services, handling tasks such as copyright registration, royalty collection, and contractual negotiations. Let us take care of the paperwork while you focus on creating remarkable music.      `,
  },
  {
    icon: <MdSupervisorAccount />,
    title: "Supervision",
    shortDescription: ` Our supervision team synchronizes your music with visuals, making your work a compelling and unforgettable part of films, ads, and content, enhancing their emotional resonance and engagement.`,
    description: `Enhance the impact of your music in the visual and digital realms with our supervision services. Our team is skilled in synchronizing music with visuals to create captivating and memorable experiences. We work closely with filmmakers, advertising agencies, and content creators to ensure that your music complements their projects perfectly, amplifying the emotional resonance and engagement of their content.`,
  },
];
