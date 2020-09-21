/**
 * @desc sleep函数
 * @param {Number} 书面毫秒数
 * 用法：async await / sleep(500).then(() => {})
 */

export function sleep(time: number): any {
	return new Promise(resolve => setTimeout(resolve, time));
}

/**
 * @desc 添加监听事件函数
 * @param element：{element} 要被添加监听的对象
 * @param eventName：{string} 事件方法
 * @param Listener：{Function} 回调函数
 * 用法：this.addEvent(btn1,"click",fn)
 */
export function addEvent(element: any, eventName: string, Listener: Function): void {
	if (element.addEventListener) {
		element.addEventListener(eventName, Listener, false); //主流浏览器兼容
	} else if (element.attachEvent) {
		element.attachEvent('on' + eventName, Listener);
	} else {
		//element.onclick=Listener;//点语法，可以不用写死
		element['on' + eventName] = Listener; //中括号语法可以写活
	}
}
// 删除添加监听事件，和上边的addEvent配对使用
export function removeEvent(element: any, eventName: string, Listener: Function): void {
	if (element.addEventListener) {
		element.addEventListener(eventName, Listener, false); //主流浏览器兼容
	} else if (element.detachEvent) {
		element.detachEvent('on' + eventName, Listener);
	} else {
		element['on' + eventName] = Listener; //中括号语法可以写活
	}
}

/**
 * @desc sleep函数
 * @param {Number} 书面毫秒数
 * 用法：async await / sleep(500).then(() => {})
 */

export function numberToChinese(num: number): string {
	let chnNumChar = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
	let chnUnitSection = ['', '万', '亿', '万亿', '亿亿'];
	let chnUnitChar = ['', '十', '百', '千'];

	function SectionToChinese(section: number) {
		let strIns = '',
			chnStr = '';
		let unitPos = 0;
		let zero = true;
		while (section > 0) {
			let v = section % 10;
			if (v === 0) {
				if (!zero) {
					zero = true;
					chnStr = chnNumChar[v] + chnStr;
				}
			} else {
				zero = false;
				strIns = chnNumChar[v];
				strIns += chnUnitChar[unitPos];
				chnStr = strIns + chnStr;
			}
			unitPos++;
			section = Math.floor(section / 10);
		}
		return chnStr;
	}

	let unitPos = 0;
	let strIns = '',
		chnStr = '';
	let needZero = false;

	if (num === 0) {
		return chnNumChar[0];
	}

	while (num > 0) {
		let section = num % 10000;
		if (needZero) {
			chnStr = chnNumChar[0] + chnStr;
		}
		strIns = SectionToChinese(section);
		strIns += section !== 0 ? chnUnitSection[unitPos] : chnUnitSection[0];
		chnStr = strIns + chnStr;
		needZero = section < 1000 && section > 0;
		num = Math.floor(num / 10000);
		unitPos++;
	}

	return chnStr;
}
