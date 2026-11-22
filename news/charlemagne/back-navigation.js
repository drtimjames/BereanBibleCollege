/* Shared publication navigation: native link fallback works without JavaScript. */
document.querySelectorAll('[data-previous-page]').forEach(function(link){
  link.addEventListener('click',function(event){
    if(event.defaultPrevented||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
    // A fresh tab can contain an initial blank history entry. Use the native link on direct entry.
    if(!document.referrer||window.history.length<=1)return;
    event.preventDefault();
    window.history.back();
  });
});
