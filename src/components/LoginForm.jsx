export default function LoginForm() {

    return (
<div className="login-form">
<h2>Login</h2>
<form>
  <div className="form-group">
    <label htmlFor="email">Email address:</label>
    <input type="email" className="form-control" id="email" />
  </div>
  <div className="form-group">
    <label htmlFor="pwd">Password:</label>
    <input type="password" className="form-control" id="pwd" />
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
</div>
    )
  }