const searchTemplate = document.createElement('template')
searchTemplate.innerHTML = `
<style>
  .icon-tabler-search{
    height: 1rem;
    width: 1rem;
  }

  form{
    padding: var(--spacing-500);
    color: var(--text-color-100);
    background-color: var(--color-200);
  }
  fieldset{
    display: flex;
    flex-direction: column;
    gap: var(--spacing-400);
  }

  legend{
    text-transform: capitalize;
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
  button{
    border: none;
    background-color: var(--color-300);
    color: var(--text-color-100);
    padding: 0.3rem;
    border-radius: 0.25rem;
    font-weight: bold;
    box-shadow: var(--box-shadow-100);
  }

  #search-list::-webkit-calendar-picker-indicator{
    display: none;
  }
</style>
<form part="form">
  <fieldset part="fieldset">
    <legend>search</legend>
    <label for="search">
    
    </label>
    <input type="text" id="search" name="search" list="search-list" autocomplete="off"/>
    <div>
      <button type="submit">
        <svg xmlns="http://www.w3.org/2000/svg" 
          class="icon icon-tabler icon-tabler-search" 
          viewBox="0 0 24 24" 
          stroke-width="3" 
          stroke="currentColor" 
          fill="none" 
          stroke-linecap="round" 
          stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <circle cx="10" cy="10" r="7"></circle>
          <line x1="21" y1="21" x2="15" y2="15"></line>
        </svg>
      </button>
    </div>
  </fieldset>
</form>
<datalist id="search-list">
</datalist>
`
export default searchTemplate
