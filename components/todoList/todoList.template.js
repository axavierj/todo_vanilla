const todoListTemplate = document.createElement('template')
todoListTemplate.innerHTML = `
<style>
  :host {
    display: block;
    background-color: var(--color-200);
    border-radius: var(--border-radius-400);
    box-shadow: var(--box-shadow-100);
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  #todo_list {
    color: var(--text-color-100);
    padding: var(--spacing-400);
  }

  button[is="nav-btn"] {
    background-color: transparent;
    border: none;
    color: var(--text-color-200);
    cursor: pointer;
  }
  button[is="nav-btn"]:hover {
    filter: brightness(1.5);
  }
  details {
    border: 1px solid var(--color-300);
    padding: var(--spacing-600);
  }

  button[is="action-btn"] {
    background-color: var(--context-success);
    border: none;
    color: var(--text-color-100);
    padding: var(--spacing-700);
    border-radius: var(--border-radius-100);
    box-shadow: var(--box-shadow-100);
  }
  button[is="action-btn"]:hover {
    filter: brightness(0.9);
  }
  button[is="action-btn"][data-action="edit"] {
    background-color: var(--context-info);
  }
  button[is="action-btn"][data-action="delete"] {
    background-color: var(--context-danger);
  }

  summary{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border-bottom: 1px solid var(--color-300);
  }
  summary::before {
    content: '>';
  }
  summary>span{
    margin-left: auto;
  }

  .pending {
    color: var(--context-info);
    text-shadow: 4px 4px 4px rgb(0,0,0,0.5);
  }

.done{
  text-shadow: 4px 4px 8px rgb(0,0,0,0.5);
    color: var(--context-danger);
  }

  .loading{
    height: 2rem;
    width: 100%;
    background-color: lightgrey;
  }

  </style>
<div id="todo_list">
  <div class="loading>
  </div>
  <div class="loading>
  </div>
  <div class="loading>
  </div>
  <div class="loading>
  </div>
</div>
`
export default todoListTemplate
