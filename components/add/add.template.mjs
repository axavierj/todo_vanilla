const addTemplate = document.createElement('template')
addTemplate.innerHTML = `
<style>
  svg {
    height: 1rem;
    width: 1rem;
  }
  @keyframes slideInTop {
    0% {
      transform: translateY(-100%);
    }
    100% {
      transform: translateY(0);
    }
  }
  dialog{
    filter: drop-shadow(0 0 0.5rem #000);
    background-color: var(--color-100);
  border: none;
  border-radius: var(--border-radius-100);
  -webkit-border-radius: var(--border-radius-100);
  -moz-border-radius: var(--border-radius-100);
  -ms-border-radius: var(--border-radius-100);
  -o-border-radius: var(--border-radius-100);
  box-shadow: var(--box-shadow-100);
  -webkit-box-shadow: var(--box-shadow-100);
  -moz-box-shadow: var(--box-shadow-100);
  -ms-box-shadow: var(--box-shadow-100);
  -o-box-shadow: var(--box-shadow-100);
  width: 90vw;
  filter: saturate(0.6);
  -webkit-filter: saturate(0.6);
  }
  dialog[open]{
    animation: slideInTop 0.5s ease-in-out;
  }
  .close{
    display: flex;
    color:var(--text-color-100)
  }

  #close_btn{
    border: none;
    background-color: transparent;
    margin-left: auto;
    color: var(--text-color-100);
  }
  form{
    color: var(--text-color-100);
  }
  fieldset{
    
      display: flex;
      flex-direction: column;
    }
  input, textarea {
    border: none;
    border-radius: var(--border-radius-400);
    font-size: var(--text-700);
    color: var(--text-color-400);
    background-color: var(--text-color-100);
    padding: var(--spacing-700);
    box-shadow: var(--box-shadow-100);
    transition: var(--transition-all-100);
    -webkit-border-radius: var(--border-radius-400);
    -moz-border-radius: var(--border-radius-400);
    -ms-border-radius: var(--border-radius-400);
    -o-border-radius: var(--border-radius-400);
  }

  #add_btn{
    border: none;
    background-color: var(--color-300);
    color: var(--text-color-100);
    padding: var(--spacing-600);
    border-radius: var(--border-radius-100);
    -webkit-border-radius: var(--border-radius-100);
    -moz-border-radius: var(--border-radius-100);
    -ms-border-radius: var(--border-radius-100);
    -o-border-radius: var(--border-radius-100);
    box-shadow: var(--box-shadow-100);
    -webkit-box-shadow: var(--box-shadow-100);
    -moz-box-shadow: var(--box-shadow-100);
    -ms-box-shadow: var(--box-shadow-100);
    -o-box-shadow: var(--box-shadow-100);
    cursor: pointer;
  }

  .add_btn {
    border: none;
  background-color: var(--color-300);
  color: var(--text-color-100);
  padding: var(--spacing-600);
  border-radius: var(--border-radius-100);
  -webkit-border-radius: var(--border-radius-100);
  -moz-border-radius: var(--border-radius-100);
  -ms-border-radius: var(--border-radius-100);
  -o-border-radius: var(--border-radius-100);
  box-shadow: var(--box-shadow-100);
  -webkit-box-shadow: var(--box-shadow-100);
  -moz-box-shadow: var(--box-shadow-100);
  -ms-box-shadow: var(--box-shadow-100);
  -o-box-shadow: var(--box-shadow-100);
  cursor: pointer;
  margin-top: var(--spacing-600);
  }
</style>
<button part="add_btn" id="add_btn">
  <svg xmlns="http://www.w3.org/2000/svg" 
    class="icon icon-tabler icon-tabler-plus" 
    viewBox="0 0 24 24" 
    stroke-width="2" 
    stroke="currentColor" 
    fill="none" 
    stroke-linecap="round" 
    stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
  <line x1="12" y1="5" x2="12" y2="19"></line>
  <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
</button>
<dialog part="dialog" >
  <div class="close">
    <button part="close" id="close_btn">X</button>
  </div>
  <form>
    <fieldset part="fieldset">
      <legend>add</legend>
      <label for="title">title</label>
      <input type="text" id="title" name="title" require autocomplete="off"/>
      <label for="description">description</label>
      <textarea
        id="description"
        name="description"
        cols="30"
        rows="10"
        require
      ></textarea>
      <label for="date">date</label>
      <input type="datetime-local" id="date" name="date" require autocomplete="off"/>
      <button type="submit" class="add_btn">
        <svg xmlns="http://www.w3.org/2000/svg" 
        class="icon icon-tabler icon-tabler-plus" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        stroke-width="2" 
        stroke="currentColor" 
        fill="none" 
        stroke-linecap="round" 
        stroke-linejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
   </svg>
      </button>
    </fieldset>
  </form>
</dialog>
      `
export default addTemplate
