import { Amplify, Storage, API, graphqlOperation } from "aws-amplify";

import awsconfig from "../aws-exports.js";
import { createUser, deleteUser, updateUser } from "../graphql/mutations.js";
import { getUser, listUsers } from "../graphql/queries.js";

Amplify.configure(awsconfig);

export { uploadImg, getImgUrl, createEmployee, 
  getEmployee, getEmployeeList, deleteEmployee, updateEmployee }

const uploadImg = async () => {
  const img = document.getElementById("img").files[0]
  const time = new Date().getTime()
  try {
    const result = await Storage.put(time, img, {
      contentType: "image/png", // contentType is optional
    })
    // const url = await Storage.get(result.key)
    return result.key
  } catch (error) {
    console.log("error", error)
  }
}

const getImgUrl = async (key) => {
  return await Storage.get(key)
}

const createEmployee = async (data) => {
  const {name, email, team, job, position, img} = data
  const info = {
    name: name,
    email: email,
    team: team,
    job: job,
    position: position,
    img: img,
  }
  return await API.graphql(graphqlOperation(createUser, { input: info }))
}

const getEmployee = async (id) => {
  return await API.graphql(graphqlOperation(getUser, { id: id }))
}

const getEmployeeList = async () => {
  return await API.graphql(graphqlOperation(listUsers))
}

const updateEmployee = async (data) => {
  const [hash, queryString = ''] = location.hash.split('?')
  const id = queryString.split("=")[1]
  const {name, email, team, job, position, img} = data
  const info = {
    id: id,
    name: name,
    email: email,
    team: team,
    job: job,
    position: position,
    img: img,
  }
  return await API.graphql(graphqlOperation(updateUser, { input: info }))
}

const deleteEmployee = async (id) => {
  return await API.graphql(graphqlOperation(deleteUser, { input: { id }}))
}