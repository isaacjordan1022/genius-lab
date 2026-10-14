"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { Check, Gift, Search, Sparkles, Ticket, X } from "lucide-react";
import type { AppState } from "@/lib/store";
import { LearningAvatar } from "./avatar-lab";
import TicketDisplay from "./ticket-display";
import "./prize-room.css";

type Prize = AppState["prizes"][number];
type Checkout = { prize: Prize; key: string };
const number = (value: number) => value.toLocaleString("en-US");
export default function PrizeRoom({
  state,
  busy,
  error,
  onOrder,
}: {
  state: AppState;
  busy: boolean;
  error?: string;
  onOrder: (prize: Prize, key: string) => Promise<boolean>;
}) {
  const [category, setCategory] = useState("All prizes"),
    [query, setQuery] = useState(""),
    [affordable, setAffordable] = useState(false),
    [history, setHistory] = useState(false);
  const [checkout, setCheckout] = useState<Checkout | null>(null),
    [celebration, setCelebration] = useState("");
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (checkout && dialog.current) {
      const current = dialog.current;
      current.showModal();
      return () => current.close();
    }
  }, [checkout]);
  const physical = state.prizes.filter((p) => p.kind === "physical"),
    experiences = state.prizes.filter((p) => p.kind === "experience");
  const categories = useMemo(
    () => [
      "All prizes",
      ...new Set(
        state.prizes
          .filter((p) => p.kind === "physical")
          .map((p) => p.category),
      ),
    ],
    [state.prizes],
  );
  const visible = physical.filter(
    (p) =>
      (category === "All prizes" || p.category === category) &&
      (!affordable || p.cost <= state.balance) &&
      (!query.trim() ||
        [p.title, p.category, ...p.interests]
          .join(" ")
          .toLowerCase()
          .includes(query.toLowerCase().trim())),
  );
  function choose(prize: Prize) {
    setCheckout({ prize, key: crypto.randomUUID() });
    setCelebration("");
  }
  return (
    <section className="prize-room" aria-labelledby="prize-room-title">
      <header className="pr-hero">
        <div className="pr-hero-copy">
          <p className="pr-kicker">
            <Sparkles size={22} aria-hidden="true" /> You earned the
            possibilities
          </p>
          <h1 id="prize-room-title">
            The Prize Room<span>Big wishes start here.</span>
          </h1>
          <p>
            A little treat, an amazing adventure, or the thing you’ve been
            dreaming about. What will you save for?
          </p>
        </div>
        <div className="pr-hero-wallet">
          <LearningAvatar
            size={160}
            mood={celebration ? "celebrate" : "idle"}
          />
          <TicketDisplay balance={state.balance} playerName={state.profile.name} />
        </div>
      </header>
      <div className="pr-wallet-rail">
        <div aria-label={`${number(state.balance)} tickets available`}>
          <Ticket size={23} aria-hidden="true" />
          <strong>{number(state.balance)}</strong>
          <span>tickets to spend</span>
        </div>
        <div className="pr-view-tabs" role="group" aria-label="Prize Room view">
          <button
            type="button"
            aria-pressed={!history}
            onClick={() => setHistory(false)}
          >
            Explore prizes
          </button>
          <button
            type="button"
            aria-pressed={history}
            onClick={() => setHistory(true)}
          >
            My prizes
            {state.orders.length > 0 ? ` (${state.orders.length})` : ""}
          </button>
        </div>
      </div>
      {celebration && (
        <div className="pr-success" role="status">
          <Check size={24} aria-hidden="true" />
          <div>
            <strong>It’s on your prize list!</strong>
            <p>{celebration} is confirmed. Your parent can see your order.</p>
          </div>
          <button
            aria-label="Dismiss prize confirmation"
            onClick={() => setCelebration("")}
          >
            <X size={22} />
          </button>
        </div>
      )}
      {history ? (
        <section className="pr-history">
          <h2>Your wall of wins</h2>
          <p>The prizes you chose with your own hard-earned tickets.</p>
          {state.orders.length ? (
            <div className="pr-history-list">
              {state.orders
                .slice()
                .reverse()
                .map((order) => (
                  <article key={order.id}>
                    <span className="pr-history-gift">
                      <Gift size={32} aria-hidden="true" />
                    </span>
                    <div>
                      <h3>{order.title}</h3>
                      <p>
                        {new Date(order.at).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}{" "}
                        · {number(order.cost)} tickets
                      </p>
                    </div>
                    <span className="pr-confirmed">
                      <Check size={20} aria-hidden="true" /> Confirmed
                    </span>
                  </article>
                ))}
            </div>
          ) : (
            <div className="pr-empty">
              <Gift size={45} aria-hidden="true" />
              <h3>Your first prize is waiting out there.</h3>
              <p>
                Keep learning, collect tickets, and choose something you love.
              </p>
              <button onClick={() => setHistory(false)}>
                Explore the Prize Room
              </button>
            </div>
          )}
        </section>
      ) : (
        <>
          <section className="pr-experiences" aria-labelledby="golden-title">
            <div className="pr-section-heading">
              <div>
                <p className="pr-kicker">The best kind of together</p>
                <h2 id="golden-title">Golden-ticket adventures</h2>
              </div>
              <p>Some prizes don’t come in a box.</p>
            </div>
            <div className="pr-experience-grid">
              {experiences.map((prize) => (
                <article className="pr-experience-card" key={prize.id}>
                  <GoldenTicket kind={prize.experience} />
                  <div className="pr-experience-copy">
                    <h3>{prize.title}</h3>
                    <p>{prize.description}</p>
                    <PrizeSavings
                      prize={prize}
                      balance={state.balance}
                      choose={() => choose(prize)}
                    />
                  </div>
                </article>
              ))}
            </div>
          </section>
          <section
            className="pr-collection"
            aria-labelledby="pr-collection-title"
          >
            <div className="pr-section-heading">
              <div>
                <p className="pr-kicker">Find your next favorite</p>
                <h2 id="pr-collection-title">A whole room of possibility.</h2>
              </div>
              <p>{physical.length} real prizes to explore</p>
            </div>
            <div className="pr-filters">
              <label className="pr-search">
                <Search size={23} aria-hidden="true" />
                <span className="pr-sr-only">Search prizes</span>
                <input
                  type="search"
                  placeholder="What do you love?"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </label>
              <label className="pr-affordable">
                <input
                  type="checkbox"
                  checked={affordable}
                  onChange={(e) => setAffordable(e.target.checked)}
                />{" "}
                Ready with my tickets
              </label>
            </div>
            <div
              className="pr-category-chips"
              role="group"
              aria-label="Prize categories"
            >
              {categories.map((name) => (
                <button
                  key={name}
                  aria-pressed={category === name}
                  onClick={() => setCategory(name)}
                >
                  {name}
                </button>
              ))}
            </div>
            <p className="pr-result-count" aria-live="polite">
              {visible.length} {visible.length === 1 ? "prize" : "prizes"} to
              explore
            </p>
            {visible.length ? (
              <div className="pr-product-grid">
                {visible.map((prize, index) => (
                  <article
                    className={`pr-product-card pr-product-card--${index % 4}`}
                    key={prize.id}
                  >
                    <div className="pr-product-frame">
                      <span className="pr-corner pr-corner--one" />
                      <span className="pr-corner pr-corner--two" />
                      <ProductArt prize={prize} />
                      {state.balance >= prize.cost && (
                        <span className="pr-ready">
                          <Check size={20} aria-hidden="true" /> Ready!
                        </span>
                      )}
                    </div>
                    <div className="pr-product-copy">
                      <p className="pr-category-label">{prize.category}</p>
                      <h3>{prize.title}</h3>
                      <PrizeSavings
                        prize={prize}
                        balance={state.balance}
                        choose={() => choose(prize)}
                      />
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="pr-empty">
                <h3>
                  {affordable
                    ? "Your next prize is getting closer."
                    : "Let’s try another category."}
                </h3>
                <p>
                  {affordable
                    ? "Turn off the ticket filter to find something worth saving for."
                    : "Try a different word or category."}
                </p>
                <button
                  onClick={() => {
                    setAffordable(false);
                    setQuery("");
                    setCategory("All prizes");
                  }}
                >
                  Show every prize
                </button>
              </div>
            )}
          </section>
        </>
      )}
      {checkout && (
        <dialog
          className="pr-checkout"
          ref={dialog}
          aria-labelledby="pr-checkout-title"
          onCancel={(event) => {
            if (busy) event.preventDefault();
            else setCheckout(null);
          }}
          onClick={(event) => {
            if (event.target === event.currentTarget && !busy)
              setCheckout(null);
          }}
        >
          <div className="pr-checkout-heading">
            <Gift size={30} aria-hidden="true" />
            <h2 id="pr-checkout-title">Make it yours?</h2>
          </div>
          <h3>{checkout.prize.title}</h3>
          <p>
            Use <strong>{number(checkout.prize.cost)} tickets</strong> for this
            prize.
          </p>
          <div className="pr-checkout-balance">
            <span>You’ll have left</span>
            <strong>
              {number(Math.max(0, state.balance - checkout.prize.cost))} tickets
            </strong>
          </div>
          <p>
            Your parent will arrange your prize. Once you confirm, the tickets
            are spent and this prize joins your history.
          </p>
          {error && (
            <p className="pr-order-error" role="alert">
              {error}
            </p>
          )}
          <div className="pr-checkout-actions">
            <button disabled={busy} onClick={() => setCheckout(null)}>
              Keep saving
            </button>
            <button
              className="pr-primary"
              disabled={busy || state.balance < checkout.prize.cost}
              onClick={async () => {
                if (await onOrder(checkout.prize, checkout.key)) {
                  setCelebration(checkout.prize.title);
                  setCheckout(null);
                }
              }}
            >
              {busy ? "Saving your order…" : "Confirm my prize"}
            </button>
          </div>
        </dialog>
      )}
    </section>
  );
}
function PrizeSavings({
  prize,
  balance,
  choose,
}: {
  prize: Prize;
  balance: number;
  choose: () => void;
}) {
  const remaining = Math.max(0, prize.cost - balance),
    percent = Math.min(100, (balance / prize.cost) * 100);
  return (
    <div className="pr-savings">
      <p className="pr-cost">
        <Ticket size={24} aria-hidden="true" />
        <strong>{number(prize.cost)}</strong> tickets
      </p>
      <div
        className="pr-progress"
        role="progressbar"
        aria-label={`Tickets saved toward ${prize.title}`}
        aria-valuemin={0}
        aria-valuemax={prize.cost}
        aria-valuenow={Math.min(balance, prize.cost)}
      >
        <span style={{ width: `${percent}%` }} />
      </div>
      <p className="pr-remaining">
        {remaining
          ? `${number(remaining)} more tickets to go`
          : "You have enough tickets!"}
      </p>
      <button className="pr-choose" disabled={remaining > 0} onClick={choose}>
        {remaining ? "Keep learning & saving" : "Choose this prize"}
      </button>
    </div>
  );
}
function ProductArt({ prize }: { prize: Prize }) {
  const [failed, setFailed] = useState(false);
  return prize.productImage && !failed ? (
    <img
      src={prize.productImage}
      alt={prize.title}
      width="600"
      height="480"
      loading="lazy"
      onError={() => setFailed(true)}
    />
  ) : (
    <div
      className="pr-art-placeholder"
      aria-label={`${prize.title}; product photo coming soon`}
    >
      <Gift size={80} strokeWidth={1.5} aria-hidden="true" />
      <span>Picture coming soon</span>
    </div>
  );
}
function GoldenTicket({ kind }: { kind?: Prize["experience"] }) {
  return (
    <svg
      className="pr-golden-art"
      viewBox="0 0 500 250"
      role="img"
      aria-label={
        kind === "dinner"
          ? "Golden dinner ticket"
          : kind === "adventure"
            ? "Golden adventure ticket"
            : "Golden time-together ticket"
      }
    >
      <defs>
        <linearGradient id={`gold-${kind}`} x2=".8" y2="1">
          <stop stopColor="#FFF6CD" />
          <stop offset=".35" stopColor="#F3C95D" />
          <stop offset=".6" stopColor="#FFF1B0" />
          <stop offset="1" stopColor="#D99A2C" />
        </linearGradient>
        <linearGradient id={`foil-${kind}`}>
          <stop stopColor="#FFFDF0" stopOpacity="0" />
          <stop offset=".5" stopColor="#FFFDF0" stopOpacity=".7" />
          <stop offset="1" stopColor="#FFFDF0" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M28 36H472V83Q450 83 450 105Q450 127 472 127V214H28V127Q50 127 50 105Q50 83 28 83Z"
        fill="#93631E"
        transform="translate(0 8)"
      />
      <path
        d="M28 28H472V83Q450 83 450 105Q450 127 472 127V206H28V127Q50 127 50 105Q50 83 28 83Z"
        fill={`url(#gold-${kind})`}
        stroke="#8A5C1D"
        strokeWidth="3"
      />
      <path
        d="M45 43H455V73Q433 83 433 105Q433 130 455 138V189H45V138Q67 130 67 105Q67 83 45 73Z"
        fill="none"
        stroke="#A57324"
        strokeWidth="1.8"
      />
      <path
        d="M360 34V199M375 37V197"
        stroke="#9C722F"
        strokeWidth="2"
        strokeDasharray="4 7"
      />
      <path d="M76 51H331M76 182H331" stroke="#FFF8D9" strokeWidth="3" />
      <g
        transform="translate(206 116)"
        fill="none"
        stroke="#845719"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {kind === "dinner" ? (
          <>
            <circle r="47" />
            <circle r="34" strokeWidth="2.5" />
            <path d="M-68-40V40M-80-40V-15Q-68-4-56-15V-40M-68-40V-13M67 40V-40Q47-28 53 2H67" />
          </>
        ) : kind === "adventure" ? (
          <>
            <path d="M-69 36-28-36 1 9 27-20 70 36Z" />
            <path d="M-41-14-28-8-15-14M15-1 27 3 37-2" strokeWidth="3" />
            <circle cx="42" cy="-43" r="13" fill="#FFF7D4" strokeWidth="3" />
            <path d="M-4 36Q-21 22-3 7" strokeWidth="3" />
          </>
        ) : (
          <>
            <path
              d="M0 37C-15 24-57-1-47-27Q-34-58 0-25Q34-58 47-27Q57-1 0 37Z"
              fill="#F8D777"
            />
            <path d="M-70 41Q-42 17-20 40M70 41Q42 17 20 40" />
            <circle cx="-61" cy="13" r="13" fill="#FFF0B1" />
            <circle cx="61" cy="13" r="13" fill="#FFF0B1" />
          </>
        )}
      </g>
      <g transform="translate(416 101)">
        <path
          d="M0-30 8-24 19-25 23-14 31-7 27 4 30 15 18 20 12 30 0 26-12 30-18 20-30 15-27 4-31-7-23-14-19-25-8-24Z"
          fill="#AB7624"
        />
        <circle r="22" fill="#FFECA4" stroke="#80531B" strokeWidth="2" />
        <path
          d="M0-15 5-5 16-3 8 5 10 16 0 11-10 16-8 5-16-3-5-5Z"
          fill="#BB852E"
        />
      </g>
      <g stroke="#90601E" strokeWidth="3">
        {[0, 7, 12, 22, 28, 35, 41].map((x, i) => (
          <path
            key={x}
            d={`M${392 + x} 151V${i % 2 ? 176 : 181}`}
            strokeWidth={i % 3 ? 2 : 4}
          />
        ))}
      </g>
      <path
        d="M56 28H118L242 206H180Z"
        fill={`url(#foil-${kind})`}
        opacity=".45"
      />
    </svg>
  );
}
