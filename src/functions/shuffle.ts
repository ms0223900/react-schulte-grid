const shuffleArr = <Data>(inputArr: Data[]) => {
  let res = [...inputArr];

  for (let i = inputArr.length - 1; i >= 0; i--) {
    const randomIdx = Math.floor(Math.random() * i);
    [res[i], res[randomIdx]] = [res[randomIdx], res[i]];
  }

  return res;
};

export default shuffleArr;
