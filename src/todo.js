const makeDomElement = (todoObject) => {
  const element = document.createElement("DIV");
  element.innerText = todoObject.title;
  return element;
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    makeDomElement,
  };
}
