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
    stars.innerHTML='Stars: ' + this.stars;
    repo_details.appendChild(stars);

    const watchers = document.createElement('div');
    watchers.setAttribute('class', 'counts bc2 prob');
    watchers.setAttribute('id', this.id+'_watchers');
    watchers.innerHTML='Watchers: ' + this.watchers;
    repo_details.appendChild(watchers);

    const forks = document.createElement('div');
    forks.setAttribute('class', 'counts bc3 prob');
    forks.setAttribute('id', this.id+'_forks');
    forks.innerHTML='Forks: ' + this.forks;
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

    let jandibat = document.getElementById('jandibat');
    let jandidasin = document.getElementsByClassName('jandi_dasin')[0];

    if(user_name){
    
    jandibat.setAttribute('src', 'https://ghchart.rshah.org/'+user_name);
    jandibat.setAttribute('style','display: block');

    jandidasin.setAttribute('style', 'display: none');

    }else{
    jandibat.setAttribute('style','display: none');

    jandidasin.setAttribute('style', 'display: flex');
    }
    
  }
});

function setProfileInfos(profile){
  // console.log(profile);

  //프로필 사진, 검색결과 있으면 이미지 보여주고 없으면 검색결과 없음 보이기
  const avatar_url = document.getElementById('avatar_url');
  const avatar_fake = document.getElementById('avatar_fake');
  if(profile.url){
    
    avatar_url.setAttribute('src', profile.avatar_url);
    avatar_url.setAttribute('style', 'display:block');
    
    avatar_fake.setAttribute('style', 'display:none');
  }
  else{
    avatar_fake.setAttribute('style', 'display:flex');
    avatar_url.setAttribute('style', 'display:none');
  }

  


  //레포, 기스트, 팔로워, 팔로잉 설정
  const public_repos = document.getElementById('public_repos');
  public_repos.innerHTML = 'Public Repos: '+ (profile.public_repos?profile.public_repos:'0');

  //한자리 수면 앞에 투명 0넣어서 모양 맞추기
  const public_gists = document.getElementById('public_gists');
  public_gists.innerHTML = 'Public Gists: '+ (profile.public_gists?profile.public_gists:'0');

  const followers = document.getElementById('followers');
  followers.innerHTML = 'Followers: '+ (profile.followers?profile.followers:'0');
  // console.log(profile.followers/10)

  const following = document.getElementById('following');
  following.innerHTML = 'Following: ' + (profile.following?profile.following:'0');


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


//레포지토리 만들기
function setRepositories(repos){
  const main_cont = document.getElementsByClassName('main_container')[0];

  let repositories = document.getElementsByClassName('repositories')[0];

  if(repositories)
  {
    main_cont.removeChild(repositories);
  }

  repositories = document.createElement('div');
  repositories.setAttribute('class', 'repositories');
  main_cont.appendChild(repositories);

  // console.log(repos);

  if(repos.message!='Not Found'){
    for(let i of repos){
      const tmp = new Repositoy(i.id, i.name, i.stargazers_count, i.watchers, i.forks, i.clone_url);
    repositories.appendChild(tmp.makeList());
    }
  }
  
  

}