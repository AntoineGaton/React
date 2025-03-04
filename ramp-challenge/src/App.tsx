import { useEffect, useState } from "react";

const App = () => {
  // State to store the hidden URL found in the challenge page
  const [hiddenUrl, setHiddenUrl] = useState("");
  // State to store the flag (secret word) retrieved from the hidden URL
  const [flag, setFlag] = useState("");
  // State to track how many characters of the flag to display (for typewriter effect)
  const [displayIndex, setDisplayIndex] = useState(0);
  // State to track loading status
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Function to find the hidden URL by parsing the challenge page
    const findHiddenUrl = async () => {
      try {
        // Step 1: Fetch the HTML content from the challenge page
        const url =
          "https://tns4lpgmziiypnxxzel5ss5nyu0nftol.lambda-url.us-east-1.on.aws/challenge";
        const response = await fetch(url);
        const htmlContent = await response.text();

        // Step 2: Create a DOM parser to analyze the HTML structure
        // This allows us to use DOM methods like querySelector on the fetched HTML
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlContent, "text/html");

        // Step 3: Initialize an empty array to store valid characters
        // Explicitly typed as string[] to avoid TypeScript errors
        const validCharacters: string[] = [];

        // Step 4: Find all <b> tags with class 'ref' as per the challenge instructions
        const bTags = doc.querySelectorAll("b.ref");

        // Step 5: Iterate over each <b> tag to check if it matches the required pattern
        bTags.forEach((bTag) => {
          // Check parent <div> with 'data-tag' attribute containing '78'
          // Using closest() to find the nearest ancestor matching the selector
          const divTag = bTag.closest('div[data-tag*="78"]');
          if (divTag) {
            // Check parent <article> with 'data-class' attribute ending with '45'
            const articleTag = divTag.closest('article[data-class$="45"]');
            if (articleTag) {
              // Check parent <section> with 'data-id' attribute starting with '92'
              const sectionTag = articleTag.closest('section[data-id^="92"]');
              if (sectionTag) {
                // If all patterns match, extract the 'value' attribute from the <b> tag
                const validCharacter = bTag.getAttribute("value");
                if (validCharacter) {
                  validCharacters.push(validCharacter);
                }
              }
            }
          }
        });

        // Step 6: Join all valid characters to form the hidden URL
        // Update state with the found URL
        setHiddenUrl(validCharacters.join(""));
      } catch (error) {
        console.error("Error finding hidden URL:", error);
        return null;
      }
    };

    // Execute the findHiddenUrl function
    findHiddenUrl();

    // Function to fetch the flag from the hidden URL
    const fetchFlag = async () => {
      try {
        console.log("Hidden URL:", hiddenUrl);
        // Only attempt to fetch if we have a URL
        const response = await fetch(hiddenUrl);
        const text = await response.text();
        const trimmedFlag = text.trim();
        console.log("Fetched flag:", trimmedFlag);
        setFlag(trimmedFlag);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching flag:", error);
        setLoading(false);
      }
    };

    // Only fetch the flag if hiddenUrl is not empty
    if (hiddenUrl) {
      fetchFlag();
    }
  }, [hiddenUrl]); // Re-run this effect when hiddenUrl changes

  // Effect for creating the typewriter animation
  useEffect(() => {
    if (!loading && flag) {
      // Set up an interval to add one character at a time
      const interval = setInterval(() => {
        setDisplayIndex((prev) => {
          if (prev < flag.length) {
            // If we haven't displayed all characters yet, show one more
            return prev + 1;
          }
          // If we've displayed all characters, clear the interval
          clearInterval(interval);
          return prev;
        });
      }, 500); // Half-second delay between characters as required

      // Clean up the interval when component unmounts or dependencies change
      return () => clearInterval(interval);
    }
  }, [flag, loading]); // Re-run when flag or loading state changes

  // Create the displayed characters array from the flag and current display index
  // This creates an array of characters to be displayed in the list
  const displayedChars = flag.slice(0, displayIndex).split("");

  return (
    <div>
      {loading ? (
        // Show loading message while fetching data
        <p>Loading...</p>
      ) : (
        // Display each character as a list item
        <ul>
          {displayedChars.map((char, index) => (
            <li key={index}>{char}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;
