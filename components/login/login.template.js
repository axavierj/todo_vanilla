const loginTemplate = document.createElement('template')
loginTemplate.innerHTML = `
<style>
  :host {
    display: block;
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
  label{
    margin-block: var(--spacing-600);
  }
</style>
<form>
  <fieldset>
    
      <legend>log-in</legend>
      <label for="email">email</label>
    
    <input part="input" type="email" id="email" name="email" required autocomplete="off"/>
    <label for="password">password</label>
    <input part="input" type="password" id="password" name="password" required autocomplete="off"/>
    <button type="submit">
    <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-login"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path
                  d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2"
                ></path>
                <path d="M20 12h-13l3 -3m0 6l-3 -3"></path>
              </svg>
    </button>
  </fieldset>
</form>
`
export default loginTemplate
