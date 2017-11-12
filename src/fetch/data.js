import axios from 'axios';
async function Get(api){
  var data;
  var url = api;
  await axios.get(url)
    .then(function (response) {
      data = response.data;
    })
    .catch(function (error) {
      data = null;
    });
  return data;
}
async function Post(url, param){
  var data;
  await axios.post(url, param)
  .then(function (response) {
    data = response;
  })
  .catch(function (error) {
    console.log(error);
  });
  return data;
}
export {Get, Post}