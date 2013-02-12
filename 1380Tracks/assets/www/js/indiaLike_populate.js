(function($)
{
		$.fn.populate=function(tableName,className)
		{
			var htmlString="";
			var indexId=0;
			var db=openDatabase("Train_Timing","1.0","local train timings of Chennai",5*1024*1024);
			db.transaction(function(query)
			{
				var mainQuery= "SELECT * FROM "+tableName+" where id='"+0+"'"; 
				query.executeSql(mainQuery,
					[],
					function(query,output)
					{
						for(var i=0;i<output.rows.length;i++)
						{
							var row=output.rows.item(i);
							$.each(row,function(index,object)
							{
								if(index!="id" && index!="TrainNumber" && index!="TrainTypes")
								{
									htmlString=htmlString+"<option value='"+index+"' id='"+indexId+"'>"+index+"</option>";
									indexId++;
								}	
							});
						}
						$(className).append(htmlString);
							$("select").selectmenu("refresh", true);
					},
					function(query,error)
					{
						console.log("error"+error.message);
					});
				
			});
		}
}
	
)(jQuery);
