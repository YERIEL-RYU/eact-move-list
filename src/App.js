import { useState } from "react";
import styled from "styled-components";

const Item = styled.div`
  padding: 10px;
  background-color: ${(props) => (props.select ? "#eeeeee" : "none")};
  cursor: pointer;
`;

export default function App() {
  const [listItem, setListItem] = useState([
    { name: "item1", index: 1 },
    { name: "item2", index: 2 },
    { name: "item3", index: 3 },
    { name: "item4", index: 4 },
    { name: "item5", index: 5 }
  ]);
  const [selected, setSelected] = useState({ name: "", index: null });

  const onSelected = (e) => {
    var { name, index } = e.target.dataset;
    setSelected({ name: name, index: Number(index) + 1 });
  };

  const onUpClick = () => {
    if (selected.name === "") window.alert("list choose!!");
    else {
      var filterList = listItem.filter((list) =>
        list.name === selected.name && list.index !== 1
          ? (list.index -= 1)
          : list.name !== selected.name && list.index === selected.index - 1
          ? (list.index += 1)
          : list.name === selected.name && list.index === 1
          ? list
          : list.name !== selected.name && list.index === 1
          ? list
          : list
      );
      if (selected.index > 1) {
        setSelected({ ...selected, index: selected.index - 1 });
      } else {
        setSelected({ ...selected, index: 1 });
      }
      setListItem(filterList);
    }
  };

  const onUpUpClick = () => {
    if (selected.name === "") window.alert("list choose!!");
    else {
      var filterList = listItem.filter((list) =>
        list.name === selected.name && list.index !== 1
          ? (list.index = 1)
          : list.name === selected.name && list.index === 1
          ? list
          : list.name !== selected.name && list.index > selected.index
          ? list
          : (list.index += 1)
      );
      setSelected({ ...selected, index: 1 });
      setListItem(filterList);
    }
  };

  const onDownClick = () => {
    if (selected.name === "") window.alert("list choose!!");
    else {
      var filterList = listItem.filter((list) =>
        list.name === selected.name && list.index !== listItem.length
          ? (list.index += 1)
          : list.name !== selected.name && list.index === selected.index + 1
          ? (list.index -= 1)
          : list
      );
      if (selected.index < listItem.length) {
        setSelected({ ...selected, index: selected.index + 1 });
      } else {
        setSelected({ ...selected, index: listItem.length });
      }
      setListItem(filterList);
    }
  };

  const onDownDownClick = () => {
    if (selected.name === "") window.alert("list choose!!");
    else {
      var filterList = listItem.filter((list) =>
        list.name === selected.name
          ? (list.index = listItem.length)
          : list.name !== selected.name && list.index === 1
          ? list
          : list.name !== selected.name &&
            list.index === 2 &&
            selected.index !== 1
          ? list
          : list.name !== selected.name &&
            list.index === 2 &&
            selected.index === 1
          ? (list.index -= 1)
          : (list.index -= 1)
      );
      setSelected({ ...selected, index: listItem.length });
      setListItem(filterList);
    }
  };

  const listSort = (a, b) => {
    if (a.index > b.index) {
      return 1;
    }
    if (a.index < b.index) {
      return -1;
    }
    // a must be equal to b
    return 0;
  };

  return (
    <div>
      <div>List Up & Down</div>
      <div style={{ display: "flex" }}>
        <div
          style={{
            width: "300px",
            height: "400px",
            margin: "20px",
            border: "2px inset",
            borderRadius: "4px"
          }}
        >
          {listItem
            .sort((a, b) => listSort(a, b))
            .map((list, index) => (
              <Item
                key={index}
                data-index={index}
                data-name={list.name}
                select={selected.name === list.name}
                onClick={onSelected}
              >
                {list.name}
              </Item>
            ))}
        </div>
        <div>
          <button onClick={onUpUpClick}>upup</button>
          <button onClick={onUpClick}>up</button>
          <button onClick={onDownClick}>down</button>
          <button onClick={onDownDownClick}>downdown</button>
        </div>
      </div>
    </div>
  );
}
