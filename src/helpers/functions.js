

export const extractDate = (date) => {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
};


export const switchCaseRedirect = (rol, router) => {
  switch (rol) {
    case "USER_ROLE":
      return router.push("/employee");
      break;
    case "ADMIN_ROLE":
      return router.push("/home");
      break;
    default:
      break;
  }
}