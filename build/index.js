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
    isPressed: isLoading,
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
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__);



const AndikaBlockHandler = (attributes, content, setAttributes, setContent, clientId) => {
  const {
    insertBlocks,
    replaceBlocks,
    removeBlock
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.useDispatch)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.store);
  const {
    getBlock,
    getBlockOrder,
    getBlockIndex
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.useSelect)(select => select(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.store), []);
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
    const block = (0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.createBlock)("andika-block/andika", newAttributes);
    return block;
  };
  const onReplace = (blocks, clientId) => {
    replaceBlocks(clientId, blocks.map((block, index) => index === 0 && block.name === "andika-block/andika" ? {
      ...block,
      ...attributes,
      ...block.attributes
    } : block));
  };
  const onMerge = clientId => {
    const blockIndex = getBlockIndex(clientId);
    const blockOrder = getBlockOrder();

    // Merge with the previous block
    const prevBlockIndex = blockIndex - 1;
    const prevBlockClientId = blockOrder[prevBlockIndex];
    if (prevBlockClientId) {
      const prevBlock = getBlock(prevBlockClientId);
      if (prevBlock.name === "andika-block/andika") {
        const mergedContent = prevBlock.attributes.content + content;
        setAttributes({
          content: mergedContent
        });
        setContent(mergedContent);
        removeBlock(prevBlockClientId);
        return;
      }
    }

    // Merge with the next block
    const nextBlockIndex = blockIndex + 1;
    const nextBlockClientId = blockOrder[nextBlockIndex];
    if (nextBlockClientId) {
      const nextBlock = getBlock(nextBlockClientId);
      if (nextBlock.name === "andika-block/andika") {
        const mergedContent = content + nextBlock.attributes.content;
        setAttributes({
          content: mergedContent
        });
        setContent(mergedContent);
        removeBlock(nextBlockClientId);
      }
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
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InspectorControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Typography', 'andika')
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.FontSizePicker, {
    value: attributes.fontSize,
    onChange: value => setAttributes({
      fontSize: value
    }),
    __nextHasNoMarginBottom: true
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
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _utils_andika_ai__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/andika-ai */ "./src/utils/andika-ai.js");
/* harmony import */ var _components_blockhandler__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/blockhandler */ "./src/components/blockhandler.js");
/* harmony import */ var _components_blockcontrols__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/blockcontrols */ "./src/components/blockcontrols.js");
/* harmony import */ var _components_inspectorcontrols__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/inspectorcontrols */ "./src/components/inspectorcontrols.js");










function Edit(_ref) {
  let {
    attributes,
    setAttributes,
    isSelected,
    clientId
  } = _ref;
  const {
    content: contentAttr,
    alignment,
    fontSize,
    textColor,
    backgroundColor
  } = attributes;
  const [isLoading, setIsLoading] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [content, setContent] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(contentAttr || '');
  const {
    onSplit,
    onMerge,
    onReplace
  } = (0,_components_blockhandler__WEBPACK_IMPORTED_MODULE_5__["default"])(attributes, content, setAttributes, setContent, clientId);
  const RichTextRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)();
  const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.useBlockProps)();
  const {
    insertBlocks
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useDispatch)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.store);
  const postTitle = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useSelect)(select => select('core/editor').getEditedPostAttribute('title'));
  const previousBlocks = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useSelect)(select => select(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.store).getBlocks());
  const previousContent = previousBlocks.length > 0 ? previousBlocks.slice(0, -1).map(block => block.attributes.content).join('\n') : '';
  const setCaretPosition = editableRef => {
    if (!editableRef.current) return;
    const range = document.createRange();
    const sel = window.getSelection();
    if (content === '') {
      // Set the caret to the start of the placeholder when the content is empty
      range.setStart(editableRef.current, 0);
    } else {
      const lastChild = editableRef.current.lastChild;
      if (lastChild) {
        // Set the caret to the end of the content when content is not empty
        range.setStartAfter(lastChild);
      }
    }
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
    editableRef.current.focus();
  };
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    setCaretPosition(RichTextRef);
    setAttributes({
      content
    });
  }, [content, setAttributes]);
  const onGenerateClick = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(async () => {
    setIsLoading(true);
    const prompt = `Title: ${postTitle}\n\n${previousContent}\n\n${content}`;
    try {
      await (0,_utils_andika_ai__WEBPACK_IMPORTED_MODULE_4__.generateText)(prompt, content, setContent, insertBlocks, clientId);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [content, postTitle, previousContent, setContent, insertBlocks]);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_blockcontrols__WEBPACK_IMPORTED_MODULE_6__["default"], {
    attributes: attributes,
    setAttributes: setAttributes,
    isLoading: isLoading,
    onGenerateClick: onGenerateClick
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_inspectorcontrols__WEBPACK_IMPORTED_MODULE_7__["default"], {
    attributes: attributes,
    setAttributes: setAttributes
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.RichText, {
    ref: RichTextRef,
    tagName: "div",
    value: content,
    onChange: newContent => {
      setContent(newContent);
      setAttributes({
        content: newContent
      });
    },
    className: "andika-placeholder",
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Type and click the lightbulb icon to generate text...', 'andika'),
    isSelected: isSelected,
    style: {
      textAlign: alignment,
      fontSize: fontSize,
      color: textColor,
      backgroundColor: backgroundColor
    },
    onSplit: onSplit,
    onReplace: blocks => onReplace(blocks, clientId),
    onRemove: () => onReplace([]),
    onMerge: () => onMerge(clientId)
  }));
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

/***/ "./src/transforms.js":
/*!***************************!*\
  !*** ./src/transforms.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);

const elementToLevel = {
  h1: 1,
  h2: 2,
  h3: 3,
  h4: 4,
  h5: 5,
  h6: 6
};
const levelToElement = {
  1: 'h1',
  2: 'h2',
  3: 'h3',
  4: 'h4',
  5: 'h5',
  6: 'h6'
};
const transforms = {
  from: [{
    type: 'block',
    blocks: ['core/paragraph'],
    transform: _ref => {
      let {
        content
      } = _ref;
      return (0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.createBlock)('andika-block/andika', {
        content
      });
    }
  }, {
    type: 'block',
    blocks: ['core/heading'],
    transform: _ref2 => {
      let {
        content,
        level
      } = _ref2;
      return (0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.createBlock)('andika-block/andika', {
        content,
        element: levelToElement[level]
      });
    }
  }],
  to: [{
    type: 'block',
    blocks: ['core/paragraph'],
    transform: _ref3 => {
      let {
        content
      } = _ref3;
      return (0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.createBlock)('core/paragraph', {
        content
      });
    }
  }, {
    type: 'block',
    blocks: ['core/heading'],
    transform: _ref4 => {
      let {
        content,
        element
      } = _ref4;
      return (0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.createBlock)('core/heading', {
        content,
        level: elementToLevel.hasOwnProperty(element) ? elementToLevel[element] : 2
      });
    }
  }]
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (transforms);

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
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _andika_api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./andika-api */ "./src/utils/andika-api.js");


async function generateText(prompt, content, setContent, insertBlocks, clientId) {
  const andikaAPI = new _andika_api__WEBPACK_IMPORTED_MODULE_1__["default"](andika);
  let accumulatedText = '';
  const andikaStreamEvents = async event => {
    if (event.type === 'event') {
      if (event.data !== "[DONE]") {
        try {
          var _ref, _ref2, _parsedData$choices$;
          const parsedData = JSON.parse(event.data);
          const text = (_ref = (_ref2 = (_parsedData$choices$ = parsedData.choices[0]?.text) !== null && _parsedData$choices$ !== void 0 ? _parsedData$choices$ : parsedData.choices[0]?.message?.content) !== null && _ref2 !== void 0 ? _ref2 : parsedData.choices[0]?.delta?.content) !== null && _ref !== void 0 ? _ref : '';
          const cleanedText = text.replace(/^\n{1,2}/, '');
          if (cleanedText) {
            accumulatedText += cleanedText;
            if (accumulatedText.includes('\n')) {
              const paragraphs = accumulatedText.split(/\n+/);

              // Filter out empty paragraphs
              const nEP = paragraphs.filter(paragraph => paragraph.trim() !== '');
              const blocksToInsert = nEP.map(paragraph => (0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.createBlock)('andika-block/andika', {
                content: paragraph
              }));
              const currentIndex = wp.data.select('core/block-editor').getBlockIndex(clientId);
              insertBlocks(blocksToInsert, currentIndex);
              accumulatedText = '';
            } else {
              setContent(accumulatedText);
            }
          }
        } catch (e) {
          console.error('Error parsing JSON', e);
        }
      }
    }
  };
  try {
    await andikaAPI.andikaText(prompt, andikaStreamEvents);
  } catch (error) {
    console.error('Error in generateText', error);
  }
}

/***/ }),

/***/ "./src/utils/andika-api.js":
/*!*********************************!*\
  !*** ./src/utils/andika-api.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var eventsource_parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! eventsource-parser */ "./node_modules/eventsource-parser/dist/index.js");

const API_BASE_URL = 'https://api.openai.com/v1/';
class AndikaOpenAI {
  constructor(options) {
    this.apiKey = options.api_key;
    this.model = options.model;
    this.temperature = parseFloat(options.temperature);
    this.max_tokens = parseInt(options.maxTokens, 10);
    this.top_p = parseFloat(options.topP);
    this.frequency_penalty = parseFloat(options.frequencyPenalty);
    this.presence_penalty = parseFloat(options.presencePenalty);
    this.stream = options.stream === "1" ? true : false;
  }
  get_api_url() {
    if (this.model === 'gpt-3.5-turbo' || this.model === 'gpt-4') {
      return `${API_BASE_URL}chat/completions`;
    } else {
      return `${API_BASE_URL}completions`;
    }
  }
  async andikaText(prompt, callback) {
    let options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    const url = this.get_api_url();
    const body = {
      model: this.model,
      temperature: this.temperature,
      max_tokens: this.max_tokens,
      top_p: this.top_p,
      frequency_penalty: this.frequency_penalty,
      presence_penalty: this.presence_penalty,
      stream: this.stream,
      n: 1,
      ...options
    };
    if (this.model === 'gpt-3.5-turbo' || this.model === 'gpt-4') {
      body.messages = [{
        role: 'user',
        content: prompt
      }];
    } else {
      body.prompt = prompt;
    }
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      },
      body: JSON.stringify(body)
    };
    try {
      const response = await fetch(url, requestOptions);
      if (!response.ok) {
        // Log the error response
        const errorData = await response.json();
        console.error('Error response from OpenAI API:', errorData);
        throw new Error(response.statusText);
      }
      const parser = (0,eventsource_parser__WEBPACK_IMPORTED_MODULE_0__.createParser)(callback);
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      while (true) {
        const {
          done,
          value
        } = await reader.read();
        if (done) {
          break;
        }
        parser.feed(decoder.decode(value));
      }
    } catch (error) {
      console.error('Error generating text:', error);
      return 'Error generating text! Check your API Key?';
    }
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AndikaOpenAI);

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

/***/ "./node_modules/eventsource-parser/dist/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/eventsource-parser/dist/index.js ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createParser": () => (/* binding */ createParser)
/* harmony export */ });
function createParser(onParse) {
  let isFirstChunk;
  let buffer;
  let startingPosition;
  let startingFieldLength;
  let eventId;
  let eventName;
  let data;
  reset();
  return {
    feed,
    reset
  };
  function reset() {
    isFirstChunk = true;
    buffer = "";
    startingPosition = 0;
    startingFieldLength = -1;
    eventId = void 0;
    eventName = void 0;
    data = "";
  }
  function feed(chunk) {
    buffer = buffer ? buffer + chunk : chunk;
    if (isFirstChunk && hasBom(buffer)) {
      buffer = buffer.slice(BOM.length);
    }
    isFirstChunk = false;
    const length = buffer.length;
    let position = 0;
    let discardTrailingNewline = false;
    while (position < length) {
      if (discardTrailingNewline) {
        if (buffer[position] === "\n") {
          ++position;
        }
        discardTrailingNewline = false;
      }
      let lineLength = -1;
      let fieldLength = startingFieldLength;
      let character;
      for (let index = startingPosition; lineLength < 0 && index < length; ++index) {
        character = buffer[index];
        if (character === ":" && fieldLength < 0) {
          fieldLength = index - position;
        } else if (character === "\r") {
          discardTrailingNewline = true;
          lineLength = index - position;
        } else if (character === "\n") {
          lineLength = index - position;
        }
      }
      if (lineLength < 0) {
        startingPosition = length - position;
        startingFieldLength = fieldLength;
        break;
      } else {
        startingPosition = 0;
        startingFieldLength = -1;
      }
      parseEventStreamLine(buffer, position, fieldLength, lineLength);
      position += lineLength + 1;
    }
    if (position === length) {
      buffer = "";
    } else if (position > 0) {
      buffer = buffer.slice(position);
    }
  }
  function parseEventStreamLine(lineBuffer, index, fieldLength, lineLength) {
    if (lineLength === 0) {
      if (data.length > 0) {
        onParse({
          type: "event",
          id: eventId,
          event: eventName || void 0,
          data: data.slice(0, -1)
          // remove trailing newline
        });

        data = "";
        eventId = void 0;
      }
      eventName = void 0;
      return;
    }
    const noValue = fieldLength < 0;
    const field = lineBuffer.slice(index, index + (noValue ? lineLength : fieldLength));
    let step = 0;
    if (noValue) {
      step = lineLength;
    } else if (lineBuffer[index + fieldLength + 1] === " ") {
      step = fieldLength + 2;
    } else {
      step = fieldLength + 1;
    }
    const position = index + step;
    const valueLength = lineLength - step;
    const value = lineBuffer.slice(position, position + valueLength).toString();
    if (field === "data") {
      data += value ? "".concat(value, "\n") : "\n";
    } else if (field === "event") {
      eventName = value;
    } else if (field === "id" && !value.includes("\0")) {
      eventId = value;
    } else if (field === "retry") {
      const retry = parseInt(value, 10);
      if (!Number.isNaN(retry)) {
        onParse({
          type: "reconnect-interval",
          value: retry
        });
      }
    }
  }
}
const BOM = [239, 187, 191];
function hasBom(buffer) {
  return BOM.every((charCode, index) => buffer.charCodeAt(index) === charCode);
}

//# sourceMappingURL=index.js.map


/***/ }),

/***/ "./src/block.json":
/*!************************!*\
  !*** ./src/block.json ***!
  \************************/
/***/ ((module) => {

module.exports = JSON.parse('{"name":"andika-block/andika","version":"0.1.0","title":"Andika","category":"text","icon":"lightbulb","description":"Elevate your writing with real-time AI text generation using Andika.","author":"Ammanulah Emmanuel","keywords":["andika","openai","real-time","ai","text"],"textdomain":"andika","editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./style-index.css","attributes":{"content":{"type":"string","source":"html","selector":"p"},"element":{"type":"string","default":"p"},"alignment":{"type":"string","default":"none"},"backgroundColor":{"type":"string"},"textColor":{"type":"string"},"fontSize":{"type":"string"},"lineHeight":{"type":"number","default":1.5}},"supports":{"color":{"text":true,"background":true,"gradients":true,"link":true},"typography":{"fontSize":true,"lineHeight":true},"className":false}}');

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
/* harmony import */ var _transforms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./transforms */ "./src/transforms.js");







(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_5__.name, {
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)(_block_json__WEBPACK_IMPORTED_MODULE_5__.title),
  icon: _block_json__WEBPACK_IMPORTED_MODULE_5__.icon,
  category: _block_json__WEBPACK_IMPORTED_MODULE_5__.category,
  description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)(_block_json__WEBPACK_IMPORTED_MODULE_5__.description),
  transforms: _transforms__WEBPACK_IMPORTED_MODULE_6__["default"],
  supports: {
    html: true,
    className: false
  },
  attributes: _block_json__WEBPACK_IMPORTED_MODULE_5__.attributes,
  edit: _edit__WEBPACK_IMPORTED_MODULE_3__["default"],
  save: _save__WEBPACK_IMPORTED_MODULE_4__["default"]
});
})();

/******/ })()
;
//# sourceMappingURL=index.js.map