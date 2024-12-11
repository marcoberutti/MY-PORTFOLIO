let myReposContainer = document.querySelector('#myGithubRepos');
const reposUrl = 'https://api.github.com/users/marcoberutti/repos';
const lastMonth = new Date()
lastMonth.setDate((lastMonth.getDate()-15))

async function fetchGitHubRepos(){
  const repos = await fetch(reposUrl)
  .then(res => res.json())
  .then(repos => repos.sort((a, b) => new Date(a.created_at) - new Date(b.created_at)))
  .then(repos => repos
    .filter(repo => repo.fork === false)
    .map(repo => {
    let myRepo = document.createElement('div')
    myRepo.classList = 'art'
    let timestamp = Date.parse(repo.created_at)
    let date = new Date(timestamp)
    let myDate = `${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`
    console.log(repo.name.replaceAll('-', ' ').replaceAll('  ', ' '))
    myRepo.innerHTML = `
        <div>
          <header class="headContainer">
            ${new Date(repo.created_at) > lastMonth ? `<span class="badge">NEW</span>` : ''}
          </header>
        </div>
        <section>
          <h4>${repo.name.replaceAll('-', ' ').replaceAll('  ', ' ')}</h4>
          <p>${repo.description || 'No descriptions yet...'}</p>
          <p>repo created the ${myDate}</p>
        </section>
        <footer>
            <a href="${repo.html_url}" target="_blank"><span>Link to repo</span></a>
        </footer>
    `
    myReposContainer.prepend(myRepo)
  })
)
  .catch(errorDivShowing)
}
fetchGitHubRepos()
function errorDivShowing(){
  let errorDiv = document.createElement('div')
  errorDiv.classList = 'errorReposFetchContainer'
    errorDiv.innerHTML = `
      <h1>Error loading Repositories...</h1>
      <h3>for link to my repositories visit:</h3>
      <a href="https://github.com/marcoberutti?tab=repositories" target="_blank">my github space</a>  
    `
    myReposContainer.append(errorDiv)
}

let form = document.querySelector('form')
let submitFormBtn = document.querySelector('#submitFormBtn')
let message = document.querySelector('#message')

form.addEventListener('input', function(e){
  if(e.target.nodeName === 'INPUT' || e.target.nodeName === 'TEXTAREA'){
    submitFormBtn.classList.remove('disabled')
    submitFormBtn.classList.add('btn-primary')
  } else {
    submitFormBtn.setAttribute('disabled', 'true');
  }
})

form.addEventListener('submit', function(e){
  e.preventDefault()
  if(message.value){
      let mailToMe = document.querySelector('#mailToMe')
      mailToMe.href = `mailto:marcoberutti90@gmail.com?subject=Invio form&body=${encodeURIComponent(message.value)}`
      console.log("Mailto link: ", mailToMe.href); // Log per il deb
      setTimeout(() => {
        mailToMe.click(); // Fai clic sul link mailto
      }, 100);
    } else {
      console.log('no')
    }
  })

let hamburgerMenuBtn = document.querySelector('.hamburgerMenu')
let menu = document.querySelector('.menuHome')

window.addEventListener('resize', function(){
  if(this.innerWidth > 768){
    menu.classList.remove('visible')
    menu.classList.remove('notShown')
  }
})

hamburgerMenuBtn.addEventListener('click', function(){

  if(menu.classList.contains('visible')){
    menu.classList.add('notShown')
    menu.classList.remove('visible')
  } else {
    menu.classList.add('visible')
    menu.classList.remove('notShown')
  }
  if(this.classList.contains('hamburgerMenuAnimation')){
    this.classList.remove('hamburgerMenuAnimation')
  } else {
    this.classList.add('hamburgerMenuAnimation')
  }

  let menuAnchors = document.querySelectorAll('.menuHome a')

  menuAnchors.forEach(menuAnchor =>{
    menuAnchor.addEventListener('click', function(){
      menu.classList.add('notShown')
      menu.classList.remove('visible')
      hamburgerMenuBtn.classList.remove('hamburgerMenuAnimation')
    })
  })
  
})

let skillsList = document.querySelector('.skills ul')
let skillsItem = Array.from(skillsList.children)

skillsItem.sort((a,b) => {
  let valueA = a.querySelector('meter').value;
  let valueB = b.querySelector('meter').value;
  return valueB - valueA
})
skillsItem.forEach(item => skillsList.appendChild(item));
