const helper = require('./helper.js');
const handleProfileEdit = (e) => {
  e.preventDefault();
  helper.hideError();

  const fname = e.target.querySelector('#firstname').value;
  const lname = e.target.querySelector('#lastname').value;
  const desc = e.target.querySelector('#description').value;
  const _csrf = e.target.querySelector('#_csrf').value;

  if (!lname || !fname ) {
    helper.handleError('Missing required fields!');
    return false;
  }

  helper.sendPatch(e.target.action, { name: `${fname} ${lname}`, desc, _csrf });

  return false;
}

const handleProfileSetup = (e) => {
    e.preventDefault();
    helper.hideError();
  
    const fname = e.target.querySelector('#firstname').value;
    const lname = e.target.querySelector('#lastname').value;
    const desc = e.target.querySelector('#description').value;
    const _csrf = e.target.querySelector('#_csrf').value;
    const age = e.target.querySelector('#age').value;
  
    if (!lname || !fname || !age) {
      helper.handleError('Missing required fields!');
      return false;
    }
  
    helper.sendPost(e.target.action, { name: `${fname} ${lname}`, desc, _csrf , age});
  
    return false;
}

const SetupForm = (props) => {
  return (
    <form id="profileForm"
      name="profileForm"
      onSubmit={handleProfileSetup}
      action="/makeProfile"
      method="POST"
      className="profileForm">
      <h3>Create Profile</h3>
      <hr />
      <input id="firstname" type='text' name="fname" placeholder={'First Name'} />
      <input id="lastname" type='text' name="lname" placeholder={'Last Name'} />
      <input id="age" type='number' name="age" placeholder={'Age'} min={18}/>
      <label htmlFor='desc'>Description: </label>
      <textarea id="description" type='text' name="desc" defaultValue={'Lorem Ipsum'} value={props.description} />
      <input id='_csrf' type="hidden" name='_csrf' value={props.csrf} />
      <input type='submit' />
    </form>
  )
};

const EditProfile = (props) => {
    return (<form id="profileForm"
        name="profileForm"
        onSubmit={handleProfileEdit}
        action="/editProfile"
        method="PATCH"
        className="profileForm">
        <h3>Edit Profile Info</h3>
        <hr />
        <label htmlFor='fname'>First Name: </label>
        <input id="firstname" type='text' name="fname" placeholder={props.firstName ?? 'First Name'} />
        <label htmlFor='lname'>Last Name: </label>
        <input id="lastname" type='text' name="lname" placeholder={props.lastName ?? 'Last Name'} />
        <label htmlFor='desc'>Description: </label>
        <textarea id="description" type='text' name="desc" value={props.description?? 'Lorem Ipsum'} />
        <input id='_csrf' type="hidden" name='_csrf' value={props.csrf.csrfToken} />
        <input type='submit' />
    </form>)
}

const ProfileInfo = (props) => {
    return (
        <div>
            <h1>Profile Info</h1>
            <div>Name: {props.firstName ?? 'Who are '} {props.lastName ?? 'you? '} {props.age ?? 'missing age?'}</div>
            <div>{props.description ?? 'missing desc?'}</div>
        </div>
    )
}

const token = async () => {
    const response = await fetch('/getToken');
    return response.json();
}

const loadProfileFromServer = async () => {
    const response = await fetch('/getProfile');
    const data = await response.json();
    const tok = await token();
    if (data.profile[0]){
        ReactDOM.render(<div></div>,document.getElementById('info'));
        // ReactDOM.render(<EditProfile csrf={tok}firstName={data.profile[0].name.split(" ")[0]} lastName={data.profile[0].name.split(" ")[1]} description={data.profile[0].description} />, document.getElementById('info'));
        ReactDOM.render(<ProfileInfo firstName={data.profile[0].name.split(" ")[0]} lastName={data.profile[0].name.split(" ")[1]} description={data.profile[0].description} age={data.profile[0].age}/>, document.getElementById('display'));
    }
}

const init = async () => {
  const response = await fetch('/getToken');
  const data = await response.json();
  ReactDOM.render(<SetupForm csrf={data.csrfToken} />, document.getElementById('info'));
  loadProfileFromServer();
};

window.onload = init;