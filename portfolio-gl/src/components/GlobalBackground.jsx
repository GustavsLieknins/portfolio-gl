import "./GlobalBackground.css";

/**
 * Site-wide background: full-page grid + soft backdrops.
 * No WebGL here so nothing competes with content.
 */
export default function GlobalBackground() {
  return <div className="bg-grid" aria-hidden />;
}
