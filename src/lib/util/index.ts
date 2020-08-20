export const getRandomNum = (n:number):string => {
  return Math.random().toString().slice(2, 2 + n)
}
