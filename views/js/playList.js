
										// This function either turns on or off the row highlighting for vegetarian
										// items (depending on the value of bShowVeg)
function highlightVegetarian(idTable, bShowVeg) {
										// if bShowVeg is true, then we're highlighting vegetarian
										//	meals, otherwise we're unhighlighting them.
	var i=0;
	var oTable = document.getElementById(idTable);

	var oTBODY = oTable.getElementsByTagName('TBODY')[0];
	var aTRs = oTBODY.getElementsByTagName('TR');
											// walk through each of the table rows and see if it has a 
											// "vegetarian" attribute on it.
	for (i=0; i < aTRs.length; i++) {
		if (aTRs[i].getAttribute('vegetarian') && aTRs[i].getAttribute('vegetarian') == "true") {
			if (bShowVeg){
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

