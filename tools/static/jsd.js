// The original site waits for a bot check before chatting. Bonjour, France has no server to
// protect: this stub completes the check locally, nothing is sent anywhere.
window.bfBotCheck = window.bfBotCheck || {};
window.bfBotCheck.jsd = { executeOnce: function (o) { setTimeout(function () { o && o.callback && o.callback("success"); }, 0); } };
