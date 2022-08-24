/**
 * Принимает два объекта, должна вернуть или true или false, если объекты идентичны внутри, возвращает
 * true, если есть различие, false. То есть проверяет каждое свойство, вне зависимости от вложенности,
 * делаем через рекурсию(а других вариантов и нет)
 */
export const deepEqual = (obj, anotherObj) => {
  const objKeys = Object.keys(obj);
  const anotherObjKeys = Object.keys(anotherObj);

  if (objKeys.length !== anotherObjKeys.length) {
    return false;
  }

  for (let i = 0; i < objKeys.length; i++) {
    const key = objKeys[i]

    if (!(anotherObjKeys.includes(key))) {
      return false;
    }
    if (typeof obj[key] === "object") {
      return deepEqual(obj[key], anotherObj[key]);
    }
    if (obj[key] !== anotherObj[anotherObjKeys[i]]) {
      return false;
    }
  }

  return true;
};

/**
 * Принимает объект, возвращает его глубокую копию, то есть ни одно свойство
 * не является ссылочным у другого объекта, точно возвращает новое.
 * Если это массив, возвращает новый массив(map) и если элемент массива не простого типа,
 * то тогда в рекурсию. С объектом также. Поскольку массив при typeof возвращает object, чтобы
 * их различить берем метод Array.isArray и он на массивах вернет тру
 */
export const deepCopy = (obj) => {
  let copied = Array.isArray(obj) ? [] : {};

  Object.entries(obj).forEach(([key, value]) => {
    if (typeof value === 'object'){
      copied[key] = deepCopy(value)
    }
    else{
      copied[key] = value;
    }
  })
  return copied;
};

/**
 * Мы передаем объект, и должны вернуть массив уникальных названий свойств
 * То есть если у нас объект { name: { bohdan: { name: 'test' } } } вернет ['name', 'bohdan']
 */

export const getAllObjectKeys = (obj) => {
  return Object.entries(obj).reduce((arr, [key, value]) => {
    arr.push(key)
    if (typeof value === 'object'){
      arr.push(...getAllObjectKeys(value))
    }
    return [...new Set(arr)];
  }, []);
};

