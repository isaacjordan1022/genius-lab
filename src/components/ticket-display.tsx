"use client";
import { useId } from "react";
import "./ticket-display.css";

/** Reusable wallet artwork. Reprinting is a visual demo; it never awards tickets. */
export default function TicketDisplay({
  balance,
  playerName,
  printing = false,
}: {
  balance: number;
  playerName: string;
  printing?: boolean;
}) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");
  return (
    <svg
      className={`ticket-display${printing ? " ticket-display--printing" : ""}`}
      viewBox="0 0 480 278"
      role="img"
      aria-label={`${playerName}: ${balance.toLocaleString("en-US")} tickets to spend`}
    >
      <defs>
        <linearGradient id={`${id}case`} x2="0" y2="1">
          <stop stopColor="#698DDD" />
          <stop offset=".5" stopColor="#385CAD" />
          <stop offset="1" stopColor="#29437C" />
        </linearGradient>
        <linearGradient id={`${id}paper`} x2=".6" y2="1">
          <stop stopColor="#FFF1B4" />
          <stop offset=".48" stopColor="#F9CD63" />
          <stop offset="1" stopColor="#ECAE3F" />
        </linearGradient>
        <linearGradient id={`${id}shine`}>
          <stop stopColor="#fff" stopOpacity="0" />
          <stop offset=".5" stopColor="#fff" stopOpacity=".65" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <clipPath id={`${id}feed`}>
          <rect x="20" y="62" width="440" height="208" />
        </clipPath>
        <clipPath id={`${id}ticket`}>
          <path d="M48 80H432V131Q416 131 416 145Q416 159 432 159V233H48V159Q64 159 64 145Q64 131 48 131Z" />
        </clipPath>
      </defs>
      <ellipse
        cx="241"
        cy="258"
        rx="196"
        ry="10"
        fill="#172C52"
        opacity=".10"
      />
      <rect x="18" y="16" width="444" height="74" rx="23" fill="#132951" />
      <rect
        x="18"
        y="8"
        width="444"
        height="74"
        rx="23"
        fill={`url(#${id}case)`}
        stroke="#172C52"
        strokeWidth="3"
      />
      <path
        d="M39 19H439"
        stroke="#AECFFF"
        strokeWidth="3"
        strokeLinecap="round"
        opacity=".75"
      />
      <g fill="#B5D3FF" stroke="#203D70" strokeWidth="2">
        <circle cx="36" cy="42" r="4" />
        <circle cx="444" cy="42" r="4" />
      </g>
      <g fill="none" stroke="#6F90CF" strokeWidth="2">
        <path d="m33 39 6 6M441 39l6 6" />
      </g>
      <text x="56" y="38" fill="#F0F6FF" className="td-brand">
        Tick’s ticket counter
      </text>
      <circle className="td-ready" cx="363" cy="33" r="4" fill="#CDFFC1" />
      <text x="374" y="37" fill="#ECF7FF" className="td-ready-label">
        Ready
      </text>
      <rect
        x="43"
        y="51"
        width="394"
        height="24"
        rx="10"
        fill="#162C51"
        stroke="#9EBBEA"
        strokeWidth="2"
      />
      <path
        d="M59 63H421"
        stroke="#0F1D35"
        strokeWidth="9"
        strokeLinecap="round"
      />
      <g clipPath={`url(#${id}feed)`}>
        <g className="td-paper">
          <path
            d="M54 84H438V135Q422 135 422 149Q422 163 438 163V239H54V163Q70 163 70 149Q70 135 54 135Z"
            fill="#9B762D"
            opacity=".28"
          />
          <path
            d="M48 70H432V131Q416 131 416 145Q416 159 432 159V233H48V159Q64 159 64 145Q64 131 48 131Z"
            fill={`url(#${id}paper)`}
            stroke="#79501B"
            strokeWidth="2.5"
          />
          <g clipPath={`url(#${id}ticket)`}>
            <g fill="none" stroke="#A76F22" opacity=".13" strokeWidth="1.2">
              {[98, 122, 146, 170, 194, 218].map((y) => (
                <path
                  key={y}
                  d={`M68 ${y} Q150 ${y - 27} 240 ${y} T412 ${y}`}
                />
              ))}
            </g>
            <rect
              x="60"
              y="81"
              width="360"
              height="139"
              rx="11"
              fill="none"
              stroke="#AA772A"
              strokeWidth="1"
            />
            <path
              d="M100 76V228M351 76V228"
              stroke="#AA772A"
              strokeWidth="1.5"
              strokeDasharray="3 5"
            />
            <path d="M65 85H405" stroke="#FFF7D4" strokeWidth="2" />
            <text x="117" y="110" className="td-eyebrow" fill="#704716">
              {playerName}
            </text>
            <text x="114" y="170" className="td-balance" fill="#553817">
              {balance.toLocaleString("en-US")}
            </text>
            <text x="117" y="193" className="td-unit" fill="#65431C">
              tickets to spend
            </text>
            <text x="117" y="213" className="td-serial" fill="#805B2B">
              GENIUS LAB
            </text>
            <g fill="none" stroke="#AA772A" strokeWidth="2" opacity=".65">
              <circle cx="79" cy="111" r="8" />
              <circle cx="79" cy="182" r="8" />
              <path d="M79 127v38" strokeDasharray="3 6" />
            </g>
            <g transform="translate(385 123)">
              <path
                d="M0-22 6-18 13-19 16-12 22-8 20 0 22 8 15 12 12 19 5 18 0 23-6 18-13 19-16 12-22 8-20 0-22-8-15-12-12-19-5-18Z"
                fill="#A16A20"
              />
              <circle
                r="16"
                fill="#FFEFAC"
                stroke="#714718"
                strokeWidth="1.5"
              />
              <path
                d="m0-10 3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1Z"
                fill="#AB7424"
              />
            </g>
            <text
              x="385"
              y="168"
              textAnchor="middle"
              className="td-stamp"
              fill="#714B1D"
            >
              You’re a
            </text>
            <text
              x="385"
              y="189"
              textAnchor="middle"
              className="td-stamp"
              fill="#714B1D"
            >
              Tzadik!
            </text>
            <g fill="#795523">
              {[0, 4, 9, 12, 18, 23, 26, 32, 37].map((x, i) => (
                <rect
                  key={x}
                  x={365 + x}
                  y="195"
                  width={i % 3 === 0 ? 3 : 1.5}
                  height={i % 2 === 0 ? 16 : 12}
                />
              ))}
            </g>
            <rect
              className="td-sheen"
              x="-130"
              y="72"
              width="95"
              height="164"
              fill={`url(#${id}shine)`}
              transform="skewX(-17)"
            />
          </g>
          <path d="M57 73H423" stroke="#403A28" strokeWidth="5" opacity=".2" />
        </g>
      </g>
      <path
        d="M54 63H426"
        stroke="#101F38"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  );
}
