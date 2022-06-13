import List from './constrollers/List.js';
import Tag from './constrollers/Tag.js';
import { getLocalStorage, setLocalStorage, clearLocalStorageByKey } from './utils/localStorage.js';

const btnAddTag = document.querySelector('.add-tag');
const input = document.querySelector('#input');
const inputContainer = document.querySelector('.ul-span');
const btnAddList = document.querySelector('.add-to-list');
const readOnly = document.getElementById('read-only_checkbox');
const buttons = document.querySelector('.buttons');
const clearTagsList = document.querySelector('.clear-list');
const tagsList = document.querySelector('.tags');
const list = new List([]);
let inpValue;

const createHtmlElement = (tag, text = '', classList = []) => {
  const element = document.createElement(tag);
  if (text) {
    element.innerText = text;
  }
  if (classList.length > 0) {
    element.classList.add(...classList);
  }
  return element;
};

const addTagToInput = (name, id) => {
  const tag = createHtmlElement('span', name, ['tag']);
  const btnTagDelete = createHtmlElement('span', '×', ['preview-remove']);

  tag.append(btnTagDelete);
  inputContainer.insertBefore(tag, input);
  btnTagDelete.addEventListener('click', () => {
    list.deleteTagByIdInp(id);
    tag.remove();
    setLocalStorage('list', JSON.stringify(list.list));
  });
};

const addTagToList = (name, id) => {
  const tag = createHtmlElement('span', name, ['tag-li']);
  const btnTagDelete = createHtmlElement('span', '×', ['preview-remove']);

  tag.append(btnTagDelete);
  tagsList.append(tag);
  btnTagDelete.addEventListener('click', () => {
    list.deleteTagByIdList(id);
    tag.remove();
    setLocalStorage('list', JSON.stringify(list.list));
  });
};

const removeTagsInp = () => {
  while (inputContainer.children.length > 1) {
    inputContainer.removeChild(inputContainer.firstChild);
  }
};

const removeTagsList = () => {
  while (tagsList.children.length > 0) {
    tagsList.removeChild(tagsList.lastChild);
  }
};

const fillHtmlList = () => {
  tagsList.innerHTML = '';

  if (list.list.length != 0) {
    list.list.forEach((item) => {
      addTagToList(item.name, item.id);
    });
  }
};

const initializeEvents = () => {
  !localStorage.list ? (list.list = []) : (list.list = JSON.parse(getLocalStorage('list')));
  fillHtmlList();

  input.addEventListener('change', (event) => {
    inpValue = event.target.value;
  });

  btnAddTag.addEventListener('click', () => {
    if (list.listInp.some((item) => item.name === inpValue)) {
      alert('Этот тег вы уже добавили');
    } else if (inpValue === '' || inpValue === ' ' || inpValue === undefined) {
      alert('Пустые теги запрещены');
    } else {
      const tag = list.addTag(new Tag(input.value));
      addTagToInput(tag.name, tag.id);
      setLocalStorage('list', JSON.stringify(list.list));

      input.value = '';
      inpValue = '';
    }
  });

  btnAddList.addEventListener('click', () => {
    while (list.listInp.length > 0) {
      list.listInp.map((item) => {
        list.addTagList(item);
        let indTag = list.listInp.indexOf(item);
        list.listInp.splice(indTag, 1);
      });
    }

    fillHtmlList();
    removeTagsInp();
    setLocalStorage('list', JSON.stringify(list.list));
  });

  readOnly.addEventListener('click', () => {
    let previewRemove = document.querySelectorAll('.preview-remove');

    readOnly.checked
      ? (inputContainer.classList.add('disable'),
        inputContainer.classList.remove('active'),
        buttons.classList.add('disable'),
        buttons.classList.remove('active'))
      : (inputContainer.classList.remove('disable'),
        inputContainer.classList.add('active'),
        buttons.classList.remove('disable'),
        buttons.classList.add('active'));

    if (inputContainer.classList.contains('active')) {
      for (let i = 0; i < previewRemove.length; i++) {
        previewRemove[i].classList.add('active');
        previewRemove[i].classList.remove('disable');
      }
    } else {
      for (let i = 0; i < previewRemove.length; i++) {
        previewRemove[i].classList.add('disable');
        previewRemove[i].classList.remove('active');
      }
    }
  });

  clearTagsList.addEventListener('click', () => {
    list.clearList();
    clearLocalStorageByKey('list');
    removeTagsInp();
    removeTagsList();
    fillHtmlList();
  });
};

initializeEvents();
