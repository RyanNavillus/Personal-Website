function createBranch(name) {

}

function createCommitOnBranch(text, date, branch) {

}

function expandCommit(commit) {

}

class Commit {
    constructor(title, message, imageURL, hash) {
        if(title == null || message == null || imageURL == null) 
        {
            console.log("return");
            return;
        }
        if (hash == null)
        {
            hash = this.generateHash();
        }
        console.log(hash);
        if (!Commit.count) 
        {
            Commit.count = 0;
        }
        this.identifier = "commit_" + Commit.count;
        Commit.count++;


        this.html = document.createElement("div");
        this.html.setAttribute("id", this.identifier);
        this.html.setAttribute("class", "commit-wrapper");

        var commitDiv = document.createElement("div");
        commitDiv.setAttribute("class", "commit-div");

        var topCommitDiv = document.createElement("div");
        topCommitDiv.setAttribute("class", "top-commit-div");

        var commitImg = document.createElement("img")
        commitImg.setAttribute("class", "commit-img");
        commitImg.setAttribute("src", imageURL);
        topCommitDiv.appendChild(commitImg);

        var titleText = document.createElement("h1");
        titleText.setAttribute("class", "commit-title");
        titleText.innerHTML = title;
        topCommitDiv.appendChild(titleText);

        var hashText = document.createElement("p");
        hashText.setAttribute("class", "commit-hash");
        hashText.innerHTML = hash;
        topCommitDiv.appendChild(hashText);

        commitDiv.appendChild(topCommitDiv);

        var bottomCommitDiv = document.createElement("div");
        bottomCommitDiv.setAttribute("class", "bottom-commit-div");

        var commitMessage = document.createElement("p");
        commitMessage.setAttribute("class", "commit-message");
        commitMessage.innerHTML = message;
        bottomCommitDiv.appendChild(commitMessage);

        commitDiv.appendChild(bottomCommitDiv);
        
        this.html.appendChild(commitDiv);
    }

    // Return a string of 7 random hexidecimal characters
    generateHash() {
        var hexstring = "";
        for (var i = 0; i < 7; i++)
        {
            var num = Math.floor(Math.random() * 16);
            if (num > 9) // Alpha character
            {
                num += 55;
            } 
            else // Numeric character
            {
                num += 48;
            }
            hexstring += String.fromCharCode(num);
        }
        return hexstring;
    }

    generateTestCommit() {
        var wrapperDiv = document.createElement("div");
        wrapperDiv.setAttribute("class", "commit-wrapper");
        var commitDiv = document.createElement("div");
        commitDiv.setAttribute("class", "commit-div");

        var topCommitDiv = document.createElement("div");
        topCommitDiv.setAttribute("class", "top-commit-div");

        var commitImg = document.createElement("img")
        commitImg.setAttribute("class", "commit-img");
        commitImg.setAttribute("src", "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Mandarin.duck.arp.jpg/220px-Mandarin.duck.arp.jpg");
        topCommitDiv.appendChild(commitImg);

        var titleText = document.createElement("h1");
        titleText.setAttribute("class", "commit-title");
        titleText.innerHTML = "Summer Internship at Spensa";
        topCommitDiv.appendChild(titleText);

        var hashText = document.createElement("p");
        hashText.setAttribute("class", "commit-hash");
        hashText.innerHTML = "0bc3fe5";
        topCommitDiv.appendChild(hashText);

        commitDiv.appendChild(topCommitDiv);

        var bottomCommitDiv = document.createElement("div");
        bottomCommitDiv.setAttribute("class", "bottom-commit-div");

        var commitMessage = document.createElement("p");
        commitMessage.setAttribute("class", "commit-message");
        commitMessage.innerHTML = "I worked as a yada yada doing yada yada for a specific amount of time. During this time I was responsibe for developing doohickies, researching razamataz, and conjuring code. Through this I learned to put some pep in my step, to work well with snarfs, and to properly do the cupid shuffle."
        bottomCommitDiv.appendChild(commitMessage);

        commitDiv.appendChild(bottomCommitDiv);
        
        wrapperDiv.appendChild(commitDiv);
        return wrapperDiv; 
    }
}

class Branch {
    constructor() {
        
    }

    expandBranch () {

    }

    addChildBranch(branch) {

    }

    addCommit(commit) {

    }
}

$(document).ready( function() {

    var testDiv = document.createElement("div");
    testDiv.setAttribute("id", "test-div");
    document.body.insertBefore(testDiv, document.getElementById("header-menu"));
    var commit = new Commit("Title", "Hello World", "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Mandarin.duck.arp.jpg/220px-Mandarin.duck.arp.jpg");
    var commit1 = new Commit("Title2", "Hello World2", "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Mandarin.duck.arp.jpg/220px-Mandarin.duck.arp.jpg");
    testDiv.appendChild(commit.html);
    testDiv.appendChild(commit1.html);

    var s = Snap("#main-svg");
    s.attr({
        width: 600,
        height: 400
    });
    var node = document.getElementById(s.node.id);
    console.log("#" + s.node.id)
    console.log(node);
    node.innerHTML += "<foreignObject id='foreign-object' width='600' height='400' x='0' y='0'></foreignObject>";
    var html = document.createElement("html");
    var body = document.createElement("body");
    html.appendChild(body);
    var foreignObject = document.getElementById("foreign-object");
    var foreignContainer = document.createElement("div");
    foreignContainer.setAttribute("id", "foreign-container");
    foreignContainer.appendChild(commit.html);
    body.appendChild(foreignContainer);
    foreignObject.appendChild(html);

});
