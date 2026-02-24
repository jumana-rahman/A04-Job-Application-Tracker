### 1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?
* getElementById: Selects one element using it's id and returns a single element.
* getElementsByClassName: Select all elements with a certain class and returns HTML Collections.
* querySelector: Selects the first element that matches a CSS selector and returns a single element.
* querySelectorAll: Select all elements that matches a CSS selector and returns NodeList (static, doesn't auto-update).

### 2. How do you create and insert a new element into the DOM?
* Create element: make a new element using createElement
* Add content: set text, HTML, id, class, etc.
* Insert into DOM: append, prepend, or insert before another element.

### 3. What is Event Bubbling? And how does it work?
* Event Bubbling: When an event starts on the innermost element (the target) and then moves up through its parent elements.

* How it works:
1. Click on a child element.
2. The event fires on the child first.
3. It bubbles up to the parent, grandparent, and so on, until it reaches the html element.
4. Any event listeners on these ancestors also run if they listen to the event.

### 4. What is Event Delegation in JavaScript? Why is it useful?
* Event Delegation in JavaScript: Event Delegation is a technique where a single event listener is attached to a parent element to manage events for all its descendant elements.

* Why it is useful:
1. Less memory usage
2. Dynamic elements
3. Easier management
4. Clean Code
   
### 5. What is the difference between preventDefault() and stopPropagation() methods?
* preventDefault(): This method is used to cancel the default behavior of browser for an event.
* stopPropagation(): This method is used to control the flow of the event through the DOM tree.
