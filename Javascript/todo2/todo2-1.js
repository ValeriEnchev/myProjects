console.log("To-do 2 development 1");


const t2Closure = template`<${0}>${1}</${0}>`;
const t3Closure = template`<${0} id="${1}">${2}</${0}>`;
const t4Closure = template`<${0} id="${1}" class="${2}">${3}</${0}>`;

document.title = 'To-Do 2 App';

function appendMeta() {
	const metaArr = [];
	metaArr.push( { httpEquiv: 'X-UA-Compatible', content: "IE=edge" } );
	metaArr.push( { charset: "UTF-8" } );
    metaArr.push( { name: "description", content: "Create own To Do lists" } );
    metaArr.push( { name: "keywords", content: "HTML, CSS, JavaScript" } );
    metaArr.push( { name: "viewport", content: "width=device-width, initial-scale=1.0" } );
	metaArr.push( { name: "author", content: "John Doe" } );
	for (let m in metaArr) {
		console.log(metaArr[m]);
		const meta = document.createElement('meta');
				
		if ( metaArr[m].charset != null ) {	
			meta.setAttribute("charset", metaArr[m].charset);
		}
		if ( metaArr[m].content != null ) {
			if ( metaArr[m].httpEquiv != null ) {
				meta.httpEquiv = metaArr[m].httpEquiv;
			} 
			if ( metaArr[m].name != null ) {
				meta.name = metaArr[m].name;		
			}
			meta.content = metaArr[m].content;
		}
		document.head.appendChild(meta);
	}
}

appendMeta();


function template(strings, ...keys) {
	return (function(...values) {
		const dict = values[values.length - 1] || {};
		const result = [strings[0]];
		keys.forEach(function(key, i) {
			const value = Number.isInteger(key) ? values[key] : dict[key];
			result.push(value, strings[i + 1]);
		});
		return result.join('');
	});
}


function loadHeaderContent(appElement) {

	console.log("loadHeaderContent");
/*	
		<h1>To-Do App</h1>
		<h2>Create your own To-do lists</h2>

		<div id="control">
			<div id="Index">
				<button id="sign-up">Sign Up</button>
				<button id="log-in">Log In</button>	
			</div>
			<div id="Users" class="hidden">
				<button id="dashboard">Dashboard</button>
				<button id="account-settigns">Account settigns</button>
				<button id="log-out">Log Out</button>		
			</div>
		</div>
		<p id="loggedUser" class="hidden">User: <span>John Doe</span></p>
*/

	//console.log( t4Closure("p", "loggedUser", "hidden", "User: <span>John Doe</span>") );  
	//console.log( t4Closure("p", "loggedUser", "hidden", `User: ${t2Closure("span", "John Doe")}`) );
	//console.log( t4Closure("p", "loggedUser", "hidden", "User: "+t2Closure("span", "John Doe") ) );
	//appElement.innerHTML += `<p id="loggedUser" class="hidden">User: <span>John Doe</span></p>`;
	appElement.innerHTML += t2Closure("h1", "To-Do App");
	appElement.innerHTML += t2Closure("h2", "Create your own To-do lists");	
	appElement.innerHTML += t3Closure("div", "control", 
	              t3Closure("div", "Index", 
							t3Closure("button", "sign-up", "Sign Up") + 
				            t3Closure("button", "log-in", "Log In")) + 
				  t4Closure("div", "Users", "hidden", 
							t3Closure("button", "dashboard", "Dashboard") + 
							t3Closure("button", "account-settigns", "Account settigns") + 
							t3Closure("button", "log-out", "Log Out") 
				  ));
	appElement.innerHTML += t4Closure("p", "loggedUser", "hidden", "User: " + t2Closure("span", "John Doe"));


	document.getElementById("sign-up").addEventListener("click", () => {

		showBlockId("signUpForm");
		hideBlockId("loginForm");
	});

	document.getElementById("log-in").addEventListener("click", () => {

		showBlockId("loginForm");
		hideBlockId("signUpForm");
	});

	document.getElementById("dashboard").addEventListener("click", () => {

		console.log("dashboard");

		hideBlockId("accountSettingsForm");
		showBlockId("Lists");
		displayUserLists(userDataObj, loggedUser);
	});
	
	document.getElementById("account-settigns").addEventListener("click", () => {

		console.log("buttonAccount");
		
		loadAccountData("accountSettingsForm");
	
		hideBlockId("Lists");	
		hideBlockSel('.terms-of-use');
		showBlockId("accountSettingsForm");
	});

	document.getElementById("log-out").addEventListener("click", () => {

		//updateLsTodoData(userDataObj);
		window.location.href = window.location.href;
	});
}

function createUserForms(appElem) {

	let formDataArr = [];
	formDataArr.push( { id: "signUpForm", legend: "Sign Up", label: "Email", btnId: "btnSignUpMe", btnVal: "SignUp" } );
	formDataArr.push( { id: "loginForm", legend: "Log In", label: "User", btnId: "btnLoginMe", btnVal: "Login" } );
	formDataArr.push( { id: "accountSettingsForm", legend: "Accout settings", label: "Email", btnId: "btnSaveMe", btnVal: "Save" } );
	
    formDataArr.forEach((f)=>{ 
		console.log("Create "+f.id);

		let tmpElem = `
		<div id="${f.id}" class="hidden">
			<form>
				<fieldset>
					<legend>${f.legend}</legend>`;
					if ( f.id != "loginForm" ) {
		tmpElem += `
					<div>
						<label for="fname">First name:</label><br> 
						<input type="text" id="fname" name="fname" value="" placeholder="Enter the first name" /><br>
						<label for="lname">Last name:</label><br>
						<input type="text" id="lname" name="lname" value="" placeholder="Enter the last name" /><br>
					</div>`;
					}
		tmpElem += `					
					<div>
						<label for="email">${f.label}:</label><br>
						<input type="email" id="email" name="email" value="" placeholder="Enter the email" /><br>
						<label for="pwd">Password:</label><br>
						<input type="password" id="pwd" name="pwd" value="" placeholder="Enter the password" /><br> 
					</div> `;
					if ( f.id != "loginForm" ) {					
		tmpElem += `					
					<div class="terms-of-use">
						<p>Terms of Use:</p>
						<textarea name="message" rows="10" cols="30">Dolor ad saepe, nemo fugit tempora autem est fugiat quis porro atque nam repellendus maxime neque voluptatem rerum amet odit aspernatur voluptates iusto eos laboriosam enim vel. Eius, debitis beatae!
						</textarea><br>
						<input type="checkbox" id="agree" />
						<label for="agree">I agree to the Terms of Use</label>
						<br>
					</div>`;
					}
		tmpElem += `<br>
					<input id="${f.btnId}" type="button" value="${f.btnVal}" onclick="${f.id}Submit();" />			
				</fieldset>
			</form> 
		</div>`		
		//console.log("Create "+tmpElem);
		appElem.innerHTML += tmpElem;
	});
}


function createLists(appElem) {
	appElem.innerHTML += `
		<div id="Lists"  class="hidden">
			<h2>To-Do Lists</h2>
			<div id="todoLists" class='demo'>
			</div>
			<div id="newListName" class="demo hidden">
				<form>
					<div class="listname">
						<input class="h-label" id="inputNewListName" type="text" name="newListName" placeholder="Enter new list name" />
						<input class="edit-list-btn" id="saveListName" type="button" value="Add" />
					</div>
				</form>
			</div>
			<button id="create-todo-list">Create New to-do List</button>
		</div> `;
}


function loadMainContent(appElement) {

	console.log("loadMainContent");

	createUserForms(appElement);
	createLists(appElement);

	appElement.innerHTML += t4Closure( "p", "msgError", "hidden" );
	//appElement.innerHTML += `<p id="msgError" class="hidden">This is an error message.</p>`;
}


function loadFooterContent(appElement) {

	console.log("loadFooterContent");

	const elem=['todoData', 'userDataObj'];

	elem.forEach((e)=>{ 
		appElement.innerHTML += t4Closure( "div", e, "test");
		//appElement.innerHTML += `<div id="${e}" class="test"></div>`;
	});
}


// window.addEventListener("load", function(){
document.addEventListener("DOMContentLoaded", function(){
	console.log('Start');
	
  	const headerElement = document.createElement('header');
	document.body.appendChild(headerElement);
	loadHeaderContent(headerElement);

  	const mainElement = document.createElement('main');
	document.body.appendChild(mainElement);
	loadMainContent(mainElement);

  	const footerElement = document.createElement('footer');
	document.body.appendChild(footerElement);
	loadFooterContent(footerElement);
	
	loadAppData();
	
	document.getElementById("create-todo-list").addEventListener("click", () => {
		console.log("create-todo-list");
		showBlockId("newListName");
		hideBlockId("create-todo-list");
	});

	document.getElementById("saveListName").addEventListener("click", saveListName);
	
});