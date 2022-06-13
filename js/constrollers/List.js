export default class List {
  constructor(list = [], listInp = []) {
    this.list = list;
    this.listInp = listInp;
  }

  addTag = (tag) => {
    this.listInp.push(tag);
    return tag;
  };
  addTagList = (tag) => {
    this.list.push(tag);
    return tag;
  };

  deleteTagByIdInp = (tagId) => {
    this.listInp = this.listInp.filter((tag) => tag.id !== tagId);
    return this.list;
  };
  deleteTagByIdList = (tagId) => {
    this.list = this.list.filter((tag) => tag.id !== tagId);
  };

  clearList = () => {
    this.list = [];
  };
}
