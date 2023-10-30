function parseTeams(string)  {
  let array = string.split(",");
  if (array.length) {
    let nuevoArray = array.map((e) => e.trim());

    return nuevoArray;
  } else return [];
};

module.exports = {parseTeams}