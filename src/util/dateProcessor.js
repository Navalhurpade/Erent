function getDiffInDays(date) {
  const currentDate = new Date();
  const diffInMs = Math.abs(currentDate - date);
  return diffInMs / (1000 * 60 * 60 * 24);
}

// function getMonth(date){
//   const getMonth = new Date(date)

// }

export const getDiffernce = (date) => {
  const time = new Date(date);

  const diffInDays = Math.round(getDiffInDays(time));

  if (diffInDays === 0) return "Today";
  else if (diffInDays === 1) return "Yesterday";
  else return `${time.getDay()}th ${time.getMonth()}`;
};
