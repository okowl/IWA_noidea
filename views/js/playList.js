/**
 * @author Olga Kiseleva 2017136
 * Part of the code were borrowed from Project https://github.com/mikhail-cct/CA1-In-class-Demo
 * It will be commented in order, to demonstrate the understanding of the porcesses
 * that happens inside of methods.
 */

 /**
  * Mehtod will highlight all tracks in the playlist, that has an English as main lyrics language
  * @param {*} idTable - id of the item in the table
  * @param {*} engLyrics - if this parameter is true -> the row will be higlighted
  */


function highlightVegetarian(idTable, engLyrics) {

	var i=0;
	var oTable = document.getElementById(idTable);

	var oTBODY = oTable.getElementsByTagName('TBODY')[0];
	var aTRs = oTBODY.getElementsByTagName('TR');
											
    //loop through the table in order to find all rows, with all elements that 
    //has attribute "English" -> set as true 									
	for (i=0; i < aTRs.length; i++) {
		if (aTRs[i].getAttribute('english') && aTRs[i].getAttribute('english') == "true") {
			if (engLyrics){
				aTRs[i].style.backgroundColor = "lightGreen";
			} else {
				aTRs[i].style.backgroundColor = "";
			};
		};
	};
};

											// Utility function for getting the parent tag of a given tag
											// but only of a certain type (i.e. a TR, a TABLE, etc.)
function getParentTag(oNode, sParentType) {
	var oParent = oNode.parentNode;
	while (oParent) {
		if (oParent.nodeName == sParentType)
			return oParent;
		oParent = oParent.parentNode;
	};
	return oParent;
};

