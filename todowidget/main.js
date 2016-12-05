(function( window ) {

// require widget css
	function addWidgetStyles(options) {
		var link = document.createElement("link");
		link.rel="stylesheet";

		for (var linkOption in options) {
  			link[linkOption] = options[linkOption];
		}
		document.getElementsByTagName("head")[0].appendChild(link);
	}
	
	addWidgetStyles({ 
		href: "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css", 
		crossorigin: "anonymous" 
	});
	addWidgetStyles({ href: "todowidget/css/styles.css" });

// create widget templates
	var wigetTpl = document.createElement("div");
		wigetTpl.classList.add("container");
	    wigetTpl.innerHTML = '<div class="row">' +
    			'<div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">' +
      				'<div class="todos">' +
          				'<h1 id="todos-header">{{todos title}}</h1>' +

          				'<div class="row todos-new">' +
            				'<div id="div-new-task" class="col-xs-8 col-sm-8 col-md-8">' +
              					'<input id="new-task" class="form-control" type="text" placeholder="Add todo-task">' +
            				'</div>' +
            				'<div id="div-add-task" class="col-xs-4 col-sm-4 col-md-4">' +
              					'<button id="add-task" class="btn btn-success form-control" type="button">Add task</button>' +
           					'</div>' +
          				'</div>' +

          				'<ul id="todos-list" class="list-unstyled"></ul>' +
			     	'</div>' +
    			'</div>' +
  			'</div>' +
		'</div>';	

	var todoTpl = document.createElement("li");
    todoTpl.classList.add("todo-task");
	    todoTpl.innerHTML = '<span class="todo-desc">{{task desc}}</span>' +
    		'<button class="remove-task btn btn-default btn-xs pull-right">' +
      				'<span class="glyphicon glyphicon-remove"></span>' +
    		'</button>';

// create widget constructor
	function TodoWidget(title, container) {		
    // initialize widget
     	var widget = this;
    	widget.title = title;
    	widget.container = document.getElementById(container);
    	widget.wigetTpl = wigetTpl.cloneNode(true);
    	widget.newTask = widget.wigetTpl.querySelector("#new-task");
    	widget.addTask = widget.wigetTpl.querySelector("#add-task");
      widget.taskList = widget.wigetTpl.querySelector("#todos-list");
      widget.taskTemplate = todoTpl.cloneNode(true);
      widget.taskTemplateDesc = widget.taskTemplate.querySelector("span.todo-desc");

    	widget.init = function(){
			widget.wigetTpl.querySelector("#todos-header").innerHTML = widget.title;
	    	widget.container.append(widget.wigetTpl);
	     
	     // include add handlers 	
    		widget.newTask.addEventListener("keydown", widget.handleAddTask);
    		widget.addTask.addEventListener("click", widget.handleAddTask);
		   // include remove handler 	
	    	widget.addEventListenerRemoveTask(widget.container.getElementsByClassName("remove-task"), "click", widget.handleRemoveTask);
    	}

	  // add task's methods
		widget.handleAddTask = function(e) {
	        if (e.target.id === "new-task" && e.keyCode !== 13) {
	            return false;
	        };

	        var task_desc = widget.newTask.value;
	        if (task_desc.length === 0) {
	            alert("Please, input your current task !!!");
	            return false;
	        } else {
	            widget.taskTemplateDesc.textContent = task_desc;
	        }

	        widget.taskList.appendChild(widget.taskTemplate.cloneNode(true));
	        widget.taskList.querySelector("li:last-child .remove-task").addEventListener("click", widget.handleRemoveTask);
	        widget.newTask.value = '';
	    }

     // remove task's methods     	
    	widget.handleRemoveTask = function(e) {
        	var task = (e.target.parentNode.className === "todo-task") ? e.target.parentNode : e.target.parentNode.parentNode;
        	task.remove();
    	};
		widget.addEventListenerRemoveTask = function(list, event, fn) { 
        	for (var i = 0, len = list.length; i < len; i++) {
            	list[i].addEventListener(event, fn);
        	}
    	};
	}

	window.TodoWidget = window.TodoWidget || TodoWidget;

})(window);