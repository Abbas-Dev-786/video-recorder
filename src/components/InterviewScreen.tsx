const InterviewScreen = () => {
  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <h2>Quiz Form</h2>
        <p>Test your knowledge with this quick quiz</p>
      </div>
      <form>
        <div className="form-group">
          <label htmlFor="question1">Which company created react?</label>
          <select className="form-control" id="question1" required>
            <option value="" disabled>
              Select an answer
            </option>
            <option value="paris">Tesla</option>
            <option value="london">Microsoft</option>
            <option value="berlin">Meta</option>
            <option value="madrid">Google</option>
          </select>
        </div>
        <div className="quiz-footer">
          <button type="button" className="btn btn-primary mt-3">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default InterviewScreen;
