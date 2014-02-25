(function (ns) {
	/* gspShowHide: pass in name of div that is the button and name of div you want to show/hide */
	ns.gspShowHide = function (buttonClass, targetClass, hoverClass, clickClass) {		
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
			
	},//close ns.gspShowHide

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
	
	/* stuff done to make the Quick Launch a collapse/expand one */
	ns.makeQLDropdown = function(root) {
		var rootUL = $("." + root);
		
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

	}

	
}//close anonymous function



//the below creates a namespace, PS (for PluralSight) and attaching it to our main window
//we're setting it to itself, if it exists, or to a blank object, {}
/*this allows us to use the namespace in many different files and not have to worry about the order in which
* the files are listed in the HTML file*/
(window.GSP = window.GSP || {}));
