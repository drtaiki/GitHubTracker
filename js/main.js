$(document).ready(function(){
   $('#searchUser').on('keyup', function(e){
     let username = e.target.value;

     // Make Request To GitHub
     $.ajax({
       url:'https://api.github.com/users/'+username,
       data:{
         client_id:'13c0c042253be4b21c62',
         client_secret:'7dcde8d8446420b828f162ca5d8682c32c48e1d7'
       }
     }).done(function(user){
       $.ajax({
         url:'https://api.github.com/users/'+username+'/repos',
         data:{
           client_id:'13c0c042253be4b21c62',
           client_secret:'7dcde8d8446420b828f162ca5d8682c32c48e1d7',
           sort: 'created: asc',
           per_page: 5
         }
       }).done(function(repos){
         $.ajax({
           url:'https://api.github.com/users/'+username+'/gists',
           data:{
             client_id:'13c0c042253be4b21c62',
             client_secret:'7dcde8d8446420b828f162ca5d8682c32c48e1d7',
             sort: 'created: asc',
             per_page: 5
           }
         }).done(function(gists){
           $.each(gists, function(index, gists){
             $('#gists').append(`
               <div class="well">
                 <div class="row">
                    <div class="col-md-7">
                     <strong>${gists.id}</strong>
                    </div>
                    <div class="col-md-3">
                     <span class="label label-primary">Login: ${gists.login}</span>
                     <span class="label label-default">Created At: ${gists.created_at}</span>
                     <span class="label label-success">Updated At: ${gists.updated_at}</span>
                    </div>
                    <div class="col-md-2">
                     <a href="${gists.html_url}" target="_blank" class="btn btn-default">Gist Page</a>
                    </div>
                 </div>
               </div>
               `);
           });
         });
         $.each(repos, function(index, repo){
           $('#repos').append(`
             <div class="well">
               <div class="row">
                 <div class="col-md-7">
                   <strong>${repo.name}</strong>: ${repo.description}
                 </div>
                 <div class="col-md-3">
                   <span class="label label-default">Forks: ${repo.forks_count}</span>
                   <span class="label label-primary">Watchers: ${repo.watchers_count}</span>
                   <span class="label label-success">Stars: ${repo.stargazers_count}</span>
                   <span class="label label-warning">Issues: ${repo.open_issues_count}</span>
                 </div>
                 <div class="col-md-2">
                   <a href="${repo.html_url}" target="_blank" class="btn btn-default">Repository Page</a>
                 </div>
               </div>
             </div>
             `);
         });
       });
       $('#profile').html(`
         <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">${user.name}</h3>
          </div>
          <div class="panel-body">
            <div class="row">
              <div class="col-md-3">
                <img class="thumbnail avatar" src="${user.avatar_url}">
                <a target="_blank" class="w3-padding-48 btn btn-primary btn-block" href="${user.html_url}">Visit Profile On GitHub...</a>
              </div>
              <div class="col-md-9">
              <span class="label label-default">Public Repositorys: ${user.public_repos}</span>
              <span class="label label-primary">Public Gists: ${user.public_gists}</span>
              <span class="label label-success">Followers: ${user.followers}</span>
              <span class="label label-info">Following: ${user.following}</span>
			  <span class="label label-danger">Gravatar ID: ${user.gravatar_id}</span>
              <br><br>
              <ul class="list-group">
               <li class="list-group-item">Name: ${user.name}</li>
                <li class="list-group-item">Email: ${user.email}</li>
                <li class="list-group-item">Company: ${user.company}</li>
                <li class="list-group-item">Website/Blog: ${user.blog}</li>
                <li class="list-group-item">Location: ${user.location}</li>
                <li class="list-group-item">Member Since: ${user.created_at}</li>
                <li class="list-group-item">Updated: ${user.updated_at}</li>
                <li class="list-group-item">Bio: ${user.bio}</li>
              </ul>
              </div>
            </div>
          </div>
        </div>
        <h3 class="page-header">Latest Repositorys</h3>
        <div id="repos"></div>
        <h3 class="page-header">Latest Gists</h3>
        <div id="gists"></div>
      `);
     });
   });
});
