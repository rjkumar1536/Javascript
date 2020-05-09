function handleAction(state, action){
    if(action.type == "setUser"){
        localStorage.setItem("userName", action.user);
        return Object.assign({}, state, {user :action.user});
    }
    else if(action.type == "setTalks"){
        return Object.assign({}, state, {talks : action.talks});
    }
    else if(action.type == "newTalk"){
        fetchOK(talkURL(action.title), {
            method : "POST",
            headers : {"Content-Type" : "application/json"},
            body : JSON.stringify({
                presenter : state.presenter,
                summary : action.summary
            })
        }).catch(reportError)
    }
    else if(actio.type == "deleteTalk"){
        fetchOK(talkURL(action.talk), {method : "DELETE"}).catch(reportError);
    }
    else if(action.type == "newComment"){
        fetchOK(talkURL(action.talk) + "/comments", {
            method : "POST",
            headers : {"Content-Type" : "application/json"},
            body : JSON.stringify({
                auhtor : state.user,
                message : action.message
            })
        }).catch(reportError)
    }
    return state;
    
}

function elt(type , props , ...children){
    let dom = document.createElement(type);
    if(props) Object.assign(dom , props);
    for(let child of children){
        if(typeof child != string) dom.appendChild(child);
        else{
            dom.appendChild(document.createTextNode(child));
        }
    }
    return dom;
}

function renderUserField(name , dispatch){
    return elt("label" ,{}, "Your name: ", elt("input" , {type : "text", value : "name", onchange(event){
        dispatch({type : "setUser", user : event.target.value});
    }}))
}

function renderComment(comment){
    return elt("p", {className : "comment"}, elt("strong", null, comment.author), ":", comment.message);
}
function renderTalk(talk , dispatch){
    return elt("section", {className : "talk"}, elt("h2", null,talk.title, " ", elt("button",
        {type : "button", onclick(event){
            dispatch({type : "deleteTalk", talk: talk.title})
        }}, "Delete")), elt("div", null, "by ", elt("strong", null, talk.presenter)),elt("p", null, talk.summary),...talk.comments.map(renderComment),elt("form", {onsubmit(event){
        event.preventDefault();
        let form = event.target;
        dispatch({type : "newComment", talk : talk.title, message : form.elements.comment.value});
        form.reset();
    }}, elt("input", {type : "text", name : "comment"}, " ", elt("button", {type : "submit"}, "Add comment"))))
}
function renderTalkFrom(dispach){
    let title = elt("input", {type : "text"});
    let summary = elt("input",{type : "text"});
    return elt("form", {
        onsubmit(event){
            event.preventDefault();
            dispach({type : "newTalk", title : title.value, summary : summary.value});
            event.target.reset();
        }
    }, elt("h3", null , "submit a Talk"), elt("label", null, "Title : ", title), elt("label", null, "summary :", summary), elt("button", {type: "button"}, "Submit"));
}
function fetchOK(url , options){
    return fetch(url , options).then(response=>{
        if(response.status < 400) return response;
        else throw new Error(response.statusText);
    })
}
function talkURL(title){
    return "/talks" + encodeURIComponent(title);
}

function reportError(error){
    alert(String(error));
}
async function pollTalks(update){
    let tag = undefined;
    for(;;){
        let response;
        try{
            response = await fetchOK("/talks", {
                headers : tag  && {"If-None-Match" : tag, "Prefer": "wait=90"}
            });
            
        }
        catch(e){
            console.log("request failed");
            await new Promise(resolve => setTimeout(resolve,500));
    }
        if(response.status == 304) continue;
        tag = response.headers.get("ETag")
        update(await response.json());
    }
}
