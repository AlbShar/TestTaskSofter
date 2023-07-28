function getPath(inputString: string) {
  const index = inputString.indexOf("%");

  if (index === -1) {
    return inputString;
  }

  const path = inputString.substr(index);
  return path;
}

export { getPath };
