export default function validation(data) {
  const {name, email, team, job, position, img} = data

  if (
    name === "" || email === "" || team === "" || 
    job === "" || position === "" || img === ""
  ) {
    return false
  } else {
    return true
  }
}