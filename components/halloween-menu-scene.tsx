export function HalloweenMenuScene() {
  return <div className="halloween-menu-decoration" aria-hidden="true">
    <svg className="menu-cobweb web-left" viewBox="0 0 180 180" fill="none"><path d="M0 0h175M0 0v175M0 0l175 175M0 0l155 65M0 0l65 155M0 35q20-2 25-10q10-5 10-25M0 75q35-4 53-22q20-18 22-53M0 115q54-5 81-34q30-28 34-81M0 160q75-8 113-47q40-38 47-113" /></svg>
    <svg className="menu-cobweb web-right" viewBox="0 0 180 180" fill="none"><path d="M0 0h175M0 0v175M0 0l175 175M0 0l155 65M0 0l65 155M0 35q20-2 25-10q10-5 10-25M0 75q35-4 53-22q20-18 22-53M0 115q54-5 81-34q30-28 34-81M0 160q75-8 113-47q40-38 47-113" /></svg>
    {["one", "two", "three"].map((name) => <svg key={name} className={`menu-bat bat-${name}`} viewBox="0 0 100 45"><path d="M50 18 44 10 42 20Q23 8 0 0q8 20 15 35 8-12 16-3 8-8 19 13 11-21 19-13 8-9 16 3 7-15 15-35-23 8-42 20l-2-10Z" /></svg>)}
  </div>;
}
