# Ramp Challenge Solution

## Project Overview

This project is a solution to the Ramp CTF (Capture The Flag) challenge, which involves finding a hidden URL and displaying a secret word with specific animation requirements.

## Challenge Requirements

1. Find a hidden URL by parsing specific DOM patterns in an HTML page
2. Fetch a secret word (flag) from the discovered URL
3. Display the flag with a typewriter effect:
   - Show characters one by one with 0.5s delay
   - Display as list items
   - Use only React APIs (no CSS animations)
   - Animation should run once

## Technical Implementation

### URL Discovery

- Used `fetch` to get the challenge HTML
- Implemented DOM parsing using `DOMParser`
- Located elements matching the pattern:

```html
<section data-id="92*">
  <article data-class="*45">
    <div data-tag="*78*">
      <b class="ref" value="VALID_CHARACTER"></b>
    </div>
  </article>
</section>
```

- Extracted and joined characters to form the hidden URL

### Flag Display

- Built using React + TypeScript + Vite
- Used React hooks:
  - `useState` for managing state
  - `useEffect` for side effects (fetching and animation)
- Implemented typewriter effect using:
  - `setInterval` for timing
  - Array slicing for progressive display
  - List rendering for character display

## Technologies Used

- React 18
- TypeScript
- Vite
- DOM Parser API
- Fetch API

## Running the Project

1. Clone the repository
2. Install dependencies: `npm install`
3. Run development server: `npm run dev`
4. Open browser at indicated URL

### Antoine's Thoughts

This challenge stands out as one of the most coolest technical assessments I've encountered in a job application. While it required a meaningful time investment, the experience was both enjoyable and educational. The challenge strikes an excellent balance between traditional algorithmic interviews and full-scale project assignments.

Unlike conventional technical interviews that often focus on abstract algorithm problems or demand extensive project work, this challenge offered practical, focused problem-solving within a reasonable scope. It tested relevant skills while remaining manageable and engaging. The format allowed me to demonstrate my capabilities without the pressure of traditional whiteboard interviews or the extensive time commitment of building a complete application.

What I particularly appreciated was the opportunity to learn and implement new concepts while working on a concrete, well-defined problem. Even if not selected for the position, I consider this a valuable learning experience that enhanced my technical skills and understanding of React applications.
