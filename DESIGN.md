# Design System: PRD - ETEL Locações
**Project ID:** 4948301263146580408

## 1. Visual Theme & Atmosphere
**Creative North Star: "The Architectural Monolith"**

This design system moves away from the "standard SaaS" look to embrace a high-end, editorial aesthetic tailored for the industrial equipment rental sector. The visual language is defined by **Structural Weight** and **Illuminated Focus**. By utilizing a deep, monochromatic canvas punctuated by high-intensity "industrial amber" (Yellow), we create a digital environment that feels as robust and dependable as the machinery ETEL provides.

To break the "template" feel, this system employs **Intentional Asymmetry**. Large-scale typography (Display-LG) should be paired with generous negative space (Spacing-24) to create a rhythm that feels curated rather than crowded. Imagery is not just a filler; it is the structural backbone of the layout, often breaking the grid or overlapping container boundaries to create a sense of three-dimensional depth.

## 2. Color Palette & Roles
The palette is rooted in a "Dark Mode First" mentality, utilizing the contrast between heavy charcoal and vibrant gold to drive user action.

* **Base Layer (`surface`)**: #131314 - The primary canvas.
* **Secondary Section (`surface_container_low`)**: #1b1c1c - Use for subtle content grouping.
* **Action Containers/Cards (`surface_container_high`)**: #2a2a2a - For interactive elements.
* **Floating Elements (`surface_container_highest`)**: #343535 - For menus or modals.
* **Primary / Accent (`primary_container`)**: #FAB83E - High-contrast pairing, primary engine of conversion.
* **Text on Primary (`on_primary`)**: #432c00
* **Text on Surface / White (`on_surface`)**: #e4e2e2
* **Text Secondary (`on_surface_variant`)**: #d5c4ae
* **Ghost Border (`outline_variant`)**: #504535

## 3. Typography Rules
The system uses a pairing of **Manrope** (for structural authority) and **Inter** (for functional clarity).

*   **Display & Headlines (Manrope):** Used for "The Hook." High-impact, bold weights. Manrope’s geometric nature mimics architectural precision.
*   **Body & Labels (Inter):** Used for "The Information." Inter provides maximum legibility at small scales, essential for technical specifications and rental terms.
*   **Display-LG (3.5rem):** Reserved for Hero statements. Always use `on_surface` (White) for maximum contrast.
*   **Title-MD (1.125rem):** The workhorse for card headers and navigation.
*   **Label-SM (0.6875rem):** Used for technical specs, always in `on_surface_variant` (#d5c4ae) to create a clear hierarchy.

## 4. Component Stylings

### Buttons (The "Power" Components)
* **Primary:** Background: `primary_container` (#fab83e), Text: `on_primary` (#432c00). Shape: `md` (0.375rem).
* **Secondary:** Background: Transparent, Border: "Ghost Border" (outline-variant @ 20%), Text: `on_surface`.
* **States:** On hover, the Primary button should transition to `primary_fixed_dim` (#fdbb41) with a subtle "Glow" shadow using the primary color at 15% opacity.

### Cards & Lists (The "Anti-Grid" Approach)
* **Rule:** Forbid the use of divider lines between list items. The `No-Line Rule` applies.
* **Execution:** Use `Spacing-4` (1rem) of vertical white space and a subtle background shift (`surface_container_low`) on hover to indicate interactivity.
* **Imagery:** Cards should feature "Full Bleed" imagery where the equipment photo meets the top and side edges of the card, grounded by text on a `surface_container_high` footer.

### Input Fields
* **Base:** Use `surface_container_highest` for the input track.
* **Focus State:** Instead of a thick border, use a 2px bottom-border of `primary` (#FAB83E). This keeps the look "Minimalist" and "Direct."

### Spec-Chip
* **Style:** For equipment rentals, use small selection chips with `Rounded-full` (9999px) and a `surface_variant` (#343535) background to filter specs.

## 5. Layout Principles & Elevation
*   **Ambient Shadows:** For floating elements, use a shadow with a 40px blur at 6% opacity. The shadow color must be a tint of the background, never pure black.
*   **Glassmorphism:** For top navigation bars, use `surface` at 80% opacity with a `backdrop-filter: blur(20px)`.
*   **Whitespace:** Do use extreme white space (Spacing-20+) between major sections.
*   **Directness:** Align text to the left for a "Direct" and "Professional" editorial feel.

## 6. Design System Notes for Stitch Generation
* Keep it strictly dark mode.
* Do not use pure black (#000000); use `#131314`.
* Do not use standard standard drop shadows.
* Make sure primary CTA is #FAB83E.
* Don't use more than one primary yellow element in a single viewport.
