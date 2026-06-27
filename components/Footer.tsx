export default function Footer() {
  return (
    <footer className="border-t border-bone/10 bg-ink-900">
      <div className="container-narrow py-16">
        <div className="flex flex-col items-start justify-between gap-10 sm:flex-row">
          <div>
            <a href="/" className="display text-3xl">
              GOON<span className="text-flame">.</span>
            </a>
            <p className="mt-3 max-w-xs text-sm text-bone/50">
              A private queer salon. West Hollywood / Beverly Heights. By
              application, by invitation.
            </p>
          </div>

          <nav className="grid grid-cols-2 gap-x-12 gap-y-3 text-sm text-bone/70 sm:grid-cols-3">
            <a href="#manifesto" className="transition-colors hover:text-acid">Manifesto</a>
            <a href="#venue" className="transition-colors hover:text-acid">Venue</a>
            <a href="#interest" className="transition-colors hover:text-acid">Membership</a>
            <a href="#gallery" className="transition-colors hover:text-acid">The Feed</a>
            <a href="#faq" className="transition-colors hover:text-acid">FAQ</a>
            <a href="/signin" className="transition-colors hover:text-acid">Sign in</a>
          </nav>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-bone/10 pt-8 text-xs text-bone/40 sm:flex-row sm:items-center">
          <p>&copy; {new Date().getFullYear()} Goon Society. All rights reserved.</p>
          <p>Coming soon. Nothing on this page is an offer of membership.</p>
        </div>
      </div>
    </footer>
  );
}
