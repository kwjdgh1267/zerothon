const TodoList = ({ todoItems = [], onCheckboxChange, onParticipantChange, participants }) => {
  return (
    <div>
      {todoItems.length > 0 ? (
        todoItems.map((todo, index) => (
          <div key={index}>
            <p>{todo.assignedTo}: {todo.task}</p>
          </div>
        ))
      ) : (
        <p>할 일이 없습니다.</p>
      )}
    </div>
  );
};

export default TodoList;
