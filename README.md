# Allo’ CTRL

**A Simple Algorand Node GUI**

AlloCTRL is a NodeJS webapp that allows to interact with your Algorand Node from a web browser. It uses a standard backend+frontend setup, where all sensitive information (e.g., the API token) is kept safe on the backend side. This is done to ensure the browser can't harm the node in case it is compromised.


## Requirements

AlloCTRL requires the following to run: 

- [Node.JS](https://nodejs.org/) >= 16.0.0
- [NPM](https://www.npmjs.com/) >= 5.2.0


## Usage

AlloCTRL rely on a `alloctrl.env` file to run. The file can be created and edited manually, but AlloCTRL also provide a command line tool to help fill it up.

There are 3 ways to use/install the dashboard:

### ⚡ Fastest method: NPX command

1. Open a terminal window, and move to a location where you want to create and save the environment file.
    ```shell
    # Example
    mkdir ~/algorand-dashboard
    cd ~/algorand-dashboard
    ```


2. Run the NPX command

    You will be asked download and install the package. Press `Y` to accept.
    
    ``` shell
    npx alloctrl
        Need to install the following packages:
            alloctrl@0.1.4
        Ok to proceed? (y) 

    # Alternatively, you can specify the version you want to use
    # npx alloctrl@latest
    # npx alloctrl@0.1.4
    ```


3. First time using AlloCTRL? You need to create a `alloctrl.env` file.
    
    Just answer a few questions, and the setup script will create the environment file for you. 

    ```shell
    ?   No environment file found. 
        Would you like to launch the setup process and create one? Yes
    
    # Answer to  the questions asked here

    Almost done...
    💾 Writing variables to your environment file...
    Done!
    ```
4. That's it!

    Just open your browser to the address you chose (`http://<host>:<port>`). Your dashboard should be right there waiting for you! When you're done, head back to the console, and hit `ctrl+c` to terminate the AlloCTRL server.


### 🖥️ Permanent:  NPM package

Instructions coming soon :)



### 🛠️ Contribute: Build it yourself! 

Instructions coming soon :)
