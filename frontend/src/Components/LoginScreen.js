import './LoginScreen.css';

const LoginScreen = () => {
    return (

        <div>
            <head> 
              <meta charset="UTF-8"/>
              <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
              <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
              <link rel="stylesheet" href="LoginScreen.css"/>

            </head>

            <body>
              <div class="container">
                <input type="checkbox" id="check"/>
                <div class="container">
                  <input type="checlbox" id="check"/>
                  <div class ="login form">
                    <header>Login</header>
                    <form action="">
                      <input type="text" placeholder="Enter your email"/>
                      <input type="password" placeholder="Enter your password"/>
                      <a href="#">Forgot password?</a>
                      <input type="button" class="button" value="Login"/>
                    </form>


                    <div class="signup">
                      <span class="signup">Don't have an account?
                      <label for="check">Signup</label>
                      </span>

                  </div>
                </div>
                <div class="registration form">
                  <header>Signup</header>
                  <form action="">
                    <input type="text" placeholder="Enter your email"/>
                    <input type="password" placeholder="Create a password"/>
                    <input type="password" placeholder="Confirm your password"/>
                    <input type="button" class="button" value="Signup"/>
                  </form>
                </div>
                <div class="signup">
                  <span class="signup">Already have an account?
                  <label for="check">Login</label>
                  </span>
                </div>
              </div>

            </div>
            </body>
        </div>
    );
}

export default LoginScreen;

