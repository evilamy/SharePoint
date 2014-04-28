(function (ns) {

	ns.adminOnly = function(ownerGroup, contribGroup) {
		jQuery().SPServices({
  			operation:"GetGroupCollectionFromUser",
  			userLoginName:jQuery().SPServices.SPGetCurrentUser(),
  			async:false,
  			completefunc: function(xData, Status) {
			   if(jQuery(xData.responseXML).find("Group[Name='" + ownerGroup + "']").length==1 || jQuery(xData.responseXML).find("Group[Name='" + contribGroup + "']").length==1)
			   {
			    jQuery('.adminOnly').show();
			   }
  			}
 		}); //close spServices
	},

	// collapseExapandColorBoxVert: pass in name of div that is the button, name of CHILD DIV you want to show, and name of CHILD DIV to highlight
	ns.collapseExpandColorBoxVert = function (buttonClass, targetClass) {		
		var button = $('.' + buttonClass);
		var target = '.' + targetClass;

		button.hover(function() {
			origBG = $(this).css('background-color');
			origText = $(this).css('color');
			$(this).css({backgroundColor:getBG($(this)), color:getColor($(this))});
		}, function() {
			$(this).css({backgroundColor:origBG, color:origText});
		});

		button.click(function() {
			var targetDiv = $(this).next(target);
			if(targetDiv.hasClass('expanded')) {
			}
			else {
				closeOpenDivs();
				deselectHeader();
				targetDiv.slideToggle('fast');
				targetDiv.addClass('expanded');
				$(this).css({'font-weight':'bold'});
				$(this).css({'border-bottom-width':'3px'});
			}			
		});
		
		function closeOpenDivs() {
			$(target).each(function() {
				if($(this).hasClass('expanded')) {
					$(this).removeClass('expanded');
					$(this).slideToggle('fast');
				}
			});
		}
		
		function deselectHeader() {
			button.each(function() {
				$(this).css({'font-weight':'normal'});
				$(this).css({'border-bottom-width':'1px'});
			});
		}
								
		function getBG(myObject) {
			var hoverColor = myObject.css('border-top-color');
			return hoverColor;
		}
				
		function getColor(myObject) {
			var hoverText = myObject.css('background-color');
			return hoverText;
		}
	},//close ns.collapseExapandColorBoxVert

		
	/* collapseExanpandOnCick: pass in name of div that is the button and name of div you want to show/hide */
	ns.collapseExpandOnClick = function (buttonClass, targetClass, hoverClass, clickClass) {		
		var button = $("." + buttonClass);
		var target = $("." + targetClass);
		var hover = hoverClass;
		var clicked = clickClass;
		
		//button's click event
		button.click(function() {
			target.toggle('600');
			button.toggleClass(clicked)
		});
		
		//button's hover event
		button.hover(function() {
			button.addClass(hover);
		}, function() {
			button.removeClass(hover);
		});			
	},//close ns.collapseExpandOnClick
	
	
	// collapseExanpandOnHover: pass in name of div that is the button, name of CHILD DIV you want to show, and name of CHILD DIV to highlight
	ns.collapseExpandOnHover = function (buttonClass, targetClass, hoverClass) {		
		var button = $('.' + buttonClass);
		var target = '.' + targetClass;
		var hover = '.' + hoverClass;

		button.hover(function() {
			hoverDiv = $(this).children(hover);	
			origBG = hoverDiv.css('background-color');
			origText = hoverDiv.css('color');
			$(this).children(target).stop().slideToggle('fast');
			hoverDiv.css({backgroundColor:getHoverBG(hoverDiv), color:getHoverText(hoverDiv)});
		}, function() {
			$(this).children(target).stop().slideToggle('fast');
			hoverDiv.css({backgroundColor:origBG, color:origText});
		});
		
		function getHoverBG(myObject) {
			var hoverColor = myObject.css('border-top-color');
			return hoverColor;
		}
				
		function getHoverText(myObject) {
			var hoverText = myObject.css('background-color');
			return hoverText;
		}
	},//close ns.collapseExpandOnHover
	

	
		
	/* formatNestedWebPart: send this function the name of a webPartDiv (ms-webpart-titletext, for example) and the name of a parent div that has a left border.
	The child div will be given the parent's left border color*/
	ns.formatNestedWebPart = function(webPartDiv, parentWithBorder) {
		var webPart = $("." + webPartDiv);
		var parentDiv = "." + parentWithBorder; //note that this is a string and not an object.
		webPart.each(function(index) {
			if ($(this).parents(parentDiv))
				{	
					borderColor = $(this).parents(parentDiv).css('border-left-color');
					textColor = $(this).parents(parentDiv).css('color');
					$(this).css({'borderColor':borderColor, 'color':textColor});
					$(this).addClass('colorBoxHeader');
				}
		});	
	},	
		
	ns.getHexColor = function(rgbColor) {
    	var rgb = rgbColor
    	rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    	function hex(x) {return ("0" + parseInt(x).toString(16)).slice(-2);}
    	return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
	},
	
	
	/* stuff done to make the Quick Launch a collapse/expand one */
	ns.qlDropdown = function() {
		var rootUL = $("div[id$='_V4QuickLaunchMenu']").find("ul[id$='_RootAspMenu']");
		
		//if the first LI off the root has subitems, add the arrow button//
		rootUL.children('li').each(function(index) {
			if ($(this).find('ul').length > 0) {
				if($(this).children('a').length > 0) {
					relevantTag = 'a';
					$(this).children('a').append('<a class="arrowButton forLinks" href="javascript:void(0)"><i class="fa fa-plus-circle"></i></a');
					$(this).children('ul').css("display", "none");
				}
				else if ($(this).children('span').length > 0) {
					relevantTag = 'span';
					$(this).children('span').append('<a class="arrowButton forStatic" href="javascript:void(0)"><i class="fa fa-plus-circle"></i></a');
					$(this).children('ul').css("display", "none");
				}
			}
		});		
		$('.arrowButton.forLinks').click(function() {
			var subitems = $(this).parent('a').parent('li').children('ul');
			$(this).children('i').toggleClass('fa-minus-circle')
			subitems.toggle('600');
			
			return false; /*keeps the page from refreshing*/
		});		
		$('.arrowButton.forStatic').click(function() {
			var subitems = $(this).parent('span').parent('li').children('ul');
			$(this).children('i').toggleClass('fa-minus-circle');
			subitems.toggle('600');
			
			return false; /*keeps the page from refreshing*/
		});
	},//close qlDropdown

	
	/*scaleAndShow: pass in name of div that holds the non-hover and hover divs (must be ID and not class), the div you want want to scale, 
	the div that's hidden that you want to show, how much you want to scale, and any adjustment that you may need to include in the case of Font Awesome scaling
	causing the bottom to lift up*/
	ns.scaleAndShow = function(container, scaleMe, showMe, scaleThisMuch, adjustBottom) {
		var container = $("#" + container);
		var scaleMe = $("." + scaleMe);
		var showMe = $("." + showMe);
		var origFontSize = scaleMe.css("font-size");
		var origBottom = scaleMe.css("bottom");
		var scaledFontSize = (parseInt(origFontSize) * scaleThisMuch) + 'px';
		var scaledBottom = parseInt(origBottom) - adjustBottom + 'px';
		
		container.hover(function() {
			showMe.stop().animate({opacity:'1.0'}, 400);
			scaleMe.stop().animate({fontSize : scaledFontSize, bottom : scaledBottom });
			}, function() {
			showMe.stop().animate({opacity:'0.0'}, 400);
			scaleMe.stop().animate({fontSize : origFontSize, bottom : origBottom });
		});
	},//close ns.scaleAndShow
	
	/*WhoOwnsSite: pass in nothing, and use a series of REST API calls to populate the "Who Owns This Site?" area above the QL */
	ns.WhoOwnsSite = function() {
		
			var web = _spPageContextInfo.webAbsoluteUrl;
			getAssocOwnerGroupNumber();
						
			function getAssocOwnerGroupNumber(siteTitle) {
				$.ajax({
					url: web + "/_api/web/AssociatedOwnerGroup",
					type: "GET",
					headers: {
						"accept": "application/json;odata=verbose",
					},
					success: function (data) {
								var groupID = data.d.Id;
								getMembersByGroupId(groupID);
					},
					error: function (error) {
						alert("TROUBLE! Getting Owner Group Number: " + JSON.stringify(error));
					}
				});
			}//close getOwnerGroupNumber
			
			function getMembersByGroupId(groupID) {
				$.ajax({
					url: web + "/_api/web/sitegroups(" + groupID + ")/Users",
					type: "GET",
					headers: {
						"accept": "application/json;odata=verbose",
					},
					success: function (data) {
						var message;
						$.each(data.d.results, function(index, user) {
							var userId= user.Id;
							getMemberNameById(userId);
						});
					},
					error: function (error) {
						alert("TROUBLE! Getting Group Members " + JSON.stringify(error));
					}
				});
			}//close getMembersByGroupID
			
			function getMemberNameById(memberID) {
				$.ajax({
					url: web + "/_api/web/getUserById(" + memberID + ")",
					type: "GET",
					headers: {
						"accept": "application/json;odata=verbose",
					},
					success: function (data) {
						var userName;
						userName = data.d.Title;
						userEmail = data.d.Email;
						userLoginName = data.d.LoginName;
						sniphere = userLoginName.indexOf('|');
						userLoginName = userLoginName.substring(sniphere+1);
						if (userName != 'System Account') {
							$('.ownersList').append("<li class='static'><a href='http://na-tstsp-01:88/person.aspx?accountname=" + userLoginName + "' target='_blank' class='static menu-item ms-core-listMenu-item ms-displayInline ms-navEdit-linkNode'>" + userName + "</a></li>");
						}
					},
					error: function (error) {
						alert("Trouble Getting Member Name " + JSON.stringify(error));
					}
				});		
			}//close GetMemberNameById
	}	//close WhoOwnsSite
				
}//close anonymous function



//the below creates a namespace, PS (for PluralSight) and attaching it to our main window
//we're setting it to itself, if it exists, or to a blank object, {}
/*this allows us to use the namespace in many different files and not have to worry about the order in which
* the files are listed in the HTML file*/
(window.GSP = window.GSP || {}));
