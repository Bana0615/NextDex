export function getSentenceSeperator(index: number, numTypes: number): string | null {
    let separator: string | null = null;
    if (numTypes === 1) {
        // No separator needed if there's only one type
        separator = null;
    } else if (index < numTypes - 2) {
        // Comma for items before the second-to-last
        separator = ", ";
    } else if (index === numTypes - 2) {
        // " and " after the second-to-last item (before the last)
        separator = " and ";
    }

    return separator;
}