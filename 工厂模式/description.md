# 工厂模式

## 目的
方便我们调用频繁大量使用的功能或者对象。提高易用性。

## 场景
编写一系列类似的对象或功能，这些功能会频繁的在某个地方选择其中的一种或多种类型使用。

## 示例代码

```javascript
function factory(type, classArg) {
    const sport = {
        tennis() {
            console.log('this is tennis')
        },

        football() {
            console.log('this is football')
        }
    }

    return new sport[type](classArg)
}

```

## jQuery 中的工厂模式

jQuery 的核心 `$()` 函数就是一个典型的工厂模式实现。它根据不同的参数类型返回不同的 jQuery 对象，而无需使用 `new` 关键字。

### jQuery 工厂模式的优势

1. **无需 new 关键字**：直接调用 `$()` 即可创建对象
2. **参数灵活**：根据不同参数类型返回相应的对象
3. **链式调用**：返回的对象支持链式操作

### 示例代码

```javascript
// jQuery 工厂函数的简化实现
(function(window) {
    var jQuery = function(selector) {
        // 返回一个新的 jQuery 对象，而不需要使用 new
        return new jQuery.fn.init(selector);
    }

    jQuery.fn = jQuery.prototype = {
        constructor: jQuery,

        init: function(selector) {
            // 根据不同的参数类型进行不同的处理

            // 1. 传入 DOM 元素
            if (selector.nodeType) {
                this[0] = selector;
                this.length = 1;
                return this;
            }

            // 2. 传入 CSS 选择器字符串
            if (typeof selector === 'string') {
                var elements = document.querySelectorAll(selector);
                this.length = elements.length;
                for (var i = 0; i < elements.length; i++) {
                    this[i] = elements[i];
                }
                return this;
            }

            // 3. 传入 HTML 字符串
            if (selector.charAt(0) === '<') {
                var temp = document.createElement('div');
                temp.innerHTML = selector;
                this[0] = temp.firstChild;
                this.length = 1;
                return this;
            }
        },

        css: function(prop, value) {
            for (var i = 0; i < this.length; i++) {
                this[i].style[prop] = value;
            }
            return this; // 支持链式调用
        },

        addClass: function(className) {
            for (var i = 0; i < this.length; i++) {
                this[i].classList.add(className);
            }
            return this;
        }
    };

    // 让 init 的原型指向 jQuery 的原型
    jQuery.fn.init.prototype = jQuery.fn;

    // 暴露到全局
    window.$ = window.jQuery = jQuery;

})(window);

// 使用示例
$('.box').css('color', 'red').addClass('active');  // 选择器
$(document.body).css('background', '#f0f0f0');     // DOM 元素
$('<div>Hello</div>').addClass('greeting');        // HTML 字符串
```

### 关键点说明

1. **工厂函数**：`jQuery()` 函数内部使用 `new jQuery.fn.init()` 创建对象
2. **原型共享**：`jQuery.fn.init.prototype = jQuery.fn` 使得 init 创建的对象可以访问 jQuery 的所有方法
3. **无需 new**：用户调用 `$()` 时不需要写 `new $()`，工厂内部已经处理了
4. **多态性**：根据参数类型（DOM元素、选择器、HTML字符串）执行不同的逻辑


## 组件复用

```javascript
import {render,createVnode } from "vue"

const my = {
    Dialog: {
        confirm(content){
            const confirmVnode = createVnode(
                'div',[createVnode('div',content)]
            )
            render(confirmVnode，document.body)
        }
    }
}

my.Dialog.confirm('some content here')

```