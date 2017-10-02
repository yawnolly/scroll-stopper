$(function(){
	// $.getJSON("manifest.json", function(data){
	// 	for(var i = 0; i < data.content_scripts[0].matches.length; i++){
	//  		$("ul").append("<li>"+data.content_scripts[0].matches[i]+"</li>");
	//  	}
	// })

	chrome.storage.sync.get("scroll",function(result){
		var x = result;
	 	$("input[name=scroll]").val(result.scroll);	
	})

	$("#chng-scroll-btn").click(function(){
		var sc = $(this).siblings("input").val();
		chrome.storage.sync.set({"scroll": sc});
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
            chrome.tabs.sendMessage(tabs[0].id, { cmd: "setScroll", data: { value: sc }});  
        });
	})

	chrome.runtime.sendMessage({ cmd: "getOnOffState" }, function (response) {
		if(response == false){
			$("input[name='onoff']").attr("checked", false);
		}
	})

	$("input[name='onoff']").change(function(){
		var isExtensionOn = false;
		if($(this).is(":checked")){
			isExtensionOn = true;
		}
		chrome.runtime.sendMessage({ cmd: "setOnOffState", data: { value: isExtensionOn }})
	})

	$("#add").click(function(){
		chrome.storage.sync.get("sites", function(result){		
			result.sites.push({"url": $("#url").val(), "scroll": $("#scroll").val()});
			chrome.storage.sync.set({"sites": result.sites});
		})
	})
})

	// (function() {
	// 	var request = new XMLHttpRequest();
	// 	request.open("GET", "../../data/file.json", false);
	// 	request.send(null);
	// 	var json = JSON.parse(request.responseText);

	// 	for(var i = 0; i < json.content_scripts.matches.length){
	// 		json.content_scripts.matches[i]
	// 	}
		
	// })();