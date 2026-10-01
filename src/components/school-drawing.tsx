export function SchoolDrawing() {
  return (
    <svg
      className="school-drawing"
      viewBox="0 0 650 560"
      role="img"
      aria-labelledby="drawing-title drawing-desc"
    >
      <title id="drawing-title">Construção sustentável na escola</title>
      <desc id="drawing-desc">
        Ilustração de uma escola com ventilação, telhado, reservatório de chuva, jardim e piso
        permeável.
      </desc>
      <defs>
        <pattern id="grid" width="28" height="28" patternUnits="userSpaceOnUse">
          <path d="M28 0H0V28" fill="none" stroke="#284d3720" strokeWidth=".7" />
        </pattern>
        <pattern id="roof" width="14" height="14" patternUnits="userSpaceOnUse">
          <path d="M0 14L14 0" stroke="#47634d" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="650" height="560" fill="url(#grid)" />
      <g strokeLinejoin="round" strokeLinecap="round">
        <path d="M70 368L295 242L576 395L354 525Z" fill="#d9ddc7" stroke="#79917a" />
        <path
          d="M168 263L347 160L501 247V394L321 497L168 410Z"
          fill="#e9e2cd"
          stroke="#284d37"
          strokeWidth="2"
        />
        <path d="M321 347L501 247V394L321 497Z" fill="#d3d5bf" stroke="#284d37" strokeWidth="2" />
        <path
          d="M148 254L331 147L522 238L337 348Z"
          fill="#52745a"
          stroke="#284d37"
          strokeWidth="2"
        />
        <path d="M148 254L331 147L522 238L337 348Z" fill="url(#roof)" />
        <path
          d="M148 254V267L337 359L522 249V238"
          fill="#274b35"
          stroke="#284d37"
          strokeWidth="2"
        />
        <path
          d="M188 305L222 324V363L188 344Z M239 332L274 351V390L239 371Z"
          fill="#90b5b5"
          stroke="#284d37"
          strokeWidth="2"
        />
        <path
          d="M357 373L394 352V395L357 416Z M412 341L449 321V363L412 385Z"
          fill="#90b5b5"
          stroke="#284d37"
          strokeWidth="2"
        />
        <path d="M279 425L307 441V483L279 467Z" fill="#47634d" stroke="#284d37" />
        <path d="M476 284V387L517 410" fill="none" stroke="#5c9299" strokeWidth="5" />
        <path
          d="M505 399V450C505 466 546 466 546 450V399"
          fill="#83aeb0"
          stroke="#284d37"
          strokeWidth="2"
        />
        <ellipse
          cx="525.5"
          cy="399"
          rx="20.5"
          ry="9"
          fill="#b7ced0"
          stroke="#284d37"
          strokeWidth="2"
        />
        <path d="M79 369L151 328L199 354L127 395Z" fill="#567a4f" stroke="#284d37" />
        <path d="M93 371L160 340M110 379L176 348" stroke="#a6b58b" strokeWidth="4" />
        <path d="M417 445L474 413L514 437L456 470Z" fill="#b3be9a" stroke="#7b8f67" />
        <path d="M427 446L472 421M443 455L487 430" stroke="#7b8f67" strokeDasharray="3 5" />
        <g stroke="#486543" strokeWidth="2">
          <path d="M116 269V334" />
          <ellipse cx="116" cy="256" rx="28" ry="36" fill="#91a579" />
          <path d="M555 331V387" />
          <ellipse cx="555" cy="315" rx="25" ry="33" fill="#739568" />
        </g>
        <g stroke="#7caab0" strokeWidth="3" fill="none">
          <path d="M110 296C150 278 163 290 186 301M127 312C160 300 174 312 201 322" />
          <path d="M179 292L187 302L174 304M194 311L202 323L188 322" />
        </g>
        <g stroke="#b29148" strokeWidth="2">
          <circle cx="465" cy="101" r="19" fill="#e5c577" />
          <path d="M465 71V61M465 131V141M435 101H425M495 101H505M443 80L435 72M487 123L495 131" />
        </g>
        <g fill="none" stroke="#48654c" strokeWidth="1" strokeDasharray="3 4">
          <path d="M212 167L172 120H57" />
          <path d="M520 412L589 455H621" />
          <path d="M119 365L74 419H31" />
          <path d="M408 337L555 190H620" />
        </g>
      </g>
      <g fill="#315039" fontFamily="Arial, sans-serif" fontSize="12" letterSpacing="1">
        <text x="44" y="108">
          01 / LUZ NATURAL
        </text>
        <text x="434" y="178">
          02 / AR EM MOVIMENTO
        </text>
        <text x="40" y="441">
          03 / SOLO PERMEÁVEL
        </text>
        <text x="464" y="480">
          04 / CUIDADO COM A ÁGUA
        </text>
      </g>
      <text
        x="35"
        y="32"
        fill="#5c725c"
        fontFamily="Arial, sans-serif"
        fontSize="10"
        letterSpacing="2"
      >
        CONSTRUÇÃO SUSTENTÁVEL
      </text>
      <path d="M35 48H615" stroke="#8b9d7a" />
      <text
        x="36"
        y="534"
        fill="#5c725c"
        fontFamily="Arial, sans-serif"
        fontSize="10"
        letterSpacing="2"
      >
        ENGENHARIA + NATUREZA + EDUCAÇÃO
      </text>
    </svg>
  );
}
