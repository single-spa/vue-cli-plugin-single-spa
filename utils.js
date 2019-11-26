const isDef = v => v !== undefined && v !== null;

function normaliseProjectName(name) {
  let returnableName = name;
  const handleNameDashTest = (e, idx) => (idx === 0 ? e : e.charAt(0).toUpperCase() + e.slice(1));
  if (isDef(name)) {
    if (/(-)/.test(name)) {
      returnableName = name
      .split('-')
      .map(handleNameDashTest)
      .join('');
    }
    if (/(@)/.test(returnableName)) {
      returnableName = returnableName
      .split('/')
      .slice(-1)
      .join('');
    }
  }
  return returnableName;
}

module.exports = {
  normaliseProjectName,
};
