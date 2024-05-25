export const createPagesArray = (totalPages: number): number[] => {
  const pagesArray: number[] = [];
  for (let i = 1; i <= totalPages; i++) {
    pagesArray.push(i);
  }
  return pagesArray;
};
