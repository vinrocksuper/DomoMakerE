(()=>{var e={413:e=>{const t=e=>{document.getElementById("errorMessage").textContent=e,document.getElementById("domoMessage").classList.remove("hidden")};e.exports={handleError:t,sendPost:async(e,a,r)=>{const n=await fetch(e,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)}),o=await n.json();document.getElementById("domoMessage").classList.add("hidden"),o.error&&t(o.error),o.redirect&&(window.location=o.redirect),r&&r(o)},hideError:()=>{document.getElementById("domoMessage").classList.add("hidden")}}}},t={};function a(r){var n=t[r];if(void 0!==n)return n.exports;var o=t[r]={exports:{}};return e[r](o,o.exports,a),o.exports}(()=>{const e=a(413),t=t=>{t.preventDefault(),e.hideError();const a=t.target.querySelector("#firstname").value,r=t.target.querySelector("#lastname").value,n=t.target.querySelector("#description").value,o=t.target.querySelector("#_csrf").value,i=t.target.querySelector("#age").value;return r&&a&&i?(e.sendPost(t.target.action,{name:`${a} ${r}`,desc:n,_csrf:o,age:i}),!1):(e.handleError("Missing required fields!"),!1)},r=e=>React.createElement("form",{id:"profileForm",name:"profileForm",onSubmit:t,action:"/makeProfile",method:"POST",className:"profileForm"},React.createElement("h3",null,"Edit Profile Info"),React.createElement("hr",null),React.createElement("input",{id:"firstname",type:"text",name:"fname",placeholder:"First Name"}),React.createElement("input",{id:"lastname",type:"text",name:"lname",placeholder:"Last Name"}),React.createElement("input",{id:"age",type:"number",name:"age",placeholder:"Age",min:18}),React.createElement("label",{htmlFor:"desc"},"Description: "),React.createElement("textarea",{id:"description",type:"text",name:"desc",defaultValue:"Lorem Ipsum",value:e.description}),React.createElement("input",{id:"_csrf",type:"hidden",name:"_csrf",value:e.csrf}),React.createElement("input",{type:"submit"})),n=e=>React.createElement("div",null,React.createElement("h1",null,"Profile Info"),React.createElement("div",null,"Name: ",e.firstName??"Who are "," ",e.lastName??"you? "," ",e.age??"missing age?"),React.createElement("div",null,e.description??"missing desc?"));window.onload=async()=>{const e=await fetch("/getToken"),t=await e.json();ReactDOM.render(React.createElement(r,{csrf:t.csrfToken}),document.getElementById("info")),(async()=>{const e=await fetch("/getProfile"),t=await e.json();t.profile[0]&&ReactDOM.render(React.createElement(n,{firstName:t.profile[0].name.split(" ")[0],lastName:t.profile[0].name.split(" ")[1],description:t.profile[0].description,age:t.profile[0].age}),document.getElementById("display"))})()}})()})();