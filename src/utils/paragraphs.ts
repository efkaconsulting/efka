/**
 * Join several paragraphs into inline HTML.
 *
 * The AstroWind widgets render a single `description` through `set:html`
 * inside one `<p>`, so a nested `<p>` would be invalid there. Spans carry the
 * block spacing instead, which keeps the markup valid and the spacing in CSS.
 */
export const paragraphsToHtml = (paragraphs: readonly string[]): string =>
  paragraphs.map((text) => `<span class="mt-3 block first:mt-0">${text}</span>`).join('');
