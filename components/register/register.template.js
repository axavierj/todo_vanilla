const registerTemplate = document.createElement('template')
registerTemplate.innerHTML = `
<style>
:host {
  display: block;
  width: 90vw;
}
small {
  color: var(--context-info);
}
input {
  border: none;
  border-radius: var(--border-radius-400);
  font-size: var(--text-700);
  color: var(--text-color-400);
  background-color: var(--text-color-100);
  transition: var(--transition-all-100);
  -webkit-border-radius: var(--border-radius-400);
  -moz-border-radius: var(--border-radius-400);
  -ms-border-radius: var(--border-radius-400);
  -o-border-radius: var(--border-radius-400);
  -webkit-transition: var(--transition-all-100);
  -moz-transition: var(--transition-all-100);
  -ms-transition: var(--transition-all-100);
  -o-transition: var(--transition-all-100);
  padding: var(--spacing-700);
  box-shadow: var(--box-shadow-100);
}
form {
  background-color: antiquewhite;
  padding: var(--spacing-600);
  border-radius: var(--border-radius-300);
  -webkit-border-radius: var(--border-radius-300);
  -moz-border-radius: var(--border-radius-300);
  -ms-border-radius: var(--border-radius-300);
  -o-border-radius: var(--border-radius-300);
  box-shadow: var(--box-shadow-300);
}
  fieldset {
    display: flex;
    flex-direction: column;
  }

  button[type="submit"] {
    margin-top: var(--spacing-600);
    border: none;
    background-color: var(--color-100);
    padding: var(--spacing-600);
    color: white;
    border-radius: var(--border-radius-300);
    -webkit-border-radius: var(--border-radius-300);
  -moz-border-radius: var(--border-radius-300);
  -ms-border-radius: var(--border-radius-300);
  -o-border-radius: var(--border-radius-300);
  box-shadow: var(--box-shadow-100);
  transition: var(--transition-all-200);
  -webkit-transition: var(--transition-all-200);
  -moz-transition: var(--transition-all-200);
  -ms-transition: var(--transition-all-200);
  -o-transition: var(--transition-all-200);
  }
  button[type="submit"]:hover {
    background-color: var(--color-200);
    color: var(--color-100);
  }
  label {
    margin-block: var(--spacing-600);
  }
  @media only screen and (min-width: 768px) {
    :host {
      width: 70vw;
    }
  }
</style>
<form>
  <fieldset>
    <legend>Registration</legend>
    <label for="email">Email</label>
    <input type="email" name="email" id="email" autocomplete="off" required/>
    <label for="userName">User Name</label>
    <input type="text" name="userName" id="userName" autocomplete="off"/>
    <label for="password">Password</label>
    <input type="password" name="password" id="password"  pattern="/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{6,30}$/
    " autocomplete="off" required/>
    <small>Password must be at least 6 characters long</small>
    <button type="submit">register</button>
  </fieldset>
</form>
`
export default registerTemplate
