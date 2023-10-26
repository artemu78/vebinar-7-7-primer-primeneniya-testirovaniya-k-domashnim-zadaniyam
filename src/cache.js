function saveCache(todoList) {
  const listString = JSON.stringify(todoList);
  localStorage.setItem("todos", listString);
}

const readCache = () => {
  const cacheContent = localStorage.getItem("todos");
  if (cacheContent) {
    return JSON.parse(cacheContent);
  } else {
    return null;
  }
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    saveCache,
    readCache,
  };
}
