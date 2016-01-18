/*! Main JS for volatility program - v1 - 12/13/2015 */

// Your Client ID can be retrieved from your project in the Google
      // Developer Console, https://console.developers.google.com
      var CLIENT_ID = '593829292020-dtpo2noda7mliq7iij4b8kgn8sor0uve.apps.googleusercontent.com';

      var SCOPES = ['https://www.googleapis.com/auth/drive'];
      
      // var scriptId = "MG0P6G0prTP2XRWwRhS-RT9BRF831uWHK";
      // var scriptId = "MqOcLUEybS_l88Gl4gixlSNBRF831uWHK";
      var scriptId = "MNowVcXas2-uYhjOzDCcmiqVy5KxECbym";
      var tickerList;
      var bigTable;
      var timeout = 10000;
      var validating = 0;

      /**
       * Check if current user has authorized this application.
       */
      function checkAuth() {
        gapi.auth.authorize(
          {
            'client_id': CLIENT_ID,
            'scope': SCOPES.join(' '),
            'immediate': true
          }, handleAuthResult);
      }

      /**
       * Pad the number to 2-digits
       */
      function pad(d) {
    	    return (d < 10) ? '0' + d.toString() : d.toString();
    	}
      /**
       * Handle response from authorization server.
       *
       * @param {Object} authResult Authorization result.
       */
      function handleAuthResult(authResult) {
        var authorizeDiv = document.getElementById('authorize-div');
        var inputform = document.getElementById('inputform');
        if (authResult && !authResult.error) {
          // Hide auth UI, then load client library.
          authorizeDiv.style.display = 'none';
          inputform.style.display = 'inline';
          
        } else {
          // Show auth UI, allowing the user to initiate authorization by
          // clicking authorize button.
          authorizeDiv.style.display = 'inline';
          inputform.style.display = 'none';
        }
        
        
      }

      /**
       * Initiate auth flow in response to user clicking authorize button.
       *
       * @param {Event} event Button click event.
       */
      function handleAuthClick(event) {
        gapi.auth.authorize(
          {client_id: CLIENT_ID, scope: SCOPES, immediate: false},
          handleAuthResult);
        return false;
      }


      /**
       * clear the previous results and reset the form.
       */
      function resetResults() {
    	  clearPre();
    	  $('#submitBtn').toggleClass('hidden');
    	  $('#resetBtn').toggleClass('hidden');
    	  $('#exportBtn').toggleClass('hidden');
    	  $('#outIndex').addClass('hidden');
    	  $('#stockName').addClass('hidden');
    	  $('#loading').addClass('hidden');
    	  
    	  $('input[name=type]').prop('disabled', false);
		  $('#ticker').prop('disabled', false);
          $('#from-date').prop('disabled', false);
          $('#to-date').prop('disabled', false);
    	  $('#isWeekly').prop('disabled', false);
		  $("#weekday").prop("disabled", true);
		  $("#compare1").prop("disabled", false);
		  $("#compare2").prop("disabled", false);
		  $("#compare3").prop("disabled", false);
		  $("#compare4").prop("disabled", false);
		  
		  $('#isWeekly').prop('checked', false);
		  $("#compare1").prop("checked", false);
		  $("#compare2").prop("checked", false);
		  $("#compare3").prop("checked", false);
		  $("#compare4").prop("checked", false);
		  
		  
		  if ($('#type1').is(':checked')){
			  
			    $("#isWeekly").prop("disabled", false);
		    	if(!$('#isWeekly').is(':checked')){
			   	   $("#compare1").prop("disabled", false);
				   $("#compare2").prop("disabled", false);
			   	   $("#compare3").prop("disabled", false);
			       $("#compare4").prop("disabled", false);
		        }
		    	
		  }else if ($('#type2').is(':checked')){
			  
		    	$("#isWeekly").prop("disabled", false);
		    	if(!$('#isWeekly').is(':checked')){
			   	   $("#compare1").prop("disabled", false);
				   $("#compare2").prop("disabled", false);
		        }
				$("#compare3").prop("disabled", true);
				$("#compare4").prop("disabled", true);
				$("#compare3").prop("checked", false);
				$("#compare4").prop("checked", false);
				
		  }else if ($('#type3').is(':checked')){
			  
				   $("#compare1").prop("disabled", true);
				   $("#compare2").prop("disabled", true);
				   $("#compare3").prop("disabled", true);
				   $("#compare4").prop("disabled", true);
				   $("#compare1").prop("checked", false);
				   $("#compare2").prop("checked", false);
				   $("#compare3").prop("checked", false);
				   $("#compare4").prop("checked", false);
				   $("#isWeekly").prop("checked", true);
				   $("#isWeekly").prop("disabled", true);
				   $("#weekday").prop("disabled", false);
				   
		  }else if ($('#type4').is(':checked')){
			  	$("#ticker").val("All Stocks");
		    	$("#ticker").prop("disabled", true);
			    $("#isWeekly").prop("disabled", false);
		    	if(!$('#isWeekly').is(':checked')){
			   	   $("#compare1").prop("disabled", false);
				   $("#compare2").prop("disabled", false);
			   	   $("#compare3").prop("disabled", false);
			       $("#compare4").prop("disabled", false);
		        }
		    	
		  }else if ($('#type5').is(':checked')){
			    $("#ticker").val("All Indexes");
		    	$("#ticker").prop("disabled", true);
		    	$("#isWeekly").prop("disabled", false);
		    	if(!$('#isWeekly').is(':checked')){
			   	   $("#compare1").prop("disabled", false);
				   $("#compare2").prop("disabled", false);
		        }
				$("#compare3").prop("disabled", true);
				$("#compare4").prop("disabled", true);
				$("#compare3").prop("checked", false);
				$("#compare4").prop("checked", false);
				
		  }
		  
      }
      /**
       * Verify whether the mandatory fields are there.
       */
      function checkResults() {
    	  
    	  var type =$('input[name=type]:checked');
    	  var ticker = $('#ticker');
          var fromDate = $('#from-date');
          var toDate = $('#to-date');
          var weekday = $('#weekday');
    	  
		  if (!fromDate.val()){
			  fromDate.val('2014-01-01');
		  }

		  if (!toDate.val()){
			    var date = new Date();
		    	date.setDate(date.getDate() - 1);
		    	var yesterday = date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate();
		    	
		    	var toDate = $('#to-date');
		    	toDate.val(yesterday);
		  }

    	  if (!ticker.val()){
    		  ticker.addClass('error');
    		  $('#errMsg').removeClass('hidden');
    	  }else{
    		  clearPre();
    		  $('#errMsg').addClass('hidden');
    		  $('#submitBtn').toggleClass('hidden');
    		  $('#loading').toggleClass('hidden');
    	  
    		  $('input[name=type]').prop('disabled', true);
    		  ticker.prop('disabled', true);
    		  fromDate.prop('disabled', true);
    		  toDate.prop('disabled', true);
    		  $('#isWeekly').prop('disabled', true);
    		  weekday.prop("disabled", true);
    		  $("#compare1").prop("disabled", true);
    		  $("#compare2").prop("disabled", true);
    		  $("#compare3").prop("disabled", true);
    		  $("#compare4").prop("disabled", true);
    	  
    		  var num = 108;
          
    		  if (ticker.val() == "") {
    			  ticker.attr('class') += "error";
    		  }else{
    			  if(type.val() == "index"){
    				  num = returnNum(2,weekday.val());
    			  }else if(type.val() == "stockIndex"){
    				  num = returnNum(3,weekday.val());
    			  }else if(type.val() == "allStock"){
    				  num = returnNum(1,weekday.val());
    			  }else if(type.val() == "allIndex"){
    				  num = returnNum(2,weekday.val());
    			  }else{  //if(type.val() == "stock")
    				  $('#type1').prop('checked',true);
    				  num = returnNum(1,weekday.val());
    			  } 
    			  callScriptFunction(type.val(),ticker.val(),fromDate.val(),toDate.val(),num);
    			  
    		  }
    	  }
      }
      
      
      /**
       * Calls an Apps Script function to list the folders in the user's
       * root Drive folder.
       */
      function callScriptFunction(type,ticker,fromDate,toDate,num) {
        

        // Create an execution request object.
        var request = {};
        
        if (type == 'index'){
        	request = {
                    'function': 'writeIndex',
                    'parameters': [ticker,fromDate,toDate]
                    };
        }else if (type == 'allStock'){
        	request = {
                    'function': 'getAllStock',
                    'parameters': []
                    };
        }else if (type == 'allIndex'){
        	request = {
                    'function': 'getAllIndex',
                    'parameters': []
                    };
        }else{
        	request = {
                    'function': 'writeStock',
                    'parameters': [ticker,fromDate,toDate]
                    };
        }
        
        // Make the API request.
        var op = gapi.client.request({
            'root': 'https://script.googleapis.com',
            'path': 'v1/scripts/' + scriptId + ':run',
            'method': 'POST',
            'body': request
        });
        
        op.execute(function(resp) {
          if (resp.error) {
        	  if ((resp.error.code == '3')||(resp.error.code == '-1')||(resp.error.code == '409')||(resp.error.code == '504')){
      		  //  appendPre('Retry!! callScriptFunction, type='+type+',ticker='+ticker+',num = '+num+', error code ='+resp.error.code);
      		  //  appendPre(JSON.stringify(resp, null, 2));
      		    setTimeout(function() { callScriptFunction(type,ticker,fromDate,toDate,num); },timeout);
        	  }else if (resp.error.code == '401'){
        		  appendPre('Session timeout. Please refresh the browser and retry.');
        		  checkAuth();
              }else{
              	appendPre('Network error occurs! Please capture the screen, refresh the browser and retry.');
              	appendPre('callScriptFunction (line:281), type='+type+',ticker='+ticker+',num = '+num+', error code ='+resp.error.code);
            	appendPre(JSON.stringify(resp, null, 2));
            	$('#resetBtn').removeClass('hidden');
        	  }
          } else {
        	  var output = resp.response.result;
        	  clearPre();
        	  if (type == 'index'){
        		  $('#stockName').val(output);
        		  $('#stockName').toggleClass('hidden');
        		  setTimeout(function() { getScriptOutput(type,num); },timeout);
        	  }else if ((type == 'stock')||(type == 'stockIndex')){
        		  $('#stockName').val(output[0]);
        		  $('#index').val(output[1]);
        		  $('#indexName').val(output[2]);
        		  $('#stockName').toggleClass('hidden');
        		  $('#outIndex').toggleClass('hidden');
        		  setTimeout(function() { getScriptOutput(type,num); },timeout);
        	  }else if ((type == 'allStock')||(type == 'allIndex')){
        		  var total = output.length;
        		  tickerList = output;
        		  bigTable = new Array();
        		  appendPre("Total number of tickers: "+total);
        		  
        		  var tbdy = document.getElementById('tableOut');
              	  var tr = document.createElement('tr');
                  appendTd(tr,"No.");
                  appendTd(tr,"Ticker");
                  appendTd(tr,"Mean");
                  appendTd(tr,"Median");
                  appendTd(tr,"Standard deviation");
                  appendTd(tr,"Variance");
                  appendTd(tr,"Occurrences");
                  appendTd(tr,"Comparison Base");
                  appendTd(tr,"Test statistics");
                  appendTd(tr,"p-value");
                  appendTd(tr,"Result");
                  
                  tbdy.appendChild(tr);
        		  gettingOutput(type,fromDate,toDate,num+1,0,total);
        	  }        	  
          }
          
        });
      }
      

      /**
       * Calls get all stock details
       */
      function gettingOutput(type,fromDate,toDate,num,count,total) {
        
      if (count == total){
      	$('#loading').toggleClass('hidden');
        $('#resetBtn').toggleClass('hidden');
        $('#exportBtn').toggleClass('hidden');
      }else{
    	var request = {};
        var ticker = tickerList[count];
  	    //appendPre('ticker = '+ticker+',count='+count+',num='+num);        
        if (type == 'allIndex'){
          	request = {
                      'function': 'getIndexVolatility',
                      'parameters': [ticker,fromDate,toDate,num]
                      };
          }else if (type == 'allStock'){
          	request = {
                      'function': 'getStockVolatility',
                      'parameters': [ticker,fromDate,toDate,num]
                      };
          }
        // Make the API request.
        var op = gapi.client.request({
            'root': 'https://script.googleapis.com',
            'path': 'v1/scripts/' + scriptId + ':run',
            'method': 'POST',
            'body': request
        });
        
        op.execute(function(resp) {
          
        	if (resp.error) {
        		 if ((resp.error.code == '3')||(resp.error.code == '-1')||(resp.error.code == '409')||(resp.error.code == '504')){
           		  //  appendPre('Retry!! validateOutput, type='+type+',num = '+num+', error code ='+resp.error.code);
           		  //  appendPre(JSON.stringify(resp, null, 2));
           		    setTimeout(function() { gettingOutput(type,fromDate,toDate,num,count,total); },timeout);
        		  }else if (resp.error.code == '401'){
           		    // appendPre('Session timeout. Please refresh the browser and retry.');
           		    checkAuth();
           		    setTimeout(function() { gettingOutput(type,fromDate,toDate,num,count,total); },timeout);
             	  }else{
             		appendPre('Network error occurs! Please capture the screen, refresh the browser and retry.');
                   	appendPre('gettingOutput (line:356), type='+type+',count = '+count+', error code ='+resp.error.code);
                 	appendPre(JSON.stringify(resp, null, 2));
                 	$('#resetBtn').removeClass('hidden');
             	  }
              } else {
                    var tbdy = document.getElementById('tableOut');
          		    var tr = document.createElement('tr');
          		    appendTd(tr,count+1);
        		    appendTd(tr,ticker);
          		    for (var j = 1; j < 10; j++) {
            	      if (((j==1)||(j==2)||(j==3)||(j==4)||(j==8)) &&(resp.response.result[0][j]!='N/A')){
          				  appendTd(tr,Math.round(resp.response.result[0][j]*100000)/1000+'%');
          			  }else if ((j==7)&&(resp.response.result[0][j]!='N/A')){
          				  appendTd(tr,Math.round(resp.response.result[0][j]*1000)/1000);
          			  }else{
          				  appendTd(tr,resp.response.result[0][j]);
          			  }

          		    }
          		    tbdy.appendChild(tr);
                    gettingOutput(type,fromDate,toDate,num,count+1,total);
            	  
              }
        });
       }
      }
      

      
      /**
       * Calls an Apps Script function validate the bulk table
       */
      function validateOutput(round,type,count,num) {
        
      if (round <= 0){
    	getScriptOutput(type,count);
      }else{
    	var request = {};
          
    	// appendPre('Validation Round Countdown:'+round);
    	
        if (type == 'allIndex'){
          	request = {
                      'function': 'validateAllIndexVolatility',
                      'parameters': [num]
                      };
          }else if (type == 'allStock'){
          	request = {
                      'function': 'validateAllStockVolatility',
                      'parameters': [num]
                      };
          }
        // Make the API request.
        var op = gapi.client.request({
            'root': 'https://script.googleapis.com',
            'path': 'v1/scripts/' + scriptId + ':run',
            'method': 'POST',
            'body': request
        });
        
        op.execute(function(resp) {
          
        	if (resp.error) {
        		 if ((resp.error.code == '3')||(resp.error.code == '-1')||(resp.error.code == '409')||(resp.error.code == '504')){
           		  //  appendPre('Retry!! validateOutput, type='+type+',num = '+num+', error code ='+resp.error.code);
           		  //  appendPre(JSON.stringify(resp, null, 2));
           		    setTimeout(function() { validateOutput(round,type,count,num); },timeout);
        		  }else if (resp.error.code == '401'){
           		    appendPre('Session timeout. Please refresh the browser and retry.');
           		    checkAuth();
             	  }else{
             		appendPre('Network error occurs! Please capture the screen, refresh the browser and retry.');
                   	appendPre('validateOutput (line:346), type='+type+',num = '+num+', error code ='+resp.error.code);
                 	appendPre(JSON.stringify(resp, null, 2));
                 	$('#resetBtn').removeClass('hidden');
             	  }
              } else {
            //var output = resp.response.result;
            	    validateOutput(round-1,type,count,num);
            	  
              }
        });
       }
      }
      
      
      /**
       * Calls an Apps Script function to list the folders in the user's
       * root Drive folder.
       */
      function getScriptOutput(type,num) {
        // Create an execution request object.
        var request = {
            'function': 'getVolatility',
            'parameters': [type,num]
            };

        // Make the API request.
        var op = gapi.client.request({
            'root': 'https://script.googleapis.com',
            'path': 'v1/scripts/' + scriptId + ':run',
            'method': 'POST',
            'body': request
        });
        
        op.execute(function(resp) {
          
        	if (resp.error) {
        		 if ((resp.error.code == '3')||(resp.error.code == '-1')||(resp.error.code == '409')||(resp.error.code == '504')){
           		//    appendPre('Retry!! getVolatility, type='+type+',num = '+num+', error code ='+resp.error.code);
           		//    appendPre(JSON.stringify(resp, null, 2));
           		    setTimeout(function() { getScriptOutput(type,num); },timeout);
        		  }else if (resp.error.code == '401'){
           		    appendPre('Session timeout. Please refresh the browser and retry.');
           		    checkAuth();
             	  }else{
             		appendPre('Network error occurs! Please capture the screen, refresh the browser and retry.');
                   	appendPre('getScriptOutput (line:391), type='+type+',num = '+num+', error code ='+resp.error.code);
                 	appendPre(JSON.stringify(resp, null, 2));
                 	$('#resetBtn').removeClass('hidden');
             	  }
              } else {
            var rowSet = resp.response.result;
            if (Object.keys(rowSet).length == 0) {
                appendPre('No results returned! Please validate your inputs and retry.');
                $('#resetBtn').removeClass('hidden');
            }else{
            	
                	  clearPre();
                	  $('#loading').toggleClass('hidden');
                	  appendPre('The Stock Volatility statistics:');
              
                	  var tbdy = document.getElementById('tableOut');
              
                	  for (var i = 0; i < 2; i++) {
                		  var tr = document.createElement('tr');
                		  for (var j = 1; j < 10; j++) {
                			  if ((((j==1)||(j==2)||(j==3)||(j==4)||(j==8))&&(i==1)) &&(rowSet[i][j]!='N/A')){
                				  appendTd(tr,Math.round(rowSet[i][j]*100000)/1000+'%');
                			  }else if ((j==7)&&(i==1)&&(rowSet[i][j]!='N/A')){
                				  appendTd(tr,Math.round(rowSet[i][j]*1000)/1000);
                			  }else{
                				  appendTd(tr,rowSet[i][j]);
                			  }

                		  }
                		  tbdy.appendChild(tr);
                	  }
            }
            $('#resetBtn').toggleClass('hidden');
            $('#exportBtn').toggleClass('hidden');
          }
        });
      }
      
      
      /**
       * Add stock / index list
       *
       * @param {String} to indicate stock list or index list.
       
      function getTickerList(type,dateFrom,dateTo,num) {

          var request = {};
          
          if (type == 'index'){
          	request = {
                      'function': 'getAllIndex'
                      };
          }else{
          	request = {
                      'function': 'getAllStock'
                      };
          }
          // Make the API request.
          var op = gapi.client.request({
              'root': 'https://script.googleapis.com',
              'path': 'v1/scripts/' + scriptId + ':run',
              'method': 'POST',
              'body': request
          });
          
          var results = {};
          op.execute(function(resp) {
            
          	if (resp.error && resp.error.status) {
          		if (resp.error.code == '409'){
          			  appendPre('retry!! getTickerList, type= '+type);
          		   getTickerList(type,dateFrom,dateTo,num);
          		}else{
                   appendPre('Network issue 3:');
              	   appendPre(JSON.stringify(resp, null, 2));
          		}
            } else if (resp.error) {
                  var error = resp.error.details[0];
                  appendPre('The browser session is timeout. Please reload and try again.');
            } else {
                	var rowSet = resp.response.result;
                    if (Object.keys(rowSet).length > 0) {
                    	
                    	tickerList = rowSet;
                    	appendPre("Total number of tickers:"+tickerList.length);
                    	
                    	var tbdy = document.getElementById('tableOut');
                    	var tr = document.createElement('tr');
                        appendTd(tr,"No.");
                        appendTd(tr,"Ticker");
                        appendTd(tr,"Average");
                        appendTd(tr,"Standard deviation");
                        appendTd(tr,"Variance");
                        appendTd(tr,"Occurrences");
                        appendTd(tr,"Comparison Base");
                        appendTd(tr,"Test statistics");
                        appendTd(tr,"p-value");
                        appendTd(tr,"Result");
                        
                        tbdy.appendChild(tr);
                    	round=1;
                        loopFunction(0,type,dateFrom,dateTo,num);
                    }
                    
                }
          });
        
        }
        */

      /**
       * Append a pre element to the body containing the given message
       * as its text node.
       *
       * @param {string} message Text to be placed in pre element.
       */
      function appendPre(message) {
        var pre = document.getElementById('output');
        var textContent = document.createTextNode(message + '\n');
        pre.appendChild(textContent);
      }
      
      /**
       * Append a td element to the table row containing the given message
       * as its text node.
       *
       * @param {tr} the tr element to append the td.
       * @param {string} message Text to be placed in td element.
       */
      function appendTd(tr,message) {
          var td = document.createElement('td');
          var textContent = document.createTextNode(message + '\n');
          td.appendChild(textContent);
          tr.appendChild(td);
        }
      
      /**
       * Clear all the child of the pre and table element
       */
      function clearPre() {
          var pre = document.getElementById('output');
          var tbl = document.getElementById('tableOut');
          while (pre.firstChild) {
        	  pre.removeChild(pre.firstChild);
          }
          while (tbl.firstChild) {
        	  tbl.removeChild(tbl.firstChild);
          }
        }
      
      
      /**
       * Return the row number depends on the type
       */
      function returnNum(type,weekday) {

    	  if(type == 2){
			  if ($('#compare1').is(':checked')){
				  return 96;
			  }else if($('#compare2').is(':checked')){
				  return 99;
			  }else if($('#isWeekly').is(':checked')){
			  
				  if (weekday==0){
					  return 81;
				  }else{
					  return weekday*2+83;
				  }
    			  
			  }else{
				  $('#isWeekly').prop('checked', true);
				  if (weekday>0){
					  return weekday*2+83;
				  }else{
					  return 81;
				  }
			  }
		  }else if(type == 3){
			  if (weekday==0){
				  return 59;
			  }else{
				  return weekday*2+61;
			  }
		  }else if(type == 1){
			  if ($('#compare1').is(':checked')){
				  return 40;
			  }else if($('#compare2').is(':checked')){
				  return 43;
			  }else if($('#compare3').is(':checked')){
				  return 46;
			  }else if($('#compare4').is(':checked')){
				  return 49;
			  }else if($('#isWeekly').is(':checked')){
			  
				  if (weekday==0){
					  return 24;
				  }else{
					  return weekday*2+27;
				  }
    			  
			  }else{
				  $('#isWeekly').prop('checked', true);
				  if (weekday>0){
					  return weekday*2+61;
				  }else{
					  return 24;
				  }
			  }
		  }

    	  
        }
      
      
      

      /**
       * Looping till the end.
       
      
      function loopFunction(current,type,fromDate,toDate,num) {
        
    	if (current>=tickerList.length){
    		
            $('#resetBtn').toggleClass('hidden');
            $('#exportBtn').toggleClass('hidden');
            $('#loading').addClass('hidden');
    		return;
    	}
    	

        // Create an execution request object.
        var request = {};
        var ticker = tickerList[current];
        
        if (type == 'index'){
        	request = {
                    'function': 'getIndexVolatility',
                    'parameters': [ticker,fromDate,toDate,num]
                    };
        }else{
        	request = {
                    'function': 'getStockVolatility',
                    'parameters': [ticker,fromDate,toDate,num]
                    };
        }
        
        // Make the API request.
        var op = gapi.client.request({
            'root': 'https://script.googleapis.com',
            'path': 'v1/scripts/' + scriptId + ':run',
            'method': 'POST',
            'body': request
        });
        
        op.execute(function(resp) {
          if (resp.error) {
        	  if ((resp.error.code == '3')||(resp.error.code == '-1')||(resp.error.code == '409')||(resp.error.code == '504')){
        		    appendPre('retry!! loopFunction, current = '+current+',type='+type+',num = '+num+', error code ='+resp.error.code);
        		    appendPre(JSON.stringify(resp, null, 2));
        		  setTimeout(function() { loopFunction(current,type,fromDate,toDate,num); },timeout);
        	  }else{
        		  appendPre('The browser session is timeout. Please reload and try again.');
        		  appendPre('Current row:'+current+'; Ticker:'+ticker);
        		  appendPre(JSON.stringify(resp, null, 2));
        	  }
          } else {
        	  var rowSet = resp.response.result;

        	  if (Object.keys(rowSet).length > 0) {

        				  var tbdy = document.getElementById('tableOut');
                          var tr = document.createElement('tr');
                          appendTd(tr,current+1);
                          appendTd(tr,tickerList[current]);
                          for (var j = 1; j < 9; j++) {
                                      if (((j==1)||(j==2)||(j==3)||(j==7))&&(rowSet[0][j]!='N/A')){
                                    	  appendTd(tr,Math.round(rowSet[0][j]*100000)/1000+'%');
                                          
                                      }else if ((j==6)&&(rowSet[j]!='N/A')){
                                    	  appendTd(tr,Math.round(rowSet[0][j]*1000)/1000);
                                          
                                      }else{
                                    	  appendTd(tr,rowSet[0][j]);
                                      }
                          }
                          tbdy.appendChild(tr);
                          round=1;
                          setTimeout(function() { loopFunction(current+1,type,fromDate,toDate,num); },timeout);
                  
                }
        	  
        	  
          }
        });
      }
      
      */