import NewTask from "./NewTask";
import AcceptTask from "./AcceptTask";
import CompleteTask from "./CompleteTask";
import FailedTask from "./FailedTask";
const TaskList = ({ data = [] }) => {
  return (
    <div className="flex gap-4 flex-wrap">

      {data.length > 0 ? (
        data.map((task) => (
          <div key={task._id}>
            {task.status === "new" && <NewTask data={task} />}
            {task.status === "accepted" && <AcceptTask data={task} />}
            {task.status === "completed" && <CompleteTask data={task} />}
            {task.status === "failed" && <FailedTask data={task} />}
          </div>
        ))
      ) : (
        <p className="text-gray-400">No tasks available</p>
      )}

    </div>
  );
};

export default TaskList;