const search=document.getElementById("seacrh_area_bar");

search.addEventListener("keyup", async (keyCode) => {
  if(keyCode.key == 'Enter'){
    let user_name = search.value;
    search.value=''
    const user_profile = await fetch('https://api.github.com/users/' + user_name).then(response =>{
      console.log(response);
      return response.json();
    })
    .catch(msg=>{
      console.error(msg);
    });

    const user_repos = await fetch('https://api.github.com/users/' + user_name + '/repos').then(response =>{
      return response.json();
    }).catch( msg=>{
      console.log(error(msg));
    });

    console.log(user_repos);
    // console.log(user_profile);
  }
});