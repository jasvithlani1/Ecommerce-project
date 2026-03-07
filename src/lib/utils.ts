// lib/utils.ts

/**
 * Cleans the WordPress HTML description by removing shortcodes, 
 * PDF posters, and iframes to keep the Next.js frontend clean.
 */
export function cleanDescription(html: string): string {
    if (!html) return "";

    return html
        // 1. Remove the PDF viewer container and all its contents
        .replace(/<div class='wp-block-pdfp-pdf-poster'[\s\S]*?<\/div>/g, '')
        // 2. Remove any leftover Google Doc viewer iframes
        .replace(/<iframe[\s\S]*?<\/iframe>/g, '')
        // 3. Remove any double line breaks left behind
        .replace(/\n\s*\n/g, '\n')
        .trim();
}

/**
 * Formats the price string if needed, or provides a fallback
 */
export function formatPrice(price: string | null): string {
    if (!price || price === "") return "Price on Request";
    return price;
}