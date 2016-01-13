/*! JQuery function for volatility program - v1 - 12/13/2015 */


    $(document).ready(function(){
    			
    	var date = new Date();
    	date.setDate(date.getDate() - 1);
    	var yesterday = date.getFullYear()+'-' + pad(date.getMonth()+1) + '-'+ pad(date.getDate());
    	
    	var toDate = $('#to-date');
    	toDate.val(yesterday);
    	
    	
    			$( "#ticker" ).change(function() {
    				if( $(this).val() ) {
    					$('#errMsg').addClass('hidden');
    				}
    			});
    	
    		    $('#type1').click(function(){
    		    	$("#ticker").prop("disabled", false);
    		    	$("#isWeekly").prop("disabled", false);
    		    	if(!$('#isWeekly').is(':checked')){
    			   	   $("#compare1").prop("disabled", false);
    				   $("#compare2").prop("disabled", false);
    			   	   $("#compare3").prop("disabled", false);
    			       $("#compare4").prop("disabled", false);
    		        }
    			});
    		    $('#type2').click(function(){
    		    	$("#ticker").prop("disabled", false);
    		    	$("#isWeekly").prop("disabled", false);
    		    	if(!$('#isWeekly').is(':checked')){
    			   	   $("#compare1").prop("disabled", false);
    				   $("#compare2").prop("disabled", false);
    		        }
    				$("#compare3").prop("disabled", true);
    				$("#compare4").prop("disabled", true);
    				$("#compare3").prop("checked", false);
    				$("#compare4").prop("checked", false);
    			});
    		    $('#type3').click(function(){
    		    	   $("#ticker").prop("disabled", false);
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
    				});
    		    $('#type4').click(function(){
    		    	$("#ticker").val("All Stocks");
    		    	$("#ticker").prop("disabled", true);
 				    $("#isWeekly").prop("disabled", false);
    		    	if(!$('#isWeekly').is(':checked')){
    			   	   $("#compare1").prop("disabled", false);
    				   $("#compare2").prop("disabled", false);
    			   	   $("#compare3").prop("disabled", false);
    			       $("#compare4").prop("disabled", false);
    		        }
    			});
    		    $('#type5').click(function(){
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
    			});
    		    
    		    
    		    $('#isWeekly').change(function(){
    				   $("#weekday").prop("disabled", !$(this).is(':checked'));
    				   if($('#type1').is(':checked')){
    				   	 $("#compare1").prop("disabled", $(this).is(':checked'));
    				  	 $("#compare2").prop("disabled", $(this).is(':checked'));
    				  	 $("#compare3").prop("disabled", $(this).is(':checked'));
    				  	 $("#compare4").prop("disabled", $(this).is(':checked'));
    				   }else if($('#type2').is(':checked')){
    				   	 $("#compare1").prop("disabled", $(this).is(':checked'));
    				  	 $("#compare2").prop("disabled", $(this).is(':checked'));
    				   }else if($('#type4').is(':checked')){
    					 $("#compare1").prop("disabled", $(this).is(':checked'));
      				  	 $("#compare2").prop("disabled", $(this).is(':checked'));
      				  	 $("#compare3").prop("disabled", $(this).is(':checked'));
      				  	 $("#compare4").prop("disabled", $(this).is(':checked'));
    				   }else if($('#type5').is(':checked')){
    				   	 $("#compare1").prop("disabled", $(this).is(':checked'));
    				  	 $("#compare2").prop("disabled", $(this).is(':checked'));
    				   }
    				   
    				   if($(this).is(':checked')){
    					   $("#compare1").prop("checked", false);
    					   $("#compare2").prop("checked", false);
    					   $("#compare3").prop("checked", false);
    					   $("#compare4").prop("checked", false);
    			    	}
    				});
    	});

    		jQuery.validator.setDefaults({
      			debug: false,
      			success: "valid"
    		});
    		$( "#inputform" ).validate({
      			rules: {
        			ticker: {
          				required: true
        			}
      			}
    		});
    