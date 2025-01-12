export default function ApplicationLogo() {
    return (
        <picture>
            <source
                srcSet="/images/logo-dark.png"
                media="(prefers-color-scheme: dark)"
            />
            <img
                src="/images/logo-light.png"
                alt="WSC logo"
                height={100}
                width={100}
            />
        </picture>
    );
}
