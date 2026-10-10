import { MARQUEE_BRANDS } from '../data/siteData'

const CDN_LOGOS_URL = 'https://cdn.jsdelivr.net/gh/avdeshjadon/svgfetch-icons@main/logos'

export default function LogoMarquee({ onSelectBrand }) {
  const items = [...MARQUEE_BRANDS, ...MARQUEE_BRANDS]

  return (
    <div className="marquee" aria-label="Official SVGs available via svgfetch">
      <div className="marquee-track">
        {items.map((item, i) => {
          const key = `${item.name}-${i}`
          return (
            <span
              className="marquee-item"
              key={key}
              title={`Fetch ${item.name} vector`}
              onClick={() => onSelectBrand && onSelectBrand(item.name)}
            >
              <img
                src={`${CDN_LOGOS_URL}/${item.file.split("/").map(encodeURIComponent).join("/")}`}
                alt={item.name}
                className="marquee-logo"
                loading="lazy"
                decoding="async"
              />
              <span className="marquee-label">{item.name}</span>
            </span>
          )
        })}
      </div>
    </div>
  )
}
