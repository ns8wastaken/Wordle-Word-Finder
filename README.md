# How to get SSL certificate and key
Simply run `openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout key.pem -out cert.pem`
This will create a key.pem and cert.pem file which will be used by the `https_server.py` program.

# How to start the server
Run the python file with `python https_server.py`

You will be told by your browser that the website is malicious and whatnot but that is because the ssl key is not verified.

# How to close the server
Press `ctrl + c` in the terminal in which the server is running.
