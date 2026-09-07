import type { Messages } from "./i18n";

export const TIP_LINKS = [
  { amount: 1, url: "https://buy.stripe.com/7sY4gB79d4xO1qee9u9AA00" },
  { amount: 2, url: "https://buy.stripe.com/fZu6oJ1OT3tK1qe0iE9AA01" },
  { amount: 3, url: "https://buy.stripe.com/fZuaEZgJN0hyfh43uQ9AA02" },
  { amount: 5, url: "https://buy.stripe.com/7sY5kFbpte8ogl8e9u9AA03" },
  { amount: 10, url: "https://buy.stripe.com/6oU9AVgJN9S80ma0iE9AA04" },
] as const;

export function TipLinks({ messages }: { messages: Messages }) {
  return (
    <div className="tip-links" aria-label={messages.tipChoose}>
      {TIP_LINKS.map(({ amount, url }) => (
        <a
          key={amount}
          className="tip-link"
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${messages.tipChoose}: $${amount}`}
        >
          <span aria-hidden="true">$</span>{amount}
        </a>
      ))}
    </div>
  );
}

export default function TipSupport({ messages }: { messages: Messages }) {
  return (
    <section className="tip-support" aria-labelledby="tip-support-title">
      <div className="tip-support-copy">
        <span className="section-kicker">{messages.tipKicker}</span>
        <h2 id="tip-support-title">{messages.tipTitle}</h2>
        <p>{messages.tipDescription}</p>
      </div>
      <TipLinks messages={messages} />
    </section>
  );
}
