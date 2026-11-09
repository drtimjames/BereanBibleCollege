/* Shared publication navigation: native link fallback works without JavaScript. */
document.querySelectorAll('[data-previous-page]').forEach(function(link){
  link.addEventListener('click',function(event){
    if(event.defaultPrevented||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
    if(window.history.length>1){event.preventDefault();window.history.back();}
  });
});
