import React from "react";
import { Checkbox } from "./ui/checkbox";

const TodoList = ({ todoItems }) => {
  return (
    <div className="mt-8 space-y-6">
      {todoItems.map((item, index) => (
        <div key={index} className="flex items-start">
          <Checkbox id={`todo-${index}`} className="mt-1 rounded border-[#c4c4c4]" />
          <div className="ml-5 flex justify-between w-full">
            <label htmlFor={`todo-${index}`} className="font-normal text-sm text-[#212121]">
              {item.topic}
            </label>
            <span className="font-medium text-[15px]">{item.assignee}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TodoList;