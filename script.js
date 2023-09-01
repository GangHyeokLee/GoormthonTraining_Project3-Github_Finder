const search=document.getElementById("seacrh_area_bar");

//레포 리스트 클래스
class Repositoy{
  constructor(id, name, stars, watchers, forks, url){
    this.id = id;
    this.name = name;
    this.stars = stars;
    this.watchers = watchers;
    this.forks = forks;
    this.url = url;
  }

  makeList(){
    
    //레포리스트 만들기 - 1. 제일 큰 컨테이너
    const repo_list = document.createElement('div');
    repo_list.setAttribute('class', 'repo_list');
    repo_list.setAttribute('id', this.id+'_repo_list');
    
    //레포리스트 만들기 - 2. 주소들어가는 칸
    const repo_link = document.createElement('a');
    repo_link.setAttribute('href', this.url);
    repo_link.setAttribute('class', 'repo_link');
    repo_link.setAttribute('id', this.id+'_repo_link');
    repo_link.innerHTML = this.name;
    repo_list.appendChild(repo_link);

    //레포리스트 만들기 - 3.레포 디테일 스타, 와쳐, 포크
    const repo_details = document.createElement('div');
    repo_details.setAttribute('class', 'repo_details');
    repo_details.setAttribute('id', this.id+'_repo_details');

    const stars = document.createElement('div');
    stars.setAttribute('class', 'counts bc1 prob');
    stars.setAttribute('id', this.id+'_stars');
    stars.innerHTML='Stars: ' + (parseInt(this.stars/10==0)?'<span style="color:transparent">0</span>'+this.stars:this.stars);
    repo_details.appendChild(stars);

    const watchers = document.createElement('div');
    watchers.setAttribute('class', 'counts bc2 prob');
    watchers.setAttribute('id', this.id+'_watchers');
    watchers.innerHTML='Watchers: ' + (parseInt(this.watchers/10==0)?'<span style="color:transparent">0</span>'+this.watchers:this.watchers);
    repo_details.appendChild(watchers);

    const forks = document.createElement('div');
    forks.setAttribute('class', 'counts bc3 prob');
    forks.setAttribute('id', this.id+'_forks');
    forks.innerHTML='Forks: ' + (parseInt(this.forks/10==0)?'<span style="color:transparent">0</span>'+this.forks:this.forks);
    repo_details.appendChild(forks);

    repo_list.appendChild(repo_details);

    return repo_list;
  }
}

search.addEventListener("keyup", async (keyCode) => {
  if(keyCode.key == 'Enter'){
    let user_name = search.value;
    // let user_name = 'GangHyeokLee'; //테스트용 내 레포
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
    })
    .then(setRepositories)
    .catch( msg=>{
      console.error('레포 안불러와짐 ㅠ'+msg);
    });
  }
});

function setProfileInfos(profile){
  // console.log(profile);

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
  company.innerHTML = 'Company: ' + (profile.company?profile.company:'');

  const blog = document.getElementById('blog');
  blog.innerHTML = 'Website/Blog: ' + (profile.blog?profile.blog:'');

  const location = document.getElementById('location');
  location.innerHTML = 'Location: ' + (profile.location?profile.location:'');

  const created_at = document.getElementById('created_at');
  created_at.innerHTML = 'Member Since: ' + (profile.created_at?profile.created_at:'');

  //view profile 링크 넣기
  const view_profile = document.getElementById('view_profile');
  view_profile.addEventListener('click', () =>{window.open(profile.html_url);});
};

function setRepositories(repos){
  const repositories = document.getElementsByClassName('repositories')[0];
  for(let i of repos){
    const tmp = new Repositoy(i.id, i.name, i.stargazers_count, i.watchers, i.forks, i.clone_url);
  repositories.appendChild(tmp.makeList());
  }
  

}