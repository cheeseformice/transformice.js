/**
 * Joins 2 separate bytes of a packet code (c, cc) into a 16-bit short integer.
 */
export const Identifier = (c: number, cc: number): number => {
    return (c << 8) | cc;
};

/**
 * Splits a 16-bit short integer into 2 separate bytes of a packet code (c, cc).
 */
export const IdentifierSplit = (identifier: number): [number, number] => {
    var c = identifier >> 8,
        cc = identifier & 0xFF;
    return [c, cc];
};
