var isExtensionOn = true;
chrome.storage.sync.set({"scroll":4500, "close": 6500});

// Listen for any changes to the URL of any tab.
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
	if (tab.url.includes('facebook.com')){
		chrome.pageAction.show(tabId);
	}
});

// chrome.runtime.onInstalled.addListener(function() {
// 	// Replace all rules ...
// 	chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
// 	    // With a new rule ...
// 	    chrome.declarativeContent.onPageChanged.addRules([{
// 	        // That fires when a page's URL contains a 'g' ...
// 	        conditions: [
// 	          new chrome.declarativeContent.PageStateMatcher({
// 	            pageUrl: { urlContains: 'facebook.com' },
// 	          })
// 	        ],
// 	        // And shows the extension's page action.
// 	        actions: [ new chrome.declarativeContent.ShowPageAction() ]
// 	    }]);
// 	});
// });

chrome.runtime.onMessage.addListener(
function (request, sender, sendResponse) {
    if (request.cmd == "setOnOffState") {
        isExtensionOn = request.data.value;
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
            chrome.tabs.sendMessage(tabs[0].id, {cmd: "propogateOnOffState", data: {value: isExtensionOn}});  
        });
    }

    if (request.cmd == "getOnOffState") {
        sendResponse(isExtensionOn);
    }

    if(request.cmd == "playTune"){
    	var audio = new Audio('audio.mp3');
    	audio.play();
    }
});