
// What are Attributes?
// Attributes are extra information inside HTML tags.

// Example:
// <a href="https://example.com" target="_blank">Visit</a>

// Here:
// href, target → attributes
// "https://example.com", "_blank" → values


<a id="link" href="https://google.com">Google</a>

// 1. getAttribute()
// let link = document.getElementById("link");
// console.log(link.getAttribute("href")); // https://google.com
// Returns attribute value as string, If attribute doesn't exist → returns null

// 2. setAttribute()
// link.setAttribute("href", "https://youtube.com"); // update the attribute
// link.setAttribute("target", "_blank"); // create if not exists

// 3. removeAttribute()
// link.removeAttribute("target"); // remove target="_blank"
// Completely removes attribute, Element behaves as if attribute never existed

// 4. hasAttribute()
// console.log(link.hasAttribute("href"));   // true
// console.log(link.hasAttribute("target")); // false