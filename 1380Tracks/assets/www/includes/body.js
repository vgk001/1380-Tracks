/**
 * @author Prokarma
 */

function collapseContent(RouteId,FromId,ButtonIndex)
{
	document.write("<div data-role='collapsible' id='"+RouteId+"' >");
	document.write("<h3>"+FromId+" ⇔ <span style=' text-transform:capitalize;' >"+RouteId +"</span></h3>");
	document.write("<fieldset class='ui-grid-b'>");
	document.write("<div id='"+RouteId+"From' class='ui-block-a'>");
	document.write("<select name='City' id='select"+RouteId+"From'  data-inline='true' class='"+RouteId+"Cls' data-mini='true' >");
	document.write("<option value='null'> Starting Point</option>");
	document.write("</select>");
	document.write("</div>");
	document.write("<div id='"+RouteId+"To' class='ui-block-b'>");
	document.write("<select name='City' id='select"+RouteId+"To' data-inline='true' class='"+RouteId+"Cls' data-mini='true' >");
	document.write("<option value='null'>Destination</option>");
	document.write("</select>");
	document.write("</div>");
	document.write("<div  class='ui-block-c'>");
	document.write("<select name='hours' id='time"+RouteId+"' data-inline='true' data-mini='true' >");
	document.write("<option value='1'>Next Train</option>");
	document.write("<option value='4'>Trains in Next 4 hours</option>");
	document.write("<option value='8'>Trains in Next 8 hours</option>");
	document.write("<option value='12'>Trains in Next 12 hours</option>");
	document.write("<option value='24'>24 hour Train Shedule</option>");
	document.write("</select>");
	document.write("</div>");
	document.write("<div class='ui-block-d'>");
	document.write("<button type='submit' id='submit"+ButtonIndex+"' data-inline='true' class='submitButton' data-mini='true'>");					
	document.write("Submit");
	document.write("</button>");
	document.write("</div>");
	document.write("</fieldset>");
	document.write("</div>");
									
}
