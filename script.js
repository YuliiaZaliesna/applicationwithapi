fetch('https://api.github.com/users/YuliiaZaliesna/repos', { 
    headers: {
        'Accept' : 'application/json'
    }})
		.then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("NETWORK RESPONSE ERROR");
            }
        })
        .then(async(data) => {
            for (let i in data){
                if(data[i].fork === false){
                    let infoItem = "<div class='infoItem'>";
                    infoItem += 'Name: '+data[i].name + '</br>';
                    infoItem += 'Owner login:'+data[i].owner.login + '</br>';
                    var branchurl = data[i].branches_url.replace('{/branch}', '');
                    await fetch(branchurl)
                    .then(responseb => responseb.json())
                    .then(databranch => {
                        for(let j in databranch){
                        infoItem += 'Branch name:' + databranch[j].name + '</br>';
                        infoItem += 'Last commit sha:'+ databranch[j].commit.sha + '</br>';
                        }
                    });
                    infoItem += "</div>";
                    document.getElementById('gitTable').innerHTML += infoItem;
                }
            }
        })
		.catch( error => console.error(error));