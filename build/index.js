/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/blockcontrols.js":
/*!*****************************************!*\
  !*** ./src/components/blockcontrols.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);




function AndikaBlockControls(props) {
  const {
    attributes,
    setAttributes,
    isLoading,
    onGenerateClick
  } = props;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.BlockControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToolbarGroup, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.AlignmentToolbar, {
    value: attributes.alignment,
    onChange: alignment => setAttributes({
      alignment
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToolbarButton, {
    icon: isLoading ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Spinner, null) : 'lightbulb',
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Generate Text', 'andika'),
    onClick: onGenerateClick,
    disabled: isLoading
  })));
}
;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AndikaBlockControls);

/***/ }),

/***/ "./src/components/blockhandler.js":
/*!****************************************!*\
  !*** ./src/components/blockhandler.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AndikaBlockHandler": () => (/* binding */ AndikaBlockHandler),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_2__);



const AndikaBlockHandler = (attributes, content, setAttributes, setContent) => {
  const {
    removeBlock,
    replaceBlocks,
    insertBlocks
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.useDispatch)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.store);
  const {
    getBlockAttributes,
    getPreviousBlockClientId,
    getNextBlockClientId,
    getBlockName
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.useSelect)(select => select(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.store));
  const onSplit = (value, isOriginal) => {
    if (isOriginal) {
      const updatedContent = content.slice(0, content.indexOf(value));
      setAttributes({
        content: updatedContent
      });
      setContent(updatedContent);
    }
    const newAttributes = {
      ...attributes,
      content: value
    };
    const block = (0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_2__.createBlock)("andika-block/andika", newAttributes);
    return block;
  };
  const onReplace = (blocks, clientId) => {
    replaceBlocks(clientId, blocks.map((block, index) => index === 0 && block.name === name ? {
      ...block,
      ...attributes,
      ...block.attributes
    } : block));
  };
  const onMerge = (forward, clientId) => {
    const previousBlock = getPreviousBlockClientId(clientId);
    const nextBlock = getNextBlockClientId(clientId);
    const destinationBlock = forward ? nextBlock : previousBlock;
    if (destinationBlock && getBlockName(destinationBlock) === 'andika-block/andika') {
      const currentContent = getBlockAttributes(clientId).content;
      const destinationContent = getBlockAttributes(destinationBlock).content;
      const updatedContent = forward ? currentContent + destinationContent : destinationContent + currentContent;
      replaceBlocks(destinationBlock, (0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_2__.createBlock)('andika-block/andika', {
        content: updatedContent
      }));
      removeBlock(clientId);
    }
  };
  return {
    onSplit,
    onReplace,
    onMerge
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AndikaBlockHandler);

/***/ }),

/***/ "./src/components/inspectorcontrols.js":
/*!*********************************************!*\
  !*** ./src/components/inspectorcontrols.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);




const AndikaInspectorControls = _ref => {
  let {
    attributes,
    setAttributes
  } = _ref;
  const {
    lineHeight
  } = attributes;
  const onChangeLineHeight = value => {
    setAttributes({
      lineHeight: value
    });
  };
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InspectorControls, {
    group: "typography"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Typography', 'andika')
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.FontSizePicker, {
    value: attributes.fontSize,
    onChange: value => setAttributes({
      fontSize: value
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.RangeControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Line height', 'andika'),
    value: lineHeight,
    onChange: onChangeLineHeight,
    min: 1,
    max: 3,
    step: 0.1
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.PanelColorSettings, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Color settings', 'andika'),
    initialOpen: false,
    colorSettings: [{
      value: attributes.textColor,
      onChange: value => setAttributes({
        textColor: value
      }),
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Text color', 'andika')
    }, {
      value: attributes.backgroundColor,
      onChange: value => setAttributes({
        backgroundColor: value
      }),
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Background color', 'andika')
    }]
  }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AndikaInspectorControls);

/***/ }),

/***/ "./src/edit.js":
/*!*********************!*\
  !*** ./src/edit.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Edit)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _utils_andika_ai__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils/andika-ai */ "./src/utils/andika-ai.js");
/* harmony import */ var _components_blockcontrols__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/blockcontrols */ "./src/components/blockcontrols.js");
/* harmony import */ var _components_inspectorcontrols__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/inspectorcontrols */ "./src/components/inspectorcontrols.js");
/* harmony import */ var _components_blockhandler__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/blockhandler */ "./src/components/blockhandler.js");













function Edit(_ref) {
  let {
    attributes,
    setAttributes,
    isSelected,
    clientId
  } = _ref;
  const [content, setContent] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(attributes.content || '');
  const [isLoading, setIsLoading] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);

  // Get the post title and previous block content
  const postTitle = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_4__.useSelect)(select => select('core/editor').getEditedPostAttribute('title'));
  const previousBlocks = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_4__.useSelect)(select => select(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.store).getBlocks());
  const previousContent = previousBlocks.slice(0, -1).map(block => block.attributes.content).join('\n');
  const onGenerateClick = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async () => {
    setIsLoading(true);
    const prompt = `Title: ${postTitle}\n\n${previousContent}\n\n${content}`;
    try {
      const newText = await (0,_utils_andika_ai__WEBPACK_IMPORTED_MODULE_6__.generateText)(prompt, andika['stream'], partialText => {
        setContent(prevContent => prevContent + partialText);
      });
      setAttributes({
        content: newText
      });
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  }, [postTitle, previousContent, content]);
  const {
    replaceBlocks
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_4__.useDispatch)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.store);
  const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.useBlockProps)();
  const {
    onSplit,
    onMerge,
    onReplace
  } = (0,_components_blockhandler__WEBPACK_IMPORTED_MODULE_9__["default"])(attributes, content, setAttributes, setContent);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_components_blockcontrols__WEBPACK_IMPORTED_MODULE_7__["default"], {
    attributes: attributes,
    setAttributes: setAttributes,
    isLoading: isLoading,
    onGenerateClick: onGenerateClick
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_components_inspectorcontrols__WEBPACK_IMPORTED_MODULE_8__["default"], {
    attributes: attributes,
    setAttributes: setAttributes
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.RichText, (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    identifier: "content"
  }, blockProps, {
    tagName: "p",
    value: content,
    onChange: newContent => {
      setAttributes({
        content: newContent
      });
      setContent(newContent);
    },
    className: "andika-placeholder",
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Start typing and click the lightbulb icon to generate text...', 'andika'),
    isSelected: isSelected,
    style: {
      textAlign: attributes.alignment,
      fontSize: attributes.fontSize,
      color: attributes.textColor,
      backgroundColor: attributes.backgroundColor
    },
    onSplit: onSplit,
    onReplace: blocks => onReplace(blocks, clientId),
    onRemove: () => onReplace([]),
    onMerge: forward => onMerge(forward, clientId)
  })));
}

/***/ }),

/***/ "./src/save.js":
/*!*********************!*\
  !*** ./src/save.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Save)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);


function Save(_ref) {
  let {
    attributes
  } = _ref;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.RichText.Content, {
    tagName: "p",
    value: attributes.content,
    style: {
      textAlign: attributes.alignment,
      fontSize: attributes.fontSize,
      color: attributes.textColor,
      backgroundColor: attributes.backgroundColor
    }
  });
}

/***/ }),

/***/ "./src/utils/andika-ai.js":
/*!********************************!*\
  !*** ./src/utils/andika-ai.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "generateText": () => (/* binding */ generateText)
/* harmony export */ });
async function generateText(prompt) {
  let stream = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  let onProgress = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  try {
    const response = await fetch(andika.api_url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-WP-Nonce': andika.api_nonce
      },
      body: JSON.stringify({
        prompt,
        stream: !!stream
      })
    });
    if (!response.ok) {
      throw new Error(__('Error generating text. Please check your API key and settings.', 'andika'));
    }
    if (stream) {
      const reader = response.body.getReader();
      let result = '';
      while (true) {
        const {
          done,
          value
        } = await reader.read();
        if (done) {
          break;
        }
        const partialJson = new TextDecoder('utf-8').decode(value);
        const partialResult = JSON.parse(partialJson);
        const newText = partialResult.generated_text;
        result += newText;
        if (onProgress) {
          onProgress(newText);
        }
      }
      return result;
    } else {
      const jsonResponse = await response.json();
      return jsonResponse.generated_text;
    }
  } catch (error) {
    throw new Error(__('Error generating text. Please check your API key and settings.', 'andika'));
  }
}

/***/ }),

/***/ "./src/editor.scss":
/*!*************************!*\
  !*** ./src/editor.scss ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ ((module) => {

module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ ((module) => {

module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ ((module) => {

module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/data":
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["data"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/extends.js":
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/extends.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _extends)
/* harmony export */ });
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}

/***/ }),

/***/ "./src/block.json":
/*!************************!*\
  !*** ./src/block.json ***!
  \************************/
/***/ ((module) => {

module.exports = JSON.parse('{"name":"andika-block/andika","version":"0.1.0","title":"Andika","category":"text","icon":"lightbulb","description":"Elevate your writing with real-time AI text generation using Andika.","author":"Ammanulah Emmanuel","keywords":["andika","openai","real-time","ai","text"],"textdomain":"andika","editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./style-index.css","attributes":{"content":{"type":"string","source":"html","selector":"p"},"alignment":{"type":"string","default":"none"},"backgroundColor":{"type":"string"},"textColor":{"type":"string"},"fontSize":{"type":"string"},"lineHeight":{"type":"number","default":1.5}},"supports":{"color":{"text":true,"background":true,"gradients":true,"link":true},"typography":{"fontSize":true,"lineHeight":true}}}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./editor.scss */ "./src/editor.scss");
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./edit */ "./src/edit.js");
/* harmony import */ var _save__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./save */ "./src/save.js");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./block.json */ "./src/block.json");






(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_5__.name, {
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)(_block_json__WEBPACK_IMPORTED_MODULE_5__.title),
  icon: _block_json__WEBPACK_IMPORTED_MODULE_5__.icon,
  category: _block_json__WEBPACK_IMPORTED_MODULE_5__.category,
  description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)(_block_json__WEBPACK_IMPORTED_MODULE_5__.description),
  supports: {
    html: false
  },
  attributes: _block_json__WEBPACK_IMPORTED_MODULE_5__.attributes,
  edit: _edit__WEBPACK_IMPORTED_MODULE_3__["default"],
  save: _save__WEBPACK_IMPORTED_MODULE_4__["default"]
});
})();

/******/ })()
;
//# sourceMappingURL=index.js.map