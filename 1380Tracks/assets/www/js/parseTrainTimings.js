(function($)
        {
            $.fn.parse=function(furl_1,tableName)
            {
                
                var db=openDatabase("Train_Timing","1.0","local train timings of Chennai",4*1024*1024);
               	var totalIndexOfTable=0;
               	var typeIndex=0;
                	$.ajax
                    ({
                       type:"GET",
                       dataType:"json",
                       url:furl_1,
                       async:"false",
                       success:function(json)
                       {
                       		
                       		var stationNames=" ";
                       		var insStationNames=" ";
                       		var trainNumbers=new Array;
                       		var trainTypes=new Array;
                       		var timingsTrain="";
                       		var rowCount;
                       		var columCount;
                       		$.each(json,function(entryIndex,entry)
                       		{
                       				
                       			$.each(entry,function(subEntryIndex,subEntry)
                       			{
                       				if(entryIndex==0)
                       				{
                       					if(subEntryIndex>1)
                       					{
                       						if(subEntry!="")
                       						{
                       							trainNumbers[totalIndexOfTable]=subEntry;
                       							totalIndexOfTable++;	
                       						}
                       						
                       						
                       					}
                       				}
                       				
                       				if(entryIndex==1)
                       				{
                       					if(subEntryIndex>1)
                       					{
                       						trainTypes[typeIndex]=subEntry;
                       						typeIndex++;
                       					}
                       					
                       				}
                       				
                       				
                       				if(entryIndex>1)
                       				{
                       					
                       					if(subEntryIndex==1)
                       					{
                       						stationNames=stationNames+","+subEntry+" varchar(10)";
                       						insStationNames=insStationNames+","+subEntry;
                       					}
                       					
                       				}
                       				
                       				rowCount=subEntryIndex;	
                       			});
                       		   columCount=entryIndex;
                       			
                       		});
                       		var timeVal="";
                       	    dataHandling(totalIndexOfTable,stationNames,trainNumbers,trainTypes);
                       		insStationNames=insStationNames.substr(2,insStationNames.length);
         					for(var j=3;j<=rowCount;j++)
                       		{
	                       			
								 for(var i=2;i<=columCount;i++)
								 {
									 timeVal=timeVal+json[i][1]+"='"+json[i][j]+"',";
									 
									 
								 }
								 
   								populateTrainTimings(insStationNames,j-3,timeVal.slice(0,-1));
   								timeVal="";
                       		}
                       		
                       		
                       },
                       error:function(json)
                       {
                           
                       } 
                            
                    });
                    
                    
                  function dataHandling(totalIndexOfTable,stationNames,trainNumbers,trainTypes)
                  {
                  	

						db.transaction(function(query)
						{
							var sqlQuery="DROP TABLE "+tableName+";";
							query.executeSql(sqlQuery,undefined,function(e){},function(query,error){ console.log("error:"+error.message); });
							
						});
						
						db.transaction(function(query)
	                	{
	               			
	               			var finalSQL="CREATE TABLE "+tableName+"(id int(100),TrainNumber varchar(10),TrainTypes varchar(10)"+stationNames+");";
	               			
	               			query.executeSql(finalSQL,undefined,function(e){},function(query,error){ console.log("error :"+error.message)});		
	                		
	                	});
	                	
	                	$.each(trainNumbers,function(index,object)
	                	{
								
								db.transaction(function(query)
								{
									query.executeSql("INSERT INTO "+tableName+"(id,TrainNumber,TrainTypes)values('"+index+"','"+object+"','"+trainTypes[index]+"')",undefined,
									function(){},function(query,error){ console.log("error :"+error.message)});	
								});
	                		                		
	                	});
	                	
	                	
                  	
                  }
                  function populateTrainTimings(insStationNames,id,timeval)
                  {
                  		db.transaction(function(query)
                  		{
                  			mainQuery="UPDATE "+tableName+" SET "+timeval+"where id="+id;
                  			query.executeSql(mainQuery,undefined,function(){},function(query,error){ console.log("error :"+error.message)});
                  			console.log("updating");
                  			var val = $('#progressbar').val();
                  			$('#progressbar').attr('value', function(i, val) 
                  			{
							  			if(val==826)
										{
											console.log("h");
											$("#update").popup("close");
											$('#upd').show();		
											window.location = "index.html";
											return val + 1 ;
										}
							  			return val + 1 ;
							});
							var st=(val/827) *100+"";
							st=round(st);
							$('#per').html(st+"%" );							
                  		});
                  }
                  function round(str)
                  {
                  	var string=str+"";
                  	var finalstr="";
                  	for(i=0;i<string.length;i++)
                  	{
                  		if(string[i]==".")
                  		{
                  			break;
                  		}
                  		else
                  		{
                  			finalstr=finalstr+string[i];
                  		}
                  		
                  	}
                  	return finalstr;
                  	
                  }
                	
				   
            }
    
        }
        
)(jQuery)

