/* 
 mobile Style Picker

 @author rodrigo faria
 @email rftfaria [at] gmail.com

*/

/**/
function initStylePicker(url, silentMode){
	var user = null;

	var spLocalStorage = supportsLocalStorage();

	if (!silentMode) {
		if (spLocalStorage) {
			user = getStoredCurrentUser();
		}

		if (user == null) {
			user = prompt("Please inform your identifier:");
		}

		if (spLocalStorage && (user != "")) {
			storeCurrentUser(user);
		}
	}

	attachStylePicker(url, user);
}

/**/
function attachStylePicker(url, user) {
	$(window).on("click", function(event) {
		var browser = navigator.userAgent
		var context = "";
		var el = event.target;

		if (el != undefined) {
			var pn = el;

			do {
				info = buildInfo(pn);
				if (context == "") {
					context = info;
				}
				else {
					context = info + " > " + context;
				}

				pn = pn.parentNode;
			} while ((pn != null) && (pn.nodeName != "undefined"));
		}

		var cStyle = getElementComputedStyle(el);
		var data = {
			"browser": browser,
			"user": user,
			"context": context,
			"style": cStyle
		};

		//alert(JSON.stringify(data));

		//notify(url, data)
	});
}

function getElementComputedStyle(el){
	var strStyle;

	if ((el != undefined) && (el != null)) {
		strStyle = window.getComputedStyle(el, null).cssText;
	}
	return strStyle;
}

/* 
	Submits the "data" to "URL"

	URL must have the same origin as the current server
*/
function notify(url, data) {
	var ret;

	ret = $.post(url, {
		"browser": data.browser,
		"user": data.user,
		"context": data.context,
		"style": data.style
	});

	return ret;
}

function buildInfo(el) {
	var info = {
		"nodeName": el.nodeName,
		"name": el.name,
		"id": el.id,
		"class": el.className
	};

	return JSON.stringify(info);
}

function getStoredCurrentUser() {
	return localStorage["user"];
}

function storeCurrentUser(user) {
	localStorage["user"] = user;
}

function supportsLocalStorage() {
  try {
    return 'localStorage' in window && window['localStorage'] !== null;
  } catch (e) {
    return false;
  }
}