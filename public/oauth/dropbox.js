/* global window, URLSearchParams */
// Return page of the Dropbox sign-in pop-up: hands the access token (or the refusal) back to the page that opened it.
(function () {
  var params = new URLSearchParams(window.location.hash.slice(1));
  var message = { type: 'kitwell-dropbox-token', state: params.get('state'), token: params.get('access_token') || null };
  if (window.opener) window.opener.postMessage(message, window.location.origin);
  window.close();
})();
