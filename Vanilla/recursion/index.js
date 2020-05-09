let user = {
    name : "rajender",
    address : {
        personal : {
            city : "Bangalore",
            area : "Munnekollal"
        },
        office : {
            city : "Bangalore",
            area : {
                landmark : "Whitefield"
            }
        }
    }
}

function flatten(prefix,user, flat){
    let enum_prop = Object.keys(user);
    for(let prop of enum_prop){
        if(user[prop] instanceof Object){
            flatten(prefix + '_' + prop, user[prop], flat);
        }
        else
        flat[prefix + '_' + prop] = user[prop];
    }
    return flat;
}

console.log(flatten("user", user, {}));