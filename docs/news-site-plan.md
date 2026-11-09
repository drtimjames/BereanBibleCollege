# Day Watch news structure

Implemented 9 November 2026.

| Address | Purpose |
|---|---|
| news/index.html | Latest headlines; #topics coverage guide; #us domestic guide |
| news/sources.html | External sources, teaching embeds, live-stream links and newsletter/books |
| news/charlemagne/strategic-development-watch.html | Regional map and updates |
| news/charlemagne/index.html | Long-form editorial entrance |
| news/charlemagne/archive.html | Dispatches and short updates |

Preserve all existing article URLs. Publish each story once; use linked summaries in indexes. Every page has consistent primary and previous-page navigation.

Legacy HTML redirects use canonical links, meta refresh, location.replace and ordinary fallback links: home.html -> index.html (legacy #live-sources -> sources.html#live-sources); analysis.html -> index.html#us; current-events.html -> index.html#topics. These are static redirects, not server HTTP 301 responses.

Preserve working resources and distinguish external publishers from our reporting. Future automation drafts must respect this layout, avoid duplicate stories and stage new content for review before publication.
