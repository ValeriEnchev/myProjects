console.log("To-do 2 development 2");


let userDataObj = null;
let loginInfo = null;
let loggedUser = null;
let loggedUserInfo = null;
let loggedUserLists = [];
let displayedListNames = [];
let displayedTaskNames = [];
let tasksList = [];


/*
// localStorage.clear(); 

// localStorage.removeItem('todoAppData');  


for (let k = 0; k < localStorage.length; k++) {
   console.log(localStorage.valueOf(k));	
}


userDataObj[0].lists[1].items[0].item="call Jenifer"
updateLsTodoData(userDataObj);

*/

const cyrb53 = function(str, seed = 0) {
    let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
    for (let i = 0, ch; i < str.length; i++) {
        ch = str.charCodeAt(i);
        h1 = Math.imul(h1 ^ ch, 2654435761);
        h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1>>>16), 2246822507) ^ Math.imul(h2 ^ (h2>>>13), 3266489909);
    h2 = Math.imul(h2 ^ (h2>>>16), 2246822507) ^ Math.imul(h1 ^ (h1>>>13), 3266489909);
    return 4294967296 * (2097151 & h2) + (h1>>>0);
};


function validateEmail(email) {
	console.log("validateEmail email: " + email); 
	
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}


function showBlockId(id) {
	console.log("showBlockId: " + id); 
	
	const useDiv = document.getElementById(id);
	useDiv.classList.remove("hidden");

};


function showBlockSel(sel) {
	console.log("showBlockSel: " + sel); 

	const useDiv = document.querySelectorAll(sel);
	for ( let e = 0; e < useDiv.length; e++ ) {	

		useDiv[e].style.display = "inline";
	}	
};


function hideBlockId(id) {
	console.log("hideBlockId: " + id); 
	
	const useDiv = document.getElementById(id);
	useDiv.classList.add("hidden");
}


function hideBlockSel(sel) {
	console.log("hideBlockSel: " + sel); 
	
	const useDiv = document.querySelectorAll(sel);
	for ( let e = 0; e < useDiv.length; e++ ) {

		useDiv[e].style.display = "none";
	}	
}


function showErrMessage(errText) {
	console.log("showErrMessage: " + errText); 

	document.getElementById("msgError").innerText = errText;
    showBlockId("msgError");			
	setTimeout(function() {
				hideBlockId("msgError");
			}, 3000);
}

////////////////////////////////////////////////


function updateLsTodoData(dataObj) {
	
	localStorage.setItem('todoAppData', JSON.stringify(dataObj));
    document.getElementById("userDataObj").innerText =  JSON.stringify(dataObj); 

}


function readLsTodoData() {
	
    const lsData = localStorage.getItem('todoAppData');
	if (lsData === null) {
		lsData = [];
	}
	return lsData;
}


function initDeveloperData() {
/*
	email: "jdoe@example.com", pwd: "123"
	email: "asmith@example.com", pwd: "321"
	email: "jripper@criminal.com", pwd: "123"
*/
	const itemObj = {item: "call Jane", done: "no"};
	const itemsObj = [{item: "go work", done: "yes"}, {item: "pay bills", done: "no"}, {item: "shoping", done: "no"}];
	const listObj = {listName: "today", items: itemsObj};
	const listsObj = [listObj, {listName: "tomorrow", items: [itemObj]}];
	const userObj = {firstName: "John", lastName: "Doe", email: "jdoe@example.com", pwd: "1443235245985799"};
	const todoAppObj = [{user: userObj, lists: listsObj}];
    todoAppObj.push( {user: {firstName: "Anna", lastName: "Smith", email: "asmith@example.com", pwd: "7514345704361243"}, lists: []} );

    todoAppObj.push( {user: {firstName: "Jack", lastName: "Ripper", email: "jripper@criminal.com", pwd: "2139139617664697"}, lists: [{listName: "tonight", items: [{item: "kill Bill", done: "no"}]}] });

	const todoAppJSON = JSON.stringify(todoAppObj);
    document.getElementById("todoData").innerText = todoAppJSON; 
	
	const localStorageData = localStorage.getItem('todoAppData');

	if (localStorageData === null) {
		localStorage.setItem('todoAppData', todoAppJSON);
	} 
}


function getLoginUserInfo(dataObj, loginUserEmail){

	console.log("getLoginUserInfo for "+loginUserEmail); 

    if ( dataObj.user !== null) {
		for (let u in dataObj) {
			if ( dataObj[u].user !== null) {
				if ( dataObj[u].user.email === loginUserEmail) {
					console.log(`{firstName: "${dataObj[u].user.firstName}", lastName: "${dataObj[u].user.lastName}", email: "${loginUserEmail}", pwd: "${dataObj[u].user.pwd}" }`);
					return { firstName: dataObj[u].user.firstName, lastName: dataObj[u].user.lastName, email: loginUserEmail, pwd: dataObj[u].user.pwd } ;
				}
			}
		}
	} 
	return null;
}


function showLoggedUserName() {
	
    const loggedUserNameDiv = document.getElementById("loggedUser");
	loggedUserNameDiv.innerHTML = "User: <span>" + loggedUserInfo.firstName + " " + loggedUserInfo.lastName + "</span>"; 
	showBlockId("loggedUser");
}


function hasSuccessfulLogin() {
	
	hideBlockId("loginForm");
	hideBlockId("Index");
	showBlockId("Users");
	showBlockId("Lists");
	showLoggedUserName();
}


function getUserLists(dataObj, loggedUserEmail) {

	for (let u in dataObj) {
		if ( dataObj[u].user !== null) {
			if ( dataObj[u].user.email === loggedUserEmail) {	
				//console.log(dataObj[u].user.email);

				//console.log(`${dataObj[u].user.firstName} ${dataObj[u].user.lastName} has the email ${dataObj[u].user.email} and ${dataObj[u].lists.length} Todo lists.`); 
                loggedUserLists = dataObj[u].lists; 
				//console.log(loggedUserLists);
				return 	loggedUserLists;
			}
		}
	}
	return null;
}


function isUniqueValue(newName, keys, list=[]){
	
	console.log( "isUniqueValue" );
	
	if (newName != '') {
		
		const key = keys.split( '.' );

		for ( let n in list ) {
			let elem = list[n];
			//console.log(elem);
			if ( elem[key[0]] !== null ) {
				for ( let i = 0; i < key.length; i++ ) {
					elem = elem[key[i]];
					//console.log( elem );				
				}	
				if ( elem === newName ) return false;
			}
		}	
		
		return true;			

	} else {

		return false;		
	}
}


function countOfValue(newName, keys, list=[]){
	
	console.log( "countOfValue" );
	
	const key = keys.split( '.' );
	let count = 0;

	for ( let n in list ) {
		let elem = list[n];
		//console.log(elem);
		if ( elem[key[0]] !== null ) {
			for ( let i = 0; i < key.length; i++ ) {
				elem = elem[key[i]];
				//console.log( elem );				
			}	
			if ( elem === newName ) count++;
		}
	}	
	return count;
}


function getIdx(queryName, keys, list=[]){

	console.log( "getIdx" );
	
	const key = keys.split( '.' );
	for ( let n in list ) {
		let elem = list[n];
		//console.log(elem);
		if ( elem[key[0]] !== null ) {
			for ( let i = 0; i < key.length; i++ ) {
				elem = elem[key[i]];
				//console.log( elem );				
			}	
			if ( elem === queryName ) return n;
		}
	}	
	return -1;
}	


function getLabelElement(arr, query) {

	let result = null;
	for (let i = 0; i < arr.length; i++ ){
		if ( arr[i].htmlFor === query ) { result = arr[i]; }
	}
	return result;
}


function getLoginInfo(loginInfo, loginPwd) {

	console.log("getLoginInfo");
	
	loginPassword=cyrb53(loginInfo.replace("@", loginPwd));

	console.log("loginInfo: " + loginInfo + " and loginPassword: " + loginPassword); 
	const loginUserInfo = getLoginUserInfo(userDataObj, loginInfo);
	//console.log("loginUserInfo get "+loginUserInfo);
	if ( loginUserInfo != null ) {
		console.log ("Get Login User Info:" + loginUserInfo.firstName +" "+ loginUserInfo.lastName +" "+ loginUserInfo.email +" "+ loginUserInfo.pwd);
		//showLoggedUserName(loginUserInfo.firstName + " " + loginUserInfo.lastName);
		if (loginUserInfo.pwd == loginPassword) {
			loggedUser = loginUserInfo.email;
			loggedUserInfo = loginUserInfo;
			hasSuccessfulLogin();
			displayUserLists(userDataObj, loggedUser);
			//console.log ("Logged User Info:" + loggedUserInfo.firstName +" "+ loggedUserInfo.lastName +" "+ loggedUserInfo.email +" "+ loggedUserInfo.pwd);	
			return loginUserInfo;	
		} else {
			console.log("The password does not match!");
			showErrMessage("The password does not match!");
		}

	} else {
		console.log("no login info for " + loginInfo);
		showErrMessage("no login info for " + loginInfo);
		//alert("no login info for " + loginInfo);
	}
	return null;
};



function createNewUser(userObj) {

	console.log('createNewUser');
	userObj.pwd = cyrb53(userObj.email.replace("@", userObj.pwd));
	console.log (userObj);

	userDataObj.push( {user: {firstName: userObj.firstName, lastName: userObj.lastName, email: userObj.email, pwd: userObj.pwd}, lists: []} );

	updateLsTodoData(userDataObj);
}


function loginAsNewUser(userObj) {
	console.log('loginAsNewUser:');

	loggedUser = userObj.email;
	loggedUserInfo = userObj;

	console.log('loggedUser: '+loggedUser);
			
	hasSuccessfulLogin();
	displayUserLists(userDataObj, loggedUser);	
}


function updateLoggedUser(userObj) {
	console.log ('loggedUserInfo: ');
		
	//userDataObj[0]["user"]["firstName"]
	//userDataObj[0]["user"]["lastName"]

	//const userEmail = loggedUserInfo.email; 
	const userIdx = getIdx(loggedUserInfo.email, 'user.email', userDataObj);
	
	loggedUserInfo.firstName = userObj.firstName;
	loggedUserInfo.lastName = userObj.lastName;
	loggedUserInfo.email = userObj.email;
	
	userDataObj[userIdx]["user"]["firstName"] = loggedUserInfo.firstName;
	userDataObj[userIdx]["user"]["lastName"] = loggedUserInfo.lastName;
	userDataObj[userIdx]["user"]["email"] = loggedUserInfo.email;
	
	if (userObj.pwd != null) {
		loggedUserInfo.pwd = cyrb53(userObj.email.replace("@", userObj.pwd));
		userDataObj[userIdx]["user"]["pwd"] = loggedUserInfo.pwd;
	} else {
		console.log ("Do not change the password!");
	}
	loggedUser = loggedUserInfo.email;
	console.log (loggedUserInfo);

	updateLsTodoData(userDataObj);
}


function loadAccountData(id) {
	console.log("loadAccountData");
	
	console.log("fname"+":"+loggedUserInfo.firstName);
	console.log("lname"+":"+loggedUserInfo.lastName);
	console.log("email"+":"+loggedUserInfo.email);

	document.querySelector("#" + id + " #fname").value = loggedUserInfo.firstName;
	document.querySelector("#" + id + " #lname").value = loggedUserInfo.lastName;
	document.querySelector("#" + id + " #email").value = loggedUserInfo.email;
	//document.querySelectorAll("#" + id + " label")[3].innerText = 'Password (optional):'
    document.querySelector("#" + id + " #pwd").placeholder='Enter new password';
};


function formSubmitId(id, excludeSel1='', excludeSel2=''){
	console.log("formSubmitId - id");
	
	//let isSomethingMiss = true;
	let tmpErrMsg = '';
	let relatedLabel = null;
	let newUserObj = [];
	
	//console.log(	loggedUserInfo.email);
	
	const inputElements = document.querySelectorAll("div#"+id+" div"+excludeSel1+" input"+excludeSel2);
	const labelElements = document.querySelectorAll("div#"+id+" div"+excludeSel1+" label");
	console.log (inputElements);
	// let countMissings = inputElements.length;
	for (let e = 0; e < inputElements.length; e++ ) {
		
		//console.log( "id: "+inputElements[e].id );	
		switch (inputElements[e].id) {
			case 'fname':
			    relatedLabel = getLabelElement(labelElements, "fname");
				if ( inputElements[e].value === '') {
					tmpErrMsg += 'The first name is missing.\n';
					relatedLabel.classList.add("missing");
				} else {
					relatedLabel.classList.remove("missing");
					newUserObj.firstName = inputElements[e].value;
				}			
				break;
			case 'lname':
			    relatedLabel = getLabelElement(labelElements, "lname");
				if ( inputElements[e].value === '') {
					tmpErrMsg += 'The last name is missing.\n';
					relatedLabel.classList.add("missing");
				} else {
					relatedLabel.classList.remove("missing");
					newUserObj.lastName = inputElements[e].value;
				}				
				break;
			case 'email':
			    relatedLabel = getLabelElement(labelElements, "email");
				if ( inputElements[e].value === '') {
					tmpErrMsg += 'The email is missing.\n';
					relatedLabel.classList.add("missing");
				} else {
					if ( loggedUser != inputElements[e].value ) {
						if ( isUniqueValue( inputElements[e].value, 'user.email', userDataObj ) ) {
						    relatedLabel.classList.remove("missing");
					    } else {
						    tmpErrMsg += 'The email ' + inputElements[e].value + ' is already exist!!!.\n';
						}
					} else {
						relatedLabel.classList.remove("missing");
					}
				}
				if ( !validateEmail(inputElements[e].value) ) { 
					tmpErrMsg += 'The email is invalid.\n';
					relatedLabel.classList.add("missing");
				} else {
					newUserObj.email = inputElements[e].value;
				}
				break;
			case 'pwd':
			    relatedLabel = getLabelElement(labelElements, "pwd");
				if ( inputElements[e].value === '') {
					tmpErrMsg += 'The password is missing.\n';
					relatedLabel.classList.add("missing");
				} else {
					relatedLabel.classList.remove("missing");
					newUserObj.pwd = inputElements[e].value;
				}				
				break;
			case 'agree':
				relatedLabel = getLabelElement(labelElements, "agree");
				if ( !inputElements[e].checked ) {
					tmpErrMsg += 'You are not confirmed of usage agreement.';
					relatedLabel.classList.add("missing");
				} else {
					relatedLabel.classList.remove("missing");
				}
				break;
		}
	}
	//console.log(tmpErrMsg.length);
    if ( tmpErrMsg.length > 0 ) {
		showErrMessage(tmpErrMsg);
	} else {
		console.log('Ok');
		//console.log('loggedUserInfo');
		//console.log(loggedUserInfo);
		//console.log('newUserObj');
		//console.log(newUserObj);
		let secretWord = document.querySelector("#"+id+" input#pwd").value;
		//console.log(secretWord);
		if ( newUserObj !== null ) {
			if ( loggedUserInfo === null ) {
				console.log("This is Sign Up user!");

				console.log("createNewUser(newUserObj)");
				createNewUser(newUserObj);
				loginAsNewUser(newUserObj);
				hideBlockId(id);
								
			} else {
				console.log("This is Update of user!");

				updateLoggedUser(newUserObj);
				showLoggedUserName();
				
				showBlockId("Lists");
				displayUserLists(userDataObj, loggedUser);
				hideBlockId(id);
			}
		}	
	}
}


function signUpFormSubmit(){
	console.log("signUpFormSubmit");

	formSubmitId("signUpForm");
}	


function accountSettingsFormSubmit(){
	console.log("accountSettingsFormSubmit");

	formSubmitId("accountSettingsForm", ":not(.terms-of-use)");
}	


function loginFormSubmit() {
	
	console.log("loginFormSubmit");
    const labelElements = document.querySelectorAll("div#loginForm label");
	
	const emailElem = document.querySelector("#loginForm #email");
	console.log(emailElem);
	console.log(emailElem.value);
	const pswElem = document.querySelector("#loginForm #pwd");
	console.log(pswElem);
	console.log(pswElem.value);	
	if (emailElem.value === "") {
		console.log("enter an email");
		getLabelElement(labelElements,"email").classList.add("missing");
		showErrMessage("enter an email");
	} else if (pswElem.value === "") {
		console.log("enter a password");
		getLabelElement(labelElements,"pwd").classList.add("missing");
		getLabelElement(labelElements,"email").classList.remove("missing");
		showErrMessage("enter a password");
	} else {
		getLabelElement(labelElements,"pwd").classList.remove("missing");
		const userInfo = getLoginInfo(emailElem.value, pswElem.value);
		if (userInfo !== null) {
			console.log("userInfo "+userInfo.firstName+" "+userInfo.lastName);
		}
	}
}


function saveListName() {

	console.log("saveListName");

	const listName = document.getElementById("inputNewListName").value;
	if ( listName !== '' ) {
		if (isUniqueValue(listName, 'listName', loggedUserLists)) {

			hideBlockId("newListName");
			showBlockId("create-todo-list");

			loggedUserLists.push( { listName: document.getElementById("inputNewListName").value, items: [] } );
			updateLsTodoData(userDataObj);
			displayUserLists(userDataObj, loggedUser);
		} else 	showErrMessage(listName + " is not unique");
	} else 	showErrMessage("List name is empty");
	
	console.log(loggedUser);
	console.log(loggedUserLists);
}


function displayUserLists(dataObj, loggedUserEmail) {

    console.log("displayUserLists");

	let tmpText = '';

	for (let u in dataObj) {
		if ( dataObj[u].user !== null) {
		//console.log(dataObj[u].user.email);
			if ( dataObj[u].user.email === loggedUserEmail) {	

				loggedUserLists = dataObj[u].lists;
			
				//console.log("user.email: "+dataObj[u].user.email);
				//console.log("loggedUserEmail: "+loggedUserEmail);
				console.log(dataObj[u].user.firstName+" "+dataObj[u].user.lastName+" has an email "+dataObj[u].user.email+" and "+loggedUserLists.length+" Todo lists."); 

				const todoListsDiv = document.getElementById("todoLists");
				
				// clear content
				todoListsDiv.textContent = '';

				for (let l in loggedUserLists) {
					tmpText = loggedUserLists[l].listName;

					console.log("   "+tmpText+" (" + loggedUserLists[l].items.length+"):");
				
					const listForm = document.createElement("form"); 
		
					const listInputCheckBox = document.createElement("input"); 
					listInputCheckBox.classList.add("h-input");
					listInputCheckBox.id = "h-l" + l;				
					listInputCheckBox.type = "checkbox";

					listForm.appendChild(listInputCheckBox);
				
		
					const listNameDiv = document.createElement("div");
					listNameDiv.classList.add("listname");
					
					const listLabel = document.createElement("label"); 
					listLabel.classList.add("h-label");
					listLabel.id = "h-label-" + l;
					listLabel.setAttribute("for", "h-l" + l);		
					listLabel.innerText = tmpText;
					
					
					const buttonEdit = document.createElement("input");
					buttonEdit.classList.add("edit-list-btn");
					buttonEdit.id = "btn-edit-lst-" + l;
					buttonEdit.type = "button";
					buttonEdit.value = "Edit";
					buttonEdit.addEventListener("click", editListName);
					
					
					listNameDiv.appendChild(listLabel);					
					listNameDiv.appendChild(buttonEdit);

					listForm.appendChild(listNameDiv);

					const sublistDiv = document.createElement("div");	
					sublistDiv.classList.add("article", "h-content");
					sublistDiv.id = "sub-list-l" + l;
					
					const sublistUl = document.createElement("ul");
					sublistUl.classList.add("h-sublist");
			
					for (let i in loggedUserLists[l].items) {
						tmpText = loggedUserLists[l].items[i].item;

						const sublistLi = document.createElement("li");
									
						const sublistLabel = document.createElement("label");
						sublistLabel.classList.add("sub-label");
						
						if ( loggedUserLists[l].items[i].done === "yes" ) sublistLabel.classList.add("through");
						
						sublistLabel.setAttribute("for", "sub-list-l" + l + "-" + "t" + i);		
						sublistLabel.innerText = tmpText;					
						sublistLi.appendChild(sublistLabel);
					
						const sublistInput = document.createElement("input");
						sublistInput.classList.add("sub-input");
						sublistInput.id = "sub-list-l" + l + "-" + "t" + i;					
						sublistInput.type = "checkbox";	
						sublistInput.checked = ( loggedUserLists[l].items[i].done === "yes" ) ? true : false;
						//const checkboxTaskDone = document.getElementById("s-l0-t0");
						sublistInput.addEventListener("click", saveTaskDone);
				
						sublistLi.appendChild(sublistInput);	
						sublistUl.appendChild(sublistLi);	
					}
					sublistDiv.appendChild(sublistUl);
					
					const newTaskForm = document.createElement("div");
					newTaskForm.classList.add("hidden");
					newTaskForm.id = "newtask-" + l;
					
					const inputNewTask = document.createElement("input");
					inputNewTask.classList.add("add-task-input");
					inputNewTask.id = "input-task-" + l;
					inputNewTask.type = "text";
					inputNewTask.placeholder="Enter new task";
					
					const buttonSaveNewTask = document.createElement("input");
					buttonSaveNewTask.classList.add("save-task-btn");
					buttonSaveNewTask.id = "btn-save-task-" + l;
					buttonSaveNewTask.type = "button";
					buttonSaveNewTask.value = "Save task";
					buttonSaveNewTask.addEventListener("click", saveNewTask);					
					
					newTaskForm.appendChild(inputNewTask);
					newTaskForm.appendChild(buttonSaveNewTask);
					
					const buttonShowNewTaskForm = document.createElement("input");
					buttonShowNewTaskForm.classList.add("add-task-btn");
					buttonShowNewTaskForm.id = "btn-add-task-" + l;
					buttonShowNewTaskForm.type = "button";
					buttonShowNewTaskForm.value="Add new task"
					buttonShowNewTaskForm.addEventListener("click", showNewTaskForm);

					sublistDiv.appendChild(newTaskForm);
					sublistDiv.appendChild(buttonShowNewTaskForm);
					listForm.appendChild(sublistDiv);
					todoListsDiv.appendChild(listForm);
				}
			}
		}
	}
}


function editListName(e) {
	console.log(e);

	console.log(e.target.id); 				// id="b1"
	console.log(e.target.value); 			// value="Enable edit"	
	console.log(e.target.parentElement.childNodes[0].id); 	// id="myLabel1"	
//	console.log(e.target.parentElement.children[0].id); 	// id="myLabel1"	
	console.log(e.target.parentElement.children[0].localName ); 	

    const myLabelId = e.target.parentElement.children[0].id;
	const myLabelElement = document.getElementById(myLabelId);

	// get displayed names
	displayedListNames = [];
	document.querySelectorAll("#todoLists .listname").forEach((element, ind) => { 
		displayedListNames.push ( {id:ind, name: element.innerText} );
	});

	const displayedListName = myLabelElement.innerText;
	const storedListNameElement = loggedUserLists[getIdx(displayedListName, 'name', displayedListNames)];

	if ( e.target.value === "Edit" ) {
	
		myLabelElement.contentEditable = true;
		myLabelElement.focus();

		e.target.value = "Save";
		console.log("step 2");

	} else {	
		/*
		countOfValue(displayedListName, 'name', displayedListNames)
		countOfValue(displayedListName, 'listName', loggedUserLists)
		*/
		if ( countOfValue(displayedListName, 'name', displayedListNames) <= 1 ) {

			storedListNameElement.listName = myLabelElement.innerText;
					
			myLabelElement.contentEditable = false;
			myLabelElement.blur();
			
			e.target.value = "Edit";
			
			updateLsTodoData(userDataObj);
		} else 
			showErrMessage( " The new list name is not unique!!!" ); 
	}	
}


function showNewTaskForm(e) {
	console.log("showNewTaskForm");
	
	console.log(e);
	console.log(e.target.id); 				// id="btn-add-task-0"
	console.log(e.target.value); 			// value="Add new task"	

    console.log(e.target.parentElement.children[1].id);	// id="newtask-0"


    showBlockId(e.target.parentElement.children[1].id); 
    hideBlockId(e.target.id);
}


function saveNewTask(e) {
	console.log("saveNewTask");
	
	console.log(e);
	console.log(e.target.id); 				// id="btn-save-task-0"
	console.log(e.target.value); 			// value="Save task"	

	console.log(e.target.parentElement.id); 				// id="newtask-0"

	//e.target.parentElement.id
	//console.log(e.target.parentElement.firstElementChild.id);	// id="input-task-0"
	//console.log(e.target.parentElement.firstElementChild.value);	// value="qwe"
	//console.log(e.target.parentElement.parentElement.firstElementChild.children.length);	
	//console.log(e.target.parentElement.parentElement.id);	// id="sub-list-l0"	
	//console.log(e.target.parentElement.parentElement.value);	// value="qwe"	
	console.log(e.target.previousElementSibling.id);	// id="input-task-0"
	console.log(e.target.previousElementSibling.value);	// value="qwe"
//	target.nextSibling.parentElement.previousSibling.previousSibling


    tasksList = e.target.parentElement.parentElement.firstElementChild;
	console.log(tasksList);
	
	const prefixID = e.target.parentElement.parentElement.id; // id="sub-list-l0"	
	const lst = e.target.parentElement.parentElement.firstElementChild.children.length;
	const tmpText = e.target.previousElementSibling.value;

	
	// get displayed names
	displayedTaskNames = [];

	for (let i = 0 ; i < tasksList.children.length; i++ ) {
		console.log(tasksList.children[i].firstElementChild.textContent);

		displayedTaskNames.push ( {id:i, name: tasksList.children[i].firstElementChild.textContent} );
	}
	console.log('displayedTaskNames:');
	console.log(displayedTaskNames);
	
	if (isUniqueValue(tmpText, 'name', displayedTaskNames)){
		console.log( " The new task is unique" );
					
		const newLI = document.createElement("li");	
					
		const listLabel = document.createElement("label"); 
		listLabel.classList.add("sub-label");
	//listLabel.id = "h-label-" + lst;
		listLabel.setAttribute("for", prefixID + "-t" + lst);		
		listLabel.innerText = tmpText;
					
					
		const checkboxComplited = document.createElement("input");
		checkboxComplited.classList.add("sub-input");
		checkboxComplited.id = prefixID + "-t" + lst;
		checkboxComplited.type = "checkbox";
		checkboxComplited.addEventListener("click", saveTaskDone);

		newLI.appendChild(listLabel);
		newLI.appendChild(checkboxComplited);
		tasksList.appendChild(newLI);

	//console.log(e.target.parentElement.parentElement.querySelectorAll(".h-sublist li .sub-label")[1].textContent ) // 'pay bills' 


		displayedListNames = [];
		//listNames = document.querySelectorAll(".listname");
		//console.log(listNames);
		document.querySelectorAll("#todoLists .listname").forEach((element, ind) => { 
			displayedListNames.push ( {id:ind, name: element.innerText} );
		});

		console.log(displayedListNames);
		console.log(e.target.parentElement.parentElement.previousElementSibling.children[0].id);
		console.log(e.target.parentElement.parentElement.previousElementSibling.children[0].textContent);
	
		//let displayedListName = e.target.parentElement.parentElement.previousElementSibling.children[0].textContent; //today
		const displayedListName = e.target.parentElement.parentElement.previousElementSibling.firstElementChild.innerText;	//today
		const storedListNameElement = loggedUserLists[getIdx(displayedListName, 'name', displayedListNames)];
		// getIdx('today', 'name', displayedListNames)
		console.log("storedListNameElement.items:: ");
		console.log(storedListNameElement.items);
	
		
		hideBlockId(e.target.parentElement.id);	//hideBlockId("newtask-0");
	    showBlockId(e.target.parentElement.nextElementSibling.id);	// showBlockId("btn-add-task-0");
		

		storedListNameElement.items.push({item: tmpText, done: 'no'});

	} else {
		
		console.log( "The new task is not unique!!!" );
		showErrMessage( "The new task is not unique!!!" ); 
	}
	
	console.log('storedListNameElement:::');
	//console.log(storedListNameElement);
	console.log('loggedUserLists:::');
	console.log(loggedUserLists);

	updateLsTodoData(userDataObj);
}


function saveTaskDone(e) {
	console.log("saveTaskDone");
	
	console.log(e);
	console.log(e.target.id);	// "s-l0-t0"
	console.log(e.target.checked);	// true|false

	console.log(e.target.previousSibling.innerText);	// "go work"
	console.log(e.target.previousSibling.htmlFor);	// "s-l0-t0"	
	console.log(e.target.labels[0].htmlFor);	// "s-l0-t0"

	displayedListNames = [];
		//listNames = document.querySelectorAll(".listname");
		//console.log(listNames);
	document.querySelectorAll("#todoLists .listname").forEach((element, ind) => { 
		displayedListNames.push ( {id:ind, name: element.innerText} );
	});

//	console.log(displayedListNames);
	//console.log(e.target.parentElement.parentElement.previousElementSibling.children[0].id);
	//console.log(e.target.parentElement.parentElement.previousElementSibling.children[0].textContent);
	
	//let displayedListName = e.target.parentElement.parentElement.previousElementSibling.children[0].textContent; //today
	//let displayedListName = e.target.parentElement.parentElement.previousElementSibling.firstElementChild.innerText;	//today
	const displayedListName = e.target.parentElement.parentElement.parentElement.previousElementSibling.firstElementChild.innerText; //today
	const storedListNameElement = loggedUserLists[getIdx(displayedListName, 'name', displayedListNames)];
	// getIdx('today', 'name', displayedListNames)
	console.log("storedListNameElement: ");
	console.log(storedListNameElement.items);
	
//	let storedListItems = storedListNameElement.items;
	
	// get displayed names
	displayedTaskNames = [];
	e.target.parentElement.parentElement.querySelectorAll(".h-sublist li .sub-label").forEach((element, ind) => { 
		displayedTaskNames.push ( {id:ind, name: element.textContent} );
	});

	//console.log(displayedTaskNames);

	const displayedTaskName = e.target.previousElementSibling.innerText;
	(e.target.checked) ? e.target.previousElementSibling.classList.add("through") : e.target.previousElementSibling.classList.remove("through");
//	let storedTaskNameElement = storedListItems[getIdx(displayedTaskName, 'name', displayedTaskNames)];
	const storedTaskNameElement = storedListNameElement.items[getIdx(displayedTaskName, 'name', displayedTaskNames)];
	// getIdx('go work', 'name', displayedTaskNames) 	// '0'
	console.log("storedTaskNameElement:");
	console.log(storedTaskNameElement);
	//console.log(storedListItems[getIdx(displayedTaskName, 'name', displayedTaskNames)]);
	storedTaskNameElement.done = (e.target.checked) ? "yes" : "no";
	console.log("item: "+storedTaskNameElement.item, "done: "+storedTaskNameElement.done, e.target.checked );

	updateLsTodoData(userDataObj);
}


function loadAppData() {

	console.log ("loadAppData");
	
	initDeveloperData();

	// load stored data
	const lsTodoData = readLsTodoData();

	console.log(lsTodoData, lsTodoData.length);

	if ( lsTodoData.length > 0 ) {

		userDataObj = JSON.parse(lsTodoData);

	} else {
	
		console.log ("empty data!");
		userDataObj = {user: null, lists: []};
	}

	console.log(userDataObj);

	document.getElementById("userDataObj").innerText =  JSON.stringify(userDataObj); 
}

///////////////////////////////////////////////////////////////////////////////////////////////


//displayAllUserListsTL(userDataObj);
//displayUserLists(userDataObj, 'jdoe@example.com');
//displayUserLists(userDataObj, loggedUser);


//let loginUser = 'jripper@criminal.com';
//let loginUser = 'jdoe@example.com';
//let loginUser = 'asmith@example.com';

/*
userDataObj.user.firstName
userDataObj.user.lastName
userDataObj.user.email
userDataObj.user.pwd
userDataObj.lists[0].listName
userDataObj.lists[0].items[0].item
userDataObj.lists[0].items[0].done
userDataObj.lists[0].items[1].item
userDataObj.lists[0].items[1].done
userDataObj.lists[0].items[2].item
userDataObj.lists[0].items[2].done
userDataObj.lists[1].listName
userDataObj.lists[1].items[0].item
userDataObj.lists[1].items[0].done

userDataObj[0].user.firstName
userDataObj[0].user.lastName
userDataObj[0].user.email
userDataObj[0].user.pwd
userDataObj[0].lists[0].listName
userDataObj[0].lists[0].items[0].item
userDataObj[0].lists[0].items[0].done
userDataObj[0].lists[0].items[1].item
userDataObj[0].lists[0].items[1].done
userDataObj[0].lists[0].items[2].item
userDataObj[0].lists[0].items[2].done
userDataObj[0].lists[1].listName
userDataObj[0].lists[1].items[0].item
userDataObj[0].lists[1].items[0].done
*/


//loggedUserInfo = getLoginUserInfo(userDataObj, 'jdoe@example.com');
//console.log("XXX "+loggedUserInfo.firstName+" "+loggedUserInfo.lastName+" "+loggedUserInfo.email+" "+loggedUserInfo.pwd);



/*
			<form><input class="h-input" id="h-l0" type="checkbox">
				<div class="listname">
					<label class="h-label" id="h-label-0" for="h-l0" contenteditable="false">tonight</label>
					<input class="edit-list-btn" id="btn-edit-lst-0" type="button" value="Edit">
				</div>
				<div class="article h-content" id="sub-list-l0">
					<ul class="h-sublist">
						<li><label class="sub-label" for="s-l0-t0">go work</label><input class="sub-input" id="s-l0-t0" type="checkbox"></li>
						<li><label class="sub-label" for="s-l0-t1">pay bills</label><input class="sub-input" id="s-l0-t1" type="checkbox"></li>
						<li><label class="sub-label" for="s-l0-t2">shoping</label><input class="sub-input" id="s-l0-t2" type="checkbox"></li>
					</ul>
					<div id="newtask-0" class="hidden">
						<input class="add-task-input" id="input-task-0" type="text" placeholder="Enter new task">
						<input class="save-task-btn" id="btn-save-task-0" type="button" value="Save task">
					</div>
					<input class="add-task-btn" id="btn-add-task-0" type="button" value="Add new task" >					
				</div>
			</form>

*/


	
/*

// Check
document.getElementById("checkbox").checked = true;

// Uncheck
document.getElementById("checkbox").checked = false;

*/


/*
document.getElementById("myP").contentEditable = true;
document.getElementById("b1").contentEditable = true;
let storeB1 = document.getElementById("b1").innerHTML;

function fb1() {
	console.log("b1 is clicked and copy paragraph");
	let tmp=document.getElementById("b1").innerHTML;
	document.getElementById("demo1").innerHTML = document.getElementById("myP").innerHTML;
	if (tmp.localeCompare(storeB1) !== 0) {
	    console.log(`need store '${storeB1}' '${tmp}'`) ;
		storeB1 = document.getElementById("b1").innerHTML;
	}
}	

*/

// document.querySelectorAll("div#accountSettingsForm div:not(.terms-of-use) input")
// document.querySelectorAll("div#accountSettingsForm div:not(.terms-of-use) input:not(#pwd)")
// document.querySelectorAll("div#accountSettingsForm div:not(.terms-of-use) label")
// document.querySelectorAll("div#signUp-form div input")
// document.querySelectorAll("div#signUp-form div label")
// hideBlockSel('.terms-of-use')
// showBlockSel('.terms-of-use')
//document.getElementsByClassName('terms1-of-use')[0].classList.value


/*
isUniqueValue('jdoe@example.com', 'user.email', userDataObj)
isUniqueValue('tomorrow', 'listName', loggedUserLists)
isUniqueValue('go work', 'item', loggedUserLists[0].items)
*/