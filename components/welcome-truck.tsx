/** A quiet local backdrop: the red truck, without a second Roo or image fetch. */
export function WelcomeTruck() {
  return <svg className="roo-welcome-truck" viewBox="0 0 900 460" aria-hidden="true" focusable="false">
    <ellipse cx="454" cy="410" rx="373" ry="21" fill="#080615" opacity=".45" />
    <g stroke="#421b32" strokeWidth="7" strokeLinejoin="round" strokeLinecap="round">
      <path d="M90 122Q90 93 119 93H603Q633 93 648 121L699 211H772Q810 211 822 247L846 330V379H79V191Z" fill="#a83b42" />
      <path d="M91 157H664L646 123Q634 100 604 100H119Q95 100 91 123Z" fill="#d05a4c" />
      <path d="M118 184H562V302H118Z" fill="#f0bb72" />
      <path d="M135 198H545V285H135Z" fill="#5d3547" />
      <path d="M137 198H545V219H137Z" fill="#e5a66a" stroke="none" />
      <path d="M120 185H561V200H120Z" fill="#eed49b" />
      <path d="M113 304H569L578 321H105Z" fill="#e0b07e" />
      <path d="M605 179H642L677 239H606Z" fill="#8b8291" />
      <path d="M603 254H697V352H603Z" fill="#b94b4c" />
      <path d="M710 245H770Q785 245 792 266L804 302H711Z" fill="#bc5150" />
      <path d="M86 337H817" stroke="#e4a56a" strokeWidth="8" />
      <path d="M690 350H827V379H688Z" fill="#a8948f" />
      <path d="M720 320H790M721 334H794" stroke="#e8bd7c" strokeWidth="5" />
      <path d="M787 356H818V371H787Z" fill="#f8dd9b" strokeWidth="3" />
      <path d="M625 270H639" stroke="#f0c690" strokeWidth="6" />
      <path d="M276 361H429" stroke="#df895c" strokeWidth="4" />
      <path d="M203 94V76H287V94M481 94V76H559V94" fill="#aa8d8c" />
      <circle cx="208" cy="378" r="49" fill="#302638" /><circle cx="208" cy="378" r="25" fill="#b9a4a0" />
      <circle cx="727" cy="378" r="49" fill="#302638" /><circle cx="727" cy="378" r="25" fill="#b9a4a0" />
      <path d="M161 137Q341 182 537 136" fill="none" stroke="#6a3543" strokeWidth="4" />
      {[185,245,306,368,430,493].map((x,index) => <circle key={x} cx={x} cy={[143,153,159,159,153,143][index]} r="6" fill="#f1c67e" stroke="none" />)}
      <path d="M163 277V244Q163 231 175 231Q187 231 187 244V277M232 279V248H264V279M312 279V245H340V279M399 278V237H421V278M469 278V249H493V278" fill="#cb805b" stroke="#efbf81" strokeWidth="4" />
    </g>
  </svg>;
}
