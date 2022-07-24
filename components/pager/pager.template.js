const pagerTemplate = document.createElement('template')
pagerTemplate.innerHTML = `
<style>
  :host {
    display: block;
    width: 100%;
  }
  .pager {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    gap: var(--spacing-400);
    margin-top: var(--spacing-400);
  }
  button {
    background-color: var(--color-200);
    border: none;
    color: var(--text-color-100);
    font-size: var(--font-size-400);
  }
</style>
<div class="pager" >
<div>
<button id="begin" data-action="begin"><<</button>
</div>
<div>
  <button id="decrement" data-action="decrement"><</button>
</div>
  <div class="pager-container" id="pager">
  </div>
  <div>
    <button id="increment" data-action="increment">></button>
  </div>
  <div>
    <button id="end" data-action="end">>></button>
  </div>
</div>
`
export default pagerTemplate
