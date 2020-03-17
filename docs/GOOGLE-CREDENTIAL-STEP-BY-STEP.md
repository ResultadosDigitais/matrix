# Getting Google Sign-In client-id 

Follow this steps to generate your client id. The google client-id is required to the login button.

# Step 1

Access [this page](https://developers.google.com/identity/sign-in/web/sign-in) to start your google credentials configuration.

![Google Page Step 1](/docs/img/google-credential-step-1.png)

# Step 2

Click on the button **Configure Project** and in the window set a name of your project. Select the option **YES** on the *terms of service* and click on **NEXT**.   

![Google Page Step 2](/docs/img/google-credential-step-2.png)

# Step 3

Specify the product name that will be show for the users during the login proccess. After chosed the name click on **NEXT**.   
 

![Google Page Step 3](/docs/img/google-credential-step-3.png)

# Step 4
Now you have to choose a kind of client id you want to create. Select the option **Web Browser**

![Google Page Step 4](/docs/img/google-credential-step-4.png)

# Step 5

After chosed the option **Web Browser** the window will ask you to set the matrix url. This is an important step. You have to talk with your IT department to indicate the correct link of your service. In this example we are configuring for local environment, so we inputed `http://localhost:8080`

![Google Page Step 5](/docs/img/google-credential-step-5.png)

# Step 6

You have to copy `Client ID` and set the environent variable `GOOGLE_CREDENTIAL` with the value.

