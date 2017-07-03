(function(window, document) {
	var SingleLogin = function(clickDom, options) {
		//如果是用new创建的，则返回用函数创建的
		if ((this instanceof SingleLogin)) return SingleLogin(clickDom, options);

		//验证传进来的第一个参数的格式，是DOM还是字符串
		if ((typeof clickDom) === "string") {
			clickDom = document.querySelector(clickDom);
		} else {
			clickDom = clickDom;
		}
		//创建单例的逻辑代码
		var getSingle = function(fn) {
			var result;
			return function() {
				return result || (fn.apply(this, arguments));
			}
		};
		//创建遮罩层和登录框元素
		var createLoginLayer = function(arr) {
			var mask = document.createElement("div");
			var login = document.createElement("div");
			mask.id = arr[0];
			login.id = arr[1];
			return {
				mask: mask,
				login: login
			};
		};
		//为新创建的DOM添加样式
		var addCss = function(obj) {
			var scrollH = document.documentElement.scrollHeight;
			var scrollW = document.documentElement.scrollWidth;
			var clientH = document.documentElement.clientHeight;
			var clientW = document.documentElement.clientWidth;
			obj.mask.style.cssText = `position:absolute;
									  z-index: 1000;
									  left:0;
									  top:0;
									  background-color: #000;
									  opacity: .8;
									  width:${scrollW + "px"};
									  height:${scrollH + "px"}`;
			obj.login.style.cssText = `position: fixed;
									  width:600px;
									  height:230px;
									  background: rgb(128,128,0);
									  z-index:1001`;
			var dHeight = obj.login.offsetHeight;
			var dWidth = obj.login.offsetWidth;
			obj.login.style.left = (clientW - dWidth) / 2 + "px";
			obj.login.style.top = (clientH - dHeight) / 2 + "px";
		};
		var addClick = function() {
			var loginLayer = createSingleLoginLayer(options);
			document.body.appendChild(loginLayer.mask);
			document.body.appendChild(loginLayer.login);
			//必须保证执行document.body.appendChild(loginLayer.login)再执行addCss函数，因为offsetWidth/Height需要真实的DOM节点
			addCss(loginLayer);
			//为mask层添加移出遮罩层点击事件
			loginLayer.mask.onclick = function() {
				document.body.removeChild(loginLayer.mask);
				document.body.removeChild(loginLayer.login);
			};
		};
		var createSingleLoginLayer = getSingle(createLoginLayer);
		clickDom.onclick = addClick;


	};

	//暴露方法
	window.SingleLogin = SingleLogin;
})(window, document);

window.onload = SingleLogin('#btn', ["mask", "login"]);