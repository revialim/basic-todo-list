interface TodoIsDoneCheckProps {
  isDone: boolean;
  onChange: (e: any) => void;
}

export const TodoIsDoneCheck:React.FunctionComponent<TodoIsDoneCheckProps> = props => {
  const {
    isDone,
    onChange
  } = props;

  return(
    <div className="form-check">
      <input onChange={onChange} className="form-check-input" type="checkbox" id="flexCheckChecked" checked={isDone} />
      {/* <label className="form-check-label" htmlFor="flexCheckChecked">
        {isDone? 'is done' : 'isn\'t done'}
      </label> */}
    </div>
  );
}