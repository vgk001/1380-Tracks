//constants

var path = "JSONs/";
var reverseRoute = "rev";
var fileExtension = ".json";

var tambaramRoute = "tambaram";
var tiruttaniRoute = "tiruttani";
var sullurupettaRoute = "sullurupetta";
var velacheryRoute = "velachery";
var chengalpattuRoute = "chengalpattu";
var tirumalpurRoute = "tirumalpur";

$("document").ready(function()
 {
	$("#info-btn").click(function()
			{
				$("#info").popup("open");
			});
	
	$("#upd").click(function() {

		//train Routes
		$('#upd').hide();
		$("#update").popup("open");

		$().parse(path + tambaramRoute + "/" + tambaramRoute + fileExtension, tambaramRoute);
		$().parse(path + tambaramRoute + "/" + tambaramRoute + reverseRoute + fileExtension, tambaramRoute + reverseRoute);

		$().parse(path + tiruttaniRoute + "/" + tiruttaniRoute + fileExtension, tiruttaniRoute);
		$().parse(path + tiruttaniRoute + "/" + tiruttaniRoute + reverseRoute + fileExtension, tiruttaniRoute + reverseRoute);

		$().parse(path + sullurupettaRoute + "/" + sullurupettaRoute + fileExtension, sullurupettaRoute);
		$().parse(path + sullurupettaRoute + "/" + sullurupettaRoute + reverseRoute + fileExtension, sullurupettaRoute + reverseRoute);

		$().parse(path + velacheryRoute + "/" + velacheryRoute + fileExtension, velacheryRoute);
		$().parse(path + velacheryRoute + "/" + velacheryRoute + reverseRoute + fileExtension, velacheryRoute + reverseRoute);

		$().parse(path + chengalpattuRoute + "/" + chengalpattuRoute + fileExtension, chengalpattuRoute);
		$().parse(path + chengalpattuRoute + "/" + chengalpattuRoute + reverseRoute + fileExtension, chengalpattuRoute + reverseRoute);

		$().parse(path + tirumalpurRoute + "/" + tirumalpurRoute + fileExtension, tirumalpurRoute);
		$().parse(path + tirumalpurRoute + "/" + tirumalpurRoute + reverseRoute + fileExtension, tirumalpurRoute + reverseRoute);

	});

	$(".submitButton").click(function() {

		switch(this.id) {
			case "submit1":
				validatorPopulator("tiruttani");
				break;
			case "submit2":
				validatorPopulator("tambaram");
				break;
			case "submit3":
				validatorPopulator("sullurupetta");
				break;
			case "submit4":
				validatorPopulator("velachery");
				break;
			case "submit5":
				validatorPopulator("chengalpattu");
				break;
			case "submit6":
				validatorPopulator("tirumalpur");
				break;

		}
	});

	//function to validate

	function validatorPopulator(RouteId) {
		var db = openDatabase("Train_Timing", "1.0", "local train timings of Chennai", 5 * 1024 * 1024);

		var from = $("#select" + RouteId + "From").val();
		var to = $("#select" + RouteId + "To").val();

		var fromId = $("#select" + RouteId + "From").find("option:selected").attr("id");
		var toId = $("#select" + RouteId + "To").find("option:selected").attr("id");
		var nextT=$("#time"+RouteId).val();
		nextT=parseInt(nextT);
		var currentTime;
		var nextTime;
		console.log(fromId+" "+toId);
		fromId=fromId++;
		toId=toId++;
		if (fromId > toId) {
			RouteId = RouteId + reverseRoute;
			
		}
		
		if(nextT==24)
		{
			myQuery="SELECT TrainTypes,"+from+","+to+" FROM "+RouteId+";";
		}
		else
		{
			currentTime=curTime(0);
			nextTime=curTime(nextT);
			myQuery="SELECT TrainTypes,"+from+","+to+" FROM "+RouteId+" WHERE "+from+" BETWEEN '"+currentTime+"' AND '"+nextTime+"';";				
								
		}
		if (from != "null" && to != "null") {

			if (from == to) {
				$("#alertcontent").html("You gotta be kidding me!<br/>Just Turn around you are there");
				$("#alert").popup("open");
			} else {

				showUserResponse(db, myQuery, from, to);

			}

		} else if ((from == "null" && to != "null")) {

			$("#alertcontent").html("select starting point");
			$("#alert").popup("open");

		} else if ((from != "null" && to == "null")) {
			$("#alertcontent").html("Select Destination");
			$("#alert").popup("open");
		} else {
			$("#alertcontent").html("Select Stations");
			$("#alert").popup("open");
		}

	}

	//function to populate query results

	function showUserResponse(db, myQuery, from, to) {

		$("#fetchhead").html(from + "<br/>to<br/>" + to );

		html = " <select name=' ' id='resul' >";
		db.transaction(function(query) {
			query.executeSql(myQuery, [], function(query, output) {
				
				console.log(myQuery);
				if(output.rows.length==0)
				{
					html+="<option>No trains Available at this hour</option>";
				}
				else
				{	
					var i=0;
					var emptyRowFlag=0;
					var filledRowFlag=0;
					var row;
					while(1)
					{
						i++;
						row = output.rows.item(i-1);
						var resultFrom = row[from];
						var resultTo = row[to];
						var trnType=row["TrainTypes"];
						if (resultFrom != "" && resultTo != "") 
						{
	
							
							html += "<option>"+trnType+" " + resultFrom + " ~~~ " + resultTo + "</option>";
							filledRowFlag++;
	
						}
						else
						{
							emptyRowFlag++;
						}
						if(i==output.rows.length)
						{
							break;
						}
					
					}
					if(emptyRowFlag>0 && filledRowFlag==0)
					{
						html+="<option>No trains Available at this hour</option>";
					}
					
				}
				
				$("#fetchResult").html(html);

				$('#resul').scroller({
					preset : 'select',
					theme : 'default',
					display : 'inline',
					mode : 'scroller'
				});

				$("#fetch").popup("open");

			}, function(query, error) {
				console.log("error" + error.message);
			});
		});
	}
	function curTime(nextTimeHours)
		{
			var d=new Date();
			var hours=d.getHours()+nextTimeHours;
			var mins=d.getMinutes();
			var time=hours+":"+mins;
			return time;
							
		}				

}); 