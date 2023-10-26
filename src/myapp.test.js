const TODO_LIST = require("./assets/stabbed_todo_list.json");
const { makeDomElement } = require("./todo");
const { readCache, saveCache } = require("./cache");
const { request } = require("./service");

const todoListStringified = JSON.stringify(TODO_LIST);
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(TODO_LIST),
  }),
);

describe("Тесты веб приложения", () => {
  test("запись в кэш", () => {
    Storage.prototype.setItem = jest.fn();
    saveCache(TODO_LIST);

    expect(localStorage.setItem).toHaveBeenCalledWith(
      "todos",
      todoListStringified,
    );
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  });

  test("чтение пустого кэша", () => {
    Storage.prototype.getItem = jest.fn().mockReturnValue(null);
    const cache = readCache();
    expect(cache).toStrictEqual(null);
    expect(localStorage.getItem).toHaveBeenCalledWith("todos");
  });

  test("чтение кэша с данными", () => {
    Storage.prototype.getItem = jest.fn().mockReturnValue(todoListStringified);
    const cache = readCache();
    expect(cache).toStrictEqual(TODO_LIST);
    expect(localStorage.getItem).toHaveBeenCalledWith("todos");
  });

  test("создание DOM элемента", () => {
    const result = makeDomElement(TODO_LIST[0]);
    expect(result).toMatchSnapshot();
    expect(result.tagName).toBe("DIV");
  });

  test("запрос к сети", async () => {
    const serviceResult = await request();
    expect(serviceResult).toBe(TODO_LIST);
  });
});
