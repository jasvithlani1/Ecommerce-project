// lib/utils.ts
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}


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
 * Formats a number or numeric string as Indian Rupee (INR)
 */
export function formatINR(amount: number | string): string {
    const numericAmount = parsePrice(amount);

    if (isNaN(numericAmount)) return "₹0.00";

    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(numericAmount);
}

/**
 * Extracts a number from a currency string (e.g., "$1,250.00" -> 1250, "1.905,00" -> 1905)
 * Handles both dot and comma as decimal separators.
 * NOTE: If the input is a pure integer string like "190500", it returns 190500.
 * The calling code should handle minor-unit to major-unit conversion if necessary.
 */
export function parsePrice(price: string | number): number {
    if (price === undefined || price === null || price === "") return 0;
    if (typeof price === 'number') return price;

    const str = price.toString().trim();

    // Identify all possible separators
    const lastDot = str.lastIndexOf('.');
    const lastComma = str.lastIndexOf(',');
    const lastIdx = Math.max(lastDot, lastComma);

    if (lastIdx === -1) {
        // Pure numeric string
        return parseFloat(str.replace(/[^0-9-]/g, "")) || 0;
    }

    const partAfter = str.substring(lastIdx + 1);

    // If the part after the last separator is exactly 2 digits, it's a decimal
    if (partAfter.length === 2 && /^\d+$/.test(partAfter)) {
        const before = str.substring(0, lastIdx).replace(/[^0-9-]/g, "");
        return parseFloat(before + "." + partAfter);
    }

    // If it's a pure integer (no decimal point or comma was found),
    // we assume it is in minor units (like WooCommerce REST API passing 190500 for 1905.00 INR).
    // Let's divide it by 100.
    const parsed = parseFloat(str.replace(/[^0-9-]/g, "")) || 0;
    
    // If the original string didn't have any decimal separator, and it's substantial, 
    // it's highly likely to be minor units coming from Cocart.
    if (lastIdx === -1 && partAfter.length !== 2) {
        return parsed / 100;
    }

    return parsed;
}

/**
 * Formats the price string if needed, or provides a fallback
 */
export function formatPrice(price: string | null): string {
    if (!price || price === "") return "Price on Request";
    // If it looks like a number, format it as INR
    if (/^\d+(\.\d+)?$/.test(price.trim())) {
        return formatINR(price);
    }
    return price;
}