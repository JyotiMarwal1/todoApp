const longestUniqueSubstring = (s) => {
    let n = s.length;
    let longest = 0;
    let start = 0;
    let longestSubstring = '';
    let seenChars = new Set();

    for (let end = 0; end < n; end++) {
        const currentChar = s[end];

        // If the character is already in the set, remove characters from the start
        // until the current character can be added to the set.
        while (seenChars.has(currentChar)) {
            seenChars.delete(s[start]);
            start++;
        }

        // Add the current character to the set.
        seenChars.add(currentChar);

        // Update the longest length and substring.
        if (end - start + 1 > longest) {
            longest = end - start + 1;
            longestSubstring = s.slice(start, end + 1);
        }
    }

    return longestSubstring;
};

// Example usage:
const inputString = "abcabcbb ";
console.log(longestUniqueSubstring(inputString)); // Output: "abc"