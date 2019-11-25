const nodes = document.querySelectorAll('div');

console.log(nodes); //NodeList(5) [div, div, div, div, div]
nodesArr = [...nodes]; //[div, div, div, div, div]
console.log(nodesArr);

const mergedNodesArr = nodesArr.reduce((acc, cur) => {
  acc.push(cur.textContent);
  return acc;
}, [])

console.log(mergedNodesArr); //["one", "two", "three", "four", "five"]