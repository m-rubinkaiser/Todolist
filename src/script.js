let addTodo = () => {
  let inputBox = document.getElementById("input-box");
  let todoText = inputBox.value;
  if (todoText != "") {
    setData(todoText);
    listTodo();
  }
  inputBox.value = "";
};

document.getElementById("input-box").addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    let inputBox = document.getElementById("input-box");
    let todoText = inputBox.value;
    if (todoText != "") {
      setData(todoText);
      listTodo();
    }
    inputBox.value = "";
  }
});

let setData = (item) => {
  if (getData(item) != false) {
    alert(item);
    warning(item)
  } else {
    let data = getData();
    data = data != false ? data : [];
    data.push({ task: item, isFinished: false });
    data = JSON.stringify(data);

    localStorage.setItem("todos", data);
  }
};

let getData = (item = null) => {
  let data = JSON.parse(localStorage.getItem("todos"));
  if (data) {
    if (item) {
      let index = data.findIndex((e) => e.task === item);
      if (index != -1) {
        return data[index];
      } else {
        return false;
      }
    }
    return data;
  }
  return false;
};

let warning=(text)=>{
  let setWarning = document.getElementsByClassName("warning");
  
}

let listTodo = () => {
  let html = ``;
  let data = getData();
  if (data) {
    data.forEach((value, item) => {
      let statusClass = value.isFinished ? "checked" : "unchecked";

      html += `<div><li class ="${statusClass}" onclick="status(${item})">${value.task}</li><span onclick="removeData(${item})">\u00d7</span></div>`;
    });
  }
  document.getElementById("list-container").innerHTML = html;
};

let removeData = (itemId) => {
  let data = getData();
  if (data) {
    let newData = data.filter((v, i) => {
      return i != itemId;
    });
    newData = JSON.stringify(newData);
    localStorage.setItem("todos", newData);
    listTodo();
  } else {
    alert("no data found");
  }
};

window.onload = () => {
  listTodo();
};

let status = (itemId) => {
  let data = getData();
  if (data) {
    if (data[itemId].isFinished === false) {
      data[itemId].isFinished = true;
    } else if (data[itemId].isFinished === true) {
      data[itemId].isFinished = false;
    }
    localStorage.setItem("todos", JSON.stringify(data));
    listTodo();
  }
};

var icon = document.getElementById("icon");

icon.onclick = function () {
  document.body.classList.toggle("dark-theme");
  if (document.body.classList.contains("dark-theme")){
    icon.src = "images/theme/sun.png"
  }else {
    icon.src = "images/theme/moon.png"
  }
};
