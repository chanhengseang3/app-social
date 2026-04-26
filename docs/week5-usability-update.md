# Week 5 Usability Update

## Source
This change was implemented from the usability testing results documented in `docs/week5-assignment.docx`.

## Usability Issues
The week 5 usability test identified several front-end clarity problems in the prototype:

- `Announcements` and `News` were too similar in layout and visual treatment
- users did not receive enough confirmation after key actions such as sending a message, posting recognition, or submitting feedback
- the recognition form needed clearer guidance about what kind of content to enter
- the knowledge base needed to be easier to scan
- some screens and forms needed stronger visual hierarchy, labels, spacing, and guidance

## Changes Implemented
The UI was updated to address the full set of week 5 usability findings.

### Announcements and News Distinction
- `Announcements` now uses official framing with:
  - the label `Official Updates`
  - announcement-specific badges such as `Official notice`
  - metadata focused on internal posting context, including author and category
  - a warm accent treatment to make the section feel more formal and operational
- `News` now uses highlight framing with:
  - the label `Company Highlights`
  - news-specific badges and tags
  - metadata focused on highlight and milestone context
  - a separate cool accent treatment to make the section feel more informational

### Action Confirmation Feedback
- added visible success confirmation after:
  - sending a message
  - posting recognition
  - submitting feedback
- these confirmations now appear directly in the related screen so users know the action completed

### Recognition Form Guidance
- added explanatory copy above the recognition form
- added a guidance card that explains what a strong recognition message should include
- updated field labels and placeholder text to make the form more specific and easier to understand

### Knowledge Base Scan Improvements
- added category filter chips
- expanded search matching to include article summaries
- added preview summaries and section counts to article list items
- added stronger section framing for the list and selected document view

### Form and Screen Hierarchy
- added more structured headings and helper text in:
  - messages
  - recognition
  - feedback
- improved labels and supporting guidance under forms so each input has a clearer purpose

## Screens Updated
These usability updates were applied across:

- home screen preview cards
- full `Announcements` view
- full `News` view
- `Messages`
- `Recognition`
- `Knowledge Base`
- `Feedback`

## Files Updated
- `src/App.jsx`
- `src/styles.css`

## Result
These updates make the prototype easier to understand and navigate without backend support. Users now get clearer visual confirmation after important actions, stronger form guidance, improved section hierarchy, and better scanning support in the knowledge base. The distinction between official announcements and general company news is also much clearer across the app.

## Verification
The app was verified with:

```sh
npm run build
```
