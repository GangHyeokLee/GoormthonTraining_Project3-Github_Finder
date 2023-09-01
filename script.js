const search=document.getElementById("seacrh_area_bar");

search.addEventListener("keyup", async (keyCode) => {
  if(keyCode.key == 'Enter'){
    // let user_name = search.value;
    let user_name = 'GangHyeokLee'; //테스트용 내 레포
    search.value=''
    const user_profile = await fetch('https://api.github.com/users/' + user_name).then(response =>{
      return response.json();
    })
    .then(setProfileInfos)
    .catch(msg=>{
      console.error('프로필 안불러와짐 ㅠ' + msg);
    });

    const user_repos = await fetch('https://api.github.com/users/' + user_name + '/repos').then(response =>{
      return response.json();
    }).catch( msg=>{
      console.log(error('레포 안불러와짐 ㅠ'+msg));
    });

    console.log(user_profile);
  }
});

function setProfileInfos(profile){
  console.log(profile);

  //프로필 사진
  const avatar_url = document.getElementById('avatar_url');
  avatar_url.setAttribute('src', profile.avatar_url);



  //레포, 기스트, 팔로워, 팔로잉 설정
  const public_repos = document.getElementById('public_repos');
  public_repos.innerHTML = 'Public Repos: '+ (parseInt(profile.public_repos/10==0)?'<span style="color:transparent">0</span>'+profile.public_repos:profile.public_repos);

  //한자리 수면 앞에 투명 0넣어서 모양 맞추기
  const public_gists = document.getElementById('public_gists');
  public_gists.innerHTML = 'Public Gists: '+ (parseInt(profile.public_gists/10==0)?'<span style="color:transparent">0</span>'+profile.public_gists:profile.public_gists);

  const followers = document.getElementById('followers');
  followers.innerHTML = 'Followers: '+ (parseInt(profile.followers/10==0)?'<span style="color:transparent">0</span>'+profile.followers:profile.followers);
  // console.log(profile.followers/10)

  const following = document.getElementById('following');
  following.innerHTML = 'Following: ' + (parseInt(profile.following/10==0)?'<span style="color:transparent">0</span>'+profile.following:profile.following);


  //company, website, location, member_since 넣기
  const company = document.getElementById('company');
  company.innerHTML = company.innerHTML + (profile.company?profile.company:'');

  const blog = document.getElementById('blog');
  blog.innerHTML = blog.innerHTML + (profile.blog?profile.blog:'');

  const location = document.getElementById('location');
  location.innerHTML = location.innerHTML + (profile.location?profile.location:'');

  const created_at = document.getElementById('created_at');
  created_at.innerHTML = created_at.innerHTML + (profile.created_at?profile.created_at:'');

  //view profile 링크 넣기
  const view_profile = document.getElementById('view_profile');
  view_profile.addEventListener('click', () =>{window.open(profile.html_url);});
};