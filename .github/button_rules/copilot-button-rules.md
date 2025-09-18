# Button Styling Rules for Polly App

This document outlines the standard rules and conventions for styling buttons across the Polly App, ensuring consistency, accessibility, and maintainability. These rules apply to all button components, including `app/components/ui/button.tsx` and any custom buttons.

---

## 1. Core Principles

*   **Consistency**: All buttons should adhere to a consistent visual language.
*   **Accessibility**: Buttons must be fully accessible to keyboard users and screen readers.
*   **Responsiveness**: Buttons should adapt gracefully to different screen sizes.
*   **Semantic HTML**: Use appropriate HTML elements (`<button>`, `<a>`) for their intended purpose.

---

## 2. Styling with Tailwind CSS and shadcn/ui

The project uses Tailwind CSS for utility-first styling and `shadcn/ui` for pre-built, customizable components.

### 2.1. Base Button Component (`app/components/ui/button.tsx`)

*   Always leverage the `Button` component from `shadcn/ui` as the base for all interactive buttons.
*   Customize its appearance using the `variant` and `size` props, or by extending its `className` prop with additional Tailwind classes.

### 2.2. Color Palette

*   **Primary Actions**: Use `bg-blue-600` for primary actions (e.g., "Create Poll", "Vote").
*   **Secondary Actions**: Use `variant="outline"` or `bg-gray-200` for secondary actions.
*   **Destructive Actions**: Use `bg-red-600` for destructive actions (e.g., "Delete Poll").
*   **Neutral/Informative**: Use `bg-gray-800` for neutral actions or specific UI elements like the Sign Out button.

### 2.3. Hover and Focus States

*   **Hover**: Apply `hover:` prefixes for visual feedback on mouse hover.
    *   Example: `hover:bg-blue-700`, `hover:text-white`.
*   **Focus-Visible (Accessibility)**: Crucial for keyboard navigation. Always include `focus-visible:` styles.
    *   Use `focus-visible:outline-none` to remove default browser outline.
    *   Apply `focus-visible:ring-2`, `focus-visible:ring-offset-2`, and `focus-visible:ring-{color}` for a clear focus indicator.
    *   Example: `focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2`.

### 2.4. Typography

*   Use `font-medium` or `font-semibold` for button text.
*   Adjust `text-sm`, `text-base`, `text-lg` for appropriate sizing.

### 2.5. Spacing and Sizing

*   Use `h-10`, `h-12` for height.
*   Use `px-4`, `px-5`, `px-8` for horizontal padding.
*   Use `rounded-md`, `rounded-full` for border-radius.

---

## 3. Specific Button Implementations

### 3.1. Sign Out Button (`app/components/Navigation.tsx`)

*   **Purpose**: To log out the authenticated user.
*   **Recommended Styling**:
    *   Background: `bg-gray-800` (dark grey)
    *   Text Color: `text-white`
    *   Hover State: `hover:bg-gray-700`
    *   Focus State: `focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2`
    *   Padding/Size: `h-10 px-4 py-2 rounded-md` (or similar, consistent with other buttons)
*   **Implementation Note**: This button should be a Client Component due to its interactive nature and reliance on `useAuth` context.

---

## 4. Code Examples

```tsx
// Example: Primary Button
<Button className="bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
  Primary Action
</Button>

// Example: Outline Button
<Button variant="outline" className="border-blue-500 text-blue-500 hover:bg-blue-50 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
  Secondary Action
</Button>

// Example: Sign Out Button (as per rules)
<Button
  onClick={handleSignOut}
  className="bg-gray-800 text-white hover:bg-gray-700 focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2"
>
  Sign Out
</Button>
```

